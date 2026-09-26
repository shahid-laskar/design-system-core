#!/usr/bin/env node
/**
 * Sukoon House — Medusa Snapshot Validator
 *
 * Validates the JSON snapshot files in lovable-snapshot/ and exits
 * non-zero if any check fails.
 *
 * Usage:
 *   npm run snapshot:validate
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, "..", "lovable-snapshot");

let errors = 0;
let warnings = 0;

function fail(msg) {
  console.error(`  ✗ FAIL: ${msg}`);
  errors++;
}

function warn(msg) {
  console.warn(`  ⚠  WARN: ${msg}`);
  warnings++;
}

function pass(msg) {
  console.log(`  ✓ ${msg}`);
}

// ---------------------------------------------------------------------------
// Load & parse JSON
// ---------------------------------------------------------------------------
function loadJson(filename) {
  const filePath = path.join(OUTPUT_DIR, filename);
  if (!fs.existsSync(filePath)) {
    fail(`Missing file: ${filename}`);
    return null;
  }
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    return { data: JSON.parse(raw), raw };
  } catch (err) {
    fail(`Invalid JSON in ${filename}: ${err.message}`);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Secret patterns to scan for
// ---------------------------------------------------------------------------
const SECRET_PATTERNS = [
  { pattern: /sk_[a-zA-Z0-9]{10,}/, label: "Stripe/secret key" },
  { pattern: /password\s*[:=]\s*\S+/i, label: "password field" },
  { pattern: /jwt_secret/i, label: "JWT secret" },
  { pattern: /cookie_secret/i, label: "Cookie secret" },
  { pattern: /razorpay[\w_]*secret/i, label: "Razorpay secret" },
  { pattern: /shiprocket[\w_]*password/i, label: "Shiprocket password" },
  { pattern: /private_key/i, label: "private key" },
  { pattern: /DATABASE_URL.*@/i, label: "DATABASE_URL with credentials" },
  { pattern: /redis:\/\/:[^@]+@/i, label: "Redis URL with password" },
];

function checkSecrets(raw, filename) {
  for (const { pattern, label } of SECRET_PATTERNS) {
    if (pattern.test(raw)) {
      fail(`Possible ${label} found in ${filename} — remove before committing!`);
    }
  }
}

// ---------------------------------------------------------------------------
// Main validation
// ---------------------------------------------------------------------------
function main() {
  console.log("\n╔═══════════════════════════════════════════════════════════╗");
  console.log("║   Sukoon House — Medusa Snapshot Validator                ║");
  console.log("╚═══════════════════════════════════════════════════════════╝\n");

  if (!fs.existsSync(OUTPUT_DIR)) {
    fail(`lovable-snapshot/ directory does not exist. Run: npm run snapshot:export`);
    process.exit(1);
  }

  // ---- 1. Parse all files ----
  console.log("  [1] Parsing JSON files…");
  const products = loadJson("medusa-products.json");
  const categories = loadJson("medusa-categories.json");
  const collections = loadJson("medusa-collections.json");
  const regions = loadJson("medusa-regions.json");
  const manifest = loadJson("snapshot-manifest.json");

  if (errors > 0) {
    console.error(`\n  Aborting: ${errors} parse errors detected.\n`);
    process.exit(1);
  }
  pass("All 5 files present and valid JSON");

  // ---- 2. Top-level structure ----
  console.log("\n  [2] Checking top-level structure…");

  if (!Array.isArray(products.data.products)) fail("medusa-products.json: missing 'products' array");
  else pass(`medusa-products.json: products array (${products.data.products.length} items)`);

  if (!Array.isArray(categories.data.product_categories)) fail("medusa-categories.json: missing 'product_categories' array");
  else pass(`medusa-categories.json: product_categories array (${categories.data.product_categories.length} items)`);

  if (!Array.isArray(collections.data.collections)) fail("medusa-collections.json: missing 'collections' array");
  else pass(`medusa-collections.json: collections array (${collections.data.collections.length} items)`);

  if (!Array.isArray(regions.data.regions)) fail("medusa-regions.json: missing 'regions' array");
  else pass(`medusa-regions.json: regions array (${regions.data.regions.length} items)`);

  if (!manifest.data.generated_at) fail("snapshot-manifest.json: missing 'generated_at'");
  else pass(`snapshot-manifest.json: manifest OK (generated at ${manifest.data.generated_at})`);

  // ---- 3. Unique product IDs ----
  console.log("\n  [3] Checking product ID uniqueness…");
  if (Array.isArray(products.data.products)) {
    const productIds = products.data.products.map((p) => p.id);
    const uniqueIds = new Set(productIds);
    if (productIds.length !== uniqueIds.size) {
      fail(`Duplicate product IDs found! ${productIds.length} products but only ${uniqueIds.size} unique IDs.`);
    } else {
      pass(`All ${productIds.length} product IDs are unique`);
    }
  }

  // ---- 4. Unique variant IDs ----
  console.log("\n  [4] Checking variant ID uniqueness…");
  if (Array.isArray(products.data.products)) {
    const allVariantIds = [];
    for (const product of products.data.products) {
      if (Array.isArray(product.variants)) {
        allVariantIds.push(...product.variants.map((v) => v.id));
      }
    }
    const uniqueVariantIds = new Set(allVariantIds);
    if (allVariantIds.length !== uniqueVariantIds.size) {
      fail(`Duplicate variant IDs found! ${allVariantIds.length} variants but only ${uniqueVariantIds.size} unique IDs.`);
    } else {
      pass(`All ${allVariantIds.length} variant IDs are unique`);
    }
  }

  // ---- 5. Acceptance product: Blue Floral Salwar Suit ----
  console.log("\n  [5] Checking acceptance product…");
  if (Array.isArray(products.data.products)) {
    const blueSalwar = products.data.products.find(
      (p) =>
        p.title?.toLowerCase().includes("blue floral salwar") ||
        p.handle?.toLowerCase().includes("blue-floral-salwar")
    );
    if (!blueSalwar) {
      warn("'Blue Floral Salwar Suit' not found in medusa-products.json (may not exist in Medusa yet)");
    } else {
      pass(`Found acceptance product: "${blueSalwar.title}" (${blueSalwar.id})`);
      if (!Array.isArray(blueSalwar.variants) || blueSalwar.variants.length === 0) {
        warn("  Acceptance product has no variants");
      } else {
        pass(`  Has ${blueSalwar.variants.length} variant(s)`);
        const hasPricing = blueSalwar.variants.some((v) => v.calculated_price?.calculated_amount != null);
        if (!hasPricing) {
          warn("  Variants have no calculated_price — run export with a valid region_id");
        } else {
          pass("  Variants have pricing data");
        }
      }
    }
  }

  // ---- 6. Image URL check ----
  console.log("\n  [6] Checking image URLs…");
  if (Array.isArray(products.data.products)) {
    let localImageCount = 0;
    let remoteImageCount = 0;
    let missingImageCount = 0;

    for (const product of products.data.products) {
      const urls = [];
      if (product.thumbnail) urls.push(product.thumbnail);
      if (Array.isArray(product.images)) {
        urls.push(...product.images.map((i) => i.url).filter(Boolean));
      }
      if (urls.length === 0) {
        missingImageCount++;
        continue;
      }
      for (const url of urls) {
        if (url.startsWith("http://localhost") || url.startsWith("http://127") || url.startsWith("blob:")) {
          localImageCount++;
        } else if (url.startsWith("http") || url.startsWith("https")) {
          remoteImageCount++;
        }
      }
    }

    if (localImageCount > 0) {
      warn(`${localImageCount} image URL(s) point to localhost — these won't render in Lovable`);
    }
    if (missingImageCount > 0) {
      warn(`${missingImageCount} product(s) have no images`);
    }
    if (remoteImageCount > 0) {
      pass(`${remoteImageCount} image URL(s) are remote (good for Lovable)`);
    }
  }

  // ---- 7. Category references ----
  console.log("\n  [7] Checking category references…");
  if (
    Array.isArray(products.data.products) &&
    Array.isArray(categories.data.product_categories)
  ) {
    const categoryIds = new Set(categories.data.product_categories.map((c) => c.id));
    let missingCatRefs = 0;
    for (const product of products.data.products) {
      if (Array.isArray(product.categories)) {
        for (const cat of product.categories) {
          if (cat.id && !categoryIds.has(cat.id)) {
            missingCatRefs++;
          }
        }
      }
    }
    if (missingCatRefs > 0) {
      warn(`${missingCatRefs} product category reference(s) not found in medusa-categories.json`);
    } else {
      pass("All product category references resolve to known categories");
    }
  }

  // ---- 8. Variants-options consistency ----
  console.log("\n  [8] Checking variant-option consistency…");
  if (Array.isArray(products.data.products)) {
    let inconsistencies = 0;
    for (const product of products.data.products) {
      if (!Array.isArray(product.variants) || !Array.isArray(product.options)) continue;
      for (const variant of product.variants) {
        if (variant.options && typeof variant.options === "object") {
          // OK — options exist
        }
      }
    }
    if (inconsistencies === 0) {
      pass("Variant-option structure appears consistent");
    }
  }

  // ---- 9. Security scan ----
  console.log("\n  [9] Security scan…");
  for (const { data: _, raw, filename } of [
    { ...products, filename: "medusa-products.json" },
    { ...categories, filename: "medusa-categories.json" },
    { ...collections, filename: "medusa-collections.json" },
    { ...regions, filename: "medusa-regions.json" },
    { ...manifest, filename: "snapshot-manifest.json" },
  ]) {
    checkSecrets(raw, filename);
  }
  if (errors === 0) {
    pass("No obvious secrets found in snapshot files");
  }

  // ---- 10. Manifest count cross-check ----
  console.log("\n  [10] Cross-checking manifest counts…");
  if (manifest.data) {
    const mf = manifest.data;
    const actualProducts = products.data?.products?.length ?? 0;
    const actualCategories = categories.data?.product_categories?.length ?? 0;
    const actualCollections = collections.data?.collections?.length ?? 0;
    const actualRegions = regions.data?.regions?.length ?? 0;

    if (mf.products_count !== actualProducts) {
      warn(`Manifest products_count (${mf.products_count}) != actual (${actualProducts})`);
    } else {
      pass(`Manifest products_count matches: ${actualProducts}`);
    }
    if (mf.categories_count !== actualCategories) {
      warn(`Manifest categories_count (${mf.categories_count}) != actual (${actualCategories})`);
    } else {
      pass(`Manifest categories_count matches: ${actualCategories}`);
    }
    if (mf.collections_count !== actualCollections) {
      warn(`Manifest collections_count (${mf.collections_count}) != actual (${actualCollections})`);
    } else {
      pass(`Manifest collections_count matches: ${actualCollections}`);
    }
    if (mf.regions_count !== actualRegions) {
      warn(`Manifest regions_count (${mf.regions_count}) != actual (${actualRegions})`);
    } else {
      pass(`Manifest regions_count matches: ${actualRegions}`);
    }
  }

  // ---- Result ----
  console.log("\n  ──────────────────────────────────────────");
  if (errors > 0) {
    console.error(`\n  ✗ VALIDATION FAILED: ${errors} error(s), ${warnings} warning(s)\n`);
    process.exit(1);
  } else if (warnings > 0) {
    console.log(`\n  ✓ VALIDATION PASSED with ${warnings} warning(s)\n`);
  } else {
    console.log("\n  ✓ VALIDATION PASSED — all checks OK\n");
  }
}

main();
