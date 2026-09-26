import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Eye, Heart, Plus, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/brand/design-primitives";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  image: string;
  imageAlt: string;
  category: string;
  name: string;
  price: string;
  previousPrice?: string | undefined;
  savings?: string | undefined;
  note: string;
  badge?: string | undefined;
  href?: string | undefined;
  sizes?: string[] | undefined;
  rating?: number | undefined;
  reviewCount?: number | undefined;
  inStock?: boolean | undefined;
  pillar?: string | undefined;
};

export type PillarKey = "women" | "men" | "kids" | "prayer" | "gifts";

export function resolvePillarKey(pillar?: string, category?: string, name?: string): PillarKey {
  const normPillar = pillar?.trim().toLowerCase();
  if (normPillar) {
    if (normPillar === "women" || normPillar.includes("women")) return "women";
    if (normPillar === "men" || normPillar.includes("men")) return "men";
    if (
      normPillar === "kids" ||
      normPillar === "children" ||
      normPillar === "learning" ||
      normPillar.includes("child") ||
      normPillar.includes("kid")
    )
      return "kids";
    if (
      normPillar === "prayer" ||
      normPillar === "home" ||
      normPillar.includes("prayer") ||
      normPillar.includes("home")
    )
      return "prayer";
    if (normPillar === "gifts" || normPillar.includes("gift")) return "gifts";
  }

  const combined = `${category ?? ""} ${name ?? ""}`.toLowerCase();
  if (
    combined.includes("girls'") ||
    combined.includes("boys'") ||
    combined.includes("child") ||
    combined.includes("kid") ||
    combined.includes("tarbiyah") ||
    combined.includes("habit board") ||
    combined.includes("toy") ||
    combined.includes("alphabet") ||
    combined.includes("story book") ||
    combined.includes("little ones")
  ) {
    return "kids";
  }
  if (
    combined.includes("women") ||
    combined.includes("salwar") ||
    combined.includes("abaya") ||
    combined.includes("hijab") ||
    combined.includes("sharara") ||
    combined.includes("kurti") ||
    combined.includes("dress")
  ) {
    return "women";
  }
  if (
    combined.includes("men") ||
    combined.includes("pathani") ||
    combined.includes("pajama") ||
    combined.includes("thobe") ||
    combined.includes("kufi")
  ) {
    return "men";
  }
  if (combined.includes("gift") || combined.includes("hamper") || combined.includes("box")) {
    return "gifts";
  }
  if (
    combined.includes("prayer") ||
    combined.includes("mat") ||
    combined.includes("rehal") ||
    combined.includes("tasbih") ||
    combined.includes("bakhoor") ||
    combined.includes("burner") ||
    combined.includes("wall art") ||
    combined.includes("attar") ||
    combined.includes("home")
  ) {
    return "prayer";
  }
  return "women";
}

export const pillarStyles: Record<
  PillarKey,
  {
    eyebrowClass: string;
    badgeClass: string;
    bgClass: string;
    accentColor: string;
  }
> = {
  women: {
    eyebrowClass: "text-pillar-women-accent",
    badgeClass: "bg-pillar-women-accent text-white",
    bgClass: "bg-pillar-women-bg",
    accentColor: "#C83E67",
  },
  men: {
    eyebrowClass: "text-pillar-men-accent",
    badgeClass: "bg-pillar-men-accent text-white",
    bgClass: "bg-pillar-men-bg",
    accentColor: "#087E8B",
  },
  kids: {
    eyebrowClass: "text-pillar-kids-accent",
    badgeClass: "bg-pillar-kids-accent text-white",
    bgClass: "bg-pillar-kids-bg",
    accentColor: "#F4A62A",
  },
  prayer: {
    eyebrowClass: "text-pillar-prayer-accent",
    badgeClass: "bg-pillar-prayer-accent text-white",
    bgClass: "bg-pillar-prayer-bg",
    accentColor: "#176B4D",
  },
  gifts: {
    eyebrowClass: "text-pillar-gifts-accent",
    badgeClass: "bg-pillar-gifts-accent text-white",
    bgClass: "bg-pillar-gifts-bg",
    accentColor: "#E96B52",
  },
};

export function ProductCard({
  image,
  imageAlt,
  category,
  name,
  price,
  previousPrice,
  savings,
  note,
  badge,
  href,
  sizes,
  rating,
  reviewCount,
  inStock = true,
  pillar,
}: ProductCardProps) {
  const { addItem, setIsOpen } = useCart();
  const [saved, setSaved] = useState(false);
  const [added, setAdded] = useState(false);

  const pillarKey = resolvePillarKey(pillar, category, name);
  const currentPillar = pillarStyles[pillarKey];

  const targetHref =
    href ??
    `/products/${name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")}`;
  const isApparel = Boolean(sizes?.length);

  const handleAdd = (e: React.MouseEvent) => {
    if (isApparel) return;
    e.preventDefault();
    e.stopPropagation();

    const numericPrice = parseInt(price.replace(/[^0-9]/g, ""), 10) || 999;
    const numericOriginalPrice = previousPrice
      ? parseInt(previousPrice.replace(/[^0-9]/g, ""), 10)
      : numericPrice;

    addItem({
      id: targetHref.replace("/products/", ""),
      name,
      category,
      price: numericPrice,
      originalPrice: numericOriginalPrice,
      image,
      quantity: 1,
    });

    setAdded(true);
    setIsOpen(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <article className="group min-w-0 rounded-lg border border-border bg-card p-2.5 shadow-soft transition-shadow duration-brand-fast ease-brand hover:shadow-lifted">
      <div className="media-frame relative aspect-[4/5]">
        <Link to={targetHref} className="block size-full" aria-label={`View ${name}`}>
          <img
            src={image}
            alt={imageAlt}
            width={1200}
            height={1504}
            loading="lazy"
            className="size-full object-cover transition-transform duration-brand-slow ease-brand group-hover:scale-[1.025]"
          />
        </Link>
        {badge ? (
          <span
            className={cn(
              "absolute left-3 top-3 rounded-sm px-2 py-1 text-[0.65rem] font-bold uppercase tracking-wider shadow-xs transition-colors",
              currentPillar.badgeClass,
            )}
          >
            {badge}
          </span>
        ) : null}
        {!inStock ? (
          <span className="absolute bottom-3 left-3 rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
            Out of stock
          </span>
        ) : null}
        <Button
          variant="secondary"
          size="icon"
          className={cn(
            "absolute right-3 top-3 rounded-full bg-background/95 text-foreground transition-colors hover:bg-background",
            saved && "text-berry",
          )}
          aria-label={saved ? `Remove ${name} from saved` : `Save ${name}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setSaved((s) => !s);
          }}
        >
          <Heart className={cn("size-4", saved && "fill-current text-berry")} />
        </Button>
        <div className="pointer-events-none absolute inset-x-3 bottom-3 hidden [@media(hover:hover)]:block translate-y-2 opacity-0 transition-all duration-brand-fast ease-brand group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
          <Button variant="secondary" className="w-full bg-background/95 text-foreground" asChild>
            <Link to={targetHref}>
              <Eye className="mr-1.5 size-4" /> {isApparel ? "Select size" : "Quick view"}
            </Link>
          </Button>
        </div>
      </div>
      <div className="px-1 pb-1 pt-3">
        <Eyebrow
          className={cn("font-bold tracking-eyebrow transition-colors", currentPillar.eyebrowClass)}
        >
          {category}
        </Eyebrow>
        <Link to={targetHref} className="mt-1.5 block transition-colors hover:text-primary">
          <h3 className="text-base font-semibold leading-snug">{name}</h3>
        </Link>
        <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{note}</p>
        {rating ? (
          <div className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="size-3.5 fill-current text-mango" aria-hidden />
            <span className="font-semibold text-foreground">{rating.toFixed(1)}</span>
            {reviewCount ? <span>({reviewCount})</span> : null}
          </div>
        ) : null}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="text-lg font-bold">{price}</span>
          {previousPrice ? (
            <span className="text-sm text-muted-foreground line-through">{previousPrice}</span>
          ) : null}
          {savings ? (
            <span className="rounded-sm bg-berry px-1.5 py-0.5 text-[0.7rem] font-bold text-berry-foreground">
              Save {savings}
            </span>
          ) : null}
        </div>
        {isApparel ? (
          <p className="mt-2 text-xs text-muted-foreground">Sizes: {sizes!.join(", ")}</p>
        ) : null}

        {isApparel ? (
          <Button className="mt-4 w-full" disabled={!inStock} asChild>
            <Link to={targetHref}>
              <Plus className="mr-1 size-4" /> {inStock ? "Select size & buy" : "Out of stock"}
            </Link>
          </Button>
        ) : (
          <Button className="mt-4 w-full" disabled={!inStock} onClick={handleAdd}>
            <Plus className="mr-1 size-4" />{" "}
            {inStock ? (added ? "Added to bag!" : "Add to bag") : "Notify me"}
          </Button>
        )}
      </div>
    </article>
  );
}
