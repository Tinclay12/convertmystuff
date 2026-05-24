"use client";

import { useMemo, useState } from "react";
import { ToolCard } from "@/components/cards/ToolCard";
import { SearchInput } from "@/components/ui/SearchInput";
import { EmptyState } from "@/components/tools/EmptyState";
import { searchTools } from "@/lib/tools/access";
import type { ToolDefinition } from "@/lib/tools/types";
import { cn } from "@/lib/utils/cn";

export type SerializableTool = Pick<
  ToolDefinition,
  "id" | "title" | "shortDescription" | "path" | "category" | "status" | "keywords"
>;

type ToolSearchProps = {
  tools: SerializableTool[];
  showCategory?: boolean;
  placeholder?: string;
  initialQuery?: string;
  className?: string;
  gridClassName?: string;
};

export const ToolSearch = ({
  tools,
  showCategory = false,
  placeholder = "Search by name, description, or keyword…",
  initialQuery = "",
  className,
}: ToolSearchProps) => {
  const [query, setQuery] = useState(initialQuery);
  const hasQuery = query.trim().length > 0;

  const filteredTools = useMemo(() => {
    if (!hasQuery) {
      return [];
    }
    return searchTools(query, tools as ToolDefinition[]);
  }, [hasQuery, query, tools]);

  return (
    <div className={className}>
      <SearchInput value={query} onChange={setQuery} placeholder={placeholder} />
      {hasQuery && filteredTools.length === 0 && (
        <EmptyState
          className="mt-6"
          title="No tools found"
          description="Try a different search term or browse categories below."
        />
      )}
      {hasQuery && filteredTools.length > 0 && (
        <ul className={cn("rule-list mt-6 animate-search-fade-in")}>
          {filteredTools.map((tool) => (
            <li key={tool.id}>
              <ToolCard tool={tool as ToolDefinition} showCategory={showCategory} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
