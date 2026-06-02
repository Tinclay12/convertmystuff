import type { ToolExample } from "@/lib/tools/types";

export type ToolUrlPrefill = {
  value?: string;
  fields: Record<string, string>;
};

export const getExamplePrefillValue = (example: ToolExample): string | undefined => {
  const fromField = example.prefillValue?.trim();
  if (fromField) {
    return fromField;
  }
  const fromInput = example.input?.trim();
  if (!fromInput || fromInput === "See tool fields") {
    return undefined;
  }
  return fromInput;
};

export const getExamplePrefillQuery = (example: ToolExample): string | undefined => {
  const query = example.prefillQuery?.trim();
  if (query) {
    return query;
  }
  const value = getExamplePrefillValue(example);
  if (!value) {
    return undefined;
  }
  return `value=${encodeURIComponent(value)}`;
};

export const parseToolSearchParams = (
  searchParams: URLSearchParams | Readonly<Record<string, string | string[] | undefined>>,
): ToolUrlPrefill => {
  const fields: Record<string, string> = {};
  let value: string | undefined;

  if (searchParams instanceof URLSearchParams) {
    value = searchParams.get("value") ?? undefined;
    searchParams.forEach((paramValue, key) => {
      if (key === "value") {
        return;
      }
      fields[key] = paramValue;
    });
    return { value, fields };
  }

  for (const [key, raw] of Object.entries(searchParams)) {
    const paramValue = Array.isArray(raw) ? raw[0] : raw;
    if (!paramValue) {
      continue;
    }
    if (key === "value") {
      value = paramValue;
    } else {
      fields[key] = paramValue;
    }
  }

  return { value, fields };
};

export const buildToolShareSearch = (params: Record<string, string>): string => {
  const query = new URLSearchParams();
  for (const [key, paramValue] of Object.entries(params)) {
    if (paramValue.trim()) {
      query.set(key, paramValue);
    }
  }
  return query.toString();
};

export const buildToolShareUrl = (pathname: string, params: Record<string, string>): string => {
  if (typeof window === "undefined") {
    return pathname;
  }
  const query = buildToolShareSearch(params);
  const base = `${window.location.origin}${pathname}`;
  return query ? `${base}?${query}` : base;
};

export const applyExampleToFields = (
  example: ToolExample,
  fieldKeys: string[],
): Record<string, string> => {
  if (example.prefillQuery) {
    const parsed = new URLSearchParams(example.prefillQuery);
    const fields: Record<string, string> = {};
    parsed.forEach((value, key) => {
      fields[key] = value;
    });
    return fields;
  }

  const input = getExamplePrefillValue(example);
  if (!input || fieldKeys.length === 0) {
    return {};
  }

  const parts = input.split(/[,;|]/).map((part) => part.trim()).filter(Boolean);
  if (parts.length >= fieldKeys.length) {
    return Object.fromEntries(fieldKeys.map((key, index) => [key, parts[index] ?? ""]));
  }

  return { [fieldKeys[0]!]: input };
};
