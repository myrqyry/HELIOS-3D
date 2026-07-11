# Research ingestion improvements design

This spec defines a local-first research ingestion flow for HELIOS-3D. The
goal is to make it easier to collect source material during development and
turn that material into clearer public pages without adding a live fetch
dependency to the site.

> [!NOTE]
> This is an experimental feature currently under active development.

## Goals

This work has one primary goal: reduce the friction between raw research notes
and the public-facing site content.

The project must let you:

- capture local research inputs in a structured way,
- normalize those inputs into reusable records,
- surface the records in public-facing docs, and
- keep the evidence boundary visible for readers.

## Non-goals

This work does not add a production live-search backend. It does not replace
the current static Astro site with a server app. It also does not attempt to
ingest every possible source type on day one.

## Current state

HELIOS-3D already has a strong public evidence structure:

- `src/pages/overview.astro` provides a plain-language entry point.
- `src/pages/start-here.astro` gives a guided reading path.
- `src/content/docs/established/literature-review.mdx` maps the literature.
- `src/content/docs/current/claims-matrix.mdx` tracks claim status.
- `src/content/docs/current/candidate-discovery-pipeline.mdx` frames staged
  screening and demotion of candidate materials.
- `src/data/literature-timeline.json` feeds the literature timeline.

The missing piece is a local research intake layer that makes those public
pages easier to keep fresh.

## Proposed design

The design uses a three-step flow:

1. **Capture raw research inputs locally.**
   Store paper notes, links, titles, dates, and source tags in a small local
   data set.
2. **Normalize those inputs into stable records.**
   Convert the raw notes into a consistent shape that public components can
   read.
3. **Publish the normalized records into the site.**
   Reuse the normalized data to update the overview, literature review,
   claims matrix, and candidate discovery pages.

This keeps research work local and predictable while still improving the public
site experience.

## Data model

The implementation should introduce a small structured research store, likely
under `src/data/research-ingestion/`.

Each record should include:

- `id`: stable local identifier,
- `title`: human-readable paper or note title,
- `source`: source outlet or collection name,
- `url`: canonical external link,
- `publishedAt`: publication or note date,
- `stage`: `established`, `current`, or `speculative`,
- `tags`: short thematic labels,
- `summary`: short plain-language summary,
- `evidenceLevel`: one of the existing claim-language values,
- `publicUse`: one of `overview`, `timeline`, `claims`, `candidate-pipeline`,
  or `literature-review`,
- `notes`: optional local commentary for dev use only.

The important constraint is that public pages must read from stable IDs, not
from free-form titles.

## Components

The implementation should stay small and composable.

### Local ingest source

This is the place where you keep raw research input during development. It can
be a JSON file, Markdown notes, or both, as long as the format is easy to edit
by hand.

### Normalizer

This layer converts raw local notes into a consistent record shape. It should
handle missing optional fields, enforce stable IDs, and reject malformed
entries early.

### Public renderers

These are the existing or new Astro components that present normalized data on
the site. Likely update points are:

- `src/pages/overview.astro`
- `src/content/docs/established/literature-review.mdx`
- `src/content/docs/current/claims-matrix.mdx`
- `src/content/docs/current/candidate-discovery-pipeline.mdx`
- `src/pages/start-here.astro`

## Data flow

The intended flow is:

1. Add or edit a local research record.
2. Normalize the record into a site-safe shape.
3. Derive public summaries, reading-path hints, or evidence labels from that
   record.
4. Render the derived output on the public site.

This flow keeps the public content grounded in the same research source of
truth you use during development.

## Error handling

The ingestion path should fail loudly on malformed data and stay quiet on
missing optional fields.

Required failures:

- Reject records with missing IDs.
- Reject duplicate IDs.
- Reject records that do not define a valid stage.
- Reject records that point to invalid URLs when a URL is present.

Graceful behavior:

- Skip optional fields that are absent.
- Preserve local notes even when a record is not ready for public display.
- Keep public pages renderable when one record is incomplete by filtering that
  record out instead of crashing the page.

## Testing

The implementation should add tests at two levels.

### Unit tests

Test the normalizer with:

- valid records,
- duplicate IDs,
- missing required fields,
- invalid stage values,
- malformed URLs,
- public-use routing values.

### Integration tests

Test the public data surfaces with:

- a sample research record that appears in the overview,
- a sample record that appears in the literature review,
- a sample record that affects the claims matrix stage labels,
- a record that is intentionally filtered out.

## Rollout plan

The work should ship in two small passes.

1. **Add the local data shape and normalizer.**
   This proves the ingestion model before touching public pages.
2. **Wire the public pages to the normalized data.**
   This updates the overview, reading path, and evidence pages with the new
   ingest-backed content.

## Risks

The main risk is overbuilding a generalized ingestion platform when the site
only needs a compact research-to-public bridge.

Other risks include:

- coupling the public pages to unstable raw notes,
- making the local format too clever to edit by hand,
- adding a hidden live fetch dependency too early, and
- drifting away from the current evidence taxonomy.

## Open questions

- Which local source format is easiest for you to maintain: JSON, Markdown,
  or a mix of both?
- Do you want public pages to show only curated records, or also show a small
  “in review” section?
- Should local notes stay in repo data files, or live in a separate ingest
  folder that is never published directly?

## Next steps

1. Confirm the local source format.
2. Implement the normalizer and validation layer.
3. Wire the overview and literature pages to the normalized records.
4. Keep the public evidence labels aligned with the existing claim taxonomy.
