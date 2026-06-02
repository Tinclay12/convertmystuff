"use client";

import { CopyButton } from "@/components/ui/CopyButton";
import { DownloadButton } from "@/components/ui/DownloadButton";
import { ShareLinkButton } from "@/components/tools/ShareLinkButton";
import { trackToolEvent } from "@/lib/analytics/tool-events";

type ToolOutputActionsProps = {
  toolId: string;
  componentKey?: string;
  copyValue: string;
  copyLabel?: string;
  download?: {
    content: string;
    filename: string;
    mimeType?: string;
  };
  shareUrl?: string;
  shareDisabled?: boolean;
};

export const ToolOutputActions = ({
  toolId,
  componentKey,
  copyValue,
  copyLabel = "Copy",
  download,
  shareUrl = "",
  shareDisabled = false,
}: ToolOutputActionsProps) => {
  const handleCopy = () => {
    if (copyValue) {
      trackToolEvent("tool_copy", { tool_id: toolId, component_key: componentKey });
    }
  };

  const handleDownload = () => {
    if (download?.content) {
      trackToolEvent("tool_download", {
        tool_id: toolId,
        component_key: componentKey,
        export_format: download.filename.split(".").pop(),
      });
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <CopyButton value={copyValue} label={copyLabel} onCopied={handleCopy} />
      {download && (
        <DownloadButton
          content={download.content}
          filename={download.filename}
          mimeType={download.mimeType}
          onDownloaded={handleDownload}
        />
      )}
      <ShareLinkButton
        shareUrl={shareUrl}
        toolId={toolId}
        componentKey={componentKey}
        disabled={shareDisabled}
      />
    </div>
  );
};
