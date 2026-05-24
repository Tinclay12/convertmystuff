"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { Textarea } from "@/components/ui/Textarea";
import { ToolErrorAlert } from "@/components/tools/ToolErrorAlert";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";
import { formatJson } from "@/lib/tools/logic/json-formatter";

export const JsonFormatterTool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleFormat = (mode: "pretty" | "minify") => {
    const result = formatJson(input, mode);

    if (!result.ok) {
      setError(result.error);
      setOutput("");
      return;
    }

    setError("");
    setOutput(result.output);
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <div className="space-y-4">
      <ToolInputPanel title="JSON input">
        <Textarea
          label="Paste JSON"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder='{"name":"Ada","active":true}'
        />
        <div className="mt-4 flex flex-wrap gap-2">
          <Button type="button" onClick={() => handleFormat("pretty")}>
            Format
          </Button>
          <Button type="button" onClick={() => handleFormat("minify")}>
            Minify
          </Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </ToolInputPanel>
      {error && <ToolErrorAlert message={error} />}
      <ToolOutputPanel
        actions={<CopyButton value={output} />}
      >
        <Textarea
          label="Formatted JSON"
          value={output}
          readOnly
          isOutput
          placeholder="Formatted JSON will appear here."
        />
      </ToolOutputPanel>
    </div>
  );
};
