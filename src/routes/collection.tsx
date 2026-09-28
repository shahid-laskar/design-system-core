import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Grid2X2, ListFilter, PackageOpen, Search, Rows3, X, ChevronRight } from "lucide-react";
import { Eyebrow, PageContainer, SectionHeading } from "@/components/brand/design-primitives";
import { ProductCard } from "@/components/brand/product-card";
import { StatusState } from "@/components/brand/status-state";
import {
  mapMedusaToCollectionProduct,
  useCommerceProducts,
  type CollectionProduct,
} from "@/lib/commerce/use-commerce";
import { SNAPSHOT_PRODUCTS } from "@/lib/commerce/snapshot-fallback";
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
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { cn } from "@/lib/utils";
import imgPrayer from "@/assets/product-prayer-set.jpg";
import imgChild from "@/assets/product-child-set.jpg";
import imgMenKurta from "@/assets/product-men-kurta.jpg";
import imgBundle from "@/assets/product-bundle.jpg";
import imgWSalwar from "@/assets/women-salwar.jpg";
import imgWKurta from "@/assets/women-kurta.jpg";
import imgWHijab from "@/assets/women-hijab-abaya.jpg";
import imgWDress from "@/assets/women-dress.jpg";
import imgModestSet from "@/assets/product-modest-set.jpg";
import imgGifts from "@/assets/pillar-gifts.jpg";

export const Route = createFileRoute("/collection")({
  validateSearch: (
    search: Record<string, unknown>,
  ): {
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
  hoverImage?: string;
  handle?: string;
  createdAt?: string;
  sizeStock?: Record<string, "in" | "low" | "out">;
};

const pillars: Array<{ id: "All" | Pillar; label: string; handle: string }> = [
  { id: "All", label: "All Products", handle: "all" },
  { id: "Women", label: "Women's Ethnic & Modest", handle: "women" },
  { id: "Men", label: "Men's Apparel", handle: "men" },
  { id: "Children", label: "Children & Tarbiyah", handle: "children" },
  { id: "Prayer", label: "Prayer & Worship", handle: "prayer" },
  { id: "Learning", label: "Learning & Books", handle: "learning" },
  { id: "Home", label: "Home & Ambiance", handle: "home" },
  { id: "Gifts", label: "Milestone Gifts", handle: "gifts" },
];

const pillarTheme: Record<
  "All" | Pillar,
  {
    bgClass: string;
    activeButtonClass: string;
    badgeClass: string;
    eyebrowText: string;
  }
> = {
  All: {
    bgClass: "bg-warm-ivory",
    activeButtonClass: "bg-primary text-primary-foreground border-primary hover:bg-primary/90",
    badgeClass: "bg-primary text-primary-foreground",
    eyebrowText: "The collection",
  },
  Women: {
    bgClass: "bg-pillar-women-bg",
    activeButtonClass:
      "bg-pillar-women-accent text-white border-pillar-women-accent hover:bg-pillar-women-accent/90",
    badgeClass: "bg-pillar-women-accent text-white",
    eyebrowText: "Women's collection",
  },
  Men: {
    bgClass: "bg-pillar-men-bg",
    activeButtonClass:
      "bg-pillar-men-accent text-white border-pillar-men-accent hover:bg-pillar-men-accent/90",
    badgeClass: "bg-pillar-men-accent text-white",
    eyebrowText: "Men's collection",
  },
  Children: {
    bgClass: "bg-pillar-kids-bg",
    activeButtonClass:
      "bg-pillar-kids-accent text-white border-pillar-kids-accent hover:bg-pillar-kids-accent/90",
    badgeClass: "bg-pillar-kids-accent text-white",
    eyebrowText: "Children's collection",
  },
  Learning: {
    bgClass: "bg-pillar-kids-bg",
    activeButtonClass:
      "bg-pillar-kids-accent text-white border-pillar-kids-accent hover:bg-pillar-kids-accent/90",
    badgeClass: "bg-pillar-kids-accent text-white",
    eyebrowText: "Learning & tarbiyah",
  },
  Prayer: {
    bgClass: "bg-pillar-prayer-bg",
    activeButtonClass:
      "bg-pillar-prayer-accent text-white border-pillar-prayer-accent hover:bg-pillar-prayer-accent/90",
    badgeClass: "bg-pillar-prayer-accent text-white",
    eyebrowText: "Prayer & worship",
  },
  Home: {
    bgClass: "bg-pillar-prayer-bg",
    activeButtonClass:
      "bg-pillar-prayer-accent text-white border-pillar-prayer-accent hover:bg-pillar-prayer-accent/90",
    badgeClass: "bg-pillar-prayer-accent text-white",
    eyebrowText: "Home & ambiance",
  },
  Gifts: {
    bgClass: "bg-pillar-gifts-bg",
    activeButtonClass:
      "bg-pillar-gifts-accent text-white border-pillar-gifts-accent hover:bg-pillar-gifts-accent/90",
    badgeClass: "bg-pillar-gifts-accent text-white",
    eyebrowText: "Milestone gifts",
  },
};

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

const snapshotProducts: Product[] = SNAPSHOT_PRODUCTS.map(mapMedusaToCollectionProduct).map(
  (product: CollectionProduct) => product as Product,
);
const products: Product[] = snapshotProducts;

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const PAGE = 8;

// Map pillar to hero content
const pillarHeroContent: Record<string, { title: string; mood: string; subtitle: string; image: string }> = {
  Women: { title: 'Salwar Suits', mood: 'Graceful. Modest. Timeless.', subtitle: 'Beautiful salwar suits for everyday wear, festive occasions and special moments.', image: imgWSalwar },
  Men: { title: "Men's Collection", mood: 'Sharp. Elegant. Comfortable.', subtitle: 'Handloom kurtas, pathani sets and everyday essentials for the modern Muslim man.', image: "/images/men-kurta-ivory.jpg" },
  Children: { title: "Children's Collection", mood: 'Joyful. Tarbiyah-led. Everyday.', subtitle: 'Cotton sets, habit boards and learning tools for little ones.', image: "/images/kids-kurta-mustard.jpg" },
  Prayer: { title: 'Prayer Essentials', mood: 'Sacred. Serene. Purposeful.', subtitle: 'Memory foam mats, rehals and tasbihs for a peaceful prayer routine.', image: imgPrayer },
  Home: { title: 'Home & Ambiance', mood: 'Calm. Curated. Meaningful.', subtitle: 'Bakhoor burners, wall art and attars to scent and decor your space.', image: imgBundle },
  Gifts: { title: 'Meaningful Gifts', mood: 'Thoughtful. Timeless. Heartfelt.', subtitle: 'Milestone gift boxes and hampers for every occasion.', image: imgGifts },
};

function CollectionPage() {
  const search = Route.useSearch();
  const initialPillar = useMemo(() => {
    if (!search.category) return "All";
    const cat = search.category.toLowerCase();
    const match = pillars.find(
      (p) =>
        p.id.toLowerCase() === cat ||
        p.handle.toLowerCase() === cat ||
        p.label.toLowerCase() === cat,
    );
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
  const [mobileDensity, setMobileDensity] = useState<"two" | "one">("two");
  // Use PAGE as initial visible count — same on both SSR and client to prevent hydration mismatch
  const [visible, setVisible] = useState(PAGE);

  useEffect(() => {
    if (search.category) {
      const cat = search.category.toLowerCase();
      const match = pillars.find(
        (p) =>
          p.id.toLowerCase() === cat ||
          p.handle.toLowerCase() === cat ||
          p.label.toLowerCase() === cat,
      );
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
      const liveHandles = new Set(liveProducts.map((p) => p.handle ?? p.name.toLowerCase()));
      const fallbackProducts = products.filter(
        (p) => !liveHandles.has(p.handle ?? p.name.toLowerCase()),
      );
      // Deduplicate by handle to prevent duplicate React keys
      const merged = [...liveProducts, ...fallbackProducts] as Product[];
      const seen = new Set<string>();
      return merged.filter((p) => {
        const key = p.handle ?? String(p.id);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }
    return snapshotProducts.length > 0 ? snapshotProducts : products;
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
        (selMaterials.length === 0 ||
          p.materials.some((m) => selMaterials.some((selected) => selected === m))) &&
        (!under999 || p.price < 999) &&
        (!inStockOnly || p.inStock) &&
        (!festive || p.festive) &&
        (!q ||
          p.name.toLowerCase().includes(q) ||
          (p as { description?: string }).description?.toLowerCase().includes(q) ||
          p.pillar.toLowerCase().includes(q) ||
          p.materials?.some((m) => m.toLowerCase().includes(q))),
    );
    if (sort === "price-low") return [...r].sort((a, b) => a.price - b.price);
    if (sort === "price-high") return [...r].sort((a, b) => b.price - a.price);
    if (sort === "newest") {
      return [...r].sort((a, b) => {
        const aDate = a.createdAt ? Date.parse(a.createdAt) : Number(a.id) || 0;
        const bDate = b.createdAt ? Date.parse(b.createdAt) : Number(b.id) || 0;
        return bDate - aDate;
      });
    }
    if (sort === "rating")
      return [...r].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    return r;
  }, [
    allProducts,
    pillar,
    sub,
    selSizes,
    band,
    selMaterials,
    under999,
    inStockOnly,
    festive,
    sort,
    searchQuery,
  ]);

  const touch = () => setVisible(PAGE);
  const choosePillar = (p: "All" | Pillar) => {
    setPillar(p);
    setSub(null);
    const hasApparel = p === "All" || allProducts.some((x) => x.pillar === p && x.sizes);
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
        <div className="space-y-2">
          {pillars.map((p) => {
            const count = allProducts.filter((x) => (p.id === "All" ? true : x.pillar === p.id)).length;
            const active = pillar === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => choosePillar(p.id as "All" | Pillar)}
                className={cn(
                  "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "hover:bg-muted text-foreground",
                )}
              >
                <span>{p.label}</span>
                <span
                  className={cn(
                    "text-xs",
                    active ? "text-primary-foreground/80" : "text-muted-foreground",
                  )}
                >
                  ({count})
                </span>
              </button>
            );
          })}
        </div>
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
    <main id="main-content">
      {pillar !== 'All' && pillarHeroContent[pillar] && (
        <section className="relative overflow-hidden border-b border-border bg-warm-ivory">
          <div className="relative">
            <img src={pillarHeroContent[pillar].image} alt={pillar} className="h-48 sm:h-64 w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
            <PageContainer className="absolute inset-0 flex flex-col justify-end pb-8">
              {/* breadcrumb */}
              <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                <Link to="/">Home</Link>
                <ChevronRight className="size-3" />
                <span>{pillar}</span>
              </nav>
              <p className="text-xs font-semibold text-primary/80 mb-1">{pillarHeroContent[pillar].mood}</p>
              <h1 className="font-display text-4xl sm:text-5xl text-foreground">{pillarHeroContent[pillar].title}</h1>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">{pillarHeroContent[pillar].subtitle}</p>
            </PageContainer>
          </div>
        </section>
      )}
      {pillar === "All" && (
        <section className={cn("border-b border-border", pillarTheme["All"].bgClass)}>
          <PageContainer className="py-8 lg:py-10">
            <div className="grid gap-4 border-t border-border pt-6 md:grid-cols-[1fr_2fr] md:gap-12">
              <div className="eyebrow flex gap-3 text-muted-foreground">
                <span>01</span>
                <span>{pillarTheme["All"].eyebrowText}</span>
              </div>
              <div>
                <h1 className="display-section">Objects for a more considered rhythm.</h1>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                  Seven pillars for dressing, praying, learning, and gathering — honest materials,
                  quiet forms, and only what earns its place.
                </p>
              </div>
            </div>
          </PageContainer>
        </section>
      )}

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
                <SheetContent
                  side="bottom"
                  className="flex max-h-[88vh] w-full flex-col rounded-t-xl p-0"
                >
                  <SheetHeader className="border-b border-border p-6 text-left">
                    <SheetTitle className="font-display text-2xl">Refine the collection</SheetTitle>
                    <SheetDescription>Choose only what matters to you.</SheetDescription>
                  </SheetHeader>
                  <div className="flex-1 overflow-y-auto p-6">{filters}</div>
                  <div className="sticky bottom-0 flex gap-2 border-t border-border bg-background p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                    <Button variant="outline" className="flex-1" onClick={resetFilters}>
                      Reset all
                    </Button>
                    <SheetClose asChild>
                      <Button className="flex-[1.5]">View {filtered.length} products</Button>
                    </SheetClose>
                  </div>
                </SheetContent>
              </Sheet>

              <Select value={sort} defaultValue="featured" onValueChange={setSort}>
                <SelectTrigger className="w-36 sm:w-48" aria-label="Sort products">
                  <SelectValue placeholder="Sort: Featured" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest Arrivals</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2 overflow-x-auto pb-1 lg:mt-5">
            {searchQuery.trim() ? (
              <RemovableChip
                label={`Search: ${searchQuery}`}
                onRemove={() => {
                  setSearchQuery("");
                  touch();
                }}
              />
            ) : null}
            {pillar !== "All" && (
              <RemovableChip
                label={pillars.find((p) => p.id === pillar)?.label ?? pillar}
                onRemove={() => choosePillar("All")}
                className={pillarTheme[pillar].badgeClass}
              />
            )}
            {sub ? (
              <RemovableChip
                label={sub}
                onRemove={() => {
                  setSub(null);
                  touch();
                }}
              />
            ) : null}
            {band ? (
              <RemovableChip
                label={priceBands.find((item) => item.id === band)?.label ?? band}
                onRemove={() => {
                  setBand(null);
                  touch();
                }}
              />
            ) : null}
            {selSizes.map((size) => (
              <RemovableChip
                key={size}
                label={`Size: ${size}`}
                onRemove={() => toggle(size, selSizes, setSelSizes)}
              />
            ))}
            {under999 ? (
              <RemovableChip
                label="Under ₹999"
                onRemove={() => {
                  setUnder999(false);
                  touch();
                }}
              />
            ) : null}
            {inStockOnly ? (
              <RemovableChip
                label="In stock"
                onRemove={() => {
                  setInStockOnly(false);
                  touch();
                }}
              />
            ) : null}
            {festive ? (
              <RemovableChip
                label="Festive ready"
                onRemove={() => {
                  setFestive(false);
                  touch();
                }}
              />
            ) : null}
            {selMaterials.map((material) => (
              <RemovableChip
                key={material}
                label={material}
                onRemove={() => toggle(material, selMaterials, setSelMaterials)}
              />
            ))}
            {activeFilters > 0 ? (
              <button
                type="button"
                onClick={resetFilters}
                className="ml-1 text-xs font-semibold text-primary underline underline-offset-4"
              >
                Clear all
              </button>
            ) : null}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{shown.length}</span> of{" "}
            <span className="font-semibold text-foreground">{filtered.length}</span> pieces · Free
            express shipping over ₹999
          </p>
          <div
            className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 lg:hidden"
            aria-label="Quick filters"
          >
            <span className="shrink-0 text-[0.68rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
              Quick filter
            </span>
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
              In Stock
            </Chip>
            <Chip
              active={festive}
              onClick={() => {
                setFestive(!festive);
                touch();
              }}
            >
              Festive
            </Chip>
            {(["S", "M", "L", "XL"] as Size[]).map((size) => (
              <Chip
                key={size}
                active={selSizes.includes(size)}
                onClick={() => toggle(size, selSizes, setSelSizes)}
              >
                {size}
              </Chip>
            ))}
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
            <div className="mb-4 flex justify-end gap-1 lg:hidden" aria-label="Product density">
              <span className="mr-2 self-center text-xs text-muted-foreground">View</span>
              <Button
                type="button"
                variant={mobileDensity === "two" ? "default" : "outline"}
                size="icon"
                className="size-8"
                onClick={() => setMobileDensity("two")}
                aria-label="Two-column view"
                aria-pressed={mobileDensity === "two"}
              >
                <Grid2X2 className="size-4" />
              </Button>
              <Button
                type="button"
                variant={mobileDensity === "one" ? "default" : "outline"}
                size="icon"
                className="size-8"
                onClick={() => setMobileDensity("one")}
                aria-label="One-column view"
                aria-pressed={mobileDensity === "one"}
              >
                <Rows3 className="size-4" />
              </Button>
            </div>
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
                <div
                  className={cn(
                    "grid gap-x-3 gap-y-8 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3 2xl:grid-cols-4",
                    mobileDensity === "two" ? "grid-cols-2" : "grid-cols-1",
                  )}
                >
                  {shown.map((p) => (
                    <ProductCard
                      key={p.id}
                      pillar={p.pillar}
                      image={p.image}
                      hoverImage={p.hoverImage}
                      imageAlt={p.name}
                      category={p.subcategory}
                      name={p.name}
                      price={inr(p.price)}
                      previousPrice={p.mrp ? inr(p.mrp) : undefined}
                      savings={p.mrp ? inr(p.mrp - p.price) : undefined}
                      note={p.note}
                      badge={p.badge}
                      sizes={p.sizes}
                      sizeStock={p.sizeStock}
                      rating={p.rating}
                      reviewCount={p.reviews}
                      inStock={p.inStock}
                      href={p.handle ? `/products/${p.handle}` : undefined}
                    />
                  ))}
                </div>
                {visible < filtered.length ? (
                  <div className="mt-14 border-t border-border pt-8 text-center">
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
    </main>
  );
}

function Chip({
  active,
  onClick,
  children,
  activeClass,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  activeClass?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "min-h-9 shrink-0 rounded-full border px-3.5 text-sm transition-colors duration-brand-fast ease-brand",
        active
          ? (activeClass ?? "border-primary bg-primary text-primary-foreground")
          : "border-border bg-card/80 text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function RemovableChip({
  label,
  onRemove,
  className,
}: {
  label: string;
  onRemove: () => void;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary",
        className,
      )}
    >
      {label}
      <button
        type="button"
        onClick={onRemove}
        className="rounded-full p-0.5 hover:bg-black/10"
        aria-label={`Remove ${label} filter`}
      >
        <X className="size-3" />
      </button>
    </span>
  );
}
