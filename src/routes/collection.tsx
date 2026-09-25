import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ListFilter, PackageOpen, Search, X } from "lucide-react";
import { Eyebrow, PageContainer, SectionHeading } from "@/components/brand/design-primitives";
import { ProductCard } from "@/components/brand/product-card";
import { StatusState } from "@/components/brand/status-state";
import { useCommerceProducts } from "@/lib/commerce/use-commerce";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import imgPrayer from "@/assets/product-prayer-set.jpg";
import imgChild from "@/assets/product-child-set.jpg";
import imgModest from "@/assets/product-modest-set.jpg";
import imgMenKurta from "@/assets/product-men-kurta.jpg";
import imgBundle from "@/assets/product-bundle.jpg";

export const Route = createFileRoute("/collection")({
  validateSearch: (search: Record<string, unknown>): {
    category?: string | undefined;
    occasion?: string | undefined;
  } => ({
    category: typeof search["category"] === "string" ? search["category"] : undefined,
    occasion: typeof search["occasion"] === "string" ? search["occasion"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "The Collection — Sukoon House" },
      {
        name: "description",
        content:
          "Shop modest apparel for women, men and children, prayer essentials, learning, home ambiance and milestone gifts.",
      },
      { property: "og:title", content: "The Collection — Sukoon House" },
      {
        property: "og:description",
        content: "Seven considered pillars for calm homes and meaningful routines.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CollectionPage,
});

type Pillar = "Women" | "Men" | "Children" | "Prayer" | "Learning" | "Home" | "Gifts";
type Material = "Pure Cotton" | "Chanderi" | "Modal" | "Memory Foam" | "Brass" | "Wood";
type Size = "S" | "M" | "L" | "XL" | "XXL";
type PriceBand = "under-500" | "500-1000" | "1000-2000" | "above-2000";

type Product = {
  id: number | string;
  pillar: Pillar;
  subcategory: string;
  name: string;
  price: number;
  mrp?: number;
  note: string;
  materials: Material[] | string[];
  sizes?: Size[];
  rating: number;
  reviews: number;
  inStock: boolean;
  festive?: boolean;
  badge?: string;
  image: string;
  handle?: string;
};

const pillars: Array<{ id: "All" | Pillar; label: string }> = [
  { id: "All", label: "All Products" },
  { id: "Women", label: "Women's Ethnic & Modest" },
  { id: "Men", label: "Men's Apparel" },
  { id: "Children", label: "Children & Tarbiyah" },
  { id: "Prayer", label: "Prayer & Worship" },
  { id: "Learning", label: "Learning & Books" },
  { id: "Home", label: "Home & Ambiance" },
  { id: "Gifts", label: "Milestone Gifts" },
];

const subcategories: Record<Pillar, string[]> = {
  Women: [
    "Salwar Suit Sets",
    "Kurtas & Kurtis",
    "Modest Dresses",
    "Abayas",
    "Hijabs & Accessories",
  ],
  Men: ["Kurtas", "Kurta-Pajama Sets", "Pathani Suits", "Prayer Caps"],
  Children: ["Boys' Wear", "Girls' Wear", "Habit Boards", "Learning Toys"],
  Prayer: ["Memory Foam Mats", "Pocket Travel Mats", "Bentwood Rehals", "Stone Tasbihs"],
  Learning: ["Card Decks", "Story Books"],
  Home: ["Bakhoor Burners", "Wall Art", "Attars"],
  Gifts: ["Gift Boxes", "Hampers"],
};

const sizes: Size[] = ["S", "M", "L", "XL", "XXL"];
const materials: Material[] = ["Pure Cotton", "Chanderi", "Modal", "Memory Foam", "Brass", "Wood"];
const priceBands: Array<{ id: PriceBand; label: string; hint: string }> = [
  { id: "under-500", label: "Under ₹500", hint: "Hijabs, tasbihs, attars" },
  { id: "500-1000", label: "₹500 – ₹1,000", hint: "Kurtas, books, salah boards" },
  { id: "1000-2000", label: "₹1,000 – ₹2,000", hint: "Suits, foam mats, burners" },
  { id: "above-2000", label: "Above ₹2,000", hint: "Gift hampers, premium abayas" },
];
const inBand = (p: number, b: PriceBand) =>
  b === "under-500"
    ? p < 500
    : b === "500-1000"
      ? p >= 500 && p <= 1000
      : b === "1000-2000"
        ? p > 1000 && p <= 2000
        : p > 2000;

const products: Product[] = [
  {
    id: 1,
    pillar: "Women",
    subcategory: "Salwar Suit Sets",
    name: "Pure Cambric Cotton Salwar Suit Set",
    price: 1499,
    mrp: 1799,
    note: "Sage · Three pieces",
    materials: ["Pure Cotton"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.8,
    reviews: 64,
    inStock: true,
    festive: true,
    badge: "New",
    image: imgModest,
  },
  {
    id: 2,
    pillar: "Women",
    subcategory: "Kurtas & Kurtis",
    name: "Everyday Block Print Cotton Kurta",
    price: 799,
    note: "Indigo block print",
    materials: ["Pure Cotton"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.7,
    reviews: 112,
    inStock: true,
    image: imgModest,
  },
  {
    id: 3,
    pillar: "Women",
    subcategory: "Hijabs & Accessories",
    name: "Micro-Modal Silk Daily Hijab",
    price: 499,
    note: "Oat · Breathable drape",
    materials: ["Modal"],
    rating: 4.9,
    reviews: 208,
    inStock: true,
    image: imgModest,
  },
  {
    id: 4,
    pillar: "Women",
    subcategory: "Abayas",
    name: "Premium Nida Everyday Abaya",
    price: 1899,
    mrp: 2199,
    note: "Stone · Fluid Nida",
    materials: ["Modal"],
    sizes: ["M", "L", "XL"],
    rating: 4.8,
    reviews: 47,
    inStock: true,
    image: imgModest,
  },
  {
    id: 5,
    pillar: "Women",
    subcategory: "Modest Dresses",
    name: "Chanderi Tiered Modest Dress",
    price: 2299,
    note: "Dusty rose · Lined",
    materials: ["Chanderi"],
    sizes: ["S", "M", "L"],
    rating: 4.6,
    reviews: 21,
    inStock: false,
    festive: true,
    image: imgModest,
  },
  {
    id: 6,
    pillar: "Men",
    subcategory: "Kurtas",
    name: "Classic Friday Handloom Cotton Kurta",
    price: 899,
    note: "Ivory · Handloom weave",
    materials: ["Pure Cotton"],
    sizes: ["M", "L", "XL", "XXL"],
    rating: 4.8,
    reviews: 93,
    inStock: true,
    image: imgMenKurta,
  },
  {
    id: 7,
    pillar: "Men",
    subcategory: "Kurta-Pajama Sets",
    name: "Stitched Kurta-Pajama Set",
    price: 1299,
    mrp: 1499,
    note: "Mist grey · Two pieces",
    materials: ["Pure Cotton"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.7,
    reviews: 58,
    inStock: true,
    festive: true,
    image: imgMenKurta,
  },
  {
    id: 8,
    pillar: "Men",
    subcategory: "Pathani Suits",
    name: "Linen-Cotton Pathani Suit",
    price: 1599,
    note: "Olive · Relaxed fit",
    materials: ["Pure Cotton"],
    sizes: ["L", "XL", "XXL"],
    rating: 4.6,
    reviews: 34,
    inStock: true,
    festive: true,
    image: imgMenKurta,
  },
  {
    id: 9,
    pillar: "Men",
    subcategory: "Prayer Caps",
    name: "Breathable Knit Kufi Prayer Cap",
    price: 299,
    note: "White · One size",
    materials: ["Pure Cotton"],
    rating: 4.5,
    reviews: 76,
    inStock: true,
    image: imgBundle,
  },
  {
    id: 10,
    pillar: "Children",
    subcategory: "Boys' Wear",
    name: "Boys' Festive Cotton Kurta Set",
    price: 799,
    mrp: 999,
    note: "Sand · Ages 2–10",
    materials: ["Pure Cotton"],
    sizes: ["S", "M", "L"],
    rating: 4.8,
    reviews: 41,
    inStock: true,
    festive: true,
    image: imgChild,
  },
  {
    id: 11,
    pillar: "Children",
    subcategory: "Girls' Wear",
    name: "Girls' Cotton Sharara Suit",
    price: 999,
    note: "Blush · Ages 3–10",
    materials: ["Pure Cotton"],
    sizes: ["S", "M"],
    rating: 4.9,
    reviews: 29,
    inStock: true,
    festive: true,
    image: imgChild,
  },
  {
    id: 12,
    pillar: "Children",
    subcategory: "Habit Boards",
    name: "My Daily Salah Magnetic Habit Board",
    price: 899,
    note: "Birch · 35 magnets",
    materials: ["Wood"],
    rating: 4.9,
    reviews: 152,
    inStock: true,
    badge: "Loved",
    image: imgChild,
  },
  {
    id: 13,
    pillar: "Children",
    subcategory: "Learning Toys",
    name: "Arabic Alphabet Wooden Tracing Board",
    price: 649,
    note: "Beech · Ages 3+",
    materials: ["Wood"],
    rating: 4.7,
    reviews: 67,
    inStock: true,
    image: imgChild,
  },
  {
    id: 14,
    pillar: "Prayer",
    subcategory: "Memory Foam Mats",
    name: "Ergonomic Memory Foam Prayer Mat",
    price: 1299,
    mrp: 1599,
    note: "Olive · 15mm cushion",
    materials: ["Memory Foam"],
    rating: 4.9,
    reviews: 241,
    inStock: true,
    image: imgPrayer,
  },
  {
    id: 15,
    pillar: "Prayer",
    subcategory: "Pocket Travel Mats",
    name: "Water-Resistant Pocket Travel Mat",
    price: 399,
    note: "Folds to pocket size",
    materials: [],
    rating: 4.6,
    reviews: 88,
    inStock: true,
    image: imgPrayer,
  },
  {
    id: 16,
    pillar: "Prayer",
    subcategory: "Bentwood Rehals",
    name: "Ergonomic Bentwood Quran Stand Rehal",
    price: 899,
    note: "Walnut finish",
    materials: ["Wood"],
    rating: 4.8,
    reviews: 73,
    inStock: true,
    image: imgPrayer,
  },
  {
    id: 17,
    pillar: "Prayer",
    subcategory: "Stone Tasbihs",
    name: "99-Bead Natural Agate Stone Tasbih",
    price: 599,
    note: "Grey agate · Tassel",
    materials: [],
    rating: 4.7,
    reviews: 55,
    inStock: false,
    image: imgPrayer,
  },
  {
    id: 18,
    pillar: "Learning",
    subcategory: "Card Decks",
    name: "Daily Dua & Hadith 50-Card Family Deck",
    price: 499,
    note: "Illustrated · Bilingual",
    materials: [],
    rating: 4.9,
    reviews: 134,
    inStock: true,
    image: imgChild,
  },
  {
    id: 19,
    pillar: "Learning",
    subcategory: "Story Books",
    name: "Illustrated Bedtime Quran Stories Book",
    price: 450,
    note: "Hardcover · 96 pages",
    materials: [],
    rating: 4.8,
    reviews: 98,
    inStock: true,
    image: imgChild,
  },
  {
    id: 20,
    pillar: "Home",
    subcategory: "Bakhoor Burners",
    name: "Cast Brass Charcoal Bakhoor Burner",
    price: 899,
    note: "Hand-finished brass",
    materials: ["Brass"],
    rating: 4.7,
    reviews: 39,
    inStock: true,
    festive: true,
    image: imgBundle,
  },
  {
    id: 21,
    pillar: "Home",
    subcategory: "Wall Art",
    name: "Laser-Cut Ayatul Kursi Metal Wall Art",
    price: 1499,
    note: "Matte gold · 60cm",
    materials: ["Brass"],
    rating: 4.8,
    reviews: 26,
    inStock: true,
    image: imgBundle,
  },
  {
    id: 22,
    pillar: "Home",
    subcategory: "Attars",
    name: "Sandalwood & Amber Non-Alcoholic Attar",
    price: 499,
    note: "12ml · Roll-on",
    materials: [],
    rating: 4.6,
    reviews: 61,
    inStock: true,
    image: imgBundle,
  },
  {
    id: 23,
    pillar: "Gifts",
    subcategory: "Gift Boxes",
    name: "The Serene Prayer Sanctuary Gift Box",
    price: 2499,
    mrp: 2899,
    note: "Mat, tasbih & attar",
    materials: ["Memory Foam"],
    rating: 4.9,
    reviews: 44,
    inStock: true,
    festive: true,
    badge: "Gift",
    image: imgBundle,
  },
  {
    id: 24,
    pillar: "Gifts",
    subcategory: "Hampers",
    name: "The Eid Family Celebration Hamper",
    price: 2199,
    note: "Six pieces · Gift wrapped",
    materials: ["Brass", "Wood"],
    rating: 4.8,
    reviews: 32,
    inStock: true,
    festive: true,
    badge: "Gift",
    image: imgBundle,
  },
];

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const PAGE = 8;

function CollectionPage() {
  const search = Route.useSearch();
  const initialPillar = useMemo(() => {
    if (!search.category) return "All";
    const match = pillars.find((p) => p.id.toLowerCase() === search.category?.toLowerCase());
    return match ? (match.id as "All" | Pillar) : "All";
  }, [search.category]);

  const [pillar, setPillar] = useState<"All" | Pillar>(initialPillar);
  const [sub, setSub] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selSizes, setSelSizes] = useState<Size[]>([]);
  const [band, setBand] = useState<PriceBand | null>(null);
  const [selMaterials, setSelMaterials] = useState<Material[]>([]);
  const [under999, setUnder999] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [festive, setFestive] = useState(search.occasion === "festive");
  const [sort, setSort] = useState("featured");
  const [visible, setVisible] = useState(PAGE);

  useEffect(() => {
    if (search.category) {
      const match = pillars.find((p) => p.id.toLowerCase() === search.category?.toLowerCase());
      if (match) {
        setPillar(match.id as "All" | Pillar);
        setSub(null);
        setVisible(PAGE);
      }
    }
  }, [search.category]);

  useEffect(() => {
    if (search.occasion === "festive") {
      setFestive(true);
      setVisible(PAGE);
    }
  }, [search.occasion]);

  const { data: liveProducts } = useCommerceProducts();

  const allProducts = useMemo(() => {
    if (liveProducts && liveProducts.length > 0) {
      const liveNames = new Set(liveProducts.map((p) => p.name.toLowerCase()));
      const fallbackProducts = products.filter(
        (p) => !liveNames.has(p.name.toLowerCase())
      );
      return [...liveProducts, ...fallbackProducts] as Product[];
    }
    return products;
  }, [liveProducts]);

  const apparelContext =
    pillar === "All"
      ? true
      : allProducts.some((p) => p.pillar === pillar && (!sub || p.subcategory === sub) && p.sizes);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const r = allProducts.filter(
      (p) =>
        (pillar === "All" || p.pillar === pillar) &&
        (!sub || p.subcategory === sub) &&
        (selSizes.length === 0 || (p.sizes?.some((s) => selSizes.includes(s)) ?? false)) &&
        (!band || inBand(p.price, band)) &&
        (selMaterials.length === 0 || p.materials.some((m) => selMaterials.includes(m as any))) &&
        (!under999 || p.price < 999) &&
        (!inStockOnly || p.inStock) &&
        (!festive || p.festive) &&
        (!q ||
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.pillar.toLowerCase().includes(q) ||
          p.materials?.some((m) => m.toLowerCase().includes(q))),
    );
    if (sort === "price-low") return [...r].sort((a, b) => a.price - b.price);
    if (sort === "price-high") return [...r].sort((a, b) => b.price - a.price);
    if (sort === "rating")
      return [...r].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    return r;
  }, [allProducts, pillar, sub, selSizes, band, selMaterials, under999, inStockOnly, festive, sort, searchQuery]);

  const touch = () => setVisible(PAGE);
  const choosePillar = (p: "All" | Pillar) => {
    setPillar(p);
    setSub(null);
    const hasApparel = p === "All" || products.some((x) => x.pillar === p && x.sizes);
    if (!hasApparel) setSelSizes([]);
    touch();
  };
  const resetFilters = () => {
    setPillar("All");
    setSub(null);
    setSearchQuery("");
    setSelSizes([]);
    setBand(null);
    setSelMaterials([]);
    setUnder999(false);
    setInStockOnly(false);
    setFestive(false);
    touch();
  };
  const toggle = <T,>(v: T, arr: T[], set: (x: T[]) => void) => {
    set(arr.includes(v) ? arr.filter((i) => i !== v) : [...arr, v]);
    touch();
  };

  const activeFilters =
    (pillar === "All" ? 0 : 1) +
    (sub ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0) +
    selSizes.length +
    (band ? 1 : 0) +
    selMaterials.length +
    Number(under999) +
    Number(inStockOnly) +
    Number(festive);

  const shown = filtered.slice(0, visible);

  const filters = (
    <div className="space-y-8">
      <fieldset>
        <legend className="eyebrow mb-4 text-foreground">Category</legend>
        <Select value={pillar} onValueChange={(v) => choosePillar(v as "All" | Pillar)}>
          <SelectTrigger aria-label="Category">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {pillars.map((p) => (
              <SelectItem key={p.id} value={p.id}>
                {p.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {pillar !== "All" ? (
          <Select
            value={sub ?? "all"}
            onValueChange={(v) => {
              setSub(v === "all" ? null : v);
              touch();
            }}
          >
            <SelectTrigger className="mt-3" aria-label="Subcategory">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All {pillar}</SelectItem>
              {subcategories[pillar].map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : null}
      </fieldset>

      {apparelContext ? (
        <fieldset>
          <legend className="eyebrow mb-4 text-foreground">Size</legend>
          <div className="flex flex-wrap gap-2">
            {sizes.map((s) => (
              <Chip
                key={s}
                active={selSizes.includes(s)}
                onClick={() => toggle(s, selSizes, setSelSizes)}
              >
                {s}
              </Chip>
            ))}
          </div>
        </fieldset>
      ) : null}

      <fieldset>
        <legend className="eyebrow mb-4 text-foreground">Price band</legend>
        <div className="space-y-3" role="radiogroup">
          {priceBands.map((b) => (
            <label key={b.id} className="flex cursor-pointer items-start gap-3 text-sm">
              <input
                type="radio"
                name="price-band"
                className="mt-1 accent-primary"
                checked={band === b.id}
                onChange={() => {
                  setBand(b.id);
                  touch();
                }}
                onClick={() => {
                  if (band === b.id) {
                    setBand(null);
                    touch();
                  }
                }}
              />
              <span>
                {b.label}
                <span className="block text-xs text-muted-foreground">{b.hint}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="eyebrow mb-4 text-foreground">Fabric / material</legend>
        <div className="space-y-3">
          {materials.map((m) => {
            const id = `mat-${m}`.replaceAll(" ", "-").toLowerCase();
            return (
              <div key={m} className="flex items-center gap-3">
                <Checkbox
                  id={id}
                  checked={selMaterials.includes(m)}
                  onCheckedChange={() => toggle(m, selMaterials, setSelMaterials)}
                />
                <Label htmlFor={id} className="cursor-pointer text-sm font-normal">
                  {m}
                </Label>
              </div>
            );
          })}
        </div>
      </fieldset>

      <div className="flex items-center justify-between gap-3">
        <Label htmlFor="in-stock" className="text-sm font-normal">
          In stock only
        </Label>
        <Switch
          id="in-stock"
          checked={inStockOnly}
          onCheckedChange={(v) => {
            setInStockOnly(v);
            touch();
          }}
        />
      </div>

      {activeFilters > 0 ? (
        <Button variant="outline" className="w-full" onClick={resetFilters}>
          Clear all filters
        </Button>
      ) : null}
    </div>
  );

  return (
    <>
      <section className="border-b border-border bg-secondary/40">
        <PageContainer className="section-space">
          <SectionHeading
            index="01"
            eyebrow="The collection"
            title="Objects for a more considered rhythm."
            copy="Seven pillars for dressing, praying, learning, and gathering — honest materials, quiet forms, and only what earns its place."
          />
          <div className="mt-10 overflow-x-auto pb-1">
            <div className="flex min-w-max gap-2" role="tablist" aria-label="Product pillars">
              {pillars.map((p) => (
                <Button
                  key={p.id}
                  size="sm"
                  variant={pillar === p.id ? "default" : "outline"}
                  role="tab"
                  aria-selected={pillar === p.id}
                  onClick={() => choosePillar(p.id)}
                >
                  {p.label}
                </Button>
              ))}
            </div>
          </div>
          {pillar !== "All" ? (
            <div className="mt-4 overflow-x-auto pb-1">
              <div className="flex min-w-max gap-2" aria-label="Subcategories">
                <Chip
                  active={!sub}
                  onClick={() => {
                    setSub(null);
                    touch();
                  }}
                >
                  All {pillar}
                </Chip>
                {subcategories[pillar].map((s) => (
                  <Chip
                    key={s}
                    active={sub === s}
                    onClick={() => {
                      setSub(sub === s ? null : s);
                      touch();
                    }}
                  >
                    {s}
                  </Chip>
                ))}
              </div>
            </div>
          ) : null}
        </PageContainer>
      </section>

      <div className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur lg:static lg:border-0 lg:bg-transparent">
        <PageContainer className="py-3 lg:pt-10 lg:pb-0">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:border-b lg:border-border lg:pb-5">
            <div className="flex items-center gap-3 flex-1 max-w-sm">
              <div className="relative w-full">
                <Search className="absolute left-3 top-2.5 size-3.5 text-muted-foreground" />
                <Input
                  placeholder="Search pure cambric, salwar, mats..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    touch();
                  }}
                  className="h-9 pl-9 pr-8 text-xs rounded-full bg-card/60"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      touch();
                    }}
                    className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <X className="size-3.5" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex shrink-0 items-center justify-between sm:justify-end gap-2">
              <p className="min-w-0 text-xs text-muted-foreground hidden md:block">
                Showing <span className="font-semibold text-foreground">{shown.length}</span> of{" "}
                <span className="font-semibold text-foreground">{filtered.length}</span> products
              </p>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    <ListFilter /> Filters
                    {activeFilters ? (
                      <span className="rounded-full bg-muted px-2 text-xs text-muted-foreground">
                        {activeFilters}
                      </span>
                    ) : null}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[88vw] overflow-y-auto">
                  <SheetHeader className="mb-8 text-left">
                    <SheetTitle className="font-display text-2xl">Refine the collection</SheetTitle>
                    <SheetDescription>Choose only what matters to you.</SheetDescription>
                  </SheetHeader>
                  {filters}
                </SheetContent>
              </Sheet>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-36 sm:w-48" aria-label="Sort products">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:mt-5">
            <Chip
              active={under999}
              onClick={() => {
                setUnder999(!under999);
                touch();
              }}
            >
              Under ₹999
            </Chip>
            <Chip
              active={inStockOnly}
              onClick={() => {
                setInStockOnly(!inStockOnly);
                touch();
              }}
            >
              In Stock Only
            </Chip>
            <Chip
              active={festive}
              onClick={() => {
                setFestive(!festive);
                touch();
              }}
            >
              Festive Ready
            </Chip>
          </div>
        </PageContainer>
      </div>

      <PageContainer className="pb-20 pt-8 lg:pt-10">
        <div className="grid items-start gap-10 lg:grid-cols-[14rem_minmax(0,1fr)]">
          <aside className="hidden lg:sticky lg:top-6 lg:block" aria-label="Product filters">
            <Eyebrow className="mb-7 text-foreground">Refine</Eyebrow>
            {filters}
          </aside>
          <div className="min-w-0">
            {filtered.length === 0 ? (
              <StatusState
                icon={PackageOpen}
                eyebrow="No pieces found"
                title="A quieter shelf than expected"
                description="Try removing one or two filters to see more of the collection."
                action="Clear all filters"
                onAction={resetFilters}
              />
            ) : (
              <>
                <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                  {shown.map((p) => (
                    <ProductCard
                      key={p.id}
                      image={p.image}
                      imageAlt={p.name}
                      category={p.subcategory}
                      name={p.name}
                      price={inr(p.price)}
                      previousPrice={p.mrp ? inr(p.mrp) : undefined}
                      savings={p.mrp ? inr(p.mrp - p.price) : undefined}
                      note={p.note}
                      badge={p.badge}
                      sizes={p.sizes}
                      rating={p.rating}
                      reviewCount={p.reviews}
                      inStock={p.inStock}
                      href={p.handle ? `/products/${p.handle}` : undefined}
                    />
                  ))}
                </div>
                {visible < filtered.length ? (
                  <div className="mt-14 border-t border-border pt-8 text-center">
                    <p className="mb-4 text-sm text-muted-foreground">
                      Showing {shown.length} of {filtered.length} products
                    </p>
                    <Button variant="outline" onClick={() => setVisible((c) => c + PAGE)}>
                      Load more
                    </Button>
                  </div>
                ) : null}
              </>
            )}
          </div>
        </div>
      </PageContainer>
    </>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "min-h-9 shrink-0 rounded-full border px-3.5 text-sm transition-colors duration-brand-fast ease-brand",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-muted text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
