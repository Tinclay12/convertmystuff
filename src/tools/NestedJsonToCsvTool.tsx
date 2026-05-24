"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { DownloadButton } from "@/components/ui/DownloadButton";
import { Textarea } from "@/components/ui/Textarea";
import { ToolErrorAlert } from "@/components/tools/ToolErrorAlert";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";
import { ToolSelect } from "@/components/tools/ToolSelect";
import { nestedJsonToCsv } from "@/lib/tools/logic/nested-json-to-csv";
import type { CsvDelimiter } from "@/lib/tools/logic/json-to-csv";

export const NestedJsonToCsvTool = () => {
  const [input, setInput] = useState("");
  const [delimiter, setDelimiter] = useState<CsvDelimiter>(",");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [columns, setColumns] = useState<string[]>([]);

  const handleConvert = () => {
    const result = nestedJsonToCsv(input, delimiter);

    if (!result.ok) {
      setError(result.error);
      setOutput("");
      setColumns([]);
      return;
    }

    setError("");
    setOutput(result.csv);
    setColumns(result.columns);
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
    setError("");
    setColumns([]);
  };

  const columnPreview = useMemo(() => columns.join(", "), [columns]);

  return (
    <div className="space-y-4">
      <ToolInputPanel title="Nested JSON input">
        <Textarea
          label="Paste nested JSON"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder='[{"name":"Ada","address":{"city":"London"}}]'
        />
        <div className="mt-4">
          <ToolSelect
            label="Delimiter"
            id="nested-delimiter"
            value={delimiter}
            onChange={(event) => setDelimiter(event.target.value as CsvDelimiter)}
          >
            <option value=",">Comma</option>
            <option value="\t">Tab</option>
            <option value=";">Semicolon</option>
          </ToolSelect>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button type="button" onClick={handleConvert}>
            Convert
          </Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </ToolInputPanel>
      {error && <ToolErrorAlert message={error} />}
      <ToolOutputPanel
        actions={
          <>
            <CopyButton value={output} />
            <DownloadButton
              content={output}
              filename="flattened.csv"
              mimeType="text/csv;charset=utf-8"
            />
          </>
        }
      >
        {columns.length > 0 && (
          <p className="mb-3 text-sm text-muted">Flattened columns: {columnPreview}</p>
        )}
        <Textarea
          label="CSV output"
          value={output}
          readOnly
          isOutput
          placeholder="Flattened CSV will appear here."
        />
      </ToolOutputPanel>
    </div>
  );
};
