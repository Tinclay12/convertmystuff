---
description: Authentication and premium feature boundaries
alwaysApply: true
---

# Auth and Premium Boundaries

Do not require login for basic public tool use.

No login required:
- basic converter use
- basic calculator use
- text tools
- small local file conversions
- reading tool content
- viewing formulas, examples, and FAQs

Optional login:
- saved history
- favorite tools
- saved settings
- saved projects
- reusable templates

Required login:
- paid plans
- batch conversions
- larger file limits
- cloud processing
- API keys
- no-ad experience
- branded reports
- billing portal
- team features

Authentication is a premium/account layer, not the core public product layer.

Do not add auth, billing, database user models, file storage, usage limits, or dashboards unless the task specifically requires them.

Use docs/06-auth-and-premium-boundaries.md as the detailed reference.
