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
};

export function ProductCard({ image, imageAlt, category, name, price, previousPrice, note, badge }: ProductCardProps) {
  return (
    <article className="group min-w-0">
      <div className="media-frame relative aspect-[4/5]">
        <img src={image} alt={imageAlt} width={1200} height={1504} loading="lazy" className="size-full object-cover transition-transform duration-brand-slow ease-brand group-hover:scale-[1.025]" />
        {badge ? <Badge variant="clay" className="absolute left-3 top-3 bg-background/90">{badge}</Badge> : null}
        <Button variant="secondary" size="icon" className="absolute right-3 top-3" aria-label={`Save ${name}`}>
          <Heart />
        </Button>
      </div>
      <div className="pt-4">
        <Eyebrow>{category}</Eyebrow>
        <div className="mt-2 flex items-start justify-between gap-3">
          <h3 className="font-display text-xl leading-tight">{name}</h3>
          <div className="shrink-0 text-right text-sm font-semibold">
            <span>{price}</span>
            {previousPrice ? <span className="ml-2 text-muted-foreground line-through">{previousPrice}</span> : null}
          </div>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{note}</p>
        <Button className="mt-4 w-full"><Plus /> Add to bag</Button>
      </div>
    </article>
  );
}