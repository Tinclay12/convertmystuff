"use client";

import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/sections/Section";
import { Breadcrumbs } from "@/components/tools/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { Card } from "@/components/ui/Card";
import { trackContentEvent } from "@/lib/analytics/content-events";
import { getGuidePath } from "@/lib/content/merge-tool-content";
import type { GuideDefinition } from "@/lib/content/types";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildGuideBreadcrumbs,
  buildGuideWebPageSchema,
} from "@/lib/seo/schema";
import { getGuideBySlug, getCategoryBySlug, getToolById } from "@/lib/tools/access";
import type { ToolDefinition } from "@/lib/tools/types";

type GuidePageLayoutProps = {
  guide: GuideDefinition;
};

export const GuidePageLayout = ({ guide }: GuidePageLayoutProps) => {
  const primaryTool = getToolById(guide.primaryToolId);
  const categorySlug = guide.categorySlug ?? primaryTool?.category;
  const category = categorySlug ? getCategoryBySlug(categorySlug) : undefined;
  const relatedTools = (guide.relatedToolIds ?? [])
    .map((id) => getToolById(id))
    .filter((tool): tool is ToolDefinition => Boolean(tool));

  const relatedGuides = (guide.relatedGuideSlugs ?? [])
    .map((slug) => getGuideBySlug(slug))
    .filter((item): item is GuideDefinition => Boolean(item));

  const breadcrumbs = buildGuideBreadcrumbs(guide);
  const faqSchema = buildFaqSchema(guide.faqs);
  const schema = [
    buildGuideWebPageSchema(guide, primaryTool),
    buildBreadcrumbSchema(breadcrumbs),
    ...(faqSchema ? [faqSchema] : []),
  ];

  const handleToolClick = (toolId: string) => {
    trackContentEvent("content_tool_link_click", {
      guide_slug: guide.slug,
      link_target: toolId,
    });
  };

  return (
    <article>
      <JsonLd data={schema} />
      <Breadcrumbs items={breadcrumbs} />

      <PageHeader
        variant="guide"
        heroScope="detail"
        categorySlug={categorySlug}
        title={guide.title}
        description={guide.intro}
        meta={
          <>
            {category && categorySlug && (
              <CategoryBadge categorySlug={categorySlug} title={category.title} />
            )}
            {primaryTool && <span>Includes {primaryTool.title}</span>}
          </>
        }
      />

      {primaryTool && (
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-accent/15 bg-accent-soft/50 px-6 py-4 sm:px-8 lg:sticky lg:top-24 lg:z-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">Try the tool</p>
            <p className="mt-1 text-sm text-foreground">
              Use our free {primaryTool.title.toLowerCase()} with this guide.
            </p>
          </div>
          <Link href={primaryTool.path} onClick={() => handleToolClick(primaryTool.id)}>
            <Button>Open {primaryTool.title}</Button>
          </Link>
        </div>
      )}

      <div className="mt-8 max-w-3xl space-y-8 px-1 sm:px-2">
        {guide.sections.map((section) => {
          const sectionTools = (section.linkedToolIds ?? [])
            .map((id) => getToolById(id))
            .filter((tool): tool is ToolDefinition => Boolean(tool));

          return (
            <section key={section.id} aria-labelledby={`guide-section-${section.id}`}>
              <h2
                id={`guide-section-${section.id}`}
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
      </div>

      {relatedGuides.length > 0 && (
        <Section title="Related guides">
          <ul className="rule-list border border-border bg-card">
            {relatedGuides.map((relatedGuide) => (
              <li key={relatedGuide.slug}>
                <Link
                  href={getGuidePath(relatedGuide.slug)}
                  onClick={() =>
                    trackContentEvent("guide_click", {
                      guide_slug: guide.slug,
                      link_target: relatedGuide.slug,
                    })
                  }
                  className="rule-row block px-5"
                >
                  <span className="font-medium text-foreground">{relatedGuide.title}</span>
                  <span className="mt-1 block text-sm text-muted line-clamp-2">
                    {relatedGuide.intro}
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

      {guide.faqs && guide.faqs.length > 0 && (
        <Section title="Frequently asked questions">
          <div className="space-y-3">
            {guide.faqs.map((faq) => (
              <Card key={faq.question} className="p-5">
                <h3 className="font-medium text-foreground">{faq.question}</h3>
                <p className="mt-2 text-sm text-muted">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </Section>
      )}

      {guide.disclaimer && (
        <p className="mt-10 rounded-2xl border border-border bg-background-subtle px-4 py-3 text-sm text-muted">
          {guide.disclaimer}
        </p>
      )}

      <p className="mt-10 text-sm text-muted">Last reviewed: {guide.lastReviewed}</p>
    </article>
  );
};
