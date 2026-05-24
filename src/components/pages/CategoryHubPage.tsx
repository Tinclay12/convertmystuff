import Link from "next/link";
import { CategoryGuidesSection } from "@/components/guides/CategoryGuidesSection";
import { CategoryResourcesSection } from "@/components/resources/CategoryResourcesSection";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { CategoryHubVisual } from "@/components/sections/CategoryHubVisual";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/sections/Section";
import { Breadcrumbs } from "@/components/tools/Breadcrumbs";
import { buildCategoryBreadcrumbs } from "@/lib/seo/schema";
import { ToolGrid } from "@/components/tools/ToolGrid";
import { ToolSearch, type SerializableTool } from "@/components/tools/ToolSearch";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import {
  getAllCategories,
  getCategoryStats,
  getFeaturedToolsForCategory,
  getGuidesForCategory,
  getResourcesForCategory,
  getToolsGroupedBySubcategory,
  isCategoryVisible,
} from "@/lib/tools/access";
import type { CategoryDefinition } from "@/lib/tools/types";

type CategoryHubPageProps = {
  category: CategoryDefinition;
};

export const CategoryHubPage = ({ category }: CategoryHubPageProps) => {
  const accentSlug = category.accentSlug ?? category.slug;
  const stats = getCategoryStats(category.slug);
  const subcategoryGroups = getToolsGroupedBySubcategory(category.slug);
  const relatedCategories = getAllCategories().filter(
    (item) => item.slug !== category.slug && isCategoryVisible(item.slug),
  );
  const categoryGuides = getGuidesForCategory(category.slug);
  const categoryResources = getResourcesForCategory(category.slug);

  const serializableTools: SerializableTool[] = subcategoryGroups.flatMap((group) => [
    ...group.liveTools,
    ...group.plannedTools,
  ]).map((tool) => ({
    id: tool.id,
    title: tool.title,
    shortDescription: tool.shortDescription,
    path: tool.path,
    category: tool.category,
    status: tool.status,
    keywords: tool.keywords,
  }));

  const breadcrumbs = buildCategoryBreadcrumbs(category);

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <div className="flex items-start justify-between gap-10">
        <PageHeader
          variant="hub"
          title={category.title}
          description={category.description}
          categorySlug={accentSlug}
          className="min-w-0 flex-1"
          meta={
            <>
              <CategoryBadge categorySlug={accentSlug} title={category.title} />
              <span className="tabular-nums">{stats.live} live · {stats.total} total</span>
            </>
          }
        />
        <CategoryHubVisual categorySlug={accentSlug} title={category.title} />
      </div>

      <Section spacing="default" className="surface-panel border border-border p-5 shadow-xs sm:p-6">
        <ToolSearch tools={serializableTools} placeholder={`Search ${category.title.toLowerCase()}…`} />
      </Section>

      {stats.live > 0 && (
        <Section title="Featured tools" description="The high-traffic ones in this category.">
          <div className="rule-list border border-border bg-card">
            <ToolGrid tools={getFeaturedToolsForCategory(category.slug)} layout="list" columns="2" />
          </div>
        </Section>
      )}

      {categoryGuides.length > 0 && (
        <CategoryGuidesSection guides={categoryGuides} className="mt-10" />
      )}

      {categoryResources.length > 0 && (
        <CategoryResourcesSection resources={categoryResources} className="mt-10" />
      )}

      {category.intro && (
        <Section title={`About ${category.title.toLowerCase()}`} spacing="tight">
          <p className="max-w-3xl text-muted">{category.intro}</p>
          {category.useCases && category.useCases.length > 0 && (
            <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm text-muted">
              {category.useCases.map((useCase) => (
                <li key={useCase}>{useCase}</li>
              ))}
            </ul>
          )}
        </Section>
      )}

      <Section title="Subcategories" description="Drill in by use case.">
        <ul className="rule-list border border-border bg-card">
          {subcategoryGroups.map(({ subcategory, liveTools, plannedTools }) => {
            const subcategoryPath = `/${category.slug}/${subcategory.id}/`;
            const previewTools = liveTools.slice(0, 3);

            return (
              <li key={subcategory.id}>
                <div className="rule-row px-5">
                  <Link href={subcategoryPath} className="group block">
                    <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-accent">
                      {subcategory.title}
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-muted">{subcategory.description}</p>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-wide tabular-nums text-muted">
                      {liveTools.length} live
                      {plannedTools.length > 0 && ` · ${plannedTools.length} planned`}
                    </p>
                  </Link>
                  {previewTools.length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 border-t border-border pt-3">
                      {previewTools.map((tool) => (
                        <li key={tool.id}>
                          <Link
                            href={tool.path}
                            className="text-sm text-foreground hover:text-accent hover:underline"
                          >
                            {tool.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </Section>

      {relatedCategories.length > 0 && (
        <Section title="Related categories" description="More toolboxes you might need.">
          <div className="rule-list border border-border bg-card">
            {relatedCategories.slice(0, 6).map((relatedCategory) => {
              const relatedStats = getCategoryStats(relatedCategory.slug);
              return (
                <CategoryCard
                  key={relatedCategory.id}
                  category={relatedCategory}
                  toolCount={relatedStats.total}
                  liveCount={relatedStats.live}
                />
              );
            })}
          </div>
        </Section>
      )}
    </>
  );
};
