# tests

## What Lives Here

Test suites for HELIOS-3D project, including unit tests, integration tests, and validation scripts.

## Key Files

| File | Purpose |
|------|---------|
| `tests/test_compiler_protocol.py` | CompilerAdapter protocol contract tests |
| `tests/test_topological_compiler.py` | Mock adapter behavior tests |
| `tests/energy_minimization_test.py` | Tests for energy minimization scripts |
| `tests/topological_charge_validator.py` | Tests for topological charge conservation |

## Deviations from Root

- Uses pytest for testing
- Test configurations use `.py` file format

## Dependencies & Side Effects

- Changes to test suites may affect simulation configurations
- Updates to validation scripts may require changes in documentation

## Watch Out For

- Ensure all tests are passing before making changes
- Keep test suites consistent with the latest simulation results

## Commands (Folder-Specific Only)

Run these from the project root:
```bash
uv run pytest     # Run Python unit and integration tests
pnpm test         # Run Astro/Vite frontend unit tests
pnpm test:e2e     # Run Playwright E2E tests
```

## Notes

- This file should be SHORT. If it's over 80 lines, split the folder further.
- Don't repeat setup/install/dev commands from root — just reference them.
- The point is: "here's what's unique about working in this folder."
- Delete sections that don't apply (e.g., if no deviations, remove that section).