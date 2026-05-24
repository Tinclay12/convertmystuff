# Auth and Premium Boundaries

## Primary Rule

Do not require login for normal public tool use.

Authentication is an optional account and premium layer. It is not the core product layer.

## No Login Required

The following should work without login:

- Basic converter use
- Basic calculator use
- Copy/paste text tools
- Small local file conversions
- Viewing public tool pages
- Reading formulas, examples, FAQs, and source notes
- Copying output
- Downloading basic output where technically practical

Examples:

- JSON to CSV
- CSV to JSON
- JSON Formatter
- Remove Duplicate Lines
- Case Converter
- Acres to Square Feet
- Square Feet to Acres
- Cap Rate Calculator
- UTM Builder

## Optional Login

Login may be offered, but not required, for:

- Saved history
- Favorite tools
- Saved settings
- Saved projects
- Reusable templates
- Recently used tools
- Emailing results to self

These features should be positioned as convenience features, not barriers.

## Required Login

Login is required for:

- Paid plans
- Billing portal
- API keys
- Batch conversions beyond free limits
- Larger file limits
- Cloud file processing
- Saved file storage
- No-ad experience
- Downloadable branded reports
- Team features
- Usage dashboard

## Premium Feature Candidates

Developer/data tools:

- Batch JSON/CSV conversions
- Larger pasted/file inputs
- API access
- Saved schemas/templates
- Export presets

Image tools:

- Larger file size
- Batch image processing
- Bulk download zip
- Cloud processing
- Saved conversion history

Real-estate calculators:

- Downloadable PDF reports
- Saved analyses
- Branded exports
- Advanced assumptions
- Scenario comparison

Marketing tools:

- Saved UTM templates
- Campaign naming rules
- QR analytics if QR tools are added later

## Anonymous, Free, and Paid Limits

The system should eventually support separate usage limits:

```text
Anonymous user:
- Basic public use
- Small file/input limits
- Ads shown
- No saved history

Free logged-in user:
- Slightly higher limits
- Saved favorites/settings
- Ads shown

Paid user:
- Higher limits
- Batch tools
- No ads
- Saved history/projects
- Premium exports
- API access depending on plan
```

## Implementation Guidance

Do not load auth/billing code into public pages unless needed.

Public tools should be implemented so that premium prompts can be added later without rewriting the tool.

Recommended pattern:

```ts
const limits = getToolLimits({ user, tool })
```

For v1, this can return simple anonymous limits without real auth.

Later, it can check user plan, billing status, and usage.

## UX Rules

Upgrade prompts should be contextual and non-blocking.

Good:

- “Need to process 100 files at once? Batch conversion is planned for premium users.”
- “Create a free account to save this result.”

Bad:

- Blocking the tool before use
- Requiring account creation for small text conversions
- Showing intrusive modals before the user completes the task

## Admin Authentication

Admin pages must require authentication.

Admin should be separate from public tools and should never be indexed.
