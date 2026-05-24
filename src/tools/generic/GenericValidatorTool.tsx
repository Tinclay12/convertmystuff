"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { DownloadButton } from "@/components/ui/DownloadButton";
import { Textarea } from "@/components/ui/Textarea";
import { ToolErrorAlert } from "@/components/tools/ToolErrorAlert";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";
import { validatorConfigs } from "@/lib/tools/logic/validators";

type GenericValidatorToolProps = {
  toolId: string;
};

export const GenericValidatorTool = ({ toolId }: GenericValidatorToolProps) => {
  const config = validatorConfigs[toolId];
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

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
          <Button type="button" onClick={handleValidate}>
            Validate
          </Button>
          <Button type="button" variant="secondary" onClick={() => { setInput(""); setOutput(""); setError(""); }}>
            Reset
          </Button>
        </div>
      </ToolInputPanel>
      {error && <ToolErrorAlert message={error} />}
      <ToolOutputPanel
        actions={
          <>
            <CopyButton value={output} />
            <DownloadButton content={output} filename="validation-result.txt" />
          </>
        }
      >
        <Textarea
          label={config.outputLabel}
          value={output}
          readOnly
          isOutput
          placeholder="Validation result will appear here."
        />
      </ToolOutputPanel>
    </div>
  );
};
