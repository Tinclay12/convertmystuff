import Link from "next/link";
import { Section } from "@/components/sections/Section";
import type { ResourceDefinition } from "@/lib/content/types";
import { getResourcePath, getResourcesIndexPath } from "@/lib/content/resources";

type CategoryResourcesSectionProps = {
  resources: ResourceDefinition[];
  className?: string;
};

export const CategoryResourcesSection = ({
  resources,
  className,
}: CategoryResourcesSectionProps) => {
  if (resources.length === 0) {
    return null;
  }

  return (
    <Section
      title="Resources"
      description="Concept explainers that link back to the tools."
      href={getResourcesIndexPath()}
      linkLabel="All resources"
      className={className}
    >
      <ul className="rule-list border border-border bg-card">
        {resources.map((resource) => (
          <li key={resource.slug}>
            <Link
              href={getResourcePath(resource.categorySlug, resource.slug)}
              className="rule-row block px-5"
            >
              <h3 className="font-display text-lg font-semibold text-foreground hover:text-accent">
                {resource.title}
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted line-clamp-2">
                {resource.summary}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
};
