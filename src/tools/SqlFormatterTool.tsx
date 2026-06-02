"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { ToolActionBar } from "@/components/tools/ToolActionBar";
import { ToolErrorAlert } from "@/components/tools/ToolErrorAlert";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputActions } from "@/components/tools/ToolOutputActions";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";
import { ToolSelect } from "@/components/tools/ToolSelect";
import { trackFlagshipEvent } from "@/lib/analytics/flagship-events";
import { formatSql } from "@/lib/tools/logic/formatters";
import { getToolById } from "@/lib/tools/access";
import { buildToolShareUrl } from "@/lib/tools/tool-prefill";

const TOOL_ID = "sql-formatter";
const COMPONENT_KEY = "SqlFormatterTool";

type SqlDialect = "ansi" | "mysql" | "postgresql";
type KeywordCase = "upper" | "lower" | "preserve";

export const SqlFormatterTool = () => {
  const tool = getToolById(TOOL_ID);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [dialect, setDialect] = useState<SqlDialect>("ansi");
  const [keywordCase, setKeywordCase] = useState<KeywordCase>("upper");

  const shareUrl = useMemo(() => {
    if (!tool?.path || !input.trim()) {
      return "";
    }
    return buildToolShareUrl(tool.path, { value: input.trim() });
  }, [input, tool?.path]);

  const handleRun = (mode: "pretty" | "minify") => {
    const result = formatSql(input, mode, { dialect, keywordCase });
    if (!result.ok) {
      setError(result.error);
      setOutput("");
      return;
    }

    setError("");
    setOutput(result.output);
    trackFlagshipEvent("flagship_calculate", {
      tool_id: TOOL_ID,
      tool_category: "developer-tools",
      mode: `${mode}-${dialect}`,
    });
  };

  return (
    <div className="space-y-4">
      <ToolInputPanel title="SQL input">
        <div className="mb-4 grid gap-4 sm:grid-cols-2">
          <ToolSelect
            label="Dialect"
            value={dialect}
            onChange={(event) => setDialect(event.target.value as SqlDialect)}
          >
            <option value="ansi">ANSI SQL</option>
            <option value="mysql">MySQL-style</option>
            <option value="postgresql">PostgreSQL-style</option>
          </ToolSelect>
          <ToolSelect
            label="Keyword case"
            value={keywordCase}
            onChange={(event) => setKeywordCase(event.target.value as KeywordCase)}
          >
            <option value="upper">UPPERCASE</option>
            <option value="lower">lowercase</option>
            <option value="preserve">Preserve</option>
          </ToolSelect>
        </div>
        <Textarea
          label="SQL query"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="SELECT id, name FROM users WHERE active = true"
        />
        <ToolActionBar
          className="mt-4"
          primary={
            <>
              <Button type="button" onClick={() => handleRun("pretty")}>
                Format
              </Button>
              <Button type="button" variant="secondary" onClick={() => handleRun("minify")}>
                Minify
              </Button>
            </>
          }
          secondary={
            <Button type="button" variant="secondary" onClick={() => setInput("")}>
              Reset
            </Button>
          }
        />
      </ToolInputPanel>
      {error && <ToolErrorAlert message={error} />}
      <ToolOutputPanel
        actions={
          <ToolOutputActions
            toolId={TOOL_ID}
            componentKey={COMPONENT_KEY}
            copyValue={output}
            shareUrl={shareUrl}
            shareDisabled={!shareUrl}
          />
        }
      >
        <Textarea label="Formatted SQL" value={output} readOnly isOutput placeholder="Output will appear here." />
      </ToolOutputPanel>
    </div>
  );
};
