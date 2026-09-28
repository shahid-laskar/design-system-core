import { useState, type ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type CommerceImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  fallbackLabel?: string;
  frameClassName?: string;
};

/**
 * Product/editorial image with a branded fallback when the asset is missing
 * or fails to load. Avoids blank white rectangles and broken-image icons.
 */
export function CommerceImage({
  src,
  alt = "",
  className,
  frameClassName,
  fallbackLabel = "Sukoon",
  loading = "lazy",
  decoding = "async",
  ...rest
}: CommerceImageProps) {
  const [failed, setFailed] = useState(!src);

  if (failed || !src) {
    return (
      <div
        className={cn(
          "relative flex size-full items-center justify-center overflow-hidden bg-blush-cream",
          frameClassName,
          className,
        )}
        role="img"
        aria-label={alt || fallbackLabel}
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, color-mix(in oklab, var(--color-berry) 18%, transparent), transparent 45%), radial-gradient(circle at 80% 70%, color-mix(in oklab, var(--color-emerald) 16%, transparent), transparent 50%)",
          }}
        />
        <span className="relative font-display text-sm font-medium tracking-wide text-foreground/45">
          {fallbackLabel}
        </span>
      </div>
    );
  }

  return (
    <img
      {...rest}
      src={src}
      alt={alt}
      loading={loading}
      decoding={decoding}
      className={cn(className)}
      onError={() => setFailed(true)}
    />
  );
}
