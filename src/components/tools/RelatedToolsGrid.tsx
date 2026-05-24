import Link from "next/link";
import { ToolCard } from "@/components/cards/ToolCard";
import { SectionHeader } from "@/components/sections/SectionHeader";
import type { ToolDefinition } from "@/lib/tools/types";
import { cn } from "@/lib/utils/cn";

type RelatedToolsGridProps = {
  tools: ToolDefinition[];
  className?: string;
  title?: string;
};

export const RelatedToolsGrid = ({ tools, className, title = "Related tools" }: RelatedToolsGridProps) => {
  if (tools.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="related-tools-heading" className={cn("mt-10", className)}>
      <SectionHeader id="related-tools-heading" title={title} />
      <ul className="mt-4 grid gap-4 sm:grid-cols-2">
        {tools.map((tool) => (
          <li key={tool.id}>
            <ToolCard tool={tool} />
          </li>
        ))}
      </ul>
      <p className="mt-4">
        <Link
          href="/tools/"
          className="text-sm font-medium text-primary hover:text-primary/80"
        >
          Browse all tools →
        </Link>
      </p>
    </section>
  );
};
