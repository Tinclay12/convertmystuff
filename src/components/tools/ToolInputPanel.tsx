import { cn } from "@/lib/utils/cn";

type ToolInputPanelProps = {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
};

export const ToolInputPanel = ({
  title = "Input",
  description,
  children,
  className,
}: ToolInputPanelProps) => {
  return (
    <section aria-label={title} className={cn("space-y-4", className)}>
      {(title || description) && (
        <div>
          <h2 className="text-sm font-semibold text-foreground">{title}</h2>
          {description && <p className="mt-0.5 text-sm text-muted">{description}</p>}
        </div>
      )}
      {children}
    </section>
  );
};
