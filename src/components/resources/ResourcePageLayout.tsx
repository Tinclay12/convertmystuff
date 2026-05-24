"use client";

import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/sections/Section";
import { Breadcrumbs } from "@/components/tools/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { trackContentEvent } from "@/lib/analytics/content-events";
import {
  getRelatedResources,
  getResourcePath,
} from "@/lib/content/resources";
import type { ResourceDefinition } from "@/lib/content/types";
import {
  buildBreadcrumbSchema,
  buildResourceArticleSchema,
  buildResourceBreadcrumbs,
} from "@/lib/seo/schema";
import { getCategoryBySlug, getToolById } from "@/lib/tools/access";
import type { ToolDefinition } from "@/lib/tools/types";

type ResourcePageLayoutProps = {
  resource: ResourceDefinition;
};

export const ResourcePageLayout = ({ resource }: ResourcePageLayoutProps) => {
  const primaryTool = getToolById(resource.primaryToolId);
  const category = getCategoryBySlug(resource.categorySlug);
  const relatedTools = (resource.relatedToolIds ?? [])
    .map((id) => getToolById(id))
    .filter((tool): tool is ToolDefinition => Boolean(tool));

  const relatedResources = getRelatedResources(resource);
  const breadcrumbs = buildResourceBreadcrumbs(resource);
  const schema = [
    buildResourceArticleSchema(resource, primaryTool),
    buildBreadcrumbSchema(breadcrumbs),
  ];

  const handleToolClick = (toolId: string) => {
    trackContentEvent("content_tool_link_click", {
      resource_slug: resource.slug,
      link_target: toolId,
    });
  };

  const handleResourceClick = (slug: string) => {
    trackContentEvent("resource_click", {
      resource_slug: resource.slug,
      link_target: slug,
    });
  };

  return (
    <article>
      <JsonLd data={schema} />
      <Breadcrumbs items={breadcrumbs} />

      <PageHeader
        variant="resource"
        heroScope="detail"
        categorySlug={resource.categorySlug}
        title={resource.title}
        description={resource.summary}
        meta={
          <>
            {category && (
              <CategoryBadge categorySlug={resource.categorySlug} title={category.title} />
            )}
            {primaryTool && <span>Related tool: {primaryTool.title}</span>}
          </>
        }
      />

      <Card className="mt-8 p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-accent">Quick answer</p>
        <p className="mt-2 text-base leading-relaxed text-foreground">{resource.quickAnswer}</p>
      </Card>

      {primaryTool && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-accent/15 bg-accent-soft/50 px-6 py-4 sm:px-8 lg:sticky lg:top-24 lg:z-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">Use the tool</p>
            <p className="mt-1 text-sm text-foreground">
              Convert or calculate with our free {primaryTool.title.toLowerCase()}.
            </p>
          </div>
          <Link href={primaryTool.path} onClick={() => handleToolClick(primaryTool.id)}>
            <Button>Open {primaryTool.title}</Button>
          </Link>
        </div>
      )}

      <div className="mt-8 max-w-3xl space-y-8 px-1 sm:px-2">
        <section aria-labelledby="resource-intro">
          <h2 id="resource-intro" className="font-display text-xl font-semibold text-foreground">
            Overview
          </h2>
          <p className="mt-3 text-muted">{resource.intro}</p>
        </section>

        {resource.sections.map((section) => {
          const sectionTools = (section.linkedToolIds ?? [])
            .map((id) => getToolById(id))
            .filter((tool): tool is ToolDefinition => Boolean(tool));

          return (
            <section key={section.id} aria-labelledby={`resource-section-${section.id}`}>
              <h2
                id={`resource-section-${section.id}`}
                className="font-display text-xl font-semibold text-foreground"
              >
                {section.heading}
              </h2>
              <div className="mt-3 space-y-3">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
              {sectionTools.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {sectionTools.map((tool) => (
                    <li key={tool.id}>
                      <Link
                        href={tool.path}
                        onClick={() => handleToolClick(tool.id)}
                        className="text-sm font-medium text-accent underline-offset-4 hover:underline"
                      >
                        {tool.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}

        {resource.examples && resource.examples.length > 0 && (
          <section aria-labelledby="resource-examples">
            <h2 id="resource-examples" className="font-display text-xl font-semibold text-foreground">
              Examples
            </h2>
            <ul className="mt-4 space-y-3">
              {resource.examples.map((example) => (
                <li key={example.title}>
                  <Card className="p-5">
                    <h3 className="font-medium text-foreground">{example.title}</h3>
                    <p className="mt-2 text-sm text-muted">{example.description}</p>
                  </Card>
                </li>
              ))}
            </ul>
          </section>
        )}

        {resource.commonMistakes && resource.commonMistakes.length > 0 && (
          <section aria-labelledby="resource-mistakes">
            <h2
              id="resource-mistakes"
              className="font-display text-xl font-semibold text-foreground"
            >
              Common mistakes and edge cases
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
              {resource.commonMistakes.map((mistake) => (
                <li key={mistake}>{mistake}</li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {relatedResources.length > 0 && (
        <Section title="Related resources">
          <ul className="rule-list border border-border bg-card">
            {relatedResources.map((relatedResource) => (
              <li key={relatedResource.slug}>
                <Link
                  href={getResourcePath(relatedResource.categorySlug, relatedResource.slug)}
                  onClick={() => handleResourceClick(relatedResource.slug)}
                  className="rule-row block px-5"
                >
                  <span className="font-medium text-foreground">{relatedResource.title}</span>
                  <span className="mt-1 block text-sm text-muted line-clamp-2">
                    {relatedResource.summary}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {relatedTools.length > 0 && (
        <Section title="Related tools">
          <ul className="rule-list border border-border bg-card">
            {relatedTools.map((tool) => (
              <li key={tool.id}>
                <Link
                  href={tool.path}
                  onClick={() => handleToolClick(tool.id)}
                  className="rule-row block px-5"
                >
                  <span className="font-medium text-foreground">{tool.title}</span>
                  <span className="mt-1 block text-sm text-muted">{tool.shortDescription}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <p className="mt-10 text-sm text-muted">
        Last reviewed: {resource.lastReviewed}
        {resource.reviewer && ` · Reviewed by ${resource.reviewer}`}
        {!resource.reviewer && resource.author && ` · ${resource.author}`}
      </p>
    </article>
  );
};
