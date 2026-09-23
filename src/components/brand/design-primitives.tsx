import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageContainer({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("page-container", className)} {...props} />;
}

export function Eyebrow({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("eyebrow text-muted-foreground", className)} {...props} />;
}

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: ReactNode;
  copy: ReactNode;
};

export function SectionHeading({ index, eyebrow, title, copy }: SectionHeadingProps) {
  return (
    <div className="grid gap-4 border-t border-border pt-6 md:grid-cols-[1fr_2fr] md:gap-12">
      <div className="eyebrow flex gap-3 text-muted-foreground">
        <span>{index}</span>
        <span>{eyebrow}</span>
      </div>
      <div>
        <h2 className="display-section">{title}</h2>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
          {copy}
        </p>
      </div>
    </div>
  );
}
