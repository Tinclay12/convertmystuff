import { CategoryGuidesSection } from "@/components/guides/CategoryGuidesSection";
import { CategoryResourcesSection } from "@/components/resources/CategoryResourcesSection";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { ToolGrid } from "@/components/tools/ToolGrid";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/sections/Section";
import { CategoryStrip } from "@/components/sections/CategoryStrip";
import { FeaturePill } from "@/components/ui/FeaturePill";
import { ToolSearch, type SerializableTool } from "@/components/tools/ToolSearch";
import { JsonLd } from "@/components/seo/JsonLd";
import { Lightning, Lock, Sparkle } from "@phosphor-icons/react/dist/ssr";
import { buildWebPageSchema } from "@/lib/seo/schema";
import {
  getAllCategories,
  getAllTools,
  getAllGuides,
  getAllResources,
  getCategoryStats,
  getFeaturedConverters,
  getPopularTools,
  getRegistryStats,
  isCategoryVisible,
} from "@/lib/tools/access";

export default function HomePage() {
  const categories = getAllCategories().filter((category) =>
    isCategoryVisible(category.slug),
  );
  const popularTools = getPopularTools(6);
  const featuredConverters = getFeaturedConverters(6);
  const registryStats = getRegistryStats();
  const featuredGuides = getAllGuides().slice(0, 4);
  const featuredResources = getAllResources().slice(0, 4);
  const allTools: SerializableTool[] = getAllTools()
    .filter((tool) => tool.status === "published" || tool.status === "planned" || tool.status === "stub")
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
          "ConvertMyStuff - Free Online Converters and Calculators",
          "Convert data, units, files, and text with free online tools. Fast, useful, and no login required.",
          "/",
        )}
      />

      <PageHeader
        variant="home"
        title="Convert anything, in your browser."
        description={`${registryStats.live} free converters, calculators, and utilities. No upload, no account, no nonsense.`}
        features={
          <>
            <FeaturePill
              variant="primary"
              icon={<Lightning size={12} weight="fill" aria-hidden="true" />}
            >
              Runs locally
            </FeaturePill>
            <FeaturePill
              variant="success"
              icon={<Lock size={12} weight="fill" aria-hidden="true" />}
            >
              Private by default
            </FeaturePill>
            <FeaturePill
              variant="neutral"
              icon={<Sparkle size={12} weight="fill" aria-hidden="true" />}
            >
              Free forever
            </FeaturePill>
          </>
        }
      />

      <Section spacing="default" className="surface-panel border border-border p-5 shadow-xs sm:p-6">
        <ToolSearch
          tools={allTools}
          showCategory
          placeholder={`Search ${registryStats.total}+ tools…`}
        />
      </Section>

      <Section title="Jump to a category" description="Pick the toolbox you need." spacing="default">
        <CategoryStrip categories={categories} />
      </Section>

      <Section
        title="Popular converters"
        description="The fast ones people actually use every day."
        spacing="default"
        href="/converters/"
        linkLabel="All converters"
      >
        <div className="rule-list border border-border bg-card">
          <ToolGrid tools={featuredConverters} layout="list" />
        </div>
      </Section>

      <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-start">
        <Section
          title="Categories"
          description="Every toolbox, organized."
          spacing="tight"
          href="/tools/"
          linkLabel="Full index"
        >
          <div className="rule-list border border-border bg-card">
            {categories.map((category) => {
              const stats = getCategoryStats(category.slug);
              return (
                <CategoryCard
                  key={category.id}
                  category={category}
                  toolCount={stats.total}
                  liveCount={stats.live}
                />
              );
            })}
          </div>
        </Section>

        <Section title="Popular" description="Most-used tools this week." spacing="tight">
          <div className="rule-list border border-border bg-card">
            <ToolGrid tools={popularTools} layout="list" />
          </div>
        </Section>
      </div>

      {featuredGuides.length > 0 && (
        <CategoryGuidesSection guides={featuredGuides} className="mt-16" />
      )}

      {featuredResources.length > 0 && (
        <CategoryResourcesSection resources={featuredResources} className="mt-16" />
      )}
    </>
  );
}
