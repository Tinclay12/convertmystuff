import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader } from "@/components/sections/PageHeader";
import { Breadcrumbs } from "@/components/tools/Breadcrumbs";
import { getResourceCategoryBySlug, resourceCategories } from "@/lib/content/resources/categories";
import { getResourcesForCategory } from "@/lib/content/resources";
import { buildResourceCategoryMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema, buildResourceCategoryBreadcrumbs, buildWebPageSchema } from "@/lib/seo/schema";
import { getCategoryAccent } from "@/lib/theme/category-theme";
import { getToolById } from "@/lib/tools/access";
import { cn } from "@/lib/utils/cn";

type ResourceCategoryPageProps = {
  params: Promise<{ category: string }>;
};

export const generateStaticParams = () => {
  return resourceCategories.map((category) => ({ category: category.slug }));
};

export const generateMetadata = async ({ params }: ResourceCategoryPageProps) => {
  const { category: categorySlug } = await params;
  const category = getResourceCategoryBySlug(categorySlug);
  if (!category) {
    return {};
  }
  return buildResourceCategoryMetadata(category);
};

export default async function ResourceCategoryPage({ params }: ResourceCategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = getResourceCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  const articles = getResourcesForCategory(categorySlug);
  const breadcrumbs = buildResourceCategoryBreadcrumbs(category.title, category.slug);

  return (
    <>
      <JsonLd
        data={[
          buildWebPageSchema(category.title, category.description, `/resources/${category.slug}/`),
          buildBreadcrumbSchema(breadcrumbs),
        ]}
      />
      <Breadcrumbs items={breadcrumbs} />

      <PageHeader
        variant="resource"
        heroScope="detail"
        categorySlug={category.slug}
        title={category.title}
        description={category.description}
        meta={<span>{articles.length} articles</span>}
      />

      {articles.length > 0 ? (
        <ul
          className={cn(
            "rule-list mt-8 surface-panel border border-border shadow-sm",
            "[&_.rule-row]:px-6 [&_.rule-row]:sm:px-10",
          )}
          style={{ borderLeftWidth: "4px", borderLeftColor: getCategoryAccent(category.slug).accent }}
        >
          {articles.map((resource) => {
            const primaryTool = getToolById(resource.primaryToolId);
            return (
              <li key={resource.slug}>
                <Link
                  href={`/resources/${resource.categorySlug}/${resource.slug}/`}
                  className="rule-row block"
                >
                  <h2 className="font-display text-xl font-semibold text-foreground hover:text-accent">
                    {resource.title}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                    {resource.summary}
                  </p>
                  {primaryTool && (
                    <p className="type-label mt-2 text-muted">Related tool: {primaryTool.title}</p>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="mt-8 text-muted">Articles for this category are coming soon.</p>
      )}

      <p className="mt-10">
        <Link href="/resources/" className="text-sm font-medium text-accent hover:underline">
          ← All resources
        </Link>
      </p>
    </>
  );
}
