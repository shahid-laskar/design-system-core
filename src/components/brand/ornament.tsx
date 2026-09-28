import { cn } from "@/lib/utils";

/**
 * Decorative mehrab (prayer arch) silhouette used as a soft watermark behind
 * hero and editorial headers. Purely ornamental — never announced to readers.
 */
export function MehrabArch({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 360"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn("pointer-events-none select-none", className)}
    >
      <path
        d="M20 360V150C20 78 65 22 120 22s100 56 100 128v210"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path
        d="M48 360V156c0-56 32-100 72-100s72 44 72 100v204"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.6"
      />
      <path
        d="M78 360V166c0-38 19-68 42-68s42 30 42 68v194"
        stroke="currentColor"
        strokeWidth="0.85"
        opacity="0.4"
      />
      <circle cx="120" cy="12" r="5" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/**
 * Decorative jali (lattice screen) pattern watermark.
 */
export function JaliPattern({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden="true"
      focusable="false"
      className={cn("pointer-events-none select-none", className)}
    >
      <defs>
        <pattern id="sukoon-jali" width="30" height="30" patternUnits="userSpaceOnUse">
          <path
            d="M15 0 30 15 15 30 0 15Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.9"
          />
          <circle cx="15" cy="15" r="3" fill="none" stroke="currentColor" strokeWidth="0.7" />
        </pattern>
      </defs>
      <rect width="120" height="120" fill="url(#sukoon-jali)" />
    </svg>
  );
}

/** Small antique-brass pill used for festive and craft callouts. */
export function BrassBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-brass/50 bg-brass/12 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-eyebrow text-brass-foreground",
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-brass" aria-hidden />
      {children}
    </span>
  );
}
