import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Check,
  ChevronRight,
  Minus,
  PackageCheck,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

import editorialHome from "@/assets/editorial-home-calm.jpg.asset.json";
import productBundle from "@/assets/product-bundle.jpg.asset.json";
import productModest from "@/assets/product-modest-set.jpg.asset.json";
import productPrayer from "@/assets/product-prayer-set.jpg.asset.json";
import { Eyebrow, PageContainer, SectionHeading } from "@/components/brand/design-primitives";
import { SiteShell } from "@/components/brand/site-shell";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products/$productId")({
  head: () => ({
    meta: [
      { title: "The Stillness Set — Sukoon House" },
      { name: "description", content: "A softly woven prayer mat and solid beech stand, made to create a quieter place for daily prayer." },
      { property: "og:title", content: "The Stillness Set — Sukoon House" },
      { property: "og:description", content: "A quieter place for the daily return. Thoughtfully made in olive linen and FSC beech." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductPage,
});

const gallery = [
  { src: productPrayer.url, alt: "Olive Stillness prayer mat with a beech Quran stand in soft daylight", position: "object-center" },
  { src: productPrayer.url, alt: "Close detail of the softly woven olive prayer mat", position: "object-left" },
  { src: editorialHome.url, alt: "The Stillness Set in a calm home prayer corner", position: "object-center" },
];

const colors = [
  { name: "Olive", swatch: "bg-primary" },
  { name: "Oat", swatch: "bg-secondary" },
  { name: "Mineral", swatch: "bg-mineral" },
];

function ProductPage() {
  const { productId } = Route.useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [color, setColor] = useState("Olive");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [bundleAdded, setBundleAdded] = useState(false);

  const productName = productId === "the-stillness-set" ? "The Stillness Set" : "The Stillness Set";

  function addToBag() {
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2400);
  }

  return (
    <SiteShell>
      <PageContainer className="py-5">
        <nav className="flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
          <a href="/" className="transition-colors hover:text-foreground">Home</a>
          <ChevronRight className="size-3" />
          <span>Home &amp; prayer</span>
          <ChevronRight className="size-3" />
          <span className="text-foreground">{productName}</span>
        </nav>
      </PageContainer>

      <PageContainer className="pb-16 lg:pb-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(22rem,0.85fr)] lg:gap-16">
          <section aria-label="Product gallery" className="min-w-0">
            <div className="media-frame aspect-[4/5] sm:aspect-[5/6]">
              <img
                src={gallery[selectedImage].src}
                alt={gallery[selectedImage].alt}
                className={cn("size-full object-cover", gallery[selectedImage].position)}
                width={1200}
                height={1440}
              />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3" role="list" aria-label="Choose product image">
              {gallery.map((image, index) => (
                <Button
                  key={image.alt}
                  variant="ghost"
                  className={cn("h-auto overflow-hidden rounded-sm p-0 ring-offset-2", selectedImage === index && "ring-2 ring-primary")}
                  onClick={() => setSelectedImage(index)}
                  aria-label={`View image ${index + 1}`}
                  aria-pressed={selectedImage === index}
                >
                  <span className="media-frame aspect-square w-full">
                    <img src={image.src} alt="" className={cn("size-full object-cover", image.position)} />
                  </span>
                </Button>
              ))}
            </div>
          </section>

          <section className="min-w-0 lg:sticky lg:top-8 lg:self-start">
            <Eyebrow>Home &amp; prayer</Eyebrow>
            <h1 className="mt-3 font-display text-4xl leading-none sm:text-5xl">{productName}</h1>
            <p className="mt-4 max-w-lg font-display text-xl leading-snug text-muted-foreground sm:text-2xl">
              A quieter place for the daily return.
            </p>

            <div className="mt-6 flex items-center gap-3 border-b border-border pb-6">
              <span className="text-lg font-semibold">£68</span>
              <span className="text-sm text-muted-foreground line-through">£76</span>
              <span className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
                <span className="size-1.5 rounded-full bg-success" /> In stock
              </span>
            </div>

            <div className="border-b border-border py-6">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                <p className="text-sm font-semibold">Colour</p>
                <p className="text-sm text-muted-foreground">{color}</p>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2" role="radiogroup" aria-label="Colour">
                {colors.map((option) => (
                  <Button
                    key={option.name}
                    variant="outline"
                    className={cn("h-11 justify-start px-3", color === option.name && "border-primary ring-1 ring-primary")}
                    onClick={() => setColor(option.name)}
                    role="radio"
                    aria-checked={color === option.name}
                  >
                    <span className={cn("size-4 shrink-0 rounded-full border border-border", option.swatch)} />
                    {option.name}
                  </Button>
                ))}
              </div>
            </div>

            <div className="py-6">
              <p className="text-sm font-semibold">Quantity</p>
              <div className="mt-3 grid grid-cols-[auto_minmax(0,1fr)] gap-3">
                <div className="grid h-11 grid-cols-[2.75rem_2.25rem_2.75rem] items-center rounded-md border border-input">
                  <Button variant="ghost" size="icon" className="h-10 w-11" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity" disabled={quantity === 1}><Minus /></Button>
                  <span className="text-center text-sm font-semibold" aria-live="polite">{quantity}</span>
                  <Button variant="ghost" size="icon" className="h-10 w-11" onClick={() => setQuantity(Math.min(8, quantity + 1))} aria-label="Increase quantity"><Plus /></Button>
                </div>
                <Button size="lg" className="h-11 w-full" onClick={addToBag}>
                  {added ? <><Check /> Added to bag</> : <><ShoppingBag /> Add to bag · £{68 * quantity}</>}
                </Button>
              </div>
            </div>

            <div className="grid gap-3 border-y border-border py-5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <Reassurance icon={PackageCheck} title="Delivery" copy="2–4 working days" />
              <Reassurance icon={Sparkles} title="Packaging" copy="Plastic-free, ready to give" />
              <Reassurance icon={RotateCcw} title="Returns" copy="30 days, simply arranged" />
            </div>

            <Accordion type="single" collapsible className="mt-2">
              <DetailItem value="materials" title="Materials & Origin">Linen-cotton upper woven in Bursa, Türkiye, with a recycled cotton base. The folding stand is shaped from FSC-certified European beech in a small workshop in Konya.</DetailItem>
              <DetailItem value="dimensions" title="Dimensions">Prayer mat: 110 × 68 cm. Folded stand: 28 × 19 × 4 cm. Set weight: approximately 1.2 kg.</DetailItem>
              <DetailItem value="care" title="Care Instructions">Brush gently after use. Spot clean with cool water and mild soap; air dry flat. Wipe the beech stand with a soft, dry cloth.</DetailItem>
              <DetailItem value="delivery" title="Delivery & Returns">UK delivery in 2–4 working days. Returns are welcome within 30 days when pieces are unused and in their original packaging.</DetailItem>
            </Accordion>
          </section>
        </div>
      </PageContainer>

      <section className="border-y border-border bg-secondary/40">
        <PageContainer className="section-space">
          <SectionHeading
            index="01"
            eyebrow="Made with intention"
            title={<>A small pause,<br />made tangible.</>}
            copy="The Stillness Set begins with a simple thought: the objects we return to each day should make that return feel easier. The weave is soft underfoot without feeling precious; the stand folds away when the room needs to become something else."
          />
          <div className="mt-10 grid items-center gap-8 md:grid-cols-[1.05fr_0.95fr] md:gap-14">
            <div className="media-frame aspect-[16/10]"><img src={editorialHome.url} alt="A calm corner at home in warm morning light" className="size-full object-cover" /></div>
            <div>
              <Eyebrow>Our guarantee</Eyebrow>
              <h3 className="mt-3 font-display text-3xl">Useful, honest, made to last.</h3>
              <ul className="mt-6 space-y-4 text-sm leading-6 text-muted-foreground">
                <GuaranteeItem>Every material and making origin is clearly stated.</GuaranteeItem>
                <GuaranteeItem>We inspect every set by hand before it leaves us.</GuaranteeItem>
                <GuaranteeItem>If it is not right for your home, returns stay uncomplicated.</GuaranteeItem>
              </ul>
            </div>
          </div>
        </PageContainer>
      </section>

      <PageContainer className="section-space">
        <SectionHeading
          index="02"
          eyebrow="A considered pairing"
          title="Begin with the evening ritual."
          copy="Add The Everyday Pair for an understated set that moves gently from prayer into the rest of the day. Optional, simply priced, and never required."
        />
        <div className="mt-10 grid overflow-hidden rounded-sm border border-border bg-card md:grid-cols-[0.9fr_1.1fr]">
          <div className="media-frame aspect-[4/3] rounded-none md:aspect-auto"><img src={productModest.url} alt="The Everyday Pair in soft sand and stone cotton" className="size-full object-cover" /></div>
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12">
            <Eyebrow>Optional bundle</Eyebrow>
            <h3 className="mt-3 font-display text-3xl">Stillness + The Everyday Pair</h3>
            <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">The Stillness Set with our sand hijab and stone-grey abaya in soft-touch cotton.</p>
            <div className="mt-6 flex items-baseline gap-3"><span className="text-lg font-semibold">£112</span><span className="text-sm text-muted-foreground line-through">£122</span><span className="text-xs font-semibold text-primary">Save £10</span></div>
            <Button variant="outline" className="mt-6 w-full sm:w-fit" onClick={() => setBundleAdded(true)}>{bundleAdded ? <><Check /> Bundle added</> : <><Plus /> Add bundle to bag</>}</Button>
          </div>
        </div>
      </PageContainer>

      <section className="border-t border-border">
        <PageContainer className="section-space">
          <Eyebrow>Pairs well with</Eyebrow>
          <div className="mt-4 grid gap-7 md:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)] md:items-center">
            <div className="media-frame aspect-[4/5]"><img src={productBundle.url} alt="The Considered Gift with prayer mat, book and attar" className="size-full object-cover" /></div>
            <div>
              <h2 className="font-display text-3xl sm:text-4xl">The Considered Gift</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">A linen-bound book of daily supplications and a subtle cedar attar, gathered for giving—or for keeping close.</p>
              <div className="mt-5 flex items-center gap-5"><span className="font-semibold">£75</span><Button variant="link" className="px-0">View the set <ChevronRight /></Button></div>
            </div>
          </div>
        </PageContainer>
      </section>
    </SiteShell>
  );
}

function Reassurance({ icon: Icon, title, copy }: { icon: typeof ShieldCheck; title: string; copy: string }) {
  return <div className="flex min-w-0 items-start gap-3"><Icon className="mt-0.5 size-4 shrink-0 text-primary" /><div className="min-w-0"><p className="text-xs font-semibold">{title}</p><p className="mt-0.5 text-xs leading-5 text-muted-foreground">{copy}</p></div></div>;
}

function DetailItem({ value, title, children }: { value: string; title: string; children: string }) {
  return <AccordionItem value={value}><AccordionTrigger>{title}</AccordionTrigger><AccordionContent className="pr-6 leading-6 text-muted-foreground">{children}</AccordionContent></AccordionItem>;
}

function GuaranteeItem({ children }: { children: string }) {
  return <li className="flex gap-3"><ShieldCheck className="mt-1 size-4 shrink-0 text-primary" /><span>{children}</span></li>;
}