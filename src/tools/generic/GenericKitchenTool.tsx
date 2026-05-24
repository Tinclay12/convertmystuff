"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { ToolErrorAlert } from "@/components/tools/ToolErrorAlert";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";
import { kitchenToolConfigs } from "@/lib/tools/logic/kitchen-recipe-tools";

type GenericKitchenToolProps = {
  toolId: string;
};

export const GenericKitchenTool = ({ toolId }: GenericKitchenToolProps) => {
  const config = kitchenToolConfigs[toolId];
  const [input, setInput] = useState("");
  const [values, setValues] = useState<Record<string, string>>({
    ingredient: "flour",
    from: "fahrenheit",
    fromUnit: "cup",
    toUnit: "tbsp",
  });

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

  return (
    <div className="space-y-4">
      <ToolInputPanel title="Recipe inputs">
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
        <div className="mt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setInput("");
              setValues({
                ingredient: "flour",
                from: "fahrenheit",
                fromUnit: "cup",
                toUnit: "tbsp",
              });
            }}
          >
            Reset
          </Button>
        </div>
      </ToolInputPanel>
      {!result.ok && hasInput && <ToolErrorAlert message={result.error} />}
      <ToolOutputPanel actions={<CopyButton value={result.ok ? result.output : ""} />}>
        <Textarea
          label="Result"
          value={result.ok ? result.output : ""}
          readOnly
          isOutput
          placeholder="Output will appear here."
        />
      </ToolOutputPanel>
    </div>
  );
};
