import { cn } from "@/lib/utils/cn";

type CardProps = {
  children: React.ReactNode;
  variant?: "default" | "interactive" | "muted" | "inset" | "elevated";
  className?: string;
  style?: React.CSSProperties;
  as?: "div" | "section" | "article";
};

const variantClasses: Record<NonNullable<CardProps["variant"]>, string> = {
  default: "rounded-2xl border border-border bg-card shadow-xs",
  interactive:
    "rounded-2xl border border-border bg-card shadow-xs transition-all duration-200 hover:border-border-strong hover:shadow-md hover:-translate-y-0.5",
  muted: "rounded-2xl border border-border bg-background-subtle",
  inset: "rounded-2xl border border-border bg-card",
  elevated: "rounded-2xl border border-border bg-card shadow-md",
};

export const Card = ({
  children,
  variant = "default",
  className,
  style,
  as: Component = "div",
}: CardProps) => {
  return (
    <Component className={cn(variantClasses[variant], className)} style={style}>
      {children}
    </Component>
  );
};
