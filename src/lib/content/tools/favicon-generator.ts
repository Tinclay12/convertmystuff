import type { ToolContentEnrichment } from "@/lib/content/types";

export const faviconGeneratorContent: ToolContentEnrichment = {
  contentTier: "B",
  guideSlug: "how-to-add-a-favicon",
  resourceSlugs: [
    "image-tools/standard-favicon-sizes",
    "image-tools/what-is-an-ico-file",
  ],
  contentBlocks: [
    {
      id: "favicon-file-set",
      title: "Which files you actually need",
      variant: "info",
      paragraphs: [
        "Three formats do different jobs. favicon.ico is the compatibility layer: browsers request /favicon.ico from your domain root whether or not you declare it, and Windows reads it for pinned shortcuts. PNG files handle everything modern — high-DPI tabs, the 180×180 Apple touch icon, and the 192/512 sizes a web manifest needs for Android install prompts. SVG is the sharpest option where it works, declared with type=\"image/svg+xml\", but Safari trailed the other browsers on it, so keep ICO or PNG as the fallback rather than shipping SVG alone.",
        "For most sites the honest minimum is favicon.ico at the root plus a 180×180 apple-touch-icon.png. Add the 192 and 512 PNGs and a manifest only once you actually want an install prompt — unused manifest icons are dead weight, not insurance.",
      ],
      linkedToolIds: ["png-to-ico", "ico-to-png", "svg-to-png"],
    },
    {
      id: "favicon-frameworks",
      title: "Where the files go in your framework",
      variant: "info",
      paragraphs: [
        "Next.js App Router: drop favicon.ico in app/ (top level only — it is not picked up from nested routes), plus icon.png and apple-icon.png anywhere in app/. Next generates the head tags for you, so do not paste the HTML from this tool as well or you will ship duplicate link tags.",
        "Vite, Astro, and plain HTML: put the files in public/ so they land at the domain root on build, then paste the generated link tags into index.html or your layout template's head.",
        "WordPress: Appearance → Customize → Site Identity → Site Icon takes one square image and generates the sizes itself. Use that before editing theme files — a header.php edit gets overwritten by the next theme update, and the Site Icon setting survives it.",
        "Whichever route you take, the tags belong in the document head. A link tag that ends up in the body is ignored by every browser, and it is the single most common reason a correctly generated favicon never appears.",
      ],
    },
    {
      id: "favicon-not-updating",
      title: "When the new favicon will not show",
      variant: "warning",
      paragraphs: [
        "Favicons are cached harder than almost any other asset, so a correct file often sits behind a stale one. Work through it in order rather than regenerating: open the file URL directly (yoursite.com/favicon.ico) and confirm it returns your new icon — if it returns the old one or a 404, the problem is the deploy or the CDN, not the browser.",
        "If the direct URL is right but the tab is wrong, hard-refresh, then purge the CDN cache. Chrome keeps a separate favicon database that a normal cache clear does not touch; opening the site in a private window is the fastest way to confirm the file is fine and only your local cache is stale.",
        "Two traps worth checking before you blame cache: a link tag sitting in the body instead of the head, and /favicon.ico disallowed in robots.txt. iOS home-screen icons are a special case — they are captured when the shortcut is created and only update if the user removes and re-adds it.",
        "Renaming the file (favicon-v2.ico) forces an update, but it breaks the automatic root request and any bookmark pointing at the old path. Prefer fixing cache headers over renaming.",
      ],
      linkedToolIds: ["ico-to-png"],
    },
    {
      id: "favicon-design",
      title: "Designing an icon that survives 16 pixels",
      variant: "tip",
      paragraphs: [
        "A favicon is rendered at roughly the size of a word's first letter. Full wordmarks, thin strokes, and photographs all turn to mush — crop to a single glyph, monogram, or the most distinctive shape in your logo instead of scaling the whole lockup down.",
        "Test at actual size before you ship: generate the bundle, then look at the 16×16 PNG at 100% rather than judging the 512 preview. Contrast matters more than detail, and a mark that only works on white will disappear against a dark browser theme, so check both.",
      ],
      linkedToolIds: ["image-resizer", "svg-to-png"],
    },
  ],
  additionalFaqs: [
    {
      question: "Why does my favicon still show the old image?",
      answer:
        "Almost always cache. Load /favicon.ico directly to confirm the new file is deployed, then hard-refresh and purge your CDN. Chrome keeps a separate favicon store, so check in a private window before assuming the file is wrong.",
    },
    {
      question: "Do I need favicon.ico if I use Next.js?",
      answer:
        "Put favicon.ico in the top level of app/ and Next.js emits the link tag automatically. Do not also paste the generated HTML into your layout, or you will ship duplicate icon tags.",
    },
    {
      question: "Can I use an SVG favicon?",
      answer:
        "Yes, declared as type=\"image/svg+xml\". Support is good in Chrome, Firefox, and Edge, but keep favicon.ico or a PNG as a fallback for Safari and for the automatic root request.",
    },
    {
      question: "Is my image uploaded anywhere?",
      answer:
        "No. The image is read, resized, and packaged entirely in your browser. Nothing is sent to a server, which also means the tool keeps working offline once the page has loaded.",
    },
  ],
};
