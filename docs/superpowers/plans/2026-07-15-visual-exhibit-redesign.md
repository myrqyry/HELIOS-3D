# HELIOS-3D visual exhibit redesign implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the public HELIOS-3D experience as a visual science exhibit that explains magnetic knots, BRC training, DMI stabilization, readout, and scaling before exposing technical documents.

**Architecture:** Keep Astro as the page and content shell and React Three Fiber as the client-only visual layer. Add small, focused narrative and scene components instead of replacing the existing document collection. The homepage becomes the guided exhibit, while evidence and technical archive routes remain accessible but secondary.

**Tech Stack:** Astro 5, React 19, TypeScript, Tailwind CSS v4, React Three Fiber 9, Drei 10, Three.js 0.184, existing GSAP reveal utilities.

## Global Constraints

- The primary visitor message is: **HELIOS-3D is a 3D computer built from magnetic knots.**
- The visual direction is an interactive science exhibit with cinematic research-concept atmosphere.
- BRC must lead with training: inputs perturb the field, and a readout learns the resulting patterns.
- DMI must lead with stabilization: DMI helps hold the knot together.
- Preserve `[DEMONSTRATED]`, `[INFERRED]`, `[PROPOSED]`, and `[SPECULATIVE]` claim language.
- Do not expose a wall of links or long paper-like copy on the main visitor path.
- Every interactive visual must have a concise text explanation and a static/non-WebGL fallback.
- Respect `prefers-reduced-motion`; provide pause controls for animated exhibit scenes.
- Use `client:visible` for heavy scenes and instancing for repeated magnetic elements.
- Do not update React state from `useFrame` unless the update is user-visible.
- Keep existing technical document URLs building and resolving.
- Verify with `pnpm build`; run `npx tsc --noEmit --pretty` for TypeScript changes.

## File map

Create or modify only these responsibilities:

- `src/pages/index.astro`: guided homepage narrative and exhibit section composition.
- `src/components/ExhibitSection.astro`: reusable visual/caption/evidence section shell.
- `src/components/r3f/BrownianReservoirScene.tsx`: BRC input, field response, and readout animation.
- `src/components/r3f/DmiStabilizerScene.tsx`: before/after DMI stabilization visual.
- `src/components/r3f/ReadoutScene.tsx`: magnetic state to signal/readout visual.
- `src/components/r3f/ScaleTransitionScene.tsx`: knot-to-cell-to-layer-to-array transition.
- `src/components/r3f/R3FCanvas.tsx`: shared fallback/error/loading behavior if needed.
- `src/components/Header.astro`: simplified exhibit-first navigation.
- `src/components/Footer.astro`: archive/GitHub links and provenance without duplicating navigation.
- `src/pages/visuals.astro`: curated visual gallery with short explanations.
- `src/pages/evidence.astro`: claim status and source links.
- `src/pages/technical-archive.astro`: grouped links to existing technical document routes.
- `src/styles/global.css`: exhibit layout, fallback, control, and reduced-motion styles.
- `src/components/visual-summaries/*`: update entry links only where the new archive path requires it.
- `tests/` or `src/components/**/__tests__/`: focused tests for pure phase/label logic if existing test conventions support them.

---

### Task 1: Build the exhibit section contract

**Files:**
- Create: `src/components/ExhibitSection.astro`
- Create: `src/components/ExhibitControl.astro`
- Modify: `src/styles/global.css`
- Test: accessibility markup inspection and `pnpm build`; no Astro component test is required for this presentational shell.

**Interfaces:**
- `ExhibitSection.astro` consumes `eyebrow`, `title`, `description`, `evidenceLabel`, `evidenceHref`, `visual`, and an optional `fallback` slot.
- `ExhibitSection.astro` produces a semantic `<section>` with one heading, one explanatory paragraph, a visual region, and an optional evidence link.

- [ ] **Step 1: Inspect existing layout and section classes**

  Run:

  ```bash
  rg -n "section|reveal-on-scroll|client:visible|glass-card" src/pages/index.astro src/components src/styles
  ```

  Confirm the new section does not duplicate an existing shared component with the same responsibility.

- [ ] **Step 2: Create the semantic section shell**

  Implement a two-column desktop layout that collapses to one column on small screens. The section must expose a `visual` slot and keep the explanatory copy under 60 words in the page caller.

  ```astro
  ---
  export interface Props {
    eyebrow: string;
    title: string;
    description: string;
    evidenceLabel?: string;
    evidenceHref?: string;
  }

  const { eyebrow, title, description, evidenceLabel, evidenceHref } = Astro.props;
  ---

  <section class="exhibit-section reveal-on-scroll reveal-initial" aria-labelledby={`${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-title`}>
    <div class="exhibit-copy">
      <p class="exhibit-eyebrow">{eyebrow}</p>
      <h2 id={`${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-title`}>{title}</h2>
      <p>{description}</p>
      {evidenceHref && evidenceLabel && <a class="exhibit-evidence-link" href={evidenceHref}>{evidenceLabel}</a>}
    </div>
    <div class="exhibit-visual" aria-label={`${title} visual`}>
      <slot name="visual" />
      <slot name="fallback" />
    </div>
  </section>
  ```

- [ ] **Step 3: Add responsive and reduced-motion styles**

  Add `.exhibit-section`, `.exhibit-copy`, `.exhibit-visual`, `.exhibit-eyebrow`, and `.exhibit-evidence-link` to `global.css`. Use a single visual per section, avoid decorative borders around every paragraph, and disable transform reveals under reduced motion. Pause buttons belong in each React scene wrapper so the control and animation state share one component boundary.

- [ ] **Step 4: Verify the contract**

  Run:

  ```bash
  npx tsc --noEmit --pretty
  pnpm build
  ```

  Expected: TypeScript passes and all existing routes build.

- [ ] **Step 5: Commit**

  ```bash
  git add src/components/ExhibitSection.astro src/styles/global.css
  git commit -m "feat: add exhibit section shell"
  ```

### Task 2: Rebuild the homepage as the guided narrative

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/components/Header.astro`
- Modify: `src/components/Footer.astro`
- Modify: `src/styles/global.css`

**Interfaces:**
- The homepage consumes existing `R3FCanvas`, `HopfionScene`, `ExhibitSection`, and the new scene components from later tasks.
- The header produces exactly five visitor-facing destinations: `Explore`, `Visuals`, `Evidence`, `Technical archive`, and `GitHub`.

- [ ] **Step 1: Replace document-first homepage copy**

  Keep the existing layout wrapper and SEO metadata, but replace the current link-heavy sequence with these sections in order:

  1. Knot hero with the exact message “HELIOS-3D is a 3D computer built from magnetic knots.”
  2. Store / Compute / Read prompt row.
  3. Magnetic knot explainer.
  4. BRC field.
  5. DMI stabilizer.
  6. Readout.
  7. Scale transition.
  8. Evidence/depth call-to-action.

- [ ] **Step 2: Keep technical copy behind intentional links**

  Replace multiple direct document cards with one `Technical archive` link and one `Evidence` link. Do not remove or rename existing document routes.

- [ ] **Step 3: Simplify the header**

  Update `Header.astro` so the primary nav uses the five destinations from the spec. Keep the stage filter only on technical archive and evidence pages; it must not dominate the exhibit header.

- [ ] **Step 4: Add fallback copy to each visual**

  Every scene mount must include a short sibling sentence or fallback slot that remains meaningful when WebGL is unavailable.

- [ ] **Step 5: Verify the first impression**

  Run:

  ```bash
  pnpm build
  ```

  Inspect the generated homepage with a local preview and confirm the first viewport contains one message, one visual, and no document list.

- [ ] **Step 6: Commit**

  ```bash
  git add src/pages/index.astro src/components/Header.astro src/components/Footer.astro src/styles/global.css
  git commit -m "feat: reshape homepage as visual exhibit"
  ```

### Task 3: Add the Brownian Reservoir Computing visual

**Files:**
- Create: `src/components/r3f/BrownianReservoirScene.tsx`
- Modify: `src/pages/index.astro`
- Test: `src/components/r3f/__tests__/BrownianReservoirScene.test.tsx` only for extracted pure phase mapping; do not test WebGL pixels in unit tests.

**Interfaces:**
- `BrownianReservoirSceneProps = { height?: string; interactive?: boolean; reducedMotion?: boolean }`.
- Scene phases are the exact string union `'input' | 'reservoir' | 'readout'`.
- The scene produces visible phase labels and a deterministic animation sequence.

- [ ] **Step 1: Define pure phase transitions before scene code**

  Create a small pure helper inside the scene file or a sibling utility:

  ```ts
  export type ReservoirPhase = 'input' | 'reservoir' | 'readout';

  export function getReservoirPhase(progress: number): ReservoirPhase {
    if (progress < 0.2) return 'input';
    if (progress < 0.8) return 'reservoir';
    return 'readout';
  }
  ```

- [ ] **Step 2: Test the phase mapping**

  Add the focused Vitest test at `src/components/r3f/__tests__/BrownianReservoirScene.test.tsx`, then run it. Expected boundaries: `0` and `0.19` are `input`, `0.2` and `0.79` are `reservoir`, and `0.8` and `1` are `readout`.

- [ ] **Step 3: Implement the visual with instancing**

  Use an `Instances` collection for the magnetic field particles or short line markers. Keep `useFrame` imperative: mutate refs for pulse position, field displacement, and readout signal. Do not call React state setters from `useFrame`.

- [ ] **Step 4: Add the training interaction**

  Add one accessible control that advances the field through the sequence. The control must be pauseable and must show the current phase in text outside the canvas.

- [ ] **Step 5: Mount it with a fallback**

  Add the scene to the BRC `ExhibitSection` with the caption “Inputs perturb the field. Training learns the patterns in its responses.” Add a plain HTML fallback sentence for no-WebGL and reduced-motion users.

- [ ] **Step 6: Verify performance and build**

  Run:

  ```bash
  npx tsc --noEmit --pretty
  pnpm build
  ```

- [ ] **Step 7: Commit**

  ```bash
  git add src/components/r3f/BrownianReservoirScene.tsx src/pages/index.astro
  git commit -m "feat: add brownian reservoir exhibit"
  ```

### Task 4: Add the DMI stabilizer visual

**Files:**
- Create: `src/components/r3f/DmiStabilizerScene.tsx`
- Modify: `src/pages/index.astro`

**Interfaces:**
- `DmiStabilizerSceneProps = { height?: string; interactive?: boolean; reducedMotion?: boolean }`.
- Visual states are the exact string union `'competing' | 'stabilizing' | 'coherent'`.

- [ ] **Step 1: Define the state sequence**

  Use a pure state mapping with the following behavior:

  ```ts
  export type StabilizerPhase = 'competing' | 'stabilizing' | 'coherent';

  export function getStabilizerPhase(progress: number): StabilizerPhase {
    if (progress < 0.3) return 'competing';
    if (progress < 0.75) return 'stabilizing';
    return 'coherent';
  }
  ```

- [ ] **Step 2: Render before/after states with instancing**

  Use two instanced arrow collections or one instanced collection with transformed directions. The competing state must visibly disagree; the coherent state must visibly form a consistent twist around the knot.

- [ ] **Step 3: Add explanatory labels**

  Label the visible sequence `Competing directions`, `DMI stabilizes the twist`, and `Coherent knot`. Use “DMI helps hold the knot together” as the lead caption. Put handedness in a secondary expandable detail.

- [ ] **Step 4: Mount and fallback**

  Add the scene to the DMI `ExhibitSection`. Provide a text fallback describing the before/after state and a pause control.

- [ ] **Step 5: Verify and commit**

  Run:

  ```bash
  npx tsc --noEmit --pretty
  pnpm build
  ```

  ```bash
  git add src/components/r3f/DmiStabilizerScene.tsx src/pages/index.astro
  git commit -m "feat: add dmi stabilization exhibit"
  ```

### Task 5: Add readout and scale transition visuals

**Files:**
- Create: `src/components/r3f/ReadoutScene.tsx`
- Create: `src/components/r3f/ScaleTransitionScene.tsx`
- Modify: `src/pages/index.astro`

**Interfaces:**
- `ReadoutSceneProps = { height?: string; interactive?: boolean }`.
- `ScaleTransitionSceneProps = { height?: string; interactive?: boolean }`.

- [ ] **Step 1: Implement the readout scene**

  Show one magnetic state changing into one simple signal trace or discrete output. Keep the trace schematic and readable. Do not import the full chart gallery into the homepage.

- [ ] **Step 2: Implement the scale transition scene**

  Reuse the same knot geometry concept through four labeled stages: `Knot`, `Cell`, `Layer`, and `3D array`. Use instancing for repeated knots and mutate transforms in `useFrame`.

- [ ] **Step 3: Add static explanatory fallbacks**

  Each scene must include a text explanation that remains complete without the animation.

- [ ] **Step 4: Mount both sections and verify**

  Run:

  ```bash
  npx tsc --noEmit --pretty
  pnpm build
  ```

- [ ] **Step 5: Commit**

  ```bash
  git add src/components/r3f/ReadoutScene.tsx src/components/r3f/ScaleTransitionScene.tsx src/pages/index.astro
  git commit -m "feat: add readout and scaling exhibits"
  ```

### Task 6: Create curated visuals, evidence, and technical archive routes

**Files:**
- Create: `src/pages/visuals.astro`
- Create: `src/pages/evidence.astro`
- Create: `src/pages/technical-archive.astro`
- Modify: `src/components/Header.astro`
- Modify: `src/components/Footer.astro`

**Interfaces:**
- `visuals.astro` consumes the curated scene list and does not expose every figure as a primary card.
- `evidence.astro` links each claim group to one source or existing doc route.
- `technical-archive.astro` groups existing docs by `Established`, `Current`, `Speculative`, and `Project Ops`.

- [ ] **Step 1: Build the curated visuals page**

  Include only the Hopfion, BRC, DMI, Readout, and Scaling visuals. Give each one a one-sentence purpose and a link to Evidence.

- [ ] **Step 2: Build the evidence page**

  Use three sections: `Demonstrated`, `Inferred`, and `Proposed`. Preserve source links and claim wording. Avoid presenting speculative material with the visual weight of demonstrated evidence.

- [ ] **Step 3: Build the technical archive page**

  Group existing document routes into a compact archive index. The archive can contain many links, but the homepage cannot.

- [ ] **Step 4: Update header and footer links**

  Ensure every primary header link resolves. Put GitHub and archive links in the footer as provenance/depth links.

- [ ] **Step 5: Verify links and build**

  Run:

  ```bash
  make check-links
  pnpm build
  ```

- [ ] **Step 6: Commit**

  ```bash
  git add src/pages/visuals.astro src/pages/evidence.astro src/pages/technical-archive.astro src/components/Header.astro src/components/Footer.astro src/pages/figures.astro
  git commit -m "feat: add curated exhibit routes"
  ```

### Task 7: Accessibility, mobile, and release verification

**Files:**
- Modify: `src/styles/global.css`
- Modify: all new exhibit components from Tasks 1–6 only where verification identifies a defect.
- Test: `tests/` or `e2e/` using the repository's existing Playwright setup.

- [ ] **Step 1: Add reduced-motion behavior**

  Pause or freeze scene transitions when `prefers-reduced-motion: reduce` is active. Keep labels and static geometry visible.

- [ ] **Step 2: Check keyboard and semantic structure**

  Verify one `h1` per page, ordered heading levels, keyboard-focusable controls, visible focus rings, and text alternatives for every scene.

- [ ] **Step 3: Check mobile layout**

  Use a local preview and test narrow viewport behavior. Confirm copy appears before or beside the visual in a predictable order and no horizontal overflow occurs outside intentional archive tables.

- [ ] **Step 4: Run verification commands**

  ```bash
  npx tsc --noEmit --pretty
  pnpm build
  make check-links
  pnpm test
  ```

  Expected: TypeScript, build, link checks, and tests pass. If `pnpm check` hits the repository's known Astro memory issue, record that separately rather than changing unrelated code.

- [ ] **Step 5: Inspect the final diff**

  ```bash
  git status
  git diff --stat origin/main...HEAD
  git diff --check origin/main...HEAD
  ```

- [ ] **Step 6: Commit verification fixes**

  ```bash
  git add src tests e2e
  git commit -m "test: verify visual exhibit experience"
  ```

## Self-review

- Spec coverage: the plan covers the exhibit architecture, visitor sequence,
  BRC training visual, DMI stabilization visual, readout, scaling, archive
  separation, accessibility, performance, fallbacks, and acceptance criteria.
- Placeholder scan: each task names files, interfaces, commands, and expected
  results; no unspecified implementation step is required.
- Type consistency: scene prop interfaces and phase unions are defined before
  use. Later tasks consume the section and scene contracts established earlier.
- Scope: the plan changes the public experience without rewriting the research
  corpus or introducing backend work.
