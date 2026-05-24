import { cn } from "@/lib/utils/cn";

type StatPillProps = {
  label: string;
  value: string;
  accentClassName?: string;
  className?: string;
};

export const StatPill = ({
  label,
  value,
  accentClassName,
  className,
}: StatPillProps) => {
  return (
    <div
      className={cn(
        "inline-flex flex-col rounded-2xl border border-border bg-card px-4 py-3",
        accentClassName,
        className,
      )}
    >
      <span className="font-display text-2xl font-bold tracking-tight text-foreground tabular-nums">
        {value}
      </span>
      <span className="mt-0.5 text-xs font-medium text-muted">{label}</span>
    </div>
  );
};
