/**
 * Local Medusa v2 snapshot fallback.
 *
 * When the remote Medusa backend is unreachable (local preview, published demo),
 * the store falls back to the canonical fixtures exported under
 * `lovable-handoff/snapshot/`.
 */
import productsSnapshot from "../../../lovable-handoff/snapshot/medusa-products.json";
import categoriesSnapshot from "../../../lovable-handoff/snapshot/medusa-categories.json";
import collectionsSnapshot from "../../../lovable-handoff/snapshot/medusa-collections.json";
import type { MedusaStoreCategory, MedusaStoreProduct } from "./client";

type RawVariantOption = { value: string; option?: { title?: string } };

/** Collection membership is curated here: the snapshot has no collection links. */
const COLLECTION_MEMBERSHIP: Record<string, string[]> = {
  festive: ["pure-cambric-cotton-set", "blue-floral-salwar-suit", "classic-friday-cotton-kurta"],
  everyday: ["pure-cambric-cotton-set", "first-forms-set", "classic-friday-cotton-kurta"],
  jummah: ["classic-friday-cotton-kurta", "the-stillness-set", "blue-floral-salwar-suit"],
};

export const SNAPSHOT_COLLECTIONS = (
  collectionsSnapshot as { collections: Array<{ id: string; title: string; handle: string }> }
).collections;

export function snapshotHandlesForCollection(handle: string): string[] {
  return COLLECTION_MEMBERSHIP[handle] ?? [];
}

function normalizeVariantOptions(options: unknown): Record<string, string> {
  if (!Array.isArray(options)) return (options as Record<string, string>) ?? {};
  const record: Record<string, string> = {};
  for (const option of options as RawVariantOption[]) {
    const title = option.option?.title ?? "option";
    record[title] = option.value;
  }
  return record;
}

export const SNAPSHOT_PRODUCTS: MedusaStoreProduct[] = (
  productsSnapshot as { products: Array<Record<string, any>> }
).products.map((p) => ({
  id: p["id"],
  title: p["title"],
  handle: p["handle"],
  subtitle: p["subtitle"] ?? null,
  description: p["description"] ?? null,
  thumbnail: p["thumbnail"] ?? null,
  status: p["status"] ?? "published",
  images: (p["images"] ?? []).map((img: { id: string; url: string }) => ({
    id: img.id,
    url: img.url,
  })),
  categories: (p["categories"] ?? []).map((c: { id: string; name: string; handle: string }) => ({
    id: c.id,
    name: c.name,
    handle: c.handle,
  })),
  options: (p["options"] ?? []).map((o: { id: string; title: string; values?: any[] }) => ({
    id: o.id,
    title: o.title,
    values: (o.values ?? []).map((v: { id: string; value: string }) => ({
      id: v.id,
      value: v.value,
    })),
  })),
  variants: (p["variants"] ?? []).map((v: Record<string, any>) => ({
    id: v["id"],
    title: v["title"],
    sku: v["sku"],
    manage_inventory: Boolean(v["manage_inventory"]),
    options: normalizeVariantOptions(v["options"]),
    calculated_price: v["calculated_price"]
      ? {
          calculated_amount: v["calculated_price"].calculated_amount,
          original_amount: v["calculated_price"].original_amount,
          currency_code: v["calculated_price"].currency_code ?? "inr",
        }
      : undefined,
  })),
  metadata: p["metadata"] ?? null,
}));

export const SNAPSHOT_CATEGORIES: MedusaStoreCategory[] = (
  categoriesSnapshot as { product_categories: Array<Record<string, any>> }
).product_categories.map((c) => ({
  id: c["id"],
  name: c["name"],
  handle: c["handle"],
  description: c["description"] ?? "",
  parent_category_id: c["parent_category_id"] ?? null,
  category_children: [],
}));

export function snapshotProducts(params?: {
  handle?: string;
  categoryId?: string;
  limit?: number;
  offset?: number;
}): { products: MedusaStoreProduct[]; count: number } {
  let list = SNAPSHOT_PRODUCTS;
  if (params?.handle) {
    list = list.filter((p) => p.handle === params.handle);
  }
  if (params?.categoryId) {
    list = list.filter((p) => p.categories?.some((c) => c.id === params.categoryId));
  }
  const offset = params?.offset ?? 0;
  const limit = params?.limit ?? list.length;
  return { products: list.slice(offset, offset + limit), count: list.length };
}
