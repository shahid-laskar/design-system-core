import { createFileRoute, Link } from "@tanstack/react-router";
import {
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
import { Eyebrow, PageContainer } from "@/components/brand/design-primitives";
import heroHome from "@/assets/hero-home.jpg";
import productModestSet from "@/assets/product-modest-set.jpg";
import productMenKurta from "@/assets/product-men-kurta.jpg";
import productPrayerSet from "@/assets/product-prayer-set.jpg";
import productChildSet from "@/assets/product-child-set.jpg";
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
          "Carefully curated salwar suits, handloom kurtas, children's essentials, and prayer mats. Good quality, honest prices, in one convenient store.",
      },
      { property: "og:title", content: "Sukoon House — Thoughtful Living & Clothing" },
      {
        property: "og:description",
        content:
          "Salwar suits, handloom kurtas, children's essentials, and prayer mats — good quality at honest prices for Muslim family life.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const categoryTiles = [
  {
    image: productModestSet,
    imageAlt: "Folded sand hijab and stone-grey modest wear on linen",
    title: "Women's Ethnic & Modest Wear",
    subtitle: "Salwar suits, daily kurtas, modal hijabs",
    category: "women",
  },
  {
    image: productMenKurta,
    imageAlt: "Folded white and beige handloom cotton kurtas with mandarin collars",
    title: "Men's & Boys' Traditional Wear",
    subtitle: "Pure cotton Friday kurtas, pathanis, thobes",
    category: "men",
  },
  {
    image: productPrayerSet,
    imageAlt: "Olive prayer mat with a Quran stand in soft daylight",
    title: "Prayer & Spiritual Sanctuary",
    subtitle: "Memory foam mats, bentwood rehals, stone tasbihs",
    category: "prayer",
  },
  {
    image: productChildSet,
    imageAlt: "Wooden learning toys and soft muslin in warm tones",
    title: "Children's Tarbiyah & Learning",
    subtitle: "Salah habit boards, Islamic storybooks, flashcards",
    category: "learning",
  },
];

const products = [
  {
    image: productModestSet,
    imageAlt: "Sage green cambric cotton salwar suit set, folded on linen",
    category: "Women's Ethnic",
    name: "Pure Cambric Cotton Salwar Suit Set",
    price: "₹1,499",
    previousPrice: "₹1,699",
    savings: "Save 12%",
    note: "Sage Green · 3-Piece Stitched Set (Kurta, Pants, Dupatta) · Breathable Cambric Cotton",
    badge: "Bestseller",
    href: "/products/cotton-salwar-suit",
  },
  {
    image: productMenKurta,
    imageAlt: "Soft white handloom cotton kurta with mandarin collar, folded",
    category: "Men's Apparel",
    name: "Classic Friday Handloom Cotton Kurta",
    price: "₹899",
    previousPrice: "₹999",
    savings: "Save 10%",
    note: "Soft White · 100% Long-Staple Cotton · Mandarin Collar",
    badge: "Essential",
    href: "/products/men-cotton-kurta",
  },
  {
    image: productPrayerSet,
    imageAlt: "Olive velvet prayer mat with cushioned surface in daylight",
    category: "Prayer & Worship",
    name: "Ergonomic Memory Foam Prayer Mat",
    price: "₹1,299",
    previousPrice: "₹1,499",
    savings: "Save 13%",
    note: "Olive Velvet · 20mm Orthopedic Foam · Anti-Slip Base",
    badge: "Knee Relief",
    href: "/products/memory-foam-mat",
  },
  {
    image: productChildSet,
    imageAlt: "Children's magnetic salah habit board with wooden tokens",
    category: "Children's Learning",
    name: "My Daily Salah Magnetic Habit Board",
    price: "₹899",
    previousPrice: "₹999",
    savings: "Save 10%",
    note: "A3 Magnetic Board · 35 Wooden Tokens · Dry-Erase Pen",
    badge: "Parent Favorite",
    href: "/products/salah-habit-board",
  },
];

const assurances = [
  {
    icon: Shirt,
    title: "Honest Everyday Fabrics",
    detail:
      "100% breathable cottons, micro-modals, and natural linen. Tested for color fastness and daily durability.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Modest Cuts",
    detail:
      "Generous lengths, full sleeves, high necklines, and fully opaque linings with no see-through fabrics.",
  },
  {
    icon: RefreshCcw,
    title: "7-Day Size Exchanges",
    detail: "If the fit isn't perfect, we arrange an easy reverse pickup at your doorstep.",
  },
  {
    icon: IndianRupee,
    title: "Direct Family Value",
    detail:
      "Direct manufacturer sourcing allows us to deliver high quality without premium mall markups.",
  },
];

const heroAssurances = [
  "Free Shipping over ₹999",
  "7-Day Hassle-Free Size Exchanges",
  "Cash on Delivery Available",
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

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-secondary/50">
        <PageContainer className="grid items-center gap-10 py-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-24">
          <div>
            <p className="eyebrow-wide text-muted-foreground">
              Curated for everyday Muslim living
            </p>
            <h1 className="mt-5 font-display text-5xl leading-[1.04] sm:text-6xl lg:text-7xl">
              Thoughtful Living &amp; Clothing for the Muslim Family
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">
              Carefully curated salwar suits, handloom kurtas, children's essentials, ergonomic
              prayer mats, and home accents. Good quality, honest prices, in one convenient store.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button size="lg" asChild>
                <Link to="/collection" search={{ category: "women" }}>
                  Shop Women's Ethnic <ArrowRight />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/collection">Browse Family Essentials</Link>
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

      {/* Category quick-nav */}
      <section aria-label="Shop by category">
        <PageContainer className="pt-12 lg:pt-16">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {categoryTiles.map((tile) => (
              <Link
                key={tile.title}
                to="/collection"
                search={{ category: tile.category }}
                className="group min-w-0"
              >
                <div className="media-frame relative aspect-[4/5]">
                  <img
                    src={tile.image}
                    alt={tile.imageAlt}
                    width={1024}
                    height={1280}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-brand-slow ease-brand group-hover:scale-[1.025]"
                  />
                </div>
                <h2 className="mt-4 font-display text-lg leading-snug transition-colors group-hover:text-primary sm:text-xl">
                  {tile.title}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">{tile.subtitle}</p>
              </Link>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* Featured family bestsellers */}
      <section id="shop" className="scroll-mt-24">
        <PageContainer className="section-space">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow-wide text-muted-foreground">01 · The collection</p>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl">
                What families reach for first.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
                A balanced edit across the home — for her, for him, for prayer, and for little
                ones. Honest everyday prices, nothing over ₹1,499.
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/collection">View all goods</Link>
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.name} {...product} />
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
          <p className="eyebrow-wide text-primary-foreground/60">02 · Why shop with us</p>
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

      {/* Occasion banner */}
      <section className="border-b border-border bg-secondary/50">
        <PageContainer className="py-14 text-center lg:py-16">
          <h2 className="mx-auto max-w-2xl font-display text-3xl leading-tight sm:text-4xl">
            Preparing for Jummah, Eid, or a Family Gathering?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
            Explore our curated family wardrobe sets and home fragrance collections.
          </p>
          <div className="mt-8">
            <Button size="lg" asChild>
              <Link to="/collection" search={{ occasion: "festive" }}>
                Explore Occasion Collections <ArrowRight />
              </Link>
            </Button>
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
