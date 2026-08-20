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
import { designToolConfigs } from "@/lib/tools/logic/design-tools";
import type { GenericToolProps } from "@/lib/tools/generic-tool-props";
import { buildToolShareSearch, buildToolShareUrl } from "@/lib/tools/tool-prefill";

const COMPONENT_KEY = "GenericDesignTool";

export const GenericDesignTool = ({ toolId, initialFields }: GenericToolProps) => {
  const config = designToolConfigs[toolId];
  const tool = getToolById(toolId);
  const [values, setValues] = useState<Record<string, string>>(initialFields ?? {});

  useEffect(() => {
    if (initialFields && Object.keys(initialFields).length > 0) {
      setValues(initialFields);
    }
  }, [initialFields]);

  const result = useMemo(() => {
    if (!config) {
      return { ok: false as const, error: "Tool configuration not found." };
    }

    const parsed = Object.fromEntries(
      config.fields.map((field) => [
        field.key,
        field.type === "number" ? Number(values[field.key] ?? "") : values[field.key] ?? "",
      ]),
    );

    return config.calculate(parsed);
  }, [config, values]);

  if (!config) {
    return <ToolErrorAlert message="This design tool is not configured yet." />;
  }

  const hasInput = config.fields.some((field) => values[field.key]?.trim());
  const gradientCss =
    config.preview === "gradient" && result.ok ? result.output.replace("background: ", "") : "";

  const shareUrl =
    tool?.path && buildToolShareSearch(values)
      ? buildToolShareUrl(tool.path, values)
      : "";

  return (
    <div className="space-y-4">
      <ToolInputPanel title="Design inputs">
        <ToolExampleLoader
          toolId={toolId}
          componentKey={COMPONENT_KEY}
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
              type={field.type === "number" ? "number" : "text"}
              step={field.step}
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
      {config.preview === "gradient" && gradientCss && (
        <div
          className="h-24 rounded-xl border border-border"
          style={{ background: gradientCss.replace(";", "") }}
          aria-hidden="true"
        />
      )}
      {config.preview === "contrast" && values.foreground && values.background && (
        <div className="space-y-3">
          <div
            className="rounded-xl border border-border p-4 text-lg font-medium"
            style={{
              color: values.foreground.startsWith("#") ? values.foreground : `#${values.foreground}`,
              backgroundColor: values.background.startsWith("#")
                ? values.background
                : `#${values.background}`,
            }}
          >
            Sample text preview
          </div>
          {result.ok && (
            <ul className="grid gap-2 text-sm text-foreground sm:grid-cols-2">
              {(result.resultLines ?? []).map((line) => (
                <li key={line.label}>
                  <span className="text-muted">{line.label}: </span>
                  <span className="font-medium">{line.value}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      <ToolOutputPanel
        actions={
          <ToolOutputActions
            toolId={toolId}
            componentKey={COMPONENT_KEY}
            copyValue={
              result.ok && config.preview === "contrast" && typeof result.meta?.ratio === "number"
                ? `${result.meta.ratio.toFixed(2)}:1`
                : result.ok
                  ? result.output
                  : ""
            }
            copyLabel={config.preview === "contrast" ? "Copy ratio" : "Copy"}
            shareUrl={shareUrl}
            shareDisabled={!hasInput}
          />
        }
      >
        <p className="text-sm text-muted">Output</p>
        <pre className="mt-2 whitespace-pre-wrap text-sm text-foreground">
          {result.ok ? result.output : "—"}
        </pre>
      </ToolOutputPanel>
    </div>
  );
};
