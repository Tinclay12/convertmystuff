import { CategoryIcon } from "@/lib/theme/category-icons";
import { getCategoryAccent, getCategoryAccentStyles } from "@/lib/theme/category-theme";
import { cn } from "@/lib/utils/cn";
import { ContentHeroVisual } from "@/components/sections/ContentHeroVisual";
import { HomeHeroVisual } from "@/components/sections/HomeHeroVisual";

type PageHeaderVariant = "home" | "hub" | "tool" | "guide" | "resource" | "article";

type PageHeaderProps = {
  title: string;
  description?: string;
  variant?: PageHeaderVariant;
  categorySlug?: string;
  heroScope?: "index" | "detail";
  meta?: React.ReactNode;
  actions?: React.ReactNode;
  features?: React.ReactNode;
  className?: string;
};

const heroTextClassName =
  "relative z-10 w-full min-w-0 px-6 py-10 sm:px-10 sm:py-12 xl:px-14 xl:py-14";

export const PageHeader = ({
  title,
  description,
  variant = "home",
  categorySlug,
  heroScope = "detail",
  meta,
  actions,
  features,
  className,
}: PageHeaderProps) => {
  const isHome = variant === "home";
  const isHub = variant === "hub";
  const isGuide = variant === "guide";
  const isResource = variant === "resource";
  const isContent = isGuide || isResource;
  const isIndexHero = isContent && heroScope === "index";
  const isDetailHero = isContent && heroScope === "detail";
  const accent = categorySlug ? getCategoryAccent(categorySlug) : null;
  const accentStyles = categorySlug ? getCategoryAccentStyles(categorySlug) : undefined;

  const padded = isHome || isHub || variant === "tool" || isContent;

  const eyebrowLabel =
    variant === "hub"
      ? "Category"
      : isGuide
        ? "Guide"
        : isResource
          ? "Resource"
          : variant === "tool"
            ? "Tool"
            : variant === "article"
              ? "Guide"
              : null;

  const renderCategoryChip = (size: "sm" | "md" = "sm") => {
    if (!categorySlug || !accent) return null;
    return (
      <span
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset",
          size === "md" && "px-3.5 py-1.5 text-[13px]",
        )}
        style={{
          backgroundColor: accent.bg,
          color: accent.accent,
          // @ts-expect-error CSS custom property
          "--tw-ring-color": accent.border,
        }}
      >
        <CategoryIcon slug={categorySlug} size={size === "md" ? 16 : 14} weight="duotone" />
        {eyebrowLabel}
      </span>
    );
  };

  const textBlock = (
    <div className={cn(padded && heroTextClassName, !padded && "relative min-w-0")}>
      {variant === "hub" && categorySlug && accent && (
        <div className="mb-5">{renderCategoryChip("md")}</div>
      )}
      {isDetailHero && isContent && categorySlug && accent && (
        <div className="mb-5">{renderCategoryChip("md")}</div>
      )}
      {(variant === "article" || (isContent && !categorySlug && isDetailHero)) && eyebrowLabel && (
        <span className="mb-3 block text-xs font-semibold uppercase tracking-wide text-muted">
          {eyebrowLabel}
        </span>
      )}
      {isIndexHero && eyebrowLabel && (
        <span className="mb-3 block text-xs font-semibold uppercase tracking-wide text-muted">
          {eyebrowLabel}
        </span>
      )}
      {variant === "tool" && categorySlug && accent && (
        <div className="mb-4">{renderCategoryChip("sm")}</div>
      )}
      {variant === "tool" && !categorySlug && (
        <span className="mb-3 block text-xs font-semibold uppercase tracking-wide text-muted">
          Tool
        </span>
      )}
      <h1
        className={cn(
          "text-balance font-display font-semibold leading-[1.05] tracking-tight text-foreground",
          isHome
            ? "text-4xl sm:text-5xl lg:text-6xl"
            : isIndexHero
              ? "text-4xl sm:text-5xl"
              : "text-3xl sm:text-4xl",
        )}
      >
        {title}
      </h1>
      {description && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-pretty leading-relaxed text-muted",
            variant === "tool" ? "text-[15px]" : "text-base sm:text-lg",
          )}
        >
          {description}
        </p>
      )}
      {features && <div className="mt-6 flex flex-wrap gap-2">{features}</div>}
      {actions && <div className="mt-6 flex flex-wrap gap-3">{actions}</div>}
      {meta && (
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border pt-5 text-sm text-muted">
          {meta}
        </div>
      )}
    </div>
  );

  const indexVisual = isIndexHero ? (
    <div className="relative border-t border-border p-6 sm:p-10 xl:border-l xl:border-t-0 xl:p-10">
      <ContentHeroVisual
        kind={isGuide ? "guide" : "resource"}
        className="min-h-[260px] xl:min-h-[320px]"
      />
    </div>
  ) : null;

  const contentHeroLayoutClassName =
    "relative flex flex-col xl:grid xl:grid-cols-[minmax(0,1fr)_minmax(280px,380px)] xl:items-stretch";

  if (isHome) {
    return (
      <header className={cn("hero-aurora", className)}>
        <div className="relative grid lg:grid-cols-[minmax(0,1fr)_minmax(280px,460px)] lg:items-stretch">
          {textBlock}
          <div className="relative hidden lg:block">
            <HomeHeroVisual className="absolute inset-0" />
          </div>
        </div>
      </header>
    );
  }

  if (isIndexHero) {
    return (
      <header
        className={cn(isGuide ? "guide-hero-surface" : "resource-hero-surface", className)}
      >
        <div className={contentHeroLayoutClassName}>
          {textBlock}
          {indexVisual}
        </div>
      </header>
    );
  }

  if (isHub && categorySlug && accentStyles) {
    return (
      <header
        className={cn("category-hero-surface", className)}
        style={accentStyles as React.CSSProperties}
      >
        <div className="relative">{textBlock}</div>
      </header>
    );
  }

  if (variant === "tool") {
    return (
      <header
        className={cn(
          "relative overflow-hidden rounded-2xl border border-border bg-card shadow-xs",
          className,
        )}
      >
        <div className="relative">{textBlock}</div>
      </header>
    );
  }

  if (isDetailHero && isContent && categorySlug && accentStyles) {
    return (
      <header
        className={cn("category-hero-surface", className)}
        style={accentStyles as React.CSSProperties}
      >
        <div className="relative">{textBlock}</div>
      </header>
    );
  }

  if (isDetailHero && isContent) {
    return (
      <header
        className={cn(isGuide ? "guide-hero-surface" : "resource-hero-surface", className)}
      >
        <div className="relative">{textBlock}</div>
      </header>
    );
  }

  return (
    <header className={cn("border-b border-border pb-10", className)}>{textBlock}</header>
  );
};
