"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { Textarea } from "@/components/ui/Textarea";
import { ToolErrorAlert } from "@/components/tools/ToolErrorAlert";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";
import { encoderConfigs } from "@/lib/tools/logic/encoders";

type GenericEncoderToolProps = {
  toolId: string;
};

export const GenericEncoderTool = ({ toolId }: GenericEncoderToolProps) => {
  const config = encoderConfigs[toolId];
  const [input, setInput] = useState("");

  const result = useMemo(() => {
    if (!config) {
      return { ok: false as const, error: "Tool configuration not found." };
    }

    return config.transform(input);
  }, [config, input]);

  if (!config) {
    return <ToolErrorAlert message="This tool is not configured yet." />;
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
        <div className="mt-4">
          <Button type="button" variant="secondary" onClick={() => setInput("")}>
            Reset
          </Button>
        </div>
      </ToolInputPanel>
      {!result.ok && input.trim() && <ToolErrorAlert message={result.error} />}
      <ToolOutputPanel actions={<CopyButton value={result.ok ? result.output : ""} />}>
        <Textarea
          label={config.outputLabel}
          value={result.ok ? result.output : ""}
          readOnly
          isOutput
          placeholder="Output will appear here."
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
