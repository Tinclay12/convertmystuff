# Deployment Guide

GitHub and Vercel setup for ConvertMyStuff.

## GitHub repository setup

After creating the remote repository:

1. **Secret scanning** — enabled by default on public repos; enable under Settings → Code security for private repos.
2. **Dependabot alerts** — Settings → Code security → Dependabot → enable alerts (config in [`.github/dependabot.yml`](../.github/dependabot.yml)).
3. **Branch protection** (recommended once CI is green) — Settings → Branches → protect `main`:
   - Require pull request before merging
   - Require status checks: `ci`

### Pre-push checklist

```bash
git status          # .next/ and .env* must not be staged
git ls-files        # no .env, .pem, or credential files tracked
```

Never force-add `.next/` or `.env.local`.

## Vercel deployment

1. Import the GitHub repository in [Vercel](https://vercel.com/new).
2. Set **Node.js version** to 20 (matches [`.nvmrc`](../.nvmrc) and `package.json` engines).
3. Configure **Environment Variables** for Production (and Preview if needed):

| Variable | Production | Notes |
|----------|------------|-------|
| `NEXT_PUBLIC_SITE_URL` | **Required** | e.g. `https://convertmystuff.com` |
| `NEXT_PUBLIC_ANALYTICS_ID` | Optional | GA4 measurement ID |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Optional | Search Console |
| `NEXT_PUBLIC_BING_VERIFICATION` | Optional | Bing Webmaster |
| `NEXT_PUBLIC_YANDEX_VERIFICATION` | Optional | Yandex |
| `NEXT_PUBLIC_YAHOO_VERIFICATION` | Optional | Yahoo |

Copy from [`.env.example`](../.env.example). No server-only secrets are required for the current build.

4. Deploy. Verify security headers at [securityheaders.com](https://securityheaders.com) after go-live.

## `/og/` route hardening

The OG image route (`/og/`) is the only CPU-heavy server endpoint. Mitigations in place:

- **Cache-Control** headers on responses ([`src/app/og/route.ts`](../src/app/og/route.ts) and [`vercel.json`](../vercel.json))
- Input truncation in [`src/lib/seo/og-image-card.tsx`](../src/lib/seo/og-image-card.tsx)

**Recommended in Vercel dashboard** (requires Pro plan for Firewall):

1. Project → Settings → Firewall
2. Add a rate limit rule for path `/og/*` (e.g. 60 requests/minute per IP)

This cannot be configured fully in-repo on all plans; enable manually before high-traffic launch.

## CI pipeline

[`.github/workflows/ci.yml`](../.github/workflows/ci.yml) runs on push and pull requests:

- `npm ci`
- `npm run lint`
- `npm run test`
- `npm run build`
- `npm audit --audit-level=high`

Fix any audit failures before merging to `main`.

## Local production test

```bash
npm run build
npm run start
```

Verify OG caching:

```bash
curl -I "http://localhost:3000/og/?title=Test"
# Expect: Cache-Control: public, max-age=86400, ...
```
