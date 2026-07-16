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

Commit: `a968844b24b5b66492d817fcc3beff5f8c938e92`

Commit message: `fix: harden app exhibit primitives`

## Remaining review fixes

- Added `data-stage-card` attributes to research cards and extended the shared
  `data-stage` CSS filter so stage selection hides nonmatching records and the
  all-stage state restores every record.
- Added `usePrefersReducedMotion` with synchronous initial `matchMedia` state
  and change-listener updates. Paused decorative `useFrame`, Drei `Float`, and
  star-field motion in all five app scenes while retaining static visuals and
  controls.
- Extended focused tests for research-card stage attributes and initial reduced
  motion detection.

## Remaining-fix verification

Command: `pnpm --dir app exec tsc -b`

Result: **passed** — exit 0, no output.

Command: `pnpm --dir app build`

Result: **passed** — exit 0, build completed; chunk-size warning only.

Command: `pnpm --dir app test -- --run`

Result: **passed** — exit 0, 1 file, 6 tests passed.

Commit: `2d2095f`

Commit message: `fix: complete app exhibit accessibility`

## Task 1 router fixture fix

Command: `pnpm --dir app exec tsc -b`

Result: **passed** — exit 0, no output.

Command: `pnpm --dir app test -- --run`

Result: **passed** — exit 0, 1 file, 6 tests passed.

Command: `pnpm --dir app build`

Result: **passed** — exit 0, build completed; chunk-size warning only.

Commit: `04e6d1d45eab12c50a93f4fa17bdc8e882c0b9d1`

Commit message: `test: fix exhibit router fixture`
