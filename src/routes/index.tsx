import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Leaf, Package, RotateCcw, Sparkles } from "lucide-react";
import { EditorialCard } from "@/components/brand/editorial-card";
import { ProductCard } from "@/components/brand/product-card";
import { Button } from "@/components/ui/button";
import { Eyebrow, PageContainer } from "@/components/brand/design-primitives";
import heroHome from "@/assets/hero-home.jpg";
import productPrayerSet from "@/assets/product-prayer-set.jpg";
import productChildSet from "@/assets/product-child-set.jpg";
import productModestSet from "@/assets/product-modest-set.jpg";
import productBundle from "@/assets/product-bundle.jpg";
import editorialHomeCalm from "@/assets/editorial-home-calm.jpg";
import editorialFamilyRhythm from "@/assets/editorial-family-rhythm.jpg";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Sukoon House — Thoughtful Goods for Modern Muslim Family Life" },
      {
        name: "description",
        content:
          "Considered home, prayer, and family essentials for modern Muslim households. Calm design, honest materials, quietly premium.",
      },
      { property: "og:title", content: "Sukoon House" },
      {
        property: "og:description",
        content:
          "Made for the rhythm of Muslim family life — thoughtful goods and ideas for calm, intentional homes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const products = [
  {
    image: productPrayerSet,
    imageAlt: "The Stillness Set — olive prayer mat with a small Quran stand in soft daylight",
    category: "Home & prayer",
    name: "The Stillness Set",
    price: "₹3,499",
    note: "Olive · Linen blend · 2 pieces",
    badge: "New",
  },
  {
    image: productModestSet,
    imageAlt: "The Everyday Pair — folded sand hijab and stone-grey abaya on linen",
    category: "Modest essentials",
    name: "The Everyday Pair",
    price: "₹2,799",
    note: "Sand & stone · Soft-touch cotton",
  },
  {
    image: productChildSet,
    imageAlt: "First Forms Set — wooden stacking rings and soft muslin in warm tones",
    category: "Little ones",
    name: "First Forms Set",
    price: "₹1,999",
    previousPrice: "₹2,299",
    note: "Clay mix · FSC beech · Ages 1+",
    badge: "Family edit",
  },
  {
    image: productBundle,
    imageAlt: "The Considered Gift — rolled olive prayer mat, linen-bound prayer book, and attar",
    category: "Curated bundles",
    name: "The Considered Gift",
    price: "₹3,899",
    note: "Three pieces · Ready to give",
    badge: "Bundle",
  },
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
      "Practical ideas for weaving prayer, meals, and play into a rhythm children can grow inside.",
    readTime: "6 min read",
  },
];

const assurances = [
  { icon: Package, title: "Delivery", detail: "2–4 working days, carefully packed" },
  { icon: RotateCcw, title: "Returns", detail: "30 days, simply arranged" },
  { icon: Leaf, title: "Materials", detail: "Clearly sourced and explained" },
  { icon: Sparkles, title: "Considered", detail: "Small batches, no noise" },
];

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-secondary/50">
        <PageContainer className="grid items-center gap-10 py-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-24">
          <div>
            <p className="eyebrow-wide text-muted-foreground">
              Sukoon House · The first collection
            </p>
            <h1 className="mt-5 font-display text-5xl leading-[1.04] sm:text-6xl lg:text-7xl">
              Made for the rhythm of Muslim family life.
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">
              Thoughtfully designed goods for the home, for prayer, and for little ones — calm
              enough for reflection, clear enough for everyday decisions.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button size="lg" asChild>
                <a href="#shop">
                  Shop the collection <ArrowRight />
                </a>
              </Button>
              <Button variant="link" size="lg" asChild>
                <a href="#journal">Read the journal</a>
              </Button>
            </div>
            <p className="mt-8 text-xs text-muted-foreground">
              Complimentary delivery on considered bundles over ₹2,999
            </p>
          </div>
          <div className="relative">
            <div className="media-frame aspect-[4/3]">
              <img
                src={heroHome}
                alt="A calm living space with a folded olive prayer mat and an open Quran on a wooden stand"
                width={1600}
                height={1200}
                className="size-full object-cover"
              />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              The Stillness Set, photographed in a family home at first light.
            </p>
          </div>
        </PageContainer>
      </section>

      {/* Featured products */}
      <section id="shop" className="scroll-mt-24">
        <PageContainer className="section-space">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow-wide text-muted-foreground">01 · The collection</p>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl">
                The product remains the focus.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
                A small, considered range. Each piece is chosen for how it lives in a home — not how
                it fills a catalogue.
              </p>
            </div>
            <Button variant="outline" asChild>
              <a href="#shop">View all goods</a>
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.name} {...product} />
            ))}
          </div>
        </PageContainer>
      </section>

      {/* Approach band */}
      <section
        id="modest"
        className="scroll-mt-24 border-y border-border bg-primary text-primary-foreground"
      >
        <PageContainer className="section-space grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <p className="eyebrow-wide text-primary-foreground/60">02 · Our approach</p>
            <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
              Identity through restraint, not decoration.
            </h2>
          </div>
          <div className="space-y-8">
            <p className="max-w-xl text-sm leading-7 text-primary-foreground/80">
              We express Islamic identity through composition, material, and care — honest fibres,
              quiet colours, and language that respects your intelligence. No urgency banners, no
              noise, nothing that would feel out of place in a peaceful home.
            </p>
            <ul className="grid gap-6 sm:grid-cols-2">
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
          </div>
        </PageContainer>
      </section>

      {/* Journal */}
      <section id="journal" className="scroll-mt-24">
        <PageContainer className="section-space">
          <p className="eyebrow-wide text-muted-foreground">03 · The journal</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">
            Ideas with a place in real life.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
            Notes on home, family rhythm, and intentional living — written slowly, published
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
