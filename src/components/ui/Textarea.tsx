import { cn } from "@/lib/utils/cn";
import { DEFAULT_TOOL_LIMITS } from "@/lib/limits";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  helperText?: string;
  error?: string;
  isOutput?: boolean;
  hideLabel?: boolean;
};

export const Textarea = ({
  label,
  id,
  helperText,
  error,
  isOutput = false,
  className = "",
  hideLabel = false,
  readOnly,
  maxLength,
  ...props
}: TextareaProps) => {
  const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  const outputMode = isOutput || readOnly;
  const inputMaxLength =
    maxLength ?? (outputMode ? undefined : DEFAULT_TOOL_LIMITS.maxInputLength);

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
      <textarea
        id={fieldId}
        readOnly={readOnly}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={
          error ? `${fieldId}-error` : helperText ? `${fieldId}-helper` : undefined
        }
        className={cn(
          "min-h-40 w-full rounded-xl border px-3.5 py-3 font-mono text-sm leading-relaxed transition-colors focus:outline-none",
          outputMode
            ? "border-border bg-background-subtle text-foreground"
            : "border-border bg-card text-foreground focus:border-accent focus:ring-4 focus:ring-accent/15",
          error && "border-destructive focus:border-destructive focus:ring-destructive/15",
          className,
        )}
        maxLength={inputMaxLength}
        {...props}
      />
      {helperText && !error && (
        <p className="mt-1.5 text-xs text-muted">{helperText}</p>
      )}
      {error && (
        <p role="alert" className="mt-1.5 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
};
