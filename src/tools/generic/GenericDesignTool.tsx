"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import { ToolErrorAlert } from "@/components/tools/ToolErrorAlert";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";
import { designToolConfigs } from "@/lib/tools/logic/design-tools";

type GenericDesignToolProps = {
  toolId: string;
};

export const GenericDesignTool = ({ toolId }: GenericDesignToolProps) => {
  const config = designToolConfigs[toolId];
  const [values, setValues] = useState<Record<string, string>>({});

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

  return (
    <div className="space-y-4">
      <ToolInputPanel title="Design inputs">
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
        <div className="mt-4">
          <Button type="button" variant="secondary" onClick={() => setValues({})}>
            Reset
          </Button>
        </div>
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
      )}
      <ToolOutputPanel actions={<CopyButton value={result.ok ? result.output : ""} />}>
        <p className="text-sm text-muted">Output</p>
        <pre className="mt-2 whitespace-pre-wrap text-sm text-foreground">
          {result.ok ? result.output : "—"}
        </pre>
      </ToolOutputPanel>
    </div>
  );
};
