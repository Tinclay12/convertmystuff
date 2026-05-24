import Link from "next/link";
import { Section } from "@/components/sections/Section";
import type { GuideDefinition } from "@/lib/content/types";
import { getGuidePath } from "@/lib/content/merge-tool-content";

type CategoryGuidesSectionProps = {
  guides: GuideDefinition[];
  className?: string;
};

export const CategoryGuidesSection = ({ guides, className }: CategoryGuidesSectionProps) => {
  if (guides.length === 0) {
    return null;
  }

  return (
    <Section
      title="Guides"
      description="Longer reads that link back to the tools."
      href="/guides/"
      linkLabel="All guides"
      className={className}
    >
      <ul className="rule-list border border-border bg-card">
        {guides.map((guide) => (
          <li key={guide.slug}>
            <Link href={getGuidePath(guide.slug)} className="rule-row block px-5">
              <h3 className="font-display text-lg font-semibold text-foreground hover:text-accent">
                {guide.title}
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted line-clamp-2">
                {guide.summary ?? guide.intro}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
};
