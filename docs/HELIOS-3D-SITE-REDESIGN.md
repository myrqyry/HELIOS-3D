# HELIOS-3D Site Redesign

**Date:** 2026-06-10
**Status:** Draft for user review
**Author:** Brainstorming session with the project owner

## Goal

Turn the HELIOS-3D Astro site from a polished chrome around MDX dumps into a *visual presentation* of the research. The repo (GitHub) and the prose articles themselves are where the wall of text lives; the site explains the project *visually*.

Three audiences, in priority order:
1. Curious newcomer who needs to understand what HELIOS-3D is
2. Technical evaluator who needs to see the claims and their evidence levels
3. Funding reviewer who needs the pitch and the targets

## Aesthetic

Existing palette and typography. Dark scientific. Obsidian background, ember and amber accents, parchment text, Geist + Geist Mono. No new fonts, no decorative animations, no on-brand flourishes.

The 4 doc stages get distinct colors so the visitor can scan the evidence structure at a glance:

| Stage | Color | Token | Label |
|---|---|---|---|
| established | cyan | `--color-cyan-2` (#7dd3fc) | "Established Basis" |
| current | ember | `--color-ember` (#ff6b1a) | "Current Demonstrator" |
| speculative | violet | `--color-violet` (new, #a78bfa) | "Speculative Branch" |
| project-ops | parchment | `--color-parchment-2` (#a89880) | "Project Operations" |

Claim-stage tags (DEMONSTRATED / INFERRED / PROPOSED / SPECULATIVE) are a separate visual concept — they live inside claim cards and the claims table, styled as small monospace pills. The two stage systems are visually distinct: doc stage = the section color, claim stage = the pill badge inside a card.

## 3D scenes

All r3f components gain an `interactive` prop, default `false`.

When `interactive={false}`:
- `OrbitControls` is omitted
- The scene auto-animates with an idle motion I choose per-component based on what the scene depicts. The implementation plan will list the chosen motion for each of the 6 components. Default motions will be: slow auto-rotation at ~0.05 rad/s for the symmetric scenes (HopfionScene, SkyrmionScene, DmiChirality, TopologicalOrbitalHall), layered translation/disassembly for MaterialStack, and a single "draw-in" sweep for TwistReservoirNucleation. These are starting points, not commitments — I will tune them during implementation based on what reads best.
- The scene is a "stylized illustration" — the existing disclaimer caption is shown

The `interactive={true}` mode (OrbitControls, full user panning) stays available for the `/figures/` page hover-toggle and for embedded deep-dive contexts. Default everywhere else is the static-illustration mode.

This is a *prop*, not a config flag, so the consumer controls it per usage. The six r3f components are: `HopfionScene`, `SkyrmionScene`, `MaterialStack`, `DmiChirality`, `TopologicalOrbitalHall`, `TwistReservoirNucleation`.

## Information architecture

```
/                    Home: 5-section full-screen pitch deck
/start-here/         5-step reading path with timeline layout
/figures/            All visualizations, filter by source/kind
/docs/{stage}/{slug} Custom visual summary + MDX prose (14 pages)
```

No new routes. The 14 MDX files are byte-identical — only the page templates that render them change.

## Home page (5 full-screen sections)

Vertical scroll with `scroll-snap-type: y mandatory`. Each section is `min-h-screen`, separated by a thin stage-color rule.

### Section 1 — Hero

- Two-line architecture statement, Geist 700, large: *"A spintronic coprocessor architecture using 3D hopfions."*
- Subtitle (parchment-2, regular): the project's one-sentence framing
- 3D hopfion scene on the right (col-span), with the auto-rotation motion
- Three CTAs: Start Here (primary ember), Claims Matrix (secondary outline), Figures (tertiary outline)
- Section number `01` in monospace, ember

### Section 2 — "Why now?"

- The thermodynamic crisis hook: 600 TWh in 2026, 4+ billion m³ water by 2027, 50% embodied carbon
- Two-up stat cards with DEMONSTRATED / INFERRED claim badges and source citations
- Single CTA: "Read the evidence"

### Section 3 — Evidence dashboard

- 4 hand-picked highlight claim cards (most newsworthy across stages), with the stage color
- Full filterable ClaimsTable below — uses the existing `ClaimsTable.astro` component with all 20+ claims, default filter "all"
- CTA: "See the full claims matrix" links to `/docs/current/claims-matrix/`

### Section 4 — 2026 evidence base

- Full-width LiteratureTimeline chart (existing `src/components/charts/LiteratureTimeline.tsx`)
- Horizontal scrollable on mobile, full width on desktop
- 5-7 anchored citations with year, system, finding
- CTA: "Read the full literature review"

### Section 5 — Reading path + footer

- "Where to start" — 5-step vertical numbered list (Abstract → Candidate Materials → Literature Review → Claims Matrix → Pitch Deck)
- Each step: number, title, description, stage badge, "Read this →" CTA
- Footer in the same section: project tagline, source link, last-updated date

## Doc pages (14)

Each doc page becomes a designed visual summary at the top + the existing MDX prose below. The visual summary is bespoke per doc — I read each MDX, extract the key information, and design the visual. The summary is the *primary* way to understand the doc; the prose is supporting detail.

Below is a working draft of what each visual summary contains. The draft is a starting point — the final visual summary for each doc may differ as I read the actual content. The user will see each visual summary's design in the implementation plan and can request changes before I build it.

| Doc | Visual summary content (draft) |
|---|---|
| Abstract | Pitch card + 4 stat cards (target write speed, target energy, materials in scope, current demonstrator) + 3D hopfion |
| Core Architecture | The MCA + BRC dual-core block diagram as a designed SVG/canvas — the centerpiece |
| Candidate Materials | Comparison cards across EuS/Bi₂Se₃/EuS, FGT, Mn₃Sn with a "why this material" line per card |
| Literature Review | 2026 evidence timeline, full-width |
| Mathematics | Key equations as designed callout cards (Hopf index, Q_H=1, skyrmion number) with the hopfion figure |
| Claims Matrix | Full filterable ClaimsTable (this is the canonical view) |
| Targets, Comparators, Projections | Comparison bar chart + "where HELIOS-3D sits" positioning callout |
| Open Questions | Blocker cards in priority order, each with "what would unblock this" |
| Glossary | Term cards in 2-3 column grid, alphabetized |
| Alternative Materials and Methods | Side-by-side comparison: "current plan" vs "alternative" with trade-offs per axis |
| Defensive Framework | Critique → response card pairs |
| Pitch Deck Outline | The deck slide list as a vertical timeline with stage badges |
| Proposed Fabrication Path | The 5-step fabrication flow as a horizontal process diagram |
| Deployment | Simple deployment status card (Vercel + GH Pages) with source link |

All 14 docs continue to render their full MDX content below the visual summary. No prose is removed or summarized away.

## /figures/

- Hero strip: title, summary
- Filter chips: source (`data-driven` / `stylized`) and kind (`r3f` / `svg` / `chart` / `image`)
- Grid of figure cards, 2 columns desktop / 1 mobile
- Each card: static-rendered component (default), title, description, source + kind chips, "Used in" link list
- Hover the top-right of a card → small icon appears → click to swap the static scene for the interactive one. Click again to dismiss. Default is static.

## /start-here/

- Hero strip
- 5-step vertical numbered timeline with connector line
- Each step: large number on left, title + description + stage badge on right
- "Read this →" CTA per step
- Two-column callout at bottom: "If you only have 2 minutes" (abstract) vs "If you have 30 minutes" (claims matrix + literature review)

## Global chrome

- **Header**: monospace logo, nav (Home / Start Here / Docs / Figures / Deploy), and a small stage-filter dropdown that filters the sidebar by stage. Default "All stages".
- **Sidebar**: stage color left border, active page highlighted with stage color wash, sticky on `lg:`, hidden on `<lg`.
- **Footer**: project tagline, source link, last-updated date (derived from the most recent `updated` field across all docs).
- **No 404 page redesign** — the default Astro 404 is fine.
- **No header animations, no logo flourishes**.

## Files affected

```
NEW    src/components/StageBadge.astro
NEW    src/components/DocHero.astro
NEW    src/components/SectionHeading.astro
NEW    src/components/DocVisualSummary.astro          # wrapper that takes a "kind" prop
NEW    src/components/visual-summaries/*.astro       # one per doc (14 files)
EDIT   src/styles/tokens.css                         # add --color-violet
EDIT   src/styles/global.css                         # add scroll-snap, motion-preferences
EDIT   src/layouts/BaseLayout.astro                  # add scroll-snap on home
EDIT   src/components/Header.astro                   # add stage filter
EDIT   src/components/Sidebar.astro                  # stage color borders, active state
EDIT   src/components/Footer.astro                   # add last-updated
EDIT   src/components/Hero.astro                     # 2-line statement
EDIT   src/components/Figure.astro                   # pass through `interactive` prop
EDIT   src/pages/index.astro                         # 5-section pitch deck
EDIT   src/pages/start-here.astro                    # timeline layout
EDIT   src/pages/figures.astro                       # filter chips, hover-to-interact
EDIT   src/pages/docs/[stage]/[slug].astro           # DocHero + DocVisualSummary + prose
EDIT   src/components/r3f/HopfionScene.tsx           # add `interactive` prop
EDIT   src/components/r3f/SkyrmionScene.tsx          # same
EDIT   src/components/r3f/MaterialStack.tsx          # same
EDIT   src/components/r3f/DmiChirality.tsx           # same
EDIT   src/components/r3f/TopologicalOrbitalHall.tsx # same
EDIT   src/components/r3f/TwistReservoirNucleation.tsx # same
```

Approx 35 files: 14 new visual summaries, plus 4 new shared components, plus 25 edits.

## Out of scope

- Editing any of the 14 MDX files
- New routes beyond the 3 existing page families
- Migrating content out of MDX
- Visual / animation flourishes (no pulsing dots, no scroll-triggered reveals, no decorative SVG)
- Fixing pre-existing broken cross-links between MDX files (separate cleanup)
- A 404 page design (default is fine)
- Any new content — this is presentation of what exists

## Acceptance criteria

1. Visiting `/` shows the 5-section pitch deck, scrolls vertically with snap, and presents the project's story, evidence, and reading path visually.
2. Each of the 14 `/docs/{stage}/{slug}` pages renders a bespoke visual summary at the top, then the existing MDX prose below.
3. All 3D scenes default to static-illustration mode (no OrbitControls visible); `/figures/` provides hover-to-toggle interactivity.
4. The 4 doc stages are color-coded in sidebar, header filter, and stage badges.
5. `pnpm check`, `pnpm test`, `pnpm build`, `uv run pytest`, `uv run python scripts/check_claims.py` all pass.
6. Lighthouse on `/`: <3s LCP, 0 layout shift on the visible fold, no console errors.
7. No new dependencies in `package.json` or `pyproject.toml` (the visual summaries use existing r3f and chart components + plain Astro/Tailwind).
