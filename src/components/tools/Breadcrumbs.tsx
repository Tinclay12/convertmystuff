import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import type { BreadcrumbItem } from "@/lib/seo/schema";
import { cn } from "@/lib/utils/cn";

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {
  return (
    <nav aria-label="Breadcrumb" className={cn("mb-6 text-sm text-muted", className)}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {index > 0 && (
                <CaretRight
                  size={12}
                  weight="bold"
                  aria-hidden="true"
                  className="text-muted/50"
                />
              )}
              {isLast ? (
                <span aria-current="page" className="font-medium text-foreground">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
