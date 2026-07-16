# Task 2 report: reshape app homepage as exhibit

## Scope

Changed only the canonical Vite + React app files requested by the brief:

- `app/src/pages/HomePage.tsx`
- `app/src/App.tsx`
- `app/src/components/Layout.tsx`

The homepage now follows the approved exhibit order: knot hero; Store/Compute/Read prompts; knot explainer; BRC; DMI; readout; scaling; and evidence/depth. Existing R3F scenes are paired with visible text fallbacks. The `/explore` route aliases the existing guided `StartHerePage`, while `/` remains the entry route.

## Verification commands

Verification was run after implementation:

```text
pnpm --dir app exec tsc -b
PASSED — exit 0.

pnpm --dir app build
PASSED — exit 0; Vite emitted a chunk-size warning only.

pnpm --dir app test -- --run
PASSED — 1 file, 10 tests.
```

## Self-review

- Imports were checked against the existing files and component exports.
- Homepage imports no longer include the removed claims table, research feed, reading path, or document-card data.
- No `console.log`, `TODO`, `FIXME`, or `any` markers were found in the changed homepage.
- Existing skip-link behavior and route shell behavior are preserved; `/explore` is treated as an exhibit route without the technical sidebar.
- R3F scenes remain in `components/r3f` and retain their existing reduced-motion behavior.

## Concerns

1. The BRC and DMI sections currently use existing proxy scenes; dedicated BRC/DMI exhibit scenes are planned in Tasks 3 and 4.
2. Git commit: `b65d374` (`feat: reshape app homepage as exhibit`).
