import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils/cn";

type SectionProps = {
  id?: string;
  title?: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  children: React.ReactNode;
  className?: string;
  spacing?: "default" | "tight" | "loose";
};

const spacingClasses: Record<NonNullable<SectionProps["spacing"]>, string> = {
  default: "mt-16",
  tight: "mt-10",
  loose: "mt-24",
};

export const Section = ({
  id,
  title,
  description,
  href,
  linkLabel = "View all",
  children,
  className,
  spacing = "default",
}: SectionProps) => {
  return (
    <section id={id} className={cn(spacingClasses[spacing], className)}>
      {(title || href) && (
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            {title && (
              <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted">
                {description}
              </p>
            )}
          </div>
          {href && (
            <Link
              href={href}
              className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-primary-hover"
            >
              {linkLabel}
              <ArrowRight
                size={14}
                weight="bold"
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          )}
        </div>
      )}
      {children}
    </section>
  );
};
