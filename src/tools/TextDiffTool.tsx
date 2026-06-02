"use client";

import { useEffect, useMemo, useState } from "react";
import { Textarea } from "@/components/ui/Textarea";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputActions } from "@/components/tools/ToolOutputActions";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";
import { getToolById } from "@/lib/tools/access";
import { buildDiffLines } from "@/lib/tools/logic/text-diff-pro";
import { buildToolShareUrl } from "@/lib/tools/tool-prefill";
import { trackFlagshipEvent } from "@/lib/analytics/flagship-events";
import { cn } from "@/lib/utils/cn";

const TOOL_ID = "text-diff";
const COMPONENT_KEY = "TextDiffTool";

export const TextDiffTool = () => {
  const tool = getToolById(TOOL_ID);
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");

  const diff = useMemo(() => buildDiffLines(left, right), [left, right]);

  const shareUrl = useMemo(() => {
    if (!tool?.path) {
      return "";
    }
    const params: Record<string, string> = {};
    if (left.trim()) {
      params.left = left;
    }
    if (right.trim()) {
      params.right = right;
    }
    return buildToolShareUrl(tool.path, params);
  }, [left, right, tool?.path]);

  useEffect(() => {
    if (left.trim() || right.trim()) {
      trackFlagshipEvent("flagship_calculate", {
        tool_id: TOOL_ID,
        tool_category: "text-tools",
        mode: "diff",
      });
    }
  }, [left, right]);

  return (
    <div className="space-y-4">
      <ToolInputPanel title="Compare versions">
        <div className="grid gap-4 lg:grid-cols-2">
          <Textarea
            label="Original"
            value={left}
            onChange={(event) => setLeft(event.target.value)}
            placeholder="Original version"
          />
          <Textarea
            label="Changed"
            value={right}
            onChange={(event) => setRight(event.target.value)}
            placeholder="Updated version"
          />
        </div>
      </ToolInputPanel>
      <ToolOutputPanel
        actions={
          <ToolOutputActions
            toolId={TOOL_ID}
            componentKey={COMPONENT_KEY}
            copyValue={diff.textOutput}
            shareUrl={shareUrl}
            shareDisabled={!shareUrl}
          />
        }
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-medium text-foreground">Original (highlighted)</p>
            <ul className="max-h-96 overflow-auto rounded-lg border border-border bg-muted/20 p-3 font-mono text-xs">
              {diff.leftLines.map((line) => (
                <li
                  key={`left-${line.index}`}
                  className={cn(
                    "whitespace-pre-wrap py-0.5",
                    line.type === "removed" && "bg-destructive/15 text-destructive",
                    line.type === "same" && "text-muted",
                  )}
                >
                  {line.text || " "}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-foreground">Changed (highlighted)</p>
            <ul className="max-h-96 overflow-auto rounded-lg border border-border bg-muted/20 p-3 font-mono text-xs">
              {diff.rightLines.map((line) => (
                <li
                  key={`right-${line.index}`}
                  className={cn(
                    "whitespace-pre-wrap py-0.5",
                    line.type === "added" && "bg-primary/15 text-primary",
                    line.type === "same" && "text-muted",
                  )}
                >
                  {line.text || " "}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ToolOutputPanel>
    </div>
  );
};
