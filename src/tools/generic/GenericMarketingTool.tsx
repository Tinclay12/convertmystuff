"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { OpenGraphPreviewCard } from "@/components/tools/OpenGraphPreviewCard";
import { ToolActionBar } from "@/components/tools/ToolActionBar";
import { ToolErrorAlert } from "@/components/tools/ToolErrorAlert";
import { ToolExampleLoader } from "@/components/tools/ToolExampleLoader";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputActions } from "@/components/tools/ToolOutputActions";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";
import { getToolById } from "@/lib/tools/access";
import { marketingToolConfigs } from "@/lib/tools/logic/marketing-tools";
import type { GenericToolProps } from "@/lib/tools/generic-tool-props";
import { buildToolShareSearch, buildToolShareUrl } from "@/lib/tools/tool-prefill";

const COMPONENT_KEY = "GenericMarketingTool";

export const GenericMarketingTool = ({
  toolId,
  initialPrefill,
  initialFields,
}: GenericToolProps) => {
  const config = marketingToolConfigs[toolId];
  const tool = getToolById(toolId);
  const [input, setInput] = useState(initialPrefill ?? "");
  const [values, setValues] = useState<Record<string, string>>(initialFields ?? {});

  useEffect(() => {
    if (initialPrefill !== undefined) {
      setInput(initialPrefill);
    }
    if (initialFields && Object.keys(initialFields).length > 0) {
      setValues(initialFields);
    }
  }, [initialFields, initialPrefill]);

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

  const shareParams = config.kind === "fields" ? values : { value: input.trim() };
  const shareUrl =
    tool?.path && buildToolShareSearch(shareParams)
      ? buildToolShareUrl(tool.path, shareParams)
      : "";

  return (
    <div className="space-y-4">
      <ToolInputPanel title="Input">
        <ToolExampleLoader
          toolId={toolId}
          componentKey={COMPONENT_KEY}
          fieldKeys={config.kind === "fields" ? config.fields.map((field) => field.key) : []}
          onLoadValue={setInput}
          onLoadFields={setValues}
          onLoadText={setInput}
          className="mb-4 flex flex-wrap items-center gap-2"
        />
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
        <ToolActionBar
          secondary={
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setInput("");
                setValues({});
              }}
            >
              Reset
            </Button>
          }
        />
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
            shareDisabled={!shareUrl}
          />
        }
      >
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
