"use client";

import { DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/Button";

type DownloadButtonProps = {
  content: string;
  filename: string;
  label?: string;
  mimeType?: string;
  onDownloaded?: () => void;
};

export const DownloadButton = ({
  content,
  filename,
  label = "Download",
  mimeType = "text/plain;charset=utf-8",
  onDownloaded,
}: DownloadButtonProps) => {
  const handleDownload = () => {
    if (!content) {
      return;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    anchor.hidden = true;
    document.body.appendChild(anchor);
    try {
      anchor.click();
      onDownloaded?.();
    } finally {
      anchor.remove();
      // Keep the blob alive until the browser has started reading the download.
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
  };

  return (
    <Button
      type="button"
      variant="secondary"
      onClick={handleDownload}
      disabled={!content}
      icon={<DownloadSimple size={16} weight="bold" aria-hidden="true" />}
    >
      {label}
    </Button>
  );
};
