"use client";

import Link from "next/link";
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
import { encoderConfigs } from "@/lib/tools/logic/encoders";
import type { GenericToolProps } from "@/lib/tools/generic-tool-props";
import { buildToolShareUrl } from "@/lib/tools/tool-prefill";

const COMPONENT_KEY = "GenericEncoderTool";

export const GenericEncoderTool = ({ toolId, initialPrefill }: GenericToolProps) => {
  const config = encoderConfigs[toolId];
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
    return <ToolErrorAlert message="This tool is not configured yet." />;
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
              filename: `${toolId}.txt`,
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
          placeholder={tool?.shortDescription ?? "Output will appear here."}
        />
      </ToolOutputPanel>
      {config.reversePath && config.reverseLabel && (
        <p className="text-sm text-muted">
          Need the reverse tool?{" "}
          <Link href={config.reversePath} className="font-medium text-primary hover:text-primary/80">
            {config.reverseLabel}
          </Link>
        </p>
      )}
    </div>
  );
};
