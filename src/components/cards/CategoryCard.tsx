import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import { CategoryIconTile } from "@/components/ui/CategoryIconTile";
import { getCategoryAccent } from "@/lib/theme/category-theme";
import type { CategoryDefinition } from "@/lib/tools/types";
import { cn } from "@/lib/utils/cn";

type CategoryCardProps = {
  category: CategoryDefinition;
  toolCount: number;
  liveCount?: number;
  className?: string;
};

export const CategoryCard = ({
  category,
  toolCount,
  liveCount,
  className,
}: CategoryCardProps) => {
  const accentSlug = category.accentSlug ?? category.slug;
  const accent = getCategoryAccent(accentSlug);

  return (
    <Link
      href={category.path}
      className={cn(
        "rule-row category-hover group grid gap-4 px-5 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:pr-6",
        className,
      )}
      style={{
        "--row-accent": accent.accent,
      } as React.CSSProperties}
    >
      <CategoryIconTile
        categorySlug={accentSlug}
        size="md"
        className="transition-transform group-hover:scale-105"
      />
      <div className="min-w-0">
        <h3 className="font-display text-lg font-semibold text-foreground transition-colors group-hover:text-accent">
          {category.title}
        </h3>
        <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted">
          {category.description}
        </p>
      </div>
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="text-right">
          <p className="font-display text-base font-semibold tabular-nums text-foreground">
            {toolCount}
          </p>
          <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-muted">
            {liveCount !== undefined && liveCount < toolCount
              ? `${liveCount} live`
              : toolCount === 1
                ? "tool"
                : "tools"}
          </p>
        </div>
        <CaretRight
          size={16}
          weight="bold"
          aria-hidden="true"
          className="hidden text-muted/60 transition-all group-hover:translate-x-0.5 group-hover:text-foreground sm:block"
        />
      </div>
    </Link>
  );
};

export const CategoryCardCompact = CategoryCard;
