"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { DownloadButton } from "@/components/ui/DownloadButton";
import { Textarea } from "@/components/ui/Textarea";
import { trackFlagshipEvent } from "@/lib/analytics/flagship-events";
import { BrowserPrivacyNote } from "@/components/tools/BrowserPrivacyNote";
import { csvToJson } from "@/lib/tools/logic/csv-to-json";
import { FileDropZone } from "@/components/tools/FileDropZone";
import { ToolErrorAlert } from "@/components/tools/ToolErrorAlert";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";

export const CsvToJsonTool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [inferTypes, setInferTypes] = useState(true);
  const [hasHeaderRow, setHasHeaderRow] = useState(true);
  const [rowCount, setRowCount] = useState(0);
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
    const result = csvToJson(input, { inferTypes, hasHeaderRow });

    if (!result.ok) {
      setError(result.error);
      setOutput("");
      setRowCount(0);
      return;
    }

    setError("");
    setOutput(result.json);
    setRowCount(result.rowCount);
    trackFlagshipEvent("flagship_calculate", {
      tool_id: "csv-to-json",
      tool_category: "developer-tools",
    });
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
    setError("");
    setRowCount(0);
    setCsvFiles([]);
  };

  return (
    <div className="space-y-4">
      <BrowserPrivacyNote />
      <ToolInputPanel title="CSV input">
        <FileDropZone
          accept=".csv,text/csv,text/plain"
          multiple={false}
          maxFiles={1}
          maxSizeBytes={10 * 1024 * 1024}
          label="Drop a CSV file"
          description="Or paste CSV below. Files stay in your browser."
          files={csvFiles}
          onFilesChange={handleFileChange}
        />
        <div className="mt-4">
          <Textarea
            label="Paste CSV"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={"id,name\n1,Ada\n2,Grace"}
          />
        </div>
        <label className="mt-4 flex items-center gap-2 text-sm text-muted">
          <input
            type="checkbox"
            checked={hasHeaderRow}
            onChange={(event) => setHasHeaderRow(event.target.checked)}
            className="rounded border-border"
          />
          First row is header
        </label>
        <label className="mt-2 flex items-center gap-2 text-sm text-muted">
          <input
            type="checkbox"
            checked={inferTypes}
            onChange={(event) => setInferTypes(event.target.checked)}
            className="rounded border-border"
          />
          Infer numbers and booleans
        </label>
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
              filename="converted.json"
              mimeType="application/json;charset=utf-8"
            />
          </>
        }
      >
        {rowCount > 0 && (
          <p className="mb-3 text-sm text-muted">Converted {rowCount} rows.</p>
        )}
        <Textarea
          label="JSON output"
          value={output}
          readOnly
          isOutput
          placeholder="JSON output will appear here."
        />
      </ToolOutputPanel>
    </div>
  );
};
