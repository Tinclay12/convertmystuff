import type { GuideDefinition } from "@/lib/content/types";

const FINANCE_DISCLAIMER =
  "This content is for general educational purposes only and is not financial, tax, or legal advice. Examples are illustrative. Consult qualified professionals before borrowing or investing.";

export const howToMergePdfGuide: GuideDefinition = {
  slug: "how-to-merge-pdf-files",
  title: "How to Merge PDF Files (Browser-Based)",
  summary: "Combine multiple PDFs locally without uploading to a server—order files, merge, and download.",
  metaTitle: "How to Merge PDF Files Online in Your Browser",
  metaDescription:
    "Learn how to merge PDF files in order using a browser-based tool. No upload required—combine reports and scans locally.",
  keywords: ["how to merge pdf", "combine pdf files", "merge pdf online"],
  intro:
    "Merging PDFs is common for contracts, scanned receipts, and report appendices. Browser-based merge keeps files on your device, which matters for sensitive documents.",
  primaryToolId: "pdf-merge",
  relatedToolIds: ["pdf-split", "text-to-pdf"],
  relatedGuideSlugs: ["how-to-split-pdf-pages"],
  categorySlug: "document-tools",
  subcategoryId: "pdf-tools",
  lastReviewed: "2026-06-02",
  sections: [
    {
      id: "steps",
      heading: "Steps to merge PDFs",
      paragraphs: [
        "Select two or more PDF files in the order you want pages to appear. Reorder files before merging if page sequence matters.",
        "Click merge and download the combined PDF. Processing runs locally; nothing is sent to a server.",
        "If a file fails, try exporting it again from the source app or printing to PDF to normalize the file.",
      ],
      linkedToolIds: ["pdf-merge"],
    },
  ],
  faqs: [
    {
      question: "Is there a page limit?",
      answer: "Very large files depend on browser memory. Merge reasonable batch sizes for reliability.",
    },
    {
      question: "Can I merge password-protected PDFs?",
      answer: "Protected files may fail unless unlocked first in the app that created them.",
    },
  ],
};

export const howToAddFaviconGuide: GuideDefinition = {
  slug: "how-to-add-a-favicon",
  title: "How to Add a Favicon in HTML",
  summary:
    "Generate favicon.ico and PNG icons, then add link tags in the document head so browsers, iOS, and search results show your icon.",
  metaTitle: "How to Add a Favicon in HTML (link tags + favicon.ico)",
  metaDescription:
    "Add a favicon with root favicon.ico, PNG sizes, and apple-touch-icon link tags. Includes copy-ready HTML and cache tips.",
  keywords: ["how to add a favicon", "favicon html", "link rel icon", "apple-touch-icon"],
  intro:
    "A favicon is the small icon in browser tabs, bookmarks, and some search results. You need two pieces: the image files, and HTML that points to them. Place favicon.ico at the site root for older clients, then add explicit link tags for PNG and Apple touch icons so modern browsers do not guess.",
  primaryToolId: "favicon-generator",
  relatedToolIds: ["png-to-ico", "ico-to-png", "svg-to-png"],
  relatedGuideSlugs: ["resize-images-for-web"],
  relatedResourceSlugs: ["what-is-an-ico-file", "standard-favicon-sizes"],
  categorySlug: "image-tools",
  subcategoryId: "icons-favicons",
  lastReviewed: "2026-08-19",
  sections: [
    {
      id: "generate",
      heading: "Generate the files",
      paragraphs: [
        "Start with a square logo at 512×512 or larger. Simple shapes read better at 16×16 than photographs or thin text.",
        "Use a favicon generator to export favicon.ico (multiple sizes), favicon-32x32.png, and apple-touch-icon.png (180×180). Keep filenames stable so bookmarks survive a rebrand.",
      ],
      linkedToolIds: ["favicon-generator", "png-to-ico"],
    },
    {
      id: "root-ico",
      heading: "Put favicon.ico at the site root",
      paragraphs: [
        "Many browsers still request /favicon.ico automatically even if you never add a link tag. Upload favicon.ico next to index.html or your app root so that request succeeds.",
        "If your site lives in a subdirectory, still prefer a root favicon.ico when you control the domain. Some Windows shortcuts and older CMS themes ignore HTML and only look at that path.",
      ],
      linkedToolIds: ["png-to-ico"],
    },
    {
      id: "html",
      heading: "Add HTML link tags",
      paragraphs: [
        "In the document head, declare the ICO, a PNG for high-DPI tabs, and an Apple touch icon. Example: link rel=\"icon\" href=\"/favicon.ico\" sizes=\"any\", link rel=\"icon\" type=\"image/png\" sizes=\"32x32\" href=\"/favicon-32x32.png\", and link rel=\"apple-touch-icon\" sizes=\"180x180\" href=\"/apple-touch-icon.png\".",
        "Copy the same tags from the favicon generator after you process an image. Do not put UTM parameters or cache-busting query strings on icon URLs unless you also update every bookmark later.",
      ],
      linkedToolIds: ["favicon-generator"],
    },
    {
      id: "cache",
      heading: "Cache and verification",
      paragraphs: [
        "Browsers cache favicons aggressively. After replacing files, hard-refresh, clear the CDN cache, and check Chrome DevTools Application → Images. iOS home-screen icons may keep the old asset until the user removes and re-adds the site.",
        "If the tab icon is missing, confirm the files are publicly reachable, the HTML is in the head (not the body), and you are not blocking /favicon.ico in robots.txt.",
      ],
      linkedToolIds: ["ico-to-png"],
    },
  ],
  faqs: [
    {
      question: "Do I still need favicon.ico if I have PNG link tags?",
      answer:
        "Yes for compatibility. Keep favicon.ico at the root and add PNG plus apple-touch-icon tags for modern clients.",
    },
    {
      question: "Why is my new favicon not showing?",
      answer:
        "Usually cache. Confirm the file URL loads, then hard-refresh or wait for CDN cache headers to expire. Changing the filename also works but breaks old bookmarks.",
    },
    {
      question: "Where should the tags go in a Next.js or WordPress site?",
      answer:
        "In the shared document head: the root layout in Next.js, or the theme header in WordPress. One set of tags is enough for every page.",
    },
  ],
};

export const howToSplitPdfGuide: GuideDefinition = {
  slug: "how-to-split-pdf-pages",
  title: "How to Split PDF Pages by Range",
  summary: "Extract page ranges from a PDF in your browser using simple range syntax.",
  metaTitle: "How to Split PDF Pages Online",
  metaDescription:
    "Split PDF pages by range (1-3, 5) or export every page. Browser-based PDF split with no upload.",
  keywords: ["how to split pdf", "split pdf pages", "extract pdf pages"],
  intro:
    "Splitting helps when you need one chapter, a signature page, or individual scans from a multi-page document.",
  primaryToolId: "pdf-split",
  relatedToolIds: ["pdf-merge", "text-to-pdf"],
  relatedGuideSlugs: ["how-to-merge-pdf-files"],
  categorySlug: "document-tools",
  subcategoryId: "pdf-tools",
  lastReviewed: "2026-06-02",
  sections: [
    {
      id: "ranges",
      heading: "Page range syntax",
      paragraphs: [
        "Use all to export every page as separate files, or ranges like 1-3, 5 for specific pages.",
        "Upload one PDF at a time, enter ranges, then download the exported pages.",
      ],
      linkedToolIds: ["pdf-split"],
    },
  ],
  faqs: [
    {
      question: "What does 1-3, 5 mean?",
      answer: "Pages 1 through 3 plus page 5 are exported according to the tool output naming.",
    },
  ],
};

export const compoundInterestFormulaGuide: GuideDefinition = {
  slug: "compound-interest-formula-explained",
  title: "Compound Interest Formula Explained",
  summary: "Understand A = P(1 + r/n)^(nt) and how compounding frequency changes growth.",
  metaTitle: "Compound Interest Formula Explained with Examples",
  metaDescription:
    "Learn the compound interest formula, compounding frequency, and how to estimate future value with a free calculator.",
  keywords: ["compound interest formula", "compound interest explained", "future value formula"],
  intro:
    "Compound interest grows the balance on both principal and previously earned interest. The standard formula is A = P(1 + r/n)^(nt).",
  primaryToolId: "compound-interest-calculator",
  relatedToolIds: ["loan-payment-calculator", "break-even-calculator"],
  categorySlug: "finance-calculators",
  subcategoryId: "investment-basics",
  lastReviewed: "2026-06-02",
  disclaimer: FINANCE_DISCLAIMER,
  sections: [
    {
      id: "variables",
      heading: "What each variable means",
      paragraphs: [
        "P is principal, r is annual rate as a decimal, n is compounding periods per year, and t is years.",
        "More frequent compounding (monthly vs annual) increases ending balance when the nominal rate is unchanged.",
      ],
      linkedToolIds: ["compound-interest-calculator"],
    },
  ],
  faqs: [
    {
      question: "Is monthly compounding the same as APR?",
      answer: "APR describes borrowing cost; compounding frequency affects how often interest is applied to savings.",
    },
  ],
};

export const sqlFormattingGuide: GuideDefinition = {
  slug: "sql-formatting-best-practices",
  title: "SQL Formatting Best Practices",
  summary: "Pretty-print SQL for reviews, docs, and pull requests without changing query meaning.",
  metaTitle: "SQL Formatting Best Practices for Readability",
  metaDescription:
    "Format SQL with consistent keyword breaks and indentation. Tips for pretty-print vs minify in code review.",
  keywords: ["sql formatter", "format sql", "pretty print sql"],
  intro:
    "Consistent SQL formatting speeds code review and reduces mistakes when editing long queries copied from logs or BI tools.",
  primaryToolId: "sql-formatter",
  relatedToolIds: ["json-formatter", "css-formatter"],
  categorySlug: "developer-tools",
  subcategoryId: "formatters-validators",
  lastReviewed: "2026-06-02",
  sections: [
    {
      id: "pretty",
      heading: "When to pretty-print",
      paragraphs: [
        "Use pretty-print for documentation, onboarding, and PR comments. Place major clauses (SELECT, FROM, WHERE, JOIN) on separate lines.",
        "Minify only when saving space in generated strings—not for human editing.",
      ],
      linkedToolIds: ["sql-formatter"],
    },
  ],
  faqs: [
    {
      question: "Does formatting change query results?",
      answer: "No. Formatting adjusts whitespace; semantics stay the same unless your engine treats whitespace specially (rare).",
    },
  ],
};

export const imageResizeWebGuide: GuideDefinition = {
  slug: "resize-images-for-web",
  title: "How to Resize Images for the Web",
  summary: "Pick dimensions, preserve aspect ratio, and compress after resize for faster pages.",
  metaTitle: "Resize Images for Web Performance",
  metaDescription:
    "Resize images for websites and social posts. Learn dimension targets, aspect ratio, and compression workflow.",
  keywords: ["resize image for web", "image dimensions", "web image size"],
  intro:
    "Oversized images slow pages and waste bandwidth. Resize to display size, then compress; convert formats when PNG transparency is not needed.",
  primaryToolId: "image-resizer",
  relatedToolIds: ["image-compressor", "png-to-jpg"],
  categorySlug: "image-tools",
  subcategoryId: "image-editing",
  lastReviewed: "2026-06-02",
  sections: [
    {
      id: "workflow",
      heading: "Recommended workflow",
      paragraphs: [
        "Resize to the maximum display width your layout needs (often 1200–1600 px for hero images).",
        "Compress with a quality slider around 0.75–0.85 for photos. Use PNG only when you need transparency.",
      ],
      linkedToolIds: ["image-resizer", "image-compressor"],
    },
  ],
  faqs: [
    {
      question: "Should I upload 4000px images?",
      answer: "No. Scale down to displayed size; browsers still download full oversized files if you skip resize.",
    },
  ],
};

export const concreteYardageGuide: GuideDefinition = {
  slug: "concrete-yardage-calculation",
  title: "How to Calculate Concrete Cubic Yards",
  summary: "Convert slab length, width, and depth into cubic yards and bag estimates.",
  metaTitle: "Concrete Cubic Yard Calculator Guide",
  metaDescription:
    "Calculate concrete cubic yards from slab dimensions. Convert depth in inches to yardage and bag counts.",
  keywords: ["concrete cubic yards", "concrete calculator", "how much concrete"],
  intro:
    "Concrete volume starts with slab dimensions in feet and depth in inches. Convert to cubic yards before ordering ready-mix or bags.",
  primaryToolId: "concrete-calculator",
  relatedToolIds: ["cement-calculator", "gravel-calculator"],
  categorySlug: "construction-calculators",
  subcategoryId: "concrete-masonry",
  lastReviewed: "2026-06-02",
  sections: [
    {
      id: "formula",
      heading: "Volume formula",
      paragraphs: [
        "Cubic feet = length (ft) × width (ft) × depth (in) ÷ 12. Cubic yards = cubic feet ÷ 27.",
        "Add 5–10% waste for spills and uneven subgrade on larger pours.",
      ],
      linkedToolIds: ["concrete-calculator"],
    },
  ],
  faqs: [
    {
      question: "How many bags per yard?",
      answer: "Roughly 45 eighty-pound bags per cubic yard for back-of-envelope estimates—verify with your mix spec.",
    },
  ],
};

export const serpPreviewTipsGuide: GuideDefinition = {
  slug: "serp-snippet-preview-tips",
  title: "SERP and Social Preview Tips",
  summary: "Draft titles and descriptions that fit typical search and Open Graph display limits.",
  metaTitle: "SERP Snippet Preview Tips for SEO",
  metaDescription:
    "Preview SERP titles and meta descriptions. Learn length targets for Google snippets and social cards.",
  keywords: ["serp preview", "meta description length", "open graph preview"],
  intro:
    "Search snippets truncate long titles and descriptions. Previewing before publish reduces awkward cutoffs on Google and social shares.",
  primaryToolId: "open-graph-preview",
  relatedToolIds: ["meta-tag-generator", "utm-builder"],
  categorySlug: "marketing-tools",
  subcategoryId: "seo-social",
  lastReviewed: "2026-06-02",
  sections: [
    {
      id: "length",
      heading: "Length targets",
      paragraphs: [
        "Aim for ~50–60 characters in titles and ~150–160 characters in meta descriptions for many desktop results—mobile may differ.",
        "Open Graph images should be at least 1200×630 for large link previews on major platforms.",
      ],
      linkedToolIds: ["open-graph-preview"],
    },
  ],
  faqs: [
    {
      question: "Do previews guarantee Google display?",
      answer: "Google may rewrite snippets. Strong previews still improve social shares and internal QA.",
    },
  ],
};

export const wordCountSeoGuide: GuideDefinition = {
  slug: "word-count-for-seo-and-social",
  title: "Word Count for SEO and Social Limits",
  summary: "Count words, reading time, and platform character limits in one pass.",
  metaTitle: "Word Count for SEO and Social Media Limits",
  metaDescription:
    "Count words and characters for blog SEO and social posts. Reading time and density tips included.",
  keywords: ["word counter seo", "word count tool", "character limit social"],
  intro:
    "Editors use word count for article length targets, reading time estimates, and social platform caps.",
  primaryToolId: "word-counter",
  relatedToolIds: ["character-counter", "line-counter"],
  categorySlug: "text-tools",
  subcategoryId: "text-analysis",
  lastReviewed: "2026-06-02",
  sections: [
    {
      id: "targets",
      heading: "Practical targets",
      paragraphs: [
        "Long-form guides often land at 1,200–2,500 words depending on query competition—not a hard rule.",
        "Track character counts separately for meta descriptions and social posts with strict caps.",
      ],
      linkedToolIds: ["word-counter"],
    },
  ],
  faqs: [
    {
      question: "What reading speed is assumed?",
      answer: "Roughly 200 words per minute for adult readers in English for estimate purposes.",
    },
  ],
};

export const jsonVsCsvGuide: GuideDefinition = {
  slug: "when-to-use-json-vs-csv",
  title: "When to Use JSON vs CSV",
  summary: "Choose JSON for nested APIs and CSV for flat tabular exports.",
  metaTitle: "JSON vs CSV: When to Use Each Format",
  metaDescription:
    "Compare JSON and CSV for data exchange. Learn when nested JSON needs flattening and when CSV is enough.",
  keywords: ["json vs csv", "convert json to csv", "data format"],
  intro:
    "JSON fits nested API payloads; CSV fits spreadsheets and flat tables. Converting between them is common in ETL and reporting workflows.",
  primaryToolId: "json-to-csv",
  relatedToolIds: ["csv-to-json", "nested-json-to-csv"],
  categorySlug: "developer-tools",
  subcategoryId: "data-converters",
  lastReviewed: "2026-06-02",
  sections: [
    {
      id: "choose",
      heading: "How to choose",
      paragraphs: [
        "Use JSON when objects nest (users with addresses, line items with options). Use CSV when every row shares the same columns.",
        "Flatten nested JSON before CSV export when analytics tools require a single header row.",
      ],
      linkedToolIds: ["json-to-csv", "nested-json-to-csv"],
    },
  ],
  faqs: [
    {
      question: "Can CSV represent nesting?",
      answer: "Only with conventions like dot notation columns or repeated rows—not native nesting.",
    },
  ],
};

export const capRateVsCashOnCashGuide: GuideDefinition = {
  slug: "cap-rate-vs-cash-on-cash",
  title: "Cap Rate vs Cash-on-Cash Return",
  summary: "Cap rate is unlevered; cash-on-cash reflects financing and cash invested.",
  metaTitle: "Cap Rate vs Cash-on-Cash Explained",
  metaDescription:
    "Compare cap rate and cash-on-cash return for rental properties. Learn when each metric applies.",
  keywords: ["cap rate vs cash on cash", "rental property metrics"],
  intro:
    "Cap rate compares NOI to purchase price without debt. Cash-on-cash measures annual cash flow against cash invested, so financing changes the story.",
  primaryToolId: "cap-rate-calculator",
  relatedToolIds: ["cash-on-cash-calculator", "rental-deal-analyzer"],
  categorySlug: "real-estate-calculators",
  subcategoryId: "deal-analysis",
  lastReviewed: "2026-06-02",
  disclaimer:
    "Educational only—not investment advice. Verify assumptions with local professionals.",
  sections: [
    {
      id: "compare",
      heading: "Side-by-side comparison",
      paragraphs: [
        "Cap rate = NOI ÷ price. Useful for comparing properties at similar leverage.",
        "Cash-on-cash = annual pre-tax cash flow ÷ total cash invested (down payment, closing, reserves).",
      ],
      linkedToolIds: ["cap-rate-calculator", "cash-on-cash-calculator"],
    },
  ],
  faqs: [
    {
      question: "Can cap rate look good while cash-on-cash is negative?",
      answer: "Yes. High debt service can create negative cash flow even when NOI supports a moderate cap rate.",
    },
  ],
};

export const acresConversionGuide: GuideDefinition = {
  slug: "acres-to-square-feet-guide",
  title: "Acres to Square Feet Conversion Guide",
  summary: "One acre equals 43,560 square feet in US survey measure—common in land listings.",
  metaTitle: "Acres to Square Feet: Conversion Factor",
  metaDescription:
    "Convert acres to square feet with the 43,560 factor. Examples for lots, farmland, and listings.",
  keywords: ["acres to square feet", "how many square feet in an acre"],
  intro:
    "US land listings often mix acres and square feet. The standard conversion is 1 acre = 43,560 square feet.",
  primaryToolId: "acres-to-square-feet",
  relatedToolIds: ["square-feet-to-acres", "hectares-to-acres"],
  categorySlug: "unit-converters",
  subcategoryId: "area",
  lastReviewed: "2026-06-02",
  sections: [
    {
      id: "factor",
      heading: "The conversion factor",
      paragraphs: [
        "Multiply acres by 43,560 to get square feet. Divide square feet by 43,560 for acres.",
        "Hectares use metric measure; convert hectares to acres when comparing international parcels to US listings.",
      ],
      linkedToolIds: ["acres-to-square-feet", "hectares-to-acres"],
    },
  ],
  faqs: [
    {
      question: "Is a commercial acre different?",
      answer: "Most US real estate uses the 43,560 sq ft survey acre unless a local exception is documented.",
    },
  ],
};

export const textDiffGuide: GuideDefinition = {
  slug: "how-to-compare-text-diffs",
  title: "How to Compare Text Diffs",
  summary: "Line-by-line diffing highlights additions and removals between two versions.",
  metaTitle: "How to Compare Text Diffs Online",
  metaDescription:
    "Compare two text versions with a line diff. See added and removed lines for docs, code, and copy edits.",
  keywords: ["text diff", "compare text", "diff checker"],
  intro:
    "Diffing helps review contract edits, changelog entries, and pasted copy updates before publishing.",
  primaryToolId: "text-diff",
  relatedToolIds: ["remove-duplicate-lines", "case-converter"],
  categorySlug: "text-tools",
  subcategoryId: "text-analysis",
  lastReviewed: "2026-06-02",
  sections: [
    {
      id: "usage",
      heading: "Using a line diff",
      paragraphs: [
        "Paste original text on the left and updated text on the right. Lines prefixed with - were removed; + lines were added.",
        "For large files, consider splitting by section to keep reviews manageable.",
      ],
      linkedToolIds: ["text-diff"],
    },
  ],
  faqs: [
    {
      question: "Does diff catch word-level changes?",
      answer: "Line-based diff highlights whole line changes; small edits on one line show as a removed and added line pair.",
    },
  ],
};

export const phase2Guides = [
  howToMergePdfGuide,
  howToSplitPdfGuide,
  howToAddFaviconGuide,
  compoundInterestFormulaGuide,
  sqlFormattingGuide,
  imageResizeWebGuide,
  concreteYardageGuide,
  serpPreviewTipsGuide,
  wordCountSeoGuide,
  jsonVsCsvGuide,
  capRateVsCashOnCashGuide,
  acresConversionGuide,
  textDiffGuide,
];
