import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrassBadge } from "@/components/brand/ornament";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";
import productModestSet from "@/assets/product-modest-set.jpg";
import productMenKurta from "@/assets/product-men-kurta.jpg";
import productChildSet from "@/assets/product-child-set.jpg";

type Member = {
  role: string;
  handle: string;
  name: string;
  category: string;
  price: number;
  mrp: number;
  image: string;
  imageAlt: string;
  sizes: string[];
  soldOut?: string[];
  sizeNote: string;
};

const members: Member[] = [
  {
    role: "For her",
    handle: "pure-cambric-cotton-salwar-suit-set",
    name: "Pure Cambric Cotton Salwar Suit Set",
    category: "Women's Ethnic & Modest",
    price: 1499,
    mrp: 1799,
    image: productModestSet,
    imageAlt: "Three-piece cambric cotton salwar suit set folded on linen",
    sizes: ["S", "M", "L", "XL", "XXL"],
    soldOut: ["XXL"],
    sizeNote: "Kurta length 44\" in Size M",
  },
  {
    role: "For him",
    handle: "classic-friday-handloom-cotton-kurta",
    name: "Classic Friday Handloom Cotton Kurta",
    category: "Men's Apparel",
    price: 899,
    mrp: 1099,
    image: productMenKurta,
    imageAlt: "Handloom cotton kurta with mandarin collar",
    sizes: ["M", "L", "XL", "XXL"],
    sizeNote: "Kurta length 42\" in Size L",
  },
  {
    role: "For the little one",
    handle: "boys-festive-cotton-kurta-set",
    name: "Boys' Festive Cotton Kurta Set",
    category: "Children & Tarbiyah",
    price: 799,
    mrp: 999,
    image: productChildSet,
    imageAlt: "Children's festive cotton kurta and pajama set",
    sizes: ["S", "M", "L"],
    sizeNote: "S 2–4 yrs · M 5–7 yrs · L 8–10 yrs",
  },
];

/** Coordinated colour stories, built only from shades the catalogue actually stocks. */
const palettes = [
  {
    id: "sage-linen",
    label: "Sage & Linen",
    swatches: ["bg-primary", "bg-secondary", "bg-primary/70"],
    colours: ["Sage Green", "Soft White", "Sage"],
    copy: "Calm, cool greens with crisp linen white — our most-loved Eid morning pairing.",
  },
  {
    id: "ivory-stone",
    label: "Ivory & Stone",
    swatches: ["bg-mineral", "bg-clay", "bg-secondary"],
    colours: ["Stone Grey", "Warm Ivory", "Sand"],
    copy: "Quiet neutrals that photograph beautifully and carry through the whole festive week.",
  },
  {
    id: "sand-clay",
    label: "Sand & Clay",
    swatches: ["bg-secondary", "bg-mineral", "bg-secondary/70"],
    colours: ["Natural Sand", "Mist Grey", "Sand"],
    copy: "Warm earth tones for Jummah afternoons and unhurried family gatherings.",
  },
] as const;

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export function FamilyEnsemble() {
  const { addItem, setIsOpen } = useCart();
  const [palette, setPalette] = useState<(typeof palettes)[number]["id"]>("sage-linen");
  const [picked, setPicked] = useState<Record<string, string>>({
    "pure-cambric-cotton-salwar-suit-set": "M",
    "classic-friday-handloom-cotton-kurta": "L",
    "boys-festive-cotton-kurta-set": "M",
  });
  const [added, setAdded] = useState(false);

  const activePalette = palettes.find((p) => p.id === palette) ?? palettes[0];

  const { total, mrpTotal } = useMemo(
    () => ({
      total: members.reduce((sum, m) => sum + m.price, 0),
      mrpTotal: members.reduce((sum, m) => sum + m.mrp, 0),
    }),
    [],
  );

  const addEnsemble = () => {
    members.forEach((member, index) => {
      void addItem({
        id: member.handle,
        name: member.name,
        category: member.category,
        price: member.price,
        originalPrice: member.mrp,
        image: member.image,
        quantity: 1,
        size: picked[member.handle] ?? member.sizes[0]!,
        color: activePalette.colours[index] ?? activePalette.colours[0]!,
      });
    });
    setAdded(true);
    setIsOpen(true);
    setTimeout(() => setAdded(false), 2400);
  };

  return (
    <div className="rounded-lg border border-border bg-card/70 p-5 shadow-soft sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <BrassBadge>Eid 2026 Edition</BrassBadge>
          <h3 className="mt-4 font-display text-3xl leading-tight sm:text-4xl">
            Coordinate the whole family.
          </h3>
          <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
            Pick one colour story and everyone walks out matching — without anyone looking like a
            uniform.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Colour stories">
        {palettes.map((option) => {
          const active = option.id === palette;
          return (
            <button
              key={option.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setPalette(option.id)}
              className={cn(
                "inline-flex min-h-10 items-center gap-2.5 rounded-full border px-4 text-sm font-medium transition-colors duration-brand-fast ease-brand",
                active
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border bg-background text-muted-foreground hover:text-foreground",
              )}
            >
              <span className="flex -space-x-1" aria-hidden>
                {option.swatches.map((swatch, i) => (
                  <span
                    key={i}
                    className={cn("size-3.5 rounded-full border border-border", swatch)}
                  />
                ))}
              </span>
              {option.label}
            </button>
          );
        })}
      </div>
      <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">{activePalette.copy}</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {members.map((member, index) => (
          <div key={member.handle} className="min-w-0">
            <Link
              to="/products/$productId"
              params={{ productId: member.handle }}
              className="group block"
            >
              <div className="media-frame aspect-[4/5]">
                <img
                  src={member.image}
                  alt={member.imageAlt}
                  width={800}
                  height={1000}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-brand-slow ease-brand group-hover:scale-[1.03]"
                />
              </div>
            </Link>
            <p className="eyebrow mt-3 font-bold text-pillar-women-accent">{member.role}</p>
            <Link
              to="/products/$productId"
              params={{ productId: member.handle }}
              className="mt-1 block transition-colors hover:text-primary"
            >
              <h4 className="text-sm font-semibold leading-snug">{member.name}</h4>
            </Link>
            <p className="mt-1 text-xs text-muted-foreground">
              {activePalette.colours[index]} · {inr(member.price)}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {member.sizes.map((size) => {
                const soldOut = member.soldOut?.includes(size);
                const active = picked[member.handle] === size;
                return (
                  <button
                    key={size}
                    type="button"
                    disabled={soldOut}
                    onClick={() => setPicked((cur) => ({ ...cur, [member.handle]: size }))}
                    aria-label={
                      soldOut ? `Size ${size} sold out` : `Choose size ${size} for ${member.role}`
                    }
                    className={cn(
                      "inline-flex min-h-9 min-w-9 items-center justify-center rounded-md border px-2 text-xs font-semibold transition-colors duration-brand-fast ease-brand",
                      soldOut
                        ? "cursor-not-allowed border-dashed border-border text-muted-foreground/60 line-through"
                        : active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background hover:border-primary hover:bg-primary/10",
                    )}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-[0.7rem] leading-4 text-muted-foreground">{member.sizeNote}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-border pt-6">
        <div>
          <p className="flex flex-wrap items-baseline gap-2">
            <span className="font-display text-3xl">{inr(total)}</span>
            <span className="text-sm text-muted-foreground line-through">{inr(mrpTotal)}</span>
            <span className="rounded-sm bg-berry px-1.5 py-0.5 text-[0.7rem] font-bold text-berry-foreground">
              Save {inr(mrpTotal - total)}
            </span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Three coordinated pieces · Free express delivery
          </p>
        </div>
        <Button size="lg" className="min-w-0" onClick={addEnsemble}>
          {added ? <Check /> : <Sparkles />}
          {added ? "Added to basket" : `Add family ensemble · ${inr(total)}`}
        </Button>
      </div>
    </div>
  );
}
