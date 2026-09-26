import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, IndianRupee, RefreshCcw, ShieldCheck, Shirt } from "lucide-react";
import { ProductCard } from "@/components/brand/product-card";
import { EditorialCard } from "@/components/brand/editorial-card";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/brand/design-primitives";
import { useCommerceProducts, type CollectionProduct } from "@/lib/commerce/use-commerce";
import { snapshotHandlesForCollection } from "@/lib/commerce/snapshot-fallback";
import { cn } from "@/lib/utils";
import heroHome from "@/assets/hero-home.jpg";
import productModestSet from "@/assets/product-modest-set.jpg";
import productMenKurta from "@/assets/product-men-kurta.jpg";
import productPrayerSet from "@/assets/product-prayer-set.jpg";
import productChildSet from "@/assets/product-child-set.jpg";
import productBundle from "@/assets/product-bundle.jpg";
import womenKurta from "@/assets/women-kurta.jpg";
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
    image: productModestSet,
    imageAlt: "Sage cambric cotton salwar set folded on linen",
    accentText: "text-pillar-women-accent",
    accentBorder: "group-hover:border-pillar-women-accent",
    accentBg: "bg-pillar-women-bg",
  },
  {
    handle: "men",
    title: "Men",
    subtitle: "Friday kurtas, pathanis",
    image: productMenKurta,
    imageAlt: "Handloom cotton kurta with mandarin collar",
    accentText: "text-pillar-men-accent",
    accentBorder: "group-hover:border-pillar-men-accent",
    accentBg: "bg-pillar-men-bg",
  },
  {
    handle: "children",
    title: "Children",
    subtitle: "Festive sets, everyday cottons",
    image: productChildSet,
    imageAlt: "Children's cotton set with wooden toys",
    accentText: "text-pillar-kids-accent",
    accentBorder: "group-hover:border-pillar-kids-accent",
    accentBg: "bg-pillar-kids-bg",
  },
  {
    handle: "prayer",
    title: "Prayer",
    subtitle: "Memory foam mats, rehals",
    image: productPrayerSet,
    imageAlt: "Olive prayer mat with a wooden Quran stand",
    accentText: "text-pillar-prayer-accent",
    accentBorder: "group-hover:border-pillar-prayer-accent",
    accentBg: "bg-pillar-prayer-bg",
  },
  {
    handle: "learning",
    title: "Learning",
    subtitle: "Habit boards, storybooks",
    image: productChildSet,
    imageAlt: "Wooden learning set and Islamic storybooks",
    accentText: "text-pillar-kids-accent",
    accentBorder: "group-hover:border-pillar-kids-accent",
    accentBg: "bg-pillar-kids-bg",
  },
  {
    handle: "home",
    title: "Home",
    subtitle: "Bakhoor, attars, wall art",
    image: editorialHomeCalm,
    imageAlt: "A calm home corner with warm textiles",
    accentText: "text-pillar-prayer-accent",
    accentBorder: "group-hover:border-pillar-prayer-accent",
    accentBg: "bg-pillar-prayer-bg",
  },
  {
    handle: "gifts",
    title: "Gifts",
    subtitle: "Milestone boxes & hampers",
    image: productBundle,
    imageAlt: "A gift hamper of prayer and home essentials",
    accentText: "text-pillar-gifts-accent",
    accentBorder: "group-hover:border-pillar-gifts-accent",
    accentBg: "bg-pillar-gifts-bg",
  },
];

const occasionTabs = [
  {
    id: "festive",
    label: "Festive & Eid 2026",
    copy: "Family-ready sets that feel special without shouting.",
  },
  {
    id: "everyday",
    label: "Everyday Essentials",
    copy: "Breathable cottons and pieces that survive real family weeks.",
  },
  {
    id: "jummah",
    label: "Jummah Routine",
    copy: "Quiet Friday pieces — kurtas, mats and attars kept ready.",
  },
] as const;

const fallbackProducts: CollectionProduct[] = [
  {
    id: "pure-cambric-cotton-set",
    handle: "pure-cambric-cotton-set",
    pillar: "Women",
    subcategory: "Salwar Suit Sets",
    name: "Pure Cambric Cotton Salwar Suit Set",
    price: 1499,
    mrp: 1699,
    note: "Sage Green · 3-piece stitched set · Attached cotton voil lining",
    materials: ["Pure Cotton"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.9,
    reviews: 38,
    inStock: true,
    festive: true,
    badge: "Bestseller",
    image: productModestSet,
  },
  {
    id: "classic-friday-cotton-kurta",
    handle: "classic-friday-cotton-kurta",
    pillar: "Men",
    subcategory: "Kurtas",
    name: "Classic Friday Handloom Cotton Kurta",
    price: 899,
    mrp: 999,
    note: "Soft white · 100% long-staple cotton · Mandarin collar",
    materials: ["Pure Cotton"],
    sizes: ["M", "L", "XL", "XXL"],
    rating: 4.8,
    reviews: 93,
    inStock: true,
    image: productMenKurta,
  },
  {
    id: "the-stillness-set",
    handle: "the-stillness-set",
    pillar: "Prayer",
    subcategory: "Memory Foam Mats",
    name: "The Stillness Prayer Mat & Rehal Set",
    price: 3499,
    mrp: 3999,
    note: "Olive velvet mat with bentwood rehal",
    materials: ["Memory Foam", "Wood"],
    rating: 4.9,
    reviews: 44,
    inStock: true,
    image: productPrayerSet,
  },
  {
    id: "first-forms-set",
    handle: "first-forms-set",
    pillar: "Children",
    subcategory: "Learning Toys",
    name: "First Forms Wooden Learning Set",
    price: 1999,
    mrp: 2299,
    note: "Six pieces · Natural beech · Ages 2+",
    materials: ["Wood"],
    rating: 4.8,
    reviews: 32,
    inStock: true,
    image: productChildSet,
  },
];

const assurances = [
  {
    icon: Shirt,
    title: "Honest everyday fabrics",
    detail:
      "100% breathable cottons, micro-modals and natural linen, tested for colour fastness and daily durability.",
  },
  {
    icon: ShieldCheck,
    title: "Verified modest cuts",
    detail:
      "Generous lengths, full sleeves, high necklines and attached opaque linings — nothing see-through.",
  },
  {
    icon: RefreshCcw,
    title: "7-day size exchanges",
    detail: "If the fit isn't perfect, we arrange an easy reverse pickup at your doorstep.",
  },
  {
    icon: IndianRupee,
    title: "Direct family value",
    detail:
      "Sourcing straight from makers lets us hold quality high and prices honest — free shipping over ₹999.",
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
  const [occasion, setOccasion] = useState<(typeof occasionTabs)[number]["id"]>("festive");

  const catalogue = useMemo<CollectionProduct[]>(() => {
    if (liveProducts && liveProducts.length > 0) {
      const seen = new Set(liveProducts.map((p) => p.handle));
      return [...liveProducts, ...fallbackProducts.filter((p) => !seen.has(p.handle))];
    }
    return fallbackProducts;
  }, [liveProducts]);

  const occasionProducts = useMemo(() => {
    const handles = snapshotHandlesForCollection(occasion);
    const picked = catalogue.filter((p) => handles.includes(p.handle));
    return (picked.length > 0 ? picked : catalogue).slice(0, 4);
  }, [catalogue, occasion]);

  const prayerProducts = useMemo(
    () => catalogue.filter((p) => p.pillar === "Prayer" || p.pillar === "Home").slice(0, 3),
    [catalogue],
  );

  const cambric = useMemo(
    () =>
      catalogue.find((p) => p.name.toLowerCase().includes("cambric")) ??
      (fallbackProducts[0] as CollectionProduct),
    [catalogue],
  );

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-warm-ivory">
        <PageContainer className="grid items-center gap-10 py-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-24">
          <div>
            <p className="eyebrow-wide font-bold text-pillar-women-accent">
              Curated for everyday Muslim family life
            </p>
            <h1 className="mt-5 font-display text-5xl leading-[1.04] sm:text-6xl lg:text-7xl">
              Thoughtful Living &amp; Clothing for the Muslim Family
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">
              Cambric cotton salwar sets, handloom kurtas, children's tarbiyah, and a prayer
              sanctuary for the home. Good quality, honest prices, one considered store.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button size="lg" asChild>
                <Link to="/collection" search={{ category: "women" }}>
                  Shop Women's Cambric Sets <ArrowRight />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-border bg-card/80 hover:bg-card"
                asChild
              >
                <Link to="/collection" search={{ category: "prayer" }}>
                  Explore The Prayer Sanctuary
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

      {/* 7-pillar row */}
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
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-7">
            {pillarTiles.map((tile) => (
              <Link
                key={tile.handle}
                to="/collection"
                search={{ category: tile.handle }}
                className="group min-w-0"
              >
                <div
                  className={cn(
                    "media-frame relative aspect-[4/5] border border-transparent transition-colors duration-brand-fast ease-brand",
                    tile.accentBorder,
                  )}
                >
                  <img
                    src={tile.image}
                    alt={tile.imageAlt}
                    width={800}
                    height={1000}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-brand-slow ease-brand group-hover:scale-[1.03]"
                  />
                </div>
                <h3
                  className={cn(
                    "mt-3 font-display text-lg leading-snug transition-colors",
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

      {/* Curated occasions */}
      <section id="shop" className="scroll-mt-24">
        <PageContainer className="section-space">
          <p className="eyebrow-wide text-muted-foreground">02 · Curated occasions</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">Shop the moment you're dressing for.</h2>
          <div className="mt-8 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Occasions">
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
                imageAlt={product.name}
                category={product.subcategory}
                name={product.name}
                price={inr(product.price)}
                previousPrice={product.mrp ? inr(product.mrp) : undefined}
                savings={product.mrp ? inr(product.mrp - product.price) : undefined}
                note={product.note}
                badge={product.badge}
                sizes={product.sizes}
                rating={product.rating}
                reviewCount={product.reviews}
                inStock={product.inStock}
                href={`/products/${product.handle}`}
              />
            ))}
          </div>
        </PageContainer>
      </section>

      {/* Flagship cambric showcase */}
      <section className="border-y border-border bg-pillar-women-bg">
        <PageContainer className="grid items-center gap-10 py-14 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:py-20">
          <div className="media-frame aspect-[4/3] lg:aspect-[4/5]">
            <img
              src={cambric.image ?? womenKurta}
              alt="Pure cambric cotton three-piece salwar set in sage green"
              width={1200}
              height={1500}
              loading="lazy"
              className="size-full object-cover"
            />
          </div>
          <div>
            <p className="eyebrow-wide font-bold text-pillar-women-accent">
              03 · The Cambric Cotton flagship
            </p>
            <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
              The three-piece set families keep re-ordering.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
              Pure 60s cambric cotton kurta, matching pants and a soft malmal dupatta — cut for long
              Indian summers and long days.
            </p>
            <ul className="mt-6 space-y-3">
              {modestyCommitments.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-pillar-women-accent" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <span className="font-display text-3xl">{inr(cambric.price)}</span>
              {cambric.mrp ? (
                <span className="text-sm text-muted-foreground line-through">{inr(cambric.mrp)}</span>
              ) : null}
              <Button size="lg" asChild>
                <Link to="/products/$productId" params={{ productId: cambric.handle }}>
                  View the set <ArrowRight />
                </Link>
              </Button>
            </div>
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
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">Ideas with a place in real life.</h2>
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
