import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, IndianRupee, RefreshCcw, ShieldCheck, Shirt } from "lucide-react";
import { ProductCard } from "@/components/brand/product-card";
import { EditorialCard } from "@/components/brand/editorial-card";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/brand/design-primitives";
import { PromiseTicker } from "@/components/brand/promise-ticker";
import { FamilyEnsemble } from "@/components/brand/family-ensemble";
import { OpacityTester } from "@/components/brand/opacity-tester";
import { MehrabArch } from "@/components/brand/ornament";
import {
  useCommerceProducts,
  mapMedusaToCollectionProduct,
  type CollectionProduct,
} from "@/lib/commerce/use-commerce";
import { SNAPSHOT_PRODUCTS, snapshotHandlesForCollection } from "@/lib/commerce/snapshot-fallback";
import { cn } from "@/lib/utils";

import heroHome from "@/assets/hero-home.jpg";
import productMenKurta from "@/assets/product-men-kurta.jpg";
import productPrayerSet from "@/assets/product-prayer-set.jpg";
import productChildSet from "@/assets/product-child-set.jpg";
import womenSalwar from "@/assets/women-salwar.jpg";
import pillarGifts from "@/assets/pillar-gifts.jpg";
import editorialHomeCalm from "@/assets/editorial-home-calm.jpg";
import editorialFamilyRhythm from "@/assets/editorial-family-rhythm.jpg";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Sukoon House — Thoughtful Living & Clothing for the Muslim Family" },
      {
        name: "description",
        content:
          "Cambric cotton salwar sets, handloom kurtas, children's tarbiyah, prayer sanctuary essentials and milestone gifts for the Indian Muslim home.",
      },
      { property: "og:title", content: "Sukoon House — Thoughtful Living & Clothing" },
      {
        property: "og:description",
        content:
          "Modest apparel, prayer goods, learning and home ambiance — honest quality at family prices.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

type PillarTile = {
  handle: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  accentText: string;
  accentBorder: string;
  accentBg: string;
};

const pillarTiles: PillarTile[] = [
  {
    handle: "women",
    title: "Women",
    subtitle: "Cambric sets, kurtas, hijabs",
    image: womenSalwar,
    imageAlt: "Sage cambric cotton salwar set folded on linen",
    accentText: "text-pillar-women-accent",
    accentBorder: "group-hover:border-pillar-women-accent",
    accentBg: "bg-pillar-women-accent",
  },
  {
    handle: "men",
    title: "Men",
    subtitle: "Friday kurtas, pathanis",
    image: "/images/men-kurta-ivory.jpg",
    imageAlt: "Handloom cotton kurta with mandarin collar",
    accentText: "text-pillar-men-accent",
    accentBorder: "group-hover:border-pillar-men-accent",
    accentBg: "bg-pillar-men-accent",
  },
  {
    handle: "children",
    title: "Children",
    subtitle: "Festive sets, everyday cottons",
    image: "/images/kids-kurta-mustard.jpg",
    imageAlt: "Children's cotton set with wooden toys",
    accentText: "text-pillar-kids-accent",
    accentBorder: "group-hover:border-pillar-kids-accent",
    accentBg: "bg-pillar-kids-accent",
  },
  {
    handle: "prayer",
    title: "Prayer",
    subtitle: "Memory foam mats, rehals",
    image: productPrayerSet,
    imageAlt: "Olive prayer mat with a wooden Quran stand",
    accentText: "text-pillar-prayer-accent",
    accentBorder: "group-hover:border-pillar-prayer-accent",
    accentBg: "bg-pillar-prayer-accent",
  },
  {
    handle: "learning",
    title: "Learning",
    subtitle: "Habit boards, storybooks",
    image: productChildSet,
    imageAlt: "Wooden learning set and Islamic storybooks",
    accentText: "text-pillar-kids-accent",
    accentBorder: "group-hover:border-pillar-kids-accent",
    accentBg: "bg-pillar-kids-accent",
  },
  {
    handle: "home",
    title: "Home",
    subtitle: "Bakhoor, attars, wall art",
    image: editorialHomeCalm,
    imageAlt: "A calm home corner with warm textiles",
    accentText: "text-pillar-prayer-accent",
    accentBorder: "group-hover:border-pillar-prayer-accent",
    accentBg: "bg-pillar-prayer-accent",
  },
  {
    handle: "gifts",
    title: "Gifts",
    subtitle: "Milestone boxes & hampers",
    image: pillarGifts,
    imageAlt: "A gift hamper of prayer and home essentials",
    accentText: "text-pillar-gifts-accent",
    accentBorder: "group-hover:border-pillar-gifts-accent",
    accentBg: "bg-pillar-gifts-accent",
  },
];

const occasionTabs = [
  {
    id: "all",
    label: "All",
    copy: "Explore all our collections.",
  },
  {
    id: "women",
    label: "Women",
    copy: "Cambric sets, kurtas, and more.",
  },
  {
    id: "men",
    label: "Men",
    copy: "Friday kurtas and pathanis.",
  },
  {
    id: "kids",
    label: "Kids",
    copy: "Festive sets and everyday cottons.",
  },
  {
    id: "prayer",
    label: "Prayer",
    copy: "Quiet Friday pieces — mats and attars.",
  },
  {
    id: "home",
    label: "Home",
    copy: "Bakhoor, attars, and wall art.",
  },
  {
    id: "gifts",
    label: "Gifts",
    copy: "Milestone boxes & hampers.",
  },
] as const;

/** Canonical snapshot catalogue fallback */
const snapshotCatalogue: CollectionProduct[] = SNAPSHOT_PRODUCTS.map(mapMedusaToCollectionProduct);

const assurances = [
  {
    icon: Shirt,
    title: "Doorstep size exchanges",
    detail: "A 7-day doorstep exchange window for apparel when the fit needs adjusting.",
  },
  {
    icon: ShieldCheck,
    title: "Free delivery ≥ ₹999",
    detail: "Express delivery is free when your family basket reaches the threshold.",
  },
  {
    icon: IndianRupee,
    title: "Cash on delivery",
    detail: "Pay on delivery where serviceable, with checkout support when you need it.",
  },
  {
    icon: RefreshCcw,
    title: "Tailoring-friendly margins",
    detail: "Apparel details call out the extra 2-inch inner margin where the catalog provides it.",
  },
];

const heroAssurances = [
  "Free express shipping over ₹999",
  "7-day hassle-free size exchanges",
  "Cash on delivery available",
];

const modestyCommitments = [
  "Attached pure cotton voil lining across the torso — no separate slip needed.",
  "100% opacity, checked against direct backlight on every fabric batch.",
  "Two-inch inner tailoring margins so the set can be let out as you need.",
];

const editorials = [
  {
    image: editorialHomeCalm,
    imageAlt: "A calm reading corner with soft textiles and warm light",
    topic: "The home",
    title: "A gentler way to gather",
    summary:
      "How small rituals — a set table, a quiet corner, an unhurried evening — turn a house into a place of rest.",
    readTime: "4 min read",
  },
  {
    image: editorialFamilyRhythm,
    imageAlt: "A family's daily rhythm expressed through warm, ordered spaces",
    topic: "Family rhythm",
    title: "Routines that hold a family together",
    summary:
      "Practical ideas for weaving prayer, meals and play into a rhythm children can grow inside.",
    readTime: "6 min read",
  },
];

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

function HomePage() {
  const { data: liveProducts } = useCommerceProducts();
  const [occasion, setOccasion] = useState<(typeof occasionTabs)[number]["id"]>("all");
  const catalogue = useMemo<CollectionProduct[]>(() => {
    if (liveProducts && liveProducts.length > 0) {
      const seen = new Set(liveProducts.map((p) => p.handle));
      return [...liveProducts, ...snapshotCatalogue.filter((p) => !seen.has(p.handle))];
    }
    return snapshotCatalogue;
  }, [liveProducts]);

  const occasionProducts = useMemo(() => {
    if (occasion === "all") {
      return catalogue.slice(0, 4);
    }
    const picked = catalogue.filter((p) => p.pillar.toLowerCase() === occasion.toLowerCase());
    return (picked.length > 0 ? picked : catalogue).slice(0, 4);
  }, [catalogue, occasion]);

  const prayerProducts = useMemo(
    () => catalogue.filter((p) => p.pillar === "Prayer" || p.pillar === "Home").slice(0, 3),
    [catalogue],
  );
  const under999Products = useMemo(
    () => catalogue.filter((p) => p.price < 999).slice(0, 4),
    [catalogue],
  );
  const newArrivals = useMemo(
    () =>
      [...catalogue]
        .sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""))
        .slice(0, 5),
    [catalogue],
  );

  const cambric = useMemo(
    () =>
      catalogue.find((p) => p.handle === "pure-cambric-cotton-set") ??
      catalogue.find((p) => p.name.toLowerCase().includes("cambric")) ??
      snapshotCatalogue[0]!,
    [catalogue],
  );

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-warm-ivory">
        <MehrabArch className="pointer-events-none absolute -right-16 -top-12 h-[520px] w-[380px] opacity-[0.06] text-primary" />
        <PageContainer className="relative grid items-center gap-10 py-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-24">
          <div>
            <p className="eyebrow-wide font-bold text-pillar-women-accent">
              Curated for everyday Muslim family life
            </p>
            <h1 className="mt-5 font-display text-5xl leading-[1.04] sm:text-6xl lg:text-7xl">
              Thoughtful Ethnic Wear &amp; Daily Essentials for Modern Muslim Families
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">
              Hand-vetted cambric cotton suits, orthopedic prayer mats, and children's tarbiyah
              tools. Guaranteed modesty, accessible pricing, delivered across India.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button size="lg" className="bg-pillar-women-accent hover:bg-pillar-women-accent/90 text-white border-pillar-women-accent" asChild>
                <Link to="/collection" search={{ category: "women" }}>
                  Shop Women <ArrowRight />
                </Link>
              </Button>
              <Button size="lg" asChild>
                <Link to="/collection">
                  Shop The Family
                </Link>
              </Button>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {heroAssurances.map((item) => (
                <li key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Check className="size-3.5 text-primary" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-2" aria-label="Quick departments">
              {pillarTiles.slice(0, 5).map((tile) => (
                <Link
                  key={tile.handle}
                  to="/collection"
                  search={{ category: tile.handle }}
                  className="rounded-full border border-border bg-card/70 px-3 py-1.5 text-xs font-semibold transition-colors hover:border-primary hover:text-primary"
                >
                  {tile.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="media-frame aspect-[4/3]">
              <img
                src={heroHome}
                alt="A calm family living space with everyday essentials arranged in soft daylight"
                width={1600}
                height={1200}
                className="size-full object-cover"
              />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Everyday pieces, photographed in a family home at first light.
            </p>
          </div>
        </PageContainer>
      </section>

      {/* Ambient Promise Ribbon */}
      <PromiseTicker />

      <section className="border-t border-border bg-card/35" aria-labelledby="new-arrivals">
        <PageContainer className="section-space">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow-wide text-muted-foreground">01b · Fresh from the catalogue</p>
              <h2 id="new-arrivals" className="mt-3 font-display text-4xl sm:text-5xl">
                New Arrivals
              </h2>
            </div>
            <Link
              to="/collection"
              className="text-sm font-semibold text-primary underline underline-offset-4"
            >
              View all arrivals
            </Link>
          </div>
          <div className="mt-8 flex snap-x gap-4 overflow-x-auto pb-3">
            {newArrivals.map((product) => (
              <div
                key={`arrival-${product.handle}`}
                className="w-[15rem] shrink-0 snap-start sm:w-[18rem]"
              >
                <ProductCard
                  pillar={product.pillar}
                  image={product.image}
                  hoverImage={product.hoverImage}
                  imageAlt={product.name}
                  category={product.subcategory}
                  name={product.name}
                  price={inr(product.price)}
                  previousPrice={product.mrp ? inr(product.mrp) : undefined}
                  savings={product.mrp ? inr(product.mrp - product.price) : undefined}
                  note={product.note}
                  badge={product.badge}
                  sizes={product.sizes}
                  sizeStock={product.sizeStock}
                  inStock={product.inStock}
                  href={`/products/${product.handle}`}
                />
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* Category circular cards */}
      <section aria-labelledby="family-pillars">
        <PageContainer className="pt-12 lg:pt-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow-wide text-muted-foreground">01 · Shop for the family</p>
              <h2 id="family-pillars" className="mt-3 font-display text-4xl sm:text-5xl">
                Seven shelves, one household.
              </h2>
            </div>
            <Button variant="outline" asChild>
              <Link to="/collection">Browse everything</Link>
            </Button>
          </div>
          <div className="mt-10 flex gap-4 overflow-x-auto snap-x pb-3 md:grid md:grid-cols-6 md:gap-6 md:overflow-visible md:snap-none md:pb-0">
            {pillarTiles.filter(t => t.handle !== 'learning').slice(0, 6).map((tile) => (
              <Link
                key={tile.handle}
                to="/collection"
                search={{ category: tile.handle }}
                className="group min-w-[120px] shrink-0 snap-start text-center"
              >
                <div
                  className={cn(
                    "relative overflow-hidden rounded-full aspect-square border-2 border-transparent transition-all duration-brand-fast ease-brand mx-auto max-w-[160px]",
                    tile.accentBorder,
                  )}
                >
                  <img
                    src={tile.image}
                    alt={tile.imageAlt}
                    width={400}
                    height={400}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-brand-slow ease-brand group-hover:scale-[1.03]"
                  />
                  <div
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-brand-fast ease-brand group-hover:opacity-15",
                      tile.accentBg,
                    )}
                  />
                </div>
                <h3
                  className={cn(
                    "mt-4 font-display text-lg leading-snug transition-colors",
                    `group-hover:${tile.accentText}`,
                  )}
                >
                  {tile.title}
                </h3>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">{tile.subtitle}</p>
              </Link>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* Shop by occasion banner section */}
      <section aria-labelledby="occasions-heading">
        <PageContainer className="section-space">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="occasions-heading" className="font-display text-4xl sm:text-5xl">Shop by Occasion</h2>
            <Link to="/collection" className="text-sm font-semibold text-primary underline underline-offset-4">View all →</Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <Link to="/collection" search={{ occasion: "eid" }} className="relative aspect-[4/3] overflow-hidden rounded-lg group cursor-pointer">
              <img src={editorialFamilyRhythm} alt="Eid Edit" className="size-full object-cover transition-transform duration-brand-slow group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <h3 className="text-white font-display text-xl font-semibold">Eid Edit</h3>
                <p className="text-white/70 text-sm mt-1">Celebrate in style</p>
              </div>
            </Link>
            <Link to="/collection" search={{ occasion: "ramadan" }} className="relative aspect-[4/3] overflow-hidden rounded-lg group cursor-pointer">
              <img src={editorialHomeCalm} alt="Ramadan Essentials" className="size-full object-cover transition-transform duration-brand-slow group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <h3 className="text-white font-display text-xl font-semibold">Ramadan Essentials</h3>
                <p className="text-white/70 text-sm mt-1">Faith in Everyday</p>
              </div>
            </Link>
            <Link to="/collection" search={{ occasion: "jummah" }} className="relative aspect-[4/3] overflow-hidden rounded-lg group cursor-pointer">
              <img src={productPrayerSet} alt="Jummah Collection" className="size-full object-cover transition-transform duration-brand-slow group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <h3 className="text-white font-display text-xl font-semibold">Jummah Collection</h3>
                <p className="text-white/70 text-sm mt-1">Stay Refreshed</p>
              </div>
            </Link>
            <Link to="/collection" search={{ occasion: "gifts" }} className="relative aspect-[4/3] overflow-hidden rounded-lg group cursor-pointer">
              <img src={pillarGifts} alt="Gifts for Loved Ones" className="size-full object-cover transition-transform duration-brand-slow group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <h3 className="text-white font-display text-xl font-semibold">Gifts for Loved Ones</h3>
                <p className="text-white/70 text-sm mt-1">Thoughtful &amp; Timeless</p>
              </div>
            </Link>
          </div>
        </PageContainer>
      </section>

      {/* Trending and festive shelf */}
      <section id="shop" className="scroll-mt-24">
        <PageContainer className="section-space">
          <p className="eyebrow-wide text-muted-foreground">02 · Trending now &amp; festive edit</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">
            Trending Now
          </h2>
          <div
            className="mt-8 flex gap-2 overflow-x-auto pb-1"
            role="tablist"
            aria-label="Occasions"
          >
            {occasionTabs.map((tab) => {
              const active = occasion === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setOccasion(tab.id)}
                  className={cn(
                    "min-h-10 shrink-0 rounded-full border px-4 text-sm transition-colors duration-brand-fast ease-brand",
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card/80 text-muted-foreground hover:text-foreground",
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
            {occasionTabs.find((t) => t.id === occasion)?.copy}
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {occasionProducts.map((product) => (
              <ProductCard
                key={`${occasion}-${product.handle}`}
                pillar={product.pillar}
                image={product.image}
                hoverImage={product.hoverImage}
                imageAlt={product.name}
                category={product.subcategory}
                name={product.name}
                price={inr(product.price)}
                previousPrice={product.mrp ? inr(product.mrp) : undefined}
                savings={product.mrp ? inr(product.mrp - product.price) : undefined}
                note={product.note}
                badge={product.badge}
                sizes={product.sizes}
                sizeStock={product.sizeStock}
                rating={product.rating}
                reviewCount={product.reviews}
                inStock={product.inStock}
                href={`/products/${product.handle}`}
              />
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="border-t border-border bg-warm-ivory" aria-labelledby="under-999">
        <PageContainer className="section-space">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow-wide text-muted-foreground">03 · Everyday value</p>
              <h2 id="under-999" className="mt-3 font-display text-4xl sm:text-5xl">
                Under ₹999 Essentials
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                Accessible pieces for everyday family rhythms, with the same clear material and fit
                information.
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/collection" search={{ category: "all" }}>
                Shop under ₹999 <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {under999Products.map((product) => (
              <ProductCard
                key={`under-999-${product.handle}`}
                pillar={product.pillar}
                image={product.image}
                hoverImage={product.hoverImage}
                imageAlt={product.name}
                category={product.subcategory}
                name={product.name}
                price={inr(product.price)}
                previousPrice={product.mrp ? inr(product.mrp) : undefined}
                savings={product.mrp ? inr(product.mrp - product.price) : undefined}
                note={product.note}
                badge={product.badge}
                sizes={product.sizes}
                sizeStock={product.sizeStock}
                inStock={product.inStock}
                href={`/products/${product.handle}`}
              />
            ))}
          </div>
        </PageContainer>
      </section>

      {/* Interactive Family Coordinate */}
      <section className="border-t border-border bg-card/40">
        <PageContainer className="section-space">
          <FamilyEnsemble />
        </PageContainer>
      </section>

      {/* Flagship cambric showcase & Opacity Guarantee */}
      <section className="border-y border-border bg-blush-cream/30">
        <PageContainer className="section-space">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div className="media-frame aspect-[4/3] lg:aspect-[4/5]">
              <img
                src={cambric.image ?? womenSalwar}
                alt="Pure cambric cotton three-piece salwar set in sage green"
                width={1200}
                height={1500}
                loading="lazy"
                className="size-full object-cover"
              />
            </div>
            <div>
              <p className="eyebrow-wide font-bold text-pillar-women-accent">
                03 · The Cambric Cotton Flagship
              </p>
              <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
                The three-piece set families keep re-ordering.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
                Pure 60s cambric cotton kurta, matching pants and a soft malmal dupatta — cut for
                long Indian summers and long days.
              </p>
              <ul className="mt-6 space-y-3">
                {modestyCommitments.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6">
                    <ShieldCheck
                      className="mt-0.5 size-4 shrink-0 text-pillar-women-accent"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <span className="font-display text-3xl">{inr(cambric.price)}</span>
                {cambric.mrp ? (
                  <span className="text-sm text-muted-foreground line-through">
                    {inr(cambric.mrp)}
                  </span>
                ) : null}
                <Button size="lg" asChild>
                  <Link to="/products/$productId" params={{ productId: cambric.handle }}>
                    View the set <ArrowRight />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-16 border-t border-border pt-16">
            <OpacityTester />
          </div>
        </PageContainer>
      </section>

      {/* Prayer sanctuary */}
      <section aria-labelledby="prayer-sanctuary">
        <PageContainer className="section-space">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow-wide font-bold text-pillar-prayer-accent">
                04 · The Prayer Sanctuary
              </p>
              <h2 id="prayer-sanctuary" className="mt-3 font-display text-4xl sm:text-5xl">
                A quiet corner, properly kept.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
                Memory foam mats that spare the knees, steam-bent rehals for the Quran, and natural
                botanical attars for Friday mornings.
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/collection" search={{ category: "prayer" }}>
                Explore prayer &amp; worship
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {prayerProducts.map((product) => (
              <ProductCard
                key={product.handle}
                pillar={product.pillar}
                image={product.image}
                imageAlt={product.name}
                category={product.subcategory}
                name={product.name}
                price={inr(product.price)}
                previousPrice={product.mrp ? inr(product.mrp) : undefined}
                savings={product.mrp ? inr(product.mrp - product.price) : undefined}
                note={product.note}
                badge={product.badge}
                rating={product.rating}
                reviewCount={product.reviews}
                inStock={product.inStock}
                href={`/products/${product.handle}`}
              />
            ))}
          </div>
        </PageContainer>
      </section>

      {/* Family trust & assurances */}
      <section
        id="assurance"
        className="scroll-mt-24 border-y border-border bg-primary text-primary-foreground"
      >
        <PageContainer className="section-space">
          <p className="eyebrow-wide text-primary-foreground/60">05 · Why families shop with us</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl leading-tight sm:text-5xl">
            Made properly, priced honestly, for the whole family.
          </h2>
          <ul className="mt-12 grid gap-8 sm:grid-cols-2">
            {assurances.map(({ icon: Icon, title, detail }) => (
              <li key={title} className="flex gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-sm bg-primary-foreground/10">
                  <Icon className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{title}</p>
                  <p className="mt-1 text-sm text-primary-foreground/70">{detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </PageContainer>
      </section>

      {/* Journal */}
      <section id="journal" className="scroll-mt-24">
        <PageContainer className="section-space">
          <p className="eyebrow-wide text-muted-foreground">06 · The journal</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">
            Ideas with a place in real life.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
            Notes on home, family rhythm and intentional living — written slowly, published
            occasionally.
          </p>
          <div className="mt-12 grid gap-14">
            {editorials.map((story) => (
              <EditorialCard key={story.title} {...story} />
            ))}
          </div>
        </PageContainer>
      </section>
    </>
  );
}
