import Link from "next/link";
import { CategoryGuidesSection } from "@/components/guides/CategoryGuidesSection";
import { CategoryResourcesSection } from "@/components/resources/CategoryResourcesSection";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { CategoryHubVisual } from "@/components/sections/CategoryHubVisual";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/sections/Section";
import { Breadcrumbs } from "@/components/tools/Breadcrumbs";
import { ToolGrid } from "@/components/tools/ToolGrid";
import { ToolSearch, type SerializableTool } from "@/components/tools/ToolSearch";
import { getCategoryStats, getGuidesForSubcategory, getResourcesForSubcategory } from "@/lib/tools/access";
import { getSubcategoriesForCategory } from "@/lib/tools/subcategories";
import type { CategoryDefinition } from "@/lib/tools/types";
import type { SubcategoryDefinition } from "@/lib/tools/subcategories";
import type { ToolDefinition } from "@/lib/tools/types";

type SubcategoryHubPageProps = {
  category: CategoryDefinition;
  subcategory: SubcategoryDefinition;
  liveTools: ToolDefinition[];
  plannedTools: ToolDefinition[];
};

export const SubcategoryHubPage = ({
  category,
  subcategory,
  liveTools,
  plannedTools,
}: SubcategoryHubPageProps) => {
  const accentSlug = category.accentSlug ?? category.slug;
  const categoryStats = getCategoryStats(category.slug);
  const subcategoryGuides = getGuidesForSubcategory(category.slug, subcategory.id);
  const subcategoryResources = getResourcesForSubcategory(category.slug, subcategory.id);
  const siblingSubcategories = getSubcategoriesForCategory(category.slug).filter(
    (item) => item.id !== subcategory.id,
  );
  const serializableTools: SerializableTool[] = [...liveTools, ...plannedTools].map((tool) => ({
    id: tool.id,
    title: tool.title,
    shortDescription: tool.shortDescription,
    path: tool.path,
    category: tool.category,
    status: tool.status,
    keywords: tool.keywords,
  }));

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: category.title, href: category.path },
    { label: subcategory.title, href: `/${category.slug}/${subcategory.id}/` },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <div className="flex items-start justify-between gap-10">
        <PageHeader
          variant="hub"
          title={subcategory.title}
          description={subcategory.description}
          categorySlug={accentSlug}
          className="min-w-0 flex-1"
          meta={
            <span className="tabular-nums">
              {liveTools.length} live
              {plannedTools.length > 0 && ` · ${plannedTools.length} planned`}
            </span>
          }
        />
        <CategoryHubVisual categorySlug={accentSlug} title={subcategory.title} compact />
      </div>

      {serializableTools.length > 0 && (
        <Section spacing="default" className="surface-panel border border-border p-5 shadow-xs sm:p-6">
          <ToolSearch
            tools={serializableTools}
            placeholder={`Search ${subcategory.title.toLowerCase()}…`}
          />
        </Section>
      )}

      {subcategoryGuides.length > 0 && (
        <CategoryGuidesSection guides={subcategoryGuides} className="mt-8" />
      )}

      {subcategoryResources.length > 0 && (
        <CategoryResourcesSection resources={subcategoryResources} className="mt-8" />
      )}

      {liveTools.length > 0 && (
        <Section title="Live tools">
          <ToolGrid tools={liveTools} layout="list" columns="2" />
        </Section>
      )}

      {plannedTools.length > 0 && (
        <Section title="Planned tools">
          <ToolGrid tools={plannedTools} layout="list" columns="2" />
        </Section>
      )}

      {siblingSubcategories.length > 0 && (
        <Section title="Related subcategories">
          <ul className="rule-list border border-border bg-card">
            {siblingSubcategories.map((item) => (
              <li key={item.id}>
                <Link href={`/${category.slug}/${item.id}/`} className="rule-row block px-5">
                  <p className="font-display font-semibold text-foreground">{item.title}</p>
                  <p className="mt-1 text-sm text-muted">{item.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section title="Browse category">
        <div className="rule-list border border-border bg-card">
          <CategoryCard
            category={category}
            toolCount={categoryStats.total}
            liveCount={categoryStats.live}
          />
        </div>
      </Section>
    </>
  );
};
