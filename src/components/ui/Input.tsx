import { cn } from "@/lib/utils/cn";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  helperText?: string;
  error?: string;
  hideLabel?: boolean;
};

export const Input = ({
  label,
  id,
  helperText,
  error,
  className = "",
  hideLabel = false,
  ...props
}: InputProps) => {
  const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div>
      <label
        htmlFor={fieldId}
        className={cn(
          "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted",
          hideLabel && "sr-only",
        )}
      >
        {label}
      </label>
      <input
        id={fieldId}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={
          error ? `${fieldId}-error` : helperText ? `${fieldId}-helper` : undefined
        }
        className={cn(
          "w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-[15px] text-foreground transition-colors placeholder:text-muted focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15",
          error && "border-destructive focus:border-destructive focus:ring-destructive/15",
          className,
        )}
        {...props}
      />
      {helperText && !error && (
        <p id={`${fieldId}-helper`} className="mt-1.5 text-xs text-muted">
          {helperText}
        </p>
      )}
      {error && (
        <p id={`${fieldId}-error`} role="alert" className="mt-1.5 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
};
