import { cn } from "@/lib/utils/cn";

type EmptyStateProps = {
  title: string;
  description: string;
  className?: string;
};

export const EmptyState = ({ title, description, className }: EmptyStateProps) => {
  return (
    <div
      className={cn(
        "rounded-lg border border-dashed border-border bg-accent-soft/30 px-6 py-10 text-center",
        className,
      )}
    >
      <p className="text-base font-medium text-foreground">{title}</p>
      <p className="mt-2 text-sm text-muted">{description}</p>
    </div>
  );
};
