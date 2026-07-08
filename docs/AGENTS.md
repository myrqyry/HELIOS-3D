# docs

## What Lives Here

Astro + MDX documentation content and site source. The public site is compiled from these sources.

## Key Files

| File | Purpose |
|------|---------|
| [`src/content/docs/speculative/core-architecture.mdx`](../src/content/docs/speculative/core-architecture.mdx) | Core architecture and speculative design decisions |
| [`src/content/docs/established/candidate-materials-and-mechanisms.mdx`](../src/content/docs/established/candidate-materials-and-mechanisms.mdx) | Candidate materials and mechanisms (Katmis 2025, etc.) |
| [`src/content/docs/speculative/proposed-fabrication-path-and-control.mdx`](../src/content/docs/speculative/proposed-fabrication-path-and-control.mdx) | Speculative fabrication periscope and Inverse Faraday Effect controls |
| [`src/content/docs/established/mathematics.mdx`](../src/content/docs/established/mathematics.mdx) | Topological and thermodynamic mathematical foundations |
| [`src/content/docs/current/claims-matrix.mdx`](../src/content/docs/current/claims-matrix.mdx) | Public claims matrix table and detailed evidence mapping |

## Deviations from Root

- Documentation uses Astro 5 + MDX (replaced the previous MkDocs + Material setup)
- Math equations use MathJax + KaTeX (via `remark-math` + `rehype-katex`)

## Dependencies & Side Effects

- Updates to technical specifications may require changes in implementation or compiler code.

## Watch Out For

- Ensure all math equations are properly formatted in MDX using KaTeX.
- Keep claims aligned with the `VALIDATION_STATUS.md` and claims taxonomy.

## Commands (Folder-Specific Only)

To develop or build the site locally, run these from the project root:
```bash
pnpm dev       # Start Astro dev server
pnpm build     # Build production static site
```

## Notes

- Keep documentation consistent with the latest research findings.
- Verify all links compile without errors during build.