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
- Stub simulation scan: `make check-stubs`
- Full site build: `make build`

## Routing

- When editing repo documentation or site meta docs, read `docs/AGENTS.md`.
- When editing public content under `src/content/docs/`, read
  `src/content/docs/AGENTS.md`.
- When editing pages, read `src/pages/AGENTS.md`.
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

## Quick guidance

- `docs/` contains repo documentation and snapshot archives.
- `src/pages/` owns routes, `src/components/` owns reusable UI, `src/data/`
  owns validated research records, and `src/utils/` owns pure helpers.
- `src/components/r3f/` is the Three.js client-hydration area; keep heavy scene
  work there and use the shared R3F wrapper patterns.
