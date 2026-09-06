# inesburrell.com

Website for Ines Burrell — geopolitical advisory. Next.js (App Router) + Sanity CMS, deployed on Vercel.

The full build plan lives in the parent working folder: `docs/website-build-plan.md`.

## Stack

- **Next.js 16** (App Router, TypeScript, Tailwind v4) — the site
- **Sanity** — content (essays, categories, future service pages), Studio embedded at `/studio`
- **Cal.com** — booking (`inesburrell/15min` on app.cal.eu), loaded via `src/components/CalScript.tsx`
- **Resend** — contact form email delivery (`/api/contact`)

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000 — the Studio is at http://localhost:3000/studio.

Environment variables: copy `.env.example` to `.env.local`. The Sanity project id/dataset have safe defaults; the contact form needs `RESEND_API_KEY` to actually send.

## Content

- Essays are managed in the Studio. Until real posts exist, the site renders design placeholders (`src/lib/fallbackEssays.ts`, `src/lib/sampleArticle.ts`) — delete both after the Substack migration.
- Publishing in Sanity revalidates the site via the webhook at `/api/revalidate` (secret: `SANITY_REVALIDATE_SECRET`), with a 60-second fallback window.

## Substack sync

`/api/sync-substack` pulls any new Liminal Lines essays from the Substack RSS feed into Sanity (idempotent, matched by Substack URL). It converts the post HTML to Portable Text and uploads the hero and inline images. A GitHub Actions workflow (`.github/workflows/sync-substack.yml`) calls it every 3 hours; it can also be run by hand:

```bash
curl -X POST https://inesburrell.com/api/sync-substack -H "Authorization: Bearer $SYNC_SECRET"
```

Needs `SANITY_WRITE_TOKEN` and `SYNC_SECRET` in Vercel, and `SYNC_SITE_URL` + `SYNC_SECRET` as GitHub repo secrets. New posts get a category by keyword; adjust in the Studio if needed.

## Deployment (Vercel)

Import this repo in Vercel and set:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `9f4iigah` |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `NEXT_PUBLIC_SITE_URL` | `https://inesburrell.com` |
| `RESEND_API_KEY` | from resend.com |
| `CONTACT_TO_EMAIL` | `info@inesburrell.com` |
| `CONTACT_FROM_EMAIL` | verified Resend sender |
| `SANITY_REVALIDATE_SECRET` | long random string, same as the Sanity webhook |
| `SANITY_WRITE_TOKEN` | Sanity API token (Editor) for the Substack sync |
| `SYNC_SECRET` | long random string protecting `/api/sync-substack` |

Also add the deployed URL (and localhost:3000) as CORS origins in sanity.io/manage so the embedded Studio can talk to the API.
