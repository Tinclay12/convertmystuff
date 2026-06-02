"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { BrowserPrivacyNote } from "@/components/tools/BrowserPrivacyNote";
import { FileDropZone } from "@/components/tools/FileDropZone";
import { ToolErrorAlert } from "@/components/tools/ToolErrorAlert";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { trackFlagshipEvent } from "@/lib/analytics/flagship-events";
import { mergePdfFilesWithProgress } from "@/lib/tools/logic/document-tools";

const TOOL_ID = "pdf-merge";

const downloadBytes = (bytes: Uint8Array, filename: string) => {
  const blob = new Blob([Uint8Array.from(bytes)], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

export const PdfMergeTool = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [mergeProgress, setMergeProgress] = useState("");
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleMerge = async () => {
    if (files.length < 2) {
      setError("Select at least two PDF files to merge.");
      return;
    }

    setIsProcessing(true);
    setError("");
    setMergeProgress("");
    try {
      const bytes = await mergePdfFilesWithProgress(files, (current, total) => {
        setMergeProgress(`Merging file ${current} of ${total}…`);
      });
      downloadBytes(bytes, "merged.pdf");
      trackFlagshipEvent("flagship_file_process", {
        tool_id: TOOL_ID,
        file_count: files.length,
        export_format: "pdf",
      });
    } catch {
      setError("Could not merge PDF files.");
    } finally {
      setIsProcessing(false);
      setMergeProgress("");
    }
  };

  return (
    <div className="space-y-4">
      <BrowserPrivacyNote />
      <ToolInputPanel title="PDF files to merge">
        <FileDropZone
          accept="application/pdf,.pdf"
          multiple
          maxFiles={20}
          reorderable
          label="Select PDF files to merge"
          description="Processed locally in your browser."
          files={files}
          onFilesChange={setFiles}
          disabled={isProcessing}
        />
        {mergeProgress && <p className="mt-3 text-sm text-muted">{mergeProgress}</p>}
        <div className="mt-4 flex flex-wrap gap-3">
          <Button type="button" onClick={handleMerge} disabled={isProcessing}>
            Merge and download
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
