import type { ToolStatus } from "@/lib/tools/types";
import { cn } from "@/lib/utils/cn";

type ToolStatusBadgeProps = {
  status: ToolStatus;
  className?: string;
};

const statusConfig: Record<ToolStatus, { label: string; className: string }> = {
  published: { label: "Live", className: "text-success" },
  stub: { label: "Coming soon", className: "text-stub" },
  planned: { label: "Planned", className: "text-planned" },
  draft: { label: "Planned", className: "text-planned" },
  noindex: { label: "Limited", className: "text-warning" },
  archived: { label: "Archived", className: "text-muted" },
};

export const ToolStatusBadge = ({ status, className }: ToolStatusBadgeProps) => {
  const config = statusConfig[status];

  return (
    <span className={cn("type-label", config.className, className)}>
      {config.label}
    </span>
  );
};

export const StatusBadge = ToolStatusBadge;
