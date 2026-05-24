import { cn } from "@/lib/utils/cn";

type ToolSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
};

export const ToolSelect = ({ label, id, className = "", ...props }: ToolSelectProps) => {
  const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div>
      <label htmlFor={fieldId} className="mb-2 block text-sm font-medium text-foreground">
        {label}
      </label>
      <select
        id={fieldId}
        className={cn(
          "w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:w-auto",
          className,
        )}
        {...props}
      />
    </div>
  );
};
