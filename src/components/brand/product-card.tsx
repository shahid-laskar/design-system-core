import { Link } from "@tanstack/react-router";
import { Heart, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/brand/design-primitives";

type ProductCardProps = {
  image: string;
  imageAlt: string;
  category: string;
  name: string;
  price: string;
  previousPrice?: string;
  note: string;
  badge?: string;
  savings?: string;
  href?: string;
};

export function ProductCard({
  image,
  imageAlt,
  category,
  name,
  price,
  previousPrice,
  note,
  badge,
  savings,
  href,
}: ProductCardProps) {
  const targetHref =
    href ??
    `/products/${name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")}`;

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
        <Button
          variant="secondary"
          size="icon"
          className="absolute right-3 top-3"
          aria-label={`Save ${name}`}
        >
          <Heart />
        </Button>
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
              <span className="ml-2 text-muted-foreground line-through">{previousPrice}</span>
            ) : null}
          </div>
        </div>
        {savings ? <p className="mt-1 text-xs font-semibold text-clay">{savings}</p> : null}
        <p className="mt-2 text-sm text-muted-foreground">{note}</p>
        <Button className="mt-4 w-full">
          <Plus /> Add to bag
        </Button>
      </div>
    </article>
  );
}
