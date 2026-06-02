"use client";

import { useMemo, useState } from "react";
import { Textarea } from "@/components/ui/Textarea";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";
import { trackFlagshipEvent } from "@/lib/analytics/flagship-events";
import { analyzeWordCount } from "@/lib/tools/logic/word-counter-pro";

const TOOL_ID = "word-counter";

export const WordCounterProTool = () => {
  const [input, setInput] = useState("");

  const analysis = useMemo(() => analyzeWordCount(input), [input]);

  const handleAnalyze = () => {
    trackFlagshipEvent("flagship_calculate", {
      tool_id: TOOL_ID,
      tool_category: "text-tools",
      mode: "word_count_pro",
    });
  };

  return (
    <div className="space-y-4">
      <ToolInputPanel title="Text to analyze">
        <Textarea
          label="Paste text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Paste article, email, or social post copy…"
          onBlur={handleAnalyze}
        />
      </ToolInputPanel>
      {analysis.ok && (
        <ToolOutputPanel>
          <dl className="grid gap-3 sm:grid-cols-2 text-sm">
            <div className="flex justify-between gap-4 border-b border-border py-2">
              <dt className="text-muted">Words</dt>
              <dd className="font-medium tabular-nums">{analysis.stats.words}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-border py-2">
              <dt className="text-muted">Characters</dt>
              <dd className="font-medium tabular-nums">{analysis.stats.characters}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-border py-2">
              <dt className="text-muted">Reading time</dt>
              <dd className="font-medium">~{analysis.stats.readingMinutes} min</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-border py-2">
              <dt className="text-muted">Top keyword density</dt>
              <dd className="font-medium">{analysis.stats.topKeyword}</dd>
            </div>
          </dl>
          <h3 className="mt-6 font-display text-base font-semibold text-foreground">Social limits</h3>
          <ul className="mt-2 space-y-1 text-sm text-muted">
            {analysis.stats.socialLimits.map((item) => (
              <li key={item.platform} className={item.over ? "text-destructive" : undefined}>
                {item.platform}: {item.count}/{item.limit}
                {item.over ? " (over)" : ""}
              </li>
            ))}
          </ul>
        </ToolOutputPanel>
      )}
    </div>
  );
};
