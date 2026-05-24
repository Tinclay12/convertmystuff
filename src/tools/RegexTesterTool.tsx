"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { trackFlagshipEvent } from "@/lib/analytics/flagship-events";
import { testRegex } from "@/lib/tools/logic/regex-tester";
import { ToolErrorAlert } from "@/components/tools/ToolErrorAlert";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";

const PRESETS = [
  { label: "Email", pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}" },
  { label: "URL", pattern: "https?:\\/\\/[\\w\\-._~:/?#[\\]@!$&'()*+,;=%]+" },
  { label: "Phone", pattern: "\\+?\\d{1,3}?[-.\\s]?\\(?\\d{1,4}\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}" },
  { label: "Date ISO", pattern: "\\d{4}-\\d{2}-\\d{2}" },
];

export const RegexTesterTool = () => {
  const [pattern, setPattern] = useState("");
  const [testString, setTestString] = useState("");
  const [flags, setFlags] = useState({ g: true, i: false, m: false, s: false, u: false });
  const [hasTested, setHasTested] = useState(false);

  const result = useMemo(() => {
    if (!hasTested) return null;
    return testRegex(pattern, testString, flags);
  }, [hasTested, pattern, testString, flags]);

  const handleTest = () => {
    setHasTested(true);
    trackFlagshipEvent("flagship_calculate", { tool_id: "regex-tester", tool_category: "developer-tools" });
  };

  const handlePreset = (presetPattern: string) => {
    setPattern(presetPattern);
  };

  return (
    <div className="space-y-4">
      <ToolInputPanel title="Regular expression">
        <Input label="Pattern" value={pattern} onChange={(e) => setPattern(e.target.value)} placeholder="[a-z]+" />
        <div className="mt-3 flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <button key={preset.label} type="button" onClick={() => handlePreset(preset.pattern)} className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-foreground hover:bg-muted/80">
              {preset.label}
            </button>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted">
          {(["g", "i", "m", "s", "u"] as const).map((flag) => (
            <label key={flag} className="flex items-center gap-2">
              <input type="checkbox" checked={flags[flag]} onChange={(e) => setFlags((prev) => ({ ...prev, [flag]: e.target.checked }))} className="rounded border-border" />
              {flag}
            </label>
          ))}
        </div>
        <div className="mt-4">
          <Textarea label="Test string" value={testString} onChange={(e) => setTestString(e.target.value)} placeholder="Text to test against the pattern" />
        </div>
        <div className="mt-4">
          <Button type="button" onClick={handleTest}>Test regex</Button>
        </div>
      </ToolInputPanel>

      {result && !result.ok && <ToolErrorAlert message={result.error} />}
      {result?.ok && (
        <ToolOutputPanel actions={<CopyButton value={String(result.matches.length)} label="Copy match count" />}>
          <p className="mb-3 text-sm text-muted">{result.matches.length} match{result.matches.length === 1 ? "" : "es"} found</p>
          {result.matches.length === 0 ? (
            <p className="text-sm text-muted">No matches.</p>
          ) : (
            <ul className="space-y-2">
              {result.matches.map((match, index) => (
                <li key={`${match.index}-${index}`} className="rounded-lg border border-border bg-card px-3 py-2 text-sm">
                  <p><span className="text-muted">Match:</span> <code className="font-mono">{match.match}</code></p>
                  <p><span className="text-muted">Index:</span> {match.index}</p>
                  {match.groups.length > 0 && (
                    <p><span className="text-muted">Groups:</span> {match.groups.join(", ") || "(empty)"}</p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </ToolOutputPanel>
      )}
    </div>
  );
};
