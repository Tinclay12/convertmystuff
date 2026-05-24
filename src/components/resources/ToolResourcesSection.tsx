"use client";

import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { trackContentEvent } from "@/lib/analytics/content-events";
import { getResourcePath, resolveResourceReference } from "@/lib/content/resources";

type ToolResourcesSectionProps = {
  resourceSlugs: string[];
  toolId: string;
  className?: string;
};

export const ToolResourcesSection = ({
  resourceSlugs,
  toolId,
  className,
}: ToolResourcesSectionProps) => {
  const resources = resourceSlugs
    .map((reference) => resolveResourceReference(reference))
    .filter((resource): resource is NonNullable<typeof resource> => Boolean(resource));

  if (resources.length === 0) {
    return null;
  }

  const handleResourceClick = (slug: string) => {
    trackContentEvent("resource_click", {
      tool_id: toolId,
      resource_slug: slug,
    });
  };

  return (
    <aside
      className={cn(
        "mt-6 rounded-xl border border-primary/25 bg-primary/5 p-4 sm:p-5",
        className,
      )}
    >
      <p className="text-sm font-medium text-foreground">Learn the concepts</p>
      <p className="mt-1 text-sm text-muted">
        Practical explainers that help you use this tool with the right assumptions.
      </p>
      <ul className="mt-3 space-y-2">
        {resources.map((resource) => (
          <li key={resource.slug}>
            <Link
              href={getResourcePath(resource.categorySlug, resource.slug)}
              onClick={() => handleResourceClick(resource.slug)}
              className="text-sm font-semibold text-primary hover:text-primary/80"
            >
              {resource.title} →
            </Link>
            <p className="mt-0.5 text-sm text-muted line-clamp-2">{resource.summary}</p>
          </li>
        ))}
      </ul>
    </aside>
  );
};
