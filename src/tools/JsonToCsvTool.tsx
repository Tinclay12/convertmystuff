"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { DownloadButton } from "@/components/ui/DownloadButton";
import { Textarea } from "@/components/ui/Textarea";
import { BrowserPrivacyNote } from "@/components/tools/BrowserPrivacyNote";
import { trackFlagshipEvent } from "@/lib/analytics/flagship-events";
import { jsonToCsv, type CsvDelimiter } from "@/lib/tools/logic/json-to-csv";
import { FileDropZone } from "@/components/tools/FileDropZone";
import { ToolErrorAlert } from "@/components/tools/ToolErrorAlert";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";
import { ToolSelect } from "@/components/tools/ToolSelect";

export const JsonToCsvTool = () => {
  const [input, setInput] = useState("");
  const [delimiter, setDelimiter] = useState<CsvDelimiter>(",");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [columns, setColumns] = useState<string[]>([]);
  const [columnOrder, setColumnOrder] = useState<string[]>([]);
  const [flattenNested, setFlattenNested] = useState(false);
  const [excelBom, setExcelBom] = useState(false);
  const [ndjson, setNdjson] = useState(false);
  const [jsonFiles, setJsonFiles] = useState<File[]>([]);

  const handleFileChange = async (files: File[]) => {
    setJsonFiles(files);
    if (files.length === 0) {
      return;
    }
    const text = await files[0].text();
    setInput(text);
  };

  const handleConvert = () => {
    const order = columnOrder.length > 0 ? columnOrder : undefined;
    const result = jsonToCsv(input, delimiter, {
      flattenNested,
      excelBom,
      ndjson,
      columnOrder: order,
    });

    if (!result.ok) {
      setError(result.error);
      setOutput("");
      setColumns([]);
      return;
    }

    setError("");
    setOutput(result.csv);
    setColumns(result.columns);
    if (columnOrder.length === 0) {
      setColumnOrder(result.columns);
    }
    trackFlagshipEvent("flagship_calculate", {
      tool_id: "json-to-csv",
      tool_category: "developer-tools",
      mode: flattenNested ? "flatten" : ndjson ? "ndjson" : "flat",
    });
  };

  const handleMoveColumn = (index: number, direction: "up" | "down") => {
    const next = [...columnOrder];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= next.length) {
      return;
    }
    [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
    setColumnOrder(next);
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
    setError("");
    setColumns([]);
    setColumnOrder([]);
    setJsonFiles([]);
    setFlattenNested(false);
    setExcelBom(false);
    setNdjson(false);
  };

  const columnPreview = columns.join(", ");

  return (
    <div className="space-y-4">
      <BrowserPrivacyNote />
      <ToolInputPanel title="JSON input">
        <FileDropZone
          accept="application/json,.json,.ndjson,text/plain"
          multiple={false}
          maxFiles={1}
          maxSizeBytes={10 * 1024 * 1024}
          label="Drop a JSON file"
          description="Or paste JSON below. Files stay in your browser."
          files={jsonFiles}
          onFilesChange={handleFileChange}
        />
        <div className="mt-4">
          <Textarea
            label="Paste JSON array or NDJSON"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={'[{"name":"Ada","role":"Engineer"}]\nor one JSON object per line (NDJSON)'}
          />
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <ToolSelect
            label="Delimiter"
            id="delimiter"
            value={delimiter}
            onChange={(event) => setDelimiter(event.target.value as CsvDelimiter)}
          >
            <option value=",">Comma (RFC 4180)</option>
            <option value="\t">Tab (TSV)</option>
            <option value=";">Semicolon (Excel EU)</option>
          </ToolSelect>
        </div>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={flattenNested}
              onChange={(event) => setFlattenNested(event.target.checked)}
              className="rounded border-border"
            />
            Flatten nested objects
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={excelBom}
              onChange={(event) => setExcelBom(event.target.checked)}
              className="rounded border-border"
            />
            Excel UTF-8 BOM
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={ndjson}
              onChange={(event) => setNdjson(event.target.checked)}
              className="rounded border-border"
            />
            NDJSON (one object per line)
          </label>
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
              filename="converted.csv"
              mimeType="text/csv;charset=utf-8"
            />
          </>
        }
      >
        {columnOrder.length > 0 && (
          <div className="mb-4">
            <p className="mb-2 text-sm font-medium text-foreground">Column order</p>
            <ul className="space-y-1">
              {columnOrder.map((column, index) => (
                <li
                  key={column}
                  className="flex items-center justify-between gap-2 rounded-lg border border-border px-3 py-2 text-sm"
                >
                  <span className="font-mono text-foreground">{column}</span>
                  <span className="flex gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => handleMoveColumn(index, "up")}
                      disabled={index === 0}
                      aria-label={`Move ${column} up`}
                    >
                      ↑
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => handleMoveColumn(index, "down")}
                      disabled={index === columnOrder.length - 1}
                      aria-label={`Move ${column} down`}
                    >
                      ↓
                    </Button>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-muted">Reorder columns, then click Convert again.</p>
          </div>
        )}
        {columns.length > 0 && columnOrder.length === 0 && (
          <p className="mb-3 text-sm text-muted">Columns: {columnPreview}</p>
        )}
        <Textarea
          label="CSV output"
          value={output}
          readOnly
          isOutput
          placeholder="CSV preview will appear here."
        />
      </ToolOutputPanel>
    </div>
  );
};
