import { cn } from "@/lib/utils/cn";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

/** Text label — not a pill. Use for status and category metadata. */
export const Badge = ({ children, className, style }: BadgeProps) => {
  return (
    <span
      className={cn(
        "type-label inline-flex items-center text-muted",
        className,
      )}
      style={style}
    >
      {children}
    </span>
  );
};
