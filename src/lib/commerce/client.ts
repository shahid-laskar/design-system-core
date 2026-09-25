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

