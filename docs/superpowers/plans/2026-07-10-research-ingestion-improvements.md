# Research ingestion improvements implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development
> (recommended) or superpowers:executing-plans to implement this plan
> task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make local research intake easier to maintain and use that source of
truth to improve the public HELIOS-3D pages.

**Architecture:** Keep the site local-first and static. Add one normalized
research data layer, one reusable public feed renderer, and then wire the
existing overview, timeline, literature, and claims pages to that same data.
The result is a single research-to-public path instead of separate, drifting
lists.

**Tech Stack:** Astro 5, MDX, TypeScript, React 19, Vitest, existing site data
and chart components.

## Global Constraints

- The project must stay local-first.
- Do not add a production live-search backend.
- Keep the current static Astro site architecture.
- Public pages must stay renderable when one research record is malformed.
- Public pages must use stable IDs, not free-form titles, for record lookup.
- Keep the evidence taxonomy aligned with the current demonstrated / inferred /
  proposed / speculative language.

---

## File structure

This plan centers on a small number of focused files.

- `src/data/research-ingestion.ts` owns the normalized research records,
  validation, and derived selectors for public pages.
- `src/data/__tests__/research-ingestion.test.ts` owns the validator and
  selector coverage.
- `src/components/research/ResearchFeed.astro` owns the reusable public feed
  renderer.
- `src/components/charts/LiteratureTimeline.tsx` consumes the shared research
  selectors instead of a separate JSON file.
- `src/pages/index.astro`, `src/pages/overview.astro`, and
  `src/pages/start-here.astro` own the public entry points.
- `src/content/docs/established/literature-review.mdx` owns the main evidence
  narrative.
- `src/content/docs/current/claims-matrix.mdx` and
  `src/content/docs/current/candidate-discovery-pipeline.mdx` own the evidence
  governance pages.
- `README.md` documents the local research-ingestion workflow for contributors.

## Interfaces

These names are the shared contract across tasks.

- `ResearchStage = 'established' | 'current' | 'speculative'`
- `PublicUse = 'overview' | 'timeline' | 'claims' | 'candidate-pipeline' |
  'literature-review'`
- `ResearchRecord` with stable `id`, `title`, `source`, `url`, `publishedAt`,
  `stage`, `tags`, `summary`, `evidenceLevel`, `publicUse`, and optional
  `notes`
- `researchRecords`
- `normalizeResearchRecords(records)`
- `getResearchRecordsByUse(use)`
- `getResearchTimelineRows()`
- `getResearchStageCounts()`
- `ResearchFeed` props: `use`, `title`, `summary?`, `limit?`, and `compact?`

### Task 1: Normalize research records

**Files:**
- Create: `src/data/research-ingestion.ts`
- Create: `src/data/__tests__/research-ingestion.test.ts`
- Delete: `src/data/literature-timeline.json`

**Interfaces:**
- Consumes: the current evidence taxonomy already used by the docs.
- Produces: normalized records and selector functions for the timeline,
  overview, and evidence pages.

- [ ] **Step 1: Write the failing tests**

```ts
import {
  getResearchRecordsByUse,
  getResearchTimelineRows,
  normalizeResearchRecords,
} from '../research-ingestion';

it('returns overview-ready records in stable order', () => {
  expect(getResearchRecordsByUse('overview').map((record) => record.id)).toEqual([
    'iea-ai-energy-crisis',
    'katmis-hopfion-stability',
  ]);
});

it('rejects duplicate ids', () => {
  expect(() =>
    normalizeResearchRecords([
      {
        id: 'iea-ai-energy-crisis',
        title: 'AI energy crisis',
        source: 'IEA',
        url: 'https://example.com/a',
        publishedAt: '2026-01-01',
        stage: 'established',
        tags: ['energy'],
        summary: 'x',
        evidenceLevel: 'DEMONSTRATED',
        publicUse: 'overview',
      },
      {
        id: 'iea-ai-energy-crisis',
        title: 'Duplicate',
        source: 'IEA',
        url: 'https://example.com/b',
        publishedAt: '2026-01-02',
        stage: 'current',
        tags: ['energy'],
        summary: 'y',
        evidenceLevel: 'PROPOSED',
        publicUse: 'timeline',
      },
    ]),
  ).toThrow('duplicate id: iea-ai-energy-crisis');
});

it('derives timeline rows from the normalized records', () => {
  expect(getResearchTimelineRows()).toContainEqual({
    year: 2026,
    title: 'DISH Nature 2026',
    tag: 'FABRICATION',
  });
});
```

- [ ] **Step 2: Run the tests to confirm they fail**

Run: `pnpm test -- src/data/__tests__/research-ingestion.test.ts`

Expected: fail because `src/data/research-ingestion.ts` does not exist yet.

- [ ] **Step 3: Implement the data module**

Seed `researchRecords` with the current public research set, using stable IDs
for the existing literature and claim anchors, such as:

- `iea-ai-energy-crisis`
- `katmis-hopfion-stability`
- `iizumi-crud-accounting`
- `ding-qiu-reservoir-thermodynamics`
- `wang-dish-printing`
- `tsai-mn3sn-switching`
- `gobel-lounis-tohe`

Implement the validator so it rejects missing IDs, duplicate IDs, invalid
stages, and malformed URLs, then expose the selectors needed by later tasks.

- [ ] **Step 4: Run the tests again**

Run: `pnpm test -- src/data/__tests__/research-ingestion.test.ts`

Expected: pass.

- [ ] **Step 5: Commit**

```bash
git add src/data/research-ingestion.ts src/data/__tests__/research-ingestion.test.ts
git rm src/data/literature-timeline.json
git commit -m "feat(research): normalize local ingestion data"
```

### Task 2: Build the reusable feed and retarget the timeline

**Files:**
- Create: `src/components/research/ResearchFeed.astro`
- Modify: `src/pages/overview.astro`
- Modify: `src/components/charts/LiteratureTimeline.tsx`

**Interfaces:**
- Consumes: `getResearchRecordsByUse(use)`, `getResearchTimelineRows()`.
- Produces: a reusable public feed component and a timeline that no longer
  depends on a separate JSON file.

- [ ] **Step 1: Write the failing component usage**

Add the feed component to `src/pages/overview.astro` as a minimal public block,
and wire `src/components/charts/LiteratureTimeline.tsx` to the shared selector
export.

- [ ] **Step 2: Run a compile check to confirm the missing imports fail**

Run: `pnpm check`

Expected: fail until the new component and selector wiring exist.

- [ ] **Step 3: Implement the feed component**

`ResearchFeed.astro` should accept `use`, `title`, `summary`, `limit`, and
`compact` props, then render records with title, short summary, stage label,
source, and date.

- [ ] **Step 4: Rewire the literature timeline**

Replace the JSON import in `src/components/charts/LiteratureTimeline.tsx`
with the new `getResearchTimelineRows()` selector so the timeline reads from the
same normalized data as the public feed.

- [ ] **Step 5: Re-run the compile check and build**

Run:

```bash
pnpm check
pnpm build
```

Expected: both pass.

- [ ] **Step 6: Commit**

```bash
git add src/components/research/ResearchFeed.astro src/pages/overview.astro src/components/charts/LiteratureTimeline.tsx
git commit -m "feat(research): add shared public feed"
```

### Task 3: Wire the public entry points to the shared research feed

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/pages/start-here.astro`
- Modify: `src/content/docs/established/literature-review.mdx`

**Interfaces:**
- Consumes: `ResearchFeed` and the selectors from `src/data/research-ingestion.ts`.
- Produces: a public front door that shows the same curated research source of
  truth in multiple places.

- [ ] **Step 1: Write the failing page wiring**

Import `ResearchFeed` into the overview and literature pages, then replace at
least one static evidence block with a feed-backed section.

- [ ] **Step 2: Run a compile check to confirm the missing component usage fails**

Run: `pnpm check`

Expected: fail until the pages import and render the new feed component.

- [ ] **Step 3: Update the homepage and overview**

Use the feed to surface a small, plain-language “latest research” or “curated
evidence” section on `src/pages/index.astro` so new readers see the research
intake path before they hit the dense docs.

- [ ] **Step 4: Update the guided path and literature review**

Use the same feed on `src/pages/start-here.astro` and
`src/content/docs/established/literature-review.mdx` so the reading path and
the evidence page point to the same curated records.

- [ ] **Step 5: Re-run compile and build**

Run:

```bash
pnpm check
pnpm build
```

Expected: pass.

- [ ] **Step 6: Commit**

```bash
git add src/pages/index.astro src/pages/overview.astro src/pages/start-here.astro src/content/docs/established/literature-review.mdx
git commit -m "feat(site): surface shared research feed"
```

### Task 4: Sync claims, pipeline copy, and contributor guidance

**Files:**
- Modify: `src/content/docs/current/claims-matrix.mdx`
- Modify: `src/content/docs/current/candidate-discovery-pipeline.mdx`
- Modify: `README.md`

**Interfaces:**
- Consumes: the normalized research stage and evidence labels.
- Produces: clearer public guidance about how local research turns into site
  content.

- [ ] **Step 1: Write the failing copy updates**

Add a small ingestion note to the claims matrix, make the candidate pipeline
explicitly reference curated local intake, and add a short README section that
explains the local research-to-public workflow.

- [ ] **Step 2: Run a compile check to confirm the docs still build**

Run: `pnpm check`

Expected: fail only if the new imports or MDX updates are incorrect.

- [ ] **Step 3: Update the claims matrix and candidate pipeline**

Keep the existing evidence taxonomy, but make the pages explain where the data
comes from, how to curate it locally, and how the public pages consume it.

- [ ] **Step 4: Update the README**

Add a short section that tells contributors where to add local research notes,
which normalized file drives the public pages, and how to validate the site.

- [ ] **Step 5: Re-run compile and build**

Run:

```bash
pnpm check
pnpm build
```

Expected: pass.

- [ ] **Step 6: Commit**

```bash
git add src/content/docs/current/claims-matrix.mdx src/content/docs/current/candidate-discovery-pipeline.mdx README.md
git commit -m "docs(site): document local research ingestion"
```

## Verification checklist

Run these checks at the end of the full plan:

1. `pnpm test -- src/data/__tests__/research-ingestion.test.ts`
2. `pnpm check`
3. `pnpm build`

## Gaps to watch

- Do not introduce a live fetch dependency while implementing the local data
  layer.
- Do not key public records by title.
- Do not let the research data drift away from the existing claim taxonomy.
- Do not add broad new subsystems when a single shared feed can serve the public
  pages.
