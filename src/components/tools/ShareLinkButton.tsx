"use client";

import { useState } from "react";
import { Check, LinkSimple } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/Button";
import { trackToolEvent } from "@/lib/analytics/tool-events";
import { cn } from "@/lib/utils/cn";

type ShareLinkButtonProps = {
  shareUrl: string;
  toolId: string;
  componentKey?: string;
  label?: string;
  disabled?: boolean;
};

export const ShareLinkButton = ({
  shareUrl,
  toolId,
  componentKey,
  label = "Copy link",
  disabled = false,
}: ShareLinkButtonProps) => {
  const [copied, setCopied] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const handleShare = async () => {
    if (!shareUrl || disabled) {
      return;
    }

    await navigator.clipboard.writeText(shareUrl);
    trackToolEvent("tool_share", { tool_id: toolId, component_key: componentKey });
    setCopied(true);
    setAnnouncement("Share link copied");
    window.setTimeout(() => {
      setCopied(false);
      setAnnouncement("");
    }, 1500);
  };

  return (
    <>
      <span className="sr-only" aria-live="polite">
        {announcement}
      </span>
      <Button
        type="button"
        variant="secondary"
        onClick={handleShare}
        disabled={disabled || !shareUrl}
        aria-label={label}
        icon={
          copied ? (
            <Check size={16} weight="bold" aria-hidden="true" />
          ) : (
            <LinkSimple size={16} weight="bold" aria-hidden="true" />
          )
        }
        className={cn(copied && "animate-result-flash border-success/40 bg-success-bg text-success")}
      >
        {copied ? "Link copied" : label}
      </Button>
    </>
  );
};
