# Monetization Plan

## Principle

Monetization should not interfere with immediate tool use.

The public tool experience should remain fast and useful. Monetization should be layered around the tool, not placed in front of it.

## Initial Monetization

Use lightweight monetization first:

- Display ads on public tool pages
- Contextual affiliate links where appropriate
- Email capture only where relevant
- Internal promotion of related tools

For v1, include ad placement components as placeholders, but do not require a specific ad network integration.

Suggested ad placeholder components:

```text
<AdSlot placement="tool-sidebar" />
<AdSlot placement="below-tool" />
<AdSlot placement="in-content" />
```

## Category-Specific Monetization

Developer and data converters:

- Free basic tools
- Ads
- Premium batch conversion later
- API access later
- Saved templates later

Text utilities:

- Ads
- Email capture where useful
- Light premium only if bundled with saved tools/history

Unit and measurement converters:

- Ads
- Affiliate links where contextually appropriate
- Supporting content links

Construction calculators:

- Ads
- Affiliate links to materials/tools where appropriate
- Supplier or contractor lead-gen later

Image and document utilities:

- Free small files
- Paid larger files
- Paid batch processing
- Bulk downloads
- Cloud processing

Real-estate calculators:

- Lead generation later
- Premium downloadable reports
- Saved analyses
- Branded exports
- Possible niche products for agents/investors

Marketing and SEO tools:

- SaaS affiliate links
- Saved templates later
- Premium workflow features later

## Paid Plan Ideas

Potential paid tiers later:

```text
Free:
- Public tools
- Ads
- Basic limits

Plus:
- No ads
- Higher limits
- Saved history
- Batch tools

Pro:
- API access
- Larger file limits
- Branded exports
- Saved projects/templates
```

Do not implement these plans fully in v1 unless specifically requested.

## Credit Model Candidates

Credits may work better than subscriptions for occasional heavy file users.

Good credit use cases:

- Large file conversions
- Batch image processing
- OCR
- PDF-to-Word
- Media conversion
- Cloud processing

Avoid credits for simple calculators or text tools.

## Implementation Guidance

In v1:

- Add monetization fields to the tool registry
- Add reusable ad placement components
- Add upgrade prompt components but keep them disabled or subtle
- Do not require Stripe yet unless paid features are being actively built

Future Stripe integration:

- Use Stripe Checkout for plan purchases
- Use Stripe Customer Portal for billing management
- Store plan status in database
- Use plan status to adjust limits

## UX Guardrails

Do not place ads inside the core input/output area.

Avoid popups before task completion.

Do not require email capture before showing results.

The tool should remain the main value of the page.
