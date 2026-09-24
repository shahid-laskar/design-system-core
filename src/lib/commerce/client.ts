/**
 * Sukoon House Commerce Client (Medusa.js v2 Store API)
 */

export const MEDUSA_BACKEND_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_MEDUSA_BACKEND_URL) ||
  (typeof window !== "undefined" && window.location?.hostname
    ? `http://${window.location.hostname}:9000`
    : "http://localhost:9000");

export const MEDUSA_PUBLISHABLE_KEY =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_MEDUSA_PUBLISHABLE_KEY) ||
  "pk_42b2e3338e31fb32e0e3c1ddd2bab88fd17e7c6a2a73a7903838f1eee52fb91f";

export type MedusaStoreProduct = {
  id: string;
  title: string;
  handle: string;
  subtitle: string | null;
  description: string | null;
  thumbnail: string | null;
  status: string;
  images?: Array<{ id: string; url: string }>;
  categories?: Array<{ id: string; name: string; handle: string }>;
  options?: Array<{ id: string; title: string; values: Array<{ id: string; value: string }> }>;
  variants?: Array<{
    id: string;
    title: string;
    sku: string;
    manage_inventory: boolean;
    options: Record<string, string>;
    calculated_price?: {
      calculated_amount: number;
      original_amount: number;
      currency_code: string;
    };
    inventory_items?: Array<{
      inventory_item_id: string;
    }>;
  }>;
  metadata?: Record<string, unknown> | null;
};

export type MedusaStoreCategory = {
  id: string;
  name: string;
  handle: string;
  description?: string;
  parent_category_id?: string | null;
  category_children?: MedusaStoreCategory[];
};

export async function fetchMedusa<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${MEDUSA_BACKEND_URL}${path}`;
  const headers = new Headers(options.headers || {});
  headers.set("x-publishable-api-key", MEDUSA_PUBLISHABLE_KEY);
  headers.set("Content-Type", "application/json");

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Medusa API error [${response.status}] ${url}: ${errorText}`);
  }

  return response.json();
}

let cachedRegionId: string | null = null;

export async function getDefaultRegionId(): Promise<string> {
  if (cachedRegionId) return cachedRegionId;
  try {
    const res = await fetchMedusa<{ regions: Array<{ id: string; currency_code: string }> }>(
      "/store/regions"
    );
    cachedRegionId = res.regions?.[0]?.id || "reg_01M39BTQNHGNKDQHSQP2KFJXF9";
    return cachedRegionId;
  } catch {
    return "reg_01M39BTQNHGNKDQHSQP2KFJXF9";
  }
}

/**
 * Fetch all published products with variants, options, categories and calculated INR prices.
 */
export async function getStoreProducts(params?: {
  categoryId?: string;
  handle?: string;
  regionId?: string;
  limit?: number;
  offset?: number;
}): Promise<{ products: MedusaStoreProduct[]; count: number }> {
  const query = new URLSearchParams();
  const regionId = params?.regionId || (await getDefaultRegionId());
  query.set("region_id", regionId);
  query.set(
    "fields",
    "*categories,*variants,*variants.options,*variants.calculated_price,*images"
  );
  if (params?.categoryId) query.set("category_id", params.categoryId);
  if (params?.handle) query.set("handle[]", params.handle);
  if (params?.limit) query.set("limit", params.limit.toString());
  if (params?.offset) query.set("offset", params.offset.toString());

  return fetchMedusa<{ products: MedusaStoreProduct[]; count: number }>(
    `/store/products?${query.toString()}`
  );
}

/**
 * Fetch a single product by its handle/slug.
 */
export async function getStoreProductByHandle(
  handle: string
): Promise<MedusaStoreProduct | null> {
  const res = await getStoreProducts({ handle, limit: 1 });
  return res.products?.[0] ?? null;
}

/**
 * Fetch product categories from Medusa store API.
 */
export async function getStoreCategories(): Promise<{
  product_categories: MedusaStoreCategory[];
}> {
  return fetchMedusa<{ product_categories: MedusaStoreCategory[] }>(
    "/store/product-categories?fields=*category_children"
  );
}
