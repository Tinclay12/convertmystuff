import type { ResourceDefinition } from "@/lib/content/types";

export const yamlVsJsonResource: ResourceDefinition = {
  slug: "yaml-vs-json",
  categorySlug: "developer-tools",
  title: "YAML vs JSON Explained",
  summary:
    "YAML and JSON both serialize structured data; JSON is stricter and universal for APIs, while YAML favors human-readable config files.",
  metaTitle: "YAML vs JSON - When to Use Each Format",
  metaDescription:
    "Compare YAML and JSON syntax, tooling, and use cases for config files, CI pipelines, and API payloads with conversion tool links.",
  keywords: ["yaml vs json", "yaml json difference", "config yaml", "json api format"],
  quickAnswer:
    "JSON uses braces, brackets, and double-quoted keys for machine-friendly data exchange—especially APIs. YAML uses indentation and minimal punctuation for human-edited config files like Docker Compose and GitHub Actions. YAML is a superset in practice but many YAML files subset to JSON-compatible structures. Convert between them when migrating configs or validating equivalence.",
  intro:
    "Developers encounter YAML in Kubernetes manifests, CI workflows, and Ansible playbooks, while JSON dominates REST APIs and browser JavaScript objects. Both represent maps, lists, strings, numbers, and booleans, but ergonomics differ: YAML tolerates comments and multiline strings; JSON forbids comments and requires strict quoting rules that parsers enforce uniformly. Choosing the wrong format creates friction—JSON in hand-edited config lacks comments; YAML in API responses adds parsing complexity without readability wins. Understanding equivalence, pitfalls like YAML's ambiguous boolean yes/no, and safe conversion workflows keeps pipelines reliable when teams standardize on one format or bridge both during migrations.",
  primaryToolId: "yaml-to-json",
  relatedToolIds: ["json-to-yaml", "json-formatter", "json-validator"],
  relatedResourceSlugs: ["xml-vs-json-for-data-exchange", "what-is-json"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "syntax",
      heading: "Syntax and readability differences",
      paragraphs: [
        "JSON objects use `{ \"key\": \"value\" }` with double quotes mandatory on keys and strings. Arrays use `[1, 2, 3]`. No comments, no trailing commas in strict parsers.",
        "YAML relies on indentation (spaces, not tabs) to nest maps and lists. Scalars can be unquoted when unambiguous. `# comments` help document config intent inline—major reason YAML wins for ops files edited in Git.",
      ],
      linkedToolIds: ["yaml-to-json", "json-to-yaml"],
    },
    {
      id: "use-cases",
      heading: "Typical use cases for each format",
      paragraphs: [
        "JSON: HTTP API request/response bodies, package.json, structured logs, NoSQL document storage, JSON Schema validation. Universal JavaScript native support via JSON.parse.",
        "YAML: Kubernetes, Docker Compose, GitHub Actions, CircleCI, Ansible variables, Swagger/OpenAPI sometimes authored in YAML then compiled to JSON. Human review in pull requests benefits from reduced punctuation noise.",
      ],
      linkedToolIds: ["yaml-to-json", "json-to-yaml"],
    },
    {
      id: "pitfalls",
      heading: "YAML-specific pitfalls JSON avoids",
      paragraphs: [
        "YAML 1.1 treated yes/no/on/off as booleans in some parsers—dangerous for strings like country codes. Quote ambiguous scalars. Tabs in indentation break parsers silently or with cryptic line numbers.",
        "Multiline strings and anchors (`&`, `*`) add power but reduce portability to JSON. JSON's strictness is a feature for cross-language API contracts—predictable parsing beats expressive config when machines primarily consume data.",
      ],
      linkedToolIds: ["yaml-to-json", "json-validator"],
    },
    {
      id: "conversion",
      heading: "Converting YAML to JSON and back",
      paragraphs: [
        "Round-trip conversion preserves data for JSON-compatible YAML subsets. Comments, anchors, and custom tags may be lost converting YAML→JSON→YAML. Use conversion to inspect YAML as JSON in browser devtools or validate structure with JSON Schema tools.",
        "CI pipelines sometimes lint YAML then emit JSON artifacts for runtime consumption. Store source in YAML for humans, build step outputs JSON for apps—document which file is authoritative.",
      ],
      linkedToolIds: ["yaml-to-json", "json-to-yaml", "json-formatter"],
    },
    {
      id: "choosing",
      heading: "How to choose for new projects",
      paragraphs: [
        "Default API payloads to JSON unless clients require something else. Choose YAML when non-developers edit config, comments are essential, or ecosystem tooling expects YAML (K8s).",
        "For shared schemas, OpenAPI and JSON Schema bridge both worlds—author in preferred format, generate the other in build. Avoid storing duplicate divergent copies without automation syncing them.",
      ],
      linkedToolIds: ["yaml-to-json", "json-to-yaml"],
    },
  ],
  examples: [
    {
      title: "Same config in both formats",
      description:
        "YAML: `server:\\n  port: 8080\\n  debug: true` converts to JSON `{\"server\":{\"port\":8080,\"debug\":true}}` for programmatic consumption.",
    },
    {
      title: "GitHub Actions workflow",
      description:
        "Workflow files stay YAML for comment-documented steps; action outputs may serialize matrix values as JSON strings for downstream jobs.",
    },
  ],
  commonMistakes: [
    "Using unquoted yes/no in YAML intended as strings.",
    "Mixing tabs and spaces in YAML indentation.",
    "Expecting comments to survive YAML→JSON→YAML round trip.",
    "Sending YAML bodies to APIs expecting application/json Content-Type.",
  ],
};

export const whatIsBase64Resource: ResourceDefinition = {
  slug: "what-is-base64",
  categorySlug: "developer-tools",
  title: "What Is Base64 Encoding?",
  summary:
    "Base64 encodes binary data as ASCII text using 64 safe characters, enabling transport in JSON, email, and URLs.",
  metaTitle: "What Is Base64? Encoding Explained for Developers",
  metaDescription:
    "Learn Base64 encoding, common use cases in APIs and data URLs, padding rules, and free encode/decode tools.",
  keywords: ["what is base64", "base64 encoding", "base64 explained", "encode binary text"],
  quickAnswer:
    "Base64 represents binary data using 64 printable ASCII characters (A–Z, a–z, 0–9, +, /) plus padding `=` as needed. It is encoding, not encryption—anyone can decode it. Common uses: embedding small images in HTML/CSS data URLs, carrying binary in JSON strings, and email MIME attachments.",
  intro:
    "APIs and web platforms often require text-safe payloads even when content is inherently binary—images, PDF bytes, or encrypted ciphertext. Base64 transforms arbitrary bytes into a larger ASCII string that survives JSON, XML, and email systems that are not binary-clean. The size overhead is roughly 33 percent, which matters for large files but is acceptable for thumbnails, tokens, and short binary blobs. Developers also confuse Base64 with hashing or encryption; decoding is trivial with public tools, so never treat Base64 alone as security. Understanding alphabet variants (URL-safe Base64 replacing +/ ) prevents subtle production bugs in query strings and JWT segments.",
  primaryToolId: "base64-encode",
  relatedToolIds: ["base64-decode", "url-encode"],
  relatedResourceSlugs: ["url-encoding-explained", "yaml-vs-json"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "mechanics",
      heading: "How Base64 encoding works",
      paragraphs: [
        "Input bytes split into 6-bit groups, each mapped to one of 64 characters. Three bytes (24 bits) become four Base64 characters. Remainder bytes get padding with one or two `=` signs so decoders restore original length.",
        "Decoding reverses the mapping, reconstructing binary from character sequence. Invalid characters or incorrect padding produce decode errors in strict libraries—use validated test vectors when implementing pipelines.",
      ],
      linkedToolIds: ["base64-encode", "base64-decode"],
    },
    {
      id: "use-cases",
      heading: "Common developer use cases",
      paragraphs: [
        "Data URLs in HTML/CSS: `data:image/png;base64,...` embeds small icons without separate HTTP requests. JSON APIs carry file uploads as Base64 strings when multipart form is unavailable.",
        "Basic authentication headers encode `username:password` (prefer OAuth in production). Email MIME encodes attachments. Some databases store binary columns as Base64 in export dumps—convenience, not compression.",
      ],
      linkedToolIds: ["base64-encode"],
    },
    {
      id: "url-safe",
      heading: "Standard vs URL-safe Base64",
      paragraphs: [
        "Standard Base64 uses `+` and `/`, which need URL encoding in query parameters. URL-safe variant replaces with `-` and `_`, often omitting padding in JWT and cookie contexts per spec.",
        "Mixing variants breaks decode. Document which alphabet your API expects; convert before placing Base64 in URL paths or query values alongside percent-encoding rules.",
      ],
      linkedToolIds: ["base64-encode", "url-encode"],
    },
    {
      id: "not-encryption",
      heading: "Encoding is not encryption or hashing",
      paragraphs: [
        "Base64 is reversible encoding with public algorithms—do not store secrets 'protected' by Base64 alone. Combine TLS in transit, proper encryption at rest, and secret management for credentials.",
        "Developers sometimes Base64-wrap already-encrypted bytes for transport—that is fine if encryption happened first. Order matters: encrypt then encode for wire format; decode then decrypt on receipt.",
      ],
      linkedToolIds: ["base64-encode", "base64-decode"],
    },
    {
      id: "performance",
      heading: "Size, performance, and alternatives",
      paragraphs: [
        "33% overhead plus decode CPU makes Base64 poor for large media at scale—prefer binary multipart uploads, object storage signed URLs, or dedicated CDN paths for big assets.",
        "For small inline assets and config snippets, overhead is negligible. gzip then Base64 rarely helps text JSON; binary compression before Base64 can help email size limits on attachments.",
      ],
      linkedToolIds: ["base64-encode"],
    },
  ],
  examples: [
    {
      title: "Hello encoding",
      description: "ASCII 'Hello' encodes to 'SGVsbG8='—demonstrates padding on non-multiple-of-three length input.",
    },
    {
      title: "JSON image field",
      description: "API returns `{ \"thumbnail\": \"iVBORw0KGgo...\" }` where value is Base64 PNG bytes decoded client-side to blob URL.",
    },
  ],
  commonMistakes: [
    "Treating Base64 as encryption for passwords or API keys.",
    "Using standard Base64 unencoded in URL query strings.",
    "Forgetting charset—encode UTF-8 bytes before Base64, not raw Unicode code point strings inconsistently.",
    "Assuming decode success means valid file—validate magic bytes after decode.",
  ],
};

export const csvEncodingAndExcelResource: ResourceDefinition = {
  slug: "csv-encoding-and-excel",
  categorySlug: "developer-tools",
  title: "CSV Encoding and Excel Compatibility",
  summary:
    "CSV files need consistent character encoding and delimiter conventions or Excel and import tools misread columns and special characters.",
  metaTitle: "CSV Encoding & Excel - UTF-8, BOM, Delimiters",
  metaDescription:
    "Fix garbled CSV imports in Excel, understand UTF-8 BOM, delimiters, and quoting with CSV-to-JSON conversion guidance.",
  keywords: ["csv encoding excel", "csv utf-8 bom", "excel csv import", "csv delimiter"],
  quickAnswer:
    "Save CSV as UTF-8; add UTF-8 BOM (byte order mark) if Excel on Windows mangles accented characters on double-click open. Use comma delimiter in US locale; semicolon in some European Excel locales. Quote fields containing commas, quotes, or newlines. CSV is not a single rigid standard—document encoding and delimiter for each export.",
  intro:
    "CSV looks deceptively simple until accented names, currency symbols, or JSON embedded in cells break after round-tripping through Excel. Spreadsheet apps infer encoding and separators from regional settings—German Excel may expect semicolon delimiters while US tools assume commas. Developers exporting user data for business teams must specify UTF-8, optional BOM for Excel friendliness, RFC 4180-style quoting rules, and consistent line endings (LF vs CRLF). Converting CSV to JSON for pipelines avoids some Excel quirks but shifts responsibility to schema validation and nested field handling instead.",
  primaryToolId: "csv-to-json",
  relatedToolIds: ["json-to-csv", "nested-json-to-csv", "json-formatter"],
  relatedResourceSlugs: ["yaml-vs-json", "xml-vs-json-for-data-exchange"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "utf8-bom",
      heading: "UTF-8 and the Excel BOM issue",
      paragraphs: [
        "UTF-8 encodes international text universally. Excel on Windows often assumes legacy ANSI when opening CSV by double-click, corrupting é, ñ, or currency symbols. Prepending UTF-8 BOM (bytes EF BB BF) signals Unicode to Excel without breaking most Unix tools.",
        "Unix-first pipelines sometimes reject BOM as first-field corruption—generate BOM only for Excel-targeted exports. Document which export profile consumers receive.",
      ],
      linkedToolIds: ["csv-to-json", "json-to-csv"],
    },
    {
      id: "delimiters",
      heading: "Delimiters and regional Excel settings",
      paragraphs: [
        "RFC 4180 style uses comma field separators and double-quote quoting. European locales may use semicolon because comma is decimal separator in UI. Mismatch shifts columns silently—validate header row after import.",
        "Tab-separated values (TSV) reduce comma conflicts in free-text fields but confuse users who rename .tsv to .csv without informing importers.",
      ],
      linkedToolIds: ["csv-to-json"],
    },
    {
      id: "quoting",
      heading: "Quoting, escaping, and embedded newlines",
      paragraphs: [
        "Fields with commas must be wrapped in double quotes; internal quotes escaped by doubling (`\"\"`). Multiline addresses belong in quoted fields—single-line parsers break otherwise.",
        "Leading zeros in ZIP codes and phone numbers require text formatting or quote wrapping so Excel does not strip zeros to numbers. Prefix tab trick deprecated—prefer explicit text column import wizard.",
      ],
      linkedToolIds: ["csv-to-json", "json-to-csv"],
    },
    {
      id: "excel-workflow",
      heading: "Reliable Excel import workflow",
      paragraphs: [
        "Instead of double-click, use Data → From Text/CSV in Excel to pick UTF-8 encoding and delimiter explicitly. Power Query remembers steps for repeatable reports.",
        "For automated pipelines, skip Excel entirely: convert CSV to JSON programmatically, validate schema, load warehouse. Human review exports get BOM and README with open instructions.",
      ],
      linkedToolIds: ["csv-to-json"],
    },
    {
      id: "json-bridge",
      heading: "Using JSON conversion to reduce ambiguity",
      paragraphs: [
        "CSV-to-JSON preserves field names as keys, clarifying nested intent when moving to APIs. Reverse JSON-to-CSV for download must flatten arrays and pick column order deliberately.",
        "Large CSV files may choke browser converters—sample first rows in dev tools before full client-side conversion in production UX.",
      ],
      linkedToolIds: ["csv-to-json", "json-to-csv", "nested-json-to-csv"],
    },
  ],
  examples: [
    {
      title: "Name with accent",
      description:
        "UTF-8 'José' without BOM may display 'JosÃ©' in Excel double-click open; UTF-8 BOM file opens correctly.",
    },
    {
      title: "Address with comma",
      description:
        "\"123 Main St, Apt 4\",Springfield,IL requires quotes so comma in street does not split column.",
    },
  ],
  commonMistakes: [
    "Exporting Latin-1 then labeling UTF-8 in documentation.",
    "Semicolon CSV opened in US Excel without import wizard.",
    "Unquoted JSON blobs in CSV cells breaking comma structure.",
    "Stripping leading zeros by opening CSV as numbers not text.",
  ],
};

export const xmlVsJsonResource: ResourceDefinition = {
  slug: "xml-vs-json-for-data-exchange",
  categorySlug: "developer-tools",
  title: "XML vs JSON for Data Exchange",
  summary:
    "XML and JSON both represent structured data; JSON is leaner for modern APIs while XML remains in enterprise, document, and legacy integrations.",
  metaTitle: "XML vs JSON for Data Exchange - Developer Guide",
  metaDescription:
    "Compare XML and JSON for APIs and integrations, covering schema, verbosity, parsing, and xml-to-json conversion workflows.",
  keywords: ["xml vs json", "data exchange formats", "xml json api", "convert xml json"],
  quickAnswer:
    "JSON uses lightweight objects and arrays native to JavaScript, dominating REST APIs. XML uses nested tagged elements with attributes, common in SOAP, RSS, SVG, and legacy enterprise systems. JSON is typically smaller and faster to parse; XML offers schema (XSD), namespaces, and mixed content models JSON does not replicate one-to-one.",
  intro:
    "Integration architects still bridge XML feeds from banks, insurers, and government systems into JSON-first microservices. Choosing format affects parser choice, validation strategy, payload size, and developer ergonomics. JSON Schema and OpenAPI describe JSON contracts; XML Schema (XSD) and DTD validate XML structures with attributes and ordered mixed content. Blind xml-to-json conversion flattens attributes and text nodes differently depending on tool—document mapping rules for production ETL. Neither format is inherently superior; alignment with partner systems, tooling, and validation requirements drives selection.",
  primaryToolId: "xml-to-json",
  relatedToolIds: ["json-to-xml", "json-formatter", "yaml-to-json"],
  relatedResourceSlugs: ["yaml-vs-json", "csv-encoding-and-excel"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "structure",
      heading: "Structural model differences",
      paragraphs: [
        "JSON: objects (maps), arrays, strings, numbers, booleans, null. No attributes; metadata lives as sibling keys. XML: elements, attributes, text nodes, namespaces, comments, processing instructions—richer document model suited to markup (HTML, SVG) and mixed content.",
        "Converting XML with attributes to JSON often maps attributes to `@attribute` keys or nested `_attributes` objects depending on library—standardize one convention per pipeline.",
      ],
      linkedToolIds: ["xml-to-json", "json-to-xml"],
    },
    {
      id: "verbosity",
      heading: "Verbosity, parsing, and performance",
      paragraphs: [
        "XML tags repeat opening/closing names, inflating size versus JSON for equivalent data graphs. Streaming SAX parsers handle huge XML; JSON typically loads full tree in memory for simplicity unless using JSON lines streaming.",
        "Mobile and browser clients prefer JSON payload size for latency. Batch mainframe XML files may prioritize schema validation over bytes on wire.",
      ],
      linkedToolIds: ["xml-to-json", "json-formatter"],
    },
    {
      id: "schema",
      heading: "Schema validation and contracts",
      paragraphs: [
        "XSD enforces element order, attribute requirements, and complex types in XML ecosystems. JSON Schema validates JSON types and required keys with growing OpenAPI adoption for HTTP APIs.",
        "When partners supply XSD, generate bindings or convert to JSON once at ingress with validation at boundary—do not silently drop mandatory attributes in mapping.",
      ],
      linkedToolIds: ["xml-to-json", "json-validator"],
    },
    {
      id: "legacy",
      heading: "Legacy enterprise and modern API coexistence",
      paragraphs: [
        "SOAP web services, HL7 healthcare messages, RSS/Atom feeds, and office document formats (DOCX internals) remain XML-heavy. Greenfield REST APIs almost default JSON.",
        "Middleware converts XML↔JSON at gateway; maintain canonical internal format (usually JSON) to reduce dual code paths in application logic.",
      ],
      linkedToolIds: ["xml-to-json", "json-to-xml"],
    },
    {
      id: "conversion",
      heading: "Safe xml-to-json conversion practices",
      paragraphs: [
        "Handle repeated elements: XML allows duplicate sibling tags; JSON arrays must represent them explicitly. Single-child vs array ambiguity breaks naive converters—use rules for always-array paths.",
        "Test round-trip on representative payloads including namespaces, CDATA sections, and empty elements. Human-readable xml-to-json in browser helps debug partner payloads before automating.",
      ],
      linkedToolIds: ["xml-to-json", "json-formatter"],
    },
  ],
  examples: [
    {
      title: "User record XML to JSON",
      description:
        "<user id=\"5\"><name>Ada</name></user> may become {\"user\":{\"@id\":\"5\",\"name\":\"Ada\"}} depending on attribute mapping policy.",
    },
    {
      title: "RSS feed item list",
      description:
        "Repeated <item> elements convert to JSON array items[] for mobile app consumption while preserving title and link fields.",
    },
  ],
  commonMistakes: [
    "Assuming xml-to-json output is universal across libraries without testing.",
    "Dropping XML namespaces that disambiguate colliding tag names.",
    "Choosing XML for new public APIs without partner mandate.",
    "Embedding large binary in XML without MTOM/Base64 strategy.",
  ],
};

export const urlEncodingExplainedResource: ResourceDefinition = {
  slug: "url-encoding-explained",
  categorySlug: "developer-tools",
  title: "URL Encoding Explained",
  summary:
    "URL encoding (percent-encoding) replaces unsafe ASCII characters in URLs with %XX hex codes so links parse correctly.",
  metaTitle: "URL Encoding Explained - Percent-Encoding Guide",
  metaDescription:
    "Learn URL encoding rules, query string encoding, plus vs %20, and when to use encodeURIComponent with free tools.",
  keywords: ["url encoding", "percent encoding", "encode uri component", "query string encoding"],
  quickAnswer:
    "URL encoding represents characters as `%` followed by two hexadecimal digits (e.g., space → `%20` or `+` in query strings historically). encodeURIComponent encodes query parameter values; encodeURI preserves URL structure characters. Encode user input before inserting into URLs to avoid broken links and injection issues.",
  intro:
    "URLs allow only a limited ASCII character set unescaped; spaces, ampersands, unicode emoji, and non-Latin scripts require percent-encoding for reliable HTTP requests. Developers encode query parameters when building search links, OAuth redirects, and tracking URLs. Confusion between encodeURI, encodeURIComponent, and form application/x-www-form-urlencoded rules causes double-encoding or broken decoding— `%2520` instead of `%20`. HTML form submission, JavaScript fetch APIs, and server frameworks each expose encoding helpers; use the right layer for path vs query vs fragment components.",
  primaryToolId: "url-encode",
  relatedToolIds: ["url-decode", "base64-encode"],
  relatedResourceSlugs: ["what-is-base64", "yaml-vs-json"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "rules",
      heading: "Which characters get encoded",
      paragraphs: [
        "Reserved characters like `?`, `&`, `=`, `#`, `/` have syntactic meaning in URLs—encode them in data values but not when they separate URL parts structurally. Unreserved alphanumerics and `-_.~` typically pass through.",
        "Unicode text UTF-8 encodes to bytes then each byte percent-encoded—emoji and CJK characters become long percent sequences, normal and expected.",
      ],
      linkedToolIds: ["url-encode", "url-decode"],
    },
    {
      id: "query-strings",
      heading: "Query strings and form semantics",
      paragraphs: [
        "HTML forms historically encode spaces as `+` in application/x-www-form-urlencoded bodies; URLs in address bar use `%20`. Modern encodeURIComponent uses `%20` for spaces—know consumer expectations when parsing.",
        "Multiple values for same key (`tag=a&tag=b`) require consistent server parsing. Encode keys and values separately before joining with `&`.",
      ],
      linkedToolIds: ["url-encode", "url-decode"],
    },
    {
      id: "js-apis",
      heading: "encodeURI vs encodeURIComponent",
      paragraphs: [
        "encodeURI escapes illegal characters in full URI but preserves `:/?#[]@!$&'()*+,;=` needed for structure—use for whole URL strings with existing delimiters.",
        "encodeURIComponent encodes nearly everything including structure chars—use for individual query parameter values inserted into template URLs.",
      ],
      linkedToolIds: ["url-encode"],
    },
    {
      id: "security",
      heading: "Encoding and security context",
      paragraphs: [
        "Encoding is not validation—sanitize and validate decoded input server-side against injection and open redirect attacks. Overly permissive redirect_uri parameters exploit decoding inconsistencies.",
        "Log decoded values for debugging but store canonical encoded form in analytics when comparing duplicate detection—double-encoding skews reports.",
      ],
      linkedToolIds: ["url-encode", "url-decode"],
    },
    {
      id: "debugging",
      heading: "Debugging broken links",
      paragraphs: [
        "Symptoms: truncated query, split email addresses at `@`, broken plus signs in phone numbers. Decode in browser devtools Network tab; compare raw vs displayed URL.",
        "UTM campaigns and affiliate tags fail attribution when `&` inside unencoded campaign names splits parameters—encode marketing copy pasted into query builders.",
      ],
      linkedToolIds: ["url-encode", "url-decode"],
    },
  ],
  examples: [
    {
      title: "Search query coffee & tea",
      description:
        "Value must encode ampersand: `q=coffee+%26+tea` or `q=coffee%20%26%20tea` so parser does not treat `&` as new parameter.",
    },
    {
      title: "Redirect with email",
      description:
        "login@example.com in query → login%40example.com to preserve @ in value portion.",
    },
  ],
  commonMistakes: [
    "Double-encoding already encoded strings.",
    "Using encodeURI on individual query values, leaving & unescaped.",
    "Assuming + always means space outside form-urlencoded context.",
    "Mixing encodeURIComponent output with manually appended unencoded fragments.",
  ],
};

export const roofingSquaresResource: ResourceDefinition = {
  slug: "how-to-estimate-roofing-squares",
  categorySlug: "construction-calculators",
  title: "How to Estimate Roofing Squares",
  summary:
    "A roofing square equals 100 square feet of roof area; material estimates count squares, not flat footprint alone.",
  metaTitle: "How to Estimate Roofing Squares - Guide",
  metaDescription:
    "Learn roofing square measurement, pitch factors, waste allowances, and shingle ordering with a free roofing calculator.",
  keywords: ["roofing squares", "estimate roofing squares", "roof square feet", "shingle squares"],
  quickAnswer:
    "One roofing square = 100 sq ft of roof surface. Calculate each roof plane area (length × width adjusted for pitch), sum planes, divide by 100 for squares. Add 10–15% waste for cuts, hips, and valleys. Steeper pitch increases actual surface area versus flat footprint.",
  intro:
    "Roofing suppliers quote shingles, underlayment, and labor per square because pitched roofs cover more area than house footprint suggests. DIY estimators measuring ground footprint underestimate material unless pitch factor adjusts surface length. Complex roofs split into rectangles, trapezoids, and triangles per plane. Waste factor accounts for starter strips, ridge caps, valley overlap, and cut loss around dormers. Understanding squares language prevents ordering three bundles short mid-job or overbuying on simple gable roofs where calculator defaults suffice with modest waste buffer.",
  primaryToolId: "roofing-calculator",
  relatedToolIds: ["square-feet-to-acres"],
  relatedResourceSlugs: ["board-feet-explained", "mulch-coverage-guide"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "definition",
      heading: "What a roofing square means",
      paragraphs: [
        "One square covers 100 square feet of roof deck area, regardless of shingle type. Three-tab bundles historically covered ~33.3 sq ft each—three bundles per square; architectural shingles may need four bundles per square depending on exposure and manufacturer spec.",
        "Squares unify estimating across crew conversations, supplier invoices, and permit documentation—convert all plane measurements to squares before comparing bids.",
      ],
      linkedToolIds: ["roofing-calculator"],
    },
    {
      id: "pitch",
      heading: "Pitch and slope area adjustment",
      paragraphs: [
        "Roof pitch (rise over 12 run) increases surface area versus horizontal projection. A 6/12 pitch multiplies footprint area by roughly pitch factor near 1.12; 12/12 steeper approaches 1.41. Use pitch table or calculator rather than guessing.",
        "Walkable 4/12 to 6/12 common on residential; steep roofs add labor cost beyond material squares alone. Measure slope on each plane—cross-gable designs mix pitches.",
      ],
      linkedToolIds: ["roofing-calculator"],
    },
    {
      id: "measuring",
      heading: "Measuring planes and features",
      paragraphs: [
        "Break roof into rectangles and triangles; measure eave length, ridge length, and slope distance. Dormers, shed roofs, and porches add separate planes. Satellite imagery helps initial estimate; confirm on ladder or drone for order accuracy.",
        "Hips and valleys consume extra cap and valley metal—some estimators add lineal feet waste separately from field squares.",
      ],
      linkedToolIds: ["roofing-calculator"],
    },
    {
      id: "waste",
      heading: "Waste factors and complexity",
      paragraphs: [
        "Simple gable roof: 10% waste often enough. Complex cut-up roof with multiple valleys: 12–15% or more. Re-roof over existing may change tear-off disposal tonnage separately from squares ordered.",
        "Order matching batch shingles from same lot when possible—square count should include ridge cap bundles per manufacturer system warranty requirements.",
      ],
      linkedToolIds: ["roofing-calculator"],
    },
    {
      id: "ordering",
      heading: "From squares to bundles and accessories",
      paragraphs: [
        "Multiply squares by bundles-per-square from shingle label—verify for chosen product line. Underlayment rolls cover rated squares per roll at specified overlap. Ice and water shield at eaves in cold climates adds linear feet, not always folded into field squares.",
        "Flashing, pipe boots, and drip edge quote per piece or linear foot—complete takeoff lists accessories beyond shingle squares alone.",
      ],
      linkedToolIds: ["roofing-calculator"],
    },
  ],
  examples: [
    {
      title: "Simple gable 2,000 sq ft footprint",
      description:
        "At 5/12 pitch, surface ~2,240 sq ft → 22.4 squares → ~23 squares with 10% waste before bundle conversion.",
    },
    {
      title: "Garage plane 12 ft × 16 ft slope",
      description: "192 sq ft = 1.92 squares—round up and aggregate with main roof planes for total order.",
    },
  ],
  commonMistakes: [
    "Using ground footprint without pitch factor.",
    "Forgetting dormers and porch roofs in plane total.",
    "Assuming three bundles per square for all architectural products.",
    "Skipping waste on complex hip-and-valley layouts.",
  ],
};

export const boardFeetExplainedResource: ResourceDefinition = {
  slug: "board-feet-explained",
  categorySlug: "construction-calculators",
  title: "Board Feet Explained",
  summary:
    "Board feet measure lumber volume: one board foot equals 144 cubic inches (12×12×1 inches nominal).",
  metaTitle: "Board Feet Explained - Lumber Volume Guide",
  metaDescription:
    "Learn board foot calculation for dimensional lumber, pricing per thousand board feet (MBF), and lumber calculator links.",
  keywords: ["board feet explained", "board foot formula", "lumber board feet", "mbf lumber"],
  quickAnswer:
    "Board feet (bd ft) = (thickness in × width in × length in) ÷ 144. Nominal 2×4×8 ft piece ≈ 5.33 bd ft using actual or nominal dimensions per yard practice. Lumber often priced per thousand board feet (MBF or $/MBF).",
  intro:
    "Hardwood lumber yards and timber contracts quote board feet while big-box stores sell dimensional lumber by piece count. Board foot math standardizes volume comparison across mixed lengths and widths in millwork, decking, and framing takeoffs. Nominal versus actual dimensions trip estimators—2×4 nominal is not 2 by 4 inches actual. Softwood framing often counts sticks; hardwood slabs and custom millwork rely on bd ft for pricing fairness when widths vary wildly within a grade.",
  primaryToolId: "lumber-calculator",
  relatedToolIds: ["roofing-calculator", "concrete-calculator"],
  relatedResourceSlugs: ["how-to-estimate-roofing-squares", "cubic-yards-to-tons-aggregate"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "formula",
      heading: "Board foot formula and nominal sizes",
      paragraphs: [
        "Standard formula: thickness (in) × width (in) × length (ft) can be computed as (T×W×L_in)/144 when length in inches, or T×W×L_ft/12 variant forms exist—use consistent units once per spreadsheet.",
        "Nominal 1×6×8 ft: if using nominal 1 and 6 inches, bd ft = 1×6×8/12 = 4 bd ft in common lumberyard shorthand for dimensional softwood counting.",
      ],
      linkedToolIds: ["lumber-calculator"],
    },
    {
      id: "hardwood-vs-softwood",
      heading: "Hardwood vs softwood quoting",
      paragraphs: [
        "Hardwood racks price random width boards by actual measured bd ft at point of sale. Softwood framing packages may ignore bd ft in retail but wholesaler invoices use MBF for truckloads.",
        "Kiln-dried hardwood waste factor higher due to defect cutouts—add scrap percentage beyond raw bd ft sum.",
      ],
      linkedToolIds: ["lumber-calculator"],
    },
    {
      id: "mbf-pricing",
      heading: "Pricing per thousand board feet (MBF)",
      paragraphs: [
        "If quote is $800/MBF and project needs 450 bd ft, cost ≈ 0.45 × $800 = $360 before delivery and tax. Compare species and grade at same MBF basis.",
        "Timber logging scales whole logs to bd ft using scaling rules (Doyle, Scribner, International 1/4 log rules)—different rules yield different bd ft for same log; specify rule in contract.",
      ],
      linkedToolIds: ["lumber-calculator"],
    },
    {
      id: "project-estimating",
      heading: "Estimating projects with board feet",
      paragraphs: [
        "Deck railing, shelving, and trim lists convert each piece to bd ft then sum. Compare to project plan cut list software exporting bd ft automatically for CNC shops.",
        "Purchase length optimization: buying 10 ft sticks vs 8 ft may reduce waste per bd ft even if per-stick price higher—optimize total bd ft plus cut loss.",
      ],
      linkedToolIds: ["lumber-calculator"],
    },
    {
      id: "common-errors",
      heading: "Measurement discipline",
      paragraphs: [
        "Mixing actual 1.5×3.5 with nominal 2×4 in same takeoff double-counts or under-counts. Pick one convention matching supplier invoice method.",
        "Length in feet vs inches most common error—confirm formula matches calculator tool embedded assumptions.",
      ],
      linkedToolIds: ["lumber-calculator"],
    },
  ],
  examples: [
    {
      title: "2×10×16 joist",
      description: "2×10×16/12 ≈ 26.67 bd ft per joist using nominal inches × length feet ÷ 12 shortcut.",
    },
    {
      title: "Hardwood shelf board",
      description: "Actual 1.25 in × 7.25 in × 96 in ÷ 144 ≈ 6.08 bd ft at checkout scale.",
    },
  ],
  commonMistakes: [
    "Using outside dimensions without clarifying nominal vs actual.",
    "Forgetting to divide by 144 when all dimensions in inches.",
    "Comparing MBF prices across different log scaling rules.",
    "Counting linear feet of trim as board feet without cross-section.",
  ],
};

export const cubicYardsToTonsResource: ResourceDefinition = {
  slug: "cubic-yards-to-tons-aggregate",
  categorySlug: "construction-calculators",
  title: "Cubic Yards to Tons for Aggregate",
  summary:
    "Converting cubic yards of gravel or crushed stone to tons requires material bulk density; volume alone is not weight.",
  metaTitle: "Cubic Yards to Tons - Aggregate Conversion",
  metaDescription:
    "Convert gravel and aggregate cubic yards to tons using density factors, with examples for delivery and driveway projects.",
  keywords: ["cubic yards to tons", "gravel tons per yard", "aggregate weight", "yardage to tons"],
  quickAnswer:
    "Tons ≈ cubic yards × material density (tons per cubic yard). Crushed stone often ~1.4–1.6 tons/yd³; sand ~1.3–1.5; mulch much less (~0.3–0.5). Moisture and compaction change density—confirm with supplier spec sheet.",
  intro:
    "Quarry invoices and truck scale tickets use weight tons while site planners estimate volume cubic yards from length×width×depth. Bridge weight limits, dump truck capacity, and material cost per ton all need conversion from yardage takeoffs. Density varies by stone type, gradation, moisture, and whether material is loose vs compacted. Ordering purely by yardage without tonnage check risks overweight trucks unable to legally exit quarry or underfilled beds when density assumption was wrong for wet weather loads.",
  primaryToolId: "gravel-cubic-yards-to-tons",
  relatedToolIds: ["cubic-yards-to-cubic-feet", "concrete-calculator"],
  relatedResourceSlugs: ["board-feet-explained", "mulch-coverage-guide"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "density",
      heading: "Bulk density and supplier specs",
      paragraphs: [
        "Material suppliers publish approximate tons per cubic yard for products—#57 stone vs crusher run differ. Always use quote-specific number when available rather than generic web averages.",
        "Moisture adds weight without adding usable volume—rain-soaked gravel weighs more per yard than bone dry. Scale tickets at quarry reflect actual loaded weight.",
      ],
      linkedToolIds: ["gravel-cubic-yards-to-tons"],
    },
    {
      id: "volume-first",
      heading: "Start with cubic yard volume",
      paragraphs: [
        "Calculate yardage from area × depth in feet ÷ 27. Example: 300 ft² × 0.25 ft = 75 ft³ ÷ 27 ≈ 2.78 yd³. Multiply by tons/yd³ density for weight estimate.",
        "Compaction during placement reduces volume—ordered loose yardage may compact to fewer yards in place; conversely compacted base specs quote compacted density targets separate from loose delivery volume.",
      ],
      linkedToolIds: ["cubic-yards-to-cubic-feet", "gravel-cubic-yards-to-tons"],
    },
    {
      id: "truck-capacity",
      heading: "Truck capacity in tons vs yards",
      paragraphs: [
        "Dump trucks rated by cubic yards bed volume and max legal gross weight tons—dense stone fills weight limit before bed volume on smaller trucks. Split loads across trips when tonnage exceeds axle limits.",
        "Delivery minimums may be 10 tons or 15 yards whichever supplier defines—compare cost per ton after conversion for budget.",
      ],
      linkedToolIds: ["gravel-cubic-yards-to-tons"],
    },
    {
      id: "project-types",
      heading: "Driveways, bases, and drainage",
      paragraphs: [
        "Driveway base might spec 6 in crusher run compacted in lifts—volume takeoff times density yields tonnage for quote. Drainage gravel around pipe uses clean stone lower density than fines-rich mix.",
        "Decorative landscape rock sold by yard at retail may still need tonnage for bulk blower truck if weight-limited on residential street.",
      ],
      linkedToolIds: ["gravel-cubic-yards-to-tons"],
    },
    {
      id: "verification",
      heading: "Verify on scale and reconcile",
      paragraphs: [
        "Weigh tickets vs estimated tons teach local density calibration for future jobs. Reconcile yardage calculated from plan dimensions with driver-reported loaded yards at delivery.",
        "Keep waste factor separate—tonnage includes only placed material; spillage at site still consumed load weight.",
      ],
      linkedToolIds: ["gravel-cubic-yards-to-tons"],
    },
  ],
  examples: [
    {
      title: "Driveway 3 yd³ #57 stone",
      description: "3 yd³ × 1.5 tons/yd³ ≈ 4.5 tons—check truck max before single delivery.",
    },
    {
      title: "French drain gravel",
      description: "12 yd³ at 1.4 tons/yd³ ≈ 16.8 tons—plan two trips if single axle limit 10 tons.",
    },
  ],
  commonMistakes: [
    "Using one density factor for all stone products.",
    "Ignoring moisture after rain on stockpile weight.",
    "Confusing short ton (2000 lb) with metric tonne in international quotes.",
    "Calculating area without depth then applying tons per yard incorrectly.",
  ],
};

export const mulchCoverageResource: ResourceDefinition = {
  slug: "mulch-coverage-guide",
  categorySlug: "construction-calculators",
  title: "Mulch Coverage Guide",
  summary:
    "Mulch coverage depends on bed square footage, desired depth in inches, and whether material is loose or compacted after spreading.",
  metaTitle: "Mulch Coverage Guide - Cubic Yards & Depth",
  metaDescription:
    "Calculate mulch volume for landscaping beds, choose depth, account for compaction, and use a free mulch calculator.",
  keywords: ["mulch coverage", "mulch calculator depth", "cubic yards mulch", "landscape mulch guide"],
  quickAnswer:
    "Volume (ft³) = bed area (ft²) × depth (ft). Cubic yards = ft³ ÷ 27. One cubic yard of mulch covers roughly 324 ft² at 1 inch depth, 162 ft² at 2 inches, 108 ft² at 3 inches—before compaction settle.",
  intro:
    "Mulch suppresses weeds, retains soil moisture, and finishes landscape beds aesthetically—but ordering by guesswork leaves piles on driveway or mid-project shortages. Coverage math parallels other bulk materials: convert bed area and target depth to cubic yards for supplier quotes. Depth recommendations vary: 2–3 inches refresh on existing beds, 3–4 inches new beds without fabric. Organic mulch settles 20–30% as fibers decompose and rain compacts surface—budget slight overage. Bagged mulch at retail lists cubic feet per bag; divide total ft³ by bag volume for box store runs on small jobs.",
  primaryToolId: "mulch-calculator",
  relatedToolIds: ["cubic-yards-to-cubic-feet", "gravel-cubic-yards-to-tons"],
  relatedResourceSlugs: ["how-to-estimate-roofing-squares", "cubic-yards-to-tons-aggregate"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "depth",
      heading: "Choosing mulch depth",
      paragraphs: [
        "Too thin fails weed barrier; too deep suffocates plant crowns and wastes material. 2–3 inches typical for shredded hardwood on maintenance beds. Play areas or erosion control may spec deeper layers with different material type.",
        "Measure depth as settled target weeks after install, not fluffy peak immediately after blower truck—initial volume looks higher before settle.",
      ],
      linkedToolIds: ["mulch-calculator"],
    },
    {
      id: "area",
      heading: "Measuring bed area accurately",
      paragraphs: [
        "Break irregular beds into rectangles and circles; sum ft². Subtract large areas covered by mature shrub mass if mulch will not fill under dense canopy—judgment call for aesthetics.",
        "Convert square meters to square feet (×10.764) if landscape plan metric before depth multiply and ÷27 yard conversion.",
      ],
      linkedToolIds: ["mulch-calculator", "square-meters-to-square-feet"],
    },
    {
      id: "volume",
      heading: "From area and depth to cubic yards",
      paragraphs: [
        "500 ft² bed at 3 inches (0.25 ft): 500 × 0.25 = 125 ft³ ÷ 27 ≈ 4.63 yd³. Add 10% for settle and uneven subgrade on first install.",
        "Coverage cheat: 1 yd³ at 3 in covers ~108 ft²—scale proportionally for quick mental check against calculator output.",
      ],
      linkedToolIds: ["mulch-calculator", "cubic-yards-to-cubic-feet"],
    },
    {
      id: "bagged-vs-bulk",
      heading: "Bagged vs bulk delivery",
      paragraphs: [
        "2 cu ft bags: 13.5 bags ≈ 1 yd³ (27 cu ft). Small jobs under 2 yd³ often bagged for DIY trunk transport; bulk blown or dumped for larger landscapes per minimum truckload fee.",
        "Dyed mulch, cedar, and rubber mulches have different densities—weight limits on trucks rarely bind mulch like gravel; volume yardage still drives quoting.",
      ],
      linkedToolIds: ["mulch-calculator"],
    },
    {
      id: "seasonal",
      heading: "Refresh vs new install and seasonal tips",
      paragraphs: [
        "Refresh top-dress 1–2 inches annually without full removal—calculate only new depth over existing partial layer. New beds after fabric install take full specified depth.",
        "Spring orders surge—book delivery early. Wet mulch heavier to shovel; dry mulch blows in wind during spread—moisture state affects labor more than coverage formula.",
      ],
      linkedToolIds: ["mulch-calculator"],
    },
  ],
  examples: [
    {
      title: "60 ft × 8 ft shrub border",
      description: "480 ft² × 0.25 ft depth = 120 ft³ ÷ 27 ≈ 4.44 yd³ plus 10% → ~4.9 yd³ order.",
    },
    {
      title: "Bag count for small bed",
      description: "Need 2 yd³ = 54 cu ft → twenty-seven 2 cu ft bags if buying retail by bag.",
    },
  ],
  commonMistakes: [
    "Using depth in inches without converting to feet before multiply.",
    "Applying gravel tons conversion factors to mulch volume.",
    "Forgetting settle factor on fluffy fresh mulch.",
    "Measuring bed outline including lawn area not receiving mulch.",
  ],
};
