import { ConvertersHubPageClient } from "@/components/pages/ConvertersHubPageClient";
import { buildConvertersIndexMetadata } from "@/lib/seo/metadata";

export const metadata = buildConvertersIndexMetadata();

export default function ConvertersHubPage() {
  return <ConvertersHubPageClient />;
}
