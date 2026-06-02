import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/tools/Breadcrumbs";
import type { LegalPageDefinition } from "@/lib/content/legal";
import { privacyPolicy, termsOfUse } from "@/lib/content/legal";
import { buildBreadcrumbSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { cn } from "@/lib/utils/cn";

type LegalPageLayoutProps = {
  page: LegalPageDefinition;
};

const relatedLegalPage = (slug: LegalPageDefinition["slug"]) => {
  return slug === "privacy" ? termsOfUse : privacyPolicy;
};

const formatLastUpdated = (isoDate: string): string => {
  const date = new Date(`${isoDate}T12:00:00Z`);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
};

export const LegalPageLayout = ({ page }: LegalPageLayoutProps) => {
  const related = relatedLegalPage(page.slug);
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: page.title, href: page.path },
  ];

  return (
    <article>
      <JsonLd
        data={[
          buildWebPageSchema(page.title, page.summary, page.path, {
            dateModified: page.lastUpdated,
          }),
          buildBreadcrumbSchema(breadcrumbs),
        ]}
      />
      <Breadcrumbs items={breadcrumbs} />

      <header className="border-b border-border pb-10">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">Legal</p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {page.title}
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
          {page.summary}
        </p>
        <p className="mt-6 text-sm text-muted">
          Last updated:{" "}
          <time dateTime={page.lastUpdated}>{formatLastUpdated(page.lastUpdated)}</time>
          {" · "}
          <Link href={related.path} className="font-medium text-accent hover:underline">
            {related.title}
          </Link>
        </p>
      </header>

      <nav
        aria-label="On this page"
        className="mt-10 rounded-2xl border border-border bg-card px-6 py-5 sm:px-8"
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">On this page</p>
        <ol className="mt-3 columns-1 gap-x-8 text-sm sm:columns-2">
          {page.sections.map((section) => (
            <li key={section.id} className="mb-2 break-inside-avoid">
              <a href={`#${section.id}`} className="text-muted transition-colors hover:text-accent">
                {section.heading}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-10 max-w-3xl space-y-12">
        {page.sections.map((section) => (
          <section key={section.id} id={section.id} aria-labelledby={`legal-${section.id}`}>
            <h2
              id={`legal-${section.id}`}
              className="font-display text-xl font-semibold text-foreground scroll-mt-28"
            >
              {section.heading}
            </h2>
            <div className="mt-4 space-y-4">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-[15px] leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
            {section.listItems && section.listItems.length > 0 && (
              <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-muted">
                {section.listItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      <footer
        className={cn(
          "mt-14 max-w-3xl rounded-2xl border border-border bg-panel-muted px-6 py-5 text-sm text-muted sm:px-8",
        )}
      >
        <p>
          See also{" "}
          <Link href={related.path} className="font-medium text-accent hover:underline">
            {related.title}
          </Link>
          . This site is operated as a personal project without a dedicated contact channel.
        </p>
      </footer>
    </article>
  );
};
