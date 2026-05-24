# SEO and Programmatic Page Rules

## Purpose

ConvertMyStuff should use programmatic SEO carefully. The goal is to create useful, distinct, indexable tool pages, not low-value pages created only to target keyword variations.

## Core Rule

Only publish indexed pages where the page solves a materially distinct task.

Do not create infinite indexed pages for the same formula with different numeric values.

## Good Programmatic Pages

These are acceptable because they solve distinct tasks or include distinct assumptions, inputs, formulas, examples, or workflows:

```text
/developer-tools/json-to-csv/
/developer-tools/nested-json-to-csv/
/developer-tools/csv-to-json/
/image-tools/png-to-ico/
/image-tools/svg-to-png/
/unit-converters/area/acres-to-square-feet/
/unit-converters/area/square-feet-to-acres/
/construction-calculators/cubic-yards-to-tons/
/construction-calculators/board-foot-calculator/
/real-estate-calculators/cap-rate-calculator/
/real-estate-calculators/noi-calculator/
/marketing-tools/utm-builder/
```

## Bad Programmatic Pages

These should generally not be indexed because they are value-only variations:

```text
/5-acres-to-square-feet/
/6-acres-to-square-feet/
/7-acres-to-square-feet/
/100-square-feet-to-acres/
/101-square-feet-to-acres/
/102-square-feet-to-acres/
```

Instead, use one canonical converter page and let users input any value.

## Query Parameters

It is acceptable for tools to support query parameters for convenience.

Example:

```text
/unit-converters/area/acres-to-square-feet/?value=5
```

But canonicalize back to:

```text
/unit-converters/area/acres-to-square-feet/
```

Do not generate indexable pages from arbitrary input values.

## Page Quality Requirements

Each indexed tool page should include:

- A working tool
- Specific title and meta description
- Specific examples
- Specific methodology, formula, or parsing rules
- Related tools
- FAQ content specific to the task
- Source notes where relevant
- Last reviewed date

## Internal Linking

Internal links should support topic clusters and user workflows.

Rules:

1. Link to reverse conversion where applicable.
2. Link to closely related tools.
3. Link to the parent category hub.
4. Link from category hubs to the most important tools.
5. Link laterally among workflow tools.

Examples:

JSON to CSV should link to:

- CSV to JSON
- Nested JSON to CSV
- JSON Formatter
- CSV to Table Converter

Cap Rate Calculator should link to:

- NOI Calculator
- GRM Calculator
- DSCR Calculator
- Loan to Value Calculator

## Sitemap Strategy

Generate a sitemap index and separate sitemaps by section when the site grows.

Initial structure:

```text
/sitemap.xml
```

Future structure:

```text
/sitemap.xml
/sitemaps/developer-tools.xml
/sitemaps/text-tools.xml
/sitemaps/image-tools.xml
/sitemaps/unit-converters.xml
/sitemaps/construction-calculators.xml
/sitemaps/real-estate-calculators.xml
/sitemaps/marketing-tools.xml
```

Only include published, indexable pages.

## Robots and Noindex

Use noindex for:

- Draft tools
- Thin placeholder pages
- Account pages
- Dashboard pages
- Admin pages
- Search result pages
- Arbitrary value-result pages

## Structured Data

Recommended schema:

- SoftwareApplication for converter/tool pages
- WebPage for general page context
- BreadcrumbList for all public pages
- FAQPage only when FAQ content is specific and useful

Do not add fake reviews or ratings.

## Content Duplication Rule

Shared content should be minimized.

Each tool page should have unique examples, methodology notes, edge cases, and FAQs.

Avoid creating hundreds of pages with the same paragraph structure and only swapped keywords.
