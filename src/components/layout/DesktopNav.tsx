"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import { CategoryIcon } from "@/lib/theme/category-icons";
import { getCategoryAccent } from "@/lib/theme/category-theme";
import type { CategoryDefinition } from "@/lib/tools/types";
import { cn } from "@/lib/utils/cn";

type DesktopNavProps = {
  categories: CategoryDefinition[];
};

const isHomeActive = (pathname: string): boolean => {
  return pathname === "/";
};

const isAllToolsActive = (pathname: string): boolean => {
  return pathname === "/tools" || pathname.startsWith("/tools/");
};

const isGuidesActive = (pathname: string): boolean => {
  return pathname === "/guides" || pathname.startsWith("/guides/");
};

const isResourcesActive = (pathname: string): boolean => {
  return pathname === "/resources" || pathname.startsWith("/resources/");
};

const isCategoryActive = (pathname: string, category: CategoryDefinition): boolean => {
  const categoryPath = category.path.replace(/\/$/, "");
  return pathname === categoryPath || pathname.startsWith(`${categoryPath}/`);
};

export const DesktopNav = ({ categories }: DesktopNavProps) => {
  const pathname = usePathname();
  const [menuState, setMenuState] = useState<{ isOpen: boolean; pathname: string }>({
    isOpen: false,
    pathname,
  });
  const navRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const isOpen = menuState.isOpen && menuState.pathname === pathname;

  const handleClose = useCallback(() => {
    setMenuState({ isOpen: false, pathname });
    triggerRef.current?.focus();
  }, [pathname]);

  const handleToggle = () => {
    setMenuState((prev) =>
      prev.isOpen && prev.pathname === pathname
        ? { isOpen: false, pathname }
        : { isOpen: true, pathname },
    );
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose]);

  const homeActive = isHomeActive(pathname);
  const allToolsActive = isAllToolsActive(pathname);
  const guidesActive = isGuidesActive(pathname);
  const resourcesActive = isResourcesActive(pathname);
  const hasActiveCategory = categories.some((category) => isCategoryActive(pathname, category));

  return (
    <nav
      ref={navRef}
      aria-label="Main navigation"
      className="relative hidden lg:block"
    >
      <ul className="flex items-center gap-1">
        <li>
          <Link
            href="/"
            className={cn(
              "px-3 py-1.5 text-sm font-medium transition-colors",
              homeActive
                ? "bg-panel-muted font-semibold text-foreground"
                : "text-muted hover:bg-panel-muted hover:text-foreground",
            )}
            aria-current={homeActive ? "page" : undefined}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/tools/"
            className={cn(
              "px-3 py-1.5 text-sm font-medium transition-colors",
              allToolsActive
                ? "bg-panel-muted font-semibold text-foreground"
                : "text-muted hover:bg-panel-muted hover:text-foreground",
            )}
            aria-current={allToolsActive ? "page" : undefined}
          >
            All Tools
          </Link>
        </li>
        <li>
          <Link
            href="/guides/"
            className={cn(
              "px-3 py-1.5 text-sm font-medium transition-colors",
              guidesActive
                ? "bg-panel-muted font-semibold text-foreground"
                : "text-muted hover:bg-panel-muted hover:text-foreground",
            )}
            aria-current={guidesActive ? "page" : undefined}
          >
            Guides
          </Link>
        </li>
        <li>
          <Link
            href="/resources/"
            className={cn(
              "px-3 py-1.5 text-sm font-medium transition-colors",
              resourcesActive
                ? "bg-panel-muted font-semibold text-foreground"
                : "text-muted hover:bg-panel-muted hover:text-foreground",
            )}
            aria-current={resourcesActive ? "page" : undefined}
          >
            Resources
          </Link>
        </li>
        <li className="relative">
          <button
            ref={triggerRef}
            type="button"
            onClick={handleToggle}
            aria-expanded={isOpen}
            aria-haspopup="menu"
            aria-controls="categories-menu-panel"
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
              isOpen || hasActiveCategory
                ? "bg-panel-muted text-foreground"
                : "text-muted hover:bg-panel-muted hover:text-foreground",
            )}
          >
            Categories
            <CaretDown
              size={14}
              weight="bold"
              aria-hidden="true"
              className={cn(
                "shrink-0 transition-transform duration-200",
                isOpen && "rotate-180",
              )}
            />
          </button>

          {isOpen && (
            <div
              id="categories-menu-panel"
              role="menu"
              aria-label="Browse categories"
              className="absolute right-0 top-full z-50 mt-2 w-[480px] overflow-hidden rounded-2xl border border-border bg-card shadow-lg xl:w-[640px]"
            >
              <ul className="grid grid-cols-2 gap-1 p-3 xl:grid-cols-3">
                {categories.map((category) => {
                  const accentSlug = category.accentSlug ?? category.slug;
                  const accent = getCategoryAccent(accentSlug);
                  const isActive = isCategoryActive(pathname, category);

                  return (
                    <li key={category.id} role="none">
                      <Link
                        href={category.path}
                        role="menuitem"
                        onClick={handleClose}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                          isActive
                            ? "bg-panel-muted font-medium text-foreground"
                            : "text-foreground hover:bg-panel-muted",
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                          style={{
                            backgroundColor: accent.bg,
                            color: accent.accent,
                          }}
                        >
                          <CategoryIcon slug={accentSlug} size={18} />
                        </span>
                        <span className="min-w-0 leading-snug">{category.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="border-t border-border px-4 py-3">
                <Link
                  href="/tools/"
                  role="menuitem"
                  onClick={handleClose}
                  className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  View all tools
                </Link>
              </div>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};
