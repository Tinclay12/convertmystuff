"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import { trackFlagshipEvent } from "@/lib/analytics/flagship-events";
import { generatePassphrase, generatePassword } from "@/lib/tools/logic/password-generator";
import { ToolErrorAlert } from "@/components/tools/ToolErrorAlert";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";
import { ToolSelect } from "@/components/tools/ToolSelect";

export const PasswordGeneratorTool = () => {
  const [mode, setMode] = useState<"password" | "passphrase">("password");
  const [length, setLength] = useState("16");
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [wordCount, setWordCount] = useState("4");
  const [separator, setSeparator] = useState("-");
  const [capitalize, setCapitalize] = useState(true);
  const [includeNumber, setIncludeNumber] = useState(true);
  const [output, setOutput] = useState("");
  const [entropy, setEntropy] = useState(0);
  const [error, setError] = useState("");

  const handleGenerate = () => {
    setError("");
    if (mode === "password") {
      const result = generatePassword({
        length: Number(length),
        uppercase,
        lowercase,
        numbers,
        symbols,
      });
      if (!result.ok) {
        setError(result.error);
        setOutput("");
        return;
      }
      setOutput(result.password);
      setEntropy(result.entropy);
    } else {
      const result = generatePassphrase({
        wordCount: Number(wordCount),
        separator,
        capitalize,
        includeNumber,
      });
      if (!result.ok) {
        setError(result.error);
        setOutput("");
        return;
      }
      setOutput(result.passphrase);
      setEntropy(result.entropy);
    }
    trackFlagshipEvent("flagship_calculate", {
      tool_id: "password-generator",
      tool_category: "developer-tools",
      mode,
    });
  };

  const entropyLabel =
    entropy >= 80 ? "Very strong" : entropy >= 60 ? "Strong" : entropy >= 40 ? "Moderate" : "Weak";

  return (
    <div className="space-y-4">
      <ToolInputPanel title="Generator settings">
        <ToolSelect label="Mode" id="pw-mode" value={mode} onChange={(e) => setMode(e.target.value as "password" | "passphrase")}>
          <option value="password">Random password</option>
          <option value="passphrase">Passphrase</option>
        </ToolSelect>
        {mode === "password" ? (
          <>
            <div className="mt-4">
              <Input label="Length" type="number" min="8" max="128" value={length} onChange={(e) => setLength(e.target.value)} />
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted">
              <label className="flex items-center gap-2"><input type="checkbox" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} className="rounded border-border" /> Uppercase</label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={lowercase} onChange={(e) => setLowercase(e.target.checked)} className="rounded border-border" /> Lowercase</label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={numbers} onChange={(e) => setNumbers(e.target.checked)} className="rounded border-border" /> Numbers</label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={symbols} onChange={(e) => setSymbols(e.target.checked)} className="rounded border-border" /> Symbols</label>
            </div>
          </>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Input label="Word count" type="number" min="3" max="12" value={wordCount} onChange={(e) => setWordCount(e.target.value)} />
            <Input label="Separator" value={separator} onChange={(e) => setSeparator(e.target.value)} placeholder="-" />
            <label className="flex items-center gap-2 text-sm text-muted"><input type="checkbox" checked={capitalize} onChange={(e) => setCapitalize(e.target.checked)} className="rounded border-border" /> Capitalize words</label>
            <label className="flex items-center gap-2 text-sm text-muted"><input type="checkbox" checked={includeNumber} onChange={(e) => setIncludeNumber(e.target.checked)} className="rounded border-border" /> Add number</label>
          </div>
        )}
        <div className="mt-4">
          <Button type="button" onClick={handleGenerate}>Generate</Button>
        </div>
      </ToolInputPanel>
      {error && <ToolErrorAlert message={error} />}
      {output && (
        <ToolOutputPanel actions={<CopyButton value={output} label="Copy" />}>
          <p className="mb-2 break-all font-mono text-lg">{output}</p>
          <p className="text-sm text-muted">Estimated entropy: {entropy} bits ({entropyLabel})</p>
        </ToolOutputPanel>
      )}
      <p className="rounded-lg border border-border bg-muted/30 px-3 py-2 text-sm text-muted">
        Generated locally in your browser. Never reuse passwords across sites; use a password manager.
      </p>
    </div>
  );
};
