export type AreaUnit = "sqm" | "sqft";
export const SQUARE_METERS_PER_SQUARE_FOOT = 0.09290304;
export const areaUnits = {
  sqm: { name: "Square meters", symbol: "m²", length: "m" },
  sqft: { name: "Square feet", symbol: "ft²", length: "ft" },
} as const;
export type AreaResult =
  | { ok: true; sqm: number; sqft: number }
  | { ok: false; error: string };

export function parseAreaNumber(raw: string): number | null {
  const text = raw.trim();
  // Accept English grouping (1,000.5), decimals and scientific notation, not ambiguous lists.
  if (
    !/^(?:\d+(?:\.\d*)?|\.\d+|\d{1,3}(?:,\d{3})+(?:\.\d*)?)(?:e[+-]?\d+)?$/i.test(
      text,
    )
  )
    return null;
  const number = Number(text.replaceAll(",", ""));
  return Number.isFinite(number) && number >= 0 ? number : null;
}

export function convertArea(raw: string, unit: AreaUnit): AreaResult {
  const value = parseAreaNumber(raw);
  if (value === null)
    return {
      ok: false,
      error: "Enter a non-negative number, such as 100 or 1,000.5.",
    };
  const sqm = unit === "sqm" ? value : value * SQUARE_METERS_PER_SQUARE_FOOT;
  const sqft = unit === "sqft" ? value : value / SQUARE_METERS_PER_SQUARE_FOOT;
  if (![sqm, sqft].every(Number.isFinite))
    return {
      ok: false,
      error: "This area is too large to convert. Try a smaller value.",
    };
  return { ok: true, sqm, sqft };
}

export function calculateRoomArea(
  length: string,
  width: string,
  unit: AreaUnit,
): AreaResult {
  const l = parseAreaNumber(length);
  const w = parseAreaNumber(width);
  if (l === null || w === null)
    return { ok: false, error: "Enter a non-negative length and width." };
  return convertArea(String(l * w), unit);
}

export function convertAreaList(text: string, unit: AreaUnit) {
  const lines = text
    .split(/\r?\n/)
    .map((raw, index) => ({ raw: raw.trim(), line: index + 1 }))
    .filter((line) => line.raw);
  if (lines.length > 200)
    return { error: "Convert up to 200 values at a time.", rows: [] };
  return {
    error: "",
    rows: lines.map((line) => ({
      ...line,
      result: convertArea(line.raw, unit),
    })),
  };
}

export function areaCsv(text: string, unit: AreaUnit): string | null {
  const batch = convertAreaList(text, unit);
  if (
    batch.error ||
    !batch.rows.length ||
    batch.rows.some((row) => !row.result.ok)
  )
    return null;
  return (
    "Square meters,Square feet\r\n" +
    batch.rows
      .map(({ result }) => (result.ok ? `${result.sqm},${result.sqft}` : ""))
      .join("\r\n")
  );
}
