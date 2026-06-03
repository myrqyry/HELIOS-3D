# docs

## What Lives Here

Documentation for HELIOS-3D project, including research findings, simulation setups, and technical specifications.

## Key Files

| File | Purpose |
|------|---------|
| `docs/CORE_ARCHITECTURE.md` | Core architecture and design decisions |
| `docs/CANDIDATE_MATERIALS_AND_MECHANISMS.md` | Candidate materials and mechanisms |
| `docs/PROPOSED_FABRICATION_PATH_AND_CONTROL.md` | Proposed fabrication path and control mechanisms |
| `docs/MATHEMATICS.md` | Mathematical foundations and equations |
| `docs/BENCHMARKS.md` | Benchmarks and performance metrics |

## Deviations from Root

- Documentation uses Astro 5 + MDX (replaced the previous MkDocs + Material setup; see `docs/superpowers/specs/2026-06-03-helios-3d-site-rebuild-design.md`)
- Math equations use MathJax + KaTeX (via remark-math + rehype-katex)

## Dependencies & Side Effects

- Changes to research findings may affect simulation setups
- Updates to technical specifications may require changes in implementation

## Watch Out For

- Ensure all math equations are properly formatted with MathJax
- Keep documentation consistent with the latest research findings

## Commands (Folder-Specific Only)

```bash
uv run docs:serve
uv run docs:build
```

## Notes

- This file should be SHORT. If it's over 80 lines, split the folder further.
- Don't repeat setup/install/dev commands from root — just reference them.
- The point is: "here's what's unique about working in this folder."
- Delete sections that don't apply (e.g., if no deviations, remove that section).