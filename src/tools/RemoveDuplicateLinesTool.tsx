"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { Textarea } from "@/components/ui/Textarea";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";
import { removeDuplicateLines } from "@/lib/tools/logic/remove-duplicate-lines";

export const RemoveDuplicateLinesTool = () => {
  const [input, setInput] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [trimWhitespace, setTrimWhitespace] = useState(true);

  const result = useMemo(
    () => removeDuplicateLines(input, { caseSensitive, trimWhitespace }),
    [input, caseSensitive, trimWhitespace],
  );

  const handleReset = () => {
    setInput("");
  };

  return (
    <div className="space-y-4">
      <ToolInputPanel title="Text input">
        <Textarea
          label="Paste text with duplicate lines"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={"apple\nbanana\napple"}
        />
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={caseSensitive}
              onChange={(event) => setCaseSensitive(event.target.checked)}
              className="rounded border-border"
            />
            Case sensitive
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={trimWhitespace}
              onChange={(event) => setTrimWhitespace(event.target.checked)}
              className="rounded border-border"
            />
            Trim whitespace
          </label>
        </div>
      </ToolInputPanel>
      <ToolOutputPanel
        actions={
          <>
            <CopyButton value={result.output} />
            <Button type="button" variant="secondary" onClick={handleReset}>
              Reset
            </Button>
          </>
        }
      >
        <p className="mb-3 text-sm text-muted">
          Removed {result.removedCount} duplicate line
          {result.removedCount === 1 ? "" : "s"} ({result.uniqueCount} unique of{" "}
          {result.originalCount}).
        </p>
        <Textarea
          label="Unique lines"
          value={result.output}
          readOnly
          isOutput
          placeholder="Unique lines will appear here."
        />
      </ToolOutputPanel>
    </div>
  );
};
