#!/usr/bin/env node
/**
 * Sukoon House — Medusa Snapshot Exporter
 *
 * Reads the local Medusa.js v2 Store API and writes JSON snapshots
 * to lovable-snapshot/ for use as Lovable development fixtures.
 *
 * Usage:
 *   npm run snapshot:export
 *
 * Required environment variables (can be in .env or set in shell):
 *   MEDUSA_URL              — base URL of the local Medusa backend (default: http://localhost:9000)
 *   MEDUSA_PUBLISHABLE_KEY  — publishable API key (required)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ---------------------------------------------------------------------------
// Load .env file (simple parser — no dotenv dependency required)
// ---------------------------------------------------------------------------
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const envPath = path.join(projectRoot, ".env");
const envLocalPath = path.join(projectRoot, ".env.local");

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const lines = fs.readFileSync(filePath, "utf8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
    if (!(key in process.env)) {
      process.env[key] = val;
    }
  }
}

loadEnvFile(envPath);
loadEnvFile(envLocalPath);

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------
const MEDUSA_URL =
  process.env.MEDUSA_URL ||
  process.env.VITE_MEDUSA_BACKEND_URL ||
  "http://localhost:9000";

const PUBLISHABLE_KEY =
  process.env.MEDUSA_PUBLISHABLE_KEY ||
  process.env.VITE_MEDUSA_PUBLISHABLE_KEY ||
  // Hardcoded fallback matching what the frontend uses (safe — this is a publishable key)
  "pk_42b2e3338e31fb32e0e3c1ddd2bab88fd17e7c6a2a73a7903838f1eee52fb91f";

if (!PUBLISHABLE_KEY) {
  console.error("ERROR: MEDUSA_PUBLISHABLE_KEY environment variable is required.");
  console.error("       Set it in .env or export it before running this script.");
  process.exit(1);
}

const OUTPUT_DIR = path.join(projectRoot, "lovable-snapshot");
const PAGE_SIZE = 100;

// ---------------------------------------------------------------------------
// HTTP helper
// ---------------------------------------------------------------------------
async function medusaFetch(endpoint) {
  const url = `${MEDUSA_URL}${endpoint}`;
  const res = await fetch(url, {
    headers: {
      "x-publishable-api-key": PUBLISHABLE_KEY,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    let body = "";
    try { body = await res.text(); } catch { /* ignore */ }
    throw new Error(`Medusa API error ${res.status} for ${url}: ${body}`);
  }

  return res.json();
}

// ---------------------------------------------------------------------------
// Pagination helper — collects all pages into one array
// ---------------------------------------------------------------------------
async function fetchAllPages(basePath, arrayKey) {
  const all = [];
  let offset = 0;
  let total = Infinity;

  while (offset < total) {
    const sep = basePath.includes("?") ? "&" : "?";
    const url = `${basePath}${sep}limit=${PAGE_SIZE}&offset=${offset}`;
    const data = await medusaFetch(url);

    const items = data[arrayKey];
    if (!Array.isArray(items)) {
      throw new Error(`Unexpected response shape for ${basePath}: missing array key "${arrayKey}"`);
    }

    all.push(...items);

    // Medusa v2 returns { count, offset, limit } at top level
    if (typeof data.count === "number") {
      total = data.count;
    } else {
      // If no count field, stop after first page (shouldn't happen with standard Medusa)
      total = 0;
    }

    offset += PAGE_SIZE;
    if (items.length < PAGE_SIZE) break; // last page
  }

  return all;
}

// ---------------------------------------------------------------------------
// Export: Products
// ---------------------------------------------------------------------------
async function exportProducts() {
  console.log("  → Fetching products…");
  // Request all relevant fields from Medusa Store API
  const fields = [
    "*variants",
    "*variants.calculated_price",
    "*variants.options",
    "*images",
    "*options",
    "*options.values",
    "*categories",
    "*tags",
    "*collection",
  ].join(",");

  const regionId = await getDefaultRegionId();
  const regionParam = regionId ? `&region_id=${regionId}` : "";
  const basePath = `/store/products?fields=${encodeURIComponent(fields)}${regionParam}`;

  const products = await fetchAllPages(basePath, "products");

  // Sort deterministically by ID
  products.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));

  return {
    products,
    count: products.length,
    offset: 0,
    limit: PAGE_SIZE,
  };
}

// ---------------------------------------------------------------------------
// Export: Categories
// ---------------------------------------------------------------------------
async function exportCategories() {
  console.log("  → Fetching product categories…");
  const fields = "*category_children,*parent_category";
  const basePath = `/store/product-categories?fields=${encodeURIComponent(fields)}`;

  const categories = await fetchAllPages(basePath, "product_categories");

  categories.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));

  return {
    product_categories: categories,
    count: categories.length,
    offset: 0,
    limit: PAGE_SIZE,
  };
}

// ---------------------------------------------------------------------------
// Export: Collections
// ---------------------------------------------------------------------------
async function exportCollections() {
  console.log("  → Fetching collections…");
  const collections = await fetchAllPages("/store/collections", "collections");

  collections.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));

  return {
    collections,
    count: collections.length,
    offset: 0,
    limit: PAGE_SIZE,
  };
}

// ---------------------------------------------------------------------------
// Export: Regions
// ---------------------------------------------------------------------------
async function exportRegions() {
  console.log("  → Fetching regions…");
  const regions = await fetchAllPages("/store/regions", "regions");

  regions.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));

  return {
    regions,
    count: regions.length,
    offset: 0,
    limit: PAGE_SIZE,
  };
}

// ---------------------------------------------------------------------------
// Helper: get default region ID for price calculation
// ---------------------------------------------------------------------------
let _cachedRegionId = null;
async function getDefaultRegionId() {
  if (_cachedRegionId) return _cachedRegionId;
  try {
    const data = await medusaFetch("/store/regions");
    const regions = data.regions || [];
    // Prefer India region if present
    const india = regions.find(
      (r) =>
        r.name?.toLowerCase().includes("india") ||
        r.currency_code === "inr" ||
        r.countries?.some((c) => c.iso_2?.toLowerCase() === "in")
    );
    _cachedRegionId = (india || regions[0])?.id || null;
    return _cachedRegionId;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Security check — ensure no obvious secrets in generated data
// ---------------------------------------------------------------------------
const SECRET_PATTERNS = [
  /sk_[a-zA-Z0-9]{10,}/,
  /password\s*[:=]\s*\S+/i,
  /jwt_secret/i,
  /cookie_secret/i,
  /razorpay[\w_]*secret/i,
  /shiprocket[\w_]*password/i,
  /database_url.*password/i,
  /redis_url.*password/i,
  /private_key/i,
];

function scanForSecrets(jsonString, filename) {
  const issues = [];
  for (const pattern of SECRET_PATTERNS) {
    if (pattern.test(jsonString)) {
      issues.push(`  ⚠  Possible secret pattern "${pattern}" in ${filename}`);
    }
  }
  return issues;
}

// ---------------------------------------------------------------------------
// Write JSON file
// ---------------------------------------------------------------------------
function writeJson(filename, data) {
  const filePath = path.join(OUTPUT_DIR, filename);
  const jsonString = JSON.stringify(data, null, 2) + "\n";

  // Security check before writing
  const securityIssues = scanForSecrets(jsonString, filename);
  if (securityIssues.length > 0) {
    console.error("SECURITY WARNING: Potential secrets detected:");
    securityIssues.forEach((issue) => console.error(issue));
    console.error("Aborting export to protect secrets.");
    process.exit(2);
  }

  fs.writeFileSync(filePath, jsonString, "utf8");
  const sizeKB = (Buffer.byteLength(jsonString, "utf8") / 1024).toFixed(1);
  console.log(`  ✓ ${filename} (${sizeKB} KB)`);
  return jsonString;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log("\n╔═══════════════════════════════════════════════════════════╗");
  console.log("║   Sukoon House — Medusa Snapshot Exporter                 ║");
  console.log("╚═══════════════════════════════════════════════════════════╝\n");

  console.log(`  Source:  ${MEDUSA_URL}`);
  console.log(`  Output:  ${OUTPUT_DIR}\n`);

  // Connectivity check
  console.log("  Checking API connectivity…");
  try {
    await medusaFetch("/store/regions");
    console.log("  ✓ Medusa Store API reachable\n");
  } catch (err) {
    console.error(`\n  ✗ Cannot reach Medusa at ${MEDUSA_URL}`);
    console.error(`    ${err.message}`);
    console.error("\n  Make sure Medusa is running:");
    console.error("    cd web/backend/apps/backend && npx medusa start\n");
    process.exit(1);
  }

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log("  Exporting snapshots…\n");

  // --- Products ---
  let productsData;
  try {
    productsData = await exportProducts();
  } catch (err) {
    console.error(`  ✗ Products export failed: ${err.message}`);
    process.exit(1);
  }
  writeJson("medusa-products.json", productsData);

  // --- Categories ---
  let categoriesData;
  try {
    categoriesData = await exportCategories();
  } catch (err) {
    console.error(`  ✗ Categories export failed: ${err.message}`);
    process.exit(1);
  }
  writeJson("medusa-categories.json", categoriesData);

  // --- Collections ---
  let collectionsData;
  try {
    collectionsData = await exportCollections();
  } catch (err) {
    console.error(`  ✗ Collections export failed: ${err.message}`);
    process.exit(1);
  }
  writeJson("medusa-collections.json", collectionsData);

  // --- Regions ---
  let regionsData;
  try {
    regionsData = await exportRegions();
  } catch (err) {
    console.error(`  ✗ Regions export failed: ${err.message}`);
    process.exit(1);
  }
  writeJson("medusa-regions.json", regionsData);

  // --- Manifest ---
  const manifest = {
    generated_at: new Date().toISOString(),
    source: "local-medusa",
    medusa_base_url: MEDUSA_URL,
    products_count: productsData.count,
    categories_count: categoriesData.count,
    collections_count: collectionsData.count,
    regions_count: regionsData.count,
    export_version: "1.0",
  };
  writeJson("snapshot-manifest.json", manifest);

  // --- Summary ---
  console.log("\n  ┌─────────────────────────────────────────┐");
  console.log("  │            Export Summary               │");
  console.log("  ├─────────────────────────────────────────┤");
  console.log(`  │  Products:    ${String(productsData.count).padStart(4)}                      │`);
  console.log(`  │  Categories:  ${String(categoriesData.count).padStart(4)}                      │`);
  console.log(`  │  Collections: ${String(collectionsData.count).padStart(4)}                      │`);
  console.log(`  │  Regions:     ${String(regionsData.count).padStart(4)}                      │`);
  console.log("  └─────────────────────────────────────────┘\n");

  // Image URL check
  const imageWarnings = [];
  for (const product of productsData.products) {
    if (product.thumbnail && (product.thumbnail.startsWith("http://localhost") || product.thumbnail.startsWith("http://127"))) {
      imageWarnings.push(`    - ${product.handle || product.id}: thumbnail points to local URL`);
    }
    if (Array.isArray(product.images)) {
      for (const img of product.images) {
        if (img.url && (img.url.startsWith("http://localhost") || img.url.startsWith("http://127"))) {
          imageWarnings.push(`    - ${product.handle || product.id}: image URL points to local URL`);
          break;
        }
      }
    }
  }
  if (imageWarnings.length > 0) {
    console.log("  ⚠  Image URL warnings (local URLs won't render in Lovable):");
    imageWarnings.slice(0, 10).forEach((w) => console.log(w));
    if (imageWarnings.length > 10) {
      console.log(`    … and ${imageWarnings.length - 10} more`);
    }
    console.log();
  }

  console.log("  ✓ Snapshot export complete.\n");
  console.log("  To regenerate:");
  console.log("    npm run snapshot:export\n");
  console.log("  To validate:");
  console.log("    npm run snapshot:validate\n");
}

main().catch((err) => {
  console.error("\n  ✗ Unexpected error:", err);
  process.exit(1);
});
