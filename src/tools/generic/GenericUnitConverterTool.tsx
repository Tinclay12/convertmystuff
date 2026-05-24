"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import { ToolActionBar } from "@/components/tools/ToolActionBar";
import { ToolErrorAlert } from "@/components/tools/ToolErrorAlert";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";
import {
  formatNumber,
  parseNumericInput,
  unitConverterConfigs,
} from "@/lib/tools/logic/unit-conversions";

type GenericUnitConverterToolProps = {
  toolId: string;
  initialPrefill?: string;
};

export const GenericUnitConverterTool = ({ toolId, initialPrefill }: GenericUnitConverterToolProps) => {
  const config = unitConverterConfigs[toolId];
  const [input, setInput] = useState(initialPrefill ?? "");

  const result = useMemo(() => {
    if (!config) {
      return { ok: false as const, error: "Tool configuration not found." };
    }

    const parsed = parseNumericInput(input);
    if (!parsed.ok) {
      return parsed;
    }

    return config.convert(parsed.value);
  }, [config, input]);

  if (!config) {
    return <ToolErrorAlert message="This converter is not configured yet." />;
  }

  const output = result.ok ? formatNumber(result.value) : "";

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <ToolInputPanel title={`${config.inputLabel}`}>
        <Input
          label={config.inputLabel}
          type="number"
          min={config.allowNegative ? undefined : "0"}
          step="any"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={config.inputPlaceholder}
        />
        <ToolActionBar
          secondary={
            <Button type="button" variant="ghost" onClick={() => setInput("")}>
              Reset
            </Button>
          }
        />
      </ToolInputPanel>

      <div className="space-y-4">
        {!result.ok && input.trim() && <ToolErrorAlert message={result.error} />}
        <ToolOutputPanel
          title={config.outputLabel}
          actions={<CopyButton value={output} />}
        >
          <p className="font-mono text-3xl font-semibold text-foreground">{output || "—"}</p>
        </ToolOutputPanel>
      </div>

      {config.reversePath && config.reverseLabel && (
        <p className="text-sm text-muted lg:col-span-2">
          Need the reverse conversion?{" "}
          <Link
            href={config.reversePath}
            className="font-medium text-primary hover:text-primary/80"
          >
            {config.reverseLabel}
          </Link>
        </p>
      )}
    </div>
  );
};
