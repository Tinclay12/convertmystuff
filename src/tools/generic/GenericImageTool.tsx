"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { trackFlagshipEvent } from "@/lib/analytics/flagship-events";
import { FileDropZone } from "@/components/tools/FileDropZone";
import { ToolErrorAlert } from "@/components/tools/ToolErrorAlert";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";
import { formatFileSize } from "@/lib/utils/format-file-size";
import { BrowserPrivacyNote } from "@/components/tools/BrowserPrivacyNote";
import { imageToolConfigs } from "@/lib/tools/logic/image-tools";

type GenericImageToolProps = {
  toolId: string;
};

export const GenericImageTool = ({ toolId }: GenericImageToolProps) => {
  const config = imageToolConfigs[toolId];
  const [files, setFiles] = useState<File[]>([]);
  const [sourcePreviewUrl, setSourcePreviewUrl] = useState("");
  const [width, setWidth] = useState("512");
  const [height, setHeight] = useState("512");
  const [quality, setQuality] = useState("0.8");
  const [previewUrl, setPreviewUrl] = useState("");
  const [downloadName, setDownloadName] = useState("");
  const [downloadBlob, setDownloadBlob] = useState<Blob | null>(null);
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const file = files[0] ?? null;

  useEffect(() => {
    if (!file) {
      return undefined;
    }

    const url = URL.createObjectURL(file);
    // Object URLs require effect cleanup; eslint rule does not apply to this browser API sync.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync preview URL with selected file blob
    setSourcePreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  if (!config) {
    return <ToolErrorAlert message="This image tool is not configured yet." />;
  }

  const handleFilesChange = (nextFiles: File[]) => {
    setFiles(nextFiles);
    setDownloadBlob(null);
    setDownloadName("");
    setPreviewUrl("");
    setError("");
  };

  const handleProcess = async () => {
    if (!file) {
      setError("Select an image file.");
      return;
    }

    setIsProcessing(true);
    setError("");

    const result = await config.process(file, {
      width: Number(width),
      height: Number(height),
      quality: Number(quality),
    });

    if (!result.ok) {
      setError(result.error);
      setIsProcessing(false);
      return;
    }

    setDownloadBlob(result.blob);
    setDownloadName(result.filename);
    if (result.previewUrl) {
      setPreviewUrl(result.previewUrl);
    } else if (result.mimeType?.startsWith("image/")) {
      setPreviewUrl(URL.createObjectURL(result.blob));
    } else {
      setPreviewUrl("");
    }

    trackFlagshipEvent("flagship_file_process", {
      tool_id: toolId,
      tool_category: "image-tools",
      file_count: 1,
      export_format: result.filename.split(".").pop() ?? "unknown",
    });

    setIsProcessing(false);
  };

  const handleDownload = () => {
    if (!downloadBlob) return;
    const url = URL.createObjectURL(downloadBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = downloadName || "converted-image";
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadLabel =
    downloadName.endsWith(".zip") ? "Download ZIP" : downloadName.endsWith(".ico") ? "Download ICO" : "Download";

  const handleReset = () => {
    setFiles([]);
    setSourcePreviewUrl("");
    setPreviewUrl("");
    setDownloadBlob(null);
    setDownloadName("");
    setError("");
  };

  return (
    <div className="space-y-4">
      <BrowserPrivacyNote />
      <ToolInputPanel title="Image input">
        <FileDropZone
          accept={config.accept}
          multiple={false}
          maxFiles={1}
          maxSizeBytes={25 * 1024 * 1024}
          label={`Drop ${config.label} to convert`}
          description="Processed locally in your browser. Nothing is uploaded to a server."
          files={files}
          onFilesChange={handleFilesChange}
          disabled={isProcessing}
        />
        {file && sourcePreviewUrl && (
          <div className="mt-4">
            <p className="mb-2 text-sm font-medium text-foreground">Source preview</p>
            <div className="flex justify-center rounded-lg border border-border bg-muted/30 p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={sourcePreviewUrl}
                alt="Source image preview"
                className="max-h-48 w-auto rounded-lg"
              />
            </div>
          </div>
        )}
        {config.showDimensions && (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Input
              label="Width (px)"
              type="number"
              min="1"
              value={width}
              onChange={(event) => setWidth(event.target.value)}
              placeholder="512"
            />
            <Input
              label="Height (px)"
              type="number"
              min="1"
              value={height}
              onChange={(event) => setHeight(event.target.value)}
              placeholder="512"
            />
          </div>
        )}
        {config.showQuality && (
          <div className="mt-4">
            <Input
              label="JPEG quality (0.1–1)"
              type="number"
              min="0.1"
              max="1"
              step="0.05"
              value={quality}
              onChange={(event) => setQuality(event.target.value)}
              placeholder="0.8"
            />
          </div>
        )}
        <div className="mt-4 flex flex-wrap gap-3">
          <Button type="button" onClick={handleProcess} disabled={isProcessing || !file}>
            {isProcessing ? "Processing…" : "Convert image"}
          </Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </ToolInputPanel>
      {error && <ToolErrorAlert message={error} />}
      {downloadBlob && (
        <ToolOutputPanel actions={<Button type="button" onClick={handleDownload}>{downloadLabel}</Button>}>
          {file && (
            <p className="mb-3 text-sm text-muted">
              {formatFileSize(file.size)} → {formatFileSize(downloadBlob.size)}
              {downloadBlob.size < file.size ? " (smaller)" : downloadBlob.size > file.size ? " (larger)" : ""}
            </p>
          )}
          {previewUrl ? (
            <div className="flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt="Converted image preview"
                className="max-h-64 w-auto rounded-lg border border-border"
              />
            </div>
          ) : (
            <p className="text-sm text-muted">
              File ready: {downloadName}. Click download to save.
            </p>
          )}
        </ToolOutputPanel>
      )}
    </div>
  );
};
