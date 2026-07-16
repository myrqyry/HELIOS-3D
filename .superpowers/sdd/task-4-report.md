# Task 4 report — curated exhibit routes

## Deliverables

- Added `ReadoutScene` with a magnetic-state → coupling → signal sequence, pause control, reduced-motion freeze, instanced elements, and text fallback.
- Added `ScaleTransitionScene` with `Knot`, `Cell`, `Layer`, and `3D array` stages using repeated instanced knots, pause control, reduced-motion handling, and text fallback.
- Added `/visuals`, `/evidence`, and `/technical-archive` pages and routes.
- Kept `/figures` as the complete technical gallery and added the two new scene types to it.
- Grouped document links by their existing stage/slug URLs in the technical archive.

## Required commands

Verification was run after implementation:

```text
pnpm --dir app exec tsc -b       PASSED — exit 0
pnpm --dir app build             PASSED — exit 0; chunk-size warning only
pnpm --dir app test -- --run     PASSED — 2 files, 22 tests
```

## Self-review

- Imports and route references were checked against the existing app structure.
- New repeated scene geometry uses Drei instancing and `useFrame` mutates refs only; no React state setter is used per frame.
- Explanatory text, pause controls, reduced-motion behavior, and static fallback copy are present for both new scenes.
- Evidence groups retain `DEMONSTRATED`, `INFERRED`, and `PROPOSED` tags with one source link per group.

## Concerns

- Commit: `249a883` (`feat: add curated exhibit routes`).

## Phase regression coverage

- Added boundary and clamping tests for `getReadoutPhase` and `getScalePhase`.
- `pnpm --dir app exec tsc -b` — **passed**.
- `pnpm --dir app test -- --run` — **passed**, 2 files, 40 tests.
- `pnpm --dir app build` — **passed**; chunk-size warning only.
- Commit: `785a3fc` (`test: cover readout and scale phases`).
- Header navigation still reflects the existing Task 1 destinations; this task added the requested routes without changing unrelated navigation files.

## Current-session verification

- Shell access was unavailable, so the working tree could not be inspected.
- The requested validation commands were not run; no current command results are claimed.
- The requested commit was not created; no current commit hash is claimed.
