# Contributing to HELIOS-3D

## Ways to Contribute
- **Physics review:** Corrections or additions to skyrmion/hopfion modeling
- **Simulation code:** MuMax3 scripts, Python reservoir models
- **Fabrication expertise:** TPP/ALD parameter refinements
- **Citations:** Additional peer-reviewed sources for the bibliography

## Process
1. Open an Issue describing your proposed contribution
2. Fork the repo and create a branch: `git checkout -b feature/your-topic`
3. Make your changes and ensure validation passes locally:
   ```bash
   make test          # run pytest
   make check-claims  # validate claim discipline
   make validate-erc  # validate ERC data schema
   make build         # build docs
   make check-stubs   # check for placeholder simulations
   ```
4. Submit a Pull Request with a clear description, including:
   - Problem statement or motivation
   - Exact validation commands run and their output
   - Any remaining assumptions or open questions

## Pre-PR Checklist
- [ ] All new behavior changes have at least one deterministic test
- [ ] Documentation updates and script updates land in the same PR when they affect each other
- [ ] Root Markdown and `docs/` Markdown are both covered when changing claim validation
- [ ] Data validators match the checked-in schema exactly
- [ ] Simulation files are either runnable with documented prerequisites or explicitly labeled and isolated as placeholders
- [ ] The change does not silently promote speculative claims to stronger status
