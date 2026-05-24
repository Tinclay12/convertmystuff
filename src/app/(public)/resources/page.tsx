import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader } from "@/components/sections/PageHeader";
import { FeaturePill } from "@/components/ui/FeaturePill";
import { StatPill } from "@/components/ui/StatPill";
import { Breadcrumbs } from "@/components/tools/Breadcrumbs";
import { resourceCategories } from "@/lib/content/resources/categories";
import { getAllResources, getResourceCategoryPath, getResourcesForCategory } from "@/lib/content/resources";
import { buildResourcesIndexMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { getToolById } from "@/lib/tools/access";
import { cn } from "@/lib/utils/cn";

export const metadata = buildResourcesIndexMetadata();

export default function ResourcesIndexPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Resources", href: "/resources/" },
  ];

  const categoriesWithArticles = resourceCategories.filter(
    (category) => getResourcesForCategory(category.slug).length > 0,
  );

  return (
    <>
      <JsonLd
        data={[
          buildWebPageSchema(
            "Resource Library",
            "Structured explainers on conversions, formats, formulas, and workflows linked to ConvertMyStuff tools.",
            "/resources/",
          ),
          buildBreadcrumbSchema(breadcrumbs),
        ]}
      />
      <Breadcrumbs items={breadcrumbs} />

      <PageHeader
        variant="resource"
        heroScope="index"
        title="Resource Library"
        description="Practical explainers on the concepts behind our converters and calculators—not generic blog posts. Each article answers a real question and links to a free tool you can use immediately."
        features={
          <>
            <FeaturePill variant="accent">Quick answers</FeaturePill>
            <FeaturePill variant="primary">Tool-linked</FeaturePill>
            <FeaturePill variant="neutral">By category</FeaturePill>
          </>
        }
        actions={
          <>
            <StatPill value={String(getAllResources().length)} label="Articles" />
            <StatPill
              value={String(categoriesWithArticles.length)}
              label="Categories"
              accentClassName="bg-accent-soft text-accent border-accent/20"
            />
          </>
        }
      />

      <div className="mt-10 space-y-10">
        {categoriesWithArticles.map((category) => {
          const articles = getResourcesForCategory(category.slug);

          return (
            <section key={category.slug} aria-labelledby={`resource-category-${category.slug}`}>
              <div className="flex flex-wrap items-end justify-between gap-3 border-b border-border pb-3">
                <div>
                  <h2
                    id={`resource-category-${category.slug}`}
                    className="font-display text-2xl font-semibold text-foreground"
                  >
                    <Link
                      href={getResourceCategoryPath(category.slug)}
                      className="hover:text-accent"
                    >
                      {category.title}
                    </Link>
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm text-muted">{category.description}</p>
                </div>
                <Link
                  href={getResourceCategoryPath(category.slug)}
                  className="text-sm font-medium text-accent hover:underline"
                >
                  View all ({articles.length})
                </Link>
              </div>

              <ul
                className={cn(
                  "rule-list mt-4 surface-panel border border-border shadow-sm",
                  "[&_.rule-row]:px-6 [&_.rule-row]:sm:px-10",
                )}
              >
                {articles.map((resource) => {
                  const primaryTool = getToolById(resource.primaryToolId);
                  return (
                    <li key={resource.slug}>
                      <Link
                        href={`/resources/${resource.categorySlug}/${resource.slug}/`}
                        className="rule-row block"
                      >
                        <h3 className="font-display text-lg font-semibold text-foreground hover:text-accent">
                          {resource.title}
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted">
                          {resource.summary}
                        </p>
                        {primaryTool && (
                          <p className="type-label mt-2 text-muted">
                            Related tool: {primaryTool.title}
                          </p>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>

      <p className="mt-10 text-sm text-muted">
        {getAllResources().length} articles across {categoriesWithArticles.length} categories.
      </p>
    </>
  );
}
