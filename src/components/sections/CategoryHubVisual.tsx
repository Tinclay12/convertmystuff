import Image from "next/image";
import { CategoryIconTile } from "@/components/ui/CategoryIconTile";
import { getCategoryAccent, getCategoryAccentStyles } from "@/lib/theme/category-theme";
import { getCategoryHeroImage } from "@/lib/theme/category-images";
import { cn } from "@/lib/utils/cn";

type CategoryHubVisualProps = {
  categorySlug: string;
  title: string;
  compact?: boolean;
  className?: string;
};

export const CategoryHubVisual = ({
  categorySlug,
  title,
  compact = false,
  className,
}: CategoryHubVisualProps) => {
  const accent = getCategoryAccent(categorySlug);
  const accentStyles = getCategoryAccentStyles(categorySlug);
  const heroImage = getCategoryHeroImage(categorySlug);

  if (heroImage) {
    return (
      <aside
        className={cn(
          "hidden shrink-0 lg:block",
          compact ? "lg:w-44 xl:w-52" : "lg:w-60 xl:w-72",
          className,
        )}
        aria-hidden="true"
      >
        <div className="relative aspect-[5/4] overflow-hidden rounded-2xl border border-border bg-card shadow-xs">
          <Image
            src={heroImage}
            alt=""
            fill
            sizes="(min-width: 1280px) 288px, 240px"
            className="object-cover"
          />
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: accent.accent }}
          />
          <span className="text-xs font-semibold uppercase tracking-wide text-muted">
            Category
          </span>
        </div>
      </aside>
    );
  }

  return (
    <aside
      className={cn(
        "hidden shrink-0 lg:block",
        compact ? "lg:w-44 xl:w-52" : "lg:w-56 xl:w-64",
        className,
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-border bg-card shadow-xs",
          compact ? "p-5" : "p-7",
        )}
        style={accentStyles as React.CSSProperties}
      >
        <div
          className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full blur-3xl"
          style={{ backgroundColor: `color-mix(in srgb, ${accent.accent} 18%, transparent)` }}
          aria-hidden="true"
        />
        <CategoryIconTile
          categorySlug={categorySlug}
          size={compact ? "md" : "xl"}
          className="relative mb-5"
        />
        <p
          className={cn(
            "relative font-display font-semibold leading-snug text-foreground",
            compact ? "text-base" : "text-lg",
          )}
        >
          {title}
        </p>
        <div
          className={cn("relative h-0.5 rounded-full", compact ? "mt-4 w-10" : "mt-5 w-12")}
          style={{ backgroundColor: accent.accent }}
        />
      </div>
    </aside>
  );
};
