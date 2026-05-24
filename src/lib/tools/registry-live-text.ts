import type { ToolDefinition } from "./types";
import { buildLiveTool, faq } from "./registry-live-helpers";

const textPath = (slug: string) => `/text-tools/${slug}/`;

export const expandedLiveTools: ToolDefinition[] = [
  buildLiveTool({
    id: "remove-empty-lines",
    slug: "remove-empty-lines",
    title: "Remove Empty Lines",
    category: "text-tools",
    subcategory: "cleanup-tools",
    pathOverride: textPath("remove-empty-lines"),
    shortDescription: "Strip blank lines from pasted text lists, logs, and exports.",
    metaTitle: "Remove Empty Lines - Clean Blank Lines from Text Online",
    metaDescription:
      "Remove empty lines from text online. Strip blank rows from lists, logs, and pasted content while keeping non-empty lines intact.",
    keywords: ["remove empty lines", "delete blank lines", "strip empty lines"],
    relatedTools: ["trim-lines", "remove-duplicate-lines", "line-counter"],
    componentKey: "GenericTextTool",
    explanation:
      "Paste multiline text and remove lines that are empty or contain only whitespace.",
    howToUse: [
      "Paste text with blank lines into the input area.",
      "Review the cleaned output instantly.",
      "Copy the result and see how many empty lines were removed.",
    ],
    examples: [
      {
        title: "List with blank rows",
        input: "apple\n\nbanana\n\n\norange",
        output: "apple\nbanana\norange",
        explanation: "Lines with no characters or only whitespace are removed.",
      },
    ],
    faqs: [
      faq("Are lines with only spaces removed?", "Yes. Lines that trim to empty are treated as blank."),
      faq("Does this change line order?", "No. Non-empty lines keep their original order."),
      faq("Can I trim whitespace too?", "Use the Trim Lines tool to remove leading and trailing spaces from each line."),
    ],
    commonUseCases: [
      "Clean copied spreadsheet or CSV rows",
      "Remove gaps from log excerpts",
      "Prepare unique line lists for import",
    ],
  }),
  buildLiveTool({
    id: "trim-lines",
    slug: "trim-lines",
    title: "Trim Lines",
    category: "text-tools",
    subcategory: "cleanup-tools",
    pathOverride: textPath("trim-lines"),
    shortDescription: "Trim leading and trailing whitespace from each line of text.",
    metaTitle: "Trim Lines - Remove Leading and Trailing Whitespace Online",
    metaDescription:
      "Trim lines online. Remove leading and trailing spaces from each row in pasted text for cleaner lists and code snippets.",
    keywords: ["trim lines", "trim whitespace", "strip spaces from lines"],
    relatedTools: ["remove-empty-lines", "remove-duplicate-lines", "case-converter"],
    componentKey: "GenericTextTool",
    explanation: "Remove leading and trailing whitespace from every line while preserving line breaks.",
    howToUse: [
      "Paste text with extra spacing into the input area.",
      "Review trimmed output line by line.",
      "Copy the cleaned text for reuse.",
    ],
    examples: [
      {
        title: "Spaced list items",
        input: "  apple  \n   banana \n  orange",
        output: "apple\nbanana\norange",
        explanation: "Spaces before and after each line are removed.",
      },
    ],
    faqs: [
      faq("Does this remove empty lines?", "No. Use Remove Empty Lines to drop blank rows entirely."),
      faq("Are tabs trimmed too?", "Yes. Leading and trailing tabs and spaces are removed."),
      faq("Will internal spacing change?", "Spaces between words on the same line are preserved."),
    ],
    commonUseCases: [
      "Normalize pasted code or config snippets",
      "Clean CSV or TSV exports before processing",
      "Fix inconsistent indentation in lists",
    ],
  }),
  buildLiveTool({
    id: "camel-case-converter",
    slug: "camel-case-converter",
    title: "Camel Case Converter",
    category: "text-tools",
    subcategory: "case-converters",
    pathOverride: textPath("camel-case-converter"),
    shortDescription: "Convert phrases and identifiers to camelCase for code and APIs.",
    metaTitle: "Camel Case Converter - Convert Text to camelCase Online",
    metaDescription:
      "Convert text to camelCase online. Turn phrases, titles, and identifiers into camelCase variable names for JavaScript and APIs.",
    keywords: ["camel case converter", "camelcase", "convert to camel case"],
    relatedTools: ["snake-case-converter", "case-converter", "word-counter"],
    componentKey: "GenericTextTool",
    explanation: "Convert spaced, hyphenated, or mixed text into camelCase identifiers.",
    howToUse: [
      "Paste the phrase or identifier to convert.",
      "Review the camelCase output.",
      "Copy the result for variables, JSON keys, or API fields.",
    ],
    examples: [
      {
        title: "Phrase to identifier",
        input: "hello world example",
        output: "helloWorldExample",
        explanation: "Words are joined and capitalized after the first word.",
      },
    ],
    faqs: [
      faq("Does this handle hyphens and underscores?", "Yes. Separators are removed and the next letter is capitalized."),
      faq("Can I convert to snake_case instead?", "Use the Snake Case Converter for snake_case output."),
      faq("Are numbers supported?", "Yes. Alphanumeric tokens are converted together."),
    ],
    commonUseCases: [
      "Generate JavaScript variable names",
      "Normalize API field labels",
      "Convert titles to code-friendly identifiers",
    ],
  }),
  buildLiveTool({
    id: "snake-case-converter",
    slug: "snake-case-converter",
    title: "Snake Case Converter",
    category: "text-tools",
    subcategory: "case-converters",
    pathOverride: textPath("snake-case-converter"),
    shortDescription: "Convert phrases and identifiers to snake_case for code and databases.",
    metaTitle: "Snake Case Converter - Convert Text to snake_case Online",
    metaDescription:
      "Convert text to snake_case online. Turn phrases and camelCase identifiers into snake_case names for Python, SQL, and configs.",
    keywords: ["snake case converter", "snake_case", "convert to snake case"],
    relatedTools: ["camel-case-converter", "case-converter", "trim-lines"],
    componentKey: "GenericTextTool",
    explanation: "Convert spaced, camelCase, or hyphenated text into lowercase snake_case identifiers.",
    howToUse: [
      "Paste the phrase or identifier to convert.",
      "Review the snake_case output.",
      "Copy the result for Python, SQL columns, or config keys.",
    ],
    examples: [
      {
        title: "Title to snake_case",
        input: "Hello World Example",
        output: "hello_world_example",
        explanation: "Words are lowercased and joined with underscores.",
      },
    ],
    faqs: [
      faq("Does this convert camelCase?", "Yes. Capital letters become word boundaries with underscores."),
      faq("Can I get camelCase output?", "Use the Camel Case Converter for camelCase identifiers."),
      faq("Are consecutive underscores collapsed?", "Yes. Repeated separators are merged into one underscore."),
    ],
    commonUseCases: [
      "Create Python function or variable names",
      "Generate database column names",
      "Normalize config keys for YAML or JSON",
    ],
  }),
  buildLiveTool({
    id: "word-counter",
    slug: "word-counter",
    title: "Word Counter",
    category: "text-tools",
    subcategory: "counters",
    pathOverride: textPath("word-counter"),
    shortDescription: "Count words, characters, lines, and estimated reading time.",
    metaTitle: "Word Counter - Count Words and Reading Time Online",
    metaDescription:
      "Count words online. See word count, character count, line count, and estimated reading time for articles and drafts.",
    keywords: ["word counter", "word count", "count words online"],
    relatedTools: ["character-counter", "line-counter", "case-converter"],
    componentKey: "GenericTextTool",
    explanation: "Analyze pasted text for word count, character totals, line count, and reading time.",
    howToUse: [
      "Paste or type your text in the input area.",
      "Review the word count summary instantly.",
      "Use character or line counters for additional metrics.",
    ],
    examples: [
      {
        title: "Short paragraph",
        input: "ConvertMyStuff helps you convert units, text, and data quickly.",
        output:
          "Words: 10\nCharacters: 58\nCharacters (no spaces): 49\nLines: 1\nReading time: ~1 min",
        explanation: "Word count splits on whitespace; reading time assumes about 200 words per minute.",
      },
    ],
    faqs: [
      faq("How is reading time calculated?", "Reading time uses roughly 200 words per minute with a one-minute minimum."),
      faq("Does punctuation count as a word?", "Words are split on whitespace, so punctuation stays attached to adjacent words."),
      faq("Can I count characters only?", "Yes. Use the Character Counter for detailed character totals."),
    ],
    commonUseCases: [
      "Check article length for SEO or publishing",
      "Estimate reading time for blog posts",
      "Validate copy limits for ads or social posts",
    ],
  }),
  buildLiveTool({
    id: "character-counter",
    slug: "character-counter",
    title: "Character Counter",
    category: "text-tools",
    subcategory: "counters",
    pathOverride: textPath("character-counter"),
    shortDescription: "Count characters with and without spaces in pasted text.",
    metaTitle: "Character Counter - Count Characters Online",
    metaDescription:
      "Count characters online. See total characters with and without spaces for tweets, meta descriptions, and form limits.",
    keywords: ["character counter", "char count", "count characters"],
    relatedTools: ["word-counter", "line-counter", "trim-lines"],
    componentKey: "GenericTextTool",
    explanation: "Count total characters in pasted text, with and without whitespace.",
    howToUse: [
      "Paste or type text into the input area.",
      "Review character counts with and without spaces.",
      "Copy metrics or edit text until you hit your target length.",
    ],
    examples: [
      {
        title: "Sample sentence",
        input: "Hello world!",
        output: "Characters with spaces: 12\nCharacters without spaces: 11",
        explanation: "Spaces are excluded in the no-spaces total.",
      },
    ],
    faqs: [
      faq("Do line breaks count as characters?", "Yes. Newline characters are included in the total character count."),
      faq("Is Unicode supported?", "Yes. Characters are counted using JavaScript string length."),
      faq("Can I also count words?", "Use the Word Counter for words, lines, and reading time."),
    ],
    commonUseCases: [
      "Stay within social media character limits",
      "Check meta description length",
      "Validate SMS or form field constraints",
    ],
  }),
  buildLiveTool({
    id: "line-counter",
    slug: "line-counter",
    title: "Line Counter",
    category: "text-tools",
    subcategory: "counters",
    pathOverride: textPath("line-counter"),
    shortDescription: "Count lines in pasted text, lists, and log excerpts.",
    metaTitle: "Line Counter - Count Lines in Text Online",
    metaDescription:
      "Count lines in text online. Paste multiline content and get an instant line count for lists, logs, and files.",
    keywords: ["line counter", "count lines", "how many lines"],
    relatedTools: ["word-counter", "character-counter", "remove-empty-lines"],
    componentKey: "GenericTextTool",
    explanation: "Count the number of lines in pasted multiline text.",
    howToUse: [
      "Paste multiline text into the input area.",
      "View the total line count instantly.",
      "Use cleanup tools to remove blank lines if needed.",
    ],
    examples: [
      {
        title: "Three-line list",
        input: "alpha\nbeta\ngamma",
        output: "3",
        explanation: "Each newline-separated row counts as one line.",
      },
    ],
    faqs: [
      faq("Does an empty input count as zero lines?", "Yes. Empty input returns a line count of zero."),
      faq("Are blank lines counted?", "Yes. Empty lines still count as lines unless you remove them first."),
      faq("Can I count words too?", "Use the Word Counter for words, characters, and reading time."),
    ],
    commonUseCases: [
      "Measure list or log file row counts",
      "Verify CSV or TSV row totals",
      "Check line limits before submission",
    ],
  }),
  buildLiveTool({
    id: "add-line-numbers",
    slug: "add-line-numbers",
    title: "Add Line Numbers",
    category: "text-tools",
    subcategory: "formatting-tools",
    pathOverride: textPath("add-line-numbers"),
    shortDescription: "Prefix each line with line numbers for review, diffs, and documentation.",
    metaTitle: "Add Line Numbers to Text - Number Lines Online",
    metaDescription:
      "Add line numbers to text online. Prefix each row with numbered labels for code review, notes, and shared excerpts.",
    keywords: ["add line numbers", "number lines", "line numbering tool"],
    relatedTools: ["text-diff", "trim-lines", "line-counter"],
    componentKey: "GenericTextTool",
    explanation: "Add sequential line numbers to every row in pasted multiline text.",
    howToUse: [
      "Paste multiline text into the input area.",
      "Review numbered output with one prefix per line.",
      "Copy the numbered text for review or documentation.",
    ],
    examples: [
      {
        title: "Simple list",
        input: "alpha\nbeta\ngamma",
        output: "1. alpha\n2. beta\n3. gamma",
        explanation: "Each line receives a sequential number prefix.",
      },
    ],
    faqs: [
      faq("Does numbering start at one?", "Yes. The first line is numbered 1."),
      faq("Are blank lines numbered?", "Yes. Empty lines still receive a line number."),
      faq("Can I compare numbered versions?", "Use the Text Diff tool to compare original and edited content."),
    ],
    commonUseCases: [
      "Share code snippets with line references",
      "Prepare review notes with row labels",
      "Format meeting notes or bullet lists",
    ],
  }),
  buildLiveTool({
    id: "text-diff",
    slug: "text-diff",
    title: "Text Diff Tool",
    category: "text-tools",
    subcategory: "formatting-tools",
    pathOverride: textPath("text-diff"),
    shortDescription: "Compare two text blocks side by side and highlight line differences.",
    metaTitle: "Text Diff Tool - Compare Two Text Blocks Online",
    metaDescription:
      "Compare text online. Paste two versions and see added, removed, and unchanged lines in a simple diff view.",
    keywords: ["text diff", "compare text", "text difference checker"],
    relatedTools: ["add-line-numbers", "trim-lines", "remove-duplicate-lines"],
    componentKey: "GenericTextTool",
    explanation: "Compare two text versions line by line with simple minus and plus markers.",
    howToUse: [
      "Paste the original text in the left input.",
      "Paste the updated text in the right input.",
      "Review diff output with unchanged, removed, and added lines.",
    ],
    examples: [
      {
        title: "Edited list",
        input: "Original: apple\nbanana\norange\n\nChanged: apple\nblueberry\norange",
        output: "  apple\n- banana\n+ blueberry\n  orange",
        explanation: "Unchanged lines are prefixed with spaces, removed lines with -, added lines with +.",
      },
    ],
    faqs: [
      faq("Is this a character-level diff?", "This version compares text line by line for quick reviews."),
      faq("Can I copy the diff output?", "Yes. Use the copy button on the diff result panel."),
      faq("Does this upload my text?", "No. Comparison runs entirely in your browser."),
    ],
    commonUseCases: [
      "Review edits to config files or copy",
      "Compare two list exports",
      "Check changes before publishing content",
    ],
  }),
];
