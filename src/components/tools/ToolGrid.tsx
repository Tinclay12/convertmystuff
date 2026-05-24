import { ToolCard } from "@/components/cards/ToolCard";
import type { ToolDefinition } from "@/lib/tools/types";
import { cn } from "@/lib/utils/cn";

type ToolGridProps = {
  tools: ToolDefinition[];
  showCategory?: boolean;
  className?: string;
  columns?: "1" | "2" | "3";
  layout?: "list" | "grid";
};

const columnClasses = {
  "1": "grid-cols-1",
  "2": "sm:grid-cols-2",
  "3": "sm:grid-cols-2 lg:grid-cols-3",
};

export const ToolGrid = ({
  tools,
  showCategory = false,
  className,
  columns = "2",
  layout = "list",
}: ToolGridProps) => {
  if (tools.length === 0) {
    return null;
  }

  if (layout === "list") {
    return (
      <ul className={cn("rule-list", className)}>
        {tools.map((tool) => (
          <li key={tool.id}>
            <ToolCard tool={tool} showCategory={showCategory} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={cn("grid gap-0 divide-y divide-border border-y border-border", columnClasses[columns], className)}>
      {tools.map((tool) => (
        <li key={tool.id} className="border-border sm:border-0">
          <ToolCard tool={tool} showCategory={showCategory} className="sm:px-1" />
        </li>
      ))}
    </ul>
  );
};
