"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { ToolActionBar } from "@/components/tools/ToolActionBar";
import { ToolErrorAlert } from "@/components/tools/ToolErrorAlert";
import { ToolExampleLoader } from "@/components/tools/ToolExampleLoader";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputActions } from "@/components/tools/ToolOutputActions";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";
import { getToolById } from "@/lib/tools/access";
import { generatorConfigs } from "@/lib/tools/logic/generators";
import type { GenericToolProps } from "@/lib/tools/generic-tool-props";
import { buildToolShareSearch, buildToolShareUrl } from "@/lib/tools/tool-prefill";

const COMPONENT_KEY = "GenericGeneratorTool";

export const GenericGeneratorTool = ({ toolId, initialPrefill, initialFields }: GenericToolProps) => {
  const config = generatorConfigs[toolId];
  const tool = getToolById(toolId);
  const [input, setInput] = useState(initialPrefill ?? "");
  const [count, setCount] = useState(
    initialFields?.count ?? (config?.kind === "count" ? String(config.defaultCount) : "3"),
  );
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialPrefill !== undefined) {
      setInput(initialPrefill);
    }
    if (initialFields?.count) {
      setCount(initialFields.count);
    }
  }, [initialFields?.count, initialPrefill]);

  const handleGenerate = async () => {
    if (!config) {
      return;
    }

    if (config.kind === "instant") {
      const result = config.generate();
      if (!result.ok) {
        setError(result.error);
        setOutput("");
        return;
      }
      setError("");
      setOutput(result.output);
      return;
    }

    if (config.kind === "count") {
      const parsed = Number(count);
      const result = config.generate(Number.isFinite(parsed) ? parsed : config.defaultCount);
      if (!result.ok) {
        setError(result.error);
        setOutput("");
        return;
      }
      setError("");
      setOutput(result.output);
      return;
    }

    const result = await config.generate(input);
    if (!result.ok) {
      setError(result.error);
      setOutput("");
      return;
    }

    setError("");
    setOutput(result.output);
  };

  if (!config) {
    return <ToolErrorAlert message="This generator is not configured yet." />;
  }

  const shareParams = useMemo((): Record<string, string> => {
    if (config.kind === "count") {
      return { count };
    }
    if (config.kind === "text" && input.trim()) {
      return { value: input };
    }
    return {};
  }, [config.kind, count, input]);

  const shareUrl =
    buildToolShareSearch(shareParams) && tool?.path
      ? buildToolShareUrl(tool.path, shareParams)
      : "";

  return (
    <div className="space-y-4">
      <ToolInputPanel title="Generator input">
        <ToolExampleLoader
          toolId={toolId}
          componentKey={COMPONENT_KEY}
          onLoadValue={setInput}
          onLoadText={setInput}
          className="mb-4 flex flex-wrap items-center gap-2"
        />
        {config.kind === "instant" && (
          <Button type="button" onClick={handleGenerate}>
            {config.buttonLabel}
          </Button>
        )}
        {config.kind === "text" && (
          <>
            <Textarea
              label={config.inputLabel}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={config.inputPlaceholder}
            />
            <div className="mt-4">
              <Button type="button" onClick={handleGenerate}>
                Generate
              </Button>
            </div>
          </>
        )}
        {config.kind === "count" && (
          <>
            <Input
              label={config.inputLabel}
              type="number"
              min="1"
              max="10"
              value={count}
              onChange={(event) => setCount(event.target.value)}
            />
            <div className="mt-4">
              <Button type="button" onClick={handleGenerate}>
                Generate
              </Button>
            </div>
          </>
        )}
        <ToolActionBar
          secondary={
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setInput("");
                setOutput("");
                setError("");
                setCount(String(config.kind === "count" ? config.defaultCount : 3));
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
            download={{ content: output, filename: `${toolId}.txt` }}
            shareUrl={shareUrl}
            shareDisabled={!shareUrl}
          />
        }
      >
        <Textarea
          label={config.outputLabel}
          value={output}
          readOnly
          isOutput
          placeholder={tool?.shortDescription ?? "Generated output will appear here."}
        />
      </ToolOutputPanel>
    </div>
  );
};
