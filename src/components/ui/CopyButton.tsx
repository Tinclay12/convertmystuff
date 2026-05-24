"use client";

import { useState } from "react";
import { Check, Copy } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

type CopyButtonProps = {
  value: string;
  label?: string;
};

export const CopyButton = ({ value, label = "Copy" }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const handleCopy = async () => {
    if (!value) {
      return;
    }

    await navigator.clipboard.writeText(value);
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
    </>
  );
};
