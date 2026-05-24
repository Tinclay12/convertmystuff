import type { ResourceDefinition } from "@/lib/content/types";

export const whenToRemoveDuplicateLinesResource: ResourceDefinition = {
  slug: "when-to-remove-duplicate-lines",
  categorySlug: "text-tools",
  title: "When to Remove Duplicate Lines",
  summary:
    "Removing duplicate lines cleans logs, CSV exports, and keyword lists—when exact or case-normalized deduplication is the goal.",
  metaTitle: "When to Remove Duplicate Lines - Text Cleanup Guide",
  metaDescription:
    "Learn when deduplicating lines helps SEO lists, data cleanup, and log analysis, plus pitfalls and tool best practices.",
  keywords: ["remove duplicate lines", "dedupe text lines", "unique lines", "text cleanup"],
  quickAnswer:
    "Remove duplicate lines when you need a unique list preserving first occurrence order—common for keyword lists, email extracts, URL inventories, and log stack traces copied multiple times. Choose case-sensitive or case-insensitive dedupe based on whether 'Apple' and 'apple' should both remain.",
  intro:
    "Duplicate line removal is a fast hygiene step between raw copy-paste and downstream analysis. Data exports, server logs, survey responses, and scraped lists often contain repeated headers or identical error rows that skew counts if left intact. Dedupe tools split lines on newline boundaries, track seen lines in a set, and output first-seen order by default—distinct from sort+unique workflows that reorder alphabetically. Knowing when dedupe helps versus when you need fuzzy matching, blank-line preservation, or key-based deduplication on CSV columns prevents accidental data loss in structured files.",
  primaryToolId: "remove-duplicate-lines",
  relatedToolIds: ["word-counter", "trim-lines"],
  relatedResourceSlugs: ["word-count-vs-character-count", "case-conversion-conventions"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "use-cases",
      heading: "Common use cases for line deduplication",
      paragraphs: [
        "SEO and content ops dedupe keyword or URL lists before uploading to trackers—duplicate entries inflate volume metrics and waste crawl budget analysis. Developers dedupe stack traces pasted from multiple log windows to see unique exceptions.",
        "Merge exports from tools that repeat header rows on each page break—remove duplicate header lines before CSV import. Survey free-text exports may contain identical spam submissions worth collapsing for frequency counts.",
      ],
      linkedToolIds: ["remove-duplicate-lines"],
    },
    {
      id: "sensitivity",
      heading: "Case sensitivity and whitespace trimming",
      paragraphs: [
        "Case-sensitive dedupe treats 'Error' and 'error' as distinct; case-insensitive collapses them—pick based on whether casing carries meaning (URLs often case-sensitive in path). Trim leading/trailing whitespace before compare when accidental spaces cause false duplicates.",
        "Interior whitespace differences ('foo bar' vs 'foo  bar') remain distinct unless normalize step collapses spaces—advanced cleanup may need regex replace before dedupe.",
      ],
      linkedToolIds: ["remove-duplicate-lines", "trim-lines"],
    },
    {
      id: "order",
      heading: "Preserving order vs sorting",
      paragraphs: [
        "Standard dedupe keeps first occurrence order—important when list order reflects priority or chronological discovery. Sort-then-unique alphabetizes, changing semantics for ordered workflows like ranked keywords.",
        "If you need frequency counts of duplicates rather than removal, use counting tools or pivot tables instead of blind dedupe—dedupe destroys repeat evidence.",
      ],
      linkedToolIds: ["remove-duplicate-lines"],
    },
    {
      id: "structured-data",
      heading: "When not to dedupe whole lines blindly",
      paragraphs: [
        "CSV or TSV rows may duplicate legitimately in one column while differing elsewhere—dedupe entire line only when full-row equality defines duplicate. For column-key dedupe, parse structure first.",
        "JSON lines (JSONL) logs require JSON-aware dedupe keys, not raw string compare, if only id field should define uniqueness.",
      ],
      linkedToolIds: ["remove-duplicate-lines"],
    },
    {
      id: "workflow",
      heading: "Recommended cleanup workflow",
      paragraphs: [
        "Trim lines → optional lowercase normalize → dedupe → word count or export. Backup original paste in undo buffer before destructive dedupe on large files.",
        "For very large inputs, browser tools may slow—chunk processing or server-side scripts handle millions of lines; client tools suit typical marketing and dev clipboard sizes.",
      ],
      linkedToolIds: ["remove-duplicate-lines", "word-counter"],
    },
  ],
  examples: [
    {
      title: "Keyword list cleanup",
      description: "Paste 500-line Ahrefs export with repeats; dedupe case-insensitive yields 320 unique keywords for content calendar.",
    },
    {
      title: "Log error uniq",
      description: "Multiple identical 'Connection timeout' lines collapse to one row for ticket summary while preserving first timestamp line if kept.",
    },
  ],
  commonMistakes: [
    "Dedupe case-insensitive when URL path case matters.",
    "Removing duplicates before fixing malformed line breaks split mid-field.",
    "Expecting dedupe to count occurrences—use frequency analysis instead.",
    "Dedupe JSON lines without parsing when only id should match.",
  ],
};

export const wordCountVsCharacterCountResource: ResourceDefinition = {
  slug: "word-count-vs-character-count",
  categorySlug: "text-tools",
  title: "Word Count vs Character Count",
  summary:
    "Word count measures tokens separated by whitespace; character count includes every letter, space, and symbol—platform limits use both.",
  metaTitle: "Word Count vs Character Count Explained",
  metaDescription:
    "Learn differences between words and characters for SEO, social posts, essays, and SMS limits with word counter guidance.",
  keywords: ["word count vs character count", "character limit", "word counter", "text length"],
  quickAnswer:
    "Word count splits text on whitespace boundaries—'hello world' is two words. Character count includes all characters: letters, digits, punctuation, spaces, and often newlines. Twitter/X limits characters; essays assign word counts. Meta descriptions limit characters (~155–160), not words.",
  intro:
    "Writers, marketers, and developers hit different limits depending on platform: SMS segments count characters, academic assignments count words, Google Ads headlines count characters with pixel width caveats. Word counters approximate reading time using words per minute averages. Character counters matter for API fields, database VARCHAR limits, and UI labels with fixed pixel boxes. Unicode complicates character counts—emoji may count as one user-perceived character but multiple code units in JavaScript string.length. Know which metric your destination enforces before editing to fit.",
  primaryToolId: "word-counter",
  relatedToolIds: ["character-counter", "remove-duplicate-lines"],
  relatedResourceSlugs: ["when-to-remove-duplicate-lines", "case-conversion-conventions"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "definitions",
      heading: "Definitions and counting rules",
      paragraphs: [
        "Words: sequences separated by spaces, tabs, newlines—hyphenated compounds may count as one word depending on tool. Empty paste yields zero words.",
        "Characters: grapheme counting matches user perception better for emoji; code-unit counting matches JavaScript .length and many server byte limits for ASCII-heavy text.",
      ],
      linkedToolIds: ["word-counter", "character-counter"],
    },
    {
      id: "platform-limits",
      heading: "Platform limits: which metric applies",
      paragraphs: [
        "Meta descriptions, title tags, Google Ads headlines: character limits with SERP truncation by pixel width—character count is starting guide, not pixel guarantee.",
        "Essays, journalism, NaNoWriMo: word counts. SMS: 160 GSM characters or 70 UCS-2 segments—character math drives multipart texting cost.",
      ],
      linkedToolIds: ["word-counter"],
    },
    {
      id: "reading-time",
      heading: "Reading time and speaking pace",
      paragraphs: [
        "Average adult reading ~200–250 words/minute for estimating blog read time. Scripts for video use ~130 words/minute speaking pace—word count divides by rate, not character count.",
        "Character-heavy languages (Chinese) may use character counts where English workflows use words—adapt metric to language convention.",
      ],
      linkedToolIds: ["word-counter"],
    },
    {
      id: "seo-content",
      heading: "SEO and content length heuristics",
      paragraphs: [
        "SEO guides cite word count ranges for competitive topics—correlation not causation, but word count helps scope writer briefs. Thin content audits use word count thresholds per URL template type.",
        "Featured snippet optimization often targets concise 40–60 word answers within longer articles—both granular word windows and total page words matter strategically.",
      ],
      linkedToolIds: ["word-counter"],
    },
    {
      id: "technical",
      heading: "Technical and database character limits",
      paragraphs: [
        "VARCHAR(255) limits characters not bytes in SQL depending on charset—utf8mb4 emoji consume multiple bytes per character. Form validation maxLength often counts UTF-16 code units in browsers.",
        "API JSON string fields document max character counts; truncate with ellipsis in UI after counting to prevent server 400 errors.",
      ],
      linkedToolIds: ["word-counter", "character-counter"],
    },
  ],
  examples: [
    {
      title: "Meta description draft",
      description: "158 characters including spaces fits common SERP snippet target; word count ~25 irrelevant to Google truncation logic.",
    },
    {
      title: "Essay assignment",
      description: "1,500 words required—character count ~8,500 varies with vocabulary; graders measure words not characters.",
    },
  ],
  commonMistakes: [
    "Optimizing blog posts to word count alone without search intent fit.",
    "Using JavaScript length for user-facing emoji limits without grapheme awareness.",
    "Ignoring HTML markup counted in CMS character widgets that strip tags inconsistently.",
    "Assuming word count equals tokens billed by LLM APIs—tokenization differs.",
  ],
};

export const caseConversionConventionsResource: ResourceDefinition = {
  slug: "case-conversion-conventions",
  categorySlug: "text-tools",
  title: "Case Conversion Conventions",
  summary:
    "camelCase, PascalCase, snake_case, and kebab-case naming conventions organize identifiers in code, URLs, and data fields.",
  metaTitle: "Case Conversion Conventions - camelCase, snake_case & More",
  metaDescription:
    "Learn programming and URL case conventions, when to convert between them, and camelCase converter tool usage.",
  keywords: ["case conversion", "camelcase", "snake_case", "kebab-case conventions"],
  quickAnswer:
    "camelCaseCapitalizesWordsAfterFirst (myVariableName). PascalCase capitalizes each word (MyClassName). snake_case uses underscores (my_variable_name). kebab-case uses hyphens (my-variable-name), common in URLs. CONSCREAMING_SNAKE often denotes constants. Convert consistently per language and API style guide.",
  intro:
    "Case conventions signal context in codebases and integrations: JavaScript prefers camelCase properties, Python snake_case, CSS and URLs kebab-case, C# types PascalCase. Converting exported CSV headers from 'First Name' to firstName or first_name prevents brittle import scripts. Automatic case converters split on spaces, underscores, or hyphens and rejoin per target pattern—human review still needed for acronyms like XMLHttpRequest or userID vs userId team preferences. SEO URLs traditionally lowercase kebab-case; mixed case paths may break on case-sensitive servers.",
  primaryToolId: "camel-case-converter",
  relatedToolIds: ["slug-generator", "snake-case-converter"],
  relatedResourceSlugs: ["when-to-remove-duplicate-lines", "word-count-vs-character-count"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "conventions",
      heading: "Major naming conventions overview",
      paragraphs: [
        "camelCase: JavaScript, Java fields, JSON APIs often camelCase. PascalCase: class names, React components, .NET types. snake_case: Python, Ruby variables, Postgres column names often lowercase snake.",
        "kebab-case: URL slugs, HTML attributes, CSS classes. SCREAMING_SNAKE_CASE: environment constants and enum-like macros in some codebases.",
      ],
      linkedToolIds: ["camel-case-converter", "snake-case-converter"],
    },
    {
      id: "acronyms",
      heading: "Handling acronyms and edge cases",
      paragraphs: [
        "HTMLParser vs HtmlParser vs htmlParser—teams document acronym rules. Converters naive-split on caps may mishandle iOS or AWS—post-edit after auto conversion.",
        "Numbers and unicode: case conversion affects letters only; normalize unicode compatibility before converting Turkish dotted capital I edge cases.",
      ],
      linkedToolIds: ["camel-case-converter"],
    },
    {
      id: "api-data",
      heading: "API and database field mapping",
      paragraphs: [
        "ORMs map snake_case DB columns to camelCase JSON automatically in frameworks—manual ETL must convert when crossing boundaries. GraphQL often camelCase fields regardless of SQL backend.",
        "Bulk convert spreadsheet headers before JSON import to prevent mixed-case keys breaking client code expecting strict convention.",
      ],
      linkedToolIds: ["camel-case-converter", "snake-case-converter"],
    },
    {
      id: "urls-seo",
      heading: "URLs, slugs, and SEO",
      paragraphs: [
        "Lowercase kebab-case slugs avoid duplicate content on case-insensitive hosts and improve readability. Convert title case headlines to slugs stripping stop words per editorial policy.",
        "File names on case-sensitive Linux servers break links when marketing uses wrong case—standardize slug generator output.",
      ],
      linkedToolIds: ["camel-case-converter", "slug-generator"],
    },
    {
      id: "workflow",
      heading: "Safe conversion workflow",
      paragraphs: [
        "Identify target convention from style guide before batch converting legacy exports. Preview sample rows for acronym collisions. Version control before mass rename refactors in code.",
        "Pair case conversion with trim and dedupe on identifier lists imported from messy human-entered spreadsheets.",
      ],
      linkedToolIds: ["camel-case-converter", "remove-duplicate-lines"],
    },
  ],
  examples: [
    {
      title: "CSV header to JSON keys",
      description: "'Order ID' → orderId (camelCase) or order_id (snake_case) depending on API schema.",
    },
    {
      title: "Blog title to slug",
      description: "'Case Conversion Conventions' → case-conversion-conventions kebab slug for URL.",
    },
  ],
  commonMistakes: [
    "Mixing conventions within same API surface.",
    "Auto-converting acronyms without team acronym table.",
    "Uppercase URLs on case-sensitive CDNs breaking assets.",
    "Converting display names meant for humans into code identifiers without review.",
  ],
};

export const openGraphTagsExplainedResource: ResourceDefinition = {
  slug: "open-graph-tags-explained",
  categorySlug: "marketing-tools",
  title: "Open Graph Tags Explained",
  summary:
    "Open Graph meta tags control how URLs preview on social platforms—title, description, image, and type.",
  metaTitle: "Open Graph Tags Explained - Social Preview SEO",
  metaDescription:
    "Learn og:title, og:image, og:description and fix broken social share previews with Open Graph best practices.",
  keywords: ["open graph tags", "og meta tags", "social preview", "og:image"],
  quickAnswer:
    "Open Graph tags are `<meta property=\"og:...\">` elements in HTML head. Core tags: og:title, og:description, og:image, og:url, og:type. Platforms like Facebook, LinkedIn, and Slack read them to build link preview cards. Image should be at least ~1200×630 px for best display.",
  intro:
    "When someone shares your landing page, the preview card often comes from Open Graph tags—not the visible on-page H1. Missing or wrong og:image yields bland link posts that hurt click-through. Marketing and dev teams collaborate on OG tags: copywriters supply title and description within character comfort zones; designers export 1.91:1 aspect hero images; developers implement tags and validate with platform debuggers. Twitter/X also supports twitter:card tags; many sites duplicate OG values for compatibility. Dynamic OG for programmatic pages (product SKUs, blog posts) should template from CMS fields with fallbacks.",
  primaryToolId: "open-graph-preview",
  relatedToolIds: ["meta-tag-generator", "twitter-card-generator"],
  relatedResourceSlugs: ["meta-description-best-practices", "qr-code-url-best-practices"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "core-tags",
      heading: "Core Open Graph properties",
      paragraphs: [
        "og:title — preview headline, may differ from `<title>` for social hook optimization. og:description — supporting blurb, often 150–200 characters display truncated. og:image — absolute HTTPS URL to image asset.",
        "og:url — canonical URL of shared page preventing parameter-stuffed duplicate previews. og:type — website, article, product, etc., hints card layout on some platforms.",
      ],
      linkedToolIds: ["open-graph-preview", "meta-tag-generator"],
    },
    {
      id: "images",
      heading: "Image requirements and aspect ratio",
      paragraphs: [
        "Recommended 1200×630 px (1.91:1) minimum for Facebook-class previews; smaller images upscale blurry. File size under platform limits (~8MB Facebook) with JPG or PNG.",
        "og:image:alt improves accessibility on supporting platforms. Avoid critical text near crop edges—mobile crops may center differently.",
      ],
      linkedToolIds: ["open-graph-preview"],
    },
    {
      id: "validation",
      heading: "Testing and cache busting",
      paragraphs: [
        "Facebook Sharing Debugger and LinkedIn Post Inspector scrape URL and refresh cache after tag changes—deploy alone does not update cached previews instantly.",
        "Query string cache bust only for debugger rescrape—not for production sharing. Fix tags at source; platforms cache by URL.",
      ],
      linkedToolIds: ["open-graph-preview"],
    },
    {
      id: "twitter-cards",
      heading: "Twitter/X cards alongside Open Graph",
      paragraphs: [
        "twitter:card summary_large_image pairs with og tags; twitter:image can mirror og:image. Some crawlers prefer twitter tags; implementing both maximizes compatibility.",
        "Validate card type matches image dimensions—summary_large_image expects wide hero not square favicon blown up.",
      ],
      linkedToolIds: ["open-graph-preview", "twitter-card-generator"],
    },
    {
      id: "dynamic-pages",
      heading: "CMS and programmatic OG templates",
      paragraphs: [
        "Blog templates map post title, excerpt, featured image to OG fields automatically. E-commerce product pages use primary product shot and price snippet in description where policy allows.",
        "Fallback chain when image missing: default site OG image better than blank. Localized pages need og:locale and alternate locales for international sites.",
      ],
      linkedToolIds: ["open-graph-preview", "meta-tag-generator"],
    },
  ],
  examples: [
    {
      title: "Article share card",
      description:
        "og:type article with og:title matching compelling headline, og:image 1200×630 featured photo, og:url canonical without utm params.",
    },
    {
      title: "Homepage default",
      description: "og:type website with brand-wide default OG image when individual pages lack custom art.",
    },
  ],
  commonMistakes: [
    "Relative og:image URLs that break off-site crawlers.",
    "Using tiny logo as og:image for large image card layouts.",
    "Forgetting to rescrape debugger after deploy.",
    "Duplicate conflicting og:url and canonical link tags.",
  ],
};

export const metaDescriptionBestPracticesResource: ResourceDefinition = {
  slug: "meta-description-best-practices",
  categorySlug: "marketing-tools",
  title: "Meta Description Best Practices",
  summary:
    "Meta descriptions summarize pages for search snippets—unique, compelling copy within ~150–160 characters improves clicks.",
  metaTitle: "Meta Description Best Practices for SEO",
  metaDescription:
    "Write effective meta descriptions with length tips, CTA patterns, and duplicate avoidance—plus meta tag generator links.",
  keywords: ["meta description best practices", "seo meta description", "description tag length"],
  quickAnswer:
    "Write unique meta descriptions ~150–160 characters summarizing page value with primary keyword naturally included and a subtle call to action. Google may rewrite descriptions, but good defaults improve CTR. Avoid duplicate descriptions sitewide and keyword stuffing.",
  intro:
    "Meta descriptions do not directly rank in Google's classic model but influence click-through rate from SERPs—real traffic impact. Each important URL deserves unique description matching search intent: product pages highlight benefits, blogs promise answer scope, tools pages name outcome free/no-login if true. SERP truncation uses pixel width not character count—short words fit more than long words in same character budget. When Google rewrites descriptions from on-page content, strong originals still win on many queries. Template responsibly on large sites with variable insertion, not one generic string everywhere.",
  primaryToolId: "meta-tag-generator",
  relatedToolIds: ["open-graph-preview", "slug-generator"],
  relatedResourceSlugs: ["open-graph-tags-explained", "qr-code-url-best-practices"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "length",
      heading: "Length and pixel truncation",
      paragraphs: [
        "Aim 150–160 characters as starting point; mobile SERPs truncate earlier on some queries. Test with SERP preview tools accounting for bold keyword insertion widening effective truncation.",
        "Front-load important words—trailing clauses drop first when truncated mid-sentence awkwardly.",
      ],
      linkedToolIds: ["meta-tag-generator"],
    },
    {
      id: "content",
      heading: "Writing compelling copy",
      paragraphs: [
        "Match intent: informational queries want clear scope ('Learn how to…'); transactional want value prop and trust signal. Include primary keyword when natural—forced repetition hurts readability.",
        "One clear CTA verb: Calculate, Compare, Download, Learn—avoid stacking five exclamation marks or ALL CAPS spam patterns.",
      ],
      linkedToolIds: ["meta-tag-generator"],
    },
    {
      id: "uniqueness",
      heading: "Uniqueness and scale",
      paragraphs: [
        "Duplicate meta descriptions across thousands of faceted URLs waste snippet opportunity and confuse quality audits. Templatize `{product name} — {category} — {brand}` with guards against empty variables.",
        "Priority order: homepage, money pages, top blog posts first; long tail may inherit sensible defaults until batch updated.",
      ],
      linkedToolIds: ["meta-tag-generator"],
    },
    {
      id: "og-alignment",
      heading: "Alignment with title and Open Graph",
      paragraphs: [
        "Meta description can echo og:description for consistency or tailor search vs social angles differently when strategies diverge. Title tag and description should complement not repeat verbatim.",
        "Brand suffix in title (`| ConvertMyStuff`) may consume pixel budget—factor into description uniqueness rather than repeating brand story twice.",
      ],
      linkedToolIds: ["meta-tag-generator", "open-graph-preview"],
    },
    {
      id: "measurement",
      heading: "Measurement and iteration",
      paragraphs: [
        "Search Console shows queries where Google displays custom vs rewritten descriptions—low CTR pages merit copy tests. A/B meta at scale requires CMS experiments or phased rollouts by template.",
        "Avoid outdated dates in descriptions ('Best tools 2020') that signal neglect—update lastReviewed content and description year in content refresh cycles.",
      ],
      linkedToolIds: ["meta-tag-generator"],
    },
  ],
  examples: [
    {
      title: "Tool page pattern",
      description:
        "'Free compound interest calculator—project savings growth with monthly contributions. No login required. Instant results in your browser.'",
    },
    {
      title: "Blog explainer",
      description:
        "'Learn how loan amortization splits payments between interest and principal, with examples and a free mortgage calculator.'",
    },
  ],
  commonMistakes: [
    "Identical site-wide generic description.",
    "Keyword lists instead of readable sentences.",
    "Exceeding length without testing mobile truncation.",
    "Promising features the page does not deliver—CTR without engagement hurts trust metrics.",
  ],
};

export const qrCodeUrlBestPracticesResource: ResourceDefinition = {
  slug: "qr-code-url-best-practices",
  categorySlug: "marketing-tools",
  title: "QR Code URL Best Practices",
  summary:
    "QR codes encode URLs for print and physical marketing—use HTTPS, short stable links, and test scan size and contrast.",
  metaTitle: "QR Code URL Best Practices - Marketing Guide",
  metaDescription:
    "Best practices for QR code URLs: shortening, UTM tracking, error correction, print sizing, and generator tool tips.",
  keywords: ["qr code url best practices", "qr code marketing", "qr code link", "qr generator tips"],
  quickAnswer:
    "Encode HTTPS URLs with minimal length—shorter URLs produce simpler QR modules scannable at smaller print sizes. Use stable redirects for campaigns you may reprint. Test contrast (dark on light), quiet zone margin, and minimum print size (~2 cm) before mass printing. Add UTM parameters before encoding for analytics.",
  intro:
    "QR codes bridge offline to online: posters, packaging, event badges, restaurant menus. A QR is not magic tracking by itself—it merely encodes whatever string you provide, almost always a URL. Long URLs increase QR density, requiring larger print or higher error correction that still may fail on low-end cameras. Marketing teams shorten links, attach UTM parameters for campaign analytics, and host redirect rules so reprints survive destination changes. Design choices—logo in center, brand colors—affect scannability; test on multiple phones under realistic lighting before committing to ten thousand flyers.",
  primaryToolId: "qr-code-generator",
  relatedToolIds: ["utm-parser", "open-graph-preview"],
  relatedResourceSlugs: ["open-graph-tags-explained", "meta-description-best-practices"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "url-choice",
      heading: "Choosing the URL to encode",
      paragraphs: [
        "Prefer HTTPS landing pages mobile-optimized—QR scans overwhelmingly mobile. Avoid auth walls immediately after scan unless audience expects login.",
        "Short URLs reduce QR complexity: branded short domain or redirect layer keeps printed code stable while marketing updates final destination in redirect target.",
      ],
      linkedToolIds: ["qr-code-generator"],
    },
    {
      id: "utm",
      heading: "UTM tracking and analytics",
      paragraphs: [
        "Append utm_source, utm_medium, utm_campaign before generating QR so analytics attribute offline scans—e.g., utm_source=poster&utm_medium=qr&utm_campaign=spring2026.",
        "URL-encode parameters correctly; test scan resolves full query string without truncation. Document naming conventions so reports stay clean.",
      ],
      linkedToolIds: ["qr-code-generator", "utm-parser"],
    },
    {
      id: "design",
      heading: "Size, contrast, and error correction",
      paragraphs: [
        "Minimum size depends on scan distance and print quality—2×2 cm floor for close menu scans; billboards need larger modules. Maintain quiet zone blank margin around code per spec.",
        "Dark foreground on light background scans best. Error correction level H allows logo overlay but increases module count—balance branding with reliability.",
      ],
      linkedToolIds: ["qr-code-generator"],
    },
    {
      id: "redirects",
      heading: "Redirects and campaign lifecycle",
      paragraphs: [
        "Use redirect URLs you control so expired campaigns update without reprinting when possible. Communicate sunset dates if hard-coded URLs must change.",
        "Avoid encoding fragile session-specific URLs with tokens expiring in hours—QR on permanent signage needs durable destinations.",
      ],
      linkedToolIds: ["qr-code-generator"],
    },
    {
      id: "testing",
      heading: "Testing before print run",
      paragraphs: [
        "Scan with iOS and Android cameras, older devices if audience skews corporate legacy phones. Test glossy laminate glare at angle under store lighting.",
        "Verify landing Open Graph and meta description polish first impression after scan—QR delivers user to browser tab instantly.",
      ],
      linkedToolIds: ["qr-code-generator", "open-graph-preview"],
    },
  ],
  examples: [
    {
      title: "Event poster QR",
      description:
        "https://brand.co/e2026?utm_source=poster&utm_medium=qr encodes short redirect https://br.co/e26 for simpler modules.",
    },
    {
      title: "Menu order link",
      description: "HTTPS mobile order page, high contrast black QR on white, 3 cm print, error correction M.",
    },
  ],
  commonMistakes: [
    "Encoding HTTP not HTTPS on security-sensitive flows.",
    "Printing low-contrast brand pastel QR on white.",
    "Omitting quiet zone margin in graphic design crop.",
    "Using expiring discount URLs on permanent packaging.",
  ],
};

export const recipeScalingMathResource: ResourceDefinition = {
  slug: "recipe-scaling-math",
  categorySlug: "kitchen-recipe-tools",
  title: "Recipe Scaling Math Explained",
  summary:
    "Recipe scaling multiplies ingredient quantities by the ratio of desired servings to original servings.",
  metaTitle: "Recipe Scaling Math - Servings & Ingredient Ratios",
  metaDescription:
    "Learn how to scale recipes up or down, handle fractions and spice adjustments, with free recipe scaler tool links.",
  keywords: ["recipe scaling math", "scale recipe servings", "double recipe formula", "ingredient ratio"],
  quickAnswer:
    "Scale factor = desired servings ÷ original servings. Multiply each ingredient quantity by scale factor. Example: double 4-serving recipe → factor 2; 1.5 cups flour becomes 3 cups. Spices and salt may need sub-linear scaling—taste and adjust.",
  intro:
    "Home cooks and caterers scale recipes when guest counts change or batch meal prep demands multiples. Linear multiplication works for most bulk ingredients—flour, milk, protein weight—but leavening, salt, and chili sometimes need conservative scaling because perception is nonlinear. Volumetric vs weight measures diverge when scaling: weighing ingredients in grams scales more accurately than doubling vague cup measures packed differently. Recipe scaler tools apply factor consistently across parsed ingredient lists, reducing arithmetic errors on Thanksgiving when multiple dishes scale simultaneously under time pressure.",
  primaryToolId: "recipe-scaler",
  relatedToolIds: ["serving-calculator", "cups-to-grams"],
  relatedResourceSlugs: ["cups-vs-grams", "portion-size-calculations"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "basic-formula",
      heading: "Basic scaling formula",
      paragraphs: [
        "Desired servings divided by recipe servings yields multiplier. Triple 6-serving stew to feed 18: factor 3. Apply to each ingredient: 2 lb beef → 6 lb; 1 tbsp oil → 3 tbsp.",
        "Fractions: 3/4 cup × 2 = 1 1/2 cups. Convert mixed numbers carefully on paper or let scaler tool output decimal then reconvert to cooking-friendly fractions.",
      ],
      linkedToolIds: ["recipe-scaler"],
    },
    {
      id: "weight-vs-volume",
      heading: "Weight vs volume when scaling",
      paragraphs: [
        "Grams scale linearly reliably; cups of flour vary by 30%+ with pack method—500 g flour doubled is 1000 g clearer than 2 cups doubled by eye.",
        "When original recipe volume-only, consider converting key dry goods to weight once using density table before scaling large batches professionally.",
      ],
      linkedToolIds: ["recipe-scaler", "cups-to-grams"],
    },
    {
      id: "nonlinear",
      heading: "Nonlinear ingredients: salt, spice, leavening",
      paragraphs: [
        "Salt and hot spice: start at 75–85% of linear scale for large batches, taste, adjust—especially brines and rubs where surface area ratio changes.",
        "Baking powder/baking soda in delicate cakes may not double linearly when pan geometry changes—follow trusted tested scaled recipes for precision bakes.",
      ],
      linkedToolIds: ["recipe-scaler"],
    },
    {
      id: "equipment",
      heading: "Equipment and time adjustments",
      paragraphs: [
        "Doubling volume in one pot may require wider pan for evaporation rate; oven time may increase less than linearly due to thermal mass. Two batches in standard pans sometimes beat one huge failing batch.",
        "Mixer motor limits on doubled dough stiffness—split batch if torque strains equipment.",
      ],
      linkedToolIds: ["recipe-scaler", "serving-calculator"],
    },
    {
      id: "catering",
      heading: "Catering and partial servings",
      paragraphs: [
        "Scaling to 75 guests from 8-serving recipe: factor 9.375—use scaler for precision. Round awkward spice teaspoons to practical measuring spoons with note to taste.",
        "Document scaled version after event success for repeat catering reproducibility.",
      ],
      linkedToolIds: ["recipe-scaler", "serving-calculator"],
    },
  ],
  examples: [
    {
      title: "Double chocolate chip cookies",
      description: "8 → 16 servings: 2 cups chips → 4 cups; oven may need rotation, same temp, +2 min watch.",
    },
    {
      title: "Half batch weeknight",
      description: "4 → 2 servings: factor 0.5; 1 egg halved → use one egg beaten split or weight 50 g of beaten egg.",
    },
  ],
  commonMistakes: [
    "Linear doubling salt in large soup without tasting.",
    "Scaling cup measures without consistent pack level.",
    "Assuming bake time doubles when volume doubles.",
    "Forgetting to scale all subcomponents (sauce and main separately needed).",
  ],
};

export const cupsVsGramsResource: ResourceDefinition = {
  slug: "cups-vs-grams",
  categorySlug: "kitchen-recipe-tools",
  title: "Cups vs Grams in Baking",
  summary:
    "Cups measure volume; grams measure mass—ingredient density determines conversion, critical for accurate baking.",
  metaTitle: "Cups vs Grams - Baking Conversion Guide",
  metaDescription:
    "Convert cups to grams for flour, sugar, butter with density factors and free cups-to-grams calculator links.",
  keywords: ["cups vs grams", "cups to grams baking", "volume weight conversion", "flour grams per cup"],
  quickAnswer:
    "1 cup is a volume; grams depend on ingredient. All-purpose flour ~120–125 g per cup (US), sugar ~200 g, butter ~227 g (8 oz). Water ~237 g per US cup. Always specify US vs metric cup (250 mL). Weighing grams scales recipes reliably; cups vary with pack and scoop technique.",
  intro:
    "American recipes cup-volume measure; European and professional bakeries use grams on scales. Converting between them requires ingredient-specific density—1 cup flour weighs less than 1 cup honey. Serious baking errors come from assuming 240 g per cup for everything. US legal cup is 240 mL; Australian metric cup 250 mL—international cookbook imports need cup size clarification. Kitchen scales tare bowl zero after placing empty container, pour to target grams, eliminate pack variance. Cups-to-grams tools encode standard densities for common pantry items while reminding bakers that brand and humidity shift flour weight slightly.",
  primaryToolId: "cups-to-grams",
  relatedToolIds: ["grams-to-cups", "ounces-to-grams", "recipe-scaler"],
  relatedResourceSlugs: ["recipe-scaling-math", "portion-size-calculations"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "why-weight",
      heading: "Why grams beat cups for precision",
      paragraphs: [
        "Cup flour spooned vs scooped differs 20+ g per cup—enough to dry or wetten cake noticeably. Grams repeat batch to batch regardless of technique when scale calibrated.",
        "Professional formulas express baker's percentages by flour weight baseline—impossible to maintain in cup-only workflow at scale.",
      ],
      linkedToolIds: ["cups-to-grams"],
    },
    {
      id: "common-densities",
      heading: "Common ingredient cup-to-gram references",
      paragraphs: [
        "All-purpose flour: ~120–125 g/cup US. Granulated sugar: ~200 g. Brown sugar packed: ~220 g. Butter: 1 cup = 227 g (2 sticks US). Milk/water: ~240 g per US cup near room temp.",
        "Whole wheat and rye denser per cup than AP—use specific table row not generic flour default.",
      ],
      linkedToolIds: ["cups-to-grams", "grams-to-cups"],
    },
    {
      id: "cup-standards",
      heading: "US cup vs metric cup",
      paragraphs: [
        "US customary cup 236.588 mL legally rounded 240 mL in nutrition labeling context. Metric cup 250 mL used Australia/NZ/Canada sometimes. 10 mL difference matters in precision baking over many cups.",
        "Import recipes stating metric cup without US adjustment need 4% flour correction roughly—confirm author locale.",
      ],
      linkedToolIds: ["cups-to-grams"],
    },
    {
      id: "scaling-link",
      heading: "Scaling recipes with grams",
      paragraphs: [
        "Once ingredients in grams, scaling servings multiplies all masses linearly—cleaner than scaling mixed cup fractions. Recipe scaler plus grams base list streamlines catering.",
        "Convert legacy family cup recipe to grams once, archive gram card as new canonical version.",
      ],
      linkedToolIds: ["cups-to-grams", "recipe-scaler"],
    },
    {
      id: "tools-practice",
      heading: "Practical kitchen workflow",
      paragraphs: [
        "Use tare function: bowl on scale → zero → add to target g. For sticky honey, oil cup measure or weigh jar delta.",
        "Digital scale 1 g resolution sufficient home baking; 0.1 g for small yeast/salt batches optional.",
      ],
      linkedToolIds: ["cups-to-grams", "ounces-to-grams"],
    },
  ],
  examples: [
    {
      title: "Cookie flour",
      description: "2 1/4 cups AP flour → ~270–281 g depending 120 vs 125 g/cup assumption—pick one standard and stick recipe.",
    },
    {
      title: "European import",
      description: "250 g butter in source recipe ≠ 1 US cup if author meant block—verify label net weight.",
    },
  ],
  commonMistakes: [
    "Using single 140 g/cup flour myth for all recipes.",
    "Confusing fluid ounce volume with weight ounce.",
    "Ignoring US vs metric cup in international blogs.",
    "Measuring flour sifted then leveled inconsistently.",
  ],
};

export const portionSizeCalculationsResource: ResourceDefinition = {
  slug: "portion-size-calculations",
  categorySlug: "kitchen-recipe-tools",
  title: "Portion Size Calculations",
  summary:
    "Portion calculations divide total recipe yield by guests to plan shopping lists and serving amounts per person.",
  metaTitle: "Portion Size Calculations - Servings Guide",
  metaDescription:
    "Calculate portions per guest for events and meal prep with serving size rules, leftovers buffer, and serving calculator tools.",
  keywords: ["portion size calculations", "servings per person", "event food portions", "serving size guide"],
  quickAnswer:
    "Per-person portion = total prepared amount ÷ number of guests, adjusted by appetite context (main vs side). Event planning adds 10–15% buffer for seconds and uneven eaters. Protein often 4–6 oz cooked per adult main; sides 1/2–3/4 cup depending role.",
  intro:
    "Hosting dinner, meal prep Sundays, and catering quotes start with portion math—how much food per person and total batch size. Recipes state nominal servings assuming moderate appetite; teenage athletes and cocktail parties diverge. Side dishes scale differently from proteins: more variety means smaller per-dish portions but higher aggregate volume. Serving calculators translate guest count and per-person grams into total shopping weights, bridging recipe scaler output to grocery carts. Document cultural and dietary splits (vegetarian count, kids half portions) before one bulk number drives purchases.",
  primaryToolId: "serving-calculator",
  relatedToolIds: ["recipe-scaler", "cups-to-grams"],
  relatedResourceSlugs: ["recipe-scaling-math", "cups-vs-grams"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "basics",
      heading: "Basic portion division",
      paragraphs: [
        "Total yield divided by guests equals baseline per person. Chili pot 3 gallons (384 fl oz) for 32 adults → 12 fl oz (~1.5 cups) each if sole main—may be light; increase batch or add sides.",
        "Kids often counted 0.5 adult portion; mixed crowd sum weighted portions before dividing recipe scale factor.",
      ],
      linkedToolIds: ["serving-calculator"],
    },
    {
      id: "categories",
      heading: "Proteins, starches, and vegetables",
      paragraphs: [
        "Cooked protein main: plan 6 oz per hungry adult, 4 oz lunch lighter. Rice/pasta dry weight ~2 oz dry per side serving translates ~1 cup cooked depending shape.",
        "Salad greens ~1.5–2 cups per person buffet; rolls 1–2 per guest meal dependent. Multiple proteins split appetite across options.",
      ],
      linkedToolIds: ["serving-calculator"],
    },
    {
      id: "buffer",
      heading: "Buffer for events and leftovers policy",
      paragraphs: [
        "Add 10–15% extra for parties where seconds expected; 25% for unknown crowd size potlucks risky—better communicate RSVP.",
        "Corporate lunch trays often plan exact count without buffer—different risk profile than wedding buffet.",
      ],
      linkedToolIds: ["serving-calculator", "recipe-scaler"],
    },
    {
      id: "scaling-integration",
      heading: "Integrating with recipe scaling",
      paragraphs: [
        "Determine target total from portions × guests × buffer, then divide by recipe yield for scale factor feeding into recipe scaler. Reverse: given one batch serves 8, need 36 portions → factor 4.5.",
        "Round awkward fractions on shopping list up slightly for indivisible package sizes (whole chickens not fractional).",
      ],
      linkedToolIds: ["serving-calculator", "recipe-scaler"],
    },
    {
      id: "dietary",
      heading: "Dietary splits and labeling",
      paragraphs: [
        "Track vegetarian and allergen-free counts separately—do not average into single protein portion math. Label serving sizes on buffet for calorie-conscious guests optional.",
        "Meal prep containers fixed size: total recipe must divide evenly into N containers without orphan quarter serving.",
      ],
      linkedToolIds: ["serving-calculator"],
    },
  ],
  examples: [
    {
      title: "BBQ for 40 adults",
      description: "6 oz cooked meat × 40 × 1.1 buffer ≈ 16.5 lb cooked ≈ ~22 lb raw accounting shrinkage—verify meat type yield.",
    },
    {
      title: "Meal prep 5 lunches",
      description: "Recipe serves 4 → scale 1.25× or pick 5-container-friendly recipe dividing evenly.",
    },
  ],
  commonMistakes: [
    "Using raw weight portions without cooking loss shrinkage.",
    "Planning full adult portions for kid-heavy party.",
    "Forgetting sides when sizing protein only.",
    "Exact RSVP count zero buffer for self-serve seconds.",
  ],
};

export const unixTimestampExplainedResource: ResourceDefinition = {
  slug: "unix-timestamp-explained",
  categorySlug: "time-date-tools",
  title: "Unix Timestamp Explained",
  summary:
    "Unix time counts seconds since January 1, 1970 UTC (epoch), widely used in APIs, logs, and databases.",
  metaTitle: "Unix Timestamp Explained - Epoch Time Guide",
  metaDescription:
    "Learn Unix epoch seconds vs milliseconds, timezone neutrality, Y2038 limits, and unix timestamp converter usage.",
  keywords: ["unix timestamp explained", "epoch time", "unix time seconds", "timestamp converter"],
  quickAnswer:
    "Unix timestamp (epoch time) is integer seconds since 1970-01-01 00:00:00 UTC, excluding leap seconds in common POSIX interpretation. JavaScript Date often uses milliseconds since epoch—multiply or divide by 1000 when converting. Timestamps are timezone-agnostic; display local time requires explicit timezone conversion.",
  intro:
    "APIs return `created_at: 1716460800` instead of human dates to keep JSON compact and timezone-neutral at storage. Developers convert epoch to local display for admin UIs and back to epoch for query filters. Confusion between seconds and milliseconds causes dates in year 1970 or 50000+ when wrong unit assumed. Signed 32-bit timestamps overflow January 2038 (Y2038 problem)—modern systems use 64-bit. Logs aggregate by epoch range for performance; always confirm API docs whether value is seconds, milliseconds, or microseconds since epoch.",
  primaryToolId: "unix-timestamp",
  relatedToolIds: ["timezone-converter", "date-difference"],
  relatedResourceSlugs: ["timezone-conversion-basics", "iso-8601-date-format"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "definition",
      heading: "Epoch definition and UTC baseline",
      paragraphs: [
        "Epoch start: 1970-01-01 00:00:00 UTC, not local midnight—local display of epoch zero differs by timezone offset.",
        "Count increases monotonically one per second in idealized POSIX time; leap seconds handled inconsistently across systems—rare issue for app devs but matters in finance tick data.",
      ],
      linkedToolIds: ["unix-timestamp"],
    },
    {
      id: "seconds-vs-ms",
      heading: "Seconds vs milliseconds vs microseconds",
      paragraphs: [
        "Unix classic: seconds (10 digits currently ~1.7e9). JavaScript Date.now() milliseconds (13 digits). Some APIs microseconds (16 digits). Identify magnitude by digit count heuristic.",
        "Convert ms to s: divide by 1000 floor. Python datetime.fromtimestamp expects seconds float; JS new Date(ms) expects ms.",
      ],
      linkedToolIds: ["unix-timestamp"],
    },
    {
      id: "timezone",
      heading: "Timezone neutrality and display",
      paragraphs: [
        "Store UTC epoch; convert to local or named timezone only at presentation layer. Never store local epoch without offset documentation—that pattern causes bugs.",
        "Daylight saving transitions affect local clock strings but not UTC epoch increment continuity.",
      ],
      linkedToolIds: ["unix-timestamp", "timezone-converter"],
    },
    {
      id: "y2038",
      heading: "Y2038 and integer width",
      paragraphs: [
        "32-bit signed max 2147483647 → 2038-01-19 UTC. Legacy embedded systems risk; modern 64-bit languages default safe. Database column types int vs bigint for timestamps on long-lived data.",
        "Validate API contracts for bit width when integrating mainframe or IoT devices.",
      ],
      linkedToolIds: ["unix-timestamp"],
    },
    {
      id: "usage",
      heading: "API filters, caching, and logs",
      paragraphs: [
        "Query `?since=timestamp` for incremental sync. Cache keys include epoch version for busting. Log correlation uses epoch ordering independent of locale string sort bugs on '03/04/2024' formats.",
        "Pair epoch storage with ISO 8601 strings in APIs needing human readability—document canonical format.",
      ],
      linkedToolIds: ["unix-timestamp", "iso-8601-date-format"],
    },
  ],
  examples: [
    {
      title: "1716460800 seconds",
      description: "2024-05-23 12:00:00 UTC approximately—verify with converter for exact local display.",
    },
    {
      title: "JavaScript pitfall",
      description: "Passing seconds to new Date(1716460800) interprets as ms → 1970 date; use new Date(1716460800 * 1000).",
    },
  ],
  commonMistakes: [
    "Seconds vs milliseconds confusion.",
    "Formatting epoch with local timezone in stored database value.",
    "32-bit overflow assumptions on new projects.",
    "Sorting date strings DD/MM vs MM/DD instead of epoch in code.",
  ],
};

export const timezoneConversionBasicsResource: ResourceDefinition = {
  slug: "timezone-conversion-basics",
  categorySlug: "time-date-tools",
  title: "Timezone Conversion Basics",
  summary:
    "Timezone conversion maps an instant in time between regional offsets and names, accounting for daylight saving rules.",
  metaTitle: "Timezone Conversion Basics - UTC & DST Guide",
  metaDescription:
    "Learn IANA timezones, UTC offsets, DST transitions, and scheduling meetings across zones with timezone converter tools.",
  keywords: ["timezone conversion basics", "convert timezone", "utc offset", "dst explained"],
  quickAnswer:
    "Use IANA timezone names (America/New_York) not fixed UTC offsets alone—DST shifts offsets seasonally. Convert by instant: same moment displays different local clocks in Tokyo vs London. UTC is reference; local = UTC plus offset. Tools apply Olson timezone database rules automatically.",
  intro:
    "Global teams scheduling standups, webinar launches, and flight connections navigate timezone math daily. Saying '3 PM EST' without date fails across DST boundaries—March and November shift US Eastern offset between EST and EDT. Fixed offset +5:30 works for India (no DST) year-round; US cities need named zones. Calendar apps store UTC instants internally; UI converts for viewer locale. Manual offset arithmetic errors spike on DST transition Sundays when local hour repeats or skips—always convert concrete UTC instant or use timezone-aware library rather than memorized winter offset alone.",
  primaryToolId: "timezone-converter",
  relatedToolIds: ["unix-timestamp", "date-difference"],
  relatedResourceSlugs: ["unix-timestamp-explained", "iso-8601-date-format"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "iana",
      heading: "IANA names vs abbreviations",
      paragraphs: [
        "Prefer America/Chicago over CST abbreviation—CST also means China Standard Time. IANA database encodes historical DST rule changes governments announce sporadically.",
        "UTC, Etc/GMT, and Z suffix in ISO strings interchangeably mark reference timeline for storage.",
      ],
      linkedToolIds: ["timezone-converter"],
    },
    {
      id: "dst",
      heading: "Daylight saving transitions",
      paragraphs: [
        "Spring forward loses local hour; fall back repeats hour—scheduling '2:30 AM' on fall back day may be ambiguous. Use UTC for cron jobs spanning DST.",
        "Southern hemisphere DST opposite seasons—Sydney vs New York offset difference varies through year not constant.",
      ],
      linkedToolIds: ["timezone-converter"],
    },
    {
      id: "conversion-workflow",
      heading: "Reliable conversion workflow",
      paragraphs: [
        "Step one: identify instant (UTC timestamp or complete ISO string with offset). Step two: format in target zone for display. Never add fixed 5 hours without checking DST on that calendar date.",
        "Meeting invite should include UTC or dual cities: '15:00 UTC / 10:00 CT (Chicago)'.",
      ],
      linkedToolIds: ["timezone-converter", "unix-timestamp"],
    },
    {
      id: "iso-link",
      heading: "ISO 8601 offsets in strings",
      paragraphs: [
        "2026-05-23T14:30:00-05:00 embeds offset explicitly—parser converts to instant without guessing zone name. Z means UTC.",
        "Floating local time without offset ('2026-05-23T14:30:00') ambiguous—avoid in API contracts.",
      ],
      linkedToolIds: ["timezone-converter", "date-difference"],
    },
    {
      id: "pitfalls",
      heading: "Common scheduling pitfalls",
      paragraphs: [
        "Assuming all US states observe DST—Arizona mostly exempt. Assuming global DST same dates—EU US differ.",
        "Server cron in UTC misaligned with 'local midnight' job meaning—document which timezone defines business day cutoffs for analytics.",
      ],
      linkedToolIds: ["timezone-converter"],
    },
  ],
  examples: [
    {
      title: "NYC to London meeting",
      description: "10:00 America/New_York on 2026-06-15 → 15:00 Europe/London same instant (both on BST/EDT appropriately).",
    },
    {
      title: "DST gap",
      description: "US spring forward 2 AM → 3 AM—2:30 AM local does not exist that day; libraries shift or reject.",
    },
  ],
  commonMistakes: [
    "Using fixed UTC-5 for New York year-round.",
    "Conflicting CST abbreviations across countries.",
    "Storing local time strings without offset in database.",
    "Scheduling recurring local time through DST without UTC anchor.",
  ],
};

export const iso8601DateFormatResource: ResourceDefinition = {
  slug: "iso-8601-date-format",
  categorySlug: "time-date-tools",
  title: "ISO 8601 Date Format Explained",
  summary:
    "ISO 8601 standardizes dates as YYYY-MM-DD and times with optional timezone offsets for unambiguous exchange.",
  metaTitle: "ISO 8601 Date Format - Standard Explained",
  metaDescription:
    "Learn ISO 8601 date and datetime strings, sorting benefits, timezone offsets, and parsing in APIs and spreadsheets.",
  keywords: ["iso 8601 date format", "iso date string", "yyyy-mm-dd", "iso datetime"],
  quickAnswer:
    "ISO 8601 dates: YYYY-MM-DD (2026-05-23). Datetimes: YYYY-MM-DDTHH:mm:ss with optional offset +00:00 or Z for UTC. Format sorts lexicographically chronologically. Prefer ISO over MM/DD/YYYY in APIs and filenames to avoid locale ambiguity.",
  intro:
    "US-written 03/04/2024 confuses Europeans (April 3 vs March 4). ISO 8601 puts largest unit first—year, month, day—so string sort matches time order and human parsing stays unambiguous internationally. APIs standardize on ISO UTC instants; local offsets appended when needed. CSV exports and log aggregation benefit from ISO date prefixes in filenames (`2026-05-23-export.json`). Excel and Sheets import ISO strings reliably when cell format set text or proper locale import wizard. Duration format PT1H30M also exists in ISO 8601 for intervals separate from calendar datetimes.",
  primaryToolId: "date-difference",
  relatedToolIds: ["unix-timestamp", "timezone-converter"],
  relatedResourceSlugs: ["unix-timestamp-explained", "timezone-conversion-basics"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "date-form",
      heading: "Calendar date form",
      paragraphs: [
        "YYYY-MM-DD zero-padded month and day: 2026-05-03 not 2026-5-3 in strict interchange though parsers often lenient.",
        "Week date form 2026-W21-5 exists rarely in consumer apps—know W format if logistics APIs use it.",
      ],
      linkedToolIds: ["date-difference"],
    },
    {
      id: "datetime",
      heading: "Combined date and time",
      paragraphs: [
        "Separator T between date and time: 2026-05-23T14:30:00. Fractional seconds optional .123. Offset +02:00 or Z suffix for UTC.",
        "Without offset, datetime is 'local' or 'floating'—avoid in cross-system contracts lacking zone context.",
      ],
      linkedToolIds: ["date-difference", "timezone-converter"],
    },
    {
      id: "sorting",
      heading: "Sorting and filename conventions",
      paragraphs: [
        "Lexicographic sort on ISO date strings equals chronological sort—use in backup filenames, report exports, photo archives instead of MM-DD-YYYY.",
        "Database DATE columns map cleanly; store TIMESTAMP WITH TIME ZONE in Postgres for instants.",
      ],
      linkedToolIds: ["date-difference"],
    },
    {
      id: "parsing",
      heading: "Parsing in code and spreadsheets",
      paragraphs: [
        "JavaScript Date.parse generally accepts ISO subset; prefer explicit libraries (date-fns, Temporal) for edge cases. Excel VALUE() may misparse if locale not set—import as text then convert.",
        "Validate regex for API input: ^\\d{4}-\\d{2}-\\d{2}$ for date-only endpoints.",
      ],
      linkedToolIds: ["date-difference", "unix-timestamp"],
    },
    {
      id: "duration",
      heading: "Durations and intervals",
      paragraphs: [
        "ISO duration P1Y2M3DT4H5M6S mixes calendar and clock components—complex for billing; many apps use total seconds internally instead.",
        "Date difference tools compute civil day spans between calendar dates handling inclusive/exclusive end date policies explicitly.",
      ],
      linkedToolIds: ["date-difference"],
    },
  ],
  examples: [
    {
      title: "API timestamp field",
      description: '"updatedAt": "2026-05-23T18:45:00Z" — unambiguous UTC instant for all clients.',
    },
    {
      title: "Filename sort",
      description: "logs-2026-05-23.json sorts before logs-2026-06-01.json alphabetically chronologically.",
    },
  ],
  commonMistakes: [
    "Using MM/DD/YYYY in international API payloads.",
    "Omitting timezone on cross-border scheduled events.",
    "Non-zero-padded months breaking strict parsers.",
    "Confusing ISO date with US Excel serial date numbers.",
  ],
};

export const hexVsRgbColorResource: ResourceDefinition = {
  slug: "hex-vs-rgb-color",
  categorySlug: "design-tools",
  title: "Hex vs RGB Color Explained",
  summary:
    "Hex and RGB are equivalent ways to express sRGB colors—#RRGGBB vs rgb(r,g,b) each channel 0–255.",
  metaTitle: "Hex vs RGB Color - Web Design Reference",
  metaDescription:
    "Convert hex colors to RGB and CSS formats, understand alpha channels, and use color converter tools for design systems.",
  keywords: ["hex vs rgb", "hex color", "rgb css", "color converter web"],
  quickAnswer:
    "#RRGGBB hex encodes red, green, blue as two hex digits each (00–FF = 0–255). rgb(255, 0, 0) is the same red. #RGB shorthand doubles digits (#f00 = #ff0000). Alpha transparency: #RRGGBBAA or rgba(r,g,b,a).",
  intro:
    "Designers copy hex from Figma; CSS authors toggle rgb() when manipulating alpha in preprocessors. Both represent sRGB display colors on screens—not print CMYK. Six-digit hex dominates design token files; rgb() aids readability when explaining channel mixes in documentation. Modern CSS adds hex8 alpha and space-separated rgb syntax with slash alpha. Converting brand palette consistently across hex, rgb, and HSL prevents drift when multiple contributors hand-type values. Accessibility contrast checking consumes hex/rgb equally after normalization.",
  primaryToolId: "color-converter",
  relatedToolIds: ["contrast-checker"],
  relatedResourceSlugs: ["wcag-contrast-basics", "aspect-ratio-reference"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "hex-structure",
      heading: "Hex color structure",
      paragraphs: [
        "# prefix optional in some tools; CSS allows #ffffff case-insensitive though lowercase common in design systems. Channels concatenated RR then GG then BB.",
        "3-digit shorthand #abc expands #aabbcc—only when each pair duplicates. #abcd includes alpha in four-digit shorthand expanding to eight.",
      ],
      linkedToolIds: ["color-converter"],
    },
    {
      id: "rgb-css",
      heading: "RGB in CSS and design tools",
      paragraphs: [
        "rgb(255, 87, 51) readable channel tuning; rgba fourth argument 0–1 or percentage opacity. Modern: rgb(255 87 51 / 0.5) space syntax.",
        "Percentage rgb(100% 0% 0%) valid CSS alternative equal 255 red channel.",
      ],
      linkedToolIds: ["color-converter"],
    },
    {
      id: "conversion",
      heading: "Converting between hex and rgb",
      paragraphs: [
        "Split hex pairs, parse base16 to decimal: #ff5733 → rgb(255, 87, 51). Reverse: clamp channels 0–255, toString(16) pad two chars join.",
        "Floating point HSL round trips may off-by-one channel vs designer eyedropper—acceptable within 1/255 tolerance UI.",
      ],
      linkedToolIds: ["color-converter"],
    },
    {
      id: "alpha",
      heading: "Alpha transparency formats",
      paragraphs: [
        "Eight-digit hex #RRGGBBAA last byte alpha FF opaque 00 transparent. rgba(0,0,0,0.5) half black overlay on hero images.",
        "Premultiplied alpha in image assets separate concern from CSS color alpha on solid fills.",
      ],
      linkedToolIds: ["color-converter", "contrast-checker"],
    },
    {
      id: "design-system",
      heading: "Design tokens and naming",
      paragraphs: [
        "Store canonical hex in token JSON; generate rgb variables at build for programmatic lighten/darken. Document primary-500 hex once source of truth.",
        "Dark mode pairs need separate tokens not auto-invert naive hex math— perceptual HSL adjustments better.",
      ],
      linkedToolIds: ["color-converter"],
    },
  ],
  examples: [
    {
      title: "Brand orange",
      description: "#FF5733 ↔ rgb(255, 87, 51) ↔ hsl(11, 100%, 60%) same sRGB display.",
    },
    {
      title: "50% overlay",
      description: "rgba(0, 0, 0, 0.5) or #00000080 over white hero for readable white headline text.",
    },
  ],
  commonMistakes: [
    "Using 0–1 floats inside rgb() without rgba—invalid CSS.",
    "Confusing hex with HSL values when copying tokens.",
    "Ignoring color profile—hex sRGB assumed web; print CMYK differs.",
    "Shorthand #1234 misread as #11223344 vs invalid—validate length.",
  ],
};

export const wcagContrastBasicsResource: ResourceDefinition = {
  slug: "wcag-contrast-basics",
  categorySlug: "design-tools",
  title: "WCAG Contrast Basics",
  summary:
    "WCAG contrast ratio compares foreground and background luminance—4.5:1 minimum for normal text, 3:1 for large text.",
  metaTitle: "WCAG Contrast Basics - Accessible Color Guide",
  metaDescription:
    "Learn WCAG AA contrast ratios, testing text on backgrounds, and fixing failures with contrast checker tools.",
  keywords: ["wcag contrast", "color contrast ratio", "accessibility contrast", "aa contrast"],
  quickAnswer:
    "WCAG 2.x contrast ratio ranges 1:1 to 21:1. Level AA requires 4.5:1 for normal text (<18pt or <14pt bold) and 3:1 for large text. UI components and graphics need 3:1 against adjacent colors. Use contrast checker on final hex pairs including alpha composited over background.",
  intro:
    "Low-contrast gray-on-gray body copy excludes readers with low vision and fails WCAG audits for public sector and conscientious product teams. Contrast ratio computes from relative luminance of sRGB colors—not hue preference—so thin mint on white may fail while navy on white passes easily. Designers test primary text, secondary muted text, button labels, focus rings, and placeholder text against actual backgrounds, not isolated swatches. Dark mode reverses assumptions: white text on near-black may pass, but secondary #888 on #121212 often fails. Automated checkers sample computed CSS after alpha blend; manual review catches gradient text and image overlays.",
  primaryToolId: "contrast-checker",
  relatedToolIds: ["color-converter"],
  relatedResourceSlugs: ["hex-vs-rgb-color", "aspect-ratio-reference"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "ratio-math",
      heading: "What contrast ratio measures",
      paragraphs: [
        "Luminance formula weights green channel heavily matching human perception. Ratio (L1 + 0.05) / (L2 + 0.05) where L1 lighter. Pure black on white 21:1.",
        "Ratio is symmetric swapping fg/bg. Transparent text blends with backdrop first—checker must composite alpha.",
      ],
      linkedToolIds: ["contrast-checker"],
    },
    {
      id: "levels",
      heading: "AA vs AAA thresholds",
      paragraphs: [
        "AA normal text 4.5:1 industry common compliance target. AAA 7:1 stricter optional body text. Large text AA 3:1—18pt+ regular or 14pt+ bold approximations.",
        "Non-text UI graphical objects 3:1 minimum under WCAG 2.2 SC 1.4.11—icons, form borders, chart lines.",
      ],
      linkedToolIds: ["contrast-checker"],
    },
    {
      id: "testing",
      heading: "Testing workflow in design and dev",
      paragraphs: [
        "Figma plugins and browser DevTools sample token pairs. Test hover/focus/disabled states—not only default. Placeholder text must meet contrast or risk form accessibility failure.",
        "Brand palettes define accessible primary-on-white and primary-on-dark pairs upfront avoiding late redesign.",
      ],
      linkedToolIds: ["contrast-checker", "color-converter"],
    },
    {
      id: "fixes",
      heading: "Fixing failures without abandoning brand",
      paragraphs: [
        "Darken text or lighten background slightly—small luminance shift often crosses 4.5 threshold. Increase font weight/size to qualify as large text 3:1 where appropriate.",
        "Avoid pure #777 secondary on white; bump to #595959 neighborhood for AA normal text approximations.",
      ],
      linkedToolIds: ["contrast-checker", "color-converter"],
    },
    {
      id: "beyond-color",
      heading: "Contrast is necessary not sufficient",
      paragraphs: [
        "WCAG also requires focus visibility, not color alone for state, keyboard access. Contrast pass with tiny 10px text still poor UX—respect minimum readable sizes.",
        "Video captions and motion reduction separate criteria—color contrast one pillar of broader a11y program.",
      ],
      linkedToolIds: ["contrast-checker"],
    },
  ],
  examples: [
    {
      title: "Body text pass",
      description: "#212529 on #FFFFFF ≈ 16:1 passes AA and AAA normal text.",
    },
    {
      title: "Muted fail fix",
      description: "#999 on #fff ≈ 2.85:1 fails—darken to #767676 ≈ 4.54:1 for AA normal.",
    },
  ],
  commonMistakes: [
    "Testing hex on checker without alpha compositing over photo background.",
    "Assuming brand color pass applies to all derived tints without retest.",
    "Ignoring disabled button contrast—WCAG still expects readable or distinct pattern.",
    "Using color alone to convey error state without icon or text label.",
  ],
};

export const aspectRatioReferenceResource: ResourceDefinition = {
  slug: "aspect-ratio-reference",
  categorySlug: "design-tools",
  title: "Aspect Ratio Reference for Images",
  summary:
    "Aspect ratio is width divided by height—common ratios include 16:9 video, 4:3 photos, 1:1 social squares, and 1.91:1 Open Graph.",
  metaTitle: "Aspect Ratio Reference - Image Dimensions Guide",
  metaDescription:
    "Common aspect ratios for video, social, print, and web images with resize guidance and image resizer tool links.",
  keywords: ["aspect ratio reference", "image aspect ratio", "16:9 4:3", "resize aspect ratio"],
  quickAnswer:
    "Aspect ratio = width ÷ height. 16:9 = 1.78 widescreen. 4:3 = 1.33 classic. 1:1 square. 3:2 DSLR photo. Maintain ratio when resizing to avoid stretch—crop or letterbox intentionally. Social: OG 1.91:1 (~1200×630), Instagram square 1:1, Stories 9:16.",
  intro:
    "Wrong aspect ratio distorts logos, stretches faces, and crops critical text in social previews. Responsive web images use width descriptors with fixed ratio containers to prevent layout shift. Video players default 16:9; vertical Shorts 9:16. Print frames 4×6 inches same 3:2 ratio as digital 3000×2000 px exports. Image resizers lock ratio when scaling down for thumbnails or enforce crop window for hero banners. Designers document ratio tokens alongside pixel dimensions so developers implement CSS aspect-ratio property consistently.",
  primaryToolId: "image-resizer",
  relatedToolIds: ["open-graph-preview", "color-converter"],
  relatedResourceSlugs: ["hex-vs-rgb-color", "wcag-contrast-basics"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "common-ratios",
      heading: "Common aspect ratios and uses",
      paragraphs: [
        "16:9 HD video, YouTube embeds, presentation slides widescreen. 4:3 legacy slides and tablets. 1:1 Instagram feed posts profile grids. 9:16 vertical Reels TikTok Stories.",
        "3:2 35mm photo print standard. 2:3 Pinterest pins vertical. 21:9 ultrawide cinematic letterbox.",
      ],
      linkedToolIds: ["image-resizer"],
    },
    {
      id: "social-og",
      heading: "Open Graph and platform-specific sizes",
      paragraphs: [
        "OG recommended 1200×630 px (1.91:1). Twitter summary_large_image similar. LinkedIn shares OG tags. Platform safe zones avoid critical text at crop edges on mobile.",
        "Profile avatars often square circle-cropped—center face in 1:1 source.",
      ],
      linkedToolIds: ["image-resizer", "open-graph-preview"],
    },
    {
      id: "resize-crop",
      heading: "Resize vs crop vs letterbox",
      paragraphs: [
        "Lock aspect ratio scale: reduce 4000×3000 (4:3) to 800×600 maintaining proportion. Changing ratio requires crop (remove pixels) or letterbox/pillarbox padding bars.",
        "Object-fit CSS cover fills container cropping overflow; contain shows full image with possible bars.",
      ],
      linkedToolIds: ["image-resizer"],
    },
    {
      id: "css",
      heading: "CSS aspect-ratio and layout stability",
      paragraphs: [
        "aspect-ratio: 16 / 9 on wrapper reserves space before image load reducing CLS Core Web Vitals penalty. Pair with width 100% height auto img.",
        "Art direction picture element serves cropped 1:1 vs 16:9 sources at breakpoints—not one stretched image.",
      ],
      linkedToolIds: ["image-resizer"],
    },
    {
      id: "print-web",
      heading: "Print DPI vs screen pixels",
      paragraphs: [
        "Ratio independent of DPI—8×10 inch print 4:5 ratio equals 2400×3000 px at 300 DPI export. Do not confuse pixel count with ratio.",
        "Upscale low-res image to correct ratio canvas without source pixels does not add detail—shoot or source adequate native resolution.",
      ],
      linkedToolIds: ["image-resizer"],
    },
  ],
  examples: [
    {
      title: "16:9 thumbnail",
      description: "1280×720 and 1920×1080 both 16:9—scale between without crop.",
    },
    {
      title: "Square crop from DSLR",
      description: "4000×2667 (3:2) center crop 2667×2667 loses horizontal wings for Instagram post.",
    },
  ],
  commonMistakes: [
    "Stretching image to fit banner without crop.",
    "Uploading square logo as OG image for wide card layout.",
    "Ignoring EXIF orientation showing wrong effective ratio.",
    "Mixing aspect ratio with file size KB when optimizing delivery.",
  ],
};
