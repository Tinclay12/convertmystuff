import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import { CategoryIconTile } from "@/components/ui/CategoryIconTile";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { ToolStatusBadge } from "@/components/ui/ToolStatusBadge";
import { getCategoryAccent } from "@/lib/theme/category-theme";
import { getCategoryBySlug, isLiveTool, isPlannedTool } from "@/lib/tools/access";
import type { ToolDefinition } from "@/lib/tools/types";
import { cn } from "@/lib/utils/cn";

type ToolCardProps = {
  tool: ToolDefinition;
  showCategory?: boolean;
  className?: string;
};

export const ToolCard = ({ tool, showCategory = false, className }: ToolCardProps) => {
  const category = getCategoryBySlug(tool.category);
  const accentSlug = category?.accentSlug ?? category?.slug ?? tool.category;
  const accent = getCategoryAccent(accentSlug);
  const isPlanned = isPlannedTool(tool);
  const isLive = isLiveTool(tool);

  return (
    <Link
      href={tool.path}
      className={cn(
        "rule-row category-hover group grid gap-3 px-5 sm:grid-cols-[auto_1fr_auto] sm:items-start sm:pr-6",
        isPlanned && "opacity-90",
        className,
      )}
      style={{ "--row-accent": accent.accent } as React.CSSProperties}
    >
      <CategoryIconTile
        categorySlug={accentSlug}
        size="sm"
        className="mt-0.5 transition-transform group-hover:scale-105"
      />
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3
            className={cn(
              "font-medium text-foreground transition-colors",
              isLive && "group-hover:text-accent",
              isPlanned && "group-hover:text-planned",
            )}
          >
            {tool.title}
          </h3>
          <div className="flex flex-wrap items-center gap-3">
            {isPlanned && <ToolStatusBadge status={tool.status} />}
            {showCategory && category && (
              <CategoryBadge categorySlug={accentSlug} title={category.title} />
            )}
          </div>
        </div>
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted">
          {tool.shortDescription}
        </p>
      </div>
      <CaretRight
        size={16}
        weight="bold"
        aria-hidden="true"
        className="mt-1.5 hidden text-muted/50 transition-all group-hover:translate-x-0.5 group-hover:text-muted sm:block"
      />
    </Link>
  );
};
