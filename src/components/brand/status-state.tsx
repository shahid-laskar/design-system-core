import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type StatusStateProps = {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  action: string;
  onAction?: () => void;
  tone?: "default" | "success" | "error";
  className?: string;
};

export function StatusState({
  icon: Icon,
  eyebrow,
  title,
  description,
  action,
  onAction,
  tone = "default",
  className,
}: StatusStateProps) {
  const toneClass =
    tone === "success"
      ? "bg-success/10 text-success"
      : tone === "error"
        ? "bg-destructive/10 text-destructive"
        : "bg-blush-cream text-primary";
  return (
    <div
      className={cn(
        "flex min-h-72 flex-col items-center justify-center bg-blush-cream/35 px-6 py-12 text-center",
        className,
      )}
    >
      <div className={`flex size-14 items-center justify-center rounded-full ${toneClass}`}>
        <Icon className="size-6" />
      </div>
      <p className="eyebrow mt-5 text-muted-foreground">{eyebrow}</p>
      <h3 className="mt-2 font-display text-2xl sm:text-3xl">{title}</h3>
      <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">{description}</p>
      <Button
        variant={tone === "error" ? "outline" : "default"}
        className="mt-6"
        onClick={onAction}
      >
        {action}
      </Button>
    </div>
  );
}
