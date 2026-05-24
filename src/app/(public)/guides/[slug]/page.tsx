import { notFound } from "next/navigation";
import { GuidePageLayout } from "@/components/guides/GuidePageLayout";
import { buildGuideMetadata } from "@/lib/seo/metadata";
import { getAllGuides, getGuideBySlug } from "@/lib/content/guides";

type GuidePageProps = {
  params: Promise<{ slug: string }>;
};

export const generateStaticParams = () => {
  return getAllGuides().map((guide) => ({ slug: guide.slug }));
};

export const generateMetadata = async ({ params }: GuidePageProps) => {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) {
    return {};
  }
  return buildGuideMetadata(guide);
};

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  return <GuidePageLayout guide={guide} />;
}
