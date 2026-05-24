import type { ResourceDefinition } from "@/lib/content/types";

export const whatIsAnIcoFileResource: ResourceDefinition = {
  slug: "what-is-an-ico-file",
  categorySlug: "image-tools",
  title: "What Is an ICO File?",
  summary:
    "ICO is a Windows icon format that can store multiple sizes in one file—commonly used for website favicons and app shortcuts.",
  metaTitle: "What Is an ICO File? Favicon Format Explained",
  metaDescription:
    "Learn what ICO files are, how they differ from PNG, common favicon sizes, and when to convert PNG to ICO for browsers.",
  keywords: ["what is ico file", "ico format", "favicon ico", "png to ico"],
  quickAnswer:
    "An ICO file is a container image format that stores one or more icon sizes (often 16×16, 32×32, and 48×48 pixels) in a single file. Browsers and operating systems use ICO files for favicons and shortcut icons.",
  intro:
    "If you are preparing a website favicon or Windows shortcut icon, you will encounter the .ico extension. Unlike a single PNG, an ICO file can bundle several resolutions so the icon looks sharp on browser tabs, bookmarks, desktop shortcuts, and pinned taskbar items. Understanding how ICO works helps you choose the right export settings, size embedded frames correctly, and avoid blurry or cropped icons across platforms. Whether you maintain a marketing site, ship an internal portal, or publish a desktop app installer, ICO remains the most reliable single-file fallback for environments that expect favicon.ico at the domain root.",
  primaryToolId: "png-to-ico",
  relatedToolIds: ["svg-to-png"],
  relatedResourceSlugs: ["standard-favicon-sizes"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "format-basics",
      heading: "How ICO files work",
      paragraphs: [
        "ICO (icon) is a bitmap container format originally designed for Microsoft Windows. Each file can include multiple embedded images at different dimensions and color depths, along with metadata that tells the operating system which image to render at a given display context. A single favicon.ico might contain 16×16, 32×32, 48×48, and even 256×256 pixel versions of the same logo, all packaged together.",
        "The format supports both BMP and PNG compression inside the container. Modern ICO files often store PNG-encoded frames because PNG achieves smaller file sizes at larger dimensions while preserving transparency. When a browser or shell requests an icon, it selects the closest matching size rather than scaling a tiny image up, which is why multi-size ICO files look noticeably sharper than a lone 16×16 graphic stretched to fit.",
      ],
    },
    {
      id: "png-vs-ico",
      heading: "PNG vs ICO for favicons",
      paragraphs: [
        "PNG is a single-resolution raster image. You export one width and height, and every consumer of that file scales it as needed. That works well for apple-touch-icon links and web manifest entries where you explicitly declare a 180×180 or 512×512 asset. ICO differs because it holds several resolutions in one download, which helps older browsers and Windows shell integration pick the best match without issuing separate HTTP requests for each size.",
        "If you already have a square PNG—typically exported at 512×512 or 256×256 from your brand guidelines—converting to ICO is a practical step before uploading to a CMS or dropping favicon.ico into your site root. The conversion step downscales your master artwork into the tab-friendly sizes browsers expect. PNG remains the better choice when you need one large marketing icon; ICO remains the better choice when you need broad legacy desktop support from a single root file.",
      ],
      linkedToolIds: ["png-to-ico"],
    },
    {
      id: "when-to-use",
      heading: "When to use ICO instead of PNG alone",
      paragraphs: [
        "Reach for ICO when you want a single favicon.ico at the domain root that Just Works across Internet Explorer-era behavior, classic desktop browsers, and Windows shortcut pinning without maintaining a long list of link tags. Many enterprise intranet templates and older CMS themes still assume favicon.ico exists at /favicon.ico and never read modern manifest files.",
        "Prefer PNG (plus manifest and apple-touch-icon tags) when you are building a progressive web app, targeting mobile home-screen installs, or optimizing for Lighthouse audits that reward explicit icon declarations. The strongest production setups combine both: an ICO for backward compatibility and PNG declarations for high-DPI mobile contexts. Neither format replaces the other entirely—they cover overlapping but not identical platform requirements.",
      ],
    },
    {
      id: "creating-ico",
      heading: "Creating a quality ICO from source artwork",
      paragraphs: [
        "Start with a square master image. Logos designed on rectangular canvases should be centered on a square artboard with safe padding so circular masks and browser chrome do not clip corners. Export at least 256×256 pixels; vector sources should be rasterized at this size or higher before conversion so downscaled tab icons retain clean edges.",
        "Include 16×16, 32×32, and 48×48 in the ICO bundle at minimum. Optionally add 64×64 and 256×256 for Windows shell views and high-DPI taskbar pinning. After conversion, open the ICO in a preview tool and inspect each embedded size—fine details that read well at 256×256 often disappear or muddy at 16×16, so you may simplify the mark for the smallest frames.",
      ],
      linkedToolIds: ["png-to-ico", "svg-to-png"],
    },
    {
      id: "browser-support",
      heading: "Browser and platform support today",
      paragraphs: [
        "All major desktop browsers still accept favicon.ico, whether referenced explicitly in HTML or discovered automatically at the site root. Chromium, Firefox, Safari, and Edge also support PNG favicons via link rel=\"icon\" with a type attribute, and Safari uses separate apple-touch-icon assets for iOS home-screen bookmarks.",
        "ICO does not support animation, SVG vectors, or adaptive light/dark variants inside one file. For animated tab indicators or theme-aware icons, use separate PNG or SVG link tags and treat ICO as the conservative baseline. Search engines index favicons for result listings, so a crisp multi-size ICO can improve brand recognition in SERPs even when most users never think about the format.",
      ],
    },
    {
      id: "file-size",
      heading: "File size and performance considerations",
      paragraphs: [
        "A well-built favicon.ico with four to six embedded PNG-compressed sizes typically weighs 10–40 KB for simple geometric logos. Complex photographic artwork balloons quickly because each embedded frame stores full raster data. Optimize the master PNG before conversion, reduce color depth where transparency allows, and avoid unnecessary 512×512 frames if your audience is exclusively modern mobile browsers using manifest PNGs.",
        "Browsers fetch favicon.ico on nearly every first visit to a domain, so bloated icons slightly hurt performance metrics even though they rarely dominate total page weight. CDN caching and long Cache-Control headers help after the first request. Treat ICO as one asset in a broader icon strategy rather than the only icon asset on a performance-critical landing page.",
      ],
    },
  ],
  examples: [
    {
      title: "Website favicon from a logo PNG",
      description:
        "Export a 512×512 PNG logo on a square canvas, convert to ICO with 16, 32, and 48 px sizes embedded, upload as favicon.ico to the site root, and add <link rel=\"icon\" href=\"/favicon.ico\" sizes=\"any\"> in the document head for explicit discovery.",
    },
    {
      title: "Windows desktop shortcut",
      description:
        "Pack 256×256, 48×48, 32×32, and 16×16 sizes into one ICO so a pinned shortcut stays crisp in File Explorer large-icon view, the taskbar, and the Start menu without Windows upscaling a single tiny bitmap.",
    },
    {
      title: "Intranet CMS with legacy template",
      description:
        "A corporate SharePoint-style theme only checks for /favicon.ico. Converting the approved brand PNG to ICO satisfies the template requirement while a separate 180×180 apple-touch-icon PNG covers mobile employee bookmarks.",
    },
  ],
  commonMistakes: [
    "Using a non-square source image—favicons should be square to avoid asymmetric cropping in browser tabs and circular masks on mobile.",
    "Including only one tiny 16×16 size, which looks soft or pixelated when pinned to a taskbar or saved to a high-DPI home screen.",
    "Assuming ICO supports animation—it does not; use GIF or separate PNG frames for animated indicators elsewhere.",
    "Embedding a 1024×1024 single frame without smaller sizes, bloating every page load while tabs still render a poorly scaled down version.",
    "Placing fine text or thin strokes in the mark without testing at 16×16, where details become an unreadable smear.",
  ],
};

export const standardFaviconSizesResource: ResourceDefinition = {
  slug: "standard-favicon-sizes",
  categorySlug: "image-tools",
  title: "Standard Favicon Sizes Explained",
  summary:
    "A practical list of favicon dimensions browsers and platforms expect, and how to bundle them in one ICO file.",
  metaTitle: "Standard Favicon Sizes - 16, 32, 48 & More",
  metaDescription:
    "See common favicon sizes for browser tabs, bookmarks, and mobile home screens, and learn how to generate them from PNG.",
  keywords: ["favicon sizes", "favicon dimensions", "ico sizes", "website icon sizes"],
  quickAnswer:
    "Most sites include 16×16 and 32×32 px for browser tabs, plus 48×48 px for Windows shortcuts. Many teams also prepare 180×180 for Apple touch icons and 192×192 or 512×512 for PWA manifests—often as separate PNG files rather than inside ICO.",
  intro:
    "Favicon requirements vary by browser, operating system, and install context. Bundling the most common sizes in an ICO covers classic desktop tabs and Windows shell integration; modern sites add PNG link tags and manifest entries for high-DPI displays, iOS home screens, and Android install prompts. This reference lists the sizes teams actually ship, explains which belong inside ICO versus standalone PNG files, and shows the HTML patterns that wire them together. Treat favicon sizing as a small accessibility and brand touchpoint—users may not comment on a crisp tab icon, but they notice when yours is missing or blurry next to competitors.",
  primaryToolId: "png-to-ico",
  relatedToolIds: ["svg-to-png"],
  relatedResourceSlugs: ["what-is-an-ico-file"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "common-sizes",
      heading: "Sizes to include in an ICO",
      paragraphs: [
        "16×16 pixels remains the baseline browser tab size on standard-density displays. 32×32 serves high-DPI tabs, bookmark bars, and some extension UI slots where the browser doubles the logical size. 48×48 supports Windows site shortcuts, certain pinned-tab contexts, and legacy shell views that request a mid-size icon.",
        "Many generators also embed 64×64, 128×128, or 256×256 for larger Windows icon views and taskbar pinning. You do not need every size—covering 16, 32, and 48 is a solid minimum, and adding 256×256 future-proofs Windows shell rendering. Each additional embedded frame increases file weight slightly, but a well-compressed multi-size ICO under 50 KB is typical for simple logos.",
      ],
      linkedToolIds: ["png-to-ico"],
    },
    {
      id: "desktop-platforms",
      heading: "Desktop browser and Windows platform sizes",
      paragraphs: [
        "Chromium-based browsers (Chrome, Edge, Brave) read favicon.ico from the root and honor link rel=\"icon\" declarations with explicit sizes. Firefox follows the same pattern and caches favicons aggressively—correct sizes prevent blurry rescaling in the tab strip. Safari on macOS uses tab icons near 16×16 logical pixels but benefits from a 32×32 source on Retina displays.",
        "Windows 10 and 11 pull from ICO files for pinned site shortcuts, taskbar buttons, and Jump List thumbnails. Supplying 48×48 and 256×256 inside the ICO avoids Windows upscaling a favicon meant only for tiny tabs. Linux desktop environments vary, but they generally accept the same favicon.ico conventions as Chromium.",
      ],
    },
    {
      id: "mobile-platforms",
      heading: "Mobile and touch icon sizes",
      paragraphs: [
        "Apple recommends a 180×180 PNG for apple-touch-icon, referenced with link rel=\"apple-touch-icon\". iOS applies rounded corners automatically; do not pre-round the artwork unless brand guidelines require it. Older documentation cited 152×152 for iPad, but a single 180×180 asset covers modern iPhone and iPad home-screen bookmarks.",
        "Android Chrome and installable PWAs rely on icons declared in the web app manifest: 192×192 for home-screen icons and 512×512 for splash screens and Play Store–style install banners. These PNG files should not be stuffed into favicon.ico—they are separate assets with distinct paths in HTML and JSON manifest files.",
      ],
    },
    {
      id: "html-examples",
      heading: "HTML link tag examples",
      paragraphs: [
        "A minimal modern head might include: link rel=\"icon\" href=\"/favicon.ico\" sizes=\"any\" for the ICO bundle, link rel=\"icon\" type=\"image/png\" sizes=\"32x32\" href=\"/favicon-32x32.png\" for explicit PNG tabs, and link rel=\"apple-touch-icon\" sizes=\"180x180\" href=\"/apple-touch-icon.png\" for iOS. Each tag should live in the document head before body content.",
        "For PWAs, the manifest.json icons array lists src, sizes, type, and purpose (any, maskable). Example entry: { \"src\": \"/icon-512.png\", \"sizes\": \"512x512\", \"type\": \"image/png\", \"purpose\": \"any maskable\" }. Browsers pick the closest manifest icon when users install the app; missing 512×512 entries produce soft or cropped install icons.",
      ],
    },
    {
      id: "workflow",
      heading: "Recommended production workflow",
      paragraphs: [
        "Design one square master at 512×512 or export from SVG at that resolution. Generate favicon.ico with 16, 32, 48, and 256 px frames. Export standalone PNGs at 32×32, 180×180, 192×192, and 512×512 from the same master so colors and padding stay consistent.",
        "Place favicon.ico at the domain root, put PNG variants in /icons or /assets, wire link tags in your layout template, and reference manifest icons in site metadata. After deploy, verify in Chrome DevTools Application panel, Safari Responsive Design Mode, and an actual iOS home-screen add to confirm each size resolves. Clear CDN caches when replacing favicons—browsers cache them heavily.",
      ],
      linkedToolIds: ["png-to-ico", "svg-to-png"],
    },
    {
      id: "pwa-maskable",
      heading: "PWA maskable icons and safe zones",
      paragraphs: [
        "Maskable icons for installable PWAs require extra padding so Android adaptive icons do not crop logo edges. Google recommends keeping critical artwork inside a central safe circle roughly 80% of the canvas. Export maskable 512×512 PNGs separately from favicon.ico; the ICO format does not express maskable purpose flags that manifest.json expects.",
        "Teams sometimes reuse one 512×512 PNG for both manifest purpose \"any\" and \"maskable\" to save time. Dedicated maskable artwork reduces install-icon clipping on Samsung and Pixel launchers. Test installs on real Android hardware—not just desktop Chrome—before launching a campaign that promotes \"Add to Home Screen.\"",
      ],
    },
  ],
  examples: [
    {
      title: "Minimal ICO bundle for a marketing site",
      description:
        "From a 512×512 master PNG, generate favicon.ico containing 16, 32, and 48 px frames. Add one apple-touch-icon at 180×180 and skip PWA manifest icons until the product ships install prompts.",
    },
    {
      title: "Full-stack favicon head markup",
      description:
        "Deploy favicon.ico at root plus favicon-32x32.png, apple-touch-icon.png (180×180), and manifest icons at 192×192 and 512×512. Head includes icon, apple-touch-icon, and manifest link tags pointing to each asset.",
    },
    {
      title: "Rebranding without broken bookmarks",
      description:
        "Keep filenames stable (/favicon.ico, /apple-touch-icon.png) and swap file contents during a rebrand. Users who bookmarked the site pick up the new icon on cache expiry instead of broken image placeholders from renamed paths.",
    },
  ],
  commonMistakes: [
    "Relying on favicon.ico alone on mobile—add apple-touch-icon and manifest icons or home-screen installs show a generic screenshot thumbnail.",
    "Uploading a 1024×1024 single-size ICO without downscaled frames, wasting bandwidth while tabs still render a poorly scaled icon.",
    "Omitting sizes=\"any\" or explicit sizes attributes, causing browsers to guess and occasionally fetch the wrong asset.",
    "Using different artwork across ICO and PNG variants so tabs and home-screen icons look like different brands.",
    "Forgetting to invalidate CDN caches after a favicon update, making production appear stuck on an old icon for days.",
  ],
};

export const whatIsJsonResource: ResourceDefinition = {
  slug: "what-is-json",
  categorySlug: "developer-tools",
  title: "What Is JSON?",
  summary:
    "JSON is a lightweight text format for structured data—arrays, objects, strings, numbers, booleans, and null.",
  metaTitle: "What Is JSON? Format Basics for Developers",
  metaDescription:
    "Learn JSON syntax, common data shapes, and how JSON relates to CSV and spreadsheet import workflows.",
  keywords: ["what is json", "json format", "json syntax", "json data"],
  quickAnswer:
    "JSON (JavaScript Object Notation) represents data as text using objects `{ \"key\": value }` and arrays `[ ... ]`. It is widely used for APIs, config files, and data exchange because it is human-readable and easy to parse in every major programming language.",
  intro:
    "JSON is the lingua franca of modern APIs and configuration systems. Before converting JSON to CSV, validating a webhook payload, or debugging a REST response, it helps to recognize valid structure, common nesting patterns, and the strict syntax rules parsers enforce. This guide covers core syntax, the data shapes you will encounter in production, and how JSON fits into API-driven workflows from request to spreadsheet export. Whether you are a developer piping webhook data into operations or an analyst receiving API exports from engineering, the same structural literacy prevents broken imports and silent data loss at the format boundary.",
  primaryToolId: "json-formatter",
  relatedToolIds: ["json-to-csv", "csv-to-json", "nested-json-to-csv"],
  relatedResourceSlugs: ["json-vs-csv-for-data-exchange", "flattening-nested-json-for-csv"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "syntax",
      heading: "Core JSON syntax",
      paragraphs: [
        "JSON objects wrap key-value pairs in curly braces. Keys must be double-quoted strings; values can be strings, numbers, booleans (true or false), null, arrays, or nested objects. Arrays list values in square brackets with comma separators. Strings use double quotes exclusively—single quotes are invalid.",
        "JSON does not allow comments, trailing commas, undefined values, or unquoted object keys. Functions, dates, and undefined from JavaScript do not serialize to JSON without explicit conversion. Strict parsers reject any deviation, which is why pasted JavaScript object literals often fail validation until you remove trailing commas and swap quotes. Validators that pretty-print also minify—both operations require parseable input.",
      ],
      linkedToolIds: ["json-formatter"],
    },
    {
      id: "data-types",
      heading: "Supported data types and encoding",
      paragraphs: [
        "Numbers include integers and floats; scientific notation is allowed. Strings support Unicode and standard escape sequences (\\n, \\t, \\\", \\\\). Boolean true and false are lowercase literals. null represents an intentional absence of value, distinct from an empty string or zero.",
        "There is no native date type—APIs typically use ISO 8601 strings like \"2026-05-23T14:30:00Z\". Binary data appears as Base64-encoded strings inside JSON rather than raw bytes. When exporting to CSV, remember that JSON types do not map perfectly: booleans become TRUE/FALSE text and null becomes an empty cell unless your converter specifies otherwise.",
      ],
    },
    {
      id: "common-shapes",
      heading: "Shapes you will see in the wild",
      paragraphs: [
        "An array of uniform objects—[{ \"id\": 1, \"name\": \"Ada\" }, { \"id\": 2, \"name\": \"Ben\" }]—maps cleanly to spreadsheet rows where each object becomes one row and each key becomes a column. This is the easiest JSON shape for CSV conversion and Excel import.",
        "A single nested document—{ \"company\": { \"name\": \"Acme\", \"offices\": [...] } }—requires flattening before most tabular tools can consume it. Pagination wrappers like { \"data\": [...], \"meta\": { \"page\": 1 } } are common in REST APIs; extract the inner array before converting. Null fields, empty arrays, and missing keys create sparse CSV output if not handled explicitly.",
      ],
      linkedToolIds: ["json-to-csv", "nested-json-to-csv"],
    },
    {
      id: "api-use",
      heading: "JSON in API request and response workflows",
      paragraphs: [
        "REST APIs send JSON in HTTP bodies with Content-Type: application/json. Clients POST JSON payloads to create resources and GET JSON responses to read them. GraphQL returns JSON with a data envelope and optional errors array. Webhooks deliver event JSON to your endpoint; validating structure before processing prevents silent data corruption.",
        "Typical workflow: fetch an API endpoint, receive a JSON array of records, pretty-print or validate with a formatter, optionally flatten nested fields, then convert to CSV for finance or operations teams in Excel. Config files (package.json, tsconfig.json, CI pipelines) use the same syntax, so the skills transfer between runtime API data and developer tooling. Log sample payloads in staging—not production—to debug schema drift without exposing customer PII.",
      ],
      linkedToolIds: ["json-formatter", "json-to-csv"],
    },
    {
      id: "validation",
      heading: "Validation, minification, and readability",
      paragraphs: [
        "Minified JSON removes whitespace for wire transfer; formatted (pretty-printed) JSON adds indentation for human review. Both are semantically identical if the underlying structure matches. Online formatters detect syntax errors with line-level feedback, which saves time when debugging large webhook payloads.",
        "Schema validation (JSON Schema, OpenAPI models, or language-native types) enforces required fields and data types at build time or runtime. Even without formal schemas, checking for expected top-level keys—data, results, items—before conversion prevents empty CSV exports when an API changes its envelope structure.",
      ],
      linkedToolIds: ["json-formatter"],
    },
    {
      id: "security",
      heading: "Security and safe handling",
      paragraphs: [
        "Never eval() JSON or treat parsed JSON as executable code. JSON is data, not a scripting language—though historically some libraries confused the two. When pasting JSON from email or tickets into online tools, remember it may contain personal data subject to privacy policies; client-side formatters that do not upload payloads reduce exposure compared to cloud validators that store inputs.",
        "Large JSON files can exhaust browser memory when pretty-printed. Stream or chunk multi-gigabyte exports on the server side rather than in a tab. For public APIs, rate-limit and authenticate endpoints that return sensitive JSON rather than relying on obscurity of field names. Redact tokens before sharing formatted samples in support tickets.",
      ],
    },
  ],
  examples: [
    {
      title: "API user list to spreadsheet",
      description:
        '[{"id":1,"email":"a@example.com","active":true},{"id":2,"email":"b@example.com","active":false}] becomes two CSV rows with columns id, email, and active—ready for Excel filtering and pivot tables. Import the CSV with the email column as text if addresses are primary keys for a mail-merge workflow.',
    },
    {
      title: "Nested config snippet",
      description:
        '{ "database": { "host": "localhost", "port": 5432 }, "features": ["auth", "billing"] } illustrates mixed objects and arrays. Flattening produces columns like database.host and a stringified features column unless arrays are expanded separately. DevOps teams often keep configs as JSON and only flatten for audit spreadsheets.',
    },
    {
      title: "Paginated API response",
      description:
        '{ "data": [{ "orderId": "A100" }], "meta": { "total": 847, "page": 1 } } requires extracting the data array before CSV conversion; meta belongs in a separate report row or summary sheet, not mixed with order rows. Loop pagination in code until meta.page exceeds meta.totalPages, then concatenate arrays before a single CSV export.',
    },
  ],
  commonMistakes: [
    "Using single quotes for strings and keys—JSON requires double quotes throughout.",
    "Expecting CSV-style flat rows when the payload is one deeply nested object without flattening.",
    "Pasting JavaScript object literals with trailing commas, comments, or unquoted keys into a strict JSON parser.",
    "Treating undefined or NaN from JavaScript as JSON—they are not valid JSON values and must be converted or omitted.",
    "Assuming API field order is guaranteed—unlike CSV, JSON object key order is not semantically meaningful and may change between responses.",
    "Storing secrets or API keys inside JSON config files committed to git—use environment variables and secret managers instead.",
  ],
};

export const jsonVsCsvResource: ResourceDefinition = {
  slug: "json-vs-csv-for-data-exchange",
  categorySlug: "developer-tools",
  title: "JSON vs CSV for Data Exchange",
  summary:
    "JSON preserves hierarchy and types; CSV is flat and spreadsheet-friendly. Choose based on your consumer.",
  metaTitle: "JSON vs CSV - When to Use Each Format",
  metaDescription:
    "Compare JSON and CSV for APIs, Excel import, and data pipelines—with guidance on converting between them.",
  keywords: ["json vs csv", "json or csv", "convert json to csv", "csv for excel"],
  quickAnswer:
    "Use JSON when structure, nesting, or API compatibility matters. Use CSV when the goal is spreadsheet analysis, bulk import, or simple row-column data. Convert JSON to CSV when you need Excel-friendly flat tables.",
  intro:
    "Teams constantly move data between systems that speak JSON and stakeholders who work in Excel. JSON preserves hierarchy, types, and API-friendly envelopes; CSV trades structure for universal spreadsheet compatibility. Choosing the wrong format—or converting without understanding what gets lost—leads to broken imports, mangled dates, and silent data truncation. This comparison covers strengths, trade-offs, and the Excel-specific pitfalls that appear at every handoff. Use it when deciding whether an export should stay structured for engineers or flatten for finance, marketing ops, and executives who live in pivot tables.",
  primaryToolId: "json-to-csv",
  relatedToolIds: ["csv-to-json", "csv-to-html-table"],
  relatedResourceSlugs: ["what-is-json", "flattening-nested-json-for-csv"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "json-strengths",
      heading: "When JSON is the better fit",
      paragraphs: [
        "APIs, webhooks, and configuration files benefit from nested objects, typed values, and arrays of mixed structures. JSON maps directly to objects in JavaScript, Python, Go, and virtually every modern language without a custom parser. Versioned API schemas and OpenAPI specs assume JSON as the default wire format.",
        "When data includes hierarchical relationships—orders with line items, users with addresses, products with variant arrays—JSON expresses those relationships without flattening or denormalizing. Arrays of uniform objects still convert cleanly to CSV when each object becomes one row, making JSON a good interchange format even when the final consumer is a spreadsheet.",
      ],
    },
    {
      id: "csv-strengths",
      heading: "When CSV is the better fit",
      paragraphs: [
        "Spreadsheets, BI dashboards, email attachments, and legacy import wizards expect flat row-column data. CSV opens natively in Excel, Google Sheets, and Numbers without plugins. Non-technical stakeholders can filter, sort, pivot, and chart immediately.",
        "CSV files are typically smaller than equivalent pretty-printed JSON for tabular datasets because there is no repeated key overhead per row. Bulk data exports for finance, HR, and operations still default to CSV because the format is decades-old, universally recognized, and easy to audit row by row.",
      ],
      linkedToolIds: ["json-to-csv"],
    },
    {
      id: "comparison",
      heading: "Side-by-side comparison",
      paragraphs: [
        "JSON supports nesting, arrays, booleans, and null; CSV is strictly two-dimensional with string cell values. JSON requires a parser; CSV requires delimiter and encoding rules (comma vs semicolon, UTF-8 vs Latin-1). JSON handles schema evolution with new optional keys; CSV handles schema evolution by adding columns, which breaks importers expecting fixed positions.",
        "Round-tripping is asymmetric: CSV to JSON to CSV may reorder columns or lose type information (numbers become strings, dates become ambiguous text). JSON to CSV to JSON loses nesting unless you define explicit reconstruction rules. Plan conversions as one-way exports unless you invest in a documented mapping layer.",
      ],
    },
    {
      id: "excel-angle",
      heading: "The Excel import angle",
      paragraphs: [
        "Opening CSV by double-clicking in Excel often breaks leading zeros on ZIP codes, converts long numeric IDs to scientific notation, and misinterprets date strings based on regional settings. Import via Data > From Text/CSV lets you assign column types explicitly—treat ID columns as text, dates as dates, and amounts as numbers.",
        "UTF-8 CSV with BOM improves Excel compatibility for international characters on Windows. When JSON includes accented names or currency symbols, verify the converted CSV retains encoding after save. For large JSON arrays, convert to CSV in chunks or filter columns before export to stay under Excel row limits (1,048,576 rows). Nested arrays should be flattened first; otherwise Excel receives unusable JSON fragments in single cells. Save a import macro or Power Query template so monthly exports repeat the same column typing.",
      ],
      linkedToolIds: ["json-to-csv", "nested-json-to-csv", "csv-to-html-table"],
    },
    {
      id: "conversion-guidance",
      heading: "Practical conversion guidance",
      paragraphs: [
        "Before converting JSON to CSV, inspect the payload shape. Arrays of objects convert directly; nested objects need flattening with dot notation or custom column mapping. Decide how to handle null values (empty cells vs literal \"null\" text) and boolean fields (TRUE/FALSE vs 1/0) and document the convention for downstream users.",
        "For recurring pipelines, store a column mapping template rather than re-converting ad hoc. When CSV must become JSON—for example, uploading spreadsheet edits back to an API—group rows into objects using a primary key column and parse typed fields before building the JSON payload. Validate the reconstructed JSON against your API schema before POSTing.",
      ],
      linkedToolIds: ["json-to-csv", "csv-to-json", "nested-json-to-csv"],
    },
    {
      id: "governance",
      heading: "Data governance at the format boundary",
      paragraphs: [
        "Document who owns the canonical format for each dataset. Engineering may treat JSON as source of truth while finance treats CSV exports as official reporting snapshots. Version column sets in CSV exports the same way you version API schemas—adding a column is a breaking change for macros and pivot templates that reference fixed positions.",
        "Audit trails often require knowing which conversion step dropped nested fields. Keep a changelog when flattening rules change so year-over-year spreadsheet comparisons remain explainable to compliance reviewers. When in doubt, archive the original JSON alongside the CSV derivative rather than replacing it. Stakeholders trust exports more when the transformation rules are written down.",
      ],
    },
  ],
  examples: [
    {
      title: "Export API results to Excel",
      description:
        "Fetch a JSON array of 5,000 orders from a REST endpoint, flatten nested customer objects, convert to UTF-8 CSV with comma delimiter, then import into Excel via From Text/CSV with order_id column typed as text to preserve leading zeros. Save the import settings as a reusable connection for weekly refreshes.",
    },
    {
      title: "Finance handoff from engineering",
      description:
        "Engineering delivers daily JSON webhook logs; finance needs monthly expense totals. A script extracts the charges array, converts to CSV, and finance pivots on category and date columns without touching raw JSON. Document which JSON path maps to each CSV column on the finance wiki.",
    },
    {
      title: "When CSV back to JSON fails",
      description:
        "A spreadsheet edit adds a new column mid-year. Re-importing CSV to JSON without schema validation sends unexpected keys to the API, causing 422 validation errors—document column contracts before round-tripping. Version the CSV template filename when columns change.",
    },
  ],
  commonMistakes: [
    "Opening CSV in Excel without checking date, number, and leading-zero formatting—silent corruption follows.",
    "Assuming nested arrays become multiple columns automatically without flattening or expansion rules.",
    "Choosing CSV for API-to-API integration where nested structure and types matter.",
    "Using semicolon delimiters for US Excel users or comma delimiters in European locales without testing import settings.",
    "Expecting lossless round-trip conversion between JSON and CSV without explicit schema and type mapping.",
    "Shipping CSV exports without documenting delimiter, encoding, and date format assumptions for international offices.",
  ],
};

export const flatteningNestedJsonResource: ResourceDefinition = {
  slug: "flattening-nested-json-for-csv",
  categorySlug: "developer-tools",
  title: "Flattening Nested JSON for CSV",
  summary:
    "Nested JSON must be flattened to dot-notation or similar columns before most CSV and Excel workflows.",
  metaTitle: "Flattening Nested JSON for CSV Export",
  metaDescription:
    "Learn how nested objects and arrays become CSV columns, with examples and links to nested JSON converters.",
  keywords: ["flatten json", "nested json to csv", "json flatten csv", "dot notation json"],
  quickAnswer:
    "Flattening turns nested keys like user.address.city into flat column names (user.address.city or user_address_city). Arrays may become indexed columns, multiple rows, or stringified cells depending on your converter settings and reporting grain.",
  intro:
    "CSV has no native concept of nesting. When JSON includes embedded objects, arrays of objects, or mixed structures, flattening defines how those values appear as columns—critical before spreadsheet import, BI ingestion, or email-friendly exports. This guide explains dot-notation conventions, array expansion strategies, and the edge cases that produce wide sparse spreadsheets or duplicated rows. Flattening is not a universal algorithm: the same JSON can become one row, many rows, or hundreds of columns depending on business rules you choose upfront with stakeholders.",
  primaryToolId: "nested-json-to-csv",
  relatedToolIds: ["json-to-csv", "json-formatter"],
  relatedResourceSlugs: ["what-is-json", "json-vs-csv-for-data-exchange"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "dot-notation",
      heading: "Dot notation columns",
      paragraphs: [
        "The most common flattening strategy joins nested object keys with dots: { \"user\": { \"name\": \"Sam\", \"role\": \"admin\" } } becomes columns user.name and user.role with values Sam and admin. Some tools use underscores (user_name) or brackets (user[name]); pick one convention and keep it consistent across exports so Excel formulas and pivot tables remain stable.",
        "Deep nesting—customer.address.geo.lat—can produce hundreds of columns when API schemas evolve. Preview column names before importing large files; wide CSVs with sparse data are hard to navigate in Excel and may exceed column limits in older tools. Consider projecting only the fields your report needs rather than flattening entire documents blindly. Document the projection list alongside the export job so the next analyst reproduces the same columns.",
      ],
      linkedToolIds: ["nested-json-to-csv"],
    },
    {
      id: "arrays",
      heading: "Handling arrays in flattened output",
      paragraphs: [
        "Arrays of primitives often stringify into a single cell—[\"red\",\"blue\"] becomes the text [\"red\",\"blue\"] or red;blue depending on converter settings. Arrays of objects may expand to indexed columns (items.0.name, items.1.name), generate multiple CSV rows (one row per array element, duplicating parent fields), or require normalization into a separate related table.",
        "Highly variable arrays—where each element has different keys—produce sparse CSV with many empty cells. An orders array where some line items include discount fields and others do not yields columns that are mostly blank. For analytics, normalizing into two CSV files (orders.csv and line_items.csv) linked by order_id is often cleaner than one impossibly wide sheet. Decide row grain before export: one row per order, per line item, or per shipment event.",
      ],
      linkedToolIds: ["nested-json-to-csv", "json-to-csv"],
    },
    {
      id: "strategies",
      heading: "Flattening strategies by use case",
      paragraphs: [
        "Reporting dashboards usually want one row per entity (one row per order, one row per user). Choose row-expansion when child arrays represent repeatable sub-records—line items, event logs, survey responses. Choose single-row flattening with indexed columns when array length is bounded and small (three phone numbers max).",
        "Data warehouse loads often prefer JSON columns preserved in a lake and flattened in SQL with LATERAL FLATTEN or equivalent. For ad hoc Excel exports, browser-based flattening tools provide immediate preview without standing up ETL infrastructure. Match the strategy to how the consumer will filter and aggregate. When in doubt, ask whether the spreadsheet user expects one row per parent or one row per child event.",
      ],
    },
    {
      id: "edge-cases",
      heading: "Edge cases and data quality",
      paragraphs: [
        "Null and missing keys behave differently: null may become an empty cell while a missing key omits the column entirely for that row. Mixed types in the same logical field—sometimes a string, sometimes a number—break pivot tables and SUM formulas after export.",
        "Unicode, emoji, and newline characters inside string values require UTF-8 encoding and proper CSV quoting. Embedded commas and quotes in flattened values must be escaped per RFC 4180 or Excel misaligns columns. Always spot-check rows with special characters before sharing exports company-wide.",
      ],
      linkedToolIds: ["json-formatter", "nested-json-to-csv"],
    },
    {
      id: "round-trip",
      heading: "Flattening and reconstruction",
      paragraphs: [
        "Flattening is inherently lossy regarding structure unless you store enough metadata to rebuild nesting. CSV to JSON tools can infer object hierarchy from dot-notation column names, but array reconstruction requires consistent indexing (items.0, items.1) or separate files.",
        "Do not expect CSV→JSON→CSV round trips to preserve original nesting without explicit structure rules documented alongside the export. For editable workflows, define a canonical flat schema and treat nested JSON as the system-of-record format, with CSV as a derived view.",
      ],
      linkedToolIds: ["csv-to-json", "nested-json-to-csv"],
    },
    {
      id: "tooling",
      heading: "Choosing flattening tools and settings",
      paragraphs: [
        "Browser-based nested JSON converters excel at ad hoc exports with live column preview—ideal for product managers validating API samples. Scriptable CLI flatteners (jq, custom Node scripts) fit CI pipelines that emit nightly CSV snapshots. Pick tools that expose array expansion mode explicitly rather than guessing defaults.",
        "Before sharing flattened CSV company-wide, strip internal-only fields (internal_ids, cost_basis, PII) at flatten time. Wide exports make accidental oversharing easy because obscure nested keys become visible columns. Column allow-lists beat deny-lists when exporting customer data. Review a 50-row sample with legal or compliance before scheduling automated nightly flatten jobs.",
      ],
      linkedToolIds: ["nested-json-to-csv", "json-formatter"],
    },
  ],
  examples: [
    {
      title: "Order with line items (row expansion)",
      description:
        "An order object with nested customer and an items array flattens to three CSV rows—one per line item—each repeating order_id and customer.email while varying product_name and quantity columns. Finance can sum quantity by SKU; support can filter by order_id without parsing JSON.",
    },
    {
      title: "User profile with dot notation",
      description:
        '{ "user": { "name": "Sam", "address": { "city": "Portland", "zip": "97201" } } } becomes columns user.name, user.address.city, and user.address.zip on a single row. CRM imports often expect this flat shape rather than nested JSON columns.',
    },
    {
      title: "Variable-length tags array",
      description:
        "A product with tags [\"sale\", \"featured\"] becomes either a tags column with stringified array text or tags.0 and tags.1 columns; products with no tags leave those cells empty, creating sparsity in wide exports. Merchandising teams may prefer semicolon-delimited tags in one cell for simpler filters.",
    },
  ],
  commonMistakes: [
    "Expecting round-trip CSV→JSON→CSV to preserve original nesting without explicit structure rules.",
    "Ignoring UTF-8 encoding when flattened data includes international characters or emoji.",
    "Flattening entire API envelopes including meta and links objects, cluttering the spreadsheet with irrelevant columns.",
    "Choosing indexed columns for unbounded arrays (hundreds of items), producing unusably wide CSV files.",
    "Duplicating parent row data without a stable primary key column, making it impossible to recombine or deduplicate later.",
    "Flattening personally identifiable nested fields into wide exports without redacting columns not needed by the recipient.",
  ],
};

export const acresToSquareFeetResource: ResourceDefinition = {
  slug: "how-many-square-feet-are-in-an-acre",
  categorySlug: "unit-converters",
  title: "How Many Square Feet Are in an Acre?",
  summary:
    "One US survey acre equals exactly 43,560 square feet—a fixed conversion factor used in real estate and land measurement.",
  metaTitle: "How Many Square Feet in an Acre? (43,560)",
  metaDescription:
    "Learn the acre to square feet formula, where 43,560 comes from, and examples for lot size and land comparisons.",
  keywords: [
    "square feet in an acre",
    "acre to square feet",
    "43560 square feet",
    "how many sq ft in acre",
  ],
  quickAnswer:
    "There are 43,560 square feet in one acre. Multiply acres by 43,560 to get square feet, or divide square feet by 43,560 to get acres.",
  intro:
    "Real estate listings mix acres and square feet depending on parcel size, region, and broker convention. Rural land and agricultural parcels are quoted in acres; suburban lots, commercial pads, and building footprints appear in square feet. Knowing the fixed conversion factor—43,560 square feet per US survey acre—helps you compare listings, compute price per square foot on land, and sanity-check survey documents before closing.",
  primaryToolId: "acres-to-square-feet",
  relatedToolIds: ["square-feet-to-acres", "price-per-square-foot"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "formula",
      heading: "The conversion formula",
      paragraphs: [
        "square feet = acres × 43,560. To convert in the opposite direction: acres = square feet ÷ 43,560. The relationship is exact for US survey acres used in virtually all American real estate transactions—there is no rounding factor to memorize beyond 43,560.",
        "The number originates from the historical US survey acre defined as an area one chain wide by one furlong long: 66 feet × 660 feet = 43,560 square feet. Modern GPS and GIS systems still report land area in acres or square feet derived from this definition, so the factor remains relevant even though few buyers think in chains and furlongs today.",
        "Memorizing 43,560 avoids dependency on online calculators in the field when comparing parcel maps at a showing. Surveyors and county GIS portals may display acres to four decimal places; convert using the exact factor before rounding for back-of-envelope offers.",
      ],
      linkedToolIds: ["acres-to-square-feet", "square-feet-to-acres"],
    },
    {
      id: "origin",
      heading: "Where 43,560 comes from",
      paragraphs: [
        "Colonial American surveying standardized the Gunter's chain at 66 feet. A furlong—one eighth of a mile—measures 660 feet. Multiplying those dimensions yields one acre. The acre was a practical field unit long before decimal metrics, and the US kept the survey acre for property records even as scientific work adopted SI units.",
        "International acre variants exist (UK statute acre is the same 43,560 square feet), but US listings and county assessor records use the US survey acre. Unless you are working with historical foreign documents, 43,560 is the number to use for domestic land math.",
      ],
    },
    {
      id: "use-cases",
      heading: "Real estate use cases",
      paragraphs: [
        "Compare a 0.35-acre suburban lot to a 12,000 sq ft commercial pad by converting both to the same unit. A 0.35-acre lot equals 15,246 square feet—larger than the commercial pad once you see the numbers aligned. Price per square foot on land divides sale price by converted square footage to benchmark against comps.",
        "Zoning setbacks, floor-area ratio (FAR) calculations, and agricultural lease rates often appear in different units. Converting acres to square feet before applying FAR lets you compare buildable area against lot coverage limits. Hunters, farmers, and rural buyers think in acres; urban investors think in square feet—translation prevents mispriced offers.",
      ],
      linkedToolIds: ["price-per-square-foot", "acres-to-square-feet"],
    },
    {
      id: "land-vs-living",
      heading: "Land area vs living area",
      paragraphs: [
        "Listing sheets distinguish lot size (land acreage or square feet) from living area (interior heated square footage). Converting a 2-acre parcel to 87,120 square feet tells you nothing about how large the house is—those are separate lines on the MLS. Do not use acre conversion to estimate interior room sizes.",
        "Topography matters for usable land: a 1-acre hillside lot may have less buildable pad area than a flat 0.75-acre parcel. Square footage and acre conversions measure horizontal projection, not usable grade. Always cross-check survey plats and zoning maps for buildable envelope, not just raw acreage. Wetlands, easements, and flood zones can remove buildable square feet without changing deed acreage on the listing header.",
      ],
    },
    {
      id: "quick-reference",
      heading: "Quick reference conversions",
      paragraphs: [
        "Memorize a few anchors: 0.25 acre = 10,890 sq ft; 0.5 acre = 21,780 sq ft; 1 acre = 43,560 sq ft; 2 acres = 87,120 sq ft; 5 acres = 217,800 sq ft. These benchmarks help you eyeball listing descriptions without a calculator.",
        "For fractional acres, multiply the decimal by 43,560. For large square-foot parcels heading toward acre labels—50,000 sq ft ÷ 43,560 ≈ 1.15 acres—division clarifies whether the broker rounded down to \"about an acre\" in marketing copy.",
      ],
      linkedToolIds: ["acres-to-square-feet", "square-feet-to-acres"],
    },
    {
      id: "density-planning",
      heading: "Density, zoning, and development math",
      paragraphs: [
        "Municipal zoning codes express maximum density in units per acre, minimum lot sizes in square feet, or floor-area ratio relative to lot square footage. Converting the underlying land measurement to square feet lets you apply FAR limits: a 0.8-acre parcel equals 34,848 sq ft; at 0.5 FAR you may build roughly 17,424 sq ft of gross floor area subject to setbacks.",
        "Developers comparing assemblages often add square feet from multiple parcels before converting total to acres for entitlement discussions. Always reconcile GIS acreage with recorded deed acreage—county assessor GIS polygons occasionally disagree with legal descriptions by one to three percent, enough to matter on large commercial sites.",
      ],
      linkedToolIds: ["price-per-square-foot", "acres-to-square-feet"],
    },
  ],
  examples: [
    {
      title: "Half-acre lot",
      description: "0.5 acres × 43,560 = 21,780 square feet. A listing describing \"just over half an acre\" should be near 22,000 sq ft; verify if marketing copy inflates size. Compare to local zoning minimum lot requirements expressed in square feet.",
    },
    {
      title: "10,000 sq ft to acres",
      description: "10,000 ÷ 43,560 ≈ 0.23 acres. Useful when comparing an urban infill parcel quoted in square feet to suburban comps quoted in acres. Subdivision feasibility often keys off minimum acreage thresholds.",
    },
    {
      title: "Price per square foot on land",
      description:
        "A 3-acre parcel listed at $450,000 equals 130,680 sq ft. Price per square foot ≈ $3.44, allowing comparison to a 15,000 sq ft lot at $75,000 ($5.00/sq ft) despite different units in the original listings. Adjust for road frontage and utility access before relying on price per square foot alone.",
    },
  ],
  commonMistakes: [
    "Using 43,560 for international acre variants without checking local definitions—rare in US listings but relevant for foreign property research.",
    "Confusing square feet of land with square feet of living area—they measure different things on an MLS sheet.",
    "Rounding early in multi-step calculations, then compounding error when computing price per square foot or FAR buildable area.",
    "Assuming \"acre\" on a listing includes non-contiguous easements or water rights without reading the survey plat.",
    "Forgetting that irregular lot shapes may have the same acreage as a rectangle but very different usable dimensions and frontage.",
  ],
};

export const whatIsCapRateResource: ResourceDefinition = {
  slug: "what-is-cap-rate",
  categorySlug: "real-estate-calculators",
  title: "What Is Cap Rate?",
  summary:
    "Cap rate (capitalization rate) is net operating income divided by property value—an unlevered yield metric for comparing deals.",
  metaTitle: "What Is Cap Rate? Capitalization Rate Explained",
  metaDescription:
    "Learn the cap rate formula, how NOI fits in, and how investors use cap rate to compare rental properties.",
  keywords: ["what is cap rate", "capitalization rate", "cap rate formula", "cap rate real estate"],
  quickAnswer:
    "Cap rate = net operating income (NOI) ÷ property value, expressed as a percentage. It shows annual operating return relative to price before financing.",
  intro:
    "Cap rate is one of the fastest metrics income-property investors use to compare deals in the same market. It expresses net operating income as a percentage of property value, ignoring debt, depreciation, and personal tax situations. Understanding cap rate—and how it differs from cash-on-cash return—helps you screen listings, sanity-check broker OM projections, and communicate with lenders who underwrite on NOI. Treat marketed cap rates as opening arguments, not conclusions.",
  primaryToolId: "cap-rate-calculator",
  relatedToolIds: ["noi-calculator", "grm-calculator", "rental-deal-analyzer"],
  relatedResourceSlugs: ["what-is-noi"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "formula",
      heading: "Cap rate formula",
      paragraphs: [
        "Cap rate = NOI ÷ property value. Express the result as a percentage by multiplying by 100. Example: NOI $50,000 and value $625,000 → cap rate 8.0%. If you know desired cap rate and NOI, implied value = NOI ÷ cap rate—useful for back-of-envelope offer pricing.",
        "NOI is gross rental income minus operating expenses, before mortgage payments, capital expenditures, and income taxes. The value denominator is typically purchase price or current market value, not original cost basis. Stabilized NOI—after normalized vacancy and management assumptions—is standard for comparison; pro forma NOI from a broker OM may inflate income or understate expenses.",
      ],
      linkedToolIds: ["cap-rate-calculator", "noi-calculator"],
    },
    {
      id: "noi-tie-in",
      heading: "How NOI drives cap rate",
      paragraphs: [
        "Cap rate is only as reliable as the NOI input. Overstated rent roll, omitted vacancy, or missing management fees inflates NOI and artificially lowers cap rate, making a deal look better than operational reality. Conservative investors recalculate NOI with their own vacancy factor (often 5–10% for multifamily) and expense line items before trusting marketed cap rates.",
        "NOI excludes debt service, so cap rate measures unlevered property performance. Two investors buying the same building at the same price calculate identical cap rates regardless of financing. Their cash-on-cash returns will differ based on down payment, interest rate, and amortization—cap rate will not capture that divergence.",
      ],
      linkedToolIds: ["noi-calculator", "cap-rate-calculator"],
    },
    {
      id: "vs-cash-on-cash",
      heading: "Cap rate vs cash-on-cash return",
      paragraphs: [
        "Cash-on-cash return = annual pre-tax cash flow after debt service ÷ total cash invested (down payment plus closing costs). A property with 6% cap rate might yield 10% cash-on-cash with favorable leverage—or negative cash flow with aggressive financing despite a respectable cap rate.",
        "Use cap rate to compare unlevered asset pricing across markets and property types at a high level. Use cash-on-cash when evaluating whether your specific financing structure produces acceptable wallet returns. The rental deal analyzer combines both perspectives with loan terms, reserves, and closing costs for a complete picture. A deal can screen well on cap rate yet fail your cash-on-cash hurdle if the lender requires heavy down payment or charges above-market interest.",
      ],
      linkedToolIds: ["rental-deal-analyzer", "cap-rate-calculator"],
    },
    {
      id: "interpretation",
      heading: "How investors interpret cap rate",
      paragraphs: [
        "Higher cap rates generally indicate higher perceived risk, lower growth expectations, or less desirable locations. Lower cap rates often reflect stable cash flow, strong tenant demand, and institutional competition for core assets. There is no universal \"good\" cap rate—multifamily in a growing secondary city might trade at 5.5–6.5% while rural retail sits at 8–10%.",
        "Compare cap rates among similar assets: same property type, similar age and condition, same submarket. A Class B office cap rate means little next to a Class A multifamily cap rate. Use GRM (gross rent multiplier) when expense data is thin; graduate to cap rate once you can underwrite NOI with confidence.",
      ],
      linkedToolIds: ["grm-calculator", "rental-deal-analyzer"],
    },
    {
      id: "worked-example",
      heading: "Worked example",
      paragraphs: [
        "Consider a four-unit building asking $480,000. Gross scheduled rent $48,000/year. Vacancy and credit loss 5% ($2,400). Effective gross income $45,600. Operating expenses: taxes $4,800, insurance $2,400, maintenance $3,600, management 8% of EGI ($3,648), utilities $1,200—total $15,648. NOI = $45,600 − $15,648 = $29,952.",
        "Cap rate = $29,952 ÷ $480,000 = 6.24%. If comparable sales in the neighborhood cluster around 7%, the asking price may be aggressive unless rents are below market and you can raise income post-close. If your lender requires 1.25 DSCR on a $320,000 loan at 7% interest, debt service might consume most of NOI—cap rate alone would not reveal tight cash flow, which is why layered analysis matters.",
      ],
      linkedToolIds: ["cap-rate-calculator", "noi-calculator", "dscr-calculator"],
    },
    {
      id: "market-context",
      heading: "Market context and limitations",
      paragraphs: [
        "Cap rate compresses (falls) in markets where investors expect rent growth, limited supply, or institutional demand—think core multifamily in supply-constrained cities. Cap rate expands when perceived risk rises: deferred maintenance, expiring leases below market, or declining population trends. Track trailing cap rates from actual sales, not just broker pro formas, using CoStar, Reonomy, or local broker market reports.",
        "Cap rate ignores hold period, tax benefits, renovation upside, and time value of money. Internal rate of return (IRR) and equity multiple require multi-year cash flow projections. Use cap rate as a first-pass filter, then underwrite full returns before making offers on assets above your target threshold.",
      ],
      linkedToolIds: ["cap-rate-calculator", "rental-deal-analyzer"],
    },
  ],
  examples: [
    {
      title: "Small multifamily screening",
      description:
        "Estimate NOI from rent roll minus taxes, insurance, maintenance, and 8% management, then divide by asking price to compare two four-unit listings in the same zip code. Recompute cap rate after adjusting rents to market on below-market leases.",
    },
    {
      title: "Implied value from target cap rate",
      description:
        "Stabilized NOI $72,000. Target 7% cap rate for the submarket. Implied value = $72,000 ÷ 0.07 ≈ $1,028,571—use as an offer anchor before adjustments for deferred maintenance. If cap rates compress to 6.5%, the same NOI supports a higher price.",
    },
    {
      title: "Cap rate vs leveraged returns",
      description:
        "Same property: 6.5% cap rate unlevered, but 12% cash-on-cash with 25% down and favorable seller financing—shows why investors with cheap debt pursue lower cap rate assets. Always layer DSCR when leverage is part of the thesis.",
    },
  ],
  commonMistakes: [
    "Including mortgage principal or interest in expenses when calculating NOI—debt service is below the NOI line.",
    "Treating cap rate as cash-on-cash return—financing changes cash returns but not cap rate.",
    "Comparing cap rates across very different property types, markets, or asset conditions without context.",
    "Using gross rent instead of effective gross income, overstating NOI and understating cap rate risk.",
    "Ignoring capital expenditure reserves in NOI while celebrating a cap rate that will erode when the roof or HVAC needs replacement.",
  ],
};

export const whatIsNoiResource: ResourceDefinition = {
  slug: "what-is-noi",
  categorySlug: "real-estate-calculators",
  title: "What Is NOI in Real Estate?",
  summary:
    "Net operating income (NOI) is rental income minus operating expenses—before debt service, income taxes, and capital expenditures.",
  metaTitle: "What Is NOI? Net Operating Income Explained",
  metaDescription:
    "Learn how to calculate NOI, what expenses to include, and how NOI feeds cap rate and DSCR analysis.",
  keywords: ["what is noi", "net operating income", "noi real estate", "noi formula"],
  quickAnswer:
    "NOI = gross operating income − operating expenses. It measures property-level profitability before mortgage payments and personal income taxes, and feeds cap rate, DSCR, and lender underwriting models.",
  intro:
    "Net operating income (NOI) is the foundation metric for income-property analysis. Lenders, appraisers, and investors use NOI to derive cap rates, debt service coverage ratios, and valuation models. Getting NOI right means applying consistent vacancy assumptions, including all recurring operating costs, and explicitly excluding financing and capital expenditures that belong below the NOI line. A five-percent error in expense assumptions on a million-dollar asset can swing cap rate by half a point—enough to overpay at acquisition or reject a viable deal that actually cash-flows.",
  primaryToolId: "noi-calculator",
  relatedToolIds: ["cap-rate-calculator", "dscr-calculator", "rental-deal-analyzer"],
  relatedResourceSlugs: ["what-is-cap-rate"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "calculation",
      heading: "The NOI calculation",
      paragraphs: [
        "Start with gross scheduled rent—the total rent if every unit were occupied at lease rates. Subtract vacancy and credit loss (uncollectible rent) to arrive at effective gross income (EGI). Some models also add other income: laundry, parking, pet fees, utility reimbursements, and late fees.",
        "Subtract operating expenses from EGI to get NOI. The formula is simple; the discipline is in consistent line items and conservative assumptions. NOI represents what the property earns from operations annually before the owner pays the bank or the IRS on rental activity. Document every assumption in your underwriting template so partners can reproduce the number.",
      ],
      linkedToolIds: ["noi-calculator"],
    },
    {
      id: "expense-checklist",
      heading: "Operating expense checklist",
      paragraphs: [
        "Include: property taxes, property insurance, repairs and maintenance, property management fees (even if self-managed—buyers will hire management), owner-paid utilities (water, sewer, trash, common-area electric), landscaping and snow removal, pest control, administrative costs, and replacement reserves for short-lived items (often 5–10% of EGI or a per-unit annual allowance).",
        "Do not include: mortgage principal and interest, personal income taxes, depreciation, amortization of loan points, or major capital improvements (new roof, full HVAC replacement, structural renovation). Those belong to cash flow after NOI, lender underwriting adjustments, or tax preparation—not to NOI itself. When reviewing seller spreadsheets, highlight any line labeled \"debt service,\" \"loan payment,\" or \"CapEx\" that was netted against income—those adjustments must be reversed to reach true NOI.",
      ],
      linkedToolIds: ["noi-calculator"],
    },
    {
      id: "capex-exclusion",
      heading: "Why capital expenditures are excluded",
      paragraphs: [
        "Capital expenditures (CapEx) improve or extend property life beyond routine maintenance—roof replacement, foundation work, full unit gut renovations. CapEx is lumpy and irregular; mixing it into NOI would make year-over-year comparisons meaningless and obscure operational performance.",
        "Investors often budget CapEx and replacement reserves separately after calculating NOI, then subtract annualized CapEx to approximate sustainable cash flow. Lenders may deduct additional reserves in underwriting even when historical NOI did not reflect them. Underwriting a deal with zero maintenance reserve because \"the seller handled everything\" sets up surprise costs post-close. A roof with five years of life remaining is not an operating expense today, but it is a liability you should model before closing.",
      ],
    },
    {
      id: "vacancy-and-management",
      heading: "Vacancy, management, and other income",
      paragraphs: [
        "Vacancy should reflect submarket reality, not the seller's best month. Stabilized multifamily often uses 5–10% vacancy plus credit loss; single-tenant NNN properties might use minimal vacancy until lease rollover approaches. Pro forma occupancy at 100% without justification is a red flag in broker offering memorandums.",
        "Management fees are typically 8–10% of collected rent for residential assets, even if you self-manage today—a buyer will hire a manager. Other income streams should be documented and sustainable; one-time laundry machine sale proceeds are not recurring NOI contributors. Lenders may stress-test vacancy higher than your pro forma when underwriting volatile markets.",
      ],
      linkedToolIds: ["noi-calculator", "rental-deal-analyzer"],
    },
    {
      id: "downstream",
      heading: "Where NOI is used next",
      paragraphs: [
        "Divide NOI by property value to get cap rate for asset comparison. Divide NOI by annual debt service to get debt service coverage ratio (DSCR)—lenders often require 1.20–1.25 minimum for commercial loans. Appraisers apply capitalization rates to stabilized NOI in the income approach to value.",
        "Layer financing, taxes, and CapEx in the rental deal analyzer to move from NOI to actual investor cash flow. NOI is the middle of the story—not the beginning (gross rent) and not the end (wallet return after debt and taxes). Underwrite NOI on trailing twelve months plus forward adjustments when leases roll within your hold period.",
      ],
      linkedToolIds: ["cap-rate-calculator", "dscr-calculator", "rental-deal-analyzer"],
    },
    {
      id: "noi-vs-cashflow",
      heading: "From NOI to investor cash flow",
      paragraphs: [
        "After NOI, subtract annual debt service to approximate before-tax cash flow. Subtract capital expenditures and major repairs funded from operations to approximate sustainable cash. Personal income taxes depend on depreciation schedules, investor entity structure, and passive loss rules—outside standard NOI but critical for after-tax returns.",
        "Seller-provided financials sometimes label \"NOI\" while quietly excluding reserves or management. Rebuild the expense stack line by line and compare to industry benchmarks (often quoted as expense ratio: operating expenses ÷ EGI). Multifamily expense ratios of 35–45% are common; lower ratios deserve scrutiny, not automatic celebration.",
      ],
      linkedToolIds: ["noi-calculator", "rental-deal-analyzer", "dscr-calculator"],
    },
  ],
  examples: [
    {
      title: "Four-unit rental",
      description:
        "Gross rent $48,000, vacancy 5% ($2,400), EGI $45,600. Expenses: taxes $4,800, insurance $2,400, maintenance $3,600, management $3,648, utilities $1,200—total $15,648. NOI = $29,952. Cap rate at a $400,000 ask would be 7.5% before financing.",
    },
    {
      title: "NNN retail strip",
      description:
        "Tenants pay taxes and insurance under triple-net leases. Gross rent $120,000, minimal vacancy, owner expenses limited to management and common-area maintenance $6,000. NOI ≈ $114,000 before debt—CapEx for parking lot repaving budgeted separately in year-three cash flow.",
    },
    {
      title: "Value-add miscalculation",
      description:
        "Buyer projects NOI using pro forma rents after renovation but uses current expenses without increased taxes, insurance, or management on higher rent roll—overstates NOI until operating costs catch up. Rebuild expenses at stabilized rent levels before quoting NOI to partners.",
    },
  ],
  commonMistakes: [
    "Using gross rent without vacancy and credit loss adjustment—NOI looks higher than stabilized reality.",
    "Omitting management fees on self-managed properties that a future buyer or lender will underwrite with professional management.",
    "Subtracting mortgage interest from income before NOI—debt service is explicitly below the NOI line.",
    "Treating major CapEx (roof, HVAC) as routine maintenance expense, distorting year-over-year NOI comparisons.",
    "Including one-time other income (insurance claim payout, sale of equipment) as recurring NOI.",
    "Using seller-reported expense ratios from a different property type as a shortcut instead of building your own expense stack.",
    "Confusing pro forma NOI after renovations with in-place NOI on the rent roll today—lenders price off in-place or near-term stabilized numbers.",
  ],
};

export const clientSidePdfResource: ResourceDefinition = {
  slug: "why-client-side-pdf-tools-keep-files-private",
  categorySlug: "document-tools",
  title: "Why Client-Side PDF Tools Keep Files Private",
  summary:
    "Browser-based PDF merge and split processes files locally in your browser—nothing uploads to a server during the operation.",
  metaTitle: "Client-Side PDF Processing - Privacy Benefits",
  metaDescription:
    "Learn why in-browser PDF tools keep documents on your device and when local processing is preferable to cloud upload.",
  keywords: ["client side pdf", "pdf merge privacy", "browser pdf tools", "pdf split local"],
  quickAnswer:
    "Client-side PDF tools run entirely in your browser using JavaScript. Your files are not uploaded to ConvertMyStuff or third-party servers during merge, split, or similar operations—bytes stay in device memory until you download the result.",
  intro:
    "Contracts, medical records, financial statements, and legal exhibits often cannot leave your device due to policy, regulation, or client confidentiality. Cloud PDF converters require uploading files to remote infrastructure—even temporarily—which expands the attack surface and may violate HIPAA, GDPR, or firm IT policies. Client-side PDF tools process documents in browser memory and deliver downloads locally, keeping sensitive bytes off the network. Understanding when local processing fits—and where device memory and browser limits stop—helps teams adopt fast workflows without bypassing security review or helpdesk approval.",
  primaryToolId: "pdf-merge",
  relatedToolIds: ["pdf-split", "text-to-pdf"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "privacy",
      heading: "Privacy compared to cloud upload",
      paragraphs: [
        "Cloud PDF services receive your file on their servers, process it in their environment, and return a download link. Even with encryption in transit, the document exists on infrastructure you do not control—subject to their retention policy, subprocessors, and potential breach exposure. Browser-based tools read files from your device using the File API, manipulate them with in-page JavaScript libraries, and trigger a local download without a server round trip for the document bytes.",
        "ConvertMyStuff client-side PDF operations do not transmit file contents to our servers. Network requests may still occur for page assets (HTML, JavaScript, fonts), but your PDF bytes stay on your machine. You remain responsible for securing downloaded outputs on shared computers, clearing browser downloads, and following organizational data-handling policies. IT teams may still require VPN or managed browser profiles—local processing satisfies many policies but is not a substitute for enterprise DLP rules.",
      ],
      linkedToolIds: ["pdf-merge", "pdf-split"],
    },
    {
      id: "cloud-vs-local",
      heading: "Cloud vs local processing trade-offs",
      paragraphs: [
        "Cloud excels when files are huge, OCR or advanced compression requires server GPU/CPU farms, or teams need collaborative review with shared workspaces. Local excels when privacy is non-negotiable, internet bandwidth is limited, or you need instant offline-capable workflows after the page loads once.",
        "Hybrid awareness matters: some \"desktop\" apps phone home for licensing or updates while still processing locally—read privacy policies. Pure client-side web tools trade unlimited server compute for device RAM and CPU caps, which is the right bargain for merging a closing packet but wrong for OCR-scanning a 400-page scanned archive.",
      ],
    },
    {
      id: "limits",
      heading: "Practical limits of browser PDF processing",
      paragraphs: [
        "Very large PDFs (hundreds of megabytes), high page counts, or merging dozens of files may stress mobile browsers and low-memory laptops. Symptoms include tab crashes, slow progress, or failed downloads. Split oversized files into chunks, merge in batches, or use a desktop machine with ample RAM for complex jobs.",
        "Password-protected, corrupted, or non-standard PDFs may fail client-side parsing until unlocked or repaired. Scanned image-only PDFs merge fine but are not searchable until OCR—typically a server-side or dedicated desktop step. Client-side tools optimize for common merge, split, and text-to-PDF workflows, not enterprise print-room prepress. Close unused tabs before merging large files to free memory.",
      ],
      linkedToolIds: ["pdf-merge", "pdf-split"],
    },
    {
      id: "workflows",
      heading: "Common private PDF workflows",
      paragraphs: [
        "Closing packet assembly: merge signed contract, disclosures, and exhibits into one PDF for email—without uploading to a third-party converter. Exhibit extraction: split a 200-page deposition to share only relevant pages with counsel. Quick draft: convert meeting notes from text to PDF for distribution—all locally.",
        "Redaction reminder: merging or splitting does not redact visible text—redact in a proper editor before sharing. For regulated industries, combine client-side tools with encrypted disk storage, VPN policies, and approved browser lists from your IT department. Document the workflow in your internal wiki so new hires do not default to cloud upload tools.",
      ],
      linkedToolIds: ["pdf-merge", "pdf-split", "text-to-pdf"],
    },
    {
      id: "security-hygiene",
      heading: "Security hygiene after local processing",
      paragraphs: [
        "Local processing means the file is not encrypted at rest on your disk unless you encrypt separately. Clear browser cache on shared kiosks, use full-disk encryption on laptops, and delete temporary downloads from public Downloads folders.",
        "Verify you are on the legitimate site (HTTPS, correct domain) before processing sensitive documents—phishing clones of converter sites exist to harvest uploads on cloud tools. Client-side architecture reduces server-side leak risk but does not protect against malware on your device or shoulder surfing in open offices.",
      ],
    },
    {
      id: "compliance",
      heading: "Compliance and organizational policy",
      paragraphs: [
        "Healthcare, legal, and financial services firms often maintain approved software lists. Client-side browser tools may qualify where cloud upload tools do not, but legal review still applies—especially if third-party JavaScript libraries load from CDNs. Document which workflows are approved for PHI, PII, or attorney-client material.",
        "Retention policies still govern outputs: merging locally does not exempt you from records-management rules. Store merged PDFs in approved DMS systems with access controls. Audit logs on cloud storage remain important even when conversion never touched a server. Train staff to distinguish client-side processing from \"no compliance needed.\"",
      ],
    },
  ],
  examples: [
    {
      title: "Redact and share internally",
      description:
        "Split a contract to extract one exhibit, merge approved pages into a new PDF, and share via secure internal email—all without uploading the full original document to a cloud converter. Legal review confirms only the exhibit leaves the firm, not the entire agreement.",
    },
    {
      title: "HR onboarding packet",
      description:
        "Merge policy PDF, tax forms, and signed offer letter on an HR laptop bound by policy that prohibits employee PII upload to external SaaS tools. IT whitelists the client-side tool domain while blocking known cloud converters.",
    },
    {
      title: "Air-gapped-adjacent workflow",
      description:
        "Load the tool once on an approved machine, disconnect from network, merge PDFs offline in the browser tab already open—feasible when IT allows cached static assets. Outputs still require encryption if stored on shared drives.",
    },
  ],
  commonMistakes: [
    "Assuming local processing encrypts files at rest on your disk—it does not unless you encrypt separately.",
    "Merging password-protected PDFs without unlocking them first, causing silent failures or blank pages.",
    "Processing confidential documents on a cloud PDF site because it \"looks the same\" as a client-side tool—check whether uploads occur.",
    "Leaving merged outputs in a public Downloads folder on a shared computer after processing.",
    "Expecting client-side merge to OCR scanned pages or compress print-ready prepress files—wrong tool for those jobs.",
    "Processing confidential PDFs on public library or hotel computers without clearing downloads afterward.",
    "Assuming \"private processing\" means the merged PDF is redacted—visibility of text is unchanged unless you redact explicitly.",
  ],
};

export const concreteYardsResource: ResourceDefinition = {
  slug: "how-to-estimate-concrete-cubic-yards",
  categorySlug: "construction-calculators",
  title: "How to Estimate Concrete Cubic Yards",
  summary:
    "Convert slab and footing dimensions to cubic yards by computing volume in cubic feet, then dividing by 27 and adding waste.",
  metaTitle: "How to Estimate Concrete Cubic Yards",
  metaDescription:
    "Learn the cubic yard formula for slabs and footings, plus waste factors and links to a free concrete calculator.",
  keywords: [
    "concrete cubic yards",
    "estimate concrete",
    "yards of concrete",
    "concrete volume calculator",
  ],
  quickAnswer:
    "Volume (cu ft) = length × width × depth (all in feet). Cubic yards = cubic feet ÷ 27. Add 5–10% waste for spills, uneven subgrade, and pump line hold—then round up to supplier minimums.",
  intro:
    "Ready-mix concrete is ordered by the cubic yard in the United States. Pouring a slab, driveway, or footing requires converting length, width, and thickness into volume—and then into yards—for accurate dispatch tickets. Under-ordering stops the pour mid-slab; over-ordering wastes money on material that sets in the truck. This guide covers slab and footing formulas, unit conversion pitfalls, and waste factors contractors use in the field. Accurate yardage protects schedule, margin, and finish quality on every residential pad and commercial flatwork job you quote.",
  primaryToolId: "concrete-calculator",
  relatedToolIds: ["cement-calculator"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "slab-formula",
      heading: "Slab volume in cubic yards",
      paragraphs: [
        "Calculate volume in cubic feet first: length (ft) × width (ft) × depth (ft). Convert depth from inches by dividing by 12—a 4-inch slab is 0.333 feet thick. Example: 12 ft × 20 ft × 0.333 ft = 79.92 cu ft. Divide by 27 to get cubic yards: 79.92 ÷ 27 ≈ 2.96 yards.",
        "One cubic yard equals 27 cubic feet (3 ft × 3 ft × 3 ft)—a common mistake is dividing by 3 instead of 27. Round up slightly for dispatch; ready-mix suppliers prefer whole or half-yard increments depending on local practice and minimum load fees. Write depth as a decimal foot on your worksheet to avoid on-site math errors.",
      ],
      linkedToolIds: ["concrete-calculator"],
    },
    {
      id: "footings",
      heading: "Footings, stem walls, and irregular forms",
      paragraphs: [
        "Continuous footings: length × width × depth in feet, same as a slab strip. Example: 80 linear feet of footing 16 inches wide (1.333 ft) by 8 inches deep (0.667 ft) = 80 × 1.333 × 0.667 ≈ 71.1 cu ft ≈ 2.63 cubic yards.",
        "Column or pad footings: treat each as a small slab (length × width × depth), sum volumes, convert total cubic feet to yards. Irregular shapes divide into rectangles or use average width × length × depth for conservative estimates. Steps, porch landings, and garage aprons calculate as separate volumes then add.",
      ],
      linkedToolIds: ["concrete-calculator"],
    },
    {
      id: "waste",
      heading: "Waste, over-excavation, and pump loss",
      paragraphs: [
        "Field crews add 5–10% waste for subgrade variation, spillage, wheelbarrow residue, and form deflection. Soft or uneven subgrade may need 10% or more; laser-screed slabs on rigid base might use 5%. Complex forms with multiple elevation changes consume extra at transitions.",
        "Concrete pump lines hold material that does not always end up in the form—coordinate with the pump operator on line length and priming volume. Short loads often incur minimum delivery fees; bundling footings and slab on one pour can save dispatch cost if schedule allows. On your first pour with a new crew, track actual waste versus estimate and adjust the factor permanently in your spreadsheet template.",
      ],
    },
    {
      id: "units",
      heading: "Unit consistency and thickness standards",
      paragraphs: [
        "Never mix inches and feet without converting depth first. A 10×10 slab quoted as 10 × 10 × 4 without ÷12 on thickness over-estimates volume by twelvefold—a catastrophic order error.",
        "Residential driveways often specify 4 inches; garage slabs and commercial pads may require 5–6 inches per engineer spec. Confirm thickness on plans before ordering; rebar and fiber requirements affect mix design but not volume math. When plans call for thickened perimeter footings integrated with a slab-on-grade, calculate footing volume separately and add to the main slab total rather than guessing a lump-sum bump.",
        "For curved or circular pads, approximate with the longest rectangle that contains the form or divide into measurable segments. Conservative over-estimation on decorative patios beats a cold joint mid-pour because the second truck arrived two hours late.",
      ],
      linkedToolIds: ["concrete-calculator", "cement-calculator"],
    },
    {
      id: "ordering",
      heading: "Ordering and verification tips",
      paragraphs: [
        "Sketch the pour, label dimensions, calculate each section, sum cubic yards, then apply waste factor. Compare your total to a second method (online calculator or supplier quote app) before calling the dispatch desk.",
        "On pour day, track ticket yards delivered versus estimated. Over time you calibrate personal waste factors for your crew and soil conditions. Keep records—repeat clients benefit from historical accuracy on similar footprints. Note whether the supplier charged for unused return concrete on short loads.",
      ],
      linkedToolIds: ["concrete-calculator"],
    },
    {
      id: "mix-and-delivery",
      heading: "Mix design, reinforcement, and delivery logistics",
      paragraphs: [
        "Volume math is independent of PSI rating, fiber additive, or accelerator—but supplier tickets specify mix design separately. Rebar and wire mesh do not change yardage; thickened edges and monolithic footings do. Coordinate pour sequence with pump truck reach and chute access before finalizing yard count on tight urban lots.",
        "Hot weather accelerates set time; cold weather may require heated materials or blankets—logistics, not volume. Schedule trucks with five to ten minute spacing on large pours so finishers keep pace. Returning concrete on a short load still costs money; accurate yardage protects margin on fixed-bid flatwork contracts. Confirm pump reach and chute access on tight urban lots and repeat estimated yards on the purchase order, sketch, and dispatch call.",
      ],
      linkedToolIds: ["concrete-calculator", "cement-calculator"],
    },
  ],
  examples: [
    {
      title: "10×10 patio at 4 inches",
      description: "10 × 10 × 0.333 = 33.3 cu ft → 33.3 ÷ 27 ≈ 1.23 cubic yards. With 10% waste, order ≈ 1.35 yards—round to 1.5 per supplier minimums. Confirm whether the quote includes environmental or fuel surcharges separate from yardage.",
    },
    {
      title: "Driveway 20×24 at 4 inches",
      description: "20 × 24 × 0.333 = 159.84 cu ft → 5.92 yards. Add 7% waste ≈ 6.34 yards; practical order 6.5 yards depending on truck size. Schedule finishers before confirming dispatch to avoid idle truck clock charges.",
    },
    {
      title: "Combined footing and slab",
      description:
        "Footing 2.6 yards plus slab 2.96 yards = 5.56 yards subtotal. With 8% waste ≈ 6.0 yards on one dispatch ticket for a monolithic pour. Sketch each segment on the quote request so the dispatcher confirms one continuous pour.",
    },
  ],
  commonMistakes: [
    "Mixing inches and feet without converting depth to feet first—the most expensive arithmetic error in concrete ordering.",
    "Dividing cubic feet by 3 instead of 27, under-ordering by a factor of nine.",
    "Ignoring waste factor on first pour of a season, then scrambling for a short-load delivery mid-slab.",
    "Using plan thickness from garage slab spec on a patio section with different engineering requirements.",
    "Forgetting to add volume for thickened edges, monolithic footings, or interior equipment pads beyond the main rectangle.",
    "Ordering solely from plan dimensions without field-measuring as-built forms that gained or lost inches during layout.",
    "Quoting cubic yards to the homeowner without stating that delivery minimums may round a 1.2-yard pour to 2 yards on the ticket.",
  ],
};

export const utmParametersResource: ResourceDefinition = {
  slug: "what-are-utm-parameters",
  categorySlug: "marketing-tools",
  title: "What Are UTM Parameters?",
  summary:
    "UTM tags are query-string labels (utm_source, utm_medium, utm_campaign, utm_term, utm_content) that tell GA4 and other analytics which campaign, creative, and channel drove each visit.",
  metaTitle: "What Are UTM Parameters? GA4 Campaign Tracking Guide",
  metaDescription:
    "Learn UTM parameter names, how to build campaign URLs, GA4 attribution, and common tagging mistakes—with links to UTM tools.",
  keywords: ["utm parameters", "utm tags", "campaign url", "utm_source utm_medium", "ga4 utm", "utm naming conventions"],
  quickAnswer:
    "UTM parameters are added to URLs as query strings—typically utm_source, utm_medium, utm_campaign, and optionally utm_term and utm_content—so analytics tools attribute traffic to specific campaigns. Consistent lowercase naming and a team style guide prevent duplicate rows and make GA4 acquisition reports trustworthy.",
  intro:
    "Without UTM tags, traffic from email newsletters, paid social ads, partner sites, and QR codes often collapses into generic referral or direct buckets in analytics. UTM parameters label each link so Google Analytics 4 and other platforms report which source, medium, and campaign drove sessions and conversions. Consistent naming turns campaign reporting from guesswork into auditable channel performance data. Poor tagging is worse than no tagging—it creates false confidence in split reports and sends budget toward channels that look busy in session counts but never convert on revenue or pipeline goals.",
  primaryToolId: "utm-parser",
  relatedToolIds: ["meta-tag-generator", "slug-generator"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "core-params",
      heading: "All five UTM parameters explained",
      paragraphs: [
        "utm_source identifies where traffic originates: newsletter, google, facebook, partner_acme, qr_flyer. utm_medium identifies the marketing medium: email, cpc, social, display, referral, affiliate. utm_campaign names the initiative: spring_sale_2026, product_launch_q2, webinar_may. Together they answer who sent the visitor, through which channel, and for which initiative.",
        "utm_term is optional—traditionally paid search keywords; still useful for ad group or keyword theme labels in non-search channels. utm_content distinguishes creatives or links within the same campaign: hero_banner, text_link_footer, variant_a. All values append to the URL query string after ? or & and are case-sensitive in reporting—lowercase consistency prevents duplicate rows. Never put PII in UTM values; tags appear in URLs users can share and in analytics exports visible to broad teams.",
      ],
      linkedToolIds: ["utm-parser"],
    },
    {
      id: "ga4",
      heading: "How GA4 reads UTM tags",
      paragraphs: [
        "Google Analytics 4 maps UTM parameters to default channel grouping and traffic source dimensions. utm_source populates Source; utm_medium populates Medium; utm_campaign populates Campaign name. Session start captures UTMs from the landing page URL; subsequent pageviews in the session inherit that attribution until a new campaign tag appears.",
        "GA4 also supports auto-tagging for Google Ads (gclid)—do not manually UTM over auto-tagged Google Ads URLs unless you know the interaction rules. For email, social, and offline QR campaigns, manual UTMs remain essential. Verify in GA4 Realtime and Traffic acquisition reports within minutes of a test click—mis-tagged links show up immediately as wrong source/medium pairs. Link GA4 to Google Ads and Search Console where possible, but keep manual UTMs on non-Google properties so Looker Studio dashboards inherit clean dimensions.",
      ],
      linkedToolIds: ["utm-parser"],
    },
    {
      id: "naming",
      heading: "Naming conventions and team hygiene",
      paragraphs: [
        "Use lowercase, underscores or hyphens consistently (never mix spaces and underscores in the same org). Document a living UTM style guide: allowed sources, medium vocabulary (cpc vs ppc vs paidsearch—pick one), and campaign naming pattern including year or quarter. Example pattern: utm_campaign=2026_spring_sale.",
        "Avoid tagging internal navigation links—UTMs on header menus pollute campaign reports with false sessions every time users browse. Reserve UTMs for external campaign URLs: email CTAs, social bios, partner placements, print QR codes, and paid ad destination URLs. Share full tagged URLs with agencies via the style guide, not ad hoc Slack messages with inconsistent spelling. Review the guide quarterly when new channels launch (TikTok, podcasts, AI referral traffic). Assign one owner to approve new utm_source values before campaigns go live.",
      ],
    },
    {
      id: "building-urls",
      heading: "Building and validating campaign URLs",
      paragraphs: [
        "Start with the clean landing page URL without existing query parameters when possible. Append ?utm_source=value&utm_medium=value&utm_campaign=value for the first parameter; use & for additional parameters. URL-encode spaces and special characters—raw spaces break links in some email clients.",
        "Use a UTM parser or builder to inspect final URLs before launch. Test one link yourself and confirm GA4 attributes the session correctly. Store tagged URLs in a campaign spreadsheet with columns for source, medium, campaign, content, destination page, and owner—future you will not remember what utm_content=btn2 meant. Include a shortened preview column for Slack sharing while keeping the full tagged URL canonical for email and ads.",
      ],
      linkedToolIds: ["utm-parser", "slug-generator"],
    },
    {
      id: "reporting",
      heading: "Reporting and optimization",
      paragraphs: [
        "Compare campaigns by conversion rate and revenue, not just sessions—high session counts with zero conversions signal wrong landing page or audience mismatch. Slice by utm_content to retire underperforming ad creatives. Slice by utm_source to reallocate budget toward partners and channels that actually convert.",
        "UTM data does not persist forever in user bookmarks—if someone bookmarks a tagged URL, future direct visits may still carry stale campaign parameters until the URL is cleaned. For long-lived assets, consider landing page canonicals and periodic audits of public indexed tagged URLs in Search Console. Align UTM campaign names with names in your ad platforms so weekly standups compare apples to apples across GA4, Meta, and LinkedIn exports without manual spreadsheet joins.",
      ],
    },
    {
      id: "attribution-limits",
      heading: "Attribution limits and cross-platform tracking",
      paragraphs: [
        "UTMs depend on the landing URL surviving redirects intact. Broken redirect chains, app deep links, and in-app browsers (Instagram, LinkedIn) sometimes strip query parameters before GA4 fires. Supplement UTMs with platform-native analytics (Meta Ads Manager, LinkedIn Campaign Manager) when in-app behavior dominates.",
        "iOS privacy changes and cookie restrictions reduce cross-session attribution quality but do not eliminate value from well-tagged campaign links. First-touch UTMs on landing pages still explain which email or QR code started a session. Combine UTM discipline with consent-mode configuration in GA4 for GDPR and CCPA compliance rather than tagging blindly. Server-side tagging can supplement browser UTMs for apps, but web campaigns still rely on query parameters at click time—document which channels use which method.",
      ],
      linkedToolIds: ["utm-parser"],
    },
  ],
  examples: [
    {
      title: "Email newsletter link",
      description:
        "https://example.com/landing?utm_source=newsletter&utm_medium=email&utm_campaign=spring_sale_2026&utm_content=hero_cta — appears in GA4 as source newsletter / medium email / campaign spring_sale_2026. Compare hero_cta versus footer link variants using utm_content.",
    },
    {
      title: "Paid social ad",
      description:
        "https://example.com/product?utm_source=facebook&utm_medium=paid_social&utm_campaign=retargeting_q2&utm_content=carousel_v2 — separates paid social from organic facebook.com referral traffic in acquisition reports. Match utm_content to ad creative name in Ads Manager.",
    },
    {
      title: "Partner referral",
      description:
        "https://example.com/?utm_source=partner_acme&utm_medium=referral&utm_campaign=integration_launch — attributes co-marketing traffic without relying on referrer headers alone. Include partner slug in source for multi-partner programs and mirror the same slug in your partner portal reporting.",
    },
  ],
  commonMistakes: [
    "Changing campaign names mid-flight, splitting one campaign into duplicate report rows in GA4.",
    "Using spaces in values without URL encoding—links break or truncate in email and SMS clients.",
    "Mixing case (Email vs email) so identical campaigns appear as separate sources in reports.",
    "Tagging internal site navigation links, inflating campaign sessions with organic browsing.",
    "Omitting utm_medium or using vague values like \"link\" that prevent meaningful channel grouping.",
    "Letting agencies invent their own source names without updating the master UTM spreadsheet—reports fragment across synonyms.",
    "Using shortened bit.ly links without preserving UTM query strings through the redirect chain—test the final landing URL, not just the short link.",
    "Renaming utm_campaign every week for the same ongoing initiative—use consistent campaign slugs for always-on programs and date-stamp only for true one-off promos.",
    "Publishing tagged URLs on the public web that include internal codenames—anyone can read query strings in browser history and shared links.",
  ],
};
