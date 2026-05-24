import Link from "next/link";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { ToolGrid } from "@/components/tools/ToolGrid";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/sections/Section";
import { ToolSearch, type SerializableTool } from "@/components/tools/ToolSearch";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildWebPageSchema } from "@/lib/seo/schema";
import {
  getAllToolsGroupedByCategory,
  getAllTools,
  getRegistryStats,
  isLiveTool,
  isPlannedTool,
} from "@/lib/tools/access";

type AllToolsPageClientProps = {
  initialQuery?: string;
};

export const AllToolsPageClient = ({ initialQuery = "" }: AllToolsPageClientProps) => {
  const groupedTools = getAllToolsGroupedByCategory();
  const stats = getRegistryStats();
  const allTools: SerializableTool[] = getAllTools()
    .filter((tool) => isLiveTool(tool) || isPlannedTool(tool))
    .map((tool) => ({
      id: tool.id,
      title: tool.title,
      shortDescription: tool.shortDescription,
      path: tool.path,
      category: tool.category,
      status: tool.status,
      keywords: tool.keywords,
    }));

  return (
    <>
      <JsonLd
        data={buildWebPageSchema(
          "All Tools - ConvertMyStuff",
          "Browse all free online converters, calculators, and utility tools.",
          "/tools/",
        )}
      />

      <PageHeader
        variant="article"
        title="All tools"
        description={`${stats.live} live · ${stats.planned} planned · ${stats.total} total in the registry.`}
      />

      <Section spacing="default" className="surface-panel border border-border p-5 shadow-xs sm:p-6">
        <ToolSearch
          tools={allTools}
          showCategory
          initialQuery={initialQuery}
          placeholder={`Search ${stats.total}+ tools…`}
          gridClassName="lg:grid-cols-3"
        />
      </Section>

      <div className="mt-12 space-y-12">
        {groupedTools.map(({ category, tools }) => {
          const accentSlug = category.accentSlug ?? category.slug;
          const liveTools = tools.filter((tool) => isLiveTool(tool));
          const plannedTools = tools.filter((tool) => isPlannedTool(tool));

          return (
            <Section
              key={category.id}
              title={category.title}
              description={category.description}
              href={category.path}
              linkLabel="View category"
            >
              <div className="mb-4">
                <CategoryBadge categorySlug={accentSlug} title={`${liveTools.length} live`} />
              </div>
              {liveTools.length > 0 && (
                <div className="rule-list border border-border bg-card">
                  <ToolGrid tools={liveTools} layout="list" columns="2" />
                </div>
              )}
              {plannedTools.length > 0 && (
                <div className="mt-6">
                  <p className="mb-3 text-xs font-medium uppercase tracking-wide text-planned">
                    Planned
                  </p>
                  <div className="rule-list border border-border bg-card">
                    <ToolGrid tools={plannedTools} layout="list" columns="2" />
                  </div>
                </div>
              )}
            </Section>
          );
        })}
      </div>

      <p className="mt-12 text-center text-sm text-muted">
        <Link href="/" className="font-medium text-accent hover:underline">
          Back to homepage
        </Link>
      </p>
    </>
  );
};
