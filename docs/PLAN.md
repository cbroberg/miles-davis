# miles-davis — PLAN (DRAFT, bootstrapped by cc for owner review)

> Status: **draft**. Written from the code during cardmem Init (Branch C, init.4).
> Nothing below is decided until the owner has read, edited and merged it.
> After merge, Branch B cuts this plan into epics → journeys → stories.

## Purpose

A static tribute site to Miles Dewey Davis III (1926–1991): albums with
personnel, tracks and liner notes; his five creative eras; a full
chronological discography with Apple Music links; a rotating quote stream.

## Current state (what is already built and live)

| Area | What exists |
|---|---|
| Stack | Vite 5 + Preact 10 + Tailwind v4, built with Bun; prerendered static HTML |
| Content | `@webhouse/cms` (filesystem adapter) — `content/{albums,eras,quotes,global}/*.json`, schema in `cms.config.ts` (locales `en`, `da` declared) |
| Pages | `/` (hero + quote rotator + eras + covers), `/albums`, `/albums/:slug`, `/eras`, `/eras/:slug`, `/discography` (43 albums, grid/list toggle, iTunes artwork, Apple Music links), `/about`, 404 |
| Routing | Custom base-path-aware router (`src/lib/router.tsx`) for GitHub Pages under `/miles-davis/` |
| Deploy | GitHub Actions → GitHub Pages on every push to `main` |
| CI gates | cardmem secret gate + security gate workflows |

## Known gaps (observed in the code, not yet planned work)

- **Only 6 of 43 albums have CMS detail pages**; the rest exist only as rows in `src/data/discography.ts`. Prerender routes in `vite.config.ts` are a hand-kept list.
- **Danish locale declared but no Danish content.**
- **No `data-testid` anchors** (0 in `src/`) — Lens cannot verify any page yet.
- **No tests**; `bun run build` is the only gate.
- **Styling is inline `style=` strings with hard-coded hex colours**, not theme tokens (cf. D-dde278, `@broberg/theme`).
- **Hosting is GitHub Pages (US)**, not EU (D-2287db) — needs an owner decision whether that matters for a public static tribute site.
- Google Fonts loaded from Google's CDN (privacy/EU consideration).
- No README.

## Possible next steps (proposals — owner picks)

1. **Lens readiness** — add `data-testid` to every interactive element (nav, quote dots, grid/list toggle, album cards, Apple Music links).
2. **Album depth** — CMS detail pages for more (or all) of the 43 albums; derive prerender routes from content instead of a hand list.
3. **Danish edition** — translate content and add a locale switch.
4. **Theme tokens** — move inline colours/fonts into CSS tokens / `@broberg/theme`.
5. **Hosting** — keep GitHub Pages, or move to an EU host.
6. **README** for the repo.

## Open questions for the owner

1. Is this site still live and wanted, or a demo/showcase for `@webhouse/cms`?
2. Which of the six next steps (if any) do you want — and in what order?
3. Does the EU-hosting rule apply to this public static site?
