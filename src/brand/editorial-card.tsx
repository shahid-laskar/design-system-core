import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type EditorialCardProps = { image: string; imageAlt: string; topic: string; title: string; summary: string; readTime: string };

export function EditorialCard({ image, imageAlt, topic, title, summary, readTime }: EditorialCardProps) {
  return (
    <article className="group grid min-w-0 gap-5 sm:grid-cols-[1.1fr_1fr] sm:items-center">
      <div className="aspect-[16/11] overflow-hidden rounded-sm bg-muted">
        <img src={image} alt={imageAlt} width={1600} height={1104} loading="lazy" className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
      </div>
      <div>
        <div className="flex items-center gap-3 text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">
          <span>{topic}</span><span className="h-px w-6 bg-border" /><span>{readTime}</span>
        </div>
        <h3 className="mt-3 font-display text-2xl leading-tight sm:text-3xl">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{summary}</p>
        <Button variant="link" className="mt-5">Read the story <ArrowUpRight /></Button>
      </div>
    </article>
  );
}