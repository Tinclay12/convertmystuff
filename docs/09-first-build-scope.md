# First Build Scope

## Objective

Build a working public SEO-focused tool platform foundation with a small set of representative tools.

Do not attempt to build all tools at once.

The first build should prove:

- Dynamic tool routing
- Tool registry architecture
- Shared tool page template
- Category hubs
- Related tools
- SEO metadata generation
- Sitemap generation
- Basic schema markup
- Public no-login tool use
- Reusable tool component pattern

## Foundation Features

Build these first:

1. Homepage
2. Category hub pages
3. Dynamic public tool pages
4. Tool registry
5. Category registry
6. Shared public tool page layout
7. Related tools component
8. Breadcrumbs
9. SEO metadata generation
10. Schema markup generation
11. Sitemap generation
12. Robots.txt
13. Analytics placeholder
14. Ad slot placeholders
15. Responsive navigation
16. Footer with category links
17. Basic error handling
18. Basic tests for tool logic

## Initial Categories

Create these category hubs:

```text
/developer-tools/
/text-tools/
/unit-converters/
/real-estate-calculators/
/image-tools/
/marketing-tools/
```

Construction calculators can be added as a separate hub or deferred depending on build speed.

## Initial Tools

Build these 10 tools first:

1. JSON to CSV Converter
2. CSV to JSON Converter
3. Nested JSON to CSV Converter
4. JSON Formatter and Validator
5. Remove Duplicate Lines
6. Case Converter
7. Acres to Square Feet Converter
8. Square Feet to Acres Converter
9. Cap Rate Calculator
10. PNG to ICO Converter or SVG to PNG Converter

If image conversion is too time-consuming in the first pass, substitute UTM Builder as tool 10.

## Tool Requirements

Each initial tool should include:

- Working input/output interface
- Clear errors
- Copy result button where applicable
- Reset button
- Example section
- How to use section
- Related tools
- Metadata
- Schema
- Last reviewed date

## Suggested Tool Details

### JSON to CSV

Features:

- Paste JSON
- Parse array of objects
- Flatten nested objects if possible
- Choose delimiter: comma, tab, semicolon
- Preview output
- Copy CSV
- Download CSV

### CSV to JSON

Features:

- Paste CSV
- Detect headers
- Convert rows to array of objects
- Option to infer numbers/booleans
- Copy JSON
- Download JSON

### Nested JSON to CSV

Features:

- Paste nested JSON
- Flatten nested keys using dot notation
- Basic array handling
- Preview columns
- Copy/download CSV

### JSON Formatter

Features:

- Paste JSON
- Validate
- Pretty print
- Minify
- Show parse errors
- Copy output

### Remove Duplicate Lines

Features:

- Paste text
- Remove duplicate lines
- Toggle case-sensitive matching
- Toggle trim whitespace
- Show number removed
- Copy output

### Case Converter

Features:

- Uppercase
- Lowercase
- Title case
- Sentence case
- Slug case
- Copy output

### Acres to Square Feet

Formula:

```text
square feet = acres × 43,560
```

Features:

- Numeric input
- Result output
- Example conversions
- Reverse link to square feet to acres

### Square Feet to Acres

Formula:

```text
acres = square feet ÷ 43,560
```

Features:

- Numeric input
- Result output
- Example conversions
- Reverse link to acres to square feet

### Cap Rate Calculator

Formula:

```text
cap rate = net operating income ÷ property value
```

Features:

- Property value input
- Gross income input
- Vacancy input
- Expense inputs
- NOI calculation
- Cap rate output
- Clear disclaimer that output is an estimate and not financial advice

### PNG to ICO or SVG to PNG

If selected, keep first implementation simple.

PNG to ICO features:

- Upload PNG
- Generate common favicon sizes where practical
- Download ICO or zip if implemented

SVG to PNG features:

- Paste/upload SVG
- Choose output width/height
- Export PNG

## Out of Scope for First Build

Do not build in v1:

- Mandatory login
- Stripe billing
- User dashboard
- Saved history
- Team accounts
- API keys
- OCR
- PDF-to-Word
- Video/audio conversion
- Full admin CMS
- Heavy background job system

## Acceptance Criteria

The first build is successful when:

- Public pages can be visited without login
- Category hubs list published tools
- Each tool page is generated from the registry
- Each initial tool works
- Related tools appear correctly
- Sitemap includes published public pages
- Account/admin/premium features are not required for normal use
- The code structure can support future auth, billing, storage, and admin features
