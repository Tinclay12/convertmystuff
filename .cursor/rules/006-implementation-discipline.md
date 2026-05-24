---
description: Development discipline, testing, and scope control
alwaysApply: true
---

# Implementation Discipline

Build in small, working increments.

Do not overbuild future features before the public tool platform works.

When implementing a feature:
1. Check whether it belongs to the public tool layer, optional account layer, admin layer, or future roadmap.
2. Prefer the simplest implementation that preserves future extensibility.
3. Avoid duplicate logic.
4. Keep tool definitions registry-driven.
5. Add or update tests for conversion/calculation logic.
6. Keep public pages fast, accessible, and responsive.
7. Do not introduce auth, database, storage, queues, Stripe, or admin systems unless the task specifically requires them.

For the first build, focus on:
- homepage
- category hubs
- tool registry
- dynamic public tool page routing
- reusable tool page template
- initial working tools
- sitemap generation
- robots.txt
- basic schema
- analytics/ad placeholders

Use docs/09-first-build-scope.md and docs/10-future-roadmap.md as references.
