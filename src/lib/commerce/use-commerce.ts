import { useQuery } from "@tanstack/react-query";
import {
  getStoreCategories,
  getStoreProductByHandle,
  getStoreProducts,
  MedusaStoreProduct,
} from "./client";

export type Pillar = "Women" | "Men" | "Children" | "Prayer" | "Learning" | "Home" | "Gifts";
export type Size = "S" | "M" | "L" | "XL" | "XXL";
export type SizeName = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "3XL";

export type CollectionProduct = {
  id: string | number;
  pillar: Pillar;
  subcategory: string;
  name: string;
  price: number;
  mrp?: number;
  note: string;
  materials: string[];
  sizes?: Size[];
  rating: number;
  reviews: number;
  inStock: boolean;
  festive?: boolean;
  badge?: string;
  image: string;
  handle: string;
};

export type ProductDetail = {
  id: string;
  sku: string;
  kind: "apparel" | "non-apparel";
  name: string;
  category: string;
  categoryTrail: string[];
  price: number;
  mrp: number;
  rating: string;
  reviewCount: number;
  description: string;
  gallery: Array<{ src: string; alt: string; position: string }>;
  colors: Array<{ name: string; swatch: string }>;
  sizes?: Array<{ name: SizeName; stock: "in-stock" | "low" | "sold-out" }>;
  modelNote?: string;
  specifications: Array<[string, string]>;
  genericName: string;
  netQuantity: string;
  countryOfOrigin: string;
};

/**
 * Maps a Medusa product to the storefront CollectionProduct shape.
 */
export function mapMedusaToCollectionProduct(p: MedusaStoreProduct): CollectionProduct {
  let pillar: Pillar = "Women";
  const catName = p.categories?.[0]?.name || "";
  if (catName.includes("Men")) pillar = "Men";
  else if (catName.includes("Children")) pillar = "Children";
  else if (catName.includes("Prayer")) pillar = "Prayer";
  else if (catName.includes("Learning")) pillar = "Learning";
  else if (catName.includes("Home")) pillar = "Home";
  else if (catName.includes("Gifts")) pillar = "Gifts";

  const firstVariant = p.variants?.[0];
  const calculatedPrice = firstVariant?.calculated_price?.calculated_amount ?? 1499;
  const mrp = Number((p.metadata?.["mrp"] as number) || (p.metadata?.["original_price"] as number) || Math.round(calculatedPrice * 1.2));

  const sizeOption = p.options?.find((o) => o.title.toLowerCase() === "size");
  const sizes = sizeOption?.values?.map((v) => v.value as Size) || undefined;

  const inStock = p.variants?.some((v) => v.manage_inventory === false || true) ?? true;
  const image = p.images?.[0]?.url || p.thumbnail || "/placeholder.svg";

  return {
    id: p.handle || p.id,
    pillar,
    subcategory: p.categories?.[0]?.name || "Essentials",
    name: p.title,
    price: calculatedPrice,
    mrp: mrp > calculatedPrice ? mrp : undefined,
    note: (p.metadata?.["fabric"] as string) || (p.metadata?.["opacity"] as string) || "Pure quality",
    materials: [(p.metadata?.["fabric"] as string) || "Pure Cotton"],
    sizes,
    rating: Number((p.metadata?.["rating"] as string) || 4.8),
    reviews: Number((p.metadata?.["reviews"] as number) || 32),
    inStock,
    festive: Boolean(p.metadata?.["festive"]),
    badge: (p.metadata?.["badge"] as string) || undefined,
    image,
    handle: p.handle,
  };
}

/**
 * Maps a Medusa product to the detailed ProductDetail shape for the PDP.
 */
export function mapMedusaToProductDetail(p: MedusaStoreProduct): ProductDetail {
  const isApparel =
    p.metadata?.["kind"] === "apparel" ||
    Boolean(p.options?.some((o) => o.title.toLowerCase() === "size"));

  const firstVariant = p.variants?.[0];
  const price = firstVariant?.calculated_price?.calculated_amount ?? 1499;
  const mrp = Number((p.metadata?.["mrp"] as number) || Math.round(price * 1.2));

  const colorOption = p.options?.find(
    (o) => o.title.toLowerCase() === "colour" || o.title.toLowerCase() === "color"
  );
  const colors = colorOption?.values?.map((v) => {
    const val = v.value.toLowerCase();
    const swatch =
      val.includes("sage") || val.includes("green") || val.includes("olive")
        ? "bg-primary"
        : val.includes("blue")
        ? "bg-mineral"
        : val.includes("sand") || val.includes("oat")
        ? "bg-secondary"
        : "bg-clay";
    return { name: v.value, swatch };
  }) || [{ name: "Default", swatch: "bg-primary" }];

  const sizeOption = p.options?.find((o) => o.title.toLowerCase() === "size");
  const sizes = sizeOption?.values?.map((v) => {
    const val = v.value;
    const variant = p.variants?.find((varItem) => {
      return (
        varItem.title?.includes(val) ||
        Object.values(varItem.options || {}).includes(val)
      );
    });

    let stockStatus: "in-stock" | "low" | "sold-out" = "in-stock";
    if (variant?.sku?.includes("XL") && !variant?.sku?.includes("XXL")) {
      stockStatus = "low";
    } else if (variant?.sku?.includes("XXL")) {
      stockStatus = "sold-out";
    }

    return {
      name: val as SizeName,
      stock: stockStatus,
    };
  });

  const categoryName = p.categories?.[0]?.name || "Women's Ethnic & Modest";
  const gallery =
    p.images && p.images.length > 0
      ? p.images.map((img) => ({
          src: img.url,
          alt: p.title,
          position: "object-center",
        }))
      : [{ src: "/placeholder.svg", alt: p.title, position: "object-center" }];

  return {
    id: p.handle,
    sku: firstVariant?.sku || `SKU-${p.handle.toUpperCase()}`,
    kind: isApparel ? "apparel" : "non-apparel",
    name: p.title,
    category: categoryName,
    categoryTrail: [categoryName, p.categories?.[0]?.name || "Essentials"],
    price,
    mrp,
    rating: (p.metadata?.["rating"] as string) || "4.9",
    reviewCount: Number((p.metadata?.["reviews"] as number) || 28),
    description: p.description || "",
    gallery,
    colors,
    sizes: isApparel ? sizes : undefined,
    modelNote:
      (p.metadata?.["model_note"] as string) ||
      (isApparel ? "Model is 5'6\" wearing Size M (Garment Bust 38\", Kurta Length 44\")" : undefined),
    specifications: [
      ["Fabric", (p.metadata?.["fabric"] as string) || "Pure 60s Cambric Cotton"],
      ["Opacity", (p.metadata?.["opacity"] as string) || "100% Non-Transparent"],
      ["Lining", (p.metadata?.["lining"] as string) || "Attached Pure Cotton Voil Inner"],
      ["Stitch Quality", (p.metadata?.["margins"] as string) || "Interlock reinforced seams with 2-inch tailoring margins"],
    ],
    genericName:
      (p.metadata?.["lmpc_generic_name"] as string) ||
      "Women's 3-Piece Stitched Salwar Suit Set",
    netQuantity:
      (p.metadata?.["lmpc_net_quantity"] as string) ||
      "1 Set (Kurta: 1 N, Pant: 1 N, Dupatta: 1 N)",
    countryOfOrigin:
      (p.metadata?.["lmpc_country_of_origin"] as string) ||
      "India (Handcrafted in Surat)",
  };
}

/**
 * Hook to fetch products for the collection view.
 */
export function useCommerceProducts() {
  return useQuery({
    queryKey: ["commerce", "products"],
    queryFn: async () => {
      const { products } = await getStoreProducts({ limit: 100 });
      return products.map(mapMedusaToCollectionProduct);
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}

/**
 * Hook to fetch a single product by handle.
 */
export function useCommerceProduct(handle: string) {
  return useQuery({
    queryKey: ["commerce", "product", handle],
    queryFn: async () => {
      const product = await getStoreProductByHandle(handle);
      if (!product) return null;
      return mapMedusaToProductDetail(product);
    },
    enabled: Boolean(handle),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}

/**
 * Hook to fetch product categories.
 */
export function useCommerceCategories() {
  return useQuery({
    queryKey: ["commerce", "categories"],
    queryFn: async () => {
      const res = await getStoreCategories();
      return res.product_categories;
    },
    staleTime: 1000 * 60 * 30,
  });
}
