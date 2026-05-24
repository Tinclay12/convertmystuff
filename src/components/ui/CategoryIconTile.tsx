import { CategoryIcon } from "@/lib/theme/category-icons";
import { getCategoryAccent } from "@/lib/theme/category-theme";
import { cn } from "@/lib/utils/cn";

type CategoryIconTileProps = {
  categorySlug: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
};

const sizeClasses = {
  sm: "h-9 w-9 rounded-lg",
  md: "h-11 w-11 rounded-xl",
  lg: "h-14 w-14 rounded-2xl",
  xl: "h-16 w-16 rounded-2xl",
};

const iconSize: Record<NonNullable<CategoryIconTileProps["size"]>, number> = {
  sm: 18,
  md: 22,
  lg: 26,
  xl: 32,
};

export const CategoryIconTile = ({
  categorySlug,
  size = "md",
  className,
}: CategoryIconTileProps) => {
  const accent = getCategoryAccent(categorySlug);

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center ring-1 ring-inset",
        sizeClasses[size],
        className,
      )}
      style={{
        backgroundColor: accent.bg,
        color: accent.accent,
        // @ts-expect-error CSS custom property for ring color
        "--tw-ring-color": accent.border,
      }}
      aria-hidden="true"
    >
      <CategoryIcon slug={categorySlug} size={iconSize[size]} />
    </span>
  );
};
