"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { DownloadButton } from "@/components/ui/DownloadButton";
import { Textarea } from "@/components/ui/Textarea";
import { ToolErrorAlert } from "@/components/tools/ToolErrorAlert";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";
import { textToolConfigs } from "@/lib/tools/logic/text-processing";

type GenericTextToolProps = {
  toolId: string;
};

const getDownloadFilename = (toolId: string): string => `${toolId}.txt`;

export const GenericTextTool = ({ toolId }: GenericTextToolProps) => {
  const config = textToolConfigs[toolId];
  const [input, setInput] = useState("");
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");

  const result = useMemo(() => {
    if (!config) {
      return { ok: false as const, error: "Tool configuration not found." };
    }

    if (config.kind === "diff") {
      return config.transform(left, right);
    }

    return config.transform(input);
  }, [config, input, left, right]);

  if (!config) {
    return <ToolErrorAlert message="This text tool is not configured yet." />;
  }

  const outputActions = (
    <>
      <CopyButton value={result.ok ? result.output : ""} />
      <DownloadButton
        content={result.ok ? result.output : ""}
        filename={getDownloadFilename(toolId)}
      />
    </>
  );

  if (config.kind === "diff") {
    return (
      <div className="space-y-4">
        <ToolInputPanel title="Compare text">
          <Textarea
            label={config.leftLabel}
            value={left}
            onChange={(event) => setLeft(event.target.value)}
            placeholder={config.leftPlaceholder}
          />
          <div className="mt-4">
            <Textarea
              label={config.rightLabel}
              value={right}
              onChange={(event) => setRight(event.target.value)}
              placeholder={config.rightPlaceholder}
            />
          </div>
          <div className="mt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setLeft("");
                setRight("");
              }}
            >
              Reset
            </Button>
          </div>
        </ToolInputPanel>
        <ToolOutputPanel actions={outputActions}>
          <Textarea
            label="Diff output"
            value={result.ok ? result.output : ""}
            readOnly
            isOutput
            placeholder="Differences will appear here."
          />
        </ToolOutputPanel>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ToolInputPanel title="Text input">
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
      <ToolOutputPanel actions={outputActions}>
        {config.showMeta && result.ok && result.meta?.removed !== undefined && (
          <p className="mb-3 text-sm text-muted">Removed {result.meta.removed} empty lines.</p>
        )}
        <Textarea
          label={config.outputLabel}
          value={result.ok ? result.output : ""}
          readOnly
          isOutput
          placeholder="Output will appear here."
        />
      </ToolOutputPanel>
    </div>
  );
};
