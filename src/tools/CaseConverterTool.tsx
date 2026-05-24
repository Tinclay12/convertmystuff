"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/CopyButton";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";
import { ToolSelect } from "@/components/tools/ToolSelect";
import { convertCase, type CaseStyle } from "@/lib/tools/logic/case-converter";

const caseOptions: Array<{ value: CaseStyle; label: string }> = [
  { value: "uppercase", label: "Uppercase" },
  { value: "lowercase", label: "Lowercase" },
  { value: "title", label: "Title Case" },
  { value: "sentence", label: "Sentence case" },
  { value: "slug", label: "Slug case" },
];

export const CaseConverterTool = () => {
  const [input, setInput] = useState("");
  const [style, setStyle] = useState<CaseStyle>("title");

  const output = useMemo(() => convertCase(input, style), [input, style]);

  const handleReset = () => {
    setInput("");
    setStyle("title");
  };

  return (
    <div className="space-y-4">
      <ToolInputPanel title="Text input">
        <Textarea
          label="Enter text to convert"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="convert my stuff tools"
        />
        <div className="mt-4">
          <ToolSelect
            label="Case style"
            id="case-style"
            value={style}
            onChange={(event) => setStyle(event.target.value as CaseStyle)}
          >
            {caseOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </ToolSelect>
        </div>
      </ToolInputPanel>
      <ToolOutputPanel
        actions={
          <>
            <CopyButton value={output} />
            <Button type="button" variant="secondary" onClick={handleReset}>
              Reset
            </Button>
          </>
        }
      >
        <Textarea
          label="Converted text"
          value={output}
          readOnly
          isOutput
          placeholder="Converted text will appear here."
        />
      </ToolOutputPanel>
    </div>
  );
};
