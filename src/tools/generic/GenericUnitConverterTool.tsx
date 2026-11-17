"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
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
  buildConversionTableRows,
  formatNumber,
  formatPlainNumber,
  parseNumericInput,
  unitConverterConfigs,
} from "@/lib/tools/logic/unit-conversions";
import type { GenericToolProps } from "@/lib/tools/generic-tool-props";
import { buildToolShareUrl } from "@/lib/tools/tool-prefill";
import { AreaConverterTool } from "@/tools/AreaConverterTool";

const COMPONENT_KEY = "GenericUnitConverterTool";
const DEFAULT_PRESETS = ["1", "10", "100"];

export const GenericUnitConverterTool = (props: GenericToolProps) => {
  if (props.toolId === "square-meters-to-square-feet" || props.toolId === "square-feet-to-square-meters") {
    return <AreaConverterTool {...props} />;
  }
  return <StandardUnitConverterTool {...props} />;
};

const StandardUnitConverterTool = ({ toolId, initialPrefill }: GenericToolProps) => {
  const config = unitConverterConfigs[toolId];
  const tool = getToolById(toolId);
  const reverseConfig = config?.reverseToolId ? unitConverterConfigs[config.reverseToolId] : undefined;
  const [input, setInput] = useState(initialPrefill ?? "");
  const [outputDraft, setOutputDraft] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");

  const forwardResult = useMemo(() => {
    if (!config) {
      return { ok: false as const, error: "Tool configuration not found." };
    }

    const parsed = parseNumericInput(input);
    if (!parsed.ok) {
      return parsed;
    }

    return config.convert(parsed.value);
  }, [config, input]);

  const outputValue = forwardResult.ok ? formatPlainNumber(forwardResult.value) : outputDraft;

  const handleOutputChange = (nextOutput: string) => {
    setOutputDraft(nextOutput);
    if (!reverseConfig) {
      return;
    }
    const parsed = parseNumericInput(nextOutput);
    if (!parsed.ok) {
      return;
    }
    const reversed = reverseConfig.convert(parsed.value);
    if (reversed.ok) {
      setInput(formatPlainNumber(reversed.value));
    }
  };

  const handleInputChange = (nextInput: string) => {
    setInput(nextInput);
    setOutputDraft("");
  };

  const dimension = config?.dimensionMode;
  const dimensionResult = useMemo(() => {
    if (!dimension) {
      return null;
    }
    const parsedLength = parseNumericInput(length);
    const parsedWidth = parseNumericInput(width);
    if (!parsedLength.ok || !parsedWidth.ok) {
      return null;
    }
    const area = parsedLength.value * parsedWidth.value;
    const converted = dimension.convertArea(area);
    if (!converted.ok) {
      return null;
    }
    return {
      area,
      converted: converted.value,
    };
  }, [dimension, length, width]);

  if (!config) {
    return <ToolErrorAlert message="This converter is not configured yet." />;
  }

  const displayOutput = forwardResult.ok ? formatNumber(forwardResult.value) : "";
  const formulaLine =
    forwardResult.ok && input.trim()
      ? `${input.trim()} ${config.inputLabel.toLowerCase()} = ${displayOutput} ${config.outputLabel.toLowerCase()}`
      : "";
  const shareUrl =
    tool?.path && input.trim() ? buildToolShareUrl(tool.path, { value: input.trim() }) : "";
  const presets = config.presets ?? DEFAULT_PRESETS;
  const tableRows = buildConversionTableRows(config.convert, config.tableValues);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <ToolInputPanel title={config.inputLabel}>
          <ToolExampleLoader
            toolId={toolId}
            componentKey={COMPONENT_KEY}
            onLoadValue={handleInputChange}
            className="mb-4 flex flex-wrap items-center gap-2"
          />
          <Input
            label={config.inputLabel}
            type="number"
            min={config.allowNegative ? undefined : "0"}
            step="any"
            inputMode="decimal"
            value={input}
            onChange={(event) => handleInputChange(event.target.value)}
            placeholder={config.inputPlaceholder}
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {presets.map((preset) => (
              <Button
                key={preset}
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => handleInputChange(preset)}
              >
                {preset}
              </Button>
            ))}
          </div>
          <ToolActionBar
            secondary={
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  handleInputChange("");
                  setLength("");
                  setWidth("");
                }}
              >
                Reset
              </Button>
            }
          />
        </ToolInputPanel>

        <div className="space-y-4">
          {!forwardResult.ok && input.trim() && <ToolErrorAlert message={forwardResult.error} />}
          <ToolOutputPanel
            title={config.outputLabel}
            actions={
              <ToolOutputActions
                toolId={toolId}
                componentKey={COMPONENT_KEY}
                copyValue={formulaLine || displayOutput}
                copyLabel={formulaLine ? "Copy result line" : "Copy"}
                shareUrl={shareUrl}
                shareDisabled={!input.trim() || !forwardResult.ok}
              />
            }
          >
            {reverseConfig ? (
              <Input
                label={config.outputLabel}
                type="number"
                min={config.allowNegative ? undefined : "0"}
                step="any"
                inputMode="decimal"
                value={forwardResult.ok ? outputValue : outputDraft}
                onChange={(event) => handleOutputChange(event.target.value)}
                placeholder="Edit to convert in reverse"
              />
            ) : forwardResult.ok && displayOutput ? (
              <>
                <p className="font-mono text-3xl font-semibold text-foreground">{displayOutput}</p>
                <p className="mt-2 text-sm text-muted">{config.outputLabel}</p>
              </>
            ) : (
              <p className="text-sm text-muted">
                {tool?.shortDescription ?? "Enter a value to convert."}
              </p>
            )}
            {forwardResult.ok && reverseConfig && (
              <p className="mt-3 font-mono text-2xl font-semibold text-foreground">{displayOutput}</p>
            )}
          </ToolOutputPanel>
        </div>
      </div>

      {config.relatedUnitLinks && config.relatedUnitLinks.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm text-muted">Related units:</p>
          {config.relatedUnitLinks.map((link) => (
            <Link key={link.path} href={link.path}>
              <Button type="button" variant="outline" size="sm">
                {link.label}
              </Button>
            </Link>
          ))}
        </div>
      )}

      {dimension && (
        <ToolInputPanel title="Length × width">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label={dimension.lengthLabel}
              type="number"
              min="0"
              step="any"
              inputMode="decimal"
              value={length}
              onChange={(event) => setLength(event.target.value)}
              placeholder="12"
            />
            <Input
              label={dimension.widthLabel}
              type="number"
              min="0"
              step="any"
              inputMode="decimal"
              value={width}
              onChange={(event) => setWidth(event.target.value)}
              placeholder="8"
            />
          </div>
          {dimensionResult ? (
            <p className="mt-4 text-sm text-foreground">
              Area:{" "}
              <span className="font-mono font-semibold">
                {formatNumber(dimensionResult.area)} {dimension.areaLabel.toLowerCase()}
              </span>
              {" · "}
              <span className="font-mono font-semibold">
                {formatNumber(dimensionResult.converted)} {dimension.convertedAreaLabel.toLowerCase()}
              </span>
            </p>
          ) : (
            <p className="mt-4 text-sm text-muted">Enter length and width to calculate area in both units.</p>
          )}
        </ToolInputPanel>
      )}

      {tableRows.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="min-w-full text-left text-sm">
            <caption className="px-4 py-3 text-left text-sm font-medium text-foreground">
              Common {config.inputLabel} to {config.outputLabel} conversions
            </caption>
            <thead className="bg-panel-muted text-xs uppercase tracking-wide text-muted">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">
                  {config.inputLabel}
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  {config.outputLabel}
                </th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row) => (
                <tr key={row.input} className="border-t border-border">
                  <td className="px-4 py-2 font-mono text-foreground">{formatNumber(row.input)}</td>
                  <td className="px-4 py-2 font-mono text-foreground">{formatNumber(row.output)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {config.reversePath && config.reverseLabel && (
        <p className="text-sm text-muted">
          Need the reverse conversion?{" "}
          <Link href={config.reversePath} className="font-medium text-primary hover:text-primary/80">
            {config.reverseLabel}
          </Link>
        </p>
      )}
    </div>
  );
};
