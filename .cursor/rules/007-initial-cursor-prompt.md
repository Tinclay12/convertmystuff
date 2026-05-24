# Initial Cursor Prompt

Paste this into Cursor after the docs and rules are in place:

Read the project rules in `.cursor/rules` and the docs in `/docs`, especially:

- docs/CURSOR_START_HERE.md
- docs/01-product-brief.md
- docs/02-architecture-principles.md
- docs/03-public-tool-page-spec.md
- docs/04-tool-registry-spec.md
- docs/05-seo-programmatic-pages.md
- docs/06-auth-and-premium-boundaries.md
- docs/09-first-build-scope.md

Then inspect the current repo state and propose the next smallest implementation step.

Do not build a login-first SaaS.

Build the public SEO tool platform first.

Start with the foundation:
- Next.js app structure
- tool registry
- category hubs
- dynamic public tool routes
- reusable tool page template
- no-login public tool execution
- initial tools from the first-build scope

Do not add authentication, billing, database, storage, queues, or admin systems unless specifically required by the current task.
