"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import { ToolErrorAlert } from "@/components/tools/ToolErrorAlert";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";
import { timeDateToolConfigs } from "@/lib/tools/logic/time-date-tools";

type GenericTimeDateToolProps = {
  toolId: string;
};

export const GenericTimeDateTool = ({ toolId }: GenericTimeDateToolProps) => {
  const config = timeDateToolConfigs[toolId];
  const [values, setValues] = useState<Record<string, string>>({
    mode: "toDate",
    from: "fahrenheit",
  });

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

  return (
    <div className="space-y-4">
      <ToolInputPanel title="Date and time inputs">
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
        <div className="mt-4">
          <Button type="button" variant="secondary" onClick={() => setValues({ mode: "toDate" })}>
            Reset
          </Button>
        </div>
      </ToolInputPanel>
      {!result.ok && hasInput && <ToolErrorAlert message={result.error} />}
      <ToolOutputPanel actions={<CopyButton value={result.ok ? result.output : ""} />}>
        <p className="text-sm text-muted">Result</p>
        <p className="mt-1 text-2xl font-semibold text-foreground">
          {result.ok ? result.output : "—"}
        </p>
      </ToolOutputPanel>
    </div>
  );
};
