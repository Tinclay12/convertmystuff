"use client";

import Link from "next/link";
import { AdSlot } from "@/components/ads/AdSlot";
import { trackContentEvent } from "@/lib/analytics/content-events";
import { getGuidePath } from "@/lib/content/merge-tool-content";
import { getGuideBySlug, getToolById } from "@/lib/tools/access";
import type { ToolContentBlock, ToolDefinition } from "@/lib/tools/types";
import { cn } from "@/lib/utils/cn";

type ToolContentBlocksProps = {
  blocks: ToolContentBlock[];
  toolId: string;
  showInContentAd?: boolean;
  className?: string;
};

const variantStyles: Record<NonNullable<ToolContentBlock["variant"]>, string> = {
  info: "border-border bg-card",
  tip: "border-primary/20 bg-primary/5",
  warning: "border-warning/30 bg-warning-bg",
};

export const ToolContentBlocks = ({
  blocks,
  toolId,
  showInContentAd = false,
  className,
}: ToolContentBlocksProps) => {
  if (blocks.length === 0) {
    return null;
  }

  const midpoint = Math.ceil(blocks.length / 2);

  return (
    <section aria-labelledby="tool-content-blocks-heading" className={cn("mt-8", className)}>
      <h2 id="tool-content-blocks-heading" className="text-xl font-semibold text-foreground">
        Learn more
      </h2>
      <div className="mt-4 space-y-4">
        {blocks.map((block, index) => (
          <div key={block.id}>
            <ContentBlockCard block={block} toolId={toolId} />
            {showInContentAd && index + 1 === midpoint && (
              <div className="my-6">
                <AdSlot placement="in-content" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

const ContentBlockCard = ({
  block,
  toolId,
}: {
  block: ToolContentBlock;
  toolId: string;
}) => {
  const variant = block.variant ?? "info";
  const linkedTools = (block.linkedToolIds ?? [])
    .map((id) => getToolById(id))
    .filter((tool): tool is ToolDefinition => Boolean(tool));

  const buildToolHref = (tool: ToolDefinition) => {
    const prefill = block.linkedToolPrefills?.[tool.id];
    if (!prefill) {
      return tool.path;
    }
    const separator = tool.path.includes("?") ? "&" : "?";
    return `${tool.path}${separator}${prefill}`;
  };

  const handleToolLinkClick = (targetToolId: string) => {
    trackContentEvent("content_tool_link_click", {
      tool_id: toolId,
      link_target: targetToolId,
    });
  };

  return (
    <article
      className={cn(
        "rounded-xl border p-4 shadow-sm sm:p-5",
        variantStyles[variant],
      )}
    >
      <h3 className="font-medium text-foreground">{block.title}</h3>
      <div className="mt-2 space-y-2">
        {block.paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-sm text-muted">
            {paragraph}
          </p>
        ))}
      </div>
      {linkedTools.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {linkedTools.map((tool) => (
            <li key={tool.id}>
              <Link
                href={buildToolHref(tool)}
                onClick={() => handleToolLinkClick(tool.id)}
                className="inline-flex rounded-lg border border-border bg-panel-muted px-3 py-1.5 text-sm font-medium text-primary hover:bg-card"
              >
                {tool.title} →
              </Link>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
};

type ToolGuideBannerProps = {
  guideSlug: string;
  toolId: string;
  className?: string;
};

export const ToolGuideBanner = ({ guideSlug, toolId, className }: ToolGuideBannerProps) => {
  const guide = getGuideBySlug(guideSlug);
  if (!guide) {
    return null;
  }

  const handleGuideClick = () => {
    trackContentEvent("guide_click", {
      tool_id: toolId,
      guide_slug: guideSlug,
    });
  };

  return (
    <aside
      className={cn(
        "mt-6 rounded-xl border border-primary/25 bg-primary/5 p-4 sm:p-5",
        className,
      )}
    >
      <p className="text-sm font-medium text-foreground">Want a deeper explanation?</p>
      <p className="mt-1 text-sm text-muted">{guide.intro}</p>
      <Link
        href={getGuidePath(guideSlug)}
        onClick={handleGuideClick}
        className="mt-3 inline-flex text-sm font-semibold text-primary hover:text-primary/80"
      >
        Read the full guide: {guide.title} →
      </Link>
    </aside>
  );
};
