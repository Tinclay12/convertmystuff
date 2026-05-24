"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { Textarea } from "@/components/ui/Textarea";
import { FileDropZone } from "@/components/tools/FileDropZone";
import { ToolErrorAlert } from "@/components/tools/ToolErrorAlert";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";
import { Input } from "@/components/ui/Input";
import { trackFlagshipEvent } from "@/lib/analytics/flagship-events";
import { csvToHtmlTable } from "@/lib/tools/logic/csv-to-html-table";

export const CsvToHtmlTableTool = () => {
  const [input, setInput] = useState("");
  const [striped, setStriped] = useState(true);
  const [bordered, setBordered] = useState(true);
  const [tableClass, setTableClass] = useState("");
  const [tableId, setTableId] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [stats, setStats] = useState<{ rows: number; columns: number } | null>(null);
  const [csvFiles, setCsvFiles] = useState<File[]>([]);

  const handleFileChange = async (files: File[]) => {
    setCsvFiles(files);
    if (files.length === 0) {
      return;
    }
    const text = await files[0].text();
    setInput(text);
  };

  const handleConvert = () => {
    const result = csvToHtmlTable(input, { striped, bordered, tableClass, tableId });

    if (!result.ok) {
      setError(result.error);
      setOutput("");
      setStats(null);
      return;
    }

    setError("");
    setOutput(result.html);
    setStats({ rows: result.rowCount, columns: result.columnCount });
    trackFlagshipEvent("flagship_calculate", {
      tool_id: "csv-to-html-table",
      tool_category: "developer-tools",
    });
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
    setError("");
    setStats(null);
    setCsvFiles([]);
  };

  return (
    <div className="space-y-4">
      <ToolInputPanel title="CSV input">
        <FileDropZone
          accept=".csv,text/csv,text/plain"
          files={csvFiles}
          onFilesChange={handleFileChange}
          label="Drop a CSV file or paste below"
        />
        <div className="mt-4">
          <Textarea label="CSV data" value={input} onChange={(e) => setInput(e.target.value)} placeholder="name,email&#10;Ada,ada@example.com" />
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Input label="Table class (optional)" value={tableClass} onChange={(e) => setTableClass(e.target.value)} placeholder="data-table" />
          <Input label="Table id (optional)" value={tableId} onChange={(e) => setTableId(e.target.value)} placeholder="report-table" />
        </div>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={striped} onChange={(e) => setStriped(e.target.checked)} className="rounded border-border" />
            Striped rows
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={bordered} onChange={(e) => setBordered(e.target.checked)} className="rounded border-border" />
            Bordered cells
          </label>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button type="button" onClick={handleConvert}>Convert to HTML</Button>
          <Button type="button" variant="secondary" onClick={handleReset}>Reset</Button>
        </div>
      </ToolInputPanel>

      {error && <ToolErrorAlert message={error} />}

      {output && (
        <ToolOutputPanel actions={<CopyButton value={output} label="Copy HTML" />}>
          {stats && (
            <p className="mb-3 text-sm text-muted">
              {stats.rows} row{stats.rows === 1 ? "" : "s"}, {stats.columns} column{stats.columns === 1 ? "" : "s"}
            </p>
          )}
          <pre className="max-h-64 overflow-auto rounded-lg bg-muted/30 p-3 text-xs">{output}</pre>
          <div className="mt-4 overflow-x-auto rounded-lg border border-border p-2" dangerouslySetInnerHTML={{ __html: output }} />
        </ToolOutputPanel>
      )}
    </div>
  );
};
