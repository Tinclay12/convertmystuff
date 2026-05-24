"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MagnifyingGlass, X } from "@phosphor-icons/react/dist/ssr";
import type { SerializableTool } from "@/components/tools/ToolSearch";
import { searchTools } from "@/lib/tools/access";
import type { ToolDefinition } from "@/lib/tools/types";
import { cn } from "@/lib/utils/cn";

type HeaderSearchProps = {
  tools: SerializableTool[];
  className?: string;
  compact?: boolean;
};

export const HeaderSearch = ({ tools, className, compact = false }: HeaderSearchProps) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const results = useMemo(() => {
    if (!query.trim()) {
      return [];
    }
    return searchTools(query, tools as ToolDefinition[]).slice(0, 6);
  }, [query, tools]);

  const handleBlur = () => {
    window.setTimeout(() => setIsOpen(false), 150);
  };

  const handleClear = () => {
    setQuery("");
  };

  if (compact) {
    return (
      <Link
        href="/tools/"
        aria-label="Search tools"
        className={cn(
          "inline-flex items-center justify-center rounded-xl border border-border bg-card p-2 text-muted transition-colors hover:border-border-strong hover:text-foreground lg:hidden",
          className,
        )}
      >
        <MagnifyingGlass size={18} weight="bold" aria-hidden="true" />
      </Link>
    );
  }

  return (
    <div className={cn("relative hidden w-full max-w-xs lg:block xl:max-w-sm", className)}>
      <label htmlFor="header-tool-search" className="sr-only">
        Search tools
      </label>
      <div className="relative">
        <MagnifyingGlass
          size={16}
          weight="bold"
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
        />
        <input
          id="header-tool-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={handleBlur}
          placeholder="Search tools…"
          className="w-full rounded-xl border border-border bg-card py-2 pl-9 pr-9 text-sm text-foreground placeholder:text-muted transition-colors focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 inline-flex -translate-y-1/2 items-center justify-center rounded-md p-1 text-muted hover:bg-panel-muted hover:text-foreground"
          >
            <X size={14} weight="bold" aria-hidden="true" />
          </button>
        )}
      </div>
      {isOpen && query.trim() && (
        <div className="animate-search-fade-in absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
          {results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-muted">No tools found</p>
          ) : (
            <ul>
              {results.map((tool) => (
                <li key={tool.id} className="border-b border-border last:border-b-0">
                  <Link
                    href={tool.path}
                    className="block px-4 py-2.5 transition-colors hover:bg-panel-muted"
                    onClick={() => {
                      setQuery("");
                      setIsOpen(false);
                    }}
                  >
                    <span className="block text-sm font-medium text-foreground">{tool.title}</span>
                    <span className="block truncate text-xs text-muted">{tool.shortDescription}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <div className="border-t border-border bg-background-subtle px-4 py-2">
            <Link href="/tools/" className="text-xs font-semibold text-accent hover:underline">
              View all tools →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
