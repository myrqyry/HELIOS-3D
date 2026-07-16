# Task 1 app fix report

## Status

Completed the Task 1 review fixes in the canonical `app/` Vite + React app.

## Changes

- Added CSS stage filtering for `Sidebar` sections and preserved the all-stage state when `data-stage` is absent.
- Made Header stage synchronization depend on both pathname and search; nontechnical routes now clear the HTML stage attribute without changing the saved preference.
- Expanded reduced-motion rules to disable animations and transitions globally, including pulse, glass cards, and CTA interactions, while retaining state changes.
- Added optional stable `ExhibitSection` IDs with sanitized React `useId()` fallbacks.
- Added deterministic focused tests for primary navigation, stage state helpers, `aria-pressed`, and evidence-link rendering.

## Verification

Command: `pnpm --dir app exec tsc -b`

Result: **passed**.

Command: `pnpm --dir app build`

Result: **passed**. Vite emitted a chunk-size warning; the build completed successfully.

Command: `pnpm --dir app test -- --run`

Result: **passed** — 1 test file, 4 tests.

## Commit

Commit: `01ed8c0df598ffcdbd73c34879546c62ccae03ca`

Commit message: `fix: harden app exhibit primitives`
