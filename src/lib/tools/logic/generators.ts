import type { LogicResult } from "./unit-conversions";

export const generateUuid = (): LogicResult => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return { ok: true, output: crypto.randomUUID() };
  }

  const template = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
  const output = template.replace(/[xy]/g, (char) => {
    const random = Math.floor(Math.random() * 16);
    const value = char === "x" ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });

  return { ok: true, output };
};

export const generateHash = async (input: string, algorithm: "SHA-256" | "SHA-1" = "SHA-256"): Promise<LogicResult> => {
  if (!input.trim()) {
    return { ok: false, error: "Enter text to hash." };
  }

  if (typeof crypto === "undefined" || !crypto.subtle) {
    return { ok: false, error: "Hash generation requires a secure browser context." };
  }

  const encoded = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest(algorithm, encoded);
  const output = Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  return { ok: true, output };
};

const loremWords = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
];

export const generateLoremIpsum = (paragraphs: number): LogicResult => {
  const count = Math.min(Math.max(paragraphs, 1), 10);
  const output = Array.from({ length: count }, (_, paragraphIndex) => {
    const words = Array.from({ length: 40 + paragraphIndex * 5 }, (_, wordIndex) => {
      return loremWords[wordIndex % loremWords.length];
    });
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    return `${words.join(" ")}.`;
  }).join("\n\n");

  return { ok: true, output };
};

export type GeneratorConfig =
  | {
      kind: "instant";
      buttonLabel: string;
      outputLabel: string;
      generate: () => LogicResult;
    }
  | {
      kind: "text";
      inputLabel: string;
      outputLabel: string;
      inputPlaceholder: string;
      generate: (input: string) => Promise<LogicResult> | LogicResult;
    }
  | {
      kind: "count";
      inputLabel: string;
      outputLabel: string;
      defaultCount: number;
      generate: (count: number) => LogicResult;
    };

export const generatorConfigs: Record<string, GeneratorConfig> = {
  "uuid-generator": {
    kind: "instant",
    buttonLabel: "Generate UUID",
    outputLabel: "Generated UUID",
    generate: generateUuid,
  },
  "hash-generator": {
    kind: "text",
    inputLabel: "Text to hash",
    outputLabel: "SHA-256 hash",
    inputPlaceholder: "Enter text",
    generate: (input) => generateHash(input, "SHA-256"),
  },
  "lorem-ipsum-generator": {
    kind: "count",
    inputLabel: "Paragraphs",
    outputLabel: "Lorem ipsum text",
    defaultCount: 3,
    generate: generateLoremIpsum,
  },
};
