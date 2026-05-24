# Codex Start Here

You are building ConvertMyStuff.com.

Read the files in `/docs` before writing code.

## Most Important Instruction

Build a public, SEO-focused converter/calculator/tools website first.

Do not build a login-first SaaS dashboard.

Normal public tool use must not require authentication.

## Build Philosophy

Use a modular Next.js architecture with a central tool registry. Public tool pages should be fast, indexable, and useful immediately.

The app should be designed so optional SaaS-style features can be added later, including accounts, billing, saved history, batch processing, API keys, admin tools, and file storage. However, those features should not be required for version one unless specifically requested.

## Initial Build Target

Build the foundation and a small representative set of tools, not the entire future platform.

Prioritize:

1. Tool registry
2. Category registry
3. Dynamic public tool pages
4. Shared tool page template
5. Category hubs
6. Sitemap and robots.txt
7. SEO metadata and schema
8. No-login public tool use
9. 5 to 10 working initial tools

## Key Documentation Files

Read in this order:

1. `docs/01-product-brief.md`
2. `docs/02-architecture-principles.md`
3. `docs/04-tool-registry-spec.md`
4. `docs/03-public-tool-page-spec.md`
5. `docs/06-auth-and-premium-boundaries.md`
6. `docs/09-first-build-scope.md`
7. `docs/11-flagship-traffic-tools/` — Phase A–D flagship specs and traffic baseline
8. Remaining docs as needed

## Hard Rules

- Do not require login for basic tools.
- Do not build microservices.
- Do not create thin indexed pages for numeric-only conversion variations.
- Do not make the dashboard the center of the product.
- Do not overbuild Stripe, auth, admin, or background jobs in v1.
- Do build the public tool platform so those features can be added later.

## Recommended Initial Tools

Start with:

1. JSON to CSV Converter
2. CSV to JSON Converter
3. Nested JSON to CSV Converter
4. JSON Formatter and Validator
5. Remove Duplicate Lines
6. Case Converter
7. Acres to Square Feet Converter
8. Square Feet to Acres Converter
9. Cap Rate Calculator
10. UTM Builder or PNG to ICO/SVG to PNG, depending on implementation speed

## Acceptance Criteria

The first version is acceptable when public users can access category pages and tool pages, use the initial tools without logging in, and the system is clearly registry-driven and ready to scale.
