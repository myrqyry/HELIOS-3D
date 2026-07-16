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
- Header navigation still reflects the existing Task 1 destinations; this task added the requested routes without changing unrelated navigation files.
