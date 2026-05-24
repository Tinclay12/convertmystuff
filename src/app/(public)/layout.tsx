import type { ReactNode } from "react";
import { AnalyticsPlaceholder } from "@/components/analytics/AnalyticsPlaceholder";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildHomeMetadata } from "@/lib/seo/metadata";
import { buildOrganizationSchema, buildWebSiteSchema } from "@/lib/seo/schema";

export const metadata = buildHomeMetadata();

type PublicLayoutProps = {
  children: ReactNode;
};

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <>
      <JsonLd data={[buildOrganizationSchema(), buildWebSiteSchema()]} />
      <AnalyticsPlaceholder />
      <SiteLayout>{children}</SiteLayout>
    </>
  );
}
