import { notFound } from "next/navigation";
import { ResourcePageLayout } from "@/components/resources/ResourcePageLayout";
import { getResourceBySlug, getResourceStaticParams } from "@/lib/content/resources";
import { buildResourceMetadata } from "@/lib/seo/metadata";

type ResourceArticlePageProps = {
  params: Promise<{ category: string; slug: string }>;
};

export const generateStaticParams = () => {
  return getResourceStaticParams();
};

export const generateMetadata = async ({ params }: ResourceArticlePageProps) => {
  const { category, slug } = await params;
  const resource = getResourceBySlug(category, slug);
  if (!resource) {
    return {};
  }
  return buildResourceMetadata(resource);
};

export default async function ResourceArticlePage({ params }: ResourceArticlePageProps) {
  const { category, slug } = await params;
  const resource = getResourceBySlug(category, slug);

  if (!resource) {
    notFound();
  }

  return <ResourcePageLayout resource={resource} />;
}
