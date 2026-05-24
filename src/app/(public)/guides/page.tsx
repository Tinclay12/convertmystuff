import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader } from "@/components/sections/PageHeader";
import { FeaturePill } from "@/components/ui/FeaturePill";
import { StatPill } from "@/components/ui/StatPill";
import { Breadcrumbs } from "@/components/tools/Breadcrumbs";
import { buildGuidesIndexMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { getAllGuides } from "@/lib/content/guides";
import { getToolById } from "@/lib/tools/access";
import { cn } from "@/lib/utils/cn";

export const metadata = buildGuidesIndexMetadata();

export default function GuidesIndexPage() {
  const guides = getAllGuides();
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Guides", href: "/guides/" },
  ];

  return (
    <>
      <JsonLd
        data={[
          buildWebPageSchema(
            "Guides",
            "In-depth guides for calculators and converters on ConvertMyStuff.",
            "/guides/",
          ),
          buildBreadcrumbSchema(breadcrumbs),
        ]}
      />
      <Breadcrumbs items={breadcrumbs} />

      <PageHeader
        variant="guide"
        heroScope="index"
        title="Guides"
        description="Deeper explanations for topics covered by our calculators and converters. Each guide links back to a free tool you can use right away."
        features={
          <>
            <FeaturePill variant="accent">Step-by-step</FeaturePill>
            <FeaturePill variant="primary">Linked tools</FeaturePill>
            <FeaturePill variant="neutral">Free to read</FeaturePill>
          </>
        }
        actions={
          <>
            <StatPill value={String(guides.length)} label="Guides" />
            <StatPill
              value="Free"
              label="No login"
              accentClassName="bg-success-bg text-success border-success/20"
            />
          </>
        }
      />

      <ul
        className={cn(
          "rule-list mt-8 surface-panel border border-border shadow-sm",
          "[&_.rule-row]:px-6 [&_.rule-row]:sm:px-10",
        )}
      >
        {guides.map((guide) => {
          const primaryTool = getToolById(guide.primaryToolId);
          return (
            <li key={guide.slug}>
              <Link href={`/guides/${guide.slug}/`} className="rule-row block">
                <h2 className="font-display text-xl font-semibold text-foreground hover:text-accent">
                  {guide.title}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{guide.intro}</p>
                {primaryTool && (
                  <p className="type-label mt-2 text-muted">
                    Includes {primaryTool.title}
                  </p>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
