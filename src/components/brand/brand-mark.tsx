import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-baseline gap-1.5", className)} aria-label="Sukoon House">
      <span className="font-display text-[1.7rem] font-medium leading-none">Sukoon</span>
      <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
        House
      </span>
    </span>
  );
}