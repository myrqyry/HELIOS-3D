# Task 3 report

## Scope

Implemented the canonical app BRC exhibit scene and replaced the BRC section's
proxy TwistReservoir scene. The scene includes deterministic phase mapping,
instanced input/reservoir/readout elements, a visible phase legend, a pause /
resume training control, and static/reduced-motion behavior without React state
updates from `useFrame`.

## Files changed

- `app/src/components/r3f/BrownianReservoirScene.tsx`
- `app/src/components/r3f/DmiStabilizerScene.tsx`
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

## Final DMI fallback fix

- Reduced motion now renders only the coherent directional state.
- DMI includes visible fallback copy: “Competing spin directions resolve into a
  coherent twist; DMI helps hold the knot together.”
- Commit: `90a5c6a` (`feat: add brc and dmi exhibit scenes`).

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

- The existing `DmiChirality` scene remains available in the complete figures
  gallery; the homepage now uses the dedicated stabilizer scene.
- Commits: `43edbae` (`feat: add brc exhibit scene`) and `02ac802`
  (`feat: add dmi stabilizer exhibit`).

## DMI stabilizer completion

```text
pnpm --dir app exec tsc -b       PASSED — exit 0
pnpm --dir app test -- --run src/components/r3f/__tests__/exhibit-phases.test.ts
                                 PASSED — 2 files, 22 tests passed
pnpm --dir app build             PASSED — exit 0; chunk-size warning only
git commit -m "feat: add dmi stabilizer exhibit"
                                   CREATED — 02ac8029df59dceca0095b3f759addeae495444b
```

## Review-fix verification

The requested review-fix verification commands were run after the DMI scene
changes.

### `pnpm --dir app exec tsc -b`

```text
(no output)
```

### `pnpm --dir app test -- --run src/components/r3f/__tests__/exhibit-phases.test.ts`

```text

> helios-3d-site@2.0.0 test /home/myrqyry/MQR/HELIOS-3D/app
> vitest -- --run src/components/r3f/__tests__/exhibit-phases.test.ts


 RUN  v4.1.10 /home/myrqyry/MQR/HELIOS-3D/app


 Test Files  2 passed (2)
      Tests  22 passed (22)
   Start at  14:31:23
   Duration  1.21s (transform 351ms, setup 0ms, import 1.82s, tests 38ms, environment 0ms)
```

### `pnpm --dir app build`

```text

> helios-3d-site@2.0.0 build /home/myrqyry/MQR/HELIOS-3D/app
> tsc -b && vite build

vite v6.4.3 building for production...
transforming...
✓ 2497 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                                                            0.72 kB │ gzip:   0.43 kB
dist/assets/geist-mono-symbols2-wght-normal-GZpp1pK2.woff2                 5.80 kB
dist/assets/geist-mono-cyrillic-ext-wght-normal-I4S5G5Zfc.woff2             6.18 kB
dist/assets/geist-cyrillic-ext-wght-normal-DjL33-gN.woff2                  7.42 kB
dist/assets/geist-mono-vietnamese-wght-normal-D8KDMBhC.woff2               7.72 kB
dist/assets/geist-vietnamese-wght-normal-6IgcOCM7.woff2                     8.00 kB
dist/assets/bricolage-grotesque-vietnamese-wght-normal-BUzh504Q.woff2       8.61 kB
dist/assets/geist-mono-cyrillic-wght-normal-BmXc_FBt.woff2                 12.88 kB
dist/assets/geist-mono-latin-ext-wght-normal-DrnZ1wKl.woff2                14.78 kB
dist/assets/geist-cyrillic-wght-normal-BEAKL7Jp.woff2                      15.08 kB
dist/assets/geist-latin-ext-wght-normal-DC-KSUi6.woff2                     16.51 kB
dist/assets/bricolage-grotesque-latin-ext-wght-normal-CcLUaPy7.woff2        18.67 kB
dist/assets/geist-latin-wght-normal-BgDaEnEv.woff2                         29.40 kB
dist/assets/geist-mono-latin-wght-normal-B_7UjwxQ.woff2                    29.90 kB
dist/assets/bricolage-grotesque-latin-wght-normal-DLoelf7F.woff2             41.34 kB
dist/assets/index-nzWmGeyq.css                                             52.65 kB │ gzip:   9.74 kB
dist/assets/index-C37BryUq.js                                           2,013.15 kB │ gzip: 496.80 kB
✓ built in 11.89s

(!) Some chunks are larger than 500 kB after minification. Consider:
- Using dynamic import() to code-split the application
- Use build.rollupOptions.output.manualChunks to improve chunking: https://rollupjs.org/configuration-options/manualChunks
- Adjust chunk size limit to this warning via build.chunkSizeWarningLimit.
```
