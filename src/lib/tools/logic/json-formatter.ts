export type JsonFormatMode = "pretty" | "minify";

export type JsonFormatResult =
  | { ok: true; output: string }
  | { ok: false; error: string };

export const formatJson = (input: string, mode: JsonFormatMode): JsonFormatResult => {
  const trimmed = input.trim();

  if (!trimmed) {
    return { ok: false, error: "Paste JSON to format." };
  }

  try {
    const parsed = JSON.parse(trimmed) as unknown;
    const output =
      mode === "pretty"
        ? `${JSON.stringify(parsed, null, 2)}\n`
        : JSON.stringify(parsed);

    return { ok: true, output };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid JSON input.";
    return { ok: false, error: message };
  }
};

export const validateJson = (input: string): JsonFormatResult => {
  return formatJson(input, "pretty");
};
