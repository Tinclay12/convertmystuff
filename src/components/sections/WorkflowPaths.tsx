import Link from "next/link";
import { getToolById } from "@/lib/tools/access";
import type { SiteWorkflowPath } from "@/lib/content/linking/site-workflows";
import { cn } from "@/lib/utils/cn";

type WorkflowPathsProps = {
  paths: SiteWorkflowPath[];
  className?: string;
};

export const WorkflowPaths = ({ paths, className }: WorkflowPathsProps) => {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {paths.map((path) => {
        const tools = path.toolIds
          .map((id) => getToolById(id))
          .filter((tool): tool is NonNullable<typeof tool> => Boolean(tool));

        return (
          <article
            key={path.id}
            className="rounded-xl border border-border bg-card p-5 shadow-xs"
          >
            <h3 className="font-display text-lg font-semibold text-foreground">{path.title}</h3>
            <p className="mt-1 text-sm text-muted">{path.description}</p>
            <ol className="mt-4 space-y-2">
              {tools.map((tool, index) => (
                <li key={tool.id} className="flex items-baseline gap-2 text-sm">
                  <span className="font-mono text-xs text-muted tabular-nums">{index + 1}.</span>
                  <Link href={tool.path} className="font-medium text-primary hover:underline">
                    {tool.title}
                  </Link>
                </li>
              ))}
            </ol>
          </article>
        );
      })}
    </div>
  );
};
