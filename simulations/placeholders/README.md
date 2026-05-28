# Simulation Placeholders

This directory contains simulation files that are **deliberately non-runnable** design stubs.

## Policy

- Placeholders must include a `STATUS: NOT RUNNABLE — PLACEHOLDER` comment at the top.
- They must document what is missing (e.g., undefined initializer, unresolved parameters, missing external dependency).
- They must not be counted as runnable simulation assets in CI or benchmark reports.
- When a placeholder becomes runnable, it should be moved to the parent `simulations/` directory and the placeholder comment removed.

## Current Placeholders

| File | Blocker | Target Benchmark |
|---|---|---|
| `magnex_hopfion.mx3` | Missing `hopfion_init.mx3` ansatz for `h_texture()`; 3D conformal deposition unverified | BENCHMARKS.md Task 1 |
