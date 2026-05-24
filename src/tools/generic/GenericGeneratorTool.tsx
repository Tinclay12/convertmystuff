"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { ToolErrorAlert } from "@/components/tools/ToolErrorAlert";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";
import { generatorConfigs } from "@/lib/tools/logic/generators";

type GenericGeneratorToolProps = {
  toolId: string;
};

export const GenericGeneratorTool = ({ toolId }: GenericGeneratorToolProps) => {
  const config = generatorConfigs[toolId];
  const [input, setInput] = useState("");
  const [count, setCount] = useState(config?.kind === "count" ? String(config.defaultCount) : "3");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

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

  return (
    <div className="space-y-4">
      <ToolInputPanel title="Generator input">
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
      </ToolInputPanel>
      {error && <ToolErrorAlert message={error} />}
      <ToolOutputPanel actions={<CopyButton value={output} />}>
        <Textarea
          label={config.outputLabel}
          value={output}
          readOnly
          isOutput
          placeholder="Generated output will appear here."
        />
      </ToolOutputPanel>
    </div>
  );
};
