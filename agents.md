# AGENTS.md

## Project Overview

HELIOS-3D is a computational physics project studying 3D magnetic hopfions (topological solitons) in heterostructures like Fe₃GaTe₂/RuO₂, targeting room-temperature stability.

**Tech stack:** Python 3.11+, `uv` for dependency management, MkDocs + Material theme for docs, MuMax3/OOMMF for micromagnetic simulation configs, pytest for testing

## Setup Commands

```bash
uv install
uv run docs:build
```

## Development

```bash
uv run docs:serve
uv run lint
uv run typecheck
uv run build
```

## Testing

```bash
uv run test
uv run test:watch
```

## Conventions

- Python 3.11+ required
- Use `uv` for dependency management
- MkDocs + Material theme for documentation
- MuMax3/OOMMF for micromagnetic simulations
- pytest for testing

## Routing

When working on [area], read [path/AGENTS.md]:

- **Documentation** (docs/, site/) → `docs/AGENTS.md`
- **Simulations** (simulations/, analysis/) → `simulations/AGENTS.md`
- **Testing** (tests/) → `tests/AGENTS.md`

## Notes

- Keep routing rules task-oriented: "When building X" not "The X folder"
- List the most common agent tasks first
- If a folder has no AGENTS.md, don't mention it in routing
- Shared conventions live here; deviations go in folder files