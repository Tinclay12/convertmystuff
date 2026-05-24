# Admin Layer Specification

## Purpose

The admin layer is for managing tools, SEO content, metadata, source notes, and publishing status.

It is not required for v1 if static files are faster to build. However, the codebase should be structured so a database-backed admin layer can replace or augment static content later.

## V1 Recommendation

Use static registry/content files at launch.

Do not build a full CMS unless specifically requested.

Recommended v1 approach:

- Tool metadata stored in TypeScript/JSON/MDX files
- Tool components stored in code
- Page content stored in structured content files
- Build-time generation of pages and sitemaps

## Future Admin Features

Future admin should manage:

- Tool title
- Slug/path
- Category
- Meta title
- Meta description
- Short description
- Body content
- How-to steps
- Examples
- FAQs
- Formula/methodology
- Source notes
- Related tools
- Last reviewed date
- Status: draft, published, noindex, archived
- Monetization setting
- Premium eligibility
- Ad placement controls

## Admin Security

Admin pages must:

- Require authentication
- Be noindex
- Not appear in public navigation
- Validate all inputs
- Restrict access to authorized admin users only

## Suggested Admin Routes Later

```text
/admin
/admin/tools
/admin/tools/new
/admin/tools/[id]
/admin/categories
/admin/seo
/admin/analytics
/admin/monetization
```

## Content Workflow Later

Potential workflow:

1. Admin creates or edits tool entry
2. Tool status is set to draft
3. Preview page is generated
4. Tool is reviewed
5. Status is changed to published
6. Sitemap includes page after publication
7. Last reviewed date is updated when formulas/sources are checked

## Database Tables Later

If the admin layer becomes database-backed, likely tables include:

```text
tools
categories
tool_content
tool_faqs
tool_examples
tool_related_tools
tool_sources
users
plans
subscriptions
usage_events
conversion_jobs
```

Do not create these tables in v1 unless needed.

## Static-to-Database Migration Rule

Design the registry so static content can later be loaded from a database without changing the public page components.

Public pages should call a content access layer like:

```ts
getToolBySlug(category, slug)
getPublishedTools()
getCategoryBySlug(slug)
getRelatedTools(toolId)
```

In v1 these functions can read static files.

Later they can read from PostgreSQL.
