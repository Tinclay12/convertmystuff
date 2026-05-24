"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { DownloadButton } from "@/components/ui/DownloadButton";
import { Textarea } from "@/components/ui/Textarea";
import { ToolErrorAlert } from "@/components/tools/ToolErrorAlert";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";
import { BrowserPrivacyNote } from "@/components/tools/BrowserPrivacyNote";
import { dataConverterConfigs } from "@/lib/tools/logic/data-converters";

type GenericDataConverterToolProps = {
  toolId: string;
};

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

export const GenericDataConverterTool = ({ toolId }: GenericDataConverterToolProps) => {
  const config = dataConverterConfigs[toolId];
  const [input, setInput] = useState("");

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

  return (
    <div className="space-y-4">
      <BrowserPrivacyNote />
      <ToolInputPanel title="Input">
        <Textarea
          label={config.inputLabel}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={config.inputPlaceholder}
        />
        <div className="mt-4">
          <Button type="button" variant="secondary" onClick={() => setInput("")}>
            Reset
          </Button>
        </div>
      </ToolInputPanel>
      {!result.ok && input.trim() && <ToolErrorAlert message={result.error} />}
      <ToolOutputPanel
        actions={
          <>
            <CopyButton value={result.ok ? result.output : ""} />
            <DownloadButton
              content={result.ok ? result.output : ""}
              filename={`converted.${extension}`}
            />
          </>
        }
      >
        <Textarea
          label={config.outputLabel}
          value={result.ok ? result.output : ""}
          readOnly
          isOutput
          placeholder="Converted output will appear here."
        />
      </ToolOutputPanel>
    </div>
  );
};
