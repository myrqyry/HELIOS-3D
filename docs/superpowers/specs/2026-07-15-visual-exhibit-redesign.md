# HELIOS-3D visual exhibit redesign

## Overview

The public site will explain HELIOS-3D as an interactive science exhibit. Its
primary message is: **HELIOS-3D is a 3D computer built from magnetic knots.**
The GitHub repository and technical archive remain available for readers who
want the papers, specifications, claims, and implementation details.

The redesign replaces document-first navigation with a guided visual story.
It uses a cinematic magnetic-field aesthetic, but every animation must answer
one plain-language question before introducing technical terminology.

## Goals

- Help a first-time visitor understand the core idea without reading papers.
- Explain storage, computation, stabilization, readout, and scaling visually.
- Make the BRC and DMI concepts understandable as physical processes.
- Reduce visible links, duplicated copy, and archive-like navigation.
- Preserve access to evidence, source claims, and technical documents.
- Keep demonstrated, inferred, and proposed claims visibly distinct.
- Work on desktop and mobile without requiring WebGL for every explanation.

## Non-goals

- Rewrite or strengthen the underlying scientific claims.
- Remove the existing technical documentation.
- Turn speculative mechanisms into product promises.
- Add a general-purpose research browser to the main visitor path.
- Build a new backend or content management system.

## Information architecture

The main navigation will contain five destinations. The first three support
understanding; the last two provide depth and provenance.

| Destination | Purpose |
| --- | --- |
| `Explore` | Guided narrative from magnetic knot to 3D processor |
| `Visuals` | Curated interactive models and explanatory diagrams |
| `Evidence` | Claim status, source grounding, and uncertainty |
| `Technical archive` | Existing document collection and specifications |
| `GitHub` | Repository, simulations, compiler, and implementation work |

The homepage and `Explore` route carry the main narrative. Existing document
routes remain addressable, but they are presented as deeper reading rather than
the default entry point.

## Visitor journey

### 1. The knot

Open with a large animated hopfion and the sentence: “HELIOS-3D is a 3D
computer built from magnetic knots.” Three compact prompts introduce the
journey: **Store**, **Compute**, and **Read**.

### 2. What is a magnetic knot?

Show a rotatable 3D knot as a physical state. A short caption explains that
the knot's shape carries information. Technical terms such as Hopf index appear
as optional detail, not as the opening explanation.

### 3. How the machine computes

Show the Brownian Reservoir Computing field as a living, drifting magnetic
landscape. Input pulses perturb the field, the field settles into a response,
and a simple readout maps responses to outputs. The lead explanation is:
“The reservoir is trained: inputs perturb the field, and the readout learns the
resulting patterns.”

### 4. What holds the knot together?

Show Dzyaloshinskii–Moriya interaction as a stabilizing directional interaction.
Neighboring spins resolve competing forces into a coherent twist. A secondary
caption can explain that the preferred twist also gives the structure
handedness.

### 5. How information moves

Animate a knot traveling between neighboring regions. Separate the visual
moments for storage, interaction, and readout so visitors can identify what
changes and what remains stable.

### 6. How it scales

Move from one knot to one cell, from cells to layers, and from layers to a 3D
array. Delay the full system diagram until the visitor has seen the primitives
that compose it.

### 7. Evidence and depth

Present demonstrated, inferred, and proposed claims as quiet metadata attached
to each visual. Each claim links to one relevant source or technical page.
The technical archive and GitHub link provide the complete research trail.

## Visual modules

### Hopfion explainer

- Use the existing `HopfionScene` as the starting point.
- Add a restrained state label and a short plain-language caption.
- Keep interaction limited to rotation and a controlled “state change” mode.
- Provide a non-WebGL fallback image or diagram for unavailable devices.

### BRC field

- Use the cinematic “living field” direction.
- Represent input as a small number of visible pulses entering the field.
- Animate local perturbation, relaxation, and readout as three distinct phases.
- Include a compact training control rather than an open-ended simulation.
- Label the phases `Input`, `Reservoir response`, and `Readout`.
- Avoid presenting noise as inherently useful; explain that training extracts
  useful patterns from physical responses.

### DMI stabilizer

- Show a grid or ring of spin directions resolving into a coherent twist.
- Use the existing `DmiChirality` scene as a technical foundation.
- Make the before/after state visible: competing directions, then stabilized
  structure.
- Lead with “DMI helps hold the knot together.”
- Keep handedness as a secondary expandable explanation.

### Readout

- Connect a visible magnetic state to an electrical or optical signal.
- Show one signal trace or discrete state output, not a dense chart collection.
- Link the detailed TOHE and microwave material from the visual to Evidence.

### Scaling

- Use a staged zoom: knot, cell, layer, array.
- Reuse the same knot visual at each scale to preserve continuity.
- Keep manufacturing details in the Technical archive unless they answer the
  current visual question.

## Content rules

- Put one idea on screen at a time.
- Start every section with a plain-language sentence.
- Introduce a technical term only after its visual meaning is established.
- Prefer diagrams, animation, and captions over long paragraphs.
- Keep primary explanatory copy under 60 words per visual state.
- Move equations, source lists, and implementation details into expandable
  technical panels or archive pages.
- Preserve claim tags and do not upgrade `[INFERRED]`, `[PROPOSED]`, or
  `[SPECULATIVE]` language.
- Use “research prototype,” “hypothesis,” and “proposed” where the evidence
  level requires it.

## Component direction

The redesign should extend existing components instead of replacing the whole
Astro and React architecture.

- Keep `R3FCanvas` as the shared scene wrapper.
- Add focused scene components for BRC state transitions, DMI stabilization,
  readout, and scale transitions.
- Add a narrative section component that pairs one visual with one caption and
  one evidence link.
- Use existing charts only when a chart explains a decision; do not expose the
  full chart gallery as the default story.
- Keep technical document pages and visual-summary components available through
  the archive.

## Accessibility and performance

- Provide a text explanation and static fallback for every interactive visual.
- Respect `prefers-reduced-motion` and offer pause controls for animations.
- Keep keyboard focus visible for all controls.
- Use labels that do not depend on color alone.
- Lazy-load heavy scenes below the fold with `client:visible`.
- Use instancing for repeated magnetic elements.
- Avoid React state updates inside `useFrame` unless a user-visible state
  change requires them.
- Keep mobile scenes lower-density and preserve the explanatory sequence.

## Acceptance criteria

- A first-time visitor can state the core idea after viewing the opening.
- The visitor can explain what the knot represents without reading a paper.
- The BRC visual makes input, reservoir response, and readout distinguishable.
- The DMI visual makes stabilization distinguishable from generic animation.
- The visitor can reach evidence and technical detail without encountering a
  wall of links on the main path.
- Existing technical document URLs continue to build and resolve.
- The site builds successfully with `pnpm build`.
- Reduced-motion and non-WebGL fallbacks remain understandable.

## Implementation sequence

1. Redesign the shared header and homepage narrative shell.
2. Build the Hopfion, BRC, and DMI exhibit sections.
3. Add readout and scaling visuals.
4. Reframe the figures and evidence routes as curated exploration.
5. Move technical navigation into the archive layer.
6. Add accessibility, reduced-motion, and fallback states.
7. Verify desktop, mobile, build output, and existing document routes.
