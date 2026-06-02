"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { BrowserPrivacyNote } from "@/components/tools/BrowserPrivacyNote";
import { FileDropZone } from "@/components/tools/FileDropZone";
import { ToolErrorAlert } from "@/components/tools/ToolErrorAlert";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { trackFlagshipEvent } from "@/lib/analytics/flagship-events";
import { splitPdfFileByRanges } from "@/lib/tools/logic/document-tools";

const TOOL_ID = "pdf-split";

const downloadBytes = (bytes: Uint8Array, filename: string) => {
  const blob = new Blob([Uint8Array.from(bytes)], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

export const PdfSplitTool = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [pageRanges, setPageRanges] = useState("all");
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSplit = async () => {
    if (files.length !== 1) {
      setError("Select one PDF file to split.");
      return;
    }

    setIsProcessing(true);
    setError("");
    try {
      const outputs = await splitPdfFileByRanges(files[0], pageRanges);
      outputs.forEach((output) => downloadBytes(output.bytes, output.name));
      trackFlagshipEvent("flagship_file_process", {
        tool_id: TOOL_ID,
        file_count: 1,
        export_format: "pdf",
      });
    } catch (splitError) {
      setError(splitError instanceof Error ? splitError.message : "Could not split PDF file.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      <BrowserPrivacyNote />
      <ToolInputPanel title="PDF file to split">
        <FileDropZone
          accept="application/pdf,.pdf"
          multiple={false}
          maxFiles={1}
          label="Select PDF file to split"
          description="Processed locally in your browser."
          files={files}
          onFilesChange={setFiles}
          disabled={isProcessing}
        />
        <div className="mt-4">
          <Input
            label="Page ranges"
            value={pageRanges}
            onChange={(event) => setPageRanges(event.target.value)}
            placeholder="all, 1-3, 5, or 2"
          />
          <p className="mt-2 text-xs text-muted">
            Enter <span className="font-mono">all</span> for every page, or ranges like{" "}
            <span className="font-mono">1-3, 5</span>.
          </p>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button type="button" onClick={handleSplit} disabled={isProcessing}>
            Split and download pages
          </Button>
          <Button type="button" variant="secondary" onClick={() => setFiles([])}>
            Reset
          </Button>
        </div>
      </ToolInputPanel>
      {error && <ToolErrorAlert message={error} />}
    </div>
  );
};
