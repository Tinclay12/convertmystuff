import Link from "next/link";
import { ToolGrid } from "@/components/tools/ToolGrid";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/sections/Section";
import { ToolSearch, type SerializableTool } from "@/components/tools/ToolSearch";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildWebPageSchema } from "@/lib/seo/schema";
import {
  getConverterToolsGrouped,
  getConverterTools,
  isLiveTool,
  isPlannedTool,
} from "@/lib/tools/access";

export const ConvertersHubPageClient = () => {
  const groups = getConverterToolsGrouped();
  const allConverters: SerializableTool[] = getConverterTools()
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
          "All Converters - ConvertMyStuff",
          "Browse free online converters for data formats, units, images, documents, and materials.",
          "/converters/",
        )}
      />

      <PageHeader
        variant="article"
        title="All converters"
        description="Convert data, units, files, and text — every converter on ConvertMyStuff in one place."
      />

      <Section spacing="default" className="surface-panel border border-border p-5 shadow-xs sm:p-6">
        <ToolSearch
          tools={allConverters}
          showCategory
          placeholder="Search converters…"
          gridClassName="lg:grid-cols-3"
        />
      </Section>

      <div className="mt-12 space-y-12">
        {groups.map(({ label, tools }) => (
          <Section key={label} title={label}>
            <div className="rule-list border border-border bg-card">
              <ToolGrid tools={tools.filter(isLiveTool)} layout="list" columns="2" />
            </div>
          </Section>
        ))}
      </div>

      <Section title="Related hubs" spacing="default">
        <ul className="flex flex-wrap gap-3 text-sm">
          <li>
            <Link href="/developer-tools/" className="font-medium text-accent hover:underline">
              Developer tools
            </Link>
          </li>
          <li>
            <Link href="/unit-converters/" className="font-medium text-accent hover:underline">
              Unit converters
            </Link>
          </li>
          <li>
            <Link href="/image-tools/" className="font-medium text-accent hover:underline">
              Image tools
            </Link>
          </li>
          <li>
            <Link href="/document-tools/" className="font-medium text-accent hover:underline">
              Document tools
            </Link>
          </li>
        </ul>
      </Section>
    </>
  );
};
