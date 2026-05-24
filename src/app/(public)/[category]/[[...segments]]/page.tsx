import { Suspense } from "react";
import { notFound } from "next/navigation";
import { CategoryHubPage } from "@/components/pages/CategoryHubPage";
import { SubcategoryHubPage } from "@/components/pages/SubcategoryHubPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { ComingSoonToolPanel } from "@/components/tools/ComingSoonToolPanel";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { ToolRenderer } from "@/components/tools/ToolRenderer";
import {
  buildCategoryMetadata,
  buildSubcategoryMetadata,
  buildToolMetadata,
} from "@/lib/seo/metadata";
import {
  buildBreadcrumbSchema,
  buildCategoryBreadcrumbs,
  buildItemListSchema,
  buildWebPageSchema,
} from "@/lib/seo/schema";
import {
  buildRouteParams,
  getCategoryBySlug,
  getCategoryListingTools,
  getFeaturedToolsForCategory,
  getEnrichedToolBySegments,
  getRelatedTools,
  getToolBySegments,
  getToolsForSubcategory,
  isLiveTool,
  isPlannedTool,
  isSubcategorySegment,
} from "@/lib/tools/access";
import { getSubcategoryById } from "@/lib/tools/subcategories";
import { isToolComponentAvailable } from "@/lib/tools/component-map";

type CategoryPageProps = {
  params: Promise<{
    category: string;
    segments?: string[];
  }>;
};

export const generateStaticParams = () => {
  return buildRouteParams();
};

export const generateMetadata = async ({ params }: CategoryPageProps) => {
  const { category: categorySlug, segments = [] } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return {};
  }

  if (segments.length === 1 && isSubcategorySegment(categorySlug, segments[0])) {
    const subcategory = getSubcategoryById(categorySlug, segments[0]);
    if (!subcategory) {
      return {};
    }

    return buildSubcategoryMetadata(
      category.title,
      subcategory.title,
      subcategory.description,
      `/${categorySlug}/${segments[0]}/`,
      categorySlug,
    );
  }

  if (segments.length > 0) {
    const tool = getToolBySegments(categorySlug, segments);
    if (!tool) {
      return {};
    }

    return buildToolMetadata(tool, category);
  }

  return buildCategoryMetadata(category);
};

export default async function CategoryOrToolPage({ params }: CategoryPageProps) {
  const { category: categorySlug, segments = [] } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  if (segments.length === 0) {
    if (getCategoryListingTools(categorySlug).length === 0) {
      notFound();
    }

    const breadcrumbs = buildCategoryBreadcrumbs(category);
    const featuredTools = getFeaturedToolsForCategory(categorySlug);

    return (
      <>
        <JsonLd
          data={[
            buildWebPageSchema(category.title, category.description, category.path),
            buildBreadcrumbSchema(breadcrumbs),
            ...(featuredTools.length > 0
              ? [buildItemListSchema(`${category.title} tools`, featuredTools)]
              : []),
          ]}
        />
        <CategoryHubPage category={category} />
      </>
    );
  }

  if (segments.length === 1 && isSubcategorySegment(categorySlug, segments[0])) {
    const subcategory = getSubcategoryById(categorySlug, segments[0]);
    if (!subcategory) {
      notFound();
    }

    const { liveTools, plannedTools } = getToolsForSubcategory(categorySlug, segments[0]);
    if (liveTools.length === 0 && plannedTools.length === 0) {
      notFound();
    }

    const path = `/${categorySlug}/${segments[0]}/`;
    const breadcrumbs = [
      { label: "Home", href: "/" },
      { label: category.title, href: category.path },
      { label: subcategory.title, href: path },
    ];

    return (
      <>
        <JsonLd
          data={[
            buildWebPageSchema(subcategory.title, subcategory.description, path),
            buildBreadcrumbSchema(breadcrumbs),
            ...(liveTools.length > 0
              ? [buildItemListSchema(`${subcategory.title} tools`, liveTools)]
              : []),
          ]}
        />
        <SubcategoryHubPage
          category={category}
          subcategory={subcategory}
          liveTools={liveTools}
          plannedTools={plannedTools}
        />
      </>
    );
  }

  const tool = getEnrichedToolBySegments(categorySlug, segments);

  if (!tool) {
    notFound();
  }

  const relatedTools = getRelatedTools(tool.id);
  const accentSlug = category.accentSlug ?? category.slug;

  if (isPlannedTool(tool)) {
    return (
      <ToolPageLayout tool={tool} category={category} relatedTools={relatedTools}>
        <ComingSoonToolPanel tool={tool} categorySlug={accentSlug} />
      </ToolPageLayout>
    );
  }

  if (!isLiveTool(tool)) {
    notFound();
  }

  if (!isToolComponentAvailable(tool.componentKey)) {
    notFound();
  }

  return (
    <ToolPageLayout tool={tool} category={category} relatedTools={relatedTools}>
      <Suspense fallback={null}>
        <ToolRenderer componentKey={tool.componentKey} toolId={tool.id} />
      </Suspense>
    </ToolPageLayout>
  );
}
