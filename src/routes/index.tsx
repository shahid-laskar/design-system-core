import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  IndianRupee,
  RefreshCcw,
  ShieldCheck,
  Shirt,
} from "lucide-react";
import { ProductCard } from "@/components/brand/product-card";
import { EditorialCard } from "@/components/brand/editorial-card";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/brand/design-primitives";
import { PromiseTicker } from "@/components/brand/promise-ticker";
import { FamilyEnsemble } from "@/components/brand/family-ensemble";
import { OpacityTester } from "@/components/brand/opacity-tester";
import { Reveal } from "@/components/brand/reveal";
import {
  useCommerceProducts,
  mapMedusaToCollectionProduct,
  type CollectionProduct,
} from "@/lib/commerce/use-commerce";
import { SNAPSHOT_PRODUCTS } from "@/lib/commerce/snapshot-fallback";
import { cn } from "@/lib/utils";

import occasionEid from "@/assets/occasion-eid.jpg";
import occasionRamadan from "@/assets/occasion-ramadan.jpg";
import pillarGifts from "@/assets/pillar-gifts.jpg";
import editorialHomeCalm from "@/assets/editorial-home-calm.jpg";
import editorialFamilyRhythm from "@/assets/editorial-family-rhythm.jpg";
import productPrayerSet from "@/assets/product-prayer-set.jpg";

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

type CategoryEntrance = {
  handle: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  tone: string;
  span?: string;
  /** Crop anchor — keeps faces inside short landscape tiles. */
  position?: string;
};

const categoryEntrances: CategoryEntrance[] = [
  {
    handle: "women",
    title: "Women",
    subtitle: "Cambric sets, kurtas & abayas",
    image: "/images/salwar-suit-berry.jpg",
    imageAlt: "Woman wearing berry floral cambric salwar suit with draped dupatta",
    tone: "from-berry/80 via-berry/20 to-transparent",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    handle: "men",
    title: "Men",
    subtitle: "Friday kurtas & pathanis",
    image: "/images/men-category-mosaic.jpg",
    imageAlt: "Indian Muslim man in ivory handloom cotton kurta with mandarin collar",
    tone: "from-teal/80 via-teal/15 to-transparent",
    span: "md:col-span-2",
    position: "object-[center_18%]",
  },
  {
    handle: "children",
    title: "Children",
    subtitle: "Festive cottons & tarbiyah",
    image: "/images/kids-kurta-mustard.jpg",
    imageAlt: "Boy wearing mustard festive cotton kurta set",
    tone: "from-mango/85 via-mango/25 to-transparent",
  },
  {
    handle: "prayer",
    title: "Prayer",
    subtitle: "Mats, rehals & attars",
    image: productPrayerSet,
    imageAlt: "Olive prayer mat with wooden Quran stand",
    tone: "from-emerald/85 via-emerald/20 to-transparent",
  },
  {
    handle: "home",
    title: "Home",
    subtitle: "Bakhoor, attars & calm corners",
    image: "/images/brass-bakhoor-burner.jpg",
    imageAlt: "Handcrafted solid cast brass charcoal bakhoor incense burner on walnut tray",
    tone: "from-emerald/70 via-charcoal-ink/20 to-transparent",
  },
  {
    handle: "gifts",
    title: "Gifts",
    subtitle: "Milestone boxes & hampers",
    image: pillarGifts,
    imageAlt: "Gift hamper of prayer and home essentials",
    tone: "from-coral/80 via-coral/20 to-transparent",
  },
];

const occasionStories = [
  {
    id: "eid",
    title: "Eid Edit",
    copy: "Coordinated festive looks for the whole household.",
    image: occasionEid,
    accent: "bg-mango text-mango-foreground",
  },
  {
    id: "ramadan",
    title: "Ramadan Essentials",
    copy: "Quiet pieces for long nights and soft mornings.",
    image: occasionRamadan,
    accent: "bg-emerald text-emerald-foreground",
  },
  {
    id: "jummah",
    title: "Jummah Collection",
    copy: "Fresh kurtas, mats, and Friday fragrance.",
    image: "/images/men-kurta-ivory.jpg",
    accent: "bg-teal text-teal-foreground",
  },
  {
    id: "gifts",
    title: "Gifts for Loved Ones",
    copy: "Thoughtful boxes for nikah, new homes, and Eid.",
    image: pillarGifts,
    accent: "bg-coral text-coral-foreground",
  },
] as const;

const occasionTabs = [
  { id: "all", label: "All", copy: "Curated across the household." },
  { id: "women", label: "Women", copy: "Cambric sets, kurtas, and more." },
  { id: "men", label: "Men", copy: "Friday kurtas and pathanis." },
  { id: "kids", label: "Kids", copy: "Festive sets and everyday cottons." },
  { id: "prayer", label: "Prayer", copy: "Quiet Friday pieces — mats and attars." },
  { id: "home", label: "Home", copy: "Bakhoor, attars, and wall art." },
  { id: "gifts", label: "Gifts", copy: "Milestone boxes & hampers." },
] as const;

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
    image: "/images/journal-cambric-craft.jpg",
    imageAlt: "Artisan hands inspecting pure cambric cotton weave with tailor scissors and thread",
    topic: "Craft & Longevity",
    title: "Caring for Pure Cambric Cotton",
    summary:
      "Mindful cold washing, natural line-drying, and gentle steam ironing ensure your cotton salwar suits retain soft drape and opacity across seasons.",
    readTime: "4 min read",
  },
];

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

const heroSlides = [
  {
    id: "women",
    label: "Women",
    eyebrow: "Pure cambric · everyday ease",
    title: "Kurtas with a softer kind of confidence.",
    copy: "Opaque, breathable cotton sets made for full days, family gatherings, and quiet mornings.",
    image: "/images/Emerald%20Elegance%20in%20a%20Sunlit%20Courtyard.png",
    alt: "Woman in an emerald modest cotton set in a sunlit courtyard",
    position: "object-[78%_22%] lg:object-[center_27%]",
    cta: "Explore women",
  },
  {
    id: "men",
    label: "Men",
    eyebrow: "Handloom · Friday ready",
    title: "A considered kurta for every gathering.",
    copy: "Easy cotton silhouettes with a quiet, tailored finish — from Friday prayer to family lunch.",
    image: "/images/Sunlit%20Courtyard%20Portrait%20in%20Teal%20Kurta.png",
    alt: "Man wearing a teal kurta in a sunlit courtyard",
    position: "object-[72%_18%] lg:object-[center_25%]",
    cta: "Explore men",
  },
  {
    id: "children",
    label: "Children",
    eyebrow: "Little rituals · big joy",
    title: "Beautiful beginnings, made for little hands.",
    copy: "Festive cottons and gentle habit-building pieces that make everyday family rituals feel special.",
    image: "/images/Golden%20Courtyard%20Daily%20Steps.png",
    alt: "Two children learning together in a golden courtyard",
    position: "object-[68%_30%] lg:object-[center_35%]",
    cta: "Explore children",
  },
  {
    id: "prayer",
    label: "Prayer",
    eyebrow: "A corner for calm",
    title: "Make room for stillness.",
    copy: "Memory-foam mats, bentwood rehals, and natural fragrance for the rituals that bring us home.",
    image: "/images/Serene%20Islamic%20Prayer%20Nook%20at%20Golden%20Hour.png",
    alt: "Serene Islamic prayer nook with an olive prayer mat and Quran stand",
    position: "object-[68%_45%] lg:object-[center_50%]",
    cta: "Explore prayer",
  },
  {
    id: "gifts",
    label: "Gifts",
    eyebrow: "Thoughtful by nature",
    title: "Give something that settles into a home.",
    copy: "Curated keepsakes for new beginnings, Eid mornings, nikah celebrations, and the people you love.",
    image: "/images/Luxury%20Sukoon%20House%20Gift%20Set.png",
    alt: "Luxury Sukoon House gift set with prayer and fragrance essentials",
    position: "object-[68%_46%] lg:object-[center_50%]",
    cta: "Explore gifts",
  },
  {
    id: "family",
    label: "Family",
    eyebrow: "Made for the household",
    title: "One warm place for everyone you call home.",
    copy: "Modest clothing, prayer essentials, children's joy, and gifts — thoughtfully gathered under one roof.",
    image: "/images/Sunlit%20Family%20Portrait%20by%20the%20Archway.png",
    alt: "Family walking together beneath a sunlit courtyard archway",
    position: "object-[68%_24%] lg:object-[center_30%]",
    cta: "Shop the family",
  },
] as const;

function HomePage() {
  const { data: liveProducts } = useCommerceProducts();
  const [occasion, setOccasion] = useState<(typeof occasionTabs)[number]["id"]>("all");
  const [activeHero, setActiveHero] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const catalogue = useMemo<CollectionProduct[]>(() => {
    if (liveProducts && liveProducts.length > 0) {
      const seen = new Set(liveProducts.map((p) => p.handle));
      return [...liveProducts, ...snapshotCatalogue.filter((p) => !seen.has(p.handle))];
    }
    return snapshotCatalogue;
  }, [liveProducts]);

  const occasionProducts = useMemo(() => {
    if (occasion === "all") {
      return catalogue.slice(0, 6);
    }
    const picked = catalogue.filter((p) => p.pillar.toLowerCase() === occasion.toLowerCase());
    return (picked.length > 0 ? picked : catalogue).slice(0, 6);
  }, [catalogue, occasion]);

  const prayerProducts = useMemo(
    () => catalogue.filter((p) => p.pillar === "Prayer" || p.pillar === "Home").slice(0, 3),
    [catalogue],
  );
  const under999Products = useMemo(
    () => catalogue.filter((p) => p.price < 999).slice(0, 6),
    [catalogue],
  );
  const newArrivals = useMemo(
    () =>
      [...catalogue]
        .sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""))
        .slice(0, 6),
    [catalogue],
  );

  const featuredLook = useMemo(() => {
    const women = catalogue.filter((p) => p.pillar === "Women");
    return {
      lead:
        women.find((p) => p.handle.includes("floral") || p.handle.includes("berry")) ??
        women[0] ??
        catalogue[0]!,
      side: women
        .filter((p) => !(p.handle.includes("floral") || p.handle.includes("berry")))
        .slice(0, 2),
    };
  }, [catalogue]);

  const cambric = useMemo(
    () =>
      catalogue.find((p) => p.handle === "pure-cambric-cotton-set") ??
      catalogue.find((p) => p.name.toLowerCase().includes("cambric")) ??
      snapshotCatalogue[0]!,
    [catalogue],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches);
    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);
    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (heroPaused || reducedMotion) return;
    const timer = window.setInterval(() => {
      setActiveHero((current) => (current + 1) % heroSlides.length);
      setProgressKey((k) => k + 1);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [heroPaused, reducedMotion]);

  const currentHero = heroSlides[activeHero];
  const moveHero = (direction: 1 | -1) => {
    setActiveHero(
      (current) => (current + direction + heroSlides.length) % heroSlides.length,
    );
    setProgressKey((k) => k + 1);
  };

  return (
    <>
      {/* Full-bleed editorial hero: image-first on mobile, with a calm reading panel below. */}
      <section
        aria-roledescription="carousel"
        aria-label="Sukoon House collections"
        className="relative isolate min-h-[min(47rem,calc(100svh-7rem))] overflow-hidden bg-warm-ivory text-foreground lg:min-h-[92svh] lg:text-white"
        onMouseEnter={() => setHeroPaused(true)}
        onMouseLeave={() => setHeroPaused(false)}
        onTouchStart={(event) => {
          setHeroPaused(true);
          touchStartX.current = event.changedTouches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          const startX = touchStartX.current;
          const endX = event.changedTouches[0]?.clientX;
          touchStartX.current = null;
          setHeroPaused(false);
          if (startX === null || endX === undefined) return;
          const distance = endX - startX;
          if (Math.abs(distance) < 45) return;
          moveHero(distance < 0 ? 1 : -1);
        }}
      >
        {heroSlides.map((slide, index) => (
          <img
            key={slide.id}
            src={slide.image}
            alt={slide.alt}
            width={1536}
            height={1024}
            aria-hidden={index !== activeHero}
            fetchPriority={index === 0 ? "high" : "auto"}
            className={cn(
              "absolute inset-0 size-full object-cover transition-[opacity,transform] duration-700 ease-brand",
              slide.position,
              index === activeHero ? "scale-100 opacity-100" : "scale-[1.025] opacity-0",
            )}
          />
        ))}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(90deg,oklch(0.18_0.02_260_/_0.62)_0%,oklch(0.18_0.02_260_/_0.28)_38%,transparent_62%),linear-gradient(0deg,oklch(0.18_0.02_260_/_0.35)_0%,transparent_42%)] lg:block"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[52%] bg-gradient-to-t from-warm-ivory via-warm-ivory/95 to-transparent lg:hidden"
        />

        <PageContainer className="relative flex min-h-[min(47rem,calc(100svh-7rem))] flex-col justify-end gap-4 pb-[calc(var(--mobile-bottom-nav-h)+1rem)] pt-56 sm:gap-6 sm:pb-[calc(var(--mobile-bottom-nav-h)+1.75rem)] lg:min-h-[92svh] lg:justify-center lg:pb-24 lg:pt-32">
          <div className="max-w-xl animate-in fade-in slide-in-from-bottom-3 duration-700 lg:max-w-2xl">
            <p className="eyebrow-wide text-berry lg:text-mango">{currentHero.eyebrow}</p>
            <h1 className="mt-3 max-w-[21rem] font-display text-[2.15rem] leading-[1.08] tracking-tight text-charcoal-ink sm:max-w-xl sm:text-5xl lg:mt-4 lg:max-w-2xl lg:text-7xl lg:text-white">
              {currentHero.title}
            </h1>
            <p className="mt-3 max-w-md text-sm leading-6 text-charcoal-ink/75 sm:mt-4 sm:text-base sm:leading-7 lg:text-white/90">
              {currentHero.copy}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2.5 sm:mt-7 sm:gap-3">
              <Button
                size="lg"
                className="min-h-11 border-berry bg-berry px-4 text-berry-foreground hover:bg-berry/90 sm:px-5"
                asChild
              >
                <Link
                  to="/collection"
                  search={{ category: currentHero.id === "family" ? undefined : currentHero.id }}
                >
                  {currentHero.cta} <ArrowRight />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="min-h-11 border-charcoal-ink/25 bg-background/80 px-4 text-charcoal-ink backdrop-blur-sm hover:bg-background sm:px-5 lg:border-white/70 lg:bg-white/10 lg:text-white lg:hover:bg-white/20"
                onClick={() => moveHero(1)}
              >
                Next story <ArrowRight />
              </Button>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between gap-3 sm:mt-5 lg:mt-8">
            <div className="flex min-w-0 items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none" role="tablist" aria-label="Hero categories">
              {heroSlides.map((slide, index) => {
                const isActive = index === activeHero;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Show ${slide.label} story`}
                    onClick={() => {
                      setActiveHero(index);
                      setProgressKey((k) => k + 1);
                    }}
                    className={cn(
                      "relative min-h-9 shrink-0 overflow-hidden rounded-sm border px-3 text-xs font-semibold transition-colors duration-brand-fast",
                      isActive
                        ? "border-berry bg-berry text-berry-foreground lg:border-mango lg:bg-mango lg:text-mango-foreground"
                        : "border-charcoal-ink/20 bg-background/75 text-charcoal-ink hover:border-charcoal-ink/45 lg:border-white/50 lg:bg-white/10 lg:text-white lg:hover:bg-white/20",
                    )}
                  >
                    <span className="relative z-10">{slide.label}</span>
                    {isActive && !reducedMotion && (
                      <span
                        key={progressKey}
                        aria-hidden
                        className={cn(
                          "absolute inset-x-0 bottom-0 h-[3px] origin-left rounded-full bg-white/50",
                          heroPaused ? "[animation-play-state:paused]" : "",
                        )}
                        style={{
                          animation: "hero-progress 5s linear forwards",
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
            <div className="hidden shrink-0 items-center gap-1.5 sm:flex">
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label="Previous story"
                className="border-charcoal-ink/20 bg-background/75 text-charcoal-ink lg:border-white/50 lg:bg-white/10 lg:text-white"
                onClick={() => moveHero(-1)}
              >
                <ArrowLeft />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label="Next story"
                className="border-charcoal-ink/20 bg-background/75 text-charcoal-ink lg:border-white/50 lg:bg-white/10 lg:text-white"
                onClick={() => moveHero(1)}
              >
                <ArrowRight />
              </Button>
            </div>
          </div>
          <span className="sr-only" aria-live="polite">
            Showing {currentHero.label} collection story, {activeHero + 1} of {heroSlides.length}
          </span>
        </PageContainer>
      </section>

      <PromiseTicker />

      {/* Asymmetric category visual entrances — tight bridge from ticker */}
      <section aria-labelledby="family-pillars" className="border-t border-border/60 bg-warm-ivory">
        <PageContainer className="pb-[var(--space-section-block)] pt-8 sm:pt-10 lg:pb-[var(--space-section-block-wide)] lg:pt-12">
          <Reveal>
            <p className="eyebrow-wide text-teal">Shop the household</p>
            <h2 id="family-pillars" className="mt-3 max-w-2xl font-display text-4xl sm:text-5xl">
              Enter by who you are dressing today.
            </h2>
          </Reveal>
          <div className="mt-10 grid auto-rows-[11rem] grid-cols-2 gap-3 md:auto-rows-[14rem] md:grid-cols-4 md:gap-4 lg:auto-rows-[16rem]">
            {categoryEntrances.map((tile, index) => (
              <Reveal key={tile.handle} delay={index * 60} className={cn(tile.span)}>
                <Link
                  to="/collection"
                  search={{ category: tile.handle }}
                  className="group relative block size-full overflow-hidden rounded-md"
                >
                  <img
                    src={tile.image}
                    alt={tile.imageAlt}
                    width={800}
                    height={1000}
                    loading="lazy"
                    className={cn(
                      "size-full object-cover transition-transform duration-brand-slow ease-brand group-hover:scale-[1.04]",
                      tile.position ?? "object-center",
                    )}
                  />
                  <div
                    aria-hidden
                    className={cn(
                      "absolute inset-0 bg-gradient-to-t transition-opacity duration-brand-fast",
                      tile.tone,
                    )}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
                    <h3 className="font-display text-xl sm:text-2xl">{tile.title}</h3>
                    <p className="mt-1 text-xs text-white/80 sm:text-sm">{tile.subtitle}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* Editorial curated showcase — not another 4-card grid */}
      <section className="border-y border-border bg-blush-cream/50" aria-labelledby="lookbook">
        <PageContainer className="section-space">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow-wide text-berry">Lookbook · Women</p>
              <h2 id="lookbook" className="mt-3 font-display text-4xl sm:text-5xl">
                Silhouette first. Desire follows.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                Flagship apparel shown as worn garments — drape, length, and colour as you will
                actually see them.
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/collection" search={{ category: "women" }}>
                Shop women <ArrowRight />
              </Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-[1.4fr_1fr] lg:gap-6">
            <Link
              to="/products/$productId"
              params={{ productId: featuredLook.lead.handle }}
              className="group relative overflow-hidden rounded-md"
            >
              <div className="media-frame aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]">
                <img
                  src={featuredLook.lead.image}
                  alt={featuredLook.lead.name}
                  width={1200}
                  height={1500}
                  className="size-full object-cover transition-transform duration-brand-slow ease-brand group-hover:scale-[1.03]"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal-ink/80 to-transparent p-5 text-white sm:p-7">
                <p className="eyebrow-wide text-mango">{featuredLook.lead.subcategory}</p>
                <h3 className="mt-2 font-display text-2xl sm:text-3xl">{featuredLook.lead.name}</h3>
                <p className="mt-2 text-sm text-white/80">
                  {inr(featuredLook.lead.price)}
                  {featuredLook.lead.mrp ? (
                    <span className="ml-2 line-through opacity-70">
                      {inr(featuredLook.lead.mrp)}
                    </span>
                  ) : null}
                </p>
              </div>
            </Link>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {(featuredLook.side.length > 0 ? featuredLook.side : newArrivals.slice(1, 3)).map(
                (product) => (
                  <Link
                    key={product.handle}
                    to="/products/$productId"
                    params={{ productId: product.handle }}
                    className="group grid grid-cols-[0.9fr_1.1fr] overflow-hidden rounded-md border border-border bg-card"
                  >
                    <div className="media-frame aspect-[4/5]">
                      <img
                        src={product.image}
                        alt={product.name}
                        width={600}
                        height={750}
                        loading="lazy"
                        className="size-full object-cover transition-transform duration-brand-slow group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="flex flex-col justify-center p-4 sm:p-5">
                      <p className="eyebrow-wide text-berry">{product.subcategory}</p>
                      <h3 className="mt-2 font-display text-xl leading-snug">{product.name}</h3>
                      <p className="mt-2 text-sm font-semibold">{inr(product.price)}</p>
                    </div>
                  </Link>
                ),
              )}
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Full-width occasion campaign */}
      <section aria-labelledby="occasions-heading" className="bg-charcoal-ink text-white">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[22rem] overflow-hidden lg:min-h-[32rem]">
            <img
              src={occasionEid}
              alt="Warm Eid table set with dates, brass, and festive textiles"
              className="absolute inset-0 size-full object-cover"
              loading="lazy"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-charcoal-ink/30 to-transparent lg:bg-gradient-to-l"
            />
          </div>
          <PageContainer className="flex flex-col justify-center py-14 lg:py-20">
            <p className="eyebrow-wide text-mango">Occasion edit</p>
            <h2 id="occasions-heading" className="mt-3 font-display text-4xl sm:text-5xl">
              Celebrate with colour, not beige silence.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/75">
              Eid tables, Ramadan nights, Friday mornings — shop moments that feel like home.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {occasionStories.map((story) => (
                <Link
                  key={story.id}
                  to="/collection"
                  search={{ occasion: story.id }}
                  className="group overflow-hidden rounded-md border border-white/15 bg-white/5"
                >
                  <div className="relative aspect-[16/10]">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="size-full object-cover transition-transform duration-brand-slow group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-3">
                    <span
                      className={cn(
                        "inline-flex rounded-sm px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider",
                        story.accent,
                      )}
                    >
                      {story.title}
                    </span>
                    <p className="mt-2 text-xs leading-5 text-white/70">{story.copy}</p>
                  </div>
                </Link>
              ))}
            </div>
          </PageContainer>
        </div>
      </section>

      {/* New arrivals as product rail */}
      <section className="bg-warm-ivory" aria-labelledby="new-arrivals">
        <PageContainer className="section-space">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow-wide text-coral">Fresh from the catalogue</p>
              <h2 id="new-arrivals" className="mt-3 font-display text-4xl sm:text-5xl">
                New Arrivals
              </h2>
            </div>
            <Link
              to="/collection"
              className="text-sm font-semibold text-berry underline underline-offset-4"
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
                  colors={product.colors}
                  href={`/products/${product.handle}`}
                />
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* Trending — horizontal rail with jewel tab accents */}
      <section id="shop" className="scroll-mt-24 border-t border-border bg-card/40">
        <PageContainer className="section-space">
          <p className="eyebrow-wide text-teal">Trending now</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">Pieces families are choosing</h2>
          <div
            className="mt-8 flex gap-2 overflow-x-auto pb-1"
            role="tablist"
            aria-label="Shop by pillar"
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
                    "min-h-10 shrink-0 rounded-md border px-4 text-sm font-semibold transition-colors duration-brand-fast ease-brand",
                    active
                      ? "border-berry bg-berry text-berry-foreground"
                      : "border-border bg-background text-muted-foreground hover:border-teal hover:text-teal",
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
          <div className="mt-10 flex snap-x gap-4 overflow-x-auto pb-3">
            {occasionProducts.map((product) => (
              <div
                key={`${occasion}-${product.handle}`}
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
                  rating={product.rating}
                  reviewCount={product.reviews}
                  inStock={product.inStock}
                  colors={product.colors}
                  href={`/products/${product.handle}`}
                />
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* Mango value rail */}
      <section className="border-y border-border bg-mango/15" aria-labelledby="under-999">
        <PageContainer className="section-space">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow-wide text-mango-foreground/80">Everyday value</p>
              <h2 id="under-999" className="mt-3 font-display text-4xl sm:text-5xl">
                Under ₹999 Essentials
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                Accessible pieces for everyday family rhythms — same clear material and fit
                information.
              </p>
            </div>
            <Button className="bg-mango text-mango-foreground hover:bg-mango/90" asChild>
              <Link to="/collection" search={{ category: "all" }}>
                Shop under ₹999 <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="mt-10 flex snap-x gap-4 overflow-x-auto pb-3">
            {under999Products.map((product) => (
              <div
                key={`under-999-${product.handle}`}
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
                  colors={product.colors}
                  href={`/products/${product.handle}`}
                />
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="border-t border-border bg-card/40">
        <PageContainer className="section-space">
          <FamilyEnsemble />
        </PageContainer>
      </section>

      {/* Berry / blush flagship cambric moment */}
      <section className="border-y border-border bg-blush">
        <PageContainer className="section-space">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div className="media-frame aspect-[4/3] lg:aspect-[4/5]">
              <img
                src={cambric.image || "/images/salwar-suit-sage.jpg"}
                alt="Pure cambric cotton three-piece salwar set showing full silhouette"
                width={1200}
                height={1500}
                loading="lazy"
                className="size-full object-cover"
              />
            </div>
            <div>
              <p className="eyebrow-wide font-bold text-berry">The Cambric Cotton Flagship</p>
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
                    <ShieldCheck className="mt-0.5 size-4 shrink-0 text-berry" aria-hidden />
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
                <Button
                  size="lg"
                  className="bg-berry text-berry-foreground hover:bg-berry/90"
                  asChild
                >
                  <Link to="/products/$productId" params={{ productId: cambric.handle }}>
                    View the set <ArrowRight />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-16 border-t border-border/60 pt-16">
            <OpacityTester />
          </div>
        </PageContainer>
      </section>

      {/* Prayer sanctuary — deliberate quieter pace, not a visual wall */}
      <section
        aria-labelledby="prayer-sanctuary"
        className="border-y border-border bg-blush-cream/40"
      >
        <PageContainer className="py-12 sm:py-16 lg:py-20">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12">
            <div>
              <p className="eyebrow-wide font-bold text-emerald">The Prayer Sanctuary</p>
              <h2
                id="prayer-sanctuary"
                className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl"
              >
                A quiet corner, properly kept.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
                Memory foam mats that spare the knees, steam-bent rehals for the Quran, and natural
                botanical attars for Friday mornings.
              </p>
              <Button
                className="mt-6 bg-emerald text-emerald-foreground hover:bg-emerald/90"
                asChild
              >
                <Link to="/collection" search={{ category: "prayer" }}>
                  Explore prayer &amp; worship
                </Link>
              </Button>
            </div>
            <div className="media-frame aspect-[5/4] overflow-hidden lg:aspect-[4/3]">
              <img
                src={productPrayerSet}
                alt="Olive prayer mat with wooden Quran stand"
                width={900}
                height={720}
                loading="lazy"
                className="size-full object-cover"
              />
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:mt-12">
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
                colors={product.colors}
                href={`/products/${product.handle}`}
              />
            ))}
          </div>
        </PageContainer>
      </section>

      <section
        id="assurance"
        className="scroll-mt-24 border-y border-border bg-teal text-teal-foreground"
      >
        <PageContainer className="section-space">
          <p className="eyebrow-wide text-teal-foreground/70">Why families shop with us</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl leading-tight sm:text-5xl">
            Made properly, priced honestly, for the whole family.
          </h2>
          <ul className="mt-12 grid gap-8 sm:grid-cols-2">
            {assurances.map(({ icon: Icon, title, detail }) => (
              <li key={title} className="flex gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-sm bg-teal-foreground/10">
                  <Icon className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{title}</p>
                  <p className="mt-1 text-sm text-teal-foreground/75">{detail}</p>
                </div>
              </li>
            ))}
          </ul>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-xs text-teal-foreground/80">
            {[
              "Free express shipping over ₹999",
              "7-day hassle-free size exchanges",
              "Cash on delivery available",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check className="size-3.5" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </PageContainer>
      </section>

      <section id="journal" className="scroll-mt-24 bg-warm-ivory">
        <PageContainer className="section-space">
          <p className="eyebrow-wide text-muted-foreground">The journal</p>
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
