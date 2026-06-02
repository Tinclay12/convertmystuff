"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { BrowserPrivacyNote } from "@/components/tools/BrowserPrivacyNote";
import { ToolActionBar } from "@/components/tools/ToolActionBar";
import { ToolErrorAlert } from "@/components/tools/ToolErrorAlert";
import { ToolExampleLoader } from "@/components/tools/ToolExampleLoader";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputActions } from "@/components/tools/ToolOutputActions";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";
import { getToolById } from "@/lib/tools/access";
import { dataConverterConfigs } from "@/lib/tools/logic/data-converters";
import type { GenericToolProps } from "@/lib/tools/generic-tool-props";
import { buildToolShareUrl } from "@/lib/tools/tool-prefill";

const COMPONENT_KEY = "GenericDataConverterTool";

const downloadExtensions: Record<string, string> = {
  "yaml-to-json": "json",
  "json-to-yaml": "yaml",
  "xml-to-json": "json",
  "json-to-xml": "xml",
  "csv-to-yaml": "yaml",
  "json-to-toml": "toml",
  "toml-to-json": "json",
  "tsv-to-csv": "csv",
};

export const GenericDataConverterTool = ({ toolId, initialPrefill }: GenericToolProps) => {
  const config = dataConverterConfigs[toolId];
  const tool = getToolById(toolId);
  const [input, setInput] = useState(initialPrefill ?? "");

  useEffect(() => {
    if (initialPrefill !== undefined) {
      setInput(initialPrefill);
    }
  }, [initialPrefill]);

  const result = useMemo(() => {
    if (!config) {
      return { ok: false as const, error: "Tool configuration not found." };
    }

    return config.transform(input);
  }, [config, input]);

  if (!config) {
    return <ToolErrorAlert message="This converter is not configured yet." />;
  }

  const extension = downloadExtensions[toolId] ?? "txt";
  const shareUrl = input.trim() && tool?.path ? buildToolShareUrl(tool.path, { value: input }) : "";

  return (
    <div className="space-y-4">
      <BrowserPrivacyNote />
      <ToolInputPanel title="Input">
        <ToolExampleLoader
          toolId={toolId}
          componentKey={COMPONENT_KEY}
          onLoadValue={setInput}
          onLoadText={setInput}
          className="mb-4 flex flex-wrap items-center gap-2"
        />
        <Textarea
          label={config.inputLabel}
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
      {!result.ok && input.trim() && <ToolErrorAlert message={result.error} />}
      <ToolOutputPanel
        actions={
          <ToolOutputActions
            toolId={toolId}
            componentKey={COMPONENT_KEY}
            copyValue={result.ok ? result.output : ""}
            download={{
              content: result.ok ? result.output : "",
              filename: `converted.${extension}`,
            }}
            shareUrl={shareUrl}
            shareDisabled={!input.trim()}
          />
        }
      >
        <Textarea
          label={config.outputLabel}
          value={result.ok ? result.output : ""}
          readOnly
          isOutput
          placeholder={tool?.shortDescription ?? "Converted output will appear here."}
        />
      </ToolOutputPanel>
    </div>
  );
};
