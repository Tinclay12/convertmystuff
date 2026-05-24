"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { OpenGraphPreviewCard } from "@/components/tools/OpenGraphPreviewCard";
import { ToolErrorAlert } from "@/components/tools/ToolErrorAlert";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";
import { marketingToolConfigs } from "@/lib/tools/logic/marketing-tools";

type GenericMarketingToolProps = {
  toolId: string;
};

export const GenericMarketingTool = ({ toolId }: GenericMarketingToolProps) => {
  const config = marketingToolConfigs[toolId];
  const [input, setInput] = useState("");
  const [values, setValues] = useState<Record<string, string>>({});

  const result = useMemo(() => {
    if (!config) {
      return { ok: false as const, error: "Tool configuration not found." };
    }

    if (config.kind === "fields") {
      return config.transform(values);
    }

    return config.transform(input);
  }, [config, input, values]);

  if (!config) {
    return <ToolErrorAlert message="This marketing tool is not configured yet." />;
  }

  const showOgPreview =
    (toolId === "open-graph-preview" || toolId === "meta-tag-generator") && result.ok;

  return (
    <div className="space-y-4">
      <ToolInputPanel title="Input">
        {config.kind === "fields" ? (
          <div className="space-y-4">
            {config.fields.map((field) => (
              <Input
                key={field.key}
                label={field.label}
                value={values[field.key] ?? ""}
                onChange={(event) =>
                  setValues((current) => ({ ...current, [field.key]: event.target.value }))
                }
                placeholder={field.placeholder}
              />
            ))}
          </div>
        ) : (
          <Textarea
            label={config.inputLabel}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={config.inputPlaceholder}
          />
        )}
        <div className="mt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setInput("");
              setValues({});
            }}
          >
            Reset
          </Button>
        </div>
      </ToolInputPanel>
      {!result.ok && (input.trim() || Object.values(values).some(Boolean)) && (
        <ToolErrorAlert message={result.error} />
      )}
      {showOgPreview && (
        <OpenGraphPreviewCard
          title={values.title ?? ""}
          description={values.description ?? ""}
          url={values.url ?? ""}
          imageUrl={values.imageUrl ?? ""}
        />
      )}
      <ToolOutputPanel actions={<CopyButton value={result.ok ? result.output : ""} />}>
        <Textarea
          label={config.kind === "fields" ? "Generated tags" : config.outputLabel}
          value={result.ok ? result.output : ""}
          readOnly
          isOutput
          placeholder="Output will appear here."
        />
      </ToolOutputPanel>
    </div>
  );
};
