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
import { validatorConfigs } from "@/lib/tools/logic/validators";
import type { GenericToolProps } from "@/lib/tools/generic-tool-props";
import { buildToolShareUrl } from "@/lib/tools/tool-prefill";

const COMPONENT_KEY = "GenericValidatorTool";

export const GenericValidatorTool = ({ toolId, initialPrefill }: GenericToolProps) => {
  const config = validatorConfigs[toolId];
  const tool = getToolById(toolId);
  const [input, setInput] = useState(initialPrefill ?? "");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialPrefill !== undefined) {
      setInput(initialPrefill);
    }
  }, [initialPrefill]);

  if (!config) {
    return <ToolErrorAlert message="This validator is not configured yet." />;
  }

  const handleValidate = () => {
    const result = config.transform(input);
    if (!result.ok) {
      setError(result.error);
      setOutput("");
      return;
    }

    setError("");
    setOutput(result.output);
  };

  const shareUrl = useMemo(
    () => (input.trim() && tool?.path ? buildToolShareUrl(tool.path, { value: input }) : ""),
    [input, tool?.path],
  );

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
            <Button type="button" onClick={handleValidate}>
              Validate
            </Button>
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
      <ToolOutputPanel
        actions={
          <ToolOutputActions
            toolId={toolId}
            componentKey={COMPONENT_KEY}
            copyValue={output}
            download={{ content: output, filename: "validation-result.txt" }}
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
          placeholder={tool?.shortDescription ?? "Validation result will appear here."}
        />
      </ToolOutputPanel>
    </div>
  );
};
