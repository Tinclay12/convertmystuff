import type { LogicResult } from "./unit-conversions";

export type ResultLine = {
  label: string;
  value: string;
};

export const buildCalculatorSummary = (
  fieldLabels: Record<string, string>,
  values: Record<string, string>,
  result: Extract<LogicResult, { ok: true }>,
): string => {
  const inputLines = Object.entries(values)
    .filter(([, value]) => value.trim())
    .map(([key, value]) => `${fieldLabels[key] ?? key}: ${value}`);

  const lines = [...inputLines, `Result: ${result.output}`];
  if (result.resultLines?.length) {
    for (const line of result.resultLines) {
      lines.push(`${line.label}: ${line.value}`);
    }
  }

  return lines.join("\n");
};

export const getPrimaryResultLine = (
  result: Extract<LogicResult, { ok: true }>,
): { headline: string; lines: ResultLine[] } => {
  if (result.resultLines && result.resultLines.length > 0) {
    const [first, ...rest] = result.resultLines;
    return {
      headline: first?.value ?? result.output,
      lines: rest,
    };
  }

  return { headline: result.output, lines: [] };
};
