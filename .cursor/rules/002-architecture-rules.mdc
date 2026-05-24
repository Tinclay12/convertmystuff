---
description: Architecture rules for the ConvertMyStuff codebase
alwaysApply: true
---

# Architecture Rules

Use a modular monolith.

Preferred stack:
- Next.js
- React
- TypeScript
- Tailwind
- Registry-driven tool pages

Do not start with microservices.

Prefer client-side execution for deterministic tools.

Use server-side processing only when required for:
- large files
- image processing that cannot run client-side
- PDF/document rendering
- OCR
- audio/video conversion
- user accounts
- payments
- API keys
- saved user data
- admin features

The public site must function without authentication.

The tool registry should be the source of truth for:
- tool IDs
- titles
- slugs
- categories
- URLs
- SEO metadata
- related tools
- execution mode
- schema type
- monetization status
- premium eligibility

Use docs/02-architecture-principles.md as the detailed reference.
