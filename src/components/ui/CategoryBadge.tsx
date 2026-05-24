import { getCategoryAccent } from "@/lib/theme/category-theme";
import { cn } from "@/lib/utils/cn";

type CategoryBadgeProps = {
  categorySlug: string;
  title: string;
  className?: string;
};

export const CategoryBadge = ({ categorySlug, title, className }: CategoryBadgeProps) => {
  const accent = getCategoryAccent(categorySlug);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide",
        className,
      )}
      style={{ color: accent.text }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: accent.accent }}
        aria-hidden="true"
      />
      {title}
    </span>
  );
};
