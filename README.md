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

`/api/sync-substack` saves new article **link cards** in Sanity: title, excerpt, date, publication, and feed image. Cards open the original article. It follows:

- Liminal Lines: `https://inesburrell.substack.com/feed`
- Persuasion: `https://www.persuasion.community/feed`, restricted to Ines Burrell's byline (including coauthored posts).

Substack's profile page aggregates several publications; its contents are not identical to Liminal Lines' RSS feed. Both feeds are needed to include her Persuasion articles directly.

A GitHub Actions workflow (`.github/workflows/sync-substack.yml`) calls the endpoint every 3 hours. Scheduled runs may be delayed. Sanity content is cached for up to 60 seconds, with tag revalidation after an import. Importing persists cards so they remain after leaving a feed's recent-post window. RSS is not a complete historical archive: older Persuasion articles need a separate backfill if wanted.

Existing full essays are preserved. Repeated runs skip known article URLs/slugs and use deterministic document IDs. Partial errors return a failing status so the workflow reports the issue and the next run can retry.

Needs `SYNC_SECRET` in Vercel; `SANITY_WRITE_TOKEN` can be supplied by Vercel or by the workflow's `X-Sanity-Token` header. GitHub secrets: `SYNC_SITE_URL`, `SYNC_SECRET`, `SANITY_WRITE_TOKEN`. The GitHub Actions job already has these names configured; verify a successful run after deployment. A read-only `GET /api/sync-substack` reports configuration flags, not token values.

Manual run (writes cards to the configured Sanity dataset):

```bash
curl -X POST https://inesburrell.com/api/sync-substack -H "Authorization: Bearer $SYNC_SECRET"
```

Local checks: `node --test tests/*.test.mjs`, `npm run lint`, and `npm run build`. Tests use fixture data and mocked Sanity writes.

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
