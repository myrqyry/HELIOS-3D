# HELIOS-3D

HELIOS-3D is a static Astro 5 site with React/Three.js visualizations and
Python-based validation for the research and simulation side of the repo.

## Shared conventions

- Treat `AGENTS.md` as the canonical instruction file. Use the uppercase
  variant only.
- Keep claims tagged. Do not strengthen `[SPECULATIVE]` or `[PROPOSED]`
  language without source updates.
- Do not edit generated output: `dist/`, `.astro/`, `__pycache__/`,
  `.pytest_cache/`.
- Use the smallest command that proves the change.
- Prefer focused edits over root-level cleanup unless the task is about repo
  structure.

## Commands

- Frontend check: `pnpm check`
- Frontend tests: `pnpm test`
- Frontend build: `pnpm build`
- E2E: `pnpm test:e2e`
- Python tests: `make test`
- Claims check: `make check-claims`
- ERC data check: `make validate-erc`
- Link check: `make check-links`
- Simulation syntax check: `make check-sims`
- Full site build: `make build`

## Routing

- When editing repo documentation or site meta docs, read `docs/AGENTS.md`.
- When editing public content under `src/content/docs/`, read
  `src/content/docs/AGENTS.md`.
- When editing pages, read `src/AGENTS.md`.
- When editing Astro or React components, read `src/components/AGENTS.md` and
  the nearest nested file such as `src/components/ui/AGENTS.md`,
  `src/components/r3f/AGENTS.md`, `src/components/research/AGENTS.md`, or
  `src/components/visual-summaries/AGENTS.md`.
- When editing data modules, read `src/data/AGENTS.md`.
- When editing utility helpers, read `src/utils/AGENTS.md`.
- When editing scripts, read `scripts/AGENTS.md`.
- When editing simulation configs or analysis code, read `simulations/AGENTS.md`
  and `analysis/AGENTS.md`.
- When editing tests, read `tests/AGENTS.md` and the nearest `__tests__/`
  instruction file.
- When editing ASCII art assets, read `ascii/AGENTS.md`.

## Canonical app

<!-- Evolution: 2026-07-17 | source: ep-2026-07-17-002 | description: Astro→Vite migration pattern -->

The canonical app lives in `app/`. Do not modify root `astro.config.mjs`, root
`package.json`, or root `src/` unless the task explicitly targets the old
Astro build.

- **app build**: `pnpm --dir app build`
- **app dev**: `pnpm --dir app dev`
- **app check**: `pnpm --dir app check`
- **app test**: `pnpm --dir app test`
- **app E2E**: `pnpm --dir app test:e2e`

### App routing

When editing the new app (`app/src/`), read `app/src/AGENTS.md` if it exists,
then the nearest nested instruction file.

## Quick guidance

- `docs/` contains repo documentation and snapshot archives.
- `src/pages/` owns routes, `src/components/` owns reusable UI, `src/data/`
  owns validated research records, and `src/utils/` owns pure helpers.
- `src/components/r3f/` is the old Astro Three.js client-hydration area; keep
  heavy scene work in `app/src/components/r3f/` for the new app.
- `app/src/components/r3f/` has its own AGENTS.md with exhibit/scene patterns.
