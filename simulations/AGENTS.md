# simulations

## What Lives Here

Micromagnetic simulation configurations and analysis scripts for HELIOS-3D project.

## Key Files

| File | Purpose |
|------|---------|
| `magnex_hopfion.mx3` | Pending MuMax3 hopfion dynamics config (not yet runnable) |
| `simulations/energy_minimization.py` | Energy minimization scripts |
| `simulations/analysis_scripts/` | Analysis scripts for simulation results |

## Deviations from Root

- Uses MuMax3/OOMMF for micromagnetic simulations
- Simulation configurations use `.mx3` file format

## Dependencies & Side Effects

- Changes to simulation configurations may affect analysis scripts
- Updates to analysis scripts may require changes in documentation

## Watch Out For

- Ensure all simulation configurations are valid and can be run with MuMax3
- Keep analysis scripts consistent with the latest simulation results

## Commands (Folder-Specific Only)

Run these from the project root:
```bash
uv run pytest     # Run project tests, including simulations
```

## Notes

- This file should be SHORT. If it's over 80 lines, split the folder further.
- Don't repeat setup/install/dev commands from root — just reference them.
- The point is: "here's what's unique about working in this folder."
- Delete sections that don't apply (e.g., if no deviations, remove that section).
