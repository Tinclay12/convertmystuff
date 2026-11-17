import { formatNumber } from "./unit-conversions";

export const percentageModes = [
  {
    id: "of",
    label: "Percent of a number",
    hint: "What is 15% of 200?",
    fields: ["percent", "value"],
  },
  {
    id: "ratio",
    label: "What percentage?",
    hint: "30 is what % of 200?",
    fields: ["part", "total"],
  },
  {
    id: "change",
    label: "Percentage change",
    hint: "From 40 to 50",
    fields: ["oldValue", "newValue"],
  },
  {
    id: "increase",
    label: "Add a percentage",
    hint: "Add 15% to 200",
    fields: ["value", "percent"],
  },
  {
    id: "decrease",
    label: "Take a percentage off",
    hint: "Take 15% off 200",
    fields: ["value", "percent"],
  },
  {
    id: "reverse",
    label: "Find the original price",
    hint: "85 after 15% off",
    fields: ["finalValue", "percent"],
  },
] as const;

export type PercentageMode = (typeof percentageModes)[number]["id"];
export type PercentageField =
  (typeof percentageModes)[number]["fields"][number];
export const isPercentageMode = (value?: string): value is PercentageMode =>
  percentageModes.some((mode) => mode.id === value);
export const percentageDefaults: Record<PercentageField, string> = {
  value: "200",
  percent: "15",
  part: "30",
  total: "200",
  oldValue: "40",
  newValue: "50",
  finalValue: "85",
};
export const percentageFieldLabels: Record<PercentageField, string> = {
  value: "Number",
  percent: "Percentage (%)",
  part: "Part",
  total: "Whole",
  oldValue: "Original value",
  newValue: "New value",
  finalValue: "Price after discount",
};
type PercentageAnswer = {
  value: number;
  suffix: string;
  label: string;
  sentence: string;
  steps: string[];
  comparison?: { label: string; value: number };
};
export type PercentageOutcome =
  | { ok: true; answer: PercentageAnswer }
  | { ok: false; error: string; incomplete: boolean };

export function solvePercentage(
  mode: PercentageMode,
  values: Record<string, string>,
): PercentageOutcome {
  const config = percentageModes.find((item) => item.id === mode)!;
  if (config.fields.some((key) => !values[key]?.trim()))
    return {
      ok: false,
      error: "Fill in both numbers to see your result.",
      incomplete: true,
    };
  const numbers: Record<string, number> = {};
  for (const key of config.fields) {
    const value = Number(values[key]);
    if (!Number.isFinite(value) || value < 0)
      return {
        ok: false,
        error: `Enter a finite, non-negative number for ${percentageFieldLabels[key].toLowerCase()}.`,
        incomplete: false,
      };
    numbers[key] = value;
  }
  const f = (n: number) => formatNumber(n, 6);
  const { value, percent, part, total, oldValue, newValue, finalValue } =
    numbers;
  let answer: PercentageAnswer;
  if (mode === "ratio") {
    if (total === 0)
      return {
        ok: false,
        error:
          "The whole must be greater than zero. A percentage divides the part by the whole.",
        incomplete: false,
      };
    const result = (part / total) * 100;
    answer = {
      value: result,
      suffix: "%",
      label: "Percentage of the whole",
      sentence: `${f(part)} is ${f(result)}% of ${f(total)}.`,
      steps: [
        `Divide the part by the whole: ${f(part)} ÷ ${f(total)}`,
        `Multiply by 100: ${f(result)}%`,
      ],
    };
  } else if (mode === "change") {
    if (oldValue === 0)
      return {
        ok: false,
        error: `The absolute change is ${f(newValue)}, but percentage change from zero is undefined. Enter an original value greater than zero.`,
        incomplete: false,
      };
    const difference = newValue - oldValue;
    const result = (difference / oldValue) * 100;
    answer = {
      value: result,
      suffix: "%",
      label: result > 0 ? "Increase" : result < 0 ? "Decrease" : "No change",
      sentence: `From ${f(oldValue)} to ${f(newValue)} is ${f(Math.abs(result))}% ${result > 0 ? "higher" : result < 0 ? "lower" : "change"}.`,
      steps: [
        `Find the difference: ${f(newValue)} − ${f(oldValue)} = ${f(difference)}`,
        `Divide by the original, then × 100: ${f(difference)} ÷ ${f(oldValue)} × 100 = ${f(result)}%`,
      ],
      comparison: { label: "Absolute change", value: difference },
    };
  } else if (mode === "reverse") {
    if (percent >= 100)
      return {
        ok: false,
        error: "Use a discount below 100% to recover the original price.",
        incomplete: false,
      };
    const result = finalValue / (1 - percent / 100);
    answer = {
      value: result,
      suffix: "",
      label: "Original price",
      sentence: `${f(result)} with ${f(percent)}% off gives ${f(finalValue)}.`,
      steps: [
        `The price keeps ${f(100 - percent)}% of the original.`,
        `Divide by that fraction: ${f(finalValue)} ÷ ${f(1 - percent / 100)} = ${f(result)}`,
      ],
      comparison: { label: "Amount saved", value: result - finalValue },
    };
  } else {
    if (mode === "decrease" && percent > 100)
      return {
        ok: false,
        error: "Use a reduction between 0% and 100%.",
        incomplete: false,
      };
    const amount = value * (percent / 100);
    const result =
      mode === "increase"
        ? value + amount
        : mode === "decrease"
          ? value - amount
          : amount;
    answer = {
      value: result,
      suffix: "",
      label: mode === "of" ? "Your answer" : "New total",
      sentence:
        mode === "of"
          ? `${f(percent)}% of ${f(value)} is ${f(result)}.`
          : `${f(value)} ${mode === "increase" ? "plus" : "minus"} ${f(percent)}% is ${f(result)}.`,
      steps: [
        `Turn the percentage into a decimal: ${f(percent)} ÷ 100 = ${f(percent / 100)}`,
        `Find the amount: ${f(value)} × ${f(percent / 100)} = ${f(amount)}`,
        ...(mode === "of"
          ? []
          : [
              `${mode === "increase" ? "Add" : "Subtract"} it: ${f(value)} ${mode === "increase" ? "+" : "−"} ${f(amount)} = ${f(result)}`,
            ]),
      ],
      ...(mode === "of"
        ? {}
        : {
            comparison: {
              label: mode === "increase" ? "Amount added" : "Amount saved",
              value: amount,
            },
          }),
    };
  }
  if (![answer.value, answer.comparison?.value ?? 0].every(Number.isFinite))
    return {
      ok: false,
      error:
        "These numbers exceed the calculator’s supported range. Try smaller values.",
      incomplete: false,
    };
  return { ok: true, answer };
}
