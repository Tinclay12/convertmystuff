"use client";

import Link from "next/link";
import { getCategoryAccent } from "@/lib/theme/category-theme";
import type { ToolDefinition } from "@/lib/tools/types";
import { cn } from "@/lib/utils/cn";

type ToolExampleChipsProps = {
  tool: ToolDefinition;
  categorySlug?: string;
  className?: string;
};

export const ToolExampleChips = ({ tool, categorySlug, className }: ToolExampleChipsProps) => {
  const examples = tool.examples?.filter((example) => example.prefillValue) ?? [];
  const accent = categorySlug ? getCategoryAccent(categorySlug) : null;

  if (examples.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-2 text-sm", className)}>
      <span className="text-xs font-semibold uppercase tracking-wide text-muted">Try</span>
      {examples.map((example) => (
        <Link
          key={example.title}
          href={`${tool.path}?value=${encodeURIComponent(example.prefillValue ?? "")}`}
          className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-border-strong hover:shadow-xs"
          style={
            accent
              ? {
                  color: accent.text,
                }
              : undefined
          }
        >
          {example.title}
        </Link>
      ))}
    </div>
  );
};
