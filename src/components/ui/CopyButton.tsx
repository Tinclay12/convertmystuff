"use client";

import { useState } from "react";
import { Check, Copy } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

type CopyButtonProps = {
  value: string;
  label?: string;
  onCopied?: () => void;
};

export const CopyButton = ({ value, label = "Copy", onCopied }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const [copyError, setCopyError] = useState("");

  const handleCopy = async () => {
    if (!value) {
      return;
    }

    setCopyError("");
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      setCopyError("Copy is unavailable. Select the result text and copy it manually.");
      return;
    }
    onCopied?.();
    setCopied(true);
    setAnnouncement("Copied to clipboard");
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
        onClick={handleCopy}
        disabled={!value}
        aria-label={label}
        icon={
          copied ? (
            <Check size={16} weight="bold" aria-hidden="true" />
          ) : (
            <Copy size={16} weight="bold" aria-hidden="true" />
          )
        }
        className={cn(copied && "animate-result-flash border-success/40 bg-success-bg text-success")}
      >
        {copied ? "Copied" : label}
      </Button>
      {copyError && <p role="status" className="w-full text-xs text-muted-strong">{copyError}</p>}
    </>
  );
};
