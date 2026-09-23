import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type StatusStateProps = {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  action: string;
  onAction?: () => void;
  tone?: "default" | "success" | "error";
};

export function StatusState({
  icon: Icon,
  eyebrow,
  title,
  description,
  action,
  onAction,
  tone = "default",
}: StatusStateProps) {
  const toneClass =
    tone === "success"
      ? "bg-success/10 text-success"
      : tone === "error"
        ? "bg-destructive/10 text-destructive"
        : "bg-muted text-primary";

  return (
    <div className="flex min-h-80 flex-col items-center justify-center border border-border bg-card px-6 py-10 text-center">
      <div className={`flex size-12 items-center justify-center rounded-full ${toneClass}`}>
        <Icon className="size-5" />
      </div>
      <p className="eyebrow mt-5 text-muted-foreground">{eyebrow}</p>
      <h3 className="mt-2 font-display text-2xl">{title}</h3>
      <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">{description}</p>
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
