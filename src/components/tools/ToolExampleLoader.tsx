"use client";

import { Button } from "@/components/ui/Button";
import { trackToolEvent } from "@/lib/analytics/tool-events";
import { getToolById } from "@/lib/tools/access";
import {
  applyExampleToFields,
  getExamplePrefillQuery,
  getExamplePrefillValue,
} from "@/lib/tools/tool-prefill";
import type { ToolExample } from "@/lib/tools/types";

type ToolExampleLoaderProps = {
  toolId: string;
  componentKey?: string;
  fieldKeys?: string[];
  onLoadValue: (value: string) => void;
  onLoadFields?: (fields: Record<string, string>) => void;
  onLoadText?: (text: string) => void;
  className?: string;
};

export const ToolExampleLoader = ({
  toolId,
  componentKey,
  fieldKeys = [],
  onLoadValue,
  onLoadFields,
  onLoadText,
  className,
}: ToolExampleLoaderProps) => {
  const tool = getToolById(toolId);
  const examples = tool?.examples?.filter((example) => getExamplePrefillValue(example) || example.prefillQuery) ?? [];

  if (examples.length === 0) {
    return null;
  }

  const handleLoad = (example: ToolExample) => {
    trackToolEvent("tool_example_load", { tool_id: toolId, component_key: componentKey });

    if (onLoadFields && (example.prefillQuery || fieldKeys.length > 0)) {
      onLoadFields(applyExampleToFields(example, fieldKeys));
      return;
    }

    const text = example.input?.trim();
    if (onLoadText && text && text !== "See tool fields") {
      onLoadText(text);
      return;
    }

    const value = getExamplePrefillValue(example);
    if (value) {
      onLoadValue(value);
    }
  };

  return (
    <div className={className ?? "flex flex-wrap items-center gap-2"}>
      <span className="text-xs font-semibold uppercase tracking-wide text-muted">Examples</span>
      {examples.slice(0, 4).map((example) => (
        <Button
          key={example.title}
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => handleLoad(example)}
        >
          {example.title}
        </Button>
      ))}
    </div>
  );
};

export const getExampleLoaderHref = (toolPath: string, example: ToolExample): string => {
  const query = getExamplePrefillQuery(example);
  return query ? `${toolPath}?${query}` : toolPath;
};
