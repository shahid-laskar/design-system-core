import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Grid2X2, ListFilter, PackageOpen, Rows3, Search, X } from "lucide-react";
import { PageContainer } from "@/components/brand/design-primitives";
import { ProductCard } from "@/components/brand/product-card";
import { StatusState } from "@/components/brand/status-state";
import {
  mapMedusaToCollectionProduct,
  useCommerceProducts,
  type CollectionProduct,
} from "@/lib/commerce/use-commerce";
import { SNAPSHOT_PRODUCTS } from "@/lib/commerce/snapshot-fallback";
import { Button } from "@/components/ui/button";
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
import imgGifts from "@/assets/pillar-gifts.jpg";
import editorialHomeCalm from "@/assets/editorial-home-calm.jpg";
import occasionEid from "@/assets/occasion-eid.jpg";

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
type Size = "S" | "M" | "L" | "XL" | "XXL";
type PriceBand = "under-500" | "500-1000" | "1000-2000" | "above-2000";

type Product = CollectionProduct & {
  materials: string[];
};

const pillars: Array<{ id: "All" | Pillar; label: string; short: string; handle: string }> = [
  { id: "All", label: "All Products", short: "All", handle: "all" },
  { id: "Women", label: "Women's Ethnic & Modest", short: "Women", handle: "women" },
  { id: "Men", label: "Men's Apparel", short: "Men", handle: "men" },
  { id: "Children", label: "Children & Tarbiyah", short: "Children", handle: "children" },
  { id: "Prayer", label: "Prayer & Worship", short: "Prayer", handle: "prayer" },
  { id: "Learning", label: "Learning & Books", short: "Learning", handle: "learning" },
  { id: "Home", label: "Home & Ambiance", short: "Home", handle: "home" },
  { id: "Gifts", label: "Milestone Gifts", short: "Gifts", handle: "gifts" },
];

const pillarTheme: Record<
  "All" | Pillar,
  { surface: string; accent: string; chip: string; eyebrow: string; wash: string; rail: string }
> = {
  All: {
    surface: "bg-warm-ivory",
    accent: "border-primary bg-primary text-primary-foreground",
    chip: "bg-primary text-primary-foreground",
    eyebrow: "The collection",
    wash: "bg-warm-ivory",
    rail: "border-border",
  },
  Women: {
    surface: "bg-pillar-women-bg",
    accent: "border-berry bg-berry text-berry-foreground",
    chip: "bg-berry text-berry-foreground",
    eyebrow: "Women",
    wash: "bg-gradient-to-b from-pillar-women-bg via-background to-background",
    rail: "border-berry/25",
  },
  Men: {
    surface: "bg-pillar-men-bg",
    accent: "border-teal bg-teal text-teal-foreground",
    chip: "bg-teal text-teal-foreground",
    eyebrow: "Men",
    wash: "bg-gradient-to-b from-pillar-men-bg via-background to-background",
    rail: "border-teal/25",
  },
  Children: {
    surface: "bg-pillar-kids-bg",
    accent: "border-mango bg-mango text-mango-foreground",
    chip: "bg-mango text-mango-foreground",
    eyebrow: "Children",
    wash: "bg-gradient-to-b from-pillar-kids-bg via-background to-background",
    rail: "border-mango/30",
  },
  Learning: {
    surface: "bg-pillar-kids-bg",
    accent: "border-mango bg-mango text-mango-foreground",
    chip: "bg-mango text-mango-foreground",
    eyebrow: "Learning",
    wash: "bg-gradient-to-b from-pillar-kids-bg via-background to-background",
    rail: "border-mango/30",
  },
  Prayer: {
    surface: "bg-pillar-prayer-bg",
    accent: "border-emerald bg-emerald text-emerald-foreground",
    chip: "bg-emerald text-emerald-foreground",
    eyebrow: "Prayer",
    wash: "bg-gradient-to-b from-pillar-prayer-bg via-background to-background",
    rail: "border-emerald/25",
  },
  Home: {
    surface: "bg-pillar-prayer-bg",
    accent: "border-emerald bg-emerald text-emerald-foreground",
    chip: "bg-emerald text-emerald-foreground",
    eyebrow: "Home",
    wash: "bg-gradient-to-b from-pillar-prayer-bg/80 via-warm-ivory to-background",
    rail: "border-emerald/20",
  },
  Gifts: {
    surface: "bg-pillar-gifts-bg",
    accent: "border-coral bg-coral text-coral-foreground",
    chip: "bg-coral text-coral-foreground",
    eyebrow: "Gifts",
    wash: "bg-gradient-to-b from-pillar-gifts-bg via-background to-background",
    rail: "border-coral/25",
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
const priceBands: Array<{ id: PriceBand; label: string }> = [
  { id: "under-500", label: "Under ₹500" },
  { id: "500-1000", label: "₹500 – ₹1,000" },
  { id: "1000-2000", label: "₹1,000 – ₹2,000" },
  { id: "above-2000", label: "Above ₹2,000" },
];

const inBand = (p: number, b: PriceBand) =>
  b === "under-500"
    ? p < 500
    : b === "500-1000"
      ? p >= 500 && p <= 1000
      : b === "1000-2000"
        ? p > 1000 && p <= 2000
        : p > 2000;

const snapshotProducts: Product[] = SNAPSHOT_PRODUCTS.map(mapMedusaToCollectionProduct);
const PAGE = 12;

const pillarHeroContent: Record<
  string,
  { title: string; subtitle: string; image: string; mood: string }
> = {
  Women: {
    title: "Women",
    mood: "Graceful. Modest. Everyday.",
    subtitle: "Cambric suits, kurtas, dresses, abayas and hijabs — silhouette first.",
    image: "/images/salwar-suit-berry.jpg",
  },
  Men: {
    title: "Men",
    mood: "Fresh for Friday.",
    subtitle: "Handloom kurtas and everyday essentials with clear fall and fabric.",
    image: "/images/men-kurta-ivory.jpg",
  },
  Children: {
    title: "Children",
    mood: "Joyful family dressing.",
    subtitle: "Festive cottons and tarbiyah tools for little ones.",
    image: "/images/kids-kurta-mustard.jpg",
  },
  Prayer: {
    title: "Prayer",
    mood: "Quiet corner, properly kept.",
    subtitle: "Memory foam mats, rehals and attars for a peaceful routine.",
    image: imgPrayer,
  },
  Home: {
    title: "Home",
    mood: "Warmth for gathering.",
    subtitle: "Bakhoor, attars and calm accents for the family home.",
    image: editorialHomeCalm,
  },
  Gifts: {
    title: "Gifts",
    mood: "Thoughtful milestones.",
    subtitle: "Curated boxes for nikah, new homes and Eid.",
    image: imgGifts,
  },
  Learning: {
    title: "Learning",
    mood: "Habits that stick.",
    subtitle: "Salah boards and gentle learning tools.",
    image: "/images/children-habit-board.jpg",
  },
};

const occasionHero: Record<string, { title: string; subtitle: string; image: string }> = {
  eid: {
    title: "Eid Edit",
    subtitle: "Coordinated festive looks for the whole household.",
    image: occasionEid,
  },
  ramadan: {
    title: "Ramadan Essentials",
    subtitle: "Quiet pieces for long nights and soft mornings.",
    image: editorialHomeCalm,
  },
  jummah: {
    title: "Jummah Collection",
    subtitle: "Friday kurtas, caps and prayer companions — worn and ready.",
    image: "/images/men-kurta-ivory.jpg",
  },
  gifts: {
    title: "Gifts for Loved Ones",
    subtitle: "Milestone boxes and hampers with real product presentation.",
    image: imgGifts,
  },
};

function matchesOccasion(product: Product, occasion: string | undefined) {
  if (!occasion) return true;
  const hay =
    `${product.name} ${product.subcategory} ${product.pillar} ${product.note}`.toLowerCase();
  if (occasion === "eid") {
    return Boolean(product.festive) || /salwar|kurta|abaya|gift|festive|eid/.test(hay);
  }
  if (occasion === "ramadan") {
    return /prayer|mat|rehal|attar|bakhoor|ramadan|habit/.test(hay) || product.pillar === "Prayer";
  }
  if (occasion === "jummah") {
    return /kurta|kufi|cap|prayer|mat|attar|friday|jummah/.test(hay) || product.pillar === "Men";
  }
  if (occasion === "gifts" || occasion === "festive") {
    return product.pillar === "Gifts" || Boolean(product.festive) || /gift|hamper|box/.test(hay);
  }
  return true;
}

function CollectionPage() {
  const search = Route.useSearch();
  const themeKey = (pillar: "All" | Pillar) => pillarTheme[pillar];

  const initialPillar = useMemo(() => {
    if (!search.category) return "All" as const;
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
  const [selColors, setSelColors] = useState<string[]>([]);
  const [band, setBand] = useState<PriceBand | null>(null);
  const [under999, setUnder999] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [festive, setFestive] = useState(search.occasion === "festive");
  const [sort, setSort] = useState("featured");
  const [mobileDensity, setMobileDensity] = useState<"two" | "one">("two");
  const [visible, setVisible] = useState(PAGE);
  const [filtersOpen, setFiltersOpen] = useState(false);

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
    if (search.occasion === "festive") setFestive(true);
    if (search.occasion === "gifts") setPillar("Gifts");
    if (search.occasion === "jummah") setPillar("Men");
  }, [search.occasion]);

  const { data: liveProducts } = useCommerceProducts();

  const allProducts = useMemo(() => {
    if (liveProducts && liveProducts.length > 0) {
      const liveHandles = new Set(liveProducts.map((p) => p.handle ?? p.name.toLowerCase()));
      const fallbackProducts = snapshotProducts.filter(
        (p) => !liveHandles.has(p.handle ?? p.name.toLowerCase()),
      );
      const merged = [...liveProducts, ...fallbackProducts] as Product[];
      const seen = new Set<string>();
      return merged.filter((p) => {
        const key = p.handle ?? String(p.id);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }
    return snapshotProducts;
  }, [liveProducts]);

  const availableSubs = useMemo(() => {
    if (pillar === "All") return [];
    const present = new Set(
      allProducts.filter((p) => p.pillar === pillar).map((p) => p.subcategory),
    );
    return subcategories[pillar].filter((s) => present.has(s));
  }, [allProducts, pillar]);

  const availableColors = useMemo(() => {
    const map = new Map<string, string>();
    for (const product of allProducts) {
      if (pillar !== "All" && product.pillar !== pillar) continue;
      for (const color of product.colors ?? []) {
        if (color.name !== "Default") map.set(color.name, color.swatch);
      }
    }
    return [...map.entries()].map(([name, swatch]) => ({ name, swatch }));
  }, [allProducts, pillar]);

  const apparelContext =
    pillar === "All"
      ? allProducts.some((p) => p.sizes)
      : allProducts.some((p) => p.pillar === pillar && p.sizes);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const r = allProducts.filter(
      (p) =>
        (pillar === "All" || p.pillar === pillar) &&
        (!sub || p.subcategory === sub) &&
        (selSizes.length === 0 || (p.sizes?.some((s) => selSizes.includes(s)) ?? false)) &&
        (selColors.length === 0 || (p.colors?.some((c) => selColors.includes(c.name)) ?? false)) &&
        (!band || inBand(p.price, band)) &&
        (!under999 || p.price < 999) &&
        (!inStockOnly || p.inStock) &&
        (!festive || p.festive) &&
        matchesOccasion(p, search.occasion) &&
        (!q ||
          p.name.toLowerCase().includes(q) ||
          p.pillar.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.materials?.some((m) => m.toLowerCase().includes(q))),
    );
    if (sort === "price-low") return [...r].sort((a, b) => a.price - b.price);
    if (sort === "price-high") return [...r].sort((a, b) => b.price - a.price);
    if (sort === "newest") {
      return [...r].sort((a, b) => {
        const aDate = a.createdAt ? Date.parse(a.createdAt) : 0;
        const bDate = b.createdAt ? Date.parse(b.createdAt) : 0;
        return bDate - aDate;
      });
    }
    return r;
  }, [
    allProducts,
    pillar,
    sub,
    selSizes,
    selColors,
    band,
    under999,
    inStockOnly,
    festive,
    sort,
    searchQuery,
    search.occasion,
  ]);

  const touch = () => setVisible(PAGE);
  const choosePillar = (p: "All" | Pillar) => {
    setPillar(p);
    setSub(null);
    setSelColors([]);
    if (!(p === "All" || allProducts.some((x) => x.pillar === p && x.sizes))) setSelSizes([]);
    touch();
  };
  const resetFilters = () => {
    setPillar("All");
    setSub(null);
    setSearchQuery("");
    setSelSizes([]);
    setSelColors([]);
    setBand(null);
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
    selColors.length +
    (band ? 1 : 0) +
    Number(under999) +
    Number(inStockOnly) +
    Number(festive);

  const shown = filtered.slice(0, visible);
  const theme = themeKey(pillar);
  const occasion = search.occasion ? occasionHero[search.occasion] : null;
  const categoryHero = pillar !== "All" ? pillarHeroContent[pillar] : null;
  const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

  const filters = (
    <div className="space-y-8">
      {apparelContext ? (
        <fieldset>
          <legend className="eyebrow mb-3 text-foreground">Size</legend>
          <div className="flex flex-wrap gap-2">
            {sizes.map((s) => (
              <Chip
                key={s}
                active={selSizes.includes(s)}
                activeClass={theme.accent}
                onClick={() => toggle(s, selSizes, setSelSizes)}
              >
                {s}
              </Chip>
            ))}
          </div>
        </fieldset>
      ) : null}

      {availableColors.length > 0 ? (
        <fieldset>
          <legend className="eyebrow mb-3 text-foreground">Colour</legend>
          <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
            {availableColors.map((c) => {
              const active = selColors.includes(c.name);
              return (
                <button
                  key={c.name}
                  type="button"
                  aria-pressed={active}
                  title={c.name}
                  onClick={() => toggle(c.name, selColors, setSelColors)}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-2 border px-3 py-2 text-xs font-semibold transition-colors",
                    active
                      ? theme.accent
                      : "border-border bg-background hover:border-foreground/30",
                  )}
                >
                  <span
                    className={cn("size-4 shrink-0 rounded-full border border-black/10", c.swatch)}
                  />
                  <span className="max-w-[9rem] truncate sm:max-w-none">{c.name}</span>
                </button>
              );
            })}
          </div>
        </fieldset>
      ) : null}

      <fieldset>
        <legend className="eyebrow mb-3 text-foreground">Price</legend>
        <div className="space-y-2">
          {priceBands.map((b) => {
            const active = band === b.id;
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => {
                  setBand(active ? null : b.id);
                  touch();
                }}
                className={cn(
                  "flex w-full items-center justify-between border px-3 py-2 text-sm transition-colors",
                  active ? theme.accent : "border-border bg-background hover:border-foreground/30",
                )}
              >
                {b.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="space-y-4 border-t border-border pt-4">
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
        <div className="flex items-center justify-between gap-3">
          <Label htmlFor="under-999" className="text-sm font-normal">
            Under ₹999
          </Label>
          <Switch
            id="under-999"
            checked={under999}
            onCheckedChange={(v) => {
              setUnder999(v);
              touch();
            }}
          />
        </div>
      </div>

      {activeFilters > 0 ? (
        <Button variant="outline" className="w-full" onClick={resetFilters}>
          Clear all ({activeFilters})
        </Button>
      ) : null}
    </div>
  );

  return (
    <main id="main-content" className={cn("min-h-screen", theme.wash)}>
      {/* Compact category / occasion identity */}
      {(occasion || categoryHero) && (
        <section className={cn("border-b", theme.rail, theme.surface)}>
          <PageContainer className="py-5 sm:py-6">
            <div className="grid items-center gap-5 md:grid-cols-[7.5rem_minmax(0,1fr)] lg:grid-cols-[9rem_minmax(0,1fr)]">
              <div className="media-frame hidden aspect-square overflow-hidden md:block">
                <img
                  src={occasion?.image ?? categoryHero!.image}
                  alt=""
                  className="size-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Link to="/" className="hover:text-foreground">
                    Home
                  </Link>
                  <ChevronRight className="size-3" />
                  <span className="text-foreground">
                    {occasion?.title ?? categoryHero?.title ?? "Collection"}
                  </span>
                </nav>
                <p className="eyebrow mt-3 text-foreground/70">
                  {occasion ? "Occasion" : categoryHero?.mood}
                </p>
                <h1 className="mt-1 font-display text-3xl sm:text-4xl">
                  {occasion?.title ?? categoryHero?.title}
                </h1>
                <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                  {occasion?.subtitle ?? categoryHero?.subtitle}
                </p>
              </div>
            </div>
          </PageContainer>
        </section>
      )}

      {pillar === "All" && !occasion ? (
        <section className={cn("border-b border-border", theme.surface)}>
          <PageContainer className="py-6 sm:py-8">
            <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Link to="/" className="hover:text-foreground">
                Home
              </Link>
              <ChevronRight className="size-3" />
              <span className="text-foreground">Collection</span>
            </nav>
            <h1 className="mt-3 font-display text-3xl sm:text-4xl">Shop the household</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Modest apparel, prayer essentials, learning and gifts — browse by who you are dressing
              today.
            </p>
          </PageContainer>
        </section>
      ) : null}

      {/* Toolbar */}
      <div className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
        <PageContainer className="py-3">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-2.5 size-3.5 text-muted-foreground" />
              <Input
                placeholder="Search salwar, kurta, mats..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  touch();
                }}
                className="h-9 border-border bg-background pl-9 pr-8 text-sm"
              />
              {searchQuery ? (
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
              ) : null}
            </div>

            <div className="flex items-center gap-2">
              <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    <ListFilter /> Filter
                    {activeFilters ? (
                      <span className={cn("rounded-sm px-1.5 text-xs", theme.chip)}>
                        {activeFilters}
                      </span>
                    ) : null}
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="bottom"
                  className="flex max-h-[88vh] w-full flex-col rounded-t-xl p-0"
                >
                  <SheetHeader className="border-b border-border p-5 text-left">
                    <SheetTitle className="font-display text-2xl">Refine</SheetTitle>
                    <SheetDescription>
                      {filtered.length} matching {filtered.length === 1 ? "piece" : "pieces"}
                    </SheetDescription>
                  </SheetHeader>
                  <div className="flex-1 overflow-y-auto p-5">{filters}</div>
                  <div className="sticky bottom-0 flex gap-2 border-t border-border bg-background p-4 pb-[max(1rem,calc(var(--mobile-bottom-nav-h)+env(safe-area-inset-bottom)))]">
                    <Button variant="outline" className="flex-1" onClick={resetFilters}>
                      Clear
                    </Button>
                    <SheetClose asChild>
                      <Button className={cn("flex-[1.5]", theme.accent)}>
                        Show {filtered.length}
                      </Button>
                    </SheetClose>
                  </div>
                </SheetContent>
              </Sheet>

              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-40 sm:w-48" aria-label="Sort products">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>

              <p className="hidden text-xs text-muted-foreground sm:block">
                <span className="font-semibold text-foreground">{filtered.length}</span> pieces
              </p>
            </div>
          </div>

          {/* Pillar + subcategory discovery */}
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {pillars.map((p) => {
              const active = pillar === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => choosePillar(p.id as "All" | Pillar)}
                  className={cn(
                    "shrink-0 border px-3 py-1.5 text-xs font-semibold transition-colors",
                    active
                      ? pillarTheme[p.id].accent
                      : "border-border bg-background text-muted-foreground hover:text-foreground",
                  )}
                >
                  {p.short}
                </button>
              );
            })}
          </div>

          {availableSubs.length > 0 ? (
            <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
              <Chip
                active={!sub}
                activeClass={theme.accent}
                onClick={() => {
                  setSub(null);
                  touch();
                }}
              >
                All {pillar}
              </Chip>
              {availableSubs.map((s) => (
                <Chip
                  key={s}
                  active={sub === s}
                  activeClass={theme.accent}
                  onClick={() => {
                    setSub(s);
                    touch();
                  }}
                >
                  {s}
                </Chip>
              ))}
            </div>
          ) : null}

          {activeFilters > 0 ? (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {selSizes.map((size) => (
                <RemovableChip
                  key={size}
                  label={`Size ${size}`}
                  onRemove={() => toggle(size, selSizes, setSelSizes)}
                />
              ))}
              {selColors.map((color) => (
                <RemovableChip
                  key={color}
                  label={color}
                  onRemove={() => toggle(color, selColors, setSelColors)}
                />
              ))}
              {band ? (
                <RemovableChip
                  label={priceBands.find((item) => item.id === band)?.label ?? band}
                  onRemove={() => {
                    setBand(null);
                    touch();
                  }}
                />
              ) : null}
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
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-semibold text-primary underline underline-offset-4"
              >
                Clear all
              </button>
            </div>
          ) : null}
        </PageContainer>
      </div>

      <PageContainer className="pt-8 pb-6">
        <div className="grid items-start gap-10 lg:grid-cols-[13.5rem_minmax(0,1fr)]">
          <aside
            className={cn("hidden border-r pr-6 lg:sticky lg:top-24 lg:block", theme.rail)}
            aria-label="Product filters"
          >
            <p className="eyebrow mb-5 text-foreground">Refine</p>
            {filters}
          </aside>

          <div className="min-w-0">
            <div className="mb-5 flex items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-semibold text-foreground">
                  {shown.length} of {filtered.length}
                </span>
              </p>
              <div className="flex gap-1 lg:hidden" aria-label="Product density">
                <Button
                  type="button"
                  variant={mobileDensity === "two" ? "default" : "outline"}
                  size="icon"
                  className="size-8"
                  onClick={() => setMobileDensity("two")}
                  aria-label="Two-column view"
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
                >
                  <Rows3 className="size-4" />
                </Button>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className={cn("border border-border p-8 sm:p-12", theme.surface)}>
                <StatusState
                  icon={PackageOpen}
                  eyebrow="No matches"
                  title="Nothing on this shelf just yet"
                  description="Clear a filter, switch category, or browse another family pillar."
                  action="Clear filters"
                  onAction={resetFilters}
                />
                <div className="mt-8 flex flex-wrap gap-2">
                  {(["Women", "Men", "Children", "Prayer"] as Pillar[]).map((p) => (
                    <Button key={p} variant="outline" size="sm" onClick={() => choosePillar(p)}>
                      Browse {p}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div
                  className={cn(
                    "grid items-stretch gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3",
                    mobileDensity === "two" ? "grid-cols-2" : "grid-cols-1",
                  )}
                >
                  {shown.map((p) => (
                    <ProductCard
                      key={p.handle || p.id}
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
                      rating={p.rating || undefined}
                      reviewCount={p.reviews || undefined}
                      inStock={p.inStock}
                      colors={p.colors}
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
        "min-h-9 shrink-0 border px-3.5 text-sm transition-colors duration-brand-fast ease-brand",
        active
          ? (activeClass ?? "border-primary bg-primary text-primary-foreground")
          : "border-border bg-background text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function RemovableChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 border border-border bg-card px-2.5 py-1 text-xs font-semibold">
      {label}
      <button
        type="button"
        onClick={onRemove}
        className="rounded-full p-0.5 hover:bg-black/5"
        aria-label={`Remove ${label} filter`}
      >
        <X className="size-3" />
      </button>
    </span>
  );
}
