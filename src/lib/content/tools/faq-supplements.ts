import type { ToolContentEnrichment } from "@/lib/content/types";

const faq = (question: string, answer: string) => ({ question, answer });

/** Fourth FAQ for tools that only had three generic entries */
export const faqSupplements: Record<string, ToolContentEnrichment> = {
  "remove-empty-lines": {
    additionalFaqs: [
      faq("Can I undo after removing lines?", "Use Reset or paste your original text again—the tool does not keep edit history."),
    ],
  },
  "trim-lines": {
    additionalFaqs: [
      faq("Does this affect blank lines?", "Blank lines are preserved; only leading and trailing whitespace on each line is removed."),
    ],
  },
  "camel-case-converter": {
    additionalFaqs: [
      faq("What about acronyms like API?", "Consecutive capitals may stay grouped depending on input—review output for brand names."),
    ],
  },
  "snake-case-converter": {
    additionalFaqs: [
      faq("Can I convert back to camelCase?", "Yes. Use the Camel Case Converter for camelCase or PascalCase output."),
    ],
  },
  "png-to-jpg": {
    additionalFaqs: [
      faq("Will text in screenshots stay sharp?", "Fine text may soften slightly due to JPG compression—use higher quality if needed."),
    ],
  },
  "jpg-to-png": {
    additionalFaqs: [
      faq("Can I add transparency after converting?", "PNG supports alpha channels; you need an editor to remove backgrounds separately."),
    ],
  },
  "image-resizer": {
    additionalFaqs: [
      faq("What is the max upload size?", "Browser memory limits apply—very large images may fail on mobile devices."),
    ],
  },
  "recipe-scaler": {
    additionalFaqs: [
      faq("How do I scale oven temperature?", "Use the oven temperature converter separately—heat settings do not scale linearly with servings."),
    ],
  },
  "cups-to-grams": {
    additionalFaqs: [
      faq("Does sifted flour weigh the same?", "No. Sifted flour is less dense—packed vs sifted cups can differ by 20% or more."),
    ],
  },
  "utm-builder": {
    additionalFaqs: [
      faq("Should UTM tags use lowercase?", "Lowercase source and medium values reduce duplicate rows in analytics reports."),
    ],
  },
  "meta-tag-generator": {
    additionalFaqs: [
      faq("What length should meta descriptions be?", "Aim for roughly 150–160 characters to reduce truncation in search results."),
      faq("Should title and H1 match?", "They can differ slightly, but aligned messaging helps users and search engines understand the page topic."),
    ],
  },
  "slug-generator": {
    additionalFaqs: [
      faq("Can I use slugs with numbers?", "Yes. Numbers are kept when they are part of the original phrase."),
    ],
  },
  "open-graph-preview": {
    additionalFaqs: [
      faq("Why does my preview differ from Facebook?", "Platforms cache OG tags—use each platform's debugger to refresh after publishing."),
    ],
  },
  "png-to-ico": {
    additionalFaqs: [
      faq("Will ICO work in all browsers?", "Modern browsers prefer PNG favicons; ICO remains useful for legacy Windows shortcuts."),
    ],
  },
  "favicon-generator": {
    additionalFaqs: [
      faq("Which size should I use for PWA icons?", "512×512 is common for manifest icons; include multiple sizes in the ZIP for best coverage."),
    ],
  },
  "tbsp-to-ml": {
    additionalFaqs: [
      faq("Are UK tablespoons supported?", "No. This tool uses US customary tablespoons (14.7868 ml)."),
    ],
  },
  "oven-temp-converter": {
    additionalFaqs: [
      faq("Do fan ovens need adjustment?", "Fan-assisted ovens often bake faster—reduce temperature or time beyond a straight conversion."),
    ],
  },
};
