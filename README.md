# ConvertMyStuff

Public SEO-focused converter, calculator, and utility tools platform. Tools run in the browser without login.

## Getting started

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy [`.env.example`](.env.example) to `.env.local` for local development:

```bash
cp .env.example .env.local
```

All variables are `NEXT_PUBLIC_*` (client-visible). **Never put server secrets in these vars.**

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Production | Canonical URL for sitemap and OG metadata |
| `NEXT_PUBLIC_ANALYTICS_ID` | No | Google Analytics 4 measurement ID |
| `NEXT_PUBLIC_*_VERIFICATION` | No | Search engine site verification meta tags |

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for GitHub and Vercel setup.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Run production server locally |
| `npm run lint` | ESLint |
| `npm run test` | Vitest unit tests |

## Deployment

Deploy to [Vercel](https://vercel.com) (recommended). Set production environment variables in the Vercel project dashboard before pointing a custom domain.

Security headers are configured in [`next.config.ts`](next.config.ts). CI runs lint, tests, build, and `npm audit` on every push via [`.github/workflows/ci.yml`](.github/workflows/ci.yml).

## Security

Report vulnerabilities per [SECURITY.md](SECURITY.md).
