export type CaseStyle =
  | "uppercase"
  | "lowercase"
  | "title"
  | "sentence"
  | "slug";

export const toTitleCase = (value: string): string => {
  return value
    .toLowerCase()
    .replace(/\b([a-z])/g, (match) => match.toUpperCase());
};

export const toSentenceCase = (value: string): string => {
  const lower = value.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
};

export const toSlugCase = (value: string): string => {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export const convertCase = (input: string, style: CaseStyle): string => {
  switch (style) {
    case "uppercase":
      return input.toUpperCase();
    case "lowercase":
      return input.toLowerCase();
    case "title":
      return toTitleCase(input);
    case "sentence":
      return toSentenceCase(input);
    case "slug":
      return toSlugCase(input);
    default:
      return input;
  }
};
