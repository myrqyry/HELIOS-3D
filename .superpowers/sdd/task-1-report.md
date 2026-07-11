# Task 1 Report

## What changed
- Added `src/data/research-ingestion.ts` with normalized research records, handwritten validation, and selector helpers.
- Added `src/data/__tests__/research-ingestion.test.ts` with the brief's failing-first assertions.
- Swapped `src/components/charts/LiteratureTimeline.tsx` to use `getResearchTimelineRows()`.
- Deleted `src/data/literature-timeline.json`.

## Files touched
- `src/data/research-ingestion.ts`
- `src/data/__tests__/research-ingestion.test.ts`
- `src/components/charts/LiteratureTimeline.tsx`
- `src/data/literature-timeline.json` (deleted)

## Tests run
- `pnpm test -- src/data/__tests__/research-ingestion.test.ts`
- `pnpm check`

## Test output summary
- Focused Vitest file passed: 5 files, 14 tests, 0 failures.
- `pnpm check` passed with pre-existing warnings in unrelated files only.

## Commit made
- `8932336` - `feat(research): normalize local ingestion data`

## Concerns
- `pnpm check` still reports existing unused-import/unused-variable warnings in unrelated files.
- `UBIQUITOUS_LANGUAGE.md` was already untracked and left untouched.

## Fix addendum
- Updated `src/data/research-ingestion.ts` so seed loading stays tolerant if a future record is malformed, while `normalizeResearchRecords()` remains strict for tests and callers.
- Tightened URL validation to accept only `http:` and `https:` URLs when a URL is present.
- Removed placeholder URLs from the seed records that did not yet have canonical links.
- Expanded `src/data/__tests__/research-ingestion.test.ts` to cover missing IDs, malformed URLs, invalid stages, and invalid timeline tags.
- Re-ran `pnpm test -- src/data/__tests__/research-ingestion.test.ts`, `pnpm check`, and `pnpm build`; all passed.

## Final fix addendum
- Converted the negative-path validator tests into a table-driven suite.
- Added an explicit warning callback to `loadResearchRecords()` so malformed seed
  entries are reported instead of silently dropped.
- Re-ran `pnpm test -- src/data/__tests__/research-ingestion.test.ts`,
  `pnpm check`, and `pnpm build`; all passed after the final cleanup.

## Regression fix addendum
- Moved duplicate-id reservation until after validation completes so a malformed
  record no longer blocks a later valid record with the same id.
- Added a regression test proving malformed-first input does not reserve ids.
- Re-ran the focused test file, `pnpm check`, and `pnpm build`; all passed.

## Follow-up fix
- Refactored `src/data/research-ingestion.ts` to use a tolerant `loadResearchRecords()` path for the exported public seed data while keeping `normalizeResearchRecords()` strict for direct callers and tests.
- Added coverage for missing ids, malformed URLs, invalid stages, invalid timeline tags, and the tolerant seed-loading path.

## Follow-up tests
- `pnpm test -- src/data/__tests__/research-ingestion.test.ts`
- `pnpm check`

## Follow-up test output summary
- Focused Vitest file passed: 5 files, 19 tests, 0 failures.
- `pnpm check` passed with the same pre-existing warnings in unrelated files only.
