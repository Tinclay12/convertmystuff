import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "subtle";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  iconRight?: ReactNode;
};

const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "h-8 gap-1.5 px-3 text-xs",
  md: "h-10 gap-2 px-4 text-sm",
  lg: "h-12 gap-2 px-5 text-base",
};

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-accent text-accent-foreground shadow-sm hover:bg-primary-hover active:scale-[0.98]",
  secondary:
    "border border-border-strong bg-card text-foreground hover:bg-panel-muted active:scale-[0.98]",
  ghost: "text-foreground hover:bg-panel-muted active:scale-[0.98]",
  outline:
    "border border-accent/40 bg-card text-accent hover:border-accent hover:bg-accent-soft active:scale-[0.98]",
  subtle:
    "bg-accent-soft text-accent hover:bg-accent-soft-strong active:scale-[0.98]",
};

const base =
  "inline-flex shrink-0 items-center justify-center rounded-xl font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/20 disabled:pointer-events-none disabled:opacity-50";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      className = "",
      icon,
      iconRight,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(base, sizes[size], variants[variant], className)}
        {...props}
      >
        {icon}
        {children}
        {iconRight}
      </button>
    );
  },
);

Button.displayName = "Button";
