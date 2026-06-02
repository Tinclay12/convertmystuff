# Post-Launch Checklist

Reference guide for steps after the initial GitHub + Vercel deployment. Use this when you are ready to connect the custom domain, finish SEO setup, and turn on monetization.

**Last updated:** May 2026  
**Related docs:** [DEPLOYMENT.md](./DEPLOYMENT.md), [07-monetization-plan.md](./07-monetization-plan.md), [11-flagship-traffic-tools/08-traffic-baseline.md](./11-flagship-traffic-tools/08-traffic-baseline.md)

---

## Current status (already done)

| Item | Status |
|------|--------|
| Code on GitHub | [github.com/Tinclay12/convertmystuff](https://github.com/Tinclay12/convertmystuff) |
| CI on push to `main` | Green (lint, test, build, audit) |
| Vercel production deploy | [convertmystuff.vercel.app](https://convertmystuff.vercel.app) |
| Vercel ↔ GitHub auto-deploy | Connected |
| Security headers | `next.config.ts` |
| `NEXT_PUBLIC_SITE_URL` (Production) | Set in Vercel |
| Ad placeholders in UI | Dev-only dashed boxes (see Phase 4) |

---

## Phase 1 — Wait for domain possession

You do **not** need the custom domain to keep developing or testing on the `.vercel.app` URL. Pause domain-specific work until you control `convertmystuff.com`.

**While waiting (optional, no domain required):**

- [ ] Merge safe Dependabot PRs only (e.g. React patch bumps, GitHub Actions updates)
- [ ] Avoid merging major breaking bumps (TypeScript 6, ESLint 10, Vitest 4) without testing
- [ ] Enable branch protection on `main` (Settings → Branches → require `ci` check)
- [ ] Spot-check the live site on `.vercel.app` after each merge

**Do not do yet:**

- Point DNS or change `NEXT_PUBLIC_SITE_URL` to the custom domain
- Submit sitemap in Search Console for the final domain
- Apply for AdSense on the final domain (use `.vercel.app` only for local/dev testing until then)

---

## Phase 2 — Connect custom domain (when you have possession)

### 2.1 DNS at your registrar

1. Vercel → **convertmystuff** → **Settings** → **Domains**
2. Add `convertmystuff.com` and `www.convertmystuff.com`
3. Copy the DNS records Vercel shows (A/CNAME or nameservers)
4. Add them at your registrar (Namecheap, Cloudflare, GoDaddy, etc.)
5. Wait for propagation (often minutes, sometimes up to 48 hours)

### 2.2 Update environment variables

In Vercel → **Settings** → **Environment Variables**:

| Variable | Production value |
|----------|------------------|
| `NEXT_PUBLIC_SITE_URL` | `https://convertmystuff.com` |

Redeploy after changing: **Deployments** → latest → **⋯** → **Redeploy**.

### 2.3 Verify

- [ ] `https://convertmystuff.com` loads homepage and tool pages
- [ ] `https://www.convertmystuff.com` redirects correctly (pick one canonical host in Vercel)
- [ ] View sitemap: `https://convertmystuff.com/sitemap.xml`
- [ ] OG images: `https://convertmystuff.com/og/?title=Test`
- [ ] Check headers: [securityheaders.com](https://securityheaders.com)

### 2.4 Optional hardening

- [ ] Vercel → **Firewall** → rate limit `/og/*` (~60 requests/minute per IP) before heavy traffic

---

## Phase 3 — Search indexing and analytics

Do this **after** the custom domain is live and `NEXT_PUBLIC_SITE_URL` points to it.

### 3.1 Google Search Console

1. [Google Search Console](https://search.google.com/search-console) → add property `https://convertmystuff.com`
2. Copy the verification meta tag value
3. Vercel → add `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` → redeploy
4. Click **Verify** in Search Console
5. **Sitemaps** → submit `https://convertmystuff.com/sitemap.xml`

Repeat for Bing/Yandex/Yahoo if desired (`NEXT_PUBLIC_BING_VERIFICATION`, etc. in `.env.example`).

### 3.2 Google Analytics 4 (optional, separate from AdSense)

1. Create a GA4 property
2. Vercel → `NEXT_PUBLIC_ANALYTICS_ID=G-XXXXXXXXXX` → redeploy
3. Script loads via [`src/components/analytics/AnalyticsPlaceholder.tsx`](../src/components/analytics/AnalyticsPlaceholder.tsx)
4. Footer copy auto-updates from “No tracking” to “Privacy-friendly analytics” when the env var is set

See [08-traffic-baseline.md](./11-flagship-traffic-tools/08-traffic-baseline.md) for metrics to track.

---

## Phase 4 — Google AdSense

Logical next monetization step: ad **placeholders already exist** in the codebase; production currently renders **no ads** (placeholders show only in development).

### 4.1 Existing code (no integration yet)

| File | Role |
|------|------|
| [`src/components/ads/AdSlot.tsx`](../src/components/ads/AdSlot.tsx) | Placeholder component; returns `null` in production today |
| [`src/components/tools/ToolPageShell.tsx`](../src/components/tools/ToolPageShell.tsx) | `below-tool` and `tool-sidebar` placements |
| [`src/components/tools/ToolContentBlocks.tsx`](../src/components/tools/ToolContentBlocks.tsx) | `in-content` placement (Tier C content tools only) |
| [`docs/07-monetization-plan.md`](./07-monetization-plan.md) | UX rules: ads **around** the tool, not inside input/output |

**Placements:**

```text
<AdSlot placement="tool-sidebar" />   — desktop sidebar on tool pages
<AdSlot placement="below-tool" />       — under the tool card
<AdSlot placement="in-content" />        — mid-article on long Tier C tool pages
```

### 4.2 Prerequisites before applying

AdSense approval is easier with a **live custom domain**, real content, and basic legal pages.

- [ ] Phase 2 complete (`convertmystuff.com` live)
- [ ] Phase 3 started (Search Console helps establish site identity)
- [ ] **Privacy policy** page (required by AdSense — not built yet; add `/privacy/` or similar)
- [ ] **Terms / disclaimer** page recommended (tools site uses “informational use only” copy in footer)
- [ ] Enough indexable tool pages with unique content (you already have 100+ published tools)
- [ ] No policy violations: no login wall on basic tools, no misleading download buttons

### 4.3 AdSense account setup

1. [Google AdSense](https://www.google.com/adsense/) → sign up with Google account
2. Add site: `convertmystuff.com` (not the `.vercel.app` URL)
3. Paste AdSense verification code in site `<head>` (temporary — can use env-driven script like analytics)
4. Wait for review (days to a few weeks)
5. After approval, create **ad units** for:
   - Display / responsive (sidebar + below-tool)
   - In-article or multiplex (in-content blocks on long pages)

Save from AdSense dashboard:

- **Publisher ID:** `ca-pub-XXXXXXXXXXXXXXXX`
- **Ad slot IDs** per unit (for `<ins data-ad-slot="...">`)

### 4.4 Implementation checklist (when approved)

**Environment variables** — add to [`.env.example`](../.env.example) and Vercel:

| Variable | Example | Purpose |
|----------|---------|---------|
| `NEXT_PUBLIC_ADSENSE_CLIENT` | `ca-pub-XXXXXXXXXXXXXXXX` | Publisher ID |
| `NEXT_PUBLIC_ADSENSE_SLOT_BELOW_TOOL` | numeric slot id | Below-tool unit |
| `NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR` | numeric slot id | Sidebar unit |
| `NEXT_PUBLIC_ADSENSE_SLOT_IN_CONTENT` | numeric slot id | In-content unit |

**Code changes (small, focused diff):**

1. **`AdSlot.tsx`** — when `NEXT_PUBLIC_ADSENSE_CLIENT` is set and env is production:
   - Load AdSense script once (similar pattern to `AnalyticsPlaceholder`)
   - Render `<ins class="adsbygoogle" ...>` per placement with matching slot env var
   - Call `(adsbygoogle = window.adsbygoogle \|\| []).push({})` after mount (client component)
2. **Keep dev behavior** — show dashed placeholder when AdSense env vars are unset or `NODE_ENV !== 'production'`
3. **`ads.txt`** — add `public/ads.txt` with line from AdSense:  
   `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`
4. **Footer** — update tracking copy when ads are enabled (similar to analytics conditional)
5. **CSP** — if you add a strict Content-Security-Policy later, allow `https://pagead2.googlesyndication.com` and related Google ad domains
6. **Cookie / consent** — if you have EU traffic, plan a consent banner before enabling personalized ads (AdSense → Privacy & messaging)

**UX guardrails** (from monetization plan — do not break these):

- Do **not** place ads inside the core input/output area
- No popups before the user completes a tool action
- Tool interface stays above the fold
- Sidebar ads hidden on mobile (current layout already uses a single column on small screens)

### 4.5 After launch

- [ ] AdSense → check **Sites** for policy warnings
- [ ] Search Console → monitor Core Web Vitals (ads can affect CLS — use fixed-height ad containers)
- [ ] Track RPM by placement in AdSense reports; disable weak placements before adding new ones
- [ ] Revisit [`docs/07-monetization-plan.md`](./07-monetization-plan.md) for category-specific tests (affiliate, lead-gen later)

---

## Phase 5 — Ongoing maintenance

| Task | Frequency |
|------|-----------|
| Review Dependabot PRs | Weekly |
| `npm audit` via CI | Every push |
| Search Console coverage / indexing | Monthly |
| AdSense policy + revenue review | Monthly |
| Tool content review | Per [monthly-review-process.md](./content/monthly-review-process.md) |
| Rotate any exposed tokens | If credentials ever leak |

---

## Quick decision tree

```
Have the domain?
  NO  → Keep building on .vercel.app; skip Phases 2–4 domain steps
  YES → Phase 2 (DNS + env) → Phase 3 (Search Console + optional GA4)
                              → Phase 4 (Privacy page → AdSense apply → wire AdSlot)
```

---

## Links

| Resource | URL |
|----------|-----|
| GitHub repo | https://github.com/Tinclay12/convertmystuff |
| Vercel project | https://vercel.com/claytons-projects-6e3f59e4/convertmystuff |
| Production (interim) | https://convertmystuff.vercel.app |
| Target production | https://convertmystuff.com (after Phase 2) |
| AdSense | https://www.google.com/adsense/ |
| Search Console | https://search.google.com/search-console |
