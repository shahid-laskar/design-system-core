import { Link } from "@tanstack/react-router";
import { Eye, Heart, Plus, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/brand/design-primitives";

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
}: ProductCardProps) {
  const targetHref =
    href ??
    `/products/${name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")}`;
  const isApparel = Boolean(sizes?.length);

  return (
    <article className="group min-w-0">
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
          <Badge variant="clay" className="absolute left-3 top-3 bg-background/90">
            {badge}
          </Badge>
        ) : null}
        {!inStock ? (
          <span className="absolute bottom-3 left-3 rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
            Out of stock
          </span>
        ) : null}
        <Button
          variant="secondary"
          size="icon"
          className="absolute right-3 top-3"
          aria-label={`Save ${name}`}
        >
          <Heart />
        </Button>
        <div className="pointer-events-none absolute inset-x-3 bottom-3 translate-y-2 opacity-0 transition-all duration-brand-fast ease-brand group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
          <Button variant="secondary" className="w-full bg-background/95">
            <Eye /> {isApparel ? "Select size" : "Quick view"}
          </Button>
        </div>
      </div>
      <div className="pt-4">
        <Eyebrow>{category}</Eyebrow>
        <div className="mt-2 flex items-start justify-between gap-3">
          <Link to={targetHref} className="transition-colors hover:text-primary">
            <h3 className="font-display text-xl leading-tight">{name}</h3>
          </Link>
          <div className="shrink-0 text-right text-sm font-semibold">
            <span>{price}</span>
            {previousPrice ? (
              <span className="ml-2 font-normal text-muted-foreground line-through">
                {previousPrice}
              </span>
            ) : null}
          </div>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{note}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          {rating ? (
            <span className="inline-flex items-center gap-1">
              <Star className="size-3 fill-current text-primary" aria-hidden />
              <span className="text-foreground">{rating.toFixed(1)}</span>
              {reviewCount ? <span>({reviewCount} reviews)</span> : null}
            </span>
          ) : null}
          {savings ? (
            <span className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground">
              Save {savings}
            </span>
          ) : null}
        </div>
        {isApparel ? (
          <p className="mt-2 text-xs text-muted-foreground">Sizes: {sizes!.join(", ")}</p>
        ) : null}
        <Button className="mt-4 w-full" disabled={!inStock}>
          <Plus /> {inStock ? "Add to bag" : "Notify me"}
        </Button>
      </div>
    </article>
  );
}
