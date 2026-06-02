import { AboutPageLayout } from "@/components/about/AboutPageLayout";
import { buildAboutMetadata } from "@/lib/seo/metadata";

export const metadata = buildAboutMetadata();

export default function AboutPage() {
  return <AboutPageLayout />;
}
