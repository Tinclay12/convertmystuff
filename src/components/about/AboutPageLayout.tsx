import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/tools/Breadcrumbs";
import { aboutPage } from "@/lib/content/about";
import { buildBreadcrumbSchema, buildWebPageSchema } from "@/lib/seo/schema";

const formatLastUpdated = (isoDate: string): string => {
  const date = new Date(`${isoDate}T12:00:00Z`);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
};

export const AboutPageLayout = () => {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: aboutPage.title, href: aboutPage.path },
  ];

  return (
    <article>
      <JsonLd
        data={[
          buildWebPageSchema(aboutPage.title, aboutPage.summary, aboutPage.path, {
            dateModified: aboutPage.lastUpdated,
          }),
          buildBreadcrumbSchema(breadcrumbs),
        ]}
      />
      <Breadcrumbs items={breadcrumbs} />

      <header className="border-b border-border pb-10">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">About</p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {aboutPage.title}
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
          {aboutPage.summary}
        </p>
        <p className="mt-6 text-sm text-muted">
          Last updated:{" "}
          <time dateTime={aboutPage.lastUpdated}>{formatLastUpdated(aboutPage.lastUpdated)}</time>
        </p>
      </header>

      <div className="mt-10 max-w-3xl space-y-12">
        {aboutPage.sections.map((section) => (
          <section key={section.id} id={section.id}>
            <h2 className="font-display text-xl font-semibold text-foreground">{section.heading}</h2>
            <div className="mt-4 space-y-4">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-[15px] leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <footer className="mt-14 max-w-3xl rounded-2xl border border-border bg-panel-muted px-6 py-5 text-sm text-muted sm:px-8">
        <p>
          <Link href="/tools/" className="font-medium text-accent hover:underline">
            Browse all tools
          </Link>
          {" · "}
          <Link href="/guides/" className="font-medium text-accent hover:underline">
            Guides
          </Link>
          {" · "}
          <Link href="/resources/" className="font-medium text-accent hover:underline">
            Resources
          </Link>
          {" · "}
          <Link href="/privacy/" className="font-medium text-accent hover:underline">
            Privacy Policy
          </Link>
          {" · "}
          <Link href="/terms/" className="font-medium text-accent hover:underline">
            Terms of Use
          </Link>
        </p>
      </footer>
    </article>
  );
};
