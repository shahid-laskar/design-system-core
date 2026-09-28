import { useQuery } from "@tanstack/react-query";
import {
  getStoreCategories,
  getStoreProductByHandle,
  getStoreProducts,
  MedusaStoreProduct,
} from "./client";
import { findCatalogProduct } from "./catalog-data";

/** Folded-fabric / placeholder assets that must never lead apparel merchandising. */
const WEAK_CATALOG_IMAGE_MARKERS = [
  "product-modest-set",
  "product-men-kurta",
  "product-child-set",
  "women-hijab-abaya",
  "unsplash.com",
  "placeholder",
];

function isWeakCatalogImage(url?: string | null): boolean {
  if (!url) return true;
  const lower = url.toLowerCase();
  return WEAK_CATALOG_IMAGE_MARKERS.some((marker) => lower.includes(marker));
}

export type Pillar = "Women" | "Men" | "Children" | "Prayer" | "Learning" | "Home" | "Gifts";
export type Size = "S" | "M" | "L" | "XL" | "XXL";
export type SizeName = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "3XL";

function variantOptionValues(
  options:
    Record<string, string> | Array<{ value?: string; option?: { title?: string } }> | undefined,
) {
  if (Array.isArray(options)) {
    return options.reduce<Record<string, string>>((result, option) => {
      if (option.option?.title && option.value) result[option.option.title] = option.value;
      return result;
    }, {});
  }
  return options ?? {};
}

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
  hoverImage?: string;
  handle: string;
  createdAt?: string;
  sizeStock?: Record<string, "in" | "low" | "out">;
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
  handle?: string;
  variants?: Array<{
    id: string;
    title: string;
    sku: string;
    options?: Record<string, string>;
    price?: number;
    originalPrice?: number;
  }>;
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
  const calculatedPrice = firstVariant?.calculated_price?.calculated_amount ?? 0;

  // Never invent a discount. An MRP is only shown when the backend actually
  // supplies one (product metadata, or a Medusa original_amount above the
  // calculated amount because a price list is active).
  const metadataMrp = Number(
    (p.metadata?.["mrp"] as number) ?? (p.metadata?.["original_price"] as number) ?? 0,
  );
  const originalAmount = firstVariant?.calculated_price?.original_amount ?? 0;
  const mrpCandidate = metadataMrp || originalAmount;

  const sizeOption = p.options?.find((o) => o.title.toLowerCase() === "size");
  const sizes = sizeOption?.values?.map((v) => v.value as Size) || undefined;

  const inStock =
    p.variants?.some(
      (v) =>
        !v.manage_inventory ||
        v.allow_backorder === true ||
        v.inventory_quantity === undefined ||
        v.inventory_quantity > 0,
    ) ?? true;
  const sizeStock = sizeOption?.values?.reduce<Record<string, "in" | "low" | "out">>(
    (result, value) => {
      const variants = (p.variants ?? []).filter((variant) =>
        Object.values(variantOptionValues(variant.options)).some(
          (option) => option === value.value,
        ),
      );
      const stock = variants.reduce<"in" | "low" | "out">((current, variant) => {
        if (
          variant.inventory_quantity !== undefined &&
          variant.inventory_quantity <= 0 &&
          !variant.allow_backorder
        ) {
          return current === "in" ? "out" : current;
        }
        if (variant.inventory_quantity !== undefined && variant.inventory_quantity <= 2) {
          return "low";
        }
        return "in";
      }, "out");
      result[value.value as Size] = stock;
      return result;
    },
    {},
  );
  const curated = findCatalogProduct(p.handle);
  const medusaPrimary = p.images?.[0]?.url || p.thumbnail;
  const curatedPrimary = curated?.gallery?.[0]?.src;
  const curatedHover = curated?.gallery?.[1]?.src;

  // Prefer curated worn/silhouette photography whenever Medusa still serves weak assets.
  let image =
    curatedPrimary && isWeakCatalogImage(medusaPrimary)
      ? curatedPrimary
      : medusaPrimary || curatedPrimary || "/images/salwar-suit-sage.jpg";

  let hoverImage = p.images?.[1]?.url;
  if (!hoverImage || isWeakCatalogImage(hoverImage)) {
    hoverImage = curatedHover;
  }

  // Ratings and review counts are never fabricated — absent means 0, and the
  // UI omits the rating row entirely.
  const rating = Number(p.metadata?.["rating"] ?? 0);
  const reviews = Number(p.metadata?.["reviews"] ?? 0);

  return {
    id: p.handle || p.id,
    pillar,
    subcategory: p.categories?.[0]?.name || "Essentials",
    name: p.title,
    price: calculatedPrice,
    mrp: mrpCandidate > calculatedPrice ? mrpCandidate : undefined,
    note:
      (p.metadata?.["fabric"] as string) || (p.metadata?.["opacity"] as string) || p.subtitle || "",
    materials: [(p.metadata?.["fabric"] as string) || "Pure Cotton"],
    sizes,
    rating,
    reviews,
    inStock,
    festive: Boolean(p.metadata?.["festive"]),
    badge: (p.metadata?.["badge"] as string) || undefined,
    image,
    hoverImage,
    handle: p.handle,
    createdAt: p.created_at,
    sizeStock,
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
  const metadataMrp = Number(p.metadata?.["mrp"] ?? 0);
  const originalAmount = firstVariant?.calculated_price?.original_amount ?? price;
  const mrp = Math.max(price, metadataMrp || originalAmount);

  const colorOption = p.options?.find(
    (o) => o.title.toLowerCase() === "colour" || o.title.toLowerCase() === "color",
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
        Object.values(variantOptionValues(varItem.options)).includes(val)
      );
    });

    let stockStatus: "in-stock" | "low" | "sold-out" = "in-stock";
    if (
      variant?.inventory_quantity !== undefined &&
      variant.inventory_quantity <= 0 &&
      !variant.allow_backorder
    ) {
      stockStatus = "sold-out";
    } else if (variant?.inventory_quantity !== undefined && variant.inventory_quantity <= 2) {
      stockStatus = "low";
    }

    return {
      name: val as SizeName,
      stock: stockStatus,
    };
  });

  const categoryName = p.categories?.[0]?.name || "Women's Ethnic & Modest";
  const curated = findCatalogProduct(p.handle);
  const medusaImages = p.images ?? [];
  const medusaPrimaryWeak =
    medusaImages.length === 0 || isWeakCatalogImage(medusaImages[0]?.url || p.thumbnail);

  // Prefer curated worn/silhouette galleries whenever Medusa still serves weak assets.
  const gallery =
    curated?.gallery && medusaPrimaryWeak
      ? curated.gallery
      : medusaImages.length > 0 && !medusaPrimaryWeak
        ? medusaImages.map((img) => ({
            src: img.url,
            alt: p.title,
            position: "object-center" as const,
          }))
        : (curated?.gallery ?? [
            {
              src: p.thumbnail || "/images/salwar-suit-sage.jpg",
              alt: p.title,
              position: "object-center" as const,
            },
          ]);

  const rawTrail =
    curated?.categoryTrail && curated.categoryTrail.length > 0
      ? curated.categoryTrail
      : [categoryName, p.categories?.[0]?.name || "Essentials"];
  const categoryTrail = Array.from(new Set(rawTrail.filter(Boolean)));

  return {
    id: p.handle,
    sku: firstVariant?.sku || `SKU-${p.handle.toUpperCase()}`,
    kind: isApparel ? "apparel" : "non-apparel",
    name: p.title,
    category: categoryName,
    categoryTrail,
    price,
    mrp,
    rating: p.metadata?.["rating"] ? String(p.metadata["rating"]) : "",
    reviewCount: Number(p.metadata?.["reviews"] ?? 0),
    description: p.description || "",
    gallery,
    colors,
    sizes: isApparel ? sizes : undefined,
    modelNote:
      (p.metadata?.["model_note"] as string) ||
      (isApparel
        ? 'Model is 5\'6" wearing Size M (Garment Bust 38", Kurta Length 44")'
        : undefined),
    specifications: [
      ["Fabric", (p.metadata?.["fabric"] as string) || "Pure 60s Cambric Cotton"],
      ["Opacity", (p.metadata?.["opacity"] as string) || "100% Non-Transparent"],
      ["Lining", (p.metadata?.["lining"] as string) || "Attached Pure Cotton Voil Inner"],
      [
        "Stitch Quality",
        (p.metadata?.["margins"] as string) ||
          "Interlock reinforced seams with 2-inch tailoring margins",
      ],
    ],
    genericName:
      (p.metadata?.["lmpc_generic_name"] as string) || "Women's 3-Piece Stitched Salwar Suit Set",
    netQuantity:
      (p.metadata?.["lmpc_net_quantity"] as string) ||
      "1 Set (Kurta: 1 N, Pant: 1 N, Dupatta: 1 N)",
    countryOfOrigin:
      (p.metadata?.["lmpc_country_of_origin"] as string) || "India (Handcrafted in Surat)",
    handle: p.handle,
    variants: p.variants?.map((v) => ({
      id: v.id,
      title: v.title,
      sku: v.sku,
      options: variantOptionValues(v.options),
      price: v.calculated_price?.calculated_amount,
      originalPrice: v.calculated_price?.original_amount,
    })),
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
