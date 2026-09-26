import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Check,
  CircleAlert,
  Heart,
  Inbox,
  LoaderCircle,
  Mail,
  RotateCcw,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import prayerSet from "@/assets/product-prayer-set.jpg";
import childSet from "@/assets/product-child-set.jpg";
import modestSet from "@/assets/product-modest-set.jpg";
import menKurta from "@/assets/product-men-kurta.jpg";
import familyRhythm from "@/assets/editorial-family-rhythm.jpg";
import homeCalm from "@/assets/editorial-home-calm.jpg";
import { EditorialCard } from "@/components/brand/editorial-card";
import { ProductCard } from "@/components/brand/product-card";
import { StatusState } from "@/components/brand/status-state";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { PageContainer, SectionHeading } from "@/components/brand/design-primitives";

export const Route = createFileRoute("/design-system")({
  head: () => ({
    meta: [
      { title: "Design System — Sukoon House" },
      {
        name: "description",
        content:
          "The visual language and reusable commerce patterns for Sukoon House, a modern Muslim family lifestyle brand.",
      },
      { property: "og:title", content: "Sukoon House Design System" },
      {
        property: "og:description",
        content: "A calm, contemporary design foundation for modern Muslim family life.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DesignSystemPage,
});

function DesignSystemPage() {
  const [notice, setNotice] = useState(true);
  return (
    <div>
      <section className="border-b border-border bg-blush-cream">
        <PageContainer className="py-16 sm:py-24 lg:py-28">
          <div className="grid items-end gap-12 lg:grid-cols-[1.3fr_0.7fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-pillar-women-accent">
                Foundation / 01
              </p>
              <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[0.94] sm:text-7xl lg:text-8xl">
                Warm Indian Jewel.
              </h1>
            </div>
            <div className="border-l border-border pl-6">
              <p className="text-base leading-7 text-muted-foreground">
                Indian colour, Muslim warmth, modern commerce. Seven considered pillars balancing
                craft and dignity.
              </p>
              <p className="eyebrow mt-6">Sukoon House · Colour Palette v2.0</p>
            </div>
          </div>
        </PageContainer>
      </section>

      <PageContainer className="space-y-24 py-20 lg:space-y-32 lg:py-28">
        <section id="foundations" className="scroll-mt-28">
          <SectionHeading
            index="01"
            eyebrow="Foundations"
            title="The Reference Colour System."
            copy="Warm Ivory grounds the canvas (70%). Deep Emerald powers primary brand actions (15%), Peacock Teal accents secondary elements (10%), with Mango, Berry, Coral, and Blush Cream articulating the category pillars."
          />
          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden border border-border bg-border sm:grid-cols-4 lg:grid-cols-8">
            {[
              ["Warm Ivory", "bg-warm-ivory", "#FFF8EE", "Main Canvas 70%"],
              ["Deep Emerald", "bg-emerald", "#176B4D", "Primary CTAs 15%"],
              ["Peacock Teal", "bg-teal", "#087E8B", "Secondary 10%"],
              ["Mango", "bg-mango", "#F4A62A", "Energy Banners 5%"],
              ["Berry", "bg-berry", "#C83E67", "Women's Accents"],
              ["Coral", "bg-coral", "#E96B52", "Warm CTAs / Offers"],
              ["Blush Cream", "bg-blush-cream", "#FCEDEA", "Soft Backgrounds"],
              ["Charcoal Ink", "bg-charcoal-ink", "#252321", "Text & Headings"],
            ].map(([name, color, hex, role]) => (
              <div key={name} className="bg-card">
                <div className={`aspect-square border-b border-border/50 ${color}`} />
                <div className="p-3">
                  <p className="text-xs font-semibold leading-tight">{name}</p>
                  <p className="mt-0.5 text-[0.6875rem] font-mono text-muted-foreground">{hex}</p>
                  <p className="mt-1 text-[0.65rem] text-muted-foreground line-clamp-1">{role}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <h3 className="eyebrow text-foreground mb-4">Category Colour Mapping</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {[
                {
                  pillar: "Women",
                  accent: "Berry (#C83E67)",
                  secondary: "Coral (#E96B52)",
                  bg: "Soft Berry / Blush (#FCEDEA)",
                  bgClass: "bg-pillar-women-bg",
                  accentClass: "text-pillar-women-accent",
                  badgeClass: "bg-pillar-women-accent",
                  role: "Eyebrows, Save badges, CTAs",
                },
                {
                  pillar: "Men",
                  accent: "Peacock Teal (#087E8B)",
                  secondary: "Indigo (#1E3A5F)",
                  bg: "Soft Teal (#E6F4F5)",
                  bgClass: "bg-pillar-men-bg",
                  accentClass: "text-pillar-men-accent",
                  badgeClass: "bg-pillar-men-accent",
                  role: "Eyebrows, men's headers, tags",
                },
                {
                  pillar: "Kids",
                  accent: "Mango (#F4A62A)",
                  secondary: "Turquoise (#2EC4B6)",
                  bg: "Soft Mango (#FEF7EA)",
                  bgClass: "bg-pillar-kids-bg",
                  accentClass: "text-pillar-kids-accent",
                  badgeClass: "bg-pillar-kids-accent",
                  role: "Eyebrows, stars, kids' CTAs",
                },
                {
                  pillar: "Prayer & Home",
                  accent: "Deep Emerald (#176B4D)",
                  secondary: "Sage (#4A7C59)",
                  bg: "Soft Emerald (#E8F4EE)",
                  bgClass: "bg-pillar-prayer-bg",
                  accentClass: "text-pillar-prayer-accent",
                  badgeClass: "bg-pillar-prayer-accent",
                  role: "Primary brand buttons, headers",
                },
                {
                  pillar: "Gifts",
                  accent: "Coral (#E96B52)",
                  secondary: "Marigold (#F4A62A)",
                  bg: "Soft Coral / Marigold (#FFF2EB)",
                  bgClass: "bg-pillar-gifts-bg",
                  accentClass: "text-pillar-gifts-accent",
                  badgeClass: "bg-pillar-gifts-accent",
                  role: "Occasion tags, gift hampers, promo",
                },
              ].map((item) => (
                <div
                  key={item.pillar}
                  className={`rounded-lg border border-border p-4 ${item.bgClass}`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider ${item.accentClass}`}
                    >
                      {item.pillar}
                    </span>
                    <span className={`size-3 rounded-full ${item.badgeClass}`} />
                  </div>
                  <p className="mt-3 text-xs font-semibold">{item.accent}</p>
                  <p className="mt-1 text-[0.7rem] text-muted-foreground">{item.secondary}</p>
                  <p className="mt-2 text-[0.68rem] text-muted-foreground border-t border-border/40 pt-2">
                    {item.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-16 grid gap-12 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-muted-foreground">Display · Newsreader</p>
              <p className="mt-5 font-display text-5xl leading-[0.95] sm:text-6xl">
                A gentler way to gather.
              </p>
              <p className="mt-5 max-w-lg font-display text-2xl italic text-muted-foreground">
                Thoughtful objects. Meaningful routines. A home shaped with intention.
              </p>
            </div>
            <div>
              <p className="eyebrow text-muted-foreground">Interface · Manrope</p>
              <p className="mt-5 text-lg leading-8">
                Readable, direct, and human. Product information stays clear while editorial moments
                are given room to breathe.
              </p>
              <div className="mt-8 grid grid-cols-4 items-end gap-4">
                {["4", "8", "16", "32"].map((space) => (
                  <div key={space}>
                    <div className="bg-clay" style={{ height: `${Number(space) * 2}px` }} />
                    <p className="mt-2 text-xs text-muted-foreground">{space}px</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-16 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Spacing", "4 · 8 · 16 · 32 · 48 · 64 · 96"],
              ["Radii", "2px · 4px · 6px · 10px · 14px"],
              ["Borders", "1px hairline · semantic border and input roles"],
              ["Shadows", "Soft 16/45 · Lifted 24/70"],
            ].map(([name, value]) => (
              <div key={name} className="bg-card p-5">
                <p className="eyebrow text-muted-foreground">{name}</p>
                <p className="mt-3 text-sm leading-6">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-4 border-y border-border py-5 text-sm sm:grid-cols-2 lg:grid-cols-4">
            <p>
              <span className="font-semibold">Base</span>
              <br />
              <span className="text-muted-foreground">0–639px</span>
            </p>
            <p>
              <span className="font-semibold">Small · 640px</span>
              <br />
              <span className="text-muted-foreground">Two-column content</span>
            </p>
            <p>
              <span className="font-semibold">Medium · 768px</span>
              <br />
              <span className="text-muted-foreground">Structured forms and footer</span>
            </p>
            <p>
              <span className="font-semibold">Large · 1024px</span>
              <br />
              <span className="text-muted-foreground">Full navigation and page grid</span>
            </p>
          </div>
        </section>

        <section>
          <SectionHeading
            index="02"
            eyebrow="Surfaces"
            title="One hierarchy, consistently applied."
            copy="Cards, media, and navigation use the same hairline borders, restrained radii, semantic surfaces, and clear typographic hierarchy."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <div className="rounded-sm border border-border bg-card p-6 shadow-soft">
              <p className="eyebrow text-muted-foreground">Card · soft</p>
              <h3 className="mt-3 font-display text-2xl">Quiet containment</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Use for individual items and focused states, never as a wrapper around an entire
                section.
              </p>
            </div>
            <div className="rounded-sm border border-border bg-card p-6">
              <p className="eyebrow text-muted-foreground">Input · default</p>
              <div className="mt-4 space-y-2">
                <Label htmlFor="surface-example">Email address</Label>
                <Input id="surface-example" placeholder="amina@example.com" />
              </div>
            </div>
            <div className="rounded-sm border border-border bg-primary p-6 text-primary-foreground">
              <p className="eyebrow text-primary-foreground/60">Navigation</p>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                <a className="nav-link hover:text-primary-foreground/70" href="#foundations">
                  Foundations
                </a>
                <a className="nav-link hover:text-primary-foreground/70" href="#products">
                  Commerce
                </a>
                <a className="nav-link hover:text-primary-foreground/70" href="#states">
                  States
                </a>
              </div>
            </div>
          </div>
        </section>

        <section>
          <SectionHeading
            index="03"
            eyebrow="Controls"
            title="Clear actions, quiet confidence."
            copy="Controls use familiar shapes, strong contrast, and generous touch areas. States are visible without calling unnecessary attention to themselves."
          />
          <div className="mt-12 grid gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="flex flex-wrap gap-3">
                <Button>Primary action</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Quiet action</Button>
                <Button variant="link">Text link</Button>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button disabled>Unavailable</Button>
                <Button>
                  <LoaderCircle className="animate-spin" /> Loading
                </Button>
                <Button variant="destructive">Remove item</Button>
                <Button size="icon" variant="outline" aria-label="Save item">
                  <Heart />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge>New</Badge>
                <Badge variant="secondary">Limited</Badge>
                <Badge variant="clay">Family edit</Badge>
                <Badge variant="mineral">Journal</Badge>
                <Badge variant="outline">Organic</Badge>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" placeholder="Amina Rahman" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input id="email" type="email" placeholder="amina@example.com" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="message">Your note</Label>
                <Textarea id="message" placeholder="How can we help?" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="invalid">Order reference</Label>
                <Input id="invalid" aria-invalid="true" defaultValue="SH-102" />
                <p className="text-xs text-destructive">
                  Please enter the complete eight-character reference.
                </p>
              </div>
            </div>
          </div>
          <div className="my-14 flex items-center gap-4">
            <Separator className="flex-1" />
            <Sparkles className="size-4 text-clay" />
            <Separator className="flex-1" />
          </div>
          {notice ? (
            <Alert>
              <Mail className="size-4" />
              <AlertTitle>A quiet note</AlertTitle>
              <AlertDescription className="flex flex-wrap items-center justify-between gap-3">
                <p>Your saved basket will be held on this device for the next 30 days.</p>
                <Button variant="ghost" size="sm" onClick={() => setNotice(false)}>
                  Dismiss
                </Button>
              </AlertDescription>
            </Alert>
          ) : (
            <Button variant="link" onClick={() => setNotice(true)}>
              Show notice again
            </Button>
          )}
        </section>

        <section id="products" className="scroll-mt-28">
          <SectionHeading
            index="04"
            eyebrow="Commerce"
            title="The product remains the focus."
            copy="Names, price, availability, variants, and the path to purchase remain visible. Photography carries the emotion; interface copy carries the confidence."
          />
          <div className="mt-12 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            <ProductCard
              pillar="women"
              image={modestSet}
              imageAlt="Pure Cambric Cotton Salwar Suit Set"
              category="Women's Ethnic"
              name="Pure Cambric Cotton Salwar Suit Set"
              price="₹1,499"
              previousPrice="₹1,699"
              savings="₹200"
              note="Sage Green · 3-Piece Stitched Set"
              badge="Bestseller"
            />
            <ProductCard
              pillar="men"
              image={menKurta}
              imageAlt="Classic Friday Handloom Cotton Kurta"
              category="Men's Apparel"
              name="Classic Friday Handloom Kurta"
              price="₹899"
              previousPrice="₹999"
              savings="₹100"
              note="Soft White · 100% Long-Staple Cotton"
              badge="Essential"
            />
            <ProductCard
              pillar="kids"
              image={childSet}
              imageAlt="Children's magnetic salah habit board with wooden tokens"
              category="Children & Tarbiyah"
              name="My Daily Salah Habit Board"
              price="₹899"
              note="A3 Magnetic Board · 35 Wooden Tokens"
              badge="Loved"
            />
            <ProductCard
              pillar="prayer"
              image={prayerSet}
              imageAlt="Ergonomic Memory Foam Prayer Mat"
              category="Prayer & Worship"
              name="Ergonomic Memory Foam Prayer Mat"
              price="₹1,299"
              previousPrice="₹1,599"
              savings="₹300"
              note="Olive Velvet · 20mm Orthopedic Foam"
              badge="New"
            />
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-y border-border py-5 text-sm">
            <p>
              <span className="font-semibold">Delivery:</span> 3–5 working days
            </p>
            <p>
              <span className="font-semibold">Returns:</span> 30 days, simply arranged
            </p>
            <p>
              <span className="font-semibold">Materials:</span> Clearly sourced and explained
            </p>
          </div>
        </section>

        <section id="editorial" className="scroll-mt-28">
          <SectionHeading
            index="05"
            eyebrow="Editorial"
            title="Ideas with a place in real life."
            copy="Stories are practical, culturally aware, and written with warmth. They sit beside products without becoming product advertising."
          />
          <div className="mt-12 grid gap-14 lg:grid-cols-2">
            <EditorialCard
              image={familyRhythm}
              imageAlt="Family preparing breakfast together in a warm kitchen"
              topic="Family rhythm"
              title="The small rituals that steady a busy week"
              summary="Simple ways to make shared mornings feel less rushed and more connected—without building an impossible routine."
              readTime="6 min"
            />
            <EditorialCard
              image={homeCalm}
              imageAlt="Sunlit reading corner with oak shelving and natural textiles"
              topic="At home"
              title="Making room for stillness"
              summary="A practical edit of the spaces and objects that help a home feel grounded, useful, and quietly restorative."
              readTime="4 min"
            />
          </div>
        </section>

        <section>
          <SectionHeading
            index="06"
            eyebrow="Drawers"
            title="Focused layers, never detours."
            copy="Menus, basket details, and supporting decisions appear in calm sheets that preserve context and are easy to dismiss."
          />
          <div className="mt-12 flex flex-wrap gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button>
                  <ShoppingBag /> Open bag drawer
                </Button>
              </SheetTrigger>
              <SheetContent className="flex flex-col">
                <SheetHeader>
                  <SheetTitle className="font-display text-3xl">Your bag · 2</SheetTitle>
                  <SheetDescription>Thoughtful things, ready when you are.</SheetDescription>
                </SheetHeader>
                <div className="my-6 flex-1 space-y-5">
                  <div className="flex gap-4">
                    <img
                      src={prayerSet}
                      alt="Olive prayer set"
                      width={1200}
                      height={1504}
                      loading="lazy"
                      className="h-28 w-22 rounded-sm object-cover"
                    />
                    <div>
                      <p className="font-display text-lg">The Stillness Set</p>
                      <p className="mt-1 text-sm text-muted-foreground">Olive · Qty 1</p>
                      <p className="mt-3 text-sm font-semibold">₹3,499</p>
                    </div>
                  </div>
                  <Separator />
                  <p className="text-sm text-muted-foreground">
                    Complimentary delivery has been applied.
                  </p>
                </div>
                <div className="border-t border-border pt-5">
                  <div className="flex justify-between font-semibold">
                    <span>Subtotal</span>
                    <span>₹5,499</span>
                  </div>
                  <Button className="mt-5 w-full" size="lg">
                    Continue to checkout
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
            <Button variant="outline">
              <MenuIcon /> Mobile menu
            </Button>
          </div>
        </section>

        <section id="states" className="scroll-mt-28">
          <SectionHeading
            index="07"
            eyebrow="System states"
            title="Every moment considered."
            copy="Loading, absence, errors, and completion use the same measured voice as the rest of the experience."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="min-h-80 border border-border bg-card p-5">
              <div className="aspect-[4/3]">
                <Skeleton className="size-full" />
              </div>
              <Skeleton className="mt-6 h-3 w-20" />
              <Skeleton className="mt-3 h-6 w-4/5" />
              <Skeleton className="mt-3 h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-2/3" />
              <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
                <LoaderCircle className="size-3 animate-spin" /> Gathering your edit
              </div>
            </div>
            <StatusState
              icon={Inbox}
              eyebrow="Nothing here yet"
              title="Your bag is waiting"
              description="Browse the collection and save the pieces that suit your family."
              action="Explore collection"
            />
            <StatusState
              icon={CircleAlert}
              eyebrow="Something shifted"
              title="We couldn't load this"
              description="Your details are safe. Try again and we’ll pick up where you left off."
              action="Try again"
              tone="error"
            />
            <StatusState
              icon={Check}
              eyebrow="All done"
              title="You're on the list"
              description="A thoughtful note will arrive when there is something worth sharing."
              action="Continue browsing"
              tone="success"
            />
          </div>
        </section>

        <section>
          <SectionHeading
            index="08"
            eyebrow="Motion"
            title="Movement stays quiet and useful."
            copy="Interactive color and control changes use 200ms. Product and editorial imagery use 500ms. Drawers use 200ms when closing and 300ms when opening. Reduced-motion preferences collapse all movement to a near-instant state change."
          />
        </section>
      </PageContainer>
    </div>
  );
}

function MenuIcon() {
  return <RotateCcw className="size-4" />;
}
