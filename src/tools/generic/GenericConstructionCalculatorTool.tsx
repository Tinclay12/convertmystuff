"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import { ToolErrorAlert } from "@/components/tools/ToolErrorAlert";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";
import { constructionCalculatorConfigs } from "@/lib/tools/logic/construction-calculators";

type GenericConstructionCalculatorToolProps = {
  toolId: string;
};

export const GenericConstructionCalculatorTool = ({
  toolId,
}: GenericConstructionCalculatorToolProps) => {
  const config = constructionCalculatorConfigs[toolId];
  const [values, setValues] = useState<Record<string, string>>({});

  const result = useMemo(() => {
    if (!config) {
      return { ok: false as const, error: "Calculator configuration not found." };
    }

    const numericValues = Object.fromEntries(
      config.fields.map((field) => [field.key, Number(values[field.key] ?? "")]),
    );

    return config.calculate(numericValues);
  }, [config, values]);

  const handleReset = () => {
    setValues({});
  };

  if (!config) {
    return <ToolErrorAlert message="This calculator is not configured yet." />;
  }

  const hasInput = config.fields.some((field) => values[field.key]?.trim());

  return (
    <div className="space-y-4">
      <ToolInputPanel title="Project inputs">
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
        <div className="mt-4">
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </ToolInputPanel>
      {!result.ok && hasInput && <ToolErrorAlert message={result.error} />}
      <ToolOutputPanel actions={<CopyButton value={result.ok ? result.output : ""} />}>
        <p className="text-sm text-muted">Estimate</p>
        <p className="mt-1 text-2xl font-semibold text-foreground">
          {result.ok ? result.output : "—"}
        </p>
      </ToolOutputPanel>
    </div>
  );
};
