# Task 5 — Accessibility, mobile, and final verification

## Scope

Audited the canonical `app/` Vite + React exhibit only. Root Astro files and
unrelated worktree changes were not modified.

## Findings and fixes

- **Mobile header overflow:** the primary navigation and technical-stage select
  were laid out as one non-wrapping row. The header now stacks on narrow
  screens, wraps navigation items, and uses mobile-first spacing.
- **Unintended exhibit overflow:** the home exhibit had a negative horizontal
  margin despite already being rendered outside the padded archive article.
  Removing it prevents the exhibit from exceeding the viewport.
- **Keyboard focus:** navigation and general interactive elements now retain a
  visible amber `:focus-visible` outline. Header links have touch-sized inline
  targets.
- **Figure filter controls:** filter buttons now declare `type="button"`, have
  touch-sized targets and visible focus rings, and are grouped with semantic
  `fieldset`/`legend` labels rather than relying on color alone.
- **Heading structure:** non-section labels previously using `h4` were changed
  to paragraphs, and the table-of-contents label now uses `h2`, avoiding
  heading-level jumps in the exhibit and archive content.
- **Reduced motion/static behavior:** the existing global reduced-motion rules,
  scene motion gating, and explanatory text fallbacks were verified and left
  intact; no defect was found requiring scene changes.
- **WebGL fallback explanations:** the exhibit already provides explanatory
  text fallbacks for the curated scenes; no defect was found requiring new
  fallback copy.

## Verification results

| Command | Result |
| --- | --- |
| `pnpm --dir app exec tsc -b` | **PASS** (exit 0) |
| `pnpm --dir app build` | **PASS** (exit 0) |
| `pnpm --dir app test -- --run` | **PASS** — 40/40 tests |
| `pnpm --dir app test:e2e` | **NOT PASSING** — Playwright loaded Vitest suites and reported `No tests found`; no `app/e2e/` tests or Playwright config exists in the canonical app. |
| `git diff --check` | **NOT CLEAN** — reports pre-existing unrelated trailing whitespace at `src/components/r3f/DmiChirality.tsx:36`; it was not modified. |

The production build emitted the known chunk-size warning: `index-Ba4xqYzj.js`
is 2,028.79 kB, exceeding the 500 kB warning threshold. This is a warning,
not a build failure.

## Commit

`2a438ae339f74e44395c87fe0f51b1b93785a2b9` —
`test: verify app visual exhibit`

Only the ten intended `app/src/` verification-fix files were committed.

## Final control accessibility fix

- Added `aria-pressed` state to all figure source and kind filter buttons.
- Increased the technical stage select to a 44px minimum touch target.
- `pnpm --dir app exec tsc -b` — **passed**.
- `pnpm --dir app test -- --run` — **passed**, 2 files, 40 tests.
- `pnpm --dir app build` — **passed**; chunk-size warning only.
- Commit: `9b0b40e` (`fix: expose exhibit filter state`).

## Final architecture fix

- Primary navigation now points to `/explore`, `/visuals`, `/evidence`, and
  `/technical-archive`; `/explore` renders the guided exhibit narrative.
- Below-fold scenes use `DeferredScene` with IntersectionObserver, Suspense, and
  visible static fallbacks. Canvas DPR is capped at `[1, 1.5]`.
- R3F canvas errors render visible fallback copy, and continuously animated
  scenes expose pause controls.
- TOHE evidence distinguishes demonstrated simulation results from inferred
  experimental readout.
- `pnpm --dir app exec tsc -b` — **passed**.
- `pnpm --dir app test -- --run` — **passed**, 2 files, 41 tests.
- `pnpm --dir app build` — **passed**; Vite chunk-size and dynamic-import
  advisories remain warnings only.
- `git diff --check -- app` — **passed**.
- Commit: `8d3f2af` (`fix: complete exhibit architecture`).

## Final whole-branch review follow-up

### Changed files

- `app/src/App.tsx`
- `app/src/components/Header.tsx`
- `app/src/components/exhibit/DeferredScene.tsx`
- `app/src/components/exhibit/exhibit-primitives.test.tsx`
- `app/src/components/r3f/R3FCanvas.tsx`
- `app/src/components/r3f/HopfionScene.tsx`
- `app/src/components/r3f/SkyrmionScene.tsx`
- `app/src/components/r3f/MaterialStack.tsx`
- `app/src/components/r3f/TopologicalOrbitalHall.tsx`
- `app/src/pages/HomePage.tsx`
- `app/src/pages/VisualsPage.tsx`
- `app/src/pages/EvidencePage.tsx`

### Verification and commit status

The requested validation commands and commit could not be executed because the
available environment denied shell access:

- `pnpm --dir app exec tsc -b` — **NOT RUN** (shell access denied)
- `pnpm --dir app test -- --run` — **NOT RUN** (shell access denied)
- `pnpm --dir app build` — **NOT RUN** (shell access denied)
- `git commit -m "fix: complete exhibit architecture"` — **NOT RUN** (shell access denied)
- Commit hash: **NONE**
