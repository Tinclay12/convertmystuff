"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { ToolActionBar } from "@/components/tools/ToolActionBar";
import { ToolErrorAlert } from "@/components/tools/ToolErrorAlert";
import { ToolExampleLoader } from "@/components/tools/ToolExampleLoader";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputActions } from "@/components/tools/ToolOutputActions";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";
import { getToolById } from "@/lib/tools/access";
import { textToolConfigs } from "@/lib/tools/logic/text-processing";
import type { GenericToolProps } from "@/lib/tools/generic-tool-props";
import { buildToolShareSearch, buildToolShareUrl } from "@/lib/tools/tool-prefill";

const COMPONENT_KEY = "GenericTextTool";

const getDownloadFilename = (toolId: string): string => `${toolId}.txt`;

const countLines = (value: string): number =>
  value.trim() ? value.split(/\r?\n/).length : 0;

export const GenericTextTool = ({ toolId, initialPrefill, initialFields }: GenericToolProps) => {
  const config = textToolConfigs[toolId];
  const tool = getToolById(toolId);
  const [input, setInput] = useState(initialPrefill ?? "");
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");

  useEffect(() => {
    if (config?.kind === "diff" && initialFields) {
      if (initialFields.left) {
        setLeft(initialFields.left);
      }
      if (initialFields.right) {
        setRight(initialFields.right);
      }
      return;
    }
    if (initialPrefill !== undefined && config?.kind !== "diff") {
      setInput(initialPrefill);
    }
  }, [config?.kind, initialFields, initialPrefill]);

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

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (config.kind === "diff") {
        setLeft(text);
      } else {
        setInput(text);
      }
    } catch {
      // Clipboard access may be blocked.
    }
  };

  const shareParams = useMemo((): Record<string, string> => {
    if (config.kind === "diff") {
      const params: Record<string, string> = {};
      if (left.trim()) {
        params.left = left;
      }
      if (right.trim()) {
        params.right = right;
      }
      return params;
    }
    return input.trim() ? { value: input.trim() } : {};
  }, [config.kind, input, left, right]);

  const shareUrl = useMemo(() => {
    if (!tool?.path || !buildToolShareSearch(shareParams)) {
      return "";
    }
    return buildToolShareUrl(tool.path, shareParams);
  }, [shareParams, tool?.path]);

  const outputActions = (
    <ToolOutputActions
      toolId={toolId}
      componentKey={COMPONENT_KEY}
      copyValue={result.ok ? result.output : ""}
      download={{
        content: result.ok ? result.output : "",
        filename: getDownloadFilename(toolId),
      }}
      shareUrl={shareUrl}
      shareDisabled={!shareUrl}
    />
  );

  if (config.kind === "diff") {
    return (
      <div className="space-y-4">
        <ToolInputPanel title="Compare text">
          <ToolExampleLoader
            toolId={toolId}
            componentKey={COMPONENT_KEY}
            onLoadValue={() => {}}
            onLoadText={(text) => setLeft(text)}
            className="mb-4 flex flex-wrap items-center gap-2"
          />
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
          <ToolActionBar
            primary={
              <Button type="button" variant="secondary" onClick={handlePaste}>
                Paste left
              </Button>
            }
            secondary={
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setLeft("");
                  setRight("");
                }}
              >
                Reset
              </Button>
            }
          />
        </ToolInputPanel>
        {!result.ok && (left.trim() || right.trim()) && (
          <ToolErrorAlert message={result.error} />
        )}
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

  const charCount = input.length;
  const lineCount = countLines(input);

  return (
    <div className="space-y-4">
      <ToolInputPanel title="Text input">
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
        <p className="mt-2 text-xs text-muted">
          {charCount} characters · {lineCount} lines
        </p>
        <ToolActionBar
          primary={
            <Button type="button" variant="secondary" onClick={handlePaste}>
              Paste from clipboard
            </Button>
          }
          secondary={
            <Button type="button" variant="ghost" onClick={() => setInput("")}>
              Reset
            </Button>
          }
        />
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
          placeholder={tool?.shortDescription ?? "Output will appear here."}
        />
      </ToolOutputPanel>
    </div>
  );
};
