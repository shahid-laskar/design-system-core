import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      className={cn("inline-flex items-baseline gap-2", className)}
      aria-label="Sukoon, The Family Store"
    >
      <span className="font-display text-[1.85rem] font-medium leading-none tracking-tight">
        Sukoon
      </span>
      <span className="hidden text-[0.58rem] font-bold uppercase tracking-[0.22em] text-muted-foreground sm:inline">
        The Family Store
      </span>
    </span>
  );
}
