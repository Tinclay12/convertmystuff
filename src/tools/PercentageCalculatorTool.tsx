"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { GenericCalculatorOutput } from "@/components/tools/GenericCalculatorOutput";
import { ToolActionBar } from "@/components/tools/ToolActionBar";
import { ToolErrorAlert } from "@/components/tools/ToolErrorAlert";
import { ToolExampleLoader } from "@/components/tools/ToolExampleLoader";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputActions } from "@/components/tools/ToolOutputActions";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";
import { getToolById } from "@/lib/tools/access";
import { buildCalculatorSummary } from "@/lib/tools/logic/calculator-result";
import {
  calculatePercentDecrease,
  calculatePercentIncrease,
  calculatePercentage,
  calculatePercentageChange,
} from "@/lib/tools/logic/finance-calculators";
import type { GenericToolProps } from "@/lib/tools/generic-tool-props";
import { buildToolShareSearch, buildToolShareUrl } from "@/lib/tools/tool-prefill";

const COMPONENT_KEY = "PercentageCalculatorTool";

const MODES = [
  { id: "of", label: "% of" },
  { id: "increase", label: "Increase" },
  { id: "decrease", label: "Decrease" },
  { id: "change", label: "Change" },
] as const;

type PercentageMode = (typeof MODES)[number]["id"];

const isPercentageMode = (value: string | undefined): value is PercentageMode =>
  MODES.some((mode) => mode.id === value);

export const PercentageCalculatorTool = ({ toolId, initialFields }: GenericToolProps) => {
  const tool = getToolById(toolId);
  const [mode, setMode] = useState<PercentageMode>(
    isPercentageMode(initialFields?.mode) ? initialFields.mode : "of",
  );
  const [values, setValues] = useState<Record<string, string>>(initialFields ?? {});

  const fields = useMemo(
    () =>
      mode === "change"
        ? [
            { key: "oldValue", label: "Old value", placeholder: "40" },
            { key: "newValue", label: "New value", placeholder: "50" },
          ]
        : [
            { key: "value", label: "Value", placeholder: "200" },
            { key: "percent", label: "Percent (%)", placeholder: "15", step: "0.01" },
          ],
    [mode],
  );

  const result = useMemo(() => {
    const numericValues = Object.fromEntries(
      fields.map((field) => [field.key, Number(values[field.key] ?? "")]),
    );

    if (mode === "increase") {
      return calculatePercentIncrease(numericValues);
    }
    if (mode === "decrease") {
      return calculatePercentDecrease(numericValues);
    }
    if (mode === "change") {
      return calculatePercentageChange(numericValues);
    }
    return calculatePercentage(numericValues);
  }, [fields, mode, values]);

  const hasInput = fields.some((field) => values[field.key]?.trim());
  const fieldLabels = Object.fromEntries(fields.map((field) => [field.key, field.label]));
  const shareParams: Record<string, string> = { mode };
  for (const field of fields) {
    const value = values[field.key]?.trim();
    if (value) {
      shareParams[field.key] = value;
    }
  }
  const shareUrl =
    tool?.path && buildToolShareSearch(shareParams) ? buildToolShareUrl(tool.path, shareParams) : "";
  const copyValue =
    result.ok && hasInput ? buildCalculatorSummary(fieldLabels, values, result) : result.ok ? result.output : "";

  const handleModeChange = (nextMode: PercentageMode) => {
    setMode(nextMode);
  };

  return (
    <div className="space-y-4">
      <ToolInputPanel title="Inputs">
        <div className="mb-4 flex flex-wrap gap-2" role="tablist" aria-label="Percentage calculation mode">
          {MODES.map((item) => (
            <Button
              key={item.id}
              type="button"
              size="sm"
              variant={mode === item.id ? "primary" : "outline"}
              aria-pressed={mode === item.id}
              onClick={() => handleModeChange(item.id)}
            >
              {item.label}
            </Button>
          ))}
        </div>
        <ToolExampleLoader
          toolId={toolId}
          componentKey={COMPONENT_KEY}
          fieldKeys={fields.map((field) => field.key)}
          onLoadValue={() => {}}
          onLoadFields={(next) => {
            setValues(next);
            if (isPercentageMode(next.mode)) {
              setMode(next.mode);
            }
          }}
          className="mb-4 flex flex-wrap items-center gap-2"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map((field) => (
            <Input
              key={field.key}
              label={field.label}
              type="number"
              step={field.step ?? "any"}
              inputMode="decimal"
              value={values[field.key] ?? ""}
              onChange={(event) =>
                setValues((current) => ({ ...current, [field.key]: event.target.value }))
              }
              placeholder={field.placeholder}
            />
          ))}
        </div>
        <ToolActionBar
          secondary={
            <Button type="button" variant="ghost" onClick={() => setValues({})}>
              Reset
            </Button>
          }
        />
      </ToolInputPanel>
      {!result.ok && hasInput && <ToolErrorAlert message={result.error} />}
      <ToolOutputPanel
        actions={
          <ToolOutputActions
            toolId={toolId}
            componentKey={COMPONENT_KEY}
            copyValue={copyValue}
            copyLabel="Copy summary"
            shareUrl={shareUrl}
            shareDisabled={!hasInput}
          />
        }
      >
        <GenericCalculatorOutput
          result={hasInput ? result : { ok: false, error: "Enter values above to see your result." }}
          toolId={toolId}
        />
      </ToolOutputPanel>
    </div>
  );
};
