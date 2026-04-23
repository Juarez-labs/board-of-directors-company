# AI Agent Company Playbook — Website

Docusaurus 3 documentation site for the AI Agent Company Playbook. See
[BOAA-282](/BOAA/issues/BOAA-282) ADR for the full architecture decision.

## Local development

```bash
npm install
npm run start
```

Serves at `http://localhost:3000/board-of-directors-company/`.

## Build

```bash
npm run build
```

Outputs to `./build`. Preview with `npm run serve`.

## Deploy

Deploys automatically to GitHub Pages (`gh-pages` branch) on push to `master`
via `.github/workflows/website.yml`.

## Structure

- `docs/` — chapter markdown (migrated by DocOps per BOAA-283)
- `src/css/custom.css` — design tokens from BOAA-281 design-spec
- `src/theme/ColorModeToggle/` — swizzled gradient-blur dark/light toggle
- `src/components/SignalDot/` — mouse-reactive hero orb
- `src/components/ChapterCard/` — homepage card with per-chapter hover themes
- `src/pages/index.tsx` — Cloudflare-style custom homepage
