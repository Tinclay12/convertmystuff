import type { GuideDefinition } from "@/lib/content/types";

export const howToAddFaviconGuide: GuideDefinition = {
  slug: "how-to-add-a-favicon",
  title: "How to Add a Favicon in HTML",
  summary:
    "Generate favicon.ico and PNG icons, then add link tags in the document head so browsers, iOS, and search results show your icon.",
  metaTitle: "How to Add a Favicon in HTML (link tags + favicon.ico)",
  metaDescription:
    "Add a favicon with root favicon.ico, PNG sizes, apple-touch-icon, and site.webmanifest. Copy-ready HTML, plus how to fix a favicon that will not show.",
  keywords: [
    "how to add a favicon",
    "favicon html",
    "link rel icon",
    "apple-touch-icon",
    "favicon not showing",
    "favicon not updating",
  ],
  intro:
    "A favicon is the small icon in browser tabs, bookmarks, and some search results. You need two pieces: the image files, and HTML that points to them. Place favicon.ico at the site root for older clients, then add explicit link tags for PNG and Apple touch icons so modern browsers do not guess.",
  primaryToolId: "favicon-generator",
  relatedToolIds: ["png-to-ico", "ico-to-png", "svg-to-png"],
  relatedResourceSlugs: ["what-is-an-ico-file", "standard-favicon-sizes"],
  categorySlug: "image-tools",
  subcategoryId: "icons-favicons",
  lastReviewed: "2026-09-11",
  sections: [
    {
      id: "generate",
      heading: "Generate the files",
      paragraphs: [
        "Start with a square logo at 512×512 or larger. Simple shapes read better at 16×16 than photographs or thin text.",
        "Use a favicon generator to export favicon.ico (multiple sizes), favicon-32x32.png, apple-touch-icon.png (180×180), android-chrome 192/512 PNGs, and site.webmanifest. Keep filenames stable so bookmarks survive a rebrand.",
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
        "In the document head, declare the ICO, a PNG for high-DPI tabs, an Apple touch icon, and the web manifest. Example: link rel=\"icon\" href=\"/favicon.ico\" sizes=\"any\", link rel=\"icon\" type=\"image/png\" sizes=\"32x32\" href=\"/favicon-32x32.png\", link rel=\"apple-touch-icon\" sizes=\"180x180\" href=\"/apple-touch-icon.png\", and link rel=\"manifest\" href=\"/site.webmanifest\".",
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
    {
      id: "troubleshooting",
      heading: "Diagnosing a favicon that will not appear",
      paragraphs: [
        "Work in this order instead of regenerating files. First, request the file directly: open yoursite.com/favicon.ico in the address bar. If it 404s, the file never deployed or sits in the wrong directory, and no amount of cache clearing will help. If it returns the old icon, your CDN or host is serving a stale copy and the fix belongs there.",
        "If the direct URL serves the correct image but the tab does not, the file is fine and something between the HTML and the browser cache is at fault. Check that the link tags render inside head in view-source rather than in the built output you expect — a tag injected by JavaScript after load is frequently ignored, because browsers resolve favicons early.",
        "Rule out the two silent blockers next. A Disallow rule covering /favicon.ico in robots.txt stops crawlers and some browsers from fetching it. And a Content-Security-Policy img-src directive that omits your own origin or data: will block the icon while leaving the rest of the page intact.",
        "Only then treat it as cache. Chrome keeps favicons in a database separate from the normal HTTP cache, so Empty Cache and Hard Reload does not always evict them; a private window gives you a clean read in one step. Firefox and Safari behave similarly. If the icon is correct in a private window, the file and markup are right and you are only waiting on your own cache.",
        "Platform quirks account for most of the rest. iOS captures the touch icon when a home-screen shortcut is created and never refreshes it — the user must delete and re-add the shortcut. Windows caches pinned-site icons in the shell rather than the browser. Google re-crawls favicons for search results on its own schedule, so a correct icon can take weeks to appear beside your listing.",
      ],
      linkedToolIds: ["favicon-generator", "ico-to-png"],
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
        "In the shared document head: the root layout in Next.js, or the theme header in WordPress. One set of tags is enough for every page. On the Next.js App Router you can skip the tags entirely — put favicon.ico in the top level of app/ and the tags are generated for you.",
    },
    {
      question: "Why does my favicon work in one browser but not another?",
      answer:
        "Usually a format or cache difference rather than broken markup. SVG icons are not honoured everywhere, so keep favicon.ico or a PNG as a fallback. If the icon is correct in a private window, the file is fine and the other browser is serving its own cached copy.",
    },
    {
      question: "How long does Google take to show a favicon in search results?",
      answer:
        "Google fetches favicons on its own crawl schedule, separate from your deploy, so expect days to weeks. The icon must be reachable at a stable URL, must not be blocked in robots.txt, and should be a square of at least 48×48 px.",
    },
    {
      question: "Should I rename the file to force an update?",
      answer:
        "Prefer fixing cache headers. Renaming to favicon-v2.ico does force browsers to refetch, but it breaks the automatic /favicon.ico root request that many clients make regardless of your HTML, along with any bookmark pointing at the old path.",
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
  howToAddFaviconGuide,
  sqlFormattingGuide,
  textDiffGuide,
];
