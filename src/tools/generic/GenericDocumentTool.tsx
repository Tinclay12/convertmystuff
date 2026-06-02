"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { BrowserPrivacyNote } from "@/components/tools/BrowserPrivacyNote";
import { FileDropZone } from "@/components/tools/FileDropZone";
import { ToolErrorAlert } from "@/components/tools/ToolErrorAlert";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";
import { trackFlagshipEvent } from "@/lib/analytics/flagship-events";
import {
  documentToolConfigs,
  mergePdfFilesWithProgress,
  splitPdfFileByRanges,
  textToPdfBytes,
} from "@/lib/tools/logic/document-tools";

import type { GenericToolProps } from "@/lib/tools/generic-tool-props";

const downloadBytes = (bytes: Uint8Array, filename: string) => {
  const blob = new Blob([Uint8Array.from(bytes)], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

export const GenericDocumentTool = ({ toolId, initialPrefill }: GenericToolProps) => {
  const config = documentToolConfigs[toolId];
  const [input, setInput] = useState(initialPrefill ?? "");
  const [files, setFiles] = useState<File[]>([]);
  const [pageRanges, setPageRanges] = useState("all");
  const [mergeProgress, setMergeProgress] = useState("");
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (initialPrefill !== undefined) {
      setInput(initialPrefill);
    }
  }, [initialPrefill]);

  const result = useMemo(() => {
    if (!config || config.kind !== "textarea") {
      return { ok: false as const, error: "" };
    }

    return config.transform(input);
  }, [config, input]);

  if (!config) {
    return <ToolErrorAlert message="This document tool is not configured yet." />;
  }

  const handleTextToPdf = async () => {
    if (!input.trim()) {
      setError("Paste text to export as PDF.");
      return;
    }

    setIsProcessing(true);
    setError("");
    try {
      const bytes = await textToPdfBytes(input);
      downloadBytes(bytes, "document.pdf");
    } catch {
      setError("Could not create PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

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
        tool_id: toolId,
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
        tool_id: toolId,
        file_count: 1,
        export_format: "pdf",
      });
    } catch (splitError) {
      setError(splitError instanceof Error ? splitError.message : "Could not split PDF file.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (config.kind === "pdf-merge" || config.kind === "pdf-split") {
    const isMerge = config.kind === "pdf-merge";

    return (
      <div className="space-y-4">
        <BrowserPrivacyNote />
        <ToolInputPanel title={isMerge ? "PDF files to merge" : "PDF file to split"}>
          <FileDropZone
            accept="application/pdf,.pdf"
            multiple={isMerge}
            maxFiles={isMerge ? 20 : 1}
            reorderable={isMerge}
            label={isMerge ? "Select PDF files to merge" : "Select PDF file to split"}
            description="Processed locally in your browser."
            files={files}
            onFilesChange={setFiles}
            disabled={isProcessing}
          />
          {!isMerge && (
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
          )}
          {mergeProgress && <p className="mt-3 text-sm text-muted">{mergeProgress}</p>}
          <div className="mt-4 flex flex-wrap gap-3">
            <Button
              type="button"
              onClick={isMerge ? handleMerge : handleSplit}
              disabled={isProcessing}
            >
              {isMerge ? "Merge and download" : "Split and download pages"}
            </Button>
            <Button type="button" variant="secondary" onClick={() => setFiles([])}>
              Reset
            </Button>
          </div>
        </ToolInputPanel>
        {error && <ToolErrorAlert message={error} />}
      </div>
    );
  }

  if (config.kind === "text-to-pdf") {
    return (
      <div className="space-y-4">
        <BrowserPrivacyNote />
        <ToolInputPanel title="Plain text">
          <Textarea
            label={config.inputLabel}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={config.inputPlaceholder}
          />
          <div className="mt-4 flex flex-wrap gap-3">
            <Button type="button" onClick={handleTextToPdf} disabled={isProcessing}>
              Download PDF
            </Button>
            <Button type="button" variant="secondary" onClick={() => setInput("")}>
              Reset
            </Button>
          </div>
        </ToolInputPanel>
        {error && <ToolErrorAlert message={error} />}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <BrowserPrivacyNote />
      <ToolInputPanel title="Document input">
        <Textarea
          label={config.inputLabel}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={config.inputPlaceholder}
        />
        <div className="mt-4">
          <Button type="button" variant="secondary" onClick={() => setInput("")}>
            Reset
          </Button>
        </div>
      </ToolInputPanel>
      {!result.ok && input.trim() && <ToolErrorAlert message={result.error} />}
      <ToolOutputPanel actions={<CopyButton value={result.ok ? result.output : ""} />}>
        <Textarea
          label={config.outputLabel}
          value={result.ok ? result.output : ""}
          readOnly
          isOutput
          placeholder="Output will appear here."
        />
      </ToolOutputPanel>
    </div>
  );
};
