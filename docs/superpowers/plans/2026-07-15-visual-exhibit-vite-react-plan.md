# HELIOS-3D Vite React visual exhibit implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the canonical `app/` Vite + React site as a visual science exhibit explaining magnetic knots, BRC training, DMI stabilization, readout, and scaling.

**Architecture:** Keep `app/src` as the only redesign target. The React Router shell owns the exhibit routes, React pages own explanatory copy, and React Three Fiber owns client-only scenes. The root Astro tree is not part of this redesign and remains unchanged.

**Tech Stack:** Vite 6, React 19, TypeScript, React Router 7, Tailwind CSS v4, React Three Fiber 9, Drei 10, Three.js 0.184, existing GSAP utilities.

## Global Constraints

- Canonical app: `app/`; do not modify root `src/`, root `astro.config.mjs`, or root `package.json` for this redesign.
- Primary message: **HELIOS-3D is a 3D computer built from magnetic knots.**
- Visual direction: interactive science exhibit with cinematic research-concept atmosphere.
- BRC leads with training: inputs perturb the field, and a readout learns the resulting patterns.
- DMI leads with stabilization: DMI helps hold the knot together.
- Preserve claim tags and source status exactly.
- Main visitor path must not be a link-heavy document index.
- Every interactive visual needs concise text and a static fallback.
- Respect reduced motion and provide pause controls for animated scenes.
- Use instancing for repeated magnetic elements and avoid React state writes in `useFrame`.
- Keep existing `app` document routes working.
- Verify with `pnpm --dir app build`, `pnpm --dir app exec tsc -b`, and `pnpm --dir app test -- --run`.

## Task 1: Establish exhibit primitives and navigation

**Files:**
- Create: `app/src/components/exhibit/ExhibitSection.tsx`
- Create: `app/src/components/exhibit/ExhibitControl.tsx`
- Modify: `app/src/components/Layout.tsx`
- Modify: `app/src/components/Header.tsx`
- Modify: `app/src/components/Footer.tsx`
- Modify: `app/src/styles/global.css`

- [ ] Define `ExhibitSectionProps` with `eyebrow`, `title`, `description`, `evidenceLabel`, `evidenceHref`, and `children`.
- [ ] Render a semantic section with one heading, explanatory copy, a visual region, and an optional evidence link.
- [ ] Define `ExhibitControlProps` with `label`, `paused`, and `onToggle`; render a native button with `aria-pressed` and a visible focus ring.
- [ ] Change the header navigation to `Explore`, `Visuals`, `Evidence`, `Technical archive`, and `GitHub`.
- [ ] Keep the stage filter available only where technical filtering is useful; do not show it as the main exhibit control.
- [ ] Add responsive two-column-to-one-column exhibit styles and reduced-motion rules.
- [ ] Run `pnpm --dir app exec tsc -b` and `pnpm --dir app build`.
- [ ] Commit with `git commit -m "feat: add app exhibit primitives"`.

## Task 2: Rebuild the app homepage narrative

**Files:**
- Modify: `app/src/pages/HomePage.tsx`
- Modify: `app/src/App.tsx`
- Modify: `app/src/components/Layout.tsx`

- [ ] Replace the current document-heavy homepage with this order: knot hero, Store/Compute/Read prompts, knot explainer, BRC, DMI, readout, scaling, evidence/depth.
- [ ] Use the exact hero message “HELIOS-3D is a 3D computer built from magnetic knots.”
- [ ] Keep hero copy concise and remove the claims table, research feed, reading path, and multiple document cards from the homepage.
- [ ] Add `Explore` as the canonical route to the guided story, preserving `/` as the entry route.
- [ ] Ensure each section contains a text fallback alongside its visual.
- [ ] Run `pnpm --dir app exec tsc -b` and `pnpm --dir app build`.
- [ ] Commit with `git commit -m "feat: reshape app homepage as exhibit"`.

## Task 3: Build BRC and DMI exhibit scenes

**Files:**
- Create: `app/src/components/r3f/BrownianReservoirScene.tsx`
- Create: `app/src/components/r3f/DmiStabilizerScene.tsx`
- Create: `app/src/components/r3f/__tests__/exhibit-phases.test.ts`
- Modify: `app/src/pages/HomePage.tsx`
- Modify: `app/src/components/r3f/R3FCanvas.tsx`

- [ ] Export pure `getReservoirPhase(progress)` mapping `input`, `reservoir`, and `readout` phases.
- [ ] Test boundaries at `0`, `0.19`, `0.2`, `0.79`, `0.8`, and `1`.
- [ ] Implement BRC with instanced field particles or markers, visible input pulses, relaxation, readout, phase label, and pause control.
- [ ] Do not call React state setters from the BRC `useFrame` callback.
- [ ] Export pure `getStabilizerPhase(progress)` mapping `competing`, `stabilizing`, and `coherent` phases.
- [ ] Implement DMI with instanced directional elements showing competing directions resolving into a coherent twist.
- [ ] Lead with “DMI helps hold the knot together.” Keep handedness as secondary text.
- [ ] Add static fallback text and reduced-motion freeze behavior to both scenes.
- [ ] Run `pnpm --dir app test -- --run src/components/r3f/__tests__/exhibit-phases.test.ts`, `pnpm --dir app exec tsc -b`, and `pnpm --dir app build`.
- [ ] Commit with `git commit -m "feat: add brc and dmi exhibit scenes"`.

## Task 4: Build readout, scaling, visuals, evidence, and archive routes

**Files:**
- Create: `app/src/components/r3f/ReadoutScene.tsx`
- Create: `app/src/components/r3f/ScaleTransitionScene.tsx`
- Create: `app/src/pages/VisualsPage.tsx`
- Create: `app/src/pages/EvidencePage.tsx`
- Create: `app/src/pages/TechnicalArchivePage.tsx`
- Modify: `app/src/App.tsx`
- Modify: `app/src/pages/FiguresPage.tsx`

- [ ] Implement readout as one magnetic state becoming one simple electrical or optical signal.
- [ ] Implement scale transition as `Knot`, `Cell`, `Layer`, and `3D array` using instanced repeated knots.
- [ ] Add routes `/visuals`, `/evidence`, and `/technical-archive`.
- [ ] Make `/visuals` a curated five-visual gallery, not the existing all-figures dump.
- [ ] Put demonstrated, inferred, and proposed claims on `/evidence` with one source link per claim group.
- [ ] Group existing document routes on `/technical-archive` without changing their URLs.
- [ ] Keep `/figures` available as the complete technical gallery and link to it from the archive.
- [ ] Run `pnpm --dir app exec tsc -b`, `pnpm --dir app build`, and `pnpm --dir app test -- --run`.
- [ ] Commit with `git commit -m "feat: add curated exhibit routes"`.

## Task 5: Accessibility, mobile, and final verification

**Files:**
- Modify: `app/src/styles/global.css`
- Modify: new exhibit components only where verification identifies a defect.
- Test: `app/e2e/` or existing Playwright test locations.

- [ ] Verify one `h1` per page, ordered headings, native controls, visible keyboard focus, and non-color labels.
- [ ] Verify reduced-motion mode freezes or simplifies scenes while preserving explanatory text.
- [ ] Verify narrow viewports stack copy before visuals and do not introduce unintended horizontal overflow.
- [ ] Verify no WebGL fallback leaves a section without an explanation.
- [ ] Run `pnpm --dir app exec tsc -b`, `pnpm --dir app build`, `pnpm --dir app test -- --run`, and `pnpm --dir app test:e2e`.
- [ ] Inspect `git diff --check` and the canonical app diff.
- [ ] Commit with `git commit -m "test: verify app visual exhibit"`.

## Self-review

- The plan targets only `app/`, matching the user's canonical-app decision.
- The plan covers the approved narrative, BRC training, DMI stabilization, visual curation, archive separation, accessibility, and verification.
- All scene phase names, route names, commands, and file paths are explicit.
- No root Astro files are included in the task file lists.
