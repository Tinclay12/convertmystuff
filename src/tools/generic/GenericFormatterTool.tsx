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
import { formatterConfigs } from "@/lib/tools/logic/formatters";
import type { GenericToolProps } from "@/lib/tools/generic-tool-props";
import { buildToolShareUrl } from "@/lib/tools/tool-prefill";

const COMPONENT_KEY = "GenericFormatterTool";

export const GenericFormatterTool = ({ toolId, initialPrefill }: GenericToolProps) => {
  const config = formatterConfigs[toolId];
  const tool = getToolById(toolId);
  const [input, setInput] = useState(initialPrefill ?? "");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialPrefill !== undefined) {
      setInput(initialPrefill);
    }
  }, [initialPrefill]);

  const prettyResult = useMemo(() => {
    if (!config || !input.trim()) {
      return null;
    }

    return config.transform(input, "pretty");
  }, [config, input]);

  const handleFormat = (mode: "pretty" | "minify") => {
    if (!config) {
      return;
    }

    return config.transform(input, mode);
  };

  const handleRun = (mode: "pretty" | "minify") => {
    const result = handleFormat(mode);
    if (!result) {
      return;
    }

    if (!result.ok) {
      setError(result.error);
      setOutput("");
      return;
    }

    setError("");
    setOutput(result.output);
  };

  if (!config) {
    return <ToolErrorAlert message="This formatter is not configured yet." />;
  }

  const shareUrl = input.trim() && tool?.path ? buildToolShareUrl(tool.path, { value: input }) : "";

  return (
    <div className="space-y-4">
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
          primary={
            <>
              <Button type="button" onClick={() => handleRun("pretty")}>
                Format
              </Button>
              <Button type="button" onClick={() => handleRun("minify")}>
                Minify
              </Button>
            </>
          }
          secondary={
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setInput("");
                setOutput("");
                setError("");
              }}
            >
              Reset
            </Button>
          }
        />
      </ToolInputPanel>
      {error && <ToolErrorAlert message={error} />}
      {!error && prettyResult && !prettyResult.ok && input.trim() && (
        <ToolErrorAlert message={prettyResult.error} />
      )}
      <ToolOutputPanel
        actions={
          <ToolOutputActions
            toolId={toolId}
            componentKey={COMPONENT_KEY}
            copyValue={output}
            download={{
              content: output,
              filename: `${toolId}.txt`,
            }}
            shareUrl={shareUrl}
            shareDisabled={!input.trim()}
          />
        }
      >
        <Textarea
          label={config.outputLabel}
          value={output}
          readOnly
          isOutput
          placeholder={tool?.shortDescription ?? "Formatted output will appear here."}
        />
      </ToolOutputPanel>
    </div>
  );
};
