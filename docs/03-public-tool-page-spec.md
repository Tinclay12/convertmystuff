# Public Tool Page Specification

## Purpose

Every public tool page should satisfy immediate task intent first and SEO/supporting content second.

A user landing from Google should be able to complete the conversion, calculation, or formatting task without creating an account and without reading a long article first.

## Standard Page Structure

Each public tool page should include the following sections in this order:

1. Breadcrumbs
2. H1 title
3. Short one-sentence utility statement
4. Tool interface above the fold
5. Primary output/result area
6. Related quick actions if applicable
7. Short explanation of what the tool does
8. How to use section
9. Examples
10. Formula, methodology, assumptions, or parser rules where relevant
11. Common use cases
12. FAQ
13. Related tools
14. Source notes or standards where relevant
15. Last reviewed date

## Above-the-Fold Requirements

The tool interface must appear near the top of the page.

The page should not make users scroll past a long introduction before using the tool.

Recommended above-the-fold layout:

```text
Breadcrumbs
H1
Short description
Tool card
  Input area
  Controls/options
  Convert/calculate button if needed
  Output/result area
  Copy/download/reset actions
```

## Tool Card Requirements

Each tool card should support the core workflow for that tool.

Common UI elements:

- Textarea input
- File input where needed
- Numeric input fields for calculators
- Select/dropdown controls
- Checkbox/toggle options
- Convert/calculate/format button
- Output textarea/result card
- Copy output button
- Download output button where relevant
- Reset button
- Error messages with clear instructions

## Content Requirements

Each page should have enough useful content to avoid thinness, but the content must be specific to the tool.

Avoid generic filler.

Good content:

- Exact formula
- Example conversion
- Explanation of assumptions
- Edge cases
- Tool-specific FAQ
- Related workflows
- Official source notes where relevant

Poor content:

- Repeating the title in multiple paragraphs
- Generic “this tool is easy and fast” content
- Near-duplicate text across hundreds of pages
- SEO paragraphs that do not help users complete the task

## Examples Section

Every page should include examples tailored to the tool.

Example for JSON to CSV:

- Input JSON sample
- Output CSV sample
- Explanation of how nested keys are handled

Example for cap rate calculator:

- Purchase price
- Gross income
- Vacancy
- Expenses
- NOI
- Cap rate result

Example for acres to square feet:

- Formula: acres × 43,560 = square feet
- Sample: 2.5 acres × 43,560 = 108,900 square feet

## Related Tools

Every tool should link to:

- Reverse conversion where applicable
- Closely related tools
- Category hub
- Higher-value workflow tools where applicable

Example:

JSON to CSV should link to:

- CSV to JSON
- Nested JSON to CSV
- JSON Formatter
- CSV to Table Converter
- Developer Tools hub

Cap Rate Calculator should link to:

- NOI Calculator
- GRM Calculator
- DSCR Calculator
- Loan to Value Calculator
- Real Estate Calculators hub

## Schema Markup

Include structured data where appropriate.

Recommended schema:

- SoftwareApplication for tool pages
- BreadcrumbList for breadcrumbs
- WebPage for general page information
- FAQPage only if FAQs are meaningful and specific

Do not rely on FAQ schema as the primary SEO strategy.

## Last Reviewed Date

Every page should include a last reviewed date.

This is especially important for:

- Platform-specific tools
- Real-estate and tax calculators
- Construction calculators with sourced assumptions
- Tools that rely on external standards

## Login Rule

Public tool pages must be usable without login.

A tool page may show optional upgrade prompts for premium features, but those prompts must not block basic public usage.
