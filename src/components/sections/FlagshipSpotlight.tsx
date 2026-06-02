import Link from "next/link";
import type { ToolDefinition } from "@/lib/tools/types";
import { cn } from "@/lib/utils/cn";

type FlagshipSpotlightProps = {
  tools: ToolDefinition[];
  title?: string;
  description?: string;
  className?: string;
};

export const FlagshipSpotlight = ({
  tools,
  title = "Flagship tools",
  description = "Start with the highest-value tools in this category.",
  className,
}: FlagshipSpotlightProps) => {
  if (tools.length === 0) {
    return null;
  }

  return (
    <section className={cn("rounded-2xl border border-border bg-background-subtle p-5 sm:p-6", className)}>
      <h2 className="font-display text-xl font-semibold text-foreground">{title}</h2>
      <p className="mt-1 text-sm text-muted">{description}</p>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <li key={tool.id}>
            <Link
              href={tool.path}
              className="block rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-card"
            >
              <span className="font-medium text-foreground">{tool.title}</span>
              <p className="mt-1 line-clamp-2 text-sm text-muted">{tool.shortDescription}</p>
              <span className="mt-2 inline-block text-xs font-semibold uppercase tracking-wide text-primary">
                Open tool →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
