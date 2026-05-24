import Link from "next/link";
import { CategoryIcon } from "@/lib/theme/category-icons";
import { getCategoryAccent } from "@/lib/theme/category-theme";
import type { CategoryDefinition } from "@/lib/tools/types";
import { cn } from "@/lib/utils/cn";

type CategoryStripProps = {
  categories: CategoryDefinition[];
  className?: string;
};

export const CategoryStrip = ({ categories, className }: CategoryStripProps) => {
  return (
    <div
      className={cn(
        "flex gap-2 overflow-x-auto pb-1 scrollbar-hide snap-x snap-mandatory sm:flex-wrap sm:overflow-visible sm:pb-0",
        className,
      )}
    >
      {categories.map((category) => {
        const accentSlug = category.accentSlug ?? category.slug;
        const accent = getCategoryAccent(accentSlug);

        return (
          <Link
            key={category.id}
            href={category.path}
            className="group inline-flex shrink-0 snap-start items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-border-strong hover:shadow-xs"
          >
            <span
              className="inline-flex shrink-0"
              style={{ color: accent.accent }}
              aria-hidden="true"
            >
              <CategoryIcon slug={accentSlug} size={16} weight="duotone" />
            </span>
            {category.title}
          </Link>
        );
      })}
    </div>
  );
};
