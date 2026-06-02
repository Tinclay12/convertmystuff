"use client";

import { useEffect, useMemo, useState } from "react";
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
import type { LogicResult } from "@/lib/tools/logic/unit-conversions";
import type { GenericToolProps } from "@/lib/tools/generic-tool-props";
import { buildToolShareSearch, buildToolShareUrl } from "@/lib/tools/tool-prefill";

export type FieldCalculatorConfig = {
  fields: Array<{
    key: string;
    label: string;
    placeholder: string;
    step?: string;
  }>;
  calculate: (values: Record<string, number>) => LogicResult;
  disclaimer?: string;
};

type GenericFieldCalculatorToolProps = GenericToolProps & {
  componentKey: string;
  configs: Record<string, FieldCalculatorConfig>;
};

export const GenericFieldCalculatorTool = ({
  toolId,
  initialFields,
  componentKey,
  configs,
}: GenericFieldCalculatorToolProps) => {
  const config = configs[toolId];
  const tool = getToolById(toolId);
  const [values, setValues] = useState<Record<string, string>>(initialFields ?? {});

  useEffect(() => {
    if (initialFields && Object.keys(initialFields).length > 0) {
      setValues(initialFields);
    }
  }, [initialFields]);

  const fieldLabels = useMemo(
    () =>
      Object.fromEntries(
        (config?.fields ?? []).map((field) => [field.key, field.label]),
      ),
    [config?.fields],
  );

  const result = useMemo(() => {
    if (!config) {
      return { ok: false as const, error: "Calculator configuration not found." };
    }

    const numericValues = Object.fromEntries(
      config.fields.map((field) => [field.key, Number(values[field.key] ?? "")]),
    );

    return config.calculate(numericValues);
  }, [config, values]);

  if (!config) {
    return <ToolErrorAlert message="This calculator is not configured yet." />;
  }

  const hasInput = config.fields.some((field) => values[field.key]?.trim());

  const shareParams = useMemo(() => {
    const params: Record<string, string> = {};
    for (const field of config.fields) {
      const value = values[field.key]?.trim();
      if (value) {
        params[field.key] = value;
      }
    }
    return params;
  }, [config.fields, values]);

  const shareUrl = useMemo(() => {
    if (!tool?.path || !buildToolShareSearch(shareParams)) {
      return "";
    }
    return buildToolShareUrl(tool.path, shareParams);
  }, [shareParams, tool?.path]);

  const copyValue =
    result.ok && hasInput
      ? buildCalculatorSummary(fieldLabels, values, result)
      : result.ok
        ? result.output
        : "";

  const displayResult: LogicResult = hasInput
    ? result
    : { ok: false, error: "Enter values above to see your result." };

  return (
    <div className="space-y-4">
      <ToolInputPanel title="Inputs">
        <ToolExampleLoader
          toolId={toolId}
          componentKey={componentKey}
          fieldKeys={config.fields.map((field) => field.key)}
          onLoadValue={() => {}}
          onLoadFields={setValues}
          className="mb-4 flex flex-wrap items-center gap-2"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {config.fields.map((field) => (
            <Input
              key={field.key}
              label={field.label}
              type="number"
              min="0"
              step={field.step ?? "any"}
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
            componentKey={componentKey}
            copyValue={copyValue}
            copyLabel="Copy summary"
            shareUrl={shareUrl}
            shareDisabled={!hasInput}
          />
        }
      >
        <GenericCalculatorOutput
          result={displayResult}
          toolId={toolId}
          disclaimer={config.disclaimer}
        />
      </ToolOutputPanel>
    </div>
  );
};
