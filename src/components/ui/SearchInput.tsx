"use client";

import { MagnifyingGlass, X } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils/cn";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  id?: string;
  className?: string;
  hideLabel?: boolean;
};

export const SearchInput = ({
  value,
  onChange,
  placeholder = "Search tools…",
  label = "Search tools",
  id = "tool-search",
  className,
  hideLabel = false,
}: SearchInputProps) => {
  const handleClear = () => {
    onChange("");
  };

  return (
    <div className={cn("relative", className)}>
      <label
        htmlFor={id}
        className={cn(
          "mb-2 block text-xs font-semibold uppercase tracking-wide text-muted",
          hideLabel && "sr-only",
        )}
      >
        {label}
      </label>
      <div className="relative">
        <MagnifyingGlass
          size={18}
          weight="bold"
          aria-hidden="true"
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
        />
        <input
          id={id}
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-border bg-card py-3 pl-11 pr-11 text-base text-foreground placeholder:text-muted transition-colors focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15"
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="absolute right-2.5 top-1/2 inline-flex -translate-y-1/2 items-center justify-center rounded-md p-1.5 text-muted transition-colors hover:bg-panel-muted hover:text-foreground"
          >
            <X size={16} weight="bold" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
};
