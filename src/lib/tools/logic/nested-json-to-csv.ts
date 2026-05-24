import type { CsvDelimiter } from "./json-to-csv";
import { jsonToCsv } from "./json-to-csv";

export type NestedJsonToCsvResult =
  | { ok: true; csv: string; columns: string[] }
  | { ok: false; error: string };

const flattenObject = (
  value: Record<string, unknown>,
  prefix = "",
): Record<string, unknown> => {
  const flattened: Record<string, unknown> = {};

  Object.entries(value).forEach(([key, nestedValue]) => {
    const nextKey = prefix ? `${prefix}.${key}` : key;

    if (
      nestedValue &&
      typeof nestedValue === "object" &&
      !Array.isArray(nestedValue)
    ) {
      Object.assign(
        flattened,
        flattenObject(nestedValue as Record<string, unknown>, nextKey),
      );
      return;
    }

    flattened[nextKey] = nestedValue;
  });

  return flattened;
};

export const nestedJsonToCsv = (
  input: string,
  delimiter: CsvDelimiter = ",",
): NestedJsonToCsvResult => {
  const trimmed = input.trim();

  if (!trimmed) {
    return { ok: false, error: "Paste nested JSON to convert." };
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(trimmed);
  } catch {
    return { ok: false, error: "Invalid JSON input." };
  }

  if (!Array.isArray(parsed)) {
    return { ok: false, error: "JSON must be an array of objects." };
  }

  const flattenedRows = parsed.map((item) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) {
      return null;
    }

    return flattenObject(item as Record<string, unknown>);
  });

  if (flattenedRows.some((row) => row === null)) {
    return { ok: false, error: "Each array item must be an object." };
  }

  return jsonToCsv(JSON.stringify(flattenedRows), delimiter);
};
