import type { ToolDefinition } from "./types";
import { plannedTools } from "./registry-planned";
import { expandedLiveTools as developerLiveTools } from "./registry-live-developer";
import { expandedLiveTools as textLiveTools } from "./registry-live-text";
import { expandedLiveTools as converterLiveTools } from "./registry-live-converters";
import { constructionLiveTools } from "./registry-live-construction";
import { realEstateLiveTools } from "./registry-live-real-estate";
import { marketingLiveTools } from "./registry-live-marketing";
import { financeLiveTools } from "./registry-live-finance";
import { designLiveTools } from "./registry-live-design";
import { timeDateLiveTools } from "./registry-live-time-date";
import { kitchenLiveTools } from "./registry-live-kitchen";
import { documentLiveTools } from "./registry-live-document";
import { imageLiveTools } from "./registry-live-image";
import { healthFitnessLiveTools } from "./registry-live-health-fitness";

const coreLiveTools: ToolDefinition[] = [
  {
    id: "json-to-csv",
    slug: "json-to-csv",
    title: "JSON to CSV Converter Pro",
    category: "developer-tools",
    subcategory: "data-converters",
    path: "/developer-tools/json-to-csv/",
    shortDescription:
      "Convert JSON or NDJSON arrays into CSV with file drop, column reorder, flatten, and Excel BOM.",
    metaTitle: "JSON to CSV Converter - Convert JSON to CSV Online",
    metaDescription:
      "Convert JSON to CSV online. File drop, NDJSON support, flatten nested objects, reorder columns, Excel BOM, and download.",
    keywords: ["json to csv", "json file to csv", "json to csv for excel", "convert json array to csv", "json to spreadsheet"],
    relatedTools: ["csv-to-json", "nested-json-to-csv", "json-formatter", "yaml-to-json", "json-validator"],
    componentKey: "JsonToCsvTool",
    executionMode: "client",
    monetization: "ads",
    premiumEligible: true,
    requiresAuth: false,
    schemaType: "SoftwareApplication",
    status: "published",
    priority: 10,
    lastReviewed: "2026-06-02",
    explanation:
      "Convert JSON arrays or NDJSON lines into CSV with optional flattening, column reorder, and Excel-friendly UTF-8 BOM—all in your browser.",
    formula: "Each object becomes one row; keys become column headers (dot notation when flattening nested objects).",
    howToUse: [
      "Drop a .json file or paste a JSON array of objects (or NDJSON, one object per line).",
      "Choose delimiter, flatten nested objects, or enable Excel UTF-8 BOM as needed.",
      "Reorder columns if needed, then copy or download the CSV result.",
    ],
    examples: [
      {
        title: "Simple object array",
        input: '[{"name":"Ada","role":"Engineer"},{"name":"Grace","role":"Scientist"}]',
        output: "name,role\nAda,Engineer\nGrace,Scientist",
        explanation: "Each object becomes one CSV row with matching column headers.",
      },
      {
        title: "Three-column export",
        input: '[{"sku":"A1","qty":10,"price":9.99},{"sku":"B2","qty":5,"price":14.5}]',
        output: "sku,qty,price\nA1,10,9.99\nB2,5,14.5",
        explanation: "Numeric values stay as plain CSV cells for Excel import.",
      },
    ],
    faqs: [
      {
        question: "How do I convert JSON to CSV for Excel?",
        answer:
          "Paste a JSON array of flat objects, choose comma delimiter, then download or copy the CSV and open it in Excel.",
      },
      {
        question: "Does this tool support nested JSON?",
        answer:
          "Enable flatten nested objects to use dot notation keys, or use the Nested JSON to CSV tool for complex structures.",
      },
      {
        question: "Can I convert NDJSON?",
        answer: "Yes. Enable NDJSON mode and paste one JSON object per line.",
      },
      {
        question: "Can I reorder CSV columns?",
        answer: "After converting, use the column order controls to rearrange columns and convert again.",
      },
      {
        question: "Is my JSON uploaded to a server?",
        answer: "No. Conversion runs entirely in your browser.",
      },
    ],
    commonUseCases: [
      "Export API responses for Excel",
      "Convert sample datasets for testing",
      "Prepare JSON logs for spreadsheet review",
    ],
    sourceNotes: [
      "CSV output uses the first object's keys as column headers.",
      "RFC 4180-style quoting is applied when cell values contain commas or quotes.",
    ],
  },
  {
    id: "csv-to-json",
    slug: "csv-to-json",
    title: "CSV to JSON Converter Pro",
    category: "developer-tools",
    subcategory: "data-converters",
    path: "/developer-tools/csv-to-json/",
    shortDescription:
      "Convert CSV rows into a JSON array with file drop, header detection, and type inference.",
    metaTitle: "CSV to JSON Converter - Convert CSV to JSON Online",
    metaDescription:
      "Convert CSV to JSON online. Drop CSV files, detect headers, infer numbers and booleans, and copy or download JSON.",
    keywords: ["csv to json", "csv file to json", "convert csv to json array"],
    relatedTools: ["json-to-csv", "nested-json-to-csv", "json-formatter"],
    componentKey: "CsvToJsonTool",
    executionMode: "client",
    monetization: "ads",
    premiumEligible: true,
    requiresAuth: false,
    schemaType: "SoftwareApplication",
    status: "published",
    priority: 10,
    lastReviewed: "2026-06-02",
    explanation:
      "Paste CSV text and convert each row into a JSON object using the header row as keys.",
    formula: "Each CSV row maps to one JSON object; header cells become property names.",
    howToUse: [
      "Drop a .csv file or paste CSV text.",
      "Toggle first row is header if your file has no header row.",
      "Enable type inference for numbers and booleans, then copy or download JSON.",
    ],
    examples: [
      {
        title: "Basic CSV",
        input: "id,name\n1,Ada\n2,Grace",
        output: '[{"id":"1","name":"Ada"},{"id":"2","name":"Grace"}]',
        explanation: "Header values become JSON keys for each row.",
      },
      {
        title: "Typed columns",
        input: "sku,qty,active\nA1,10,true",
        output: '[{"sku":"A1","qty":10,"active":true}]',
        explanation: "With type inference enabled, numeric and boolean cells parse as JSON types.",
      },
    ],
    faqs: [
      {
        question: "Can I use CSV without a header row?",
        answer: "Yes. Uncheck first row is header and columns will be named column_1, column_2, etc.",
      },
      {
        question: "Can I drop a CSV file?",
        answer: "Yes. Use file drop or paste text; processing stays in your browser.",
      },
      {
        question: "Does type inference change strings?",
        answer: "When enabled, numeric and boolean-looking cells become JSON numbers and booleans.",
      },
      {
        question: "How do I round-trip with Excel?",
        answer: "Edit CSV in Excel, then convert back here. Use JSON to CSV for the export step.",
      },
    ],
    sourceNotes: [
      "RFC 4180-style CSV parsing with quoted fields.",
      "Use JSON to CSV when exporting API data for spreadsheets.",
    ],
    commonUseCases: [
      "Convert spreadsheet exports for APIs",
      "Turn CSV fixtures into JSON test data",
      "Migrate tabular data into app configs",
    ],
  },
  {
    id: "nested-json-to-csv",
    slug: "nested-json-to-csv",
    title: "Nested JSON to CSV Converter",
    category: "developer-tools",
    subcategory: "data-converters",
    path: "/developer-tools/nested-json-to-csv/",
    shortDescription:
      "Flatten nested JSON objects into CSV using dot notation column keys.",
    metaTitle: "Nested JSON to CSV Converter - Flatten JSON to CSV",
    metaDescription:
      "Flatten nested JSON to CSV online. Convert nested keys with dot notation, preview columns, and export CSV.",
    keywords: ["nested json to csv", "flatten json to csv", "json flatten csv"],
    relatedTools: ["json-to-csv", "csv-to-json", "json-formatter"],
    componentKey: "NestedJsonToCsvTool",
    executionMode: "client",
    monetization: "ads",
    premiumEligible: true,
    requiresAuth: false,
    schemaType: "SoftwareApplication",
    status: "published",
    priority: 10,
    lastReviewed: "2026-05-23",
    explanation:
      "Flatten nested JSON structures into tabular CSV columns using dot notation for nested keys.",
    howToUse: [
      "Paste JSON containing an array of objects.",
      "Review flattened column names such as address.city.",
      "Copy or download the generated CSV output.",
    ],
    examples: [
      {
        title: "Nested address fields",
        input: '[{"name":"Ada","address":{"city":"London","zip":"SW1A"}}]',
        output: "name,address.city,address.zip\nAda,London,SW1A",
        explanation: "Nested object keys are joined with dots to form CSV columns.",
      },
    ],
    faqs: [
      {
        question: "How are arrays handled?",
        answer:
          "Arrays are converted to JSON strings in the cell value for basic compatibility.",
      },
      {
        question: "What is dot notation in the CSV headers?",
        answer:
          "Nested keys become column names like address.city, combining parent and child field names with a dot.",
      },
    ],
    commonUseCases: [
      "Flatten API payloads for analysis",
      "Prepare nested logs for spreadsheets",
      "Export hierarchical config data",
    ],
  },
  {
    id: "json-formatter",
    slug: "json-formatter",
    title: "JSON Formatter and Validator",
    category: "developer-tools",
    subcategory: "formatters-validators",
    path: "/developer-tools/json-formatter/",
    shortDescription:
      "Validate, pretty-print, and minify JSON with clear parse error messages.",
    metaTitle: "JSON Formatter and Validator - Format JSON Online",
    metaDescription:
      "Format and validate JSON online. Pretty print, minify, and see parse errors instantly.",
    keywords: ["json formatter", "json validator", "pretty print json", "format json online", "minify json"],
    relatedTools: ["json-to-csv", "csv-to-json", "nested-json-to-csv", "json-validator"],
    componentKey: "JsonFormatterTool",
    executionMode: "client",
    monetization: "ads",
    premiumEligible: false,
    requiresAuth: false,
    schemaType: "SoftwareApplication",
    status: "published",
    priority: 10,
    lastReviewed: "2026-05-23",
    explanation:
      "Paste JSON to validate syntax, format it for readability, or minify it for production use.",
    howToUse: [
      "Paste raw JSON into the input area.",
      "Click Format to pretty-print or Minify to compress whitespace.",
      "Fix any parse errors shown before copying the output.",
    ],
    examples: [
      {
        title: "Minified to pretty",
        input: '{"name":"Ada","skills":["math","coding"]}',
        output: '{\n  "name": "Ada",\n  "skills": [\n    "math",\n    "coding"\n  ]\n}',
        explanation: "Pretty printing adds indentation for easier reading.",
      },
    ],
    faqs: [
      {
        question: "How do I pretty print JSON?",
        answer: "Paste minified JSON and click Format to add indentation and line breaks.",
      },
      {
        question: "Does this send my JSON to a server?",
        answer: "No. Formatting and validation run entirely in your browser.",
      },
      {
        question: "What if my JSON has a syntax error?",
        answer: "The tool shows the parse error message so you can fix the issue before copying output.",
      },
    ],
    commonUseCases: [
      "Debug API responses",
      "Clean config files before commit",
      "Validate JSON before importing into apps",
    ],
  },
  {
    id: "remove-duplicate-lines",
    slug: "remove-duplicate-lines",
    title: "Remove Duplicate Lines",
    category: "text-tools",
    subcategory: "cleanup-tools",
    path: "/text-tools/remove-duplicate-lines/",
    shortDescription:
      "Remove duplicate lines from pasted text with case and trim options.",
    metaTitle: "Remove Duplicate Lines - Clean Text Online",
    metaDescription:
      "Remove duplicate lines from text online. Toggle case sensitivity, trim whitespace, and copy cleaned output.",
    keywords: ["remove duplicate lines", "dedupe text", "unique lines"],
    relatedTools: ["case-converter", "remove-empty-lines", "trim-lines"],
    componentKey: "RemoveDuplicateLinesTool",
    executionMode: "client",
    monetization: "ads",
    premiumEligible: false,
    requiresAuth: false,
    schemaType: "SoftwareApplication",
    status: "published",
    priority: 10,
    lastReviewed: "2026-05-23",
    explanation:
      "Paste multiline text and remove repeated lines while keeping the first occurrence of each line.",
    howToUse: [
      "Paste your text into the input area.",
      "Choose case-sensitive matching and trim options as needed.",
      "Review how many duplicates were removed and copy the result.",
    ],
    examples: [
      {
        title: "Simple duplicate list",
        input: "apple\nbanana\napple\norange\nbanana",
        output: "apple\nbanana\norange",
        explanation: "Only the first occurrence of each duplicate line is kept.",
      },
    ],
    faqs: [
      {
        question: "Does order change?",
        answer: "The first occurrence of each unique line is preserved in original order.",
      },
      {
        question: "Can I ignore letter case when deduping?",
        answer:
          "Yes. Enable case-insensitive matching to treat Apple and apple as the same line.",
      },
    ],
    commonUseCases: [
      "Clean email or keyword lists",
      "Dedupe log excerpts",
      "Prepare unique value sets for import",
    ],
  },
  {
    id: "case-converter",
    slug: "case-converter",
    title: "Case Converter",
    category: "text-tools",
    subcategory: "case-converters",
    path: "/text-tools/case-converter/",
    shortDescription:
      "Convert text to uppercase, lowercase, title case, sentence case, or slug case.",
    metaTitle: "Case Converter - Change Text Case Online",
    metaDescription:
      "Convert text case online. Uppercase, lowercase, title case, sentence case, and slug case with one click.",
    keywords: ["case converter", "uppercase converter", "title case converter"],
    relatedTools: ["remove-duplicate-lines", "camel-case-converter", "snake-case-converter"],
    componentKey: "CaseConverterTool",
    executionMode: "client",
    monetization: "ads",
    premiumEligible: false,
    requiresAuth: false,
    schemaType: "SoftwareApplication",
    status: "published",
    priority: 10,
    lastReviewed: "2026-05-23",
    explanation:
      "Transform pasted text into common case formats for writing, SEO, and development workflows.",
    howToUse: [
      "Paste or type text in the input area.",
      "Select the case style you need.",
      "Copy the converted output.",
    ],
    examples: [
      {
        title: "Title case",
        input: "convert my stuff tools",
        output: "Convert My Stuff Tools",
        explanation: "Each word is capitalized for title-style formatting.",
      },
    ],
    faqs: [
      {
        question: "What is slug case?",
        answer: "Slug case lowercases text and replaces spaces with hyphens for URLs.",
      },
      {
        question: "Does sentence case capitalize every word?",
        answer:
          "No. Sentence case capitalizes only the first letter of the text, like a normal sentence.",
      },
    ],
    commonUseCases: [
      "Format headings and titles",
      "Generate URL slugs",
      "Normalize pasted text for editing",
    ],
  },
  {
    id: "acres-to-square-feet",
    slug: "acres-to-square-feet",
    title: "Acres to Square Feet Converter",
    category: "unit-converters",
    subcategory: "area",
    path: "/unit-converters/area/acres-to-square-feet/",
    shortDescription:
      "Convert acres to square feet using the standard 43,560 conversion factor.",
    metaTitle: "Acres to Square Feet Converter - Free Area Conversion",
    metaDescription:
      "Convert acres to square feet instantly. Uses 1 acre = 43,560 square feet with examples and reverse conversion link.",
    keywords: ["acres to square feet", "acre to sq ft", "acres conversion", "how many square feet in an acre", "land area converter"],
    relatedTools: ["square-feet-to-acres", "hectares-to-acres", "acres-to-hectares"],
    componentKey: "GenericUnitConverterTool",
    executionMode: "client",
    monetization: "ads",
    premiumEligible: false,
    requiresAuth: false,
    schemaType: "Calculator",
    status: "published",
    priority: 10,
    lastReviewed: "2026-05-23",
    formula: "square feet = acres × 43,560",
    explanation:
      "Convert land area from acres to square feet using the US customary conversion factor.",
    howToUse: [
      "Enter the number of acres.",
      "View the square feet result instantly.",
      "Use the reverse converter link if you need square feet to acres.",
    ],
    examples: [
      {
        title: "2.5 acres",
        input: "2.5",
        output: "108900",
        explanation: "2.5 × 43,560 = 108,900 square feet.",
        prefillValue: "2.5",
      },
      {
        title: "1 acre",
        input: "1",
        output: "43560",
        explanation: "One acre equals exactly 43,560 square feet.",
        prefillValue: "1",
      },
      {
        title: "10 acres",
        input: "10",
        output: "435600",
        explanation: "10 × 43,560 = 435,600 square feet.",
        prefillValue: "10",
      },
    ],
    faqs: [
      {
        question: "How many square feet are in an acre?",
        answer: "One acre equals 43,560 square feet in US customary units.",
      },
      {
        question: "Is 43,560 square feet always one acre?",
        answer:
          "Yes, in US customary units one acre is defined as 43,560 square feet.",
      },
      {
        question: "Can I convert fractional acres?",
        answer: "Yes. Enter decimal acre values like 0.25 or 2.5.",
      },
    ],
    commonUseCases: [
      "Estimate lot size for listings",
      "Compare parcel sizes",
      "Convert acreage for construction planning",
    ],
    sourceNotes: [
      "US survey acre: 1 acre = 43,560 square feet.",
      "International acre may differ slightly in some jurisdictions.",
    ],
  },
  {
    id: "square-feet-to-acres",
    slug: "square-feet-to-acres",
    title: "Square Feet to Acres Converter",
    category: "unit-converters",
    subcategory: "area",
    path: "/unit-converters/area/square-feet-to-acres/",
    shortDescription:
      "Convert square feet to acres using the standard 43,560 conversion factor.",
    metaTitle: "Square Feet to Acres Converter - Free Area Conversion",
    metaDescription:
      "Convert square feet to acres instantly. Uses acres = square feet ÷ 43,560 with examples and reverse conversion link.",
    keywords: ["square feet to acres", "sq ft to acres", "sf to acres", "convert square feet to acres"],
    relatedTools: ["acres-to-square-feet", "hectares-to-acres", "acres-to-hectares"],
    componentKey: "GenericUnitConverterTool",
    executionMode: "client",
    monetization: "ads",
    premiumEligible: false,
    requiresAuth: false,
    schemaType: "Calculator",
    status: "published",
    priority: 10,
    lastReviewed: "2026-05-23",
    formula: "acres = square feet ÷ 43,560",
    explanation:
      "Convert land area from square feet to acres using the US customary conversion factor.",
    howToUse: [
      "Enter the number of square feet.",
      "View the acres result instantly.",
      "Use the reverse converter link if you need acres to square feet.",
    ],
    examples: [
      {
        title: "87120 square feet",
        input: "87120",
        output: "2",
        explanation: "87,120 ÷ 43,560 = 2 acres.",
        prefillValue: "87120",
      },
      {
        title: "43560 square feet",
        input: "43560",
        output: "1",
        explanation: "43,560 square feet equals exactly one acre.",
        prefillValue: "43560",
      },
    ],
    faqs: [
      {
        question: "How do I convert square feet to acres?",
        answer: "Divide square feet by 43,560. This tool calculates the result instantly.",
      },
      {
        question: "Can I enter decimals?",
        answer: "Yes. Decimal square footage values are supported.",
      },
      {
        question: "What is half an acre in square feet?",
        answer: "Half an acre is 21,780 square feet (43,560 ÷ 2).",
      },
    ],
    commonUseCases: [
      "Convert building or lot square footage to acres",
      "Compare property sizes across listings",
      "Prepare land area estimates",
    ],
  },
  {
    id: "cap-rate-calculator",
    slug: "cap-rate-calculator",
    title: "Cap Rate Calculator",
    category: "real-estate-calculators",
    subcategory: "investment-metrics",
    path: "/real-estate-calculators/cap-rate-calculator/",
    shortDescription:
      "Estimate capitalization rate from property value, income, vacancy, and expenses.",
    metaTitle: "Cap Rate Calculator - Estimate Capitalization Rate",
    metaDescription:
      "Calculate cap rate online from property value, gross income, vacancy, and operating expenses. Includes NOI and estimate disclaimer.",
    keywords: ["cap rate calculator", "capitalization rate", "noi cap rate", "rental cap rate calculator", "real estate cap rate"],
    relatedTools: ["rental-deal-analyzer", "noi-calculator", "cash-on-cash-calculator", "dscr-calculator", "grm-calculator", "loan-to-value-calculator"],
    componentKey: "CapRateCalculatorTool",
    executionMode: "client",
    monetization: "ads",
    premiumEligible: true,
    requiresAuth: false,
    schemaType: "Calculator",
    status: "published",
    priority: 10,
    lastReviewed: "2026-05-23",
    formula: "cap rate = net operating income ÷ property value",
    assumptions: [
      "Vacancy is applied as a percentage of gross income.",
      "Operating expenses are subtracted after vacancy.",
      "Output is an estimate only and not financial advice.",
    ],
    explanation:
      "Calculate an estimated capitalization rate from income, vacancy, expenses, and purchase price.",
    howToUse: [
      "Enter property value and gross income.",
      "Add vacancy percentage and operating expenses.",
      "Review NOI and the estimated cap rate result.",
    ],
    examples: [
      {
        title: "Sample rental property",
        input: "Value: 500000, Gross income: 60000, Vacancy: 5%, Expenses: 12000",
        output: "NOI: 45000, Cap rate: 9%",
        explanation: "NOI = 60,000 - 3,000 vacancy - 12,000 expenses = 45,000.",
      },
      {
        title: "Small duplex",
        input: "Value: 350000, Gross income: 42000, Vacancy: 8%, Expenses: 9000",
        output: "NOI: 29640, Cap rate: 8.47%",
        explanation: "Vacancy loss of 8% reduces gross income before expenses.",
      },
    ],
    faqs: [
      {
        question: "How do you calculate cap rate?",
        answer: "Cap rate = Net Operating Income ÷ property value. Enter income, vacancy, expenses, and price to get both NOI and cap rate.",
      },
      {
        question: "Is this financial advice?",
        answer:
          "No. This calculator provides a basic estimate for educational purposes only.",
      },
      {
        question: "What is a good cap rate?",
        answer:
          "Cap rates vary by market, property type, and risk. Compare similar properties in the same market rather than using a single benchmark.",
      },
      {
        question: "How is NOI calculated here?",
        answer:
          "NOI equals gross income minus vacancy loss minus operating expenses. Mortgage payments are not subtracted in this estimate.",
      },
    ],
    commonUseCases: [
      "Compare rental property returns",
      "Screen investment opportunities",
      "Estimate NOI and cap rate quickly",
    ],
    sourceNotes: [
      "Cap rate formula: Net Operating Income divided by property value or purchase price.",
    ],
  },
  {
    id: "utm-builder",
    slug: "utm-builder",
    title: "UTM Builder",
    category: "marketing-tools",
    subcategory: "campaign-urls",
    path: "/marketing-tools/utm-builder/",
    shortDescription:
      "Build campaign URLs with UTM source, medium, campaign, term, and content parameters.",
    metaTitle: "UTM Builder - Create Campaign Tracking URLs",
    metaDescription:
      "Build UTM tracking URLs online. Add source, medium, campaign, term, and content parameters and copy the final link.",
    keywords: ["utm builder", "utm link generator", "campaign url builder"],
    relatedTools: ["utm-parser", "meta-tag-generator", "slug-generator", "hashtag-generator"],
    componentKey: "UtmBuilderTool",
    executionMode: "client",
    monetization: "ads",
    premiumEligible: true,
    requiresAuth: false,
    schemaType: "SoftwareApplication",
    status: "published",
    priority: 10,
    lastReviewed: "2026-05-23",
    explanation:
      "Generate clean campaign URLs with standard UTM parameters for analytics tracking.",
    howToUse: [
      "Enter the destination website URL.",
      "Fill in UTM source, medium, and campaign fields.",
      "Add optional term and content values, then copy the generated URL.",
    ],
    examples: [
      {
        title: "Newsletter campaign",
        input: "https://example.com, source=newsletter, medium=email, campaign=spring-sale",
        output:
          "https://example.com/?utm_source=newsletter&utm_medium=email&utm_campaign=spring-sale",
        explanation: "UTM parameters are appended as a query string to the base URL.",
      },
    ],
    faqs: [
      {
        question: "Which UTM fields are required?",
        answer: "Source, medium, and campaign are the core fields most teams track.",
      },
      {
        question: "Can I parse an existing UTM URL?",
        answer: "Yes. Use the UTM Parameter Parser to inspect UTM values from a campaign link.",
      },
      {
        question: "Should UTM names use spaces?",
        answer: "Use lowercase words separated by underscores or hyphens for cleaner analytics reporting.",
      },
    ],
    commonUseCases: [
      "Track email and social campaigns",
      "Standardize marketing link naming",
      "Prepare links for Google Analytics reporting",
    ],
  },
];

const liveTools: ToolDefinition[] = [
  ...coreLiveTools,
  ...developerLiveTools,
  ...textLiveTools,
  ...converterLiveTools,
  ...constructionLiveTools,
  ...realEstateLiveTools,
  ...marketingLiveTools,
  ...financeLiveTools,
  ...designLiveTools,
  ...timeDateLiveTools,
  ...kitchenLiveTools,
  ...documentLiveTools,
  ...imageLiveTools,
  ...healthFitnessLiveTools,
];

const publishedIds = new Set(liveTools.map((tool) => tool.id));
const filteredPlannedTools = plannedTools.filter((tool) => !publishedIds.has(tool.id));

export const tools: ToolDefinition[] = [...liveTools, ...filteredPlannedTools];
