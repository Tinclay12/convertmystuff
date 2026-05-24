import { AllToolsPageClient } from "@/components/pages/AllToolsPageClient";
import { buildToolsIndexMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildToolsIndexMetadata();

type AllToolsPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function AllToolsPage({ searchParams }: AllToolsPageProps) {
  const params = await searchParams;
  return <AllToolsPageClient initialQuery={params.q ?? ""} />;
};
