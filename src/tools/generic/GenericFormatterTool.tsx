"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { Textarea } from "@/components/ui/Textarea";
import { ToolErrorAlert } from "@/components/tools/ToolErrorAlert";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";
import { formatterConfigs } from "@/lib/tools/logic/formatters";

type GenericFormatterToolProps = {
  toolId: string;
};

export const GenericFormatterTool = ({ toolId }: GenericFormatterToolProps) => {
  const config = formatterConfigs[toolId];
  const [input, setInput] = useState("");

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

  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

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

  return (
    <div className="space-y-4">
      <ToolInputPanel title="Input">
        <Textarea
          label={config.inputLabel}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={config.inputPlaceholder}
        />
        <div className="mt-4 flex flex-wrap gap-2">
          <Button type="button" onClick={() => handleRun("pretty")}>
            Format
          </Button>
          <Button type="button" onClick={() => handleRun("minify")}>
            Minify
          </Button>
          <Button type="button" variant="secondary" onClick={() => { setInput(""); setOutput(""); setError(""); }}>
            Reset
          </Button>
        </div>
      </ToolInputPanel>
      {error && <ToolErrorAlert message={error} />}
      {!error && prettyResult && !prettyResult.ok && input.trim() && (
        <ToolErrorAlert message={prettyResult.error} />
      )}
      <ToolOutputPanel actions={<CopyButton value={output} />}>
        <Textarea
          label={config.outputLabel}
          value={output}
          readOnly
          isOutput
          placeholder="Formatted output will appear here."
        />
      </ToolOutputPanel>
    </div>
  );
};
