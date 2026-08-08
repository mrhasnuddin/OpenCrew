# OPENCREW Labs — website

Marketing and crew-directory site for OPENCREW Labs, a global team and growth
partner for Web3, AI and new-finance projects.

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind v4 · Turbopack.

## Running it

```bash
npm install
npm run dev
```

| Script | Does |
| --- | --- |
| `npm run dev` | Dev server on :3000 (Turbopack) |
| `npm run build` | Production build (Turbopack) |
| `npm run build:webpack` | Webpack fallback — only if a Turbopack bug blocks a release |
| `npm start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |

Turbopack is the default for a reason: the Webpack builder crashes in its WASM
hasher on Node 24 when `next/og` is present.

## Environment

Copy `.env.example` to `.env.local`. Every value is optional in development.

`NEXT_PUBLIC_SITE_URL` drives canonical URLs, `sitemap.xml`, `robots.txt` and OG
image URLs. The three `RESEND_*`/`BRIEF_*` keys activate direct sending on
`/api/brief`; with any missing, the endpoint returns 501 and both forms fall
back to compose-and-copy rather than showing a false success screen.

## Layout

| Path | Holds |
| --- | --- |
| `app/` | Routes (App Router) |
| `components/marketing/` | Landing-page sections |
| `components/crew/` | Directory, filters, crew builder |
| `components/ui/`, `components/primitives/` | Shared building blocks |
| `content/` | Copy and data — **the source of truth for shipped text** |
| `lib/` | Team records, shortlist state, helpers |
| `design/tokens.css` | The whole design system |

### Two things worth knowing before editing

**`design/tokens.css` is three tiers.** Primitives in `:root`, semantic names in
`@theme`, component values on top. Light is the default; `[data-theme="dark"]`
overrides it. The `.on-inverse` class re-declares the semantic layer to dark
values for a subtree, which is why components inside an inverse band carry no
theme-aware classes of their own.

**`content/` is data, not decoration.** Adding a crew member or an engagement is
a data edit, not a code change — crew filter facets are computed from whatever
values the records actually carry.

## A standing constraint

Every person in `content/crew.ts` and `lib/team.ts` is a real individual who has
agreed to be listed, and the engagement claims in `content/site.ts` are fixed
wording. Do not invent members, statistics, or client outcomes, and do not
paraphrase the milestone strings — the proposition of this site is verifiable
people, and one invented profile is the first thing diligence would find.

Naming an institution in text and displaying its trademark are separate
permissions; institution logos stay `null` until written permission exists.

## Status

First draft. Contact details are placeholders, the legal pages are marked drafts
pending review, and institution domains and descriptions are best-effort and
require verification before launch.
