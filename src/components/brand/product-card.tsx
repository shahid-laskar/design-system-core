import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, Heart, Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CommerceImage } from "@/components/brand/commerce-image";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";

export type SizeStock = "in" | "low" | "out";

type ProductCardProps = {
  image: string;
  hoverImage?: string | undefined;
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
  sizeStock?: Record<string, SizeStock> | undefined;
  rating?: number | undefined;
  reviewCount?: number | undefined;
  inStock?: boolean | undefined;
  pillar?: string | undefined;
  colors?: Array<{ name: string; swatch: string }> | undefined;
};

export function deriveSizeStock(
  sizes: string[] | undefined,
  inStock = true,
): Record<string, SizeStock> {
  const map: Record<string, SizeStock> = {};
  for (const size of sizes ?? []) {
    map[size] = inStock ? "in" : "out";
  }
  return map;
}

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
  hoverImage,
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
  sizeStock,
  rating,
  reviewCount,
  inStock = true,
  pillar,
  colors,
}: ProductCardProps) {
  const { addItem, setIsOpen } = useCart();
  const [saved, setSaved] = useState(false);
  const [added, setAdded] = useState<string | null>(null);

  const pillarKey = resolvePillarKey(pillar, category, name);
  const currentPillar = pillarStyles[pillarKey];

  const targetHref =
    href ??
    `/products/${name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")}`;
  const isApparel = Boolean(sizes?.length);
  const stockMap = sizeStock ?? deriveSizeStock(sizes, inStock);
  const visibleColors = (colors ?? []).filter((c) => c.name !== "Default").slice(0, 4);

  const quickAdd = (size?: string) => {
    const numericPrice = parseInt(price.replace(/[^0-9]/g, ""), 10) || 0;
    const numericOriginalPrice = previousPrice
      ? parseInt(previousPrice.replace(/[^0-9]/g, ""), 10)
      : numericPrice;

    void addItem({
      id: targetHref.replace("/products/", ""),
      name,
      category,
      price: numericPrice,
      originalPrice: numericOriginalPrice,
      image,
      quantity: 1,
      ...(size ? { size } : {}),
    });

    setAdded(size ?? "added");
    setIsOpen(true);
    setTimeout(() => setAdded(null), 2000);
  };

  const handleAdd = (e: React.MouseEvent) => {
    if (isApparel) return;
    e.preventDefault();
    e.stopPropagation();
    quickAdd();
  };

  return (
    <article className="group flex h-full min-w-0 flex-col">
      <div className={cn("media-frame relative aspect-[4/5]", currentPillar.bgClass)}>
        <Link to={targetHref} className="block size-full" aria-label={`View ${name}`}>
          <CommerceImage
            src={image}
            alt={imageAlt}
            width={1200}
            height={1504}
            loading="lazy"
            className={cn(
              "size-full object-cover object-[center_20%] transition-all duration-brand-slow ease-brand group-hover:scale-[1.03]",
              hoverImage && "group-hover:opacity-0",
            )}
          />
          {hoverImage ? (
            <CommerceImage
              src={hoverImage}
              alt=""
              aria-hidden
              width={1200}
              height={1504}
              loading="lazy"
              className="absolute inset-0 size-full object-cover object-[center_20%] opacity-0 transition-all duration-brand-slow ease-brand group-hover:scale-[1.03] group-hover:opacity-100"
            />
          ) : null}
        </Link>

        {badge ? (
          <span
            className={cn(
              "absolute left-3 top-3 rounded-sm px-2 py-1 text-[0.65rem] font-bold uppercase tracking-wider",
              currentPillar.badgeClass,
            )}
          >
            {badge}
          </span>
        ) : null}
        {!inStock ? (
          <span className="absolute bottom-3 left-3 bg-charcoal-ink/80 px-2.5 py-1 text-xs text-white">
            Out of stock
          </span>
        ) : null}

        <button
          type="button"
          className={cn(
            "absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-background/90 text-foreground transition-colors hover:bg-background",
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
        </button>

        {/* Shared hover action overlay — apparel sizes or hard-goods add */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden translate-y-2 bg-gradient-to-t from-charcoal-ink/70 to-transparent p-3 opacity-0 transition-all duration-brand-fast ease-brand group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 [@media(hover:hover)]:block">
          {isApparel && sizes?.length ? (
            <div className="flex flex-wrap justify-center gap-1.5">
              {sizes.map((sz) => {
                const status = stockMap[sz] ?? "in";
                const soldOut = status === "out" || !inStock;
                const isAdded = added === sz;
                return (
                  <button
                    key={`hover-${sz}`}
                    type="button"
                    disabled={soldOut}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      quickAdd(sz);
                    }}
                    className={cn(
                      "inline-flex h-8 min-w-8 items-center justify-center bg-background text-xs font-semibold transition-colors",
                      soldOut
                        ? "cursor-not-allowed text-muted-foreground/40 line-through"
                        : isAdded
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-primary hover:text-primary-foreground",
                    )}
                    aria-label={soldOut ? `Size ${sz} sold out` : `Quick add size ${sz}`}
                  >
                    {isAdded ? <Check className="size-3" /> : sz}
                  </button>
                );
              })}
            </div>
          ) : (
            <Button
              size="sm"
              className="mx-auto flex h-9 w-full max-w-[12rem]"
              disabled={!inStock}
              onClick={handleAdd}
            >
              {added ? <Check className="mr-1 size-4" /> : <Plus className="mr-1 size-4" />}
              {inStock ? (added ? "Added" : "Add to basket") : "Notify me"}
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col pt-3">
        <p className={cn("eyebrow", currentPillar.eyebrowClass)}>{category}</p>
        <Link to={targetHref} className="mt-1.5 block transition-colors hover:text-primary">
          <h3 className="font-display text-lg leading-snug sm:text-xl">{name}</h3>
        </Link>
        {note ? <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{note}</p> : null}

        {visibleColors.length > 0 ? (
          <div className="mt-2.5 flex items-center gap-1.5" aria-label="Available colours">
            {visibleColors.map((c) => (
              <span
                key={c.name}
                title={c.name}
                className={cn("size-3.5 rounded-full border border-border/80", c.swatch)}
              />
            ))}
          </div>
        ) : null}

        {rating ? (
          <div className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="size-3.5 fill-current text-mango" aria-hidden />
            <span className="font-semibold text-foreground">{rating.toFixed(1)}</span>
            {reviewCount ? <span>({reviewCount})</span> : null}
          </div>
        ) : null}

        <div className="mt-2 flex flex-wrap items-baseline gap-2">
          <span className="text-lg font-bold">{price}</span>
          {previousPrice ? (
            <span className="text-sm text-muted-foreground line-through">{previousPrice}</span>
          ) : null}
          {savings ? (
            <span className="text-[0.7rem] font-bold text-berry">Save {savings}</span>
          ) : null}
        </div>

        {/* Reserved action footprint — same height for apparel + hard goods */}
        <div className="mt-auto flex min-h-11 items-end pt-3">
          {isApparel ? (
            <div className="w-full [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:pointer-events-none">
              <div className="flex gap-1.5 overflow-x-auto pb-0.5">
                {sizes!.map((size) => {
                  const status = stockMap[size] ?? "in";
                  const soldOut = status === "out" || !inStock;
                  const isAdded = added === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      disabled={soldOut}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        quickAdd(size);
                      }}
                      aria-label={soldOut ? `Size ${size} sold out` : `Add size ${size}`}
                      className={cn(
                        "inline-flex h-9 min-w-9 shrink-0 items-center justify-center border px-2 text-xs font-semibold transition-colors",
                        soldOut
                          ? "cursor-not-allowed border-dashed border-border text-muted-foreground/60 line-through"
                          : isAdded
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background hover:border-primary",
                      )}
                    >
                      {isAdded ? <Check className="size-3.5" /> : size}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <Button
              className="h-9 w-full [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:pointer-events-none"
              disabled={!inStock}
              onClick={handleAdd}
            >
              {added ? <Check className="mr-1 size-4" /> : <Plus className="mr-1 size-4" />}{" "}
              {inStock ? (added ? "Added" : "Add to basket") : "Notify me"}
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
