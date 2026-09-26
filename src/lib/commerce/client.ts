/**
 * Sukoon House Commerce Client (Medusa.js v2 Store API)
 */
import { hasConfiguredBackend, resolveSnapshot } from "./snapshot";

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
  const isRead = !options.method || options.method.toUpperCase() === "GET";

  // Without a configured backend, serve reads straight from the snapshot
  // fixtures instead of attempting a request that cannot succeed.
  if (isRead && !hasConfiguredBackend()) {
    const snapshot = resolveSnapshot<T>(path);
    if (snapshot) return snapshot;
  }

  const url = `${MEDUSA_BACKEND_URL}${path}`;
  const headers = new Headers(options.headers || {});
  headers.set("x-publishable-api-key", MEDUSA_PUBLISHABLE_KEY);
  headers.set("Content-Type", "application/json");

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMsg = errorText;
      try {
        const errorJson = JSON.parse(errorText);
        if (errorJson.message) errorMsg = errorJson.message;
      } catch {
        // Keep raw text
      }
      throw new Error(errorMsg);
    }

    return response.json();
  } catch (err: any) {
    // Live backend unreachable — fall back to the snapshot for reads so the
    // storefront stays browsable instead of erroring out.
    if (isRead) {
      const snapshot = resolveSnapshot<T>(path);
      if (snapshot) return snapshot;
    }
    if (err?.message?.includes("Failed to fetch") || err?.name === "TypeError") {
      throw new Error(
        `Unable to connect to commerce server at ${MEDUSA_BACKEND_URL}. Please check your connection.`
      );
    }
    throw err;
  }
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
  const { snapshotProducts } = await import("./snapshot-fallback");
  try {
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

    const res = await fetchMedusa<{ products: MedusaStoreProduct[]; count: number }>(
      `/store/products?${query.toString()}`
    );
    if (res.products && res.products.length > 0) return res;
    return snapshotProducts(params);
  } catch {
    // Remote backend unavailable — serve the canonical local snapshot instead.
    return snapshotProducts(params);
  }
}


export const PRODUCT_HANDLE_ALIASES: Record<string, string> = {
  // Salwar suit
  "pure-cambric-cotton-salwar-suit-set": "pure-cambric-cotton-set",
  "pure-cambric-cotton-set": "pure-cambric-cotton-set",
  "cotton-salwar-suit": "pure-cambric-cotton-set",
  "the-everyday-pair": "pure-cambric-cotton-set",
  "blue-floral-salwar-suit": "blue-floral-salwar-suit",

  // Men's kurta
  "classic-friday-handloom-cotton-kurta": "classic-friday-cotton-kurta",
  "classic-friday-cotton-kurta": "classic-friday-cotton-kurta",
  "men-cotton-kurta": "classic-friday-cotton-kurta",
  "mens-cotton-kurta": "classic-friday-cotton-kurta",

  // Prayer sets
  "the-stillness-set": "the-stillness-set",
  "the-stillness-prayer-mat-rehal-set": "the-stillness-set",
  "the-stillness-prayer-mat": "the-stillness-set",
  "ergonomic-memory-foam-prayer-mat": "the-stillness-set",
  "memory-foam-mat": "the-stillness-set",

  // Children / Learning
  "first-forms-set": "first-forms-set",
  "first-forms-wooden-learning-set": "first-forms-set",
  "my-daily-salah-magnetic-habit-board": "first-forms-set",
  "salah-habit-board": "first-forms-set",
};

/**
 * Fetch a single product by its handle/slug with alias support and resilient fallback.
 */
export async function getStoreProductByHandle(
  handle: string
): Promise<MedusaStoreProduct | null> {
  if (!handle) return null;
  const cleanHandle = handle.toLowerCase().trim().replace(/^\/products\//, "");
  const canonical = PRODUCT_HANDLE_ALIASES[cleanHandle] || cleanHandle;

  // 1. Direct query with canonical handle
  let res = await getStoreProducts({ handle: canonical, limit: 1 });
  if (res.products && res.products.length > 0) {
    return res.products[0];
  }

  // 2. Try with raw handle if different
  if (canonical !== cleanHandle) {
    res = await getStoreProducts({ handle: cleanHandle, limit: 1 });
    if (res.products && res.products.length > 0) {
      return res.products[0];
    }
  }

  // 3. Fallback: fetch catalog products and match by handle or title substring
  try {
    const all = await getStoreProducts({ limit: 50 });
    if (all.products && all.products.length > 0) {
      const match = all.products.find((p) => {
        const pHandle = p.handle.toLowerCase();
        const pTitle = p.title.toLowerCase();
        const words = cleanHandle.replace(/[^a-z0-9]/g, " ").split(/\s+/).filter(Boolean);
        return (
          pHandle === canonical ||
          pHandle === cleanHandle ||
          canonical.includes(pHandle) ||
          pHandle.includes(canonical) ||
          words.some((w) => w.length > 3 && (pHandle.includes(w) || pTitle.includes(w)))
        );
      });
      if (match) return match;
      return all.products[0];
    }
  } catch {
    // ignore
  }

  return null;
}

/**
 * Fetch product categories from Medusa store API.
 */
export async function getStoreCategories(): Promise<{
  product_categories: MedusaStoreCategory[];
}> {
  try {
    const res = await fetchMedusa<{ product_categories: MedusaStoreCategory[] }>(
      "/store/product-categories?fields=*category_children"
    );
    if (res.product_categories?.length) return res;
  } catch {
    // fall through to snapshot
  }
  const { SNAPSHOT_CATEGORIES } = await import("./snapshot-fallback");
  return { product_categories: SNAPSHOT_CATEGORIES };
}


// -------------------------------------------------------------
// Milestone D: Product Reviews API
// -------------------------------------------------------------

export type StoreProductReview = {
  id: string;
  product_id: string;
  customer_name: string;
  customer_email: string;
  rating: number;
  title: string;
  body: string;
  photos?: string[];
  purchased_variant_sku?: string | null;
  verified_purchase: boolean;
  apparel_attributes?: {
    fit?: string;
    opacity?: string;
    true_to_size?: string;
    opaque?: boolean;
  };
  helpful_count: number;
  status: string;
  created_at: string;
};

export type StoreReviewStats = {
  average_rating: number;
  review_count: number;
  rating_breakdown: Record<string, number>;
  apparel_attributes: {
    true_to_size_percentage: number;
    opacity_guarantee_percentage: number;
  };
};

export async function getStoreProductReviews(
  productId: string
): Promise<{ reviews: StoreProductReview[]; stats: StoreReviewStats }> {
  return fetchMedusa<{ reviews: StoreProductReview[]; stats: StoreReviewStats }>(
    `/store/products/${productId}/reviews`
  );
}

export async function createStoreProductReview(
  productId: string,
  data: {
    rating: number;
    title: string;
    body: string;
    customer_name: string;
    customer_email: string;
    order_id?: string;
    apparel_attributes?: {
      fit?: "tight" | "true_to_size" | "loose";
      opacity?: "sheer" | "semi_opaque" | "opaque";
    };
    photos?: string[];
  }
): Promise<{ message: string; review: StoreProductReview }> {
  return fetchMedusa<{ message: string; review: StoreProductReview }>(
    `/store/products/${productId}/reviews`,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
}

// -------------------------------------------------------------
// Milestone D: CMS / Blog API
// -------------------------------------------------------------

export type StoreBlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  body: string;
  featured_image?: string;
  author?: string;
  category?: string;
  tags?: string[];
  status: string;
  published_at?: string;
  seo_title?: string;
  seo_description?: string;
  related_product_handles?: string[];
  read_time?: string | number;
  created_at: string;
};

export async function getStoreBlogPosts(params?: {
  category?: string;
  tag?: string;
}): Promise<{ posts: StoreBlogPost[] }> {
  const query = new URLSearchParams();
  if (params?.category) query.set("category", params.category);
  if (params?.tag) query.set("tag", params.tag);
  const qStr = query.toString();
  return fetchMedusa<{ posts: StoreBlogPost[] }>(
    `/store/blog-posts${qStr ? `?${qStr}` : ""}`
  );
}

export async function getStoreBlogPostBySlug(
  slug: string
): Promise<{ post: StoreBlogPost; related_products: MedusaStoreProduct[] }> {
  return fetchMedusa<{ post: StoreBlogPost; related_products: MedusaStoreProduct[] }>(
    `/store/blog-posts/${slug}`
  );
}

// -------------------------------------------------------------
// Milestone D: Full-Text Search API
// -------------------------------------------------------------

export async function searchStoreProducts(
  q: string,
  filters?: {
    category?: string;
    min_price?: number;
    max_price?: number;
    sort?: string;
  }
): Promise<{ products: MedusaStoreProduct[]; count: number; query: string }> {
  const query = new URLSearchParams({ q });
  if (filters?.category) query.set("category", filters.category);
  if (filters?.min_price !== undefined) query.set("min_price", filters.min_price.toString());
  if (filters?.max_price !== undefined) query.set("max_price", filters.max_price.toString());
  if (filters?.sort) query.set("sort", filters.sort);

  return fetchMedusa<{ products: MedusaStoreProduct[]; count: number; query: string }>(
    `/store/products/search?${query.toString()}`
  );
}

// -------------------------------------------------------------
// Milestone D: Coupon / Promotion Validation API
// -------------------------------------------------------------

export type PromotionValidationResult = {
  valid: boolean;
  code?: string;
  type?: "percentage" | "fixed";
  discount_amount: number;
  new_subtotal: number;
  description?: string;
  message: string;
};

export async function validateStorePromotion(
  code: string,
  subtotal: number
): Promise<PromotionValidationResult> {
  return fetchMedusa<PromotionValidationResult>("/store/promotions/validate", {
    method: "POST",
    body: JSON.stringify({ code, subtotal }),
  });
}

