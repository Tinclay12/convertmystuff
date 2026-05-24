import type { LogicResult } from "./unit-conversions";
import { validateJson } from "./json-formatter";

export const validateJsonInput = (input: string): LogicResult => {
  const trimmed = input.trim();
  if (!trimmed) {
    return { ok: false, error: "Paste JSON to validate." };
  }

  const result = validateJson(trimmed);
  if (!result.ok) {
    return { ok: false, error: `Invalid JSON: ${result.error}` };
  }

  return {
    ok: true,
    output: "Valid JSON ✓\n\nYour JSON parsed successfully with no syntax errors.",
  };
};

export type ValidatorConfig = {
  inputLabel: string;
  outputLabel: string;
  inputPlaceholder: string;
  transform: (input: string) => LogicResult;
};

export const validatorConfigs: Record<string, ValidatorConfig> = {
  "json-validator": {
    inputLabel: "JSON to validate",
    outputLabel: "Validation result",
    inputPlaceholder: '{"name":"Ada","active":true}',
    transform: validateJsonInput,
  },
};
