"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import { BrowserPrivacyNote } from "@/components/tools/BrowserPrivacyNote";
import { ToolErrorAlert } from "@/components/tools/ToolErrorAlert";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";
import { ToolSelect } from "@/components/tools/ToolSelect";
import {
  convertNumberBase,
  type NumberBase,
} from "@/lib/tools/logic/base-converter";

const baseOptions: { value: NumberBase; label: string }[] = [
  { value: 2, label: "Binary (base 2)" },
  { value: 8, label: "Octal (base 8)" },
  { value: 10, label: "Decimal (base 10)" },
  { value: 16, label: "Hexadecimal (base 16)" },
];

export const NumberBaseConverterTool = () => {
  const [input, setInput] = useState("");
  const [fromBase, setFromBase] = useState<NumberBase>(10);
  const [toBase, setToBase] = useState<NumberBase>(16);

  const result = useMemo(
    () => convertNumberBase(input, fromBase, toBase),
    [input, fromBase, toBase],
  );

  const handleSwap = () => {
    setFromBase(toBase);
    setToBase(fromBase);
    if (result.ok) {
      setInput(result.output.replace(/^0[box]/i, ""));
    }
  };

  return (
    <div className="space-y-4">
      <BrowserPrivacyNote />
      <ToolInputPanel title="Number input">
        <Input
          label="Value"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={fromBase === 16 ? "FF" : fromBase === 2 ? "1010" : "255"}
        />
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <ToolSelect
            label="From base"
            id="from-base"
            value={String(fromBase)}
            onChange={(event) => setFromBase(Number(event.target.value) as NumberBase)}
          >
            {baseOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </ToolSelect>
          <ToolSelect
            label="To base"
            id="to-base"
            value={String(toBase)}
            onChange={(event) => setToBase(Number(event.target.value) as NumberBase)}
          >
            {baseOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </ToolSelect>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button type="button" variant="secondary" onClick={handleSwap}>
            Swap bases
          </Button>
          <Button type="button" variant="ghost" onClick={() => setInput("")}>
            Reset
          </Button>
        </div>
      </ToolInputPanel>
      {!result.ok && input.trim() && <ToolErrorAlert message={result.error} />}
      <ToolOutputPanel actions={<CopyButton value={result.ok ? result.output : ""} />}>
        <p className="font-mono text-3xl font-semibold text-foreground">
          {result.ok ? result.output : "—"}
        </p>
      </ToolOutputPanel>
    </div>
  );
};
