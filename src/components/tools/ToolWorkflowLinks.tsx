"use client";

import Link from "next/link";
import { trackContentEvent } from "@/lib/analytics/content-events";
import { SectionHeader } from "@/components/sections/SectionHeader";
import type { ResolvedToolLinkGroup } from "@/lib/tools/access";
import { cn } from "@/lib/utils/cn";

type ToolWorkflowLinksProps = {
  groups: ResolvedToolLinkGroup[];
  toolId: string;
  className?: string;
};

export const ToolWorkflowLinks = ({ groups, toolId, className }: ToolWorkflowLinksProps) => {
  if (groups.length === 0) {
    return null;
  }

  const handleLinkClick = (targetToolId: string, linkGroup: string) => {
    trackContentEvent("workflow_link_click", {
      tool_id: toolId,
      link_target: targetToolId,
      link_group: linkGroup,
    });
  };

  return (
    <section aria-labelledby="workflow-links-heading" className={cn("mt-10", className)}>
      <SectionHeader id="workflow-links-heading" title="Explore related workflows" />
      <div className="mt-4 space-y-6">
        {groups.map((group) => (
          <div key={group.label}>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
              {group.label}
            </h3>
            <ul className="mt-2 grid gap-2 sm:grid-cols-2">
              {group.tools.map((tool) => (
                <li key={tool.id}>
                  <Link
                    href={tool.path}
                    onClick={() => handleLinkClick(tool.id, group.label)}
                    className="block rounded-lg border border-border bg-card px-4 py-3 text-sm shadow-sm transition-colors hover:border-primary/30 hover:bg-panel-muted"
                  >
                    <span className="font-medium text-foreground">{tool.title}</span>
                    <span className="mt-0.5 block text-muted">{tool.shortDescription}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
