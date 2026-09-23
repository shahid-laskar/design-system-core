import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, CircleAlert, Heart, Inbox, LoaderCircle, Mail, RotateCcw, ShoppingBag, Sparkles } from "lucide-react";
import prayerSet from "@/assets/product-prayer-set.jpg";
import childSet from "@/assets/product-child-set.jpg";
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
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/design-system")({
  head: () => ({ meta: [
    { title: "Design System — Sukoon House" },
    { name: "description", content: "The visual language and reusable commerce patterns for Sukoon House, a modern Muslim family lifestyle brand." },
    { property: "og:title", content: "Sukoon House Design System" },
    { property: "og:description", content: "A calm, contemporary design foundation for modern Muslim family life." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: DesignSystemPage,
});

function SectionHeading({ index, eyebrow, title, copy }: { index: string; eyebrow: string; title: string; copy: string }) {
  return <div className="grid gap-4 border-t border-border pt-6 md:grid-cols-[1fr_2fr] md:gap-12"><div className="flex gap-3 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground"><span>{index}</span><span>{eyebrow}</span></div><div><h2 className="font-display text-4xl leading-none sm:text-5xl">{title}</h2><p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">{copy}</p></div></div>;
}

function DesignSystemPage() {
  const [notice, setNotice] = useState(true);
  return (
    <div>
      <section className="bg-secondary/45">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="grid items-end gap-12 lg:grid-cols-[1.3fr_0.7fr]">
            <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Foundation / 01</p><h1 className="mt-5 max-w-4xl font-display text-5xl leading-[0.94] sm:text-7xl lg:text-8xl">Made for the rhythm of Muslim family life.</h1></div>
            <div className="border-l border-border pl-6"><p className="text-base leading-7 text-muted-foreground">A warm, editorial system balancing commerce with care. Quiet enough for reflection, clear enough for everyday decisions.</p><p className="mt-6 text-xs font-bold uppercase tracking-[0.14em]">Sukoon House · System v1.0</p></div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-24 px-4 py-20 sm:px-6 lg:space-y-32 lg:px-8 lg:py-28">
        <section id="foundations" className="scroll-mt-28">
          <SectionHeading index="01" eyebrow="Foundations" title="Material, not ornamental." copy="Chalk and ink form the quiet base. Olive grounds the experience; clay brings warmth and mineral blue adds a measured point of contrast." />
          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden border border-border bg-border sm:grid-cols-3 lg:grid-cols-6">
            {[
              ["Chalk", "bg-background", "Ground"], ["Ink", "bg-foreground", "Type"], ["Olive", "bg-primary", "Action"], ["Clay", "bg-clay", "Warmth"], ["Mineral", "bg-mineral", "Accent"], ["Linen", "bg-secondary", "Surface"],
            ].map(([name, color, role]) => <div key={name} className="bg-card"><div className={`aspect-square ${color}`} /><div className="p-4"><p className="text-sm font-semibold">{name}</p><p className="mt-1 text-xs text-muted-foreground">{role}</p></div></div>)}
          </div>
          <div className="mt-16 grid gap-12 lg:grid-cols-2">
            <div><p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">Display · Newsreader</p><p className="mt-5 font-display text-5xl leading-[0.95] sm:text-6xl">A gentler way to gather.</p><p className="mt-5 max-w-lg font-display text-2xl italic text-muted-foreground">Thoughtful objects. Meaningful routines. A home shaped with intention.</p></div>
            <div><p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">Interface · Manrope</p><p className="mt-5 text-lg leading-8">Readable, direct, and human. Product information stays clear while editorial moments are given room to breathe.</p><div className="mt-8 grid grid-cols-4 items-end gap-4">{["4", "8", "16", "32"].map((space) => <div key={space}><div className="bg-clay" style={{ height: `${Number(space) * 2}px` }} /><p className="mt-2 text-xs text-muted-foreground">{space}px</p></div>)}</div></div>
          </div>
        </section>

        <section>
          <SectionHeading index="02" eyebrow="Controls" title="Clear actions, quiet confidence." copy="Controls use familiar shapes, strong contrast, and generous touch areas. States are visible without calling unnecessary attention to themselves." />
          <div className="mt-12 grid gap-12 lg:grid-cols-2">
            <div className="space-y-8"><div className="flex flex-wrap gap-3"><Button>Primary action</Button><Button variant="secondary">Secondary</Button><Button variant="outline">Outline</Button><Button variant="ghost">Quiet action</Button><Button variant="link">Text link</Button></div><div className="flex flex-wrap gap-3"><Button disabled>Unavailable</Button><Button><LoaderCircle className="animate-spin" /> Loading</Button><Button variant="destructive">Remove item</Button><Button size="icon" variant="outline" aria-label="Save item"><Heart /></Button></div><div className="flex flex-wrap gap-2"><Badge>New</Badge><Badge variant="secondary">Limited</Badge><Badge variant="clay">Family edit</Badge><Badge variant="mineral">Journal</Badge><Badge variant="outline">Organic</Badge></div></div>
            <div className="grid gap-5 sm:grid-cols-2"><div className="space-y-2"><Label htmlFor="name">Full name</Label><Input id="name" placeholder="Amina Rahman" /></div><div className="space-y-2"><Label htmlFor="email">Email address</Label><Input id="email" type="email" placeholder="amina@example.com" /></div><div className="space-y-2 sm:col-span-2"><Label htmlFor="message">Your note</Label><Textarea id="message" placeholder="How can we help?" /></div><div className="space-y-2 sm:col-span-2"><Label htmlFor="invalid">Order reference</Label><Input id="invalid" aria-invalid="true" defaultValue="SH-102" /><p className="text-xs text-destructive">Please enter the complete eight-character reference.</p></div></div>
          </div>
          <div className="my-14 flex items-center gap-4"><Separator className="flex-1" /><Sparkles className="size-4 text-clay" /><Separator className="flex-1" /></div>
          {notice ? <Alert><Mail className="size-4" /><AlertTitle>A quiet note</AlertTitle><AlertDescription className="flex flex-wrap items-center justify-between gap-3"><p>Your saved basket will be held on this device for the next 30 days.</p><Button variant="ghost" size="sm" onClick={() => setNotice(false)}>Dismiss</Button></AlertDescription></Alert> : <Button variant="link" onClick={() => setNotice(true)}>Show notice again</Button>}
        </section>

        <section id="products" className="scroll-mt-28">
          <SectionHeading index="03" eyebrow="Commerce" title="The product remains the focus." copy="Names, price, availability, variants, and the path to purchase remain visible. Photography carries the emotion; interface copy carries the confidence." />
          <div className="mt-12 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            <ProductCard image={prayerSet} imageAlt="Folded olive prayer mat and wooden book stand in a sunlit room" category="Home & prayer" name="The Stillness Set" price="£68" note="Olive · Linen blend · 2 pieces" badge="New" />
            <ProductCard image={childSet} imageAlt="Muted wooden stacking toy and cotton blanket on a shelf" category="Little ones" name="First Forms Set" price="£42" previousPrice="£48" note="Clay mix · FSC beech · Ages 1+" badge="Bundle" />
            <ProductCard image={prayerSet} imageAlt="Olive textile and oak stand in a warm interior" category="Home" name="Everyday Prayer Mat" price="£46" note="Olive · Also in chalk and clay" />
            <ProductCard image={childSet} imageAlt="Wooden toy with neutral muslin blanket" category="Little ones" name="Muslin & Timber Pair" price="£36" note="Mineral mix · GOTS cotton" />
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-y border-border py-5 text-sm"><p><span className="font-semibold">Delivery:</span> 2–4 working days</p><p><span className="font-semibold">Returns:</span> 30 days, simply arranged</p><p><span className="font-semibold">Materials:</span> Clearly sourced and explained</p></div>
        </section>

        <section id="editorial" className="scroll-mt-28">
          <SectionHeading index="04" eyebrow="Editorial" title="Ideas with a place in real life." copy="Stories are practical, culturally aware, and written with warmth. They sit beside products without becoming product advertising." />
          <div className="mt-12 grid gap-14 lg:grid-cols-2"><EditorialCard image={familyRhythm} imageAlt="Family preparing breakfast together in a warm kitchen" topic="Family rhythm" title="The small rituals that steady a busy week" summary="Simple ways to make shared mornings feel less rushed and more connected—without building an impossible routine." readTime="6 min" /><EditorialCard image={homeCalm} imageAlt="Sunlit reading corner with oak shelving and natural textiles" topic="At home" title="Making room for stillness" summary="A practical edit of the spaces and objects that help a home feel grounded, useful, and quietly restorative." readTime="4 min" /></div>
        </section>

        <section>
          <SectionHeading index="05" eyebrow="Drawers" title="Focused layers, never detours." copy="Menus, basket details, and supporting decisions appear in calm sheets that preserve context and are easy to dismiss." />
          <div className="mt-12 flex flex-wrap gap-3"><Sheet><SheetTrigger asChild><Button><ShoppingBag /> Open bag drawer</Button></SheetTrigger><SheetContent className="flex flex-col"><SheetHeader><SheetTitle className="font-display text-3xl">Your bag · 2</SheetTitle><SheetDescription>Thoughtful things, ready when you are.</SheetDescription></SheetHeader><div className="my-6 flex-1 space-y-5"><div className="flex gap-4"><img src={prayerSet} alt="Olive prayer set" width={1200} height={1504} loading="lazy" className="h-28 w-22 rounded-sm object-cover" /><div><p className="font-display text-lg">The Stillness Set</p><p className="mt-1 text-sm text-muted-foreground">Olive · Qty 1</p><p className="mt-3 text-sm font-semibold">£68</p></div></div><Separator /><p className="text-sm text-muted-foreground">Complimentary delivery has been applied.</p></div><div className="border-t border-border pt-5"><div className="flex justify-between font-semibold"><span>Subtotal</span><span>£110</span></div><Button className="mt-5 w-full" size="lg">Continue to checkout</Button></div></SheetContent></Sheet><Button variant="outline"><MenuIcon /> Mobile menu</Button></div>
        </section>

        <section id="states" className="scroll-mt-28">
          <SectionHeading index="06" eyebrow="System states" title="Every moment considered." copy="Loading, absence, errors, and completion use the same measured voice as the rest of the experience." />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><div className="min-h-80 border border-border bg-card p-5"><div className="aspect-[4/3]"><Skeleton className="size-full" /></div><Skeleton className="mt-6 h-3 w-20" /><Skeleton className="mt-3 h-6 w-4/5" /><Skeleton className="mt-3 h-4 w-full" /><Skeleton className="mt-2 h-4 w-2/3" /><div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground"><LoaderCircle className="size-3 animate-spin" /> Gathering your edit</div></div><StatusState icon={Inbox} eyebrow="Nothing here yet" title="Your bag is waiting" description="Browse the collection and save the pieces that suit your family." action="Explore collection" /><StatusState icon={CircleAlert} eyebrow="Something shifted" title="We couldn't load this" description="Your details are safe. Try again and we’ll pick up where you left off." action="Try again" tone="error" /><StatusState icon={Check} eyebrow="All done" title="You're on the list" description="A thoughtful note will arrive when there is something worth sharing." action="Continue browsing" tone="success" /></div>
        </section>
      </div>
    </div>
  );
}

function MenuIcon() { return <RotateCcw className="size-4" />; }