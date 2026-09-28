import { cn } from "@/lib/utils";

const promises = [
  "Pure 60s Count Cambric Cotton",
  "Attached Opaque Voil Linings",
  "Doorstep Size Exchange Across India",
  "Free Express Delivery ₹999+",
  "Cash on Delivery Available",
  "Dispatched Within 24–48 Hours",
];

/**
 * Ambient family-promise ribbon. The list is rendered twice so the track can
 * loop seamlessly; the duplicate copy is hidden from assistive tech.
 */
export function PromiseTicker({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "marquee-mask overflow-hidden border-y border-border bg-blush-cream/70 py-3",
        className,
      )}
    >
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            className="flex shrink-0 items-center"
            {...(copy === 1 ? { "aria-hidden": true } : {})}
          >
            {promises.map((promise) => (
              <li
                key={promise}
                className="flex items-center gap-6 whitespace-nowrap px-6 text-[0.72rem] font-semibold uppercase tracking-eyebrow-wide text-muted-foreground"
              >
                {promise}
                <span className="size-1 rotate-45 bg-emerald/60" aria-hidden />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
