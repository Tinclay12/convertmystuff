import { cn } from "@/lib/utils/cn";

type FeaturePillProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "accent" | "neutral" | "success";
  icon?: React.ReactNode;
  className?: string;
};

const variantClasses = {
  primary: "bg-accent-soft text-accent ring-accent/15",
  secondary: "bg-background-subtle text-foreground ring-border",
  accent: "bg-accent-soft text-accent ring-accent/15",
  neutral: "bg-background-subtle text-muted-strong ring-border",
  success: "bg-success-bg text-success ring-success/15",
};

export const FeaturePill = ({
  children,
  variant = "neutral",
  icon,
  className,
}: FeaturePillProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset",
        variantClasses[variant],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
};
