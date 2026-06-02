"use client";

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
import { timeDateToolConfigs } from "@/lib/tools/logic/time-date-tools";
import type { GenericToolProps } from "@/lib/tools/generic-tool-props";
import { buildToolShareSearch, buildToolShareUrl } from "@/lib/tools/tool-prefill";

const COMPONENT_KEY = "GenericTimeDateTool";

const defaultTimeDateValues = {
  mode: "toDate",
  from: "fahrenheit",
};

export const GenericTimeDateTool = ({ toolId, initialFields }: GenericToolProps) => {
  const config = timeDateToolConfigs[toolId];
  const tool = getToolById(toolId);
  const [values, setValues] = useState<Record<string, string>>({
    ...defaultTimeDateValues,
    ...initialFields,
  });

  useEffect(() => {
    if (initialFields && Object.keys(initialFields).length > 0) {
      setValues((current) => ({ ...current, ...initialFields }));
    }
  }, [initialFields]);

  const result = useMemo(() => {
    if (!config) {
      return { ok: false as const, error: "Tool configuration not found." };
    }

    return config.calculate(values);
  }, [config, values]);

  if (!config) {
    return <ToolErrorAlert message="This time and date tool is not configured yet." />;
  }

  const hasInput = config.fields.some((field) => values[field.key]?.trim());
  const shareUrl =
    tool?.path && buildToolShareSearch(values)
      ? buildToolShareUrl(tool.path, values)
      : "";

  return (
    <div className="space-y-4">
      <ToolInputPanel title="Date and time inputs">
        <ToolExampleLoader
          toolId={toolId}
          componentKey={COMPONENT_KEY}
          fieldKeys={config.fields.map((field) => field.key)}
          onLoadValue={() => {}}
          onLoadFields={setValues}
          className="mb-4 flex flex-wrap items-center gap-2"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {config.fields.map((field) =>
            field.type === "select" ? (
              <div key={field.key} className="space-y-1.5">
                <label htmlFor={field.key} className="text-sm font-medium text-foreground">
                  {field.label}
                </label>
                <select
                  id={field.key}
                  value={values[field.key] ?? field.options?.[0]?.value ?? ""}
                  onChange={(event) =>
                    setValues((current) => ({ ...current, [field.key]: event.target.value }))
                  }
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                >
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <Input
                key={field.key}
                label={field.label}
                type={field.type ?? "text"}
                value={values[field.key] ?? ""}
                onChange={(event) =>
                  setValues((current) => ({ ...current, [field.key]: event.target.value }))
                }
                placeholder={field.placeholder}
              />
            ),
          )}
        </div>
        <ToolActionBar
          secondary={
            <Button
              type="button"
              variant="ghost"
              onClick={() => setValues({ ...defaultTimeDateValues })}
            >
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
            copyValue={result.ok ? result.output : ""}
            shareUrl={shareUrl}
            shareDisabled={!hasInput}
          />
        }
      >
        <p className="text-sm text-muted">Result</p>
        <p className="mt-1 text-2xl font-semibold text-foreground">
          {result.ok ? result.output : tool?.shortDescription ?? "—"}
        </p>
      </ToolOutputPanel>
    </div>
  );
};
