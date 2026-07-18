# src/components/r3f

<!-- Evolution: 2026-07-17 | source: ep-2026-07-17-002 | description: Exhibit/scene patterns -->

## What Lives Here

React Three Fiber (R3F) scenes used in the visual exhibit. Each scene teaches one
concept through a phased animation (e.g., BRC training phases, DMI stabilization
stages, readout mapping, scale transition).

## Scene Architecture

All scenes follow the phase-based animation pattern:

```typescript
// phase-logic.ts — pure function, testable independently
export type ScenePhase = 'phase_a' | 'phase_b' | 'phase_c'
export function getPhase(progress: number): ScenePhase { ... }

// Scene.tsx — minimal useFrame, delegates to phase function
useFrame((_, delta) => setProgress(p => Math.min(1, p + delta * speed)))
const phase = getPhase(progress)
// Render conditionally based on phase
```

## Patterns

- **Lazy loading**: Wrap each scene in `DeferredScene` (from `components/exhibit/`) to
  defer WebGL context creation until near-viewport.
- **Phase as pure function**: Separate `get{Name}Phase(progress)` into a standalone
  module so it can be unit tested without rendering.
- **Controls**: Wire pause/resume via `ExhibitControl` and a `paused` ref. When
  paused, skip `delta` accumulation in `useFrame`.
- **Reduced motion**: Read `usePrefersReducedMotion()` — if true, freeze the scene
  at its initial state and skip all animation.

## Available Scenes

| Scene | Phase Function | Phases | Testing |
|-------|---------------|--------|---------|
| `BrownianReservoirScene` | `getReservoirPhase` | input / reservoir / readout | `exhibit-phases.test.ts` |
| `DmiStabilizerScene` | `getStabilizerPhase` | competing / stabilizing / coherent | `exhibit-phases.test.ts` |
| `ReadoutScene` | linear progress bar | conceptual mapping | — |
| `ScaleTransitionScene` | scale stages | knot / cell / layer / array | — |

## Watch Out For

- Keep browser-only imports here.
- Scenes must handle the reduced-motion case (frozen on mount, no animation loop).
- Phase logic must be in a separate module from the scene component for testability.
