"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils/cn";

type ToolOutputPanelProps = {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  highlightKey?: string;
  className?: string;
};

export const ToolOutputPanel = ({
  title = "Result",
  description,
  actions,
  children,
  highlightKey,
  className,
}: ToolOutputPanelProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!highlightKey || !contentRef.current) {
      return;
    }

    contentRef.current.classList.remove("animate-output-highlight");
    void contentRef.current.offsetWidth;
    contentRef.current.classList.add("animate-output-highlight");
  }, [highlightKey]);

  return (
    <section
      aria-label={title}
      className={cn(
        "rounded-2xl border border-border bg-background-subtle px-5 py-5 sm:px-6",
        className,
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border pb-3">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-strong">
            {title}
          </h2>
          {description && <p className="mt-1 text-sm text-muted">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      </div>
      <div ref={contentRef} className="pt-4">
        {children}
      </div>
    </section>
  );
};
