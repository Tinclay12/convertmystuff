"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ToolActionBar } from "@/components/tools/ToolActionBar";
import { ToolErrorAlert } from "@/components/tools/ToolErrorAlert";
import { ToolExampleLoader } from "@/components/tools/ToolExampleLoader";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputActions } from "@/components/tools/ToolOutputActions";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";
import { getToolById } from "@/lib/tools/access";
import {
  formatNumber,
  parseNumericInput,
  unitConverterConfigs,
} from "@/lib/tools/logic/unit-conversions";
import type { GenericToolProps } from "@/lib/tools/generic-tool-props";
import { buildToolShareUrl } from "@/lib/tools/tool-prefill";

const COMPONENT_KEY = "GenericUnitConverterTool";
const PRESETS = ["1", "10", "100"];

export const GenericUnitConverterTool = ({ toolId, initialPrefill }: GenericToolProps) => {
  const config = unitConverterConfigs[toolId];
  const tool = getToolById(toolId);
  const [input, setInput] = useState(initialPrefill ?? "");

  useEffect(() => {
    if (initialPrefill !== undefined) {
      setInput(initialPrefill);
    }
  }, [initialPrefill]);

  const result = useMemo(() => {
    if (!config) {
      return { ok: false as const, error: "Tool configuration not found." };
    }

    const parsed = parseNumericInput(input);
    if (!parsed.ok) {
      return parsed;
    }

    return config.convert(parsed.value);
  }, [config, input]);

  if (!config) {
    return <ToolErrorAlert message="This converter is not configured yet." />;
  }

  const output = result.ok ? formatNumber(result.value) : "";
  const formulaLine =
    result.ok && input.trim()
      ? `${input.trim()} ${config.inputLabel.toLowerCase()} = ${output} ${config.outputLabel.toLowerCase()}`
      : "";
  const shareUrl =
    tool?.path && input.trim() ? buildToolShareUrl(tool.path, { value: input.trim() }) : "";

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <ToolInputPanel title={config.inputLabel}>
        <ToolExampleLoader
          toolId={toolId}
          componentKey={COMPONENT_KEY}
          onLoadValue={setInput}
          className="mb-4 flex flex-wrap items-center gap-2"
        />
        <Input
          label={config.inputLabel}
          type="number"
          min={config.allowNegative ? undefined : "0"}
          step="any"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={config.inputPlaceholder}
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <Button
              key={preset}
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setInput(preset)}
            >
              {preset}
            </Button>
          ))}
        </div>
        <ToolActionBar
          secondary={
            <Button type="button" variant="ghost" onClick={() => setInput("")}>
              Reset
            </Button>
          }
        />
      </ToolInputPanel>

      <div className="space-y-4">
        {!result.ok && input.trim() && <ToolErrorAlert message={result.error} />}
        <ToolOutputPanel
          title={config.outputLabel}
          actions={
            <ToolOutputActions
              toolId={toolId}
              componentKey={COMPONENT_KEY}
              copyValue={formulaLine || output}
              copyLabel={formulaLine ? "Copy result line" : "Copy"}
              shareUrl={shareUrl}
              shareDisabled={!input.trim() || !result.ok}
            />
          }
        >
          {result.ok && output ? (
            <>
              <p className="font-mono text-3xl font-semibold text-foreground">{output}</p>
              <p className="mt-2 text-sm text-muted">{config.outputLabel}</p>
            </>
          ) : (
            <p className="text-sm text-muted">
              {tool?.shortDescription ?? "Enter a value to convert."}
            </p>
          )}
        </ToolOutputPanel>
      </div>

      {config.reversePath && config.reverseLabel && (
        <p className="text-sm text-muted lg:col-span-2">
          Need the reverse conversion?{" "}
          <Link
            href={config.reversePath}
            className="font-medium text-primary hover:text-primary/80"
          >
            {config.reverseLabel}
          </Link>
        </p>
      )}
    </div>
  );
};
