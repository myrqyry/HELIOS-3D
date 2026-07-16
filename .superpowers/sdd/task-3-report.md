# Task 3 report

## Scope

Implemented the canonical app BRC exhibit scene and replaced the BRC section's
proxy TwistReservoir scene. The scene includes deterministic phase mapping,
instanced input/reservoir/readout elements, a visible phase legend, a pause /
resume training control, and static/reduced-motion behavior without React state
updates from `useFrame`.

## Files changed

- `app/src/components/r3f/BrownianReservoirScene.tsx`
- `app/src/components/r3f/__tests__/exhibit-phases.test.ts`
- `app/src/pages/HomePage.tsx`

## Required commands/results

Verification was run after implementation:

```text
pnpm --dir app exec tsc -b       PASSED — exit 0
pnpm --dir app test -- --run src/components/r3f/__tests__/exhibit-phases.test.ts
                                PASSED — 2 files, 16 tests
pnpm --dir app build             PASSED — exit 0; chunk-size warning only
```

## Static self-review

- `getReservoirPhase` clamps progress and maps the requested boundaries:
  `0–<0.2` input, `0.2–<0.8` reservoir, and `0.8–1` readout.
- The focused test covers `0`, `0.19`, `0.2`, `0.79`, `0.8`, and `1`.
- `useFrame` mutates refs only; it does not call React state setters.
- Drei `Instances` data is stable and instanced field elements are used for the
  pulses and reservoir markers.
- The scene retains visible static geometry and explanatory fallback text when
  reduced motion is preferred.

## Concerns

- The broader brief also mentions a DMI scene; this change intentionally stays
  within the requested BRC replacement scope and does not alter the existing
  DMI exhibit.
- Commit: `43edbae` (`feat: add brc exhibit scene`).
