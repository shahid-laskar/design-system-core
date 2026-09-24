import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ListFilter, PackageOpen } from "lucide-react";
import { Eyebrow, PageContainer, SectionHeading } from "@/components/brand/design-primitives";
import { ProductCard } from "@/components/brand/product-card";
import { StatusState } from "@/components/brand/status-state";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
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
import productPrayerSet from "@/assets/product-prayer-set.jpg";
import productChildSet from "@/assets/product-child-set.jpg";
import productModestSet from "@/assets/product-modest-set.jpg";
import productBundle from "@/assets/product-bundle.jpg";

export const Route = createFileRoute("/collection")({
  validateSearch: (search: Record<string, unknown>) => ({
    category: typeof search.category === "string" ? search.category : undefined,
    occasion: typeof search.occasion === "string" ? search.occasion : undefined,
  }),
  head: () => ({
    meta: [
      { title: "The Collection — Sukoon House" },
      {
        name: "description",
        content:
          "Shop considered home, prayer, children’s, modest essentials, and curated bundles.",
      },
      { property: "og:title", content: "The Collection — Sukoon House" },
      {
        property: "og:description",
        content: "A small, considered range for calm homes and meaningful routines.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CollectionPage,
});

type Category = "Home & Prayer" | "Little Ones" | "Modest Essentials" | "Bundles";
type Material = "Linen" | "Cotton" | "Wood" | "Wool";
type PriceTier = "Under ₹2,000" | "₹2,000–₹4,000" | "Over ₹4,000";
type Product = {
  id: number;
  image: string;
  imageAlt: string;
  category: Category;
  name: string;
  price: string;
  priceValue: number;
  previousPrice?: string;
  note: string;
  badge?: string;
  materials: Material[];
};

const categories: Array<"All" | Category> = [
  "All",
  "Home & Prayer",
  "Little Ones",
  "Modest Essentials",
  "Bundles",
];
const materials: Material[] = ["Linen", "Cotton", "Wood", "Wool"];
const priceTiers: PriceTier[] = ["Under ₹2,000", "₹2,000–₹4,000", "Over ₹4,000"];

const products: Product[] = [
  {
    id: 1,
    image: productPrayerSet,
    imageAlt: "Olive prayer mat and Quran stand in soft daylight",
    category: "Home & Prayer",
    name: "The Stillness Set",
    price: "₹3,499",
    priceValue: 3499,
    note: "Olive · Linen blend · 2 pieces",
    badge: "New",
    materials: ["Linen"],
  },
  {
    id: 2,
    image: productModestSet,
    imageAlt: "Sand hijab and stone-grey abaya folded on linen",
    category: "Modest Essentials",
    name: "The Everyday Pair",
    price: "₹2,799",
    priceValue: 2799,
    note: "Sand & stone · Soft-touch cotton",
    materials: ["Cotton"],
  },
  {
    id: 3,
    image: productChildSet,
    imageAlt: "Wooden stacking rings and soft muslin in warm tones",
    category: "Little Ones",
    name: "First Forms Set",
    price: "₹1,999",
    priceValue: 1999,
    previousPrice: "₹2,299",
    note: "Clay mix · FSC beech · Ages 1+",
    badge: "Family edit",
    materials: ["Wood", "Cotton"],
  },
  {
    id: 4,
    image: productBundle,
    imageAlt: "Rolled prayer mat, linen-bound prayer book and attar",
    category: "Bundles",
    name: "The Considered Gift",
    price: "₹3,899",
    priceValue: 3899,
    note: "Three pieces · Ready to give",
    badge: "Bundle",
    materials: ["Linen"],
  },
  {
    id: 5,
    image: productPrayerSet,
    imageAlt: "Natural prayer mat with understated woven border",
    category: "Home & Prayer",
    name: "Quiet Ground Mat",
    price: "₹1,899",
    priceValue: 1899,
    note: "Natural · Wool blend · Woven edge",
    materials: ["Wool"],
  },
  {
    id: 6,
    image: productChildSet,
    imageAlt: "Wooden forms for children arranged on cotton muslin",
    category: "Little Ones",
    name: "The Growing Set",
    price: "₹1,799",
    priceValue: 1799,
    note: "Beech · Organic cotton · Ages 2+",
    materials: ["Wood", "Cotton"],
  },
  {
    id: 7,
    image: productModestSet,
    imageAlt: "Soft stone grey modest wear set on a linen surface",
    category: "Modest Essentials",
    name: "Ease Abaya",
    price: "₹3,699",
    priceValue: 3699,
    note: "Stone · Fluid weave · Two lengths",
    materials: ["Cotton"],
  },
  {
    id: 8,
    image: productBundle,
    imageAlt: "Prayer and home gift set in olive and linen tones",
    category: "Bundles",
    name: "Homecoming Bundle",
    price: "₹4,699",
    priceValue: 4699,
    note: "Four pieces · Gift wrapped",
    badge: "Bundle",
    materials: ["Linen", "Wood"],
  },
  {
    id: 9,
    image: productPrayerSet,
    imageAlt: "Compact olive prayer set for travel",
    category: "Home & Prayer",
    name: "The Journey Mat",
    price: "₹1,599",
    priceValue: 1599,
    note: "Olive · Foldable cotton · Travel size",
    materials: ["Cotton"],
  },
  {
    id: 10,
    image: productModestSet,
    imageAlt: "Folded soft cotton hijabs in neutral colours",
    category: "Modest Essentials",
    name: "Daily Hijab Pair",
    price: "₹1,399",
    priceValue: 1399,
    note: "Oat & stone · Brushed cotton",
    materials: ["Cotton"],
  },
  {
    id: 11,
    image: productChildSet,
    imageAlt: "Natural wooden rings with a linen keepsake bag",
    category: "Little Ones",
    name: "Little Keepsakes",
    price: "₹2,899",
    priceValue: 2899,
    note: "FSC beech · Linen bag · 5 pieces",
    materials: ["Wood", "Linen"],
  },
  {
    id: 12,
    image: productBundle,
    imageAlt: "Prayer essentials arranged as a thoughtful family gift",
    category: "Bundles",
    name: "Gathering Set",
    price: "₹5,499",
    priceValue: 5499,
    note: "Five pieces · Family edition",
    materials: ["Wool", "Wood"],
  },
];

function CollectionPage() {
  const [category, setCategory] = useState<"All" | Category>("All");
  const [selectedMaterials, setSelectedMaterials] = useState<Material[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<PriceTier[]>([]);
  const [sort, setSort] = useState("featured");
  const [visibleCount, setVisibleCount] = useState(8);

  const filtered = useMemo(() => {
    const withinTier = (price: number) =>
      selectedPrices.some((tier) =>
        tier === "Under ₹2,000"
          ? price < 2000
          : tier === "₹2,000–₹4,000"
            ? price >= 2000 && price <= 4000
            : price > 4000,
      );
    const result = products.filter(
      (product) =>
        (category === "All" || product.category === category) &&
        (selectedMaterials.length === 0 ||
          product.materials.some((material) => selectedMaterials.includes(material))) &&
        (selectedPrices.length === 0 || withinTier(product.priceValue)),
    );
    if (sort === "price-low") return [...result].sort((a, b) => a.priceValue - b.priceValue);
    if (sort === "price-high") return [...result].sort((a, b) => b.priceValue - a.priceValue);
    return result;
  }, [category, selectedMaterials, selectedPrices, sort]);

  const resetFilters = () => {
    setCategory("All");
    setSelectedMaterials([]);
    setSelectedPrices([]);
    setVisibleCount(8);
  };

  const toggle = <T,>(value: T, selected: T[], setSelected: (items: T[]) => void) =>
    setSelected(
      selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value],
    );

  const activeFilters =
    selectedMaterials.length + selectedPrices.length + (category === "All" ? 0 : 1);

  const filters = (
    <div className="space-y-8">
      <FilterGroup
        title="Category"
        options={categories.slice(1)}
        selected={category === "All" ? [] : [category]}
        onToggle={(value) => {
          setCategory(category === value ? "All" : (value as Category));
          setVisibleCount(8);
        }}
      />
      <FilterGroup
        title="Material"
        options={materials}
        selected={selectedMaterials}
        onToggle={(value) => {
          toggle(value as Material, selectedMaterials, setSelectedMaterials);
          setVisibleCount(8);
        }}
      />
      <FilterGroup
        title="Price tier"
        options={priceTiers}
        selected={selectedPrices}
        onToggle={(value) => {
          toggle(value as PriceTier, selectedPrices, setSelectedPrices);
          setVisibleCount(8);
        }}
      />
      {activeFilters > 0 ? (
        <Button variant="link" onClick={resetFilters}>
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
            copy="A focused collection for prayer, home, childhood, and everyday modesty. Honest materials, quiet forms, and only what earns its place."
          />
          <div className="mt-10 overflow-x-auto pb-1">
            <div className="flex min-w-max gap-2" role="tablist" aria-label="Product categories">
              {categories.map((item) => (
                <Button
                  key={item}
                  size="sm"
                  variant={category === item ? "default" : "outline"}
                  role="tab"
                  aria-selected={category === item}
                  onClick={() => {
                    setCategory(item);
                    setVisibleCount(8);
                  }}
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>
        </PageContainer>
      </section>

      <PageContainer className="section-space">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border pb-5 sm:flex sm:justify-between">
          <p className="min-w-0 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{filtered.length}</span> considered
            pieces
          </p>
          <div className="flex shrink-0 items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden">
                  <ListFilter /> Filters{activeFilters ? ` (${activeFilters})` : ""}
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
              <SelectTrigger className="w-36 sm:w-44" aria-label="Sort products">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: low to high</SelectItem>
                <SelectItem value="price-high">Price: high to low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[13rem_minmax(0,1fr)] xl:grid-cols-[14rem_minmax(0,1fr)]">
          <aside className="hidden lg:block" aria-label="Product filters">
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
                action="Clear filters"
                onAction={resetFilters}
              />
            ) : (
              <>
                <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
                  {filtered.slice(0, visibleCount).map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
                {visibleCount < filtered.length ? (
                  <div className="mt-14 border-t border-border pt-8 text-center">
                    <p className="mb-4 text-sm text-muted-foreground">
                      Showing {visibleCount} of {filtered.length}
                    </p>
                    <Button variant="outline" onClick={() => setVisibleCount((count) => count + 4)}>
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

function FilterGroup({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: readonly string[];
  selected: readonly string[];
  onToggle: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="eyebrow mb-4 text-foreground">{title}</legend>
      <div className="space-y-3">
        {options.map((option) => {
          const id = `${title}-${option}`.replaceAll(" ", "-").toLowerCase();
          return (
            <div key={option} className="flex items-center gap-3">
              <Checkbox
                id={id}
                checked={selected.includes(option)}
                onCheckedChange={() => onToggle(option)}
              />
              <Label htmlFor={id} className="cursor-pointer text-sm font-normal">
                {option}
              </Label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}
