"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { ToolActionBar } from "@/components/tools/ToolActionBar";
import { ToolErrorAlert } from "@/components/tools/ToolErrorAlert";
import { ToolExampleLoader } from "@/components/tools/ToolExampleLoader";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputActions } from "@/components/tools/ToolOutputActions";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";
import { getToolById } from "@/lib/tools/access";
import { kitchenToolConfigs } from "@/lib/tools/logic/kitchen-recipe-tools";
import type { GenericToolProps } from "@/lib/tools/generic-tool-props";
import { buildToolShareSearch, buildToolShareUrl } from "@/lib/tools/tool-prefill";

const COMPONENT_KEY = "GenericKitchenTool";

const defaultKitchenValues = {
  ingredient: "flour",
  from: "fahrenheit",
  fromUnit: "cup",
  toUnit: "tbsp",
};

export const GenericKitchenTool = ({
  toolId,
  initialPrefill,
  initialFields,
}: GenericToolProps) => {
  const config = kitchenToolConfigs[toolId];
  const tool = getToolById(toolId);
  const [input, setInput] = useState(initialPrefill ?? "");
  const [values, setValues] = useState<Record<string, string>>({
    ...defaultKitchenValues,
    ...initialFields,
  });

  useEffect(() => {
    if (initialPrefill !== undefined) {
      setInput(initialPrefill);
    }
    if (initialFields && Object.keys(initialFields).length > 0) {
      setValues((current) => ({ ...current, ...initialFields }));
    }
  }, [initialFields, initialPrefill]);

  const result = useMemo(() => {
    if (!config) {
      return { ok: false as const, error: "Tool configuration not found." };
    }

    const payload = {
      ...values,
      ingredients: input,
      input,
    };

    return config.calculate(payload);
  }, [config, input, values]);

  if (!config) {
    return <ToolErrorAlert message="This kitchen tool is not configured yet." />;
  }

  const hasInput =
    input.trim() ||
    config.fields.some((field) => values[field.key]?.trim());

  const shareParams = { ...values, ...(input.trim() ? { value: input } : {}) };
  const shareUrl =
    tool?.path && buildToolShareSearch(shareParams)
      ? buildToolShareUrl(tool.path, shareParams)
      : "";

  return (
    <div className="space-y-4">
      <ToolInputPanel title="Recipe inputs">
        <ToolExampleLoader
          toolId={toolId}
          componentKey={COMPONENT_KEY}
          fieldKeys={config.fields.map((field) => field.key)}
          onLoadValue={setInput}
          onLoadFields={setValues}
          onLoadText={setInput}
          className="mb-4 flex flex-wrap items-center gap-2"
        />
        {config.kind === "textarea" && (
          <Textarea
            label={config.inputLabel}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={config.inputPlaceholder}
          />
        )}
        <div className={`grid gap-4 sm:grid-cols-2 ${config.kind === "textarea" ? "mt-4" : ""}`}>
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
                type={field.type === "number" ? "number" : "text"}
                step={field.step}
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
              onClick={() => {
                setInput("");
                setValues({ ...defaultKitchenValues });
              }}
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
            download={{
              content: result.ok ? result.output : "",
              filename: `${toolId}.txt`,
            }}
            shareUrl={shareUrl}
            shareDisabled={!hasInput}
          />
        }
      >
        <Textarea
          label="Result"
          value={result.ok ? result.output : ""}
          readOnly
          isOutput
          placeholder={tool?.shortDescription ?? "Output will appear here."}
        />
      </ToolOutputPanel>
    </div>
  );
};
