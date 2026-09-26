/**
 * Medusa Store API snapshot fixtures.
 *
 * These are real payloads exported from the Medusa v2 Store API. They keep the
 * storefront fully usable when the live backend is unreachable (local dev,
 * preview builds, CI) without changing the data model the UI consumes.
 *
 * Shape is identical to the live `/store/*` responses, so switching between
 * snapshot mode and live mode requires no component changes.
 */
import productsSnapshot from "../../../lovable-snapshot/medusa-products.json";
import categoriesSnapshot from "../../../lovable-snapshot/medusa-categories.json";
import collectionsSnapshot from "../../../lovable-snapshot/medusa-collections.json";
import regionsSnapshot from "../../../lovable-snapshot/medusa-regions.json";

type Json = Record<string, unknown>;

const SNAPSHOTS: Array<{ match: (path: string) => boolean; payload: unknown }> = [
  { match: (p) => p.startsWith("/store/regions"), payload: regionsSnapshot },
  { match: (p) => p.startsWith("/store/product-categories"), payload: categoriesSnapshot },
  { match: (p) => p.startsWith("/store/collections"), payload: collectionsSnapshot },
  { match: (p) => p.startsWith("/store/products"), payload: productsSnapshot },
];

/**
 * Resolve a snapshot payload for a Store API path, applying the handle filter
 * so single-product lookups behave like the live API.
 */
export function resolveSnapshot<T>(path: string): T | null {
  const entry = SNAPSHOTS.find((s) => s.match(path));
  if (!entry) return null;

  if (path.startsWith("/store/products")) {
    const query = path.includes("?") ? path.slice(path.indexOf("?") + 1) : "";
    const params = new URLSearchParams(query);
    const handle = params.get("handle[]") ?? params.get("handle");
    const source = entry.payload as { products?: Json[] };
    let products = source.products ?? [];

    if (handle) {
      products = products.filter((p) => p["handle"] === handle);
    }

    return { products, count: products.length, offset: 0, limit: products.length } as T;
  }

  return entry.payload as T;
}

/** True when the project has no live commerce backend configured. */
export function hasConfiguredBackend(): boolean {
  const configured =
    typeof import.meta !== "undefined"
      ? (import.meta.env?.VITE_MEDUSA_BACKEND_URL as string | undefined)
      : undefined;
  return Boolean(configured && configured.trim().length > 0);
}
