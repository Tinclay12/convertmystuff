"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { List, X } from "@phosphor-icons/react/dist/ssr";
import { getCategoryAccent } from "@/lib/theme/category-theme";
import type { CategoryDefinition } from "@/lib/tools/types";
import { cn } from "@/lib/utils/cn";

type MobileNavProps = {
  categories: CategoryDefinition[];
};

const isHomeActive = (pathname: string): boolean => pathname === "/";

const isAllToolsActive = (pathname: string): boolean =>
  pathname === "/tools" || pathname.startsWith("/tools/");

const isGuidesActive = (pathname: string): boolean =>
  pathname === "/guides" || pathname.startsWith("/guides/");

const isResourcesActive = (pathname: string): boolean =>
  pathname === "/resources" || pathname.startsWith("/resources/");

const isCategoryActive = (pathname: string, category: CategoryDefinition): boolean => {
  const categoryPath = category.path.replace(/\/$/, "");
  return pathname === categoryPath || pathname.startsWith(`${categoryPath}/`);
};

export const MobileNav = ({ categories }: MobileNavProps) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const homeActive = isHomeActive(pathname);
  const allToolsActive = isAllToolsActive(pathname);
  const guidesActive = isGuidesActive(pathname);
  const resourcesActive = isResourcesActive(pathname);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-panel"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="inline-flex items-center justify-center rounded-lg border border-border bg-card p-2 text-foreground transition-colors hover:bg-panel-muted"
      >
        {isOpen ? (
          <X size={20} weight="bold" aria-hidden="true" />
        ) : (
          <List size={20} weight="bold" aria-hidden="true" />
        )}
      </button>

      {isOpen && (
        <nav
          id="mobile-nav-panel"
          aria-label="Mobile navigation"
          className="absolute inset-x-0 top-full z-50 border-b border-border bg-card shadow-md"
        >
          <ul className="mx-auto max-w-6xl space-y-1 px-4 py-4 sm:px-6">
            <li>
              <Link
                href="/"
                onClick={handleClose}
                aria-current={homeActive ? "page" : undefined}
                className={cn(
                  "block rounded-lg px-3 py-2 text-sm font-medium hover:bg-panel-muted",
                  homeActive ? "bg-panel-muted font-semibold text-foreground" : "text-muted",
                )}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/tools/"
                onClick={handleClose}
                aria-current={allToolsActive ? "page" : undefined}
                className={cn(
                  "block rounded-lg px-3 py-2 text-sm font-medium hover:bg-panel-muted",
                  allToolsActive
                    ? "bg-panel-muted font-semibold text-foreground"
                    : "text-muted",
                )}
              >
                All Tools
              </Link>
            </li>
            <li>
              <Link
                href="/guides/"
                onClick={handleClose}
                aria-current={guidesActive ? "page" : undefined}
                className={cn(
                  "block rounded-lg px-3 py-2 text-sm font-medium hover:bg-panel-muted",
                  guidesActive
                    ? "bg-panel-muted font-semibold text-foreground"
                    : "text-muted",
                )}
              >
                Guides
              </Link>
            </li>
            <li>
              <Link
                href="/resources/"
                onClick={handleClose}
                aria-current={resourcesActive ? "page" : undefined}
                className={cn(
                  "block rounded-lg px-3 py-2 text-sm font-medium hover:bg-panel-muted",
                  resourcesActive
                    ? "bg-panel-muted font-semibold text-foreground"
                    : "text-muted",
                )}
              >
                Resources
              </Link>
            </li>
            {categories.map((category) => {
              const accent = getCategoryAccent(category.accentSlug ?? category.slug);
              const categoryActive = isCategoryActive(pathname, category);
              return (
                <li key={category.id}>
                  <Link
                    href={category.path}
                    onClick={handleClose}
                    aria-current={categoryActive ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-panel-muted",
                      categoryActive
                        ? "bg-panel-muted font-semibold text-foreground"
                        : "text-foreground",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: accent.accent }}
                    />
                    {category.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
};
