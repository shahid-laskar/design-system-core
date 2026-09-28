import { useState } from "react";
import { Lightbulb, Ruler, ShieldCheck, Sun, Wind } from "lucide-react";
import { cn } from "@/lib/utils";
import productModestSet from "@/assets/product-modest-set.jpg";

const modes = [
  { id: "daylight", label: "Daylight normal", icon: Sun },
  { id: "backlight", label: "Backlight test", icon: Lightbulb },
] as const;

const proofs = [
  {
    icon: Wind,
    title: "60s count breathable cambric",
    detail: "Fine, airy weave that stays cool through long Indian summers.",
  },
  {
    icon: ShieldCheck,
    title: "Attached pure cotton voil lining",
    detail: "Zero silhouette under direct light — no separate slip needed.",
  },
  {
    icon: Ruler,
    title: "Two-inch alteration margins",
    detail: "Inner seams left generous so the set can be let out as you need.",
  },
];

export function OpacityTester() {
  const [mode, setMode] = useState<(typeof modes)[number]["id"]>("daylight");
  const backlit = mode === "backlight";

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-14">
      <div>
        <div
          className={cn(
            "media-frame relative aspect-[4/3] transition-shadow duration-brand-slow ease-brand",
            backlit && "shadow-lifted",
          )}
        >
          {/* Lamp layer sitting behind the fabric */}
          <div
            aria-hidden
            className={cn(
              "absolute inset-0 transition-opacity duration-brand-slow ease-brand",
              backlit ? "opacity-100" : "opacity-0",
            )}
            style={{
              background:
                "radial-gradient(circle at 50% 45%, var(--color-mango) 0%, var(--color-brass) 38%, transparent 72%)",
            }}
          />
          <img
            src={productModestSet}
            alt="Cambric cotton salwar set photographed in daylight and again with a lamp held behind the fabric"
            width={1400}
            height={1050}
            loading="lazy"
            className={cn(
              "relative size-full object-cover transition-all duration-brand-slow ease-brand",
              backlit ? "contrast-[1.08] saturate-[0.96]" : "",
            )}
          />
          <span
            className={cn(
              "absolute bottom-3 left-3 rounded-full px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-eyebrow transition-colors duration-brand-fast ease-brand",
              backlit
                ? "bg-primary text-primary-foreground"
                : "bg-background/90 text-muted-foreground",
            )}
          >
            {backlit ? "Lamp behind fabric · still opaque" : "Natural daylight"}
          </span>
        </div>
        <div className="mt-4 inline-flex rounded-full border border-border bg-background p-1">
          {modes.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              aria-pressed={mode === id}
              onClick={() => setMode(id)}
              className={cn(
                "inline-flex min-h-9 items-center gap-2 rounded-full px-4 text-xs font-semibold transition-colors duration-brand-fast ease-brand",
                mode === id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="size-3.5" aria-hidden /> {label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="eyebrow-wide font-bold text-brass-foreground">Touch &amp; feel</p>
        <h3 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
          Hold a lamp behind it. Nothing shows through.
        </h3>
        <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
          Every cambric batch is checked against direct backlight before it ships. Switch the light
          on and see what your family would see.
        </p>
        <ul className="mt-7 space-y-5">
          {proofs.map(({ icon: Icon, title, detail }) => (
            <li key={title} className="flex gap-4">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-sm border border-brass/40 bg-brass/10">
                <Icon className="size-4 text-brass-foreground" aria-hidden />
              </span>
              <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
