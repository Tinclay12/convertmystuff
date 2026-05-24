import { cn } from "@/lib/utils/cn";

type ToolActionBarProps = {
  primary?: React.ReactNode;
  secondary?: React.ReactNode;
  className?: string;
};

export const ToolActionBar = ({ primary, secondary, className }: ToolActionBarProps) => {
  if (!primary && !secondary) {
    return null;
  }

  return (
    <div className={cn("flex flex-wrap items-center justify-between gap-3 pt-2", className)}>
      <div>{primary}</div>
      <div className="flex flex-wrap items-center gap-2">{secondary}</div>
    </div>
  );
};
