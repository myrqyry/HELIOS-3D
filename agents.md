# AGENTS.md

## Project Overview

HELIOS-3D is a computational physics project studying 3D magnetic hopfions (topological solitons) in heterostructures like **EuS/Bi₂Se₃/EuS**, targeting room-temperature, zero-field stability.

**Tech stack:** Astro (Starlight) for documentation, React for interactive components, Three.js (R3F) for 3D visualizations, Python 3.11+ for research/analysis, `uv` for Python management, `pnpm` for Node.js management, MuMax3/OOMMF for micromagnetic simulations.

## Setup Commands

```bash
# Frontend
pnpm install
pnpm dev

# Python / Research
uv sync
```

## Development

```bash
pnpm build      # Build the site
pnpm preview    # Preview build
pnpm check      # Astro check
pnpm test       # Run vitest
```

## Testing

```bash
uv run pytest   # Run Python research tests
pnpm test       # Run unit tests
pnpm test:e2e   # Run playwright tests
```

## Conventions

- Documentation lives in `src/content/docs/`
- Interactive 3D scenes live in `src/components/r3f/`
- Physics research modules live in `research_specifications/`
- Simulation configs live in `simulations/`
- All technical claims must be tagged (e.g., `[DEMONSTRATED]`)

## Routing

When working on [area], read [path/AGENTS.md]:

- **Documentation** (docs/, site/) → `docs/AGENTS.md`
- **Simulations** (simulations/, analysis/) → `simulations/AGENTS.md`
- **Compilers & Firmware** (compiler/) → No AGENTS.md yet; see `research_specifications/module_5_topological_compiler_tdd.md`
- **Testing** (tests/) → `tests/AGENTS.md`

## Notes

- Keep routing rules task-oriented: "When building X" not "The X folder"
- List the most common agent tasks first
- If a folder has no AGENTS.md, don't mention it in routing
- Shared conventions live here; deviations go in folder files