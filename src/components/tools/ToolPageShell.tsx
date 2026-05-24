import { AdSlot } from "@/components/ads/AdSlot";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { ToolStatusBadge } from "@/components/ui/ToolStatusBadge";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/sections/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/tools/Breadcrumbs";
import { ToolContentBlocks, ToolGuideBanner } from "@/components/tools/ToolContentBlocks";
import { ToolResourcesSection } from "@/components/resources/ToolResourcesSection";
import { getPrimaryResourcesForTool } from "@/lib/content/resources";
import { ToolExampleChips } from "@/components/tools/ToolExampleChips";
import { RelatedToolsGrid } from "@/components/tools/RelatedToolsGrid";
import { ToolWorkflowLinks } from "@/components/tools/ToolWorkflowLinks";
import { Card } from "@/components/ui/Card";
import {
  buildBreadcrumbSchema,
  buildToolFaqSchema,
  buildHowToSchema,
  buildToolBreadcrumbs,
  buildToolSchema,
  buildWebPageSchema,
} from "@/lib/seo/schema";
import { getResolvedToolLinkGroups, isLiveTool } from "@/lib/tools/access";
import { isTierCContent } from "@/lib/content/merge-tool-content";
import type { CategoryDefinition, ToolDefinition } from "@/lib/tools/types";

type ToolPageShellProps = {
  tool: ToolDefinition;
  category: CategoryDefinition;
  relatedTools: ToolDefinition[];
  children: React.ReactNode;
};

export const ToolPageShell = ({
  tool,
  category,
  relatedTools,
  children,
}: ToolPageShellProps) => {
  const breadcrumbs = buildToolBreadcrumbs(tool, category);
  const faqSchema = buildToolFaqSchema(tool);
  const howToSchema = isTierCContent(tool) ? buildHowToSchema(tool) : null;
  const accentSlug = category.accentSlug ?? category.slug;
  const workflowLinkGroups = getResolvedToolLinkGroups(tool);
  const hasWorkflowLinks = workflowLinkGroups.length > 0;
  const workflowToolIds = new Set(
    workflowLinkGroups.flatMap((group) => group.tools.map((t) => t.id)),
  );
  const supplementalRelatedTools = relatedTools.filter((t) => !workflowToolIds.has(t.id));
  const resourceReferences =
    tool.resourceSlugs ??
    getPrimaryResourcesForTool(tool.id).map(
      (resource) => `${resource.categorySlug}/${resource.slug}`,
    );
  const schema = [
    buildWebPageSchema(tool.title, tool.shortDescription, tool.path, {
      dateModified: tool.lastReviewed,
    }),
    ...(isLiveTool(tool) ? [buildToolSchema(tool)] : []),
    buildBreadcrumbSchema(breadcrumbs),
    ...(faqSchema ? [faqSchema] : []),
    ...(howToSchema ? [howToSchema] : []),
  ];

  return (
    <article>
      <JsonLd data={schema} />
      <Breadcrumbs items={breadcrumbs} />

      <PageHeader
        variant="tool"
        title={tool.title}
        description={tool.shortDescription}
        categorySlug={accentSlug}
        meta={
          <>
            <CategoryBadge categorySlug={accentSlug} title={category.title} />
            {!isLiveTool(tool) && <ToolStatusBadge status={tool.status} />}
          </>
        }
      />

      <ToolExampleChips tool={tool} categorySlug={accentSlug} className="mt-4" />

      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_220px]">
        <div>
          <Card variant="default" className="p-5 sm:p-7">
            {children}
          </Card>

          <AdSlot placement="below-tool" />

          {tool.guideSlug && (
            <ToolGuideBanner guideSlug={tool.guideSlug} toolId={tool.id} />
          )}

          {resourceReferences.length > 0 && (
            <ToolResourcesSection resourceSlugs={resourceReferences} toolId={tool.id} />
          )}

          {tool.explanation && (
            <ContentSection title="What this tool does">
              <p className="text-muted">{tool.explanation}</p>
            </ContentSection>
          )}

          {tool.howToUse && tool.howToUse.length > 0 && (
            <ContentSection title="How to use">
              <ol className="list-decimal space-y-2 pl-5 text-muted">
                {tool.howToUse.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </ContentSection>
          )}

          {tool.formula && (
            <ContentSection title="Formula">
              <p className="rounded-xl border border-border bg-background-subtle px-4 py-3 font-mono text-sm text-foreground">
                {tool.formula}
              </p>
            </ContentSection>
          )}

          {tool.examples && tool.examples.length > 0 && (
            <ContentSection title="Examples">
              <div className="space-y-3">
                {tool.examples.map((example) => (
                  <Card key={example.title} className="p-4">
                    <h3 className="font-medium text-foreground">{example.title}</h3>
                    <p className="mt-2 text-sm text-muted">
                      <span className="font-medium text-foreground">Input:</span>{" "}
                      {example.input}
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      <span className="font-medium text-foreground">Output:</span>{" "}
                      {example.output}
                    </p>
                    {example.explanation && (
                      <p className="mt-2 text-sm text-muted">{example.explanation}</p>
                    )}
                  </Card>
                ))}
              </div>
            </ContentSection>
          )}

          {tool.contentBlocks && tool.contentBlocks.length > 0 && (
            <ToolContentBlocks
              blocks={tool.contentBlocks}
              toolId={tool.id}
              showInContentAd={isTierCContent(tool)}
            />
          )}

          {tool.assumptions && tool.assumptions.length > 0 && (
            <ContentSection title="Assumptions">
              <ul className="list-disc space-y-2 pl-5 text-muted">
                {tool.assumptions.map((assumption) => (
                  <li key={assumption}>{assumption}</li>
                ))}
              </ul>
            </ContentSection>
          )}

          {tool.commonUseCases && tool.commonUseCases.length > 0 && (
            <ContentSection title="Common use cases">
              <ul className="list-disc space-y-2 pl-5 text-muted">
                {tool.commonUseCases.map((useCase) => (
                  <li key={useCase}>{useCase}</li>
                ))}
              </ul>
            </ContentSection>
          )}

          {tool.faqs && tool.faqs.length > 0 && (
            <ContentSection title="FAQ">
              <div className="space-y-3">
                {tool.faqs.map((faq) => (
                  <Card key={faq.question} className="p-4">
                    <h3 className="font-medium text-foreground">{faq.question}</h3>
                    <p className="mt-2 text-sm text-muted">{faq.answer}</p>
                  </Card>
                ))}
              </div>
            </ContentSection>
          )}

          {tool.sourceNotes && tool.sourceNotes.length > 0 && (
            <ContentSection title="Source notes">
              <ul className="list-disc space-y-2 pl-5 text-muted">
                {tool.sourceNotes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </ContentSection>
          )}

          {hasWorkflowLinks && (
            <ToolWorkflowLinks groups={workflowLinkGroups} toolId={tool.id} />
          )}

          {supplementalRelatedTools.length > 0 && (
            <RelatedToolsGrid
              tools={supplementalRelatedTools}
              title={hasWorkflowLinks ? "More related tools" : undefined}
            />
          )}

          {!hasWorkflowLinks && supplementalRelatedTools.length === 0 && (
            <RelatedToolsGrid tools={relatedTools} />
          )}

          <p className="mt-10 text-sm text-muted">Last reviewed: {tool.lastReviewed}</p>
        </div>

        <aside className="hidden lg:block">
          <AdSlot placement="tool-sidebar" />
        </aside>
      </div>
    </article>
  );
};

const ContentSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <Section title={title} spacing="tight" className="mt-8">
      {children}
    </Section>
  );
};

export const ToolPageLayout = ToolPageShell;
