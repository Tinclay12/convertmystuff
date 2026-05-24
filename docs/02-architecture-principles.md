# Architecture Principles

## Recommended Architecture

Use a modular monolith.

Do not start with microservices. The project should be easy to deploy, reason about, and expand. Use clean boundaries inside one application rather than distributed services.

Recommended stack:

- Next.js with App Router
- React
- TypeScript
- Tailwind CSS
- Server Components where appropriate
- Client Components for interactive tools
- Static/content-driven tool registry for v1
- PostgreSQL/Prisma only when needed for accounts, admin, billing, saved history, or usage tracking
- Vercel or similar managed deployment

## Public-First Architecture

The public site must work without authentication.

The main system should include:

- Homepage
- Category hub pages
- Dynamic public tool pages
- Tool registry
- Shared tool page layout
- Shared SEO metadata generation
- Related-tool linking
- Sitemap generation
- Robots.txt
- Schema markup
- Analytics integration placeholder
- Ad placement placeholders

## Execution Modes

Tools should declare an execution mode.

Recommended modes:

- `client`: Runs fully in the browser
- `server`: Requires server-side processing
- `hybrid`: Uses client-side logic for basic use and server-side logic for premium/heavy use
- `external`: Uses third-party API or hosted processing, only where justified

Prefer client-side execution for deterministic and privacy-sensitive tools when practical.

Examples of client-side tools:

- JSON to CSV
- CSV to JSON
- JSON formatter
- Base64 encode/decode
- Case converter
- Remove duplicate lines
- Acres to square feet
- Cap rate calculator
- UTM builder

Examples that may need server-side or hybrid processing:

- HEIC conversion
- PDF rendering
- OCR
- Large image compression
- Media conversion
- Batch file processing
- API-based premium workflows

## Future-Ready Boundaries

The app should be structured so future features can be added without rewriting the public site.

Suggested top-level structure:

```text
/app
  /(public)
    page.tsx
    [category]
      page.tsx
      [tool]
        page.tsx
  /(account)
    dashboard
    billing
    history
  /(admin)
    admin
/components
  layout
  tools
  seo
  ads
  ui
/lib
  tools
  seo
  schema
  analytics
  auth
  billing
  limits
  storage
  jobs
/content
  tools
  categories
```

The account and admin sections can remain stubbed or omitted in v1, but the folder and module structure should not prevent adding them later.

## Performance Requirements

Public pages should be fast and indexable.

Targets:

- Static generation where practical
- Minimal JavaScript on informational page sections
- Client-side JavaScript only for tool interfaces that require interactivity
- Lazy-load heavy tool components if needed
- Avoid loading auth, billing, dashboard, or admin code into public pages
- Optimize for Core Web Vitals

## Security Principles

- Do not trust uploaded files
- Validate file size and type before processing
- Sanitize text and HTML inputs where applicable
- Avoid storing user inputs unless explicitly required
- Do not log sensitive pasted content by default
- Use rate limits for expensive server-side tools
- Use separate limits for anonymous, free-authenticated, and paid users later
- Keep API keys and service credentials server-side only

## Development Standards

- TypeScript strict mode
- Clear component boundaries
- Reusable utilities for metadata, schema, breadcrumbs, and related tools
- Unit tests for conversion/calculation logic
- Basic E2E tests for tool pages
- Accessibility-minded form controls and keyboard navigation
- Mobile-first responsive design
