# Reza Tabrizi — Portfolio

Personal portfolio of Reza Tabrizi (Full-Stack Developer — .NET & Vue).
Built with **Nuxt 4**, **Tailwind CSS v4** and **shadcn-vue**, prerendered to static HTML and served by Nginx.

The visual language is a "technical drawing" system adapted from [ncdai/chanhdai.com](https://github.com/ncdai/chanhdai.com):
a single 768px rail, edge-to-edge hairlines, diagonal-stripe bands between panels, monochrome zinc palette,
Geist / Geist Mono type, Caveat margin notes and a CAD-style custom cursor.

## Quick start

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm generate     # static site → .output/public
pnpm lint && pnpm typecheck
```

Requires Node 22+ and pnpm 10 (`corepack enable`).

> **CV download:** the header button links to `/Reza_Tabrizi_CV.pdf`. Put the PDF in `public/` — it is not committed yet.

## Configuration

| Variable | Purpose |
|---|---|
| `NUXT_PUBLIC_SITE_URL` | Optional absolute origin (e.g. `https://example.com`) for canonical and Open Graph URLs. Omitted when unset. Read at build time. |

## Project structure

```
app/
  assets/css/        main.css (tokens → shadcn vars + Tailwind @theme), patterns.css, cursor.css, fonts.css
  assets/fonts/      Geist 500/600 + Geist Mono 400 (from the source repo)
  components/
    ui/              shadcn-vue primitives, restyled to the design: button, card, collapsible, input, kbd,
                     separator, tooltip + custom tag, icon-tile
    layout/          Panel (+Header/Title/Description/Content), StripeDivider, HandwrittenNote/Arrow,
                     SiteHeader, SiteFooter, ThemeToggle, BottomFade, CustomCursor
    portfolio/       ProfileHeader, FlipSentences, IntroItem, LocalTime, SocialLinks, TechStack,
                     ExperienceItem, PositionItem, Period, ProjectItem, EducationItem, Description, SkillTags
  data/portfolio.ts  All page copy (single source of truth — edit content here)
  lib/icons.ts       Lucide icon registry used by content data (tree-shaken)
  types/portfolio.ts Content types
  utils/date.ts      `formatDuration` (inclusive months → "1y 6m")
  layouts/default.vue, pages/index.vue, router.options.ts
public/              logos, favicon (add Reza_Tabrizi_CV.pdf here)
docker/              nginx.conf + security headers
```

`layout/` and `portfolio/` components auto-import by file name; `ui/` components are imported explicitly
from `@/components/ui/<name>` (shadcn-vue convention).

## Design system notes

- **Tokens** live in `app/assets/css/main.css` under `:root` / `.dark` using shadcn variable names
  (`--background`, `--primary`, `--border`, …) plus extras: `--line`, `--surface`, `--info`, `--link`, `--accent-muted`,
  `--tag-bg`, `--badge-bg`. Tailwind utilities are mapped via `@theme inline` (`bg-line`, `text-info`, `max-w-rail`, …).
- **Theme**: `@nuxtjs/color-mode` toggles `.dark` on `<html>` (no flash on static pages). Press **D** to toggle.
- **Patterns**: `screen-line-top/bottom(-border)`, `stripe-divider`, `diagonal-stripes`, `dot-grid` in `patterns.css`.
  Hairlines are `z-index:-1` pseudo-elements — the layout root is `isolate` and ancestors use `overflow-x: clip`.
- **Cursor**: `CustomCursor` (in `<ClientOnly>`). Add `data-cursor-label="…"` to set the readout on hover,
  `data-cursor` to make any element snap, `data-cursor="text"` for the I-beam. Disabled on touch and without lag
  for `prefers-reduced-motion`.
- Adding more shadcn-vue components: copy them from the registry (`npx shadcn-vue@latest add <name>`) and restyle
  with the tokens above — radius 10px (`rounded-lg`), 1px borders, rings instead of shadows.

## Deployment (Docker + Nginx)

```bash
docker compose up --build -d             # http://localhost:8080
# or
docker build --build-arg NUXT_PUBLIC_SITE_URL=https://example.com -t portfolio .
docker run -p 8080:8080 portfolio
```

- Multi-stage build: `node:22-alpine` runs `pnpm generate`; the runtime is `nginxinc/nginx-unprivileged` (non-root, port 8080).
- Nginx: gzip, immutable caching for `/_nuxt/*`, `no-cache` for HTML, security headers on every location.
- Compose runs the container read-only with all capabilities dropped.
- No Content-Security-Policy is set yet: Nuxt inlines its payload and the color-mode script, so a CSP needs hashes or
  `'unsafe-inline'` for scripts — add it at the reverse proxy once the final hosting is known.

`.gitlab-ci.yml` runs lint, typecheck and generate on every pipeline and pushes an image to the GitLab registry from
the default branch (only applies if this repo is mirrored to GitLab).
