import Link from "next/link";
import { ToolStatusBadge } from "@/components/ui/ToolStatusBadge";
import { getCategoryAccent } from "@/lib/theme/category-theme";
import type { ToolDefinition } from "@/lib/tools/types";

type ComingSoonToolPanelProps = {
  tool: ToolDefinition;
  categorySlug: string;
};

export const ComingSoonToolPanel = ({
  tool,
  categorySlug,
}: ComingSoonToolPanelProps) => {
  const accent = getCategoryAccent(categorySlug);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-md">
      <div
        className="px-5 py-4 text-sm font-semibold text-white"
        style={{ backgroundColor: accent.accent }}
      >
        {tool.status === "stub" ? "In development" : "Coming soon"}
      </div>
      <div className="space-y-4 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <ToolStatusBadge status={tool.status} />
        </div>
        <p className="text-base text-muted">{tool.shortDescription}</p>
        <div
          className="rounded-xl border p-5"
          style={{
            backgroundColor: accent.bg,
            borderColor: accent.border,
          }}
        >
          <p className="text-sm font-medium" style={{ color: accent.text }}>
            This tool is not available yet. We are building a polished version that
            runs in your browser with no login required.
          </p>
          <p className="mt-2 text-sm text-muted">
            In the meantime, browse related live tools below or explore the{" "}
            <Link
              href={`/${tool.category}/`}
              className="font-medium underline-offset-2 hover:underline"
              style={{ color: accent.text }}
            >
              {tool.category.replace(/-/g, " ")} category
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};
