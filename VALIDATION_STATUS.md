# Validation Status

This document tracks the execution and validation state of the HELIOS-3D project, separating theoretical frameworks and simulations from physical hardware demonstration.

## Executable Validations
- **Claim Taxonomy:** Exists and is tracked via [`claims-matrix.mdx`](file:///home/myrqyry/MQR/HELIOS-3D/src/content/docs/current/claims-matrix.mdx). [Verified]
- **Compiler Protocol Scaffold:** Exists and passes unit tests in `tests/test_topological_compiler.py`. [Verified]
- **Mock Topology Tests:** Passing in `tests/` (verifying mathematical properties of coordinate synthesis and Hopf Index calculations). [Verified]
- **Physics Adapters:** Implemented as mock components in the compiler pipeline. [Verified]

## Simulation and Modeling (Pending Verification)
- **MuMax3 Templates:** Pre-configured in `simulations/`, but not yet validated against physical parameters.
- **OOMMF Templates:** Pre-configured in `simulations/`, but not yet validated against physical parameters.

## Physical Hardware (Unverified / Speculative)
- **No Fabricated Device:** The physical 3D polymer scaffold and active magnetic heterostructures have not been manufactured.
- **No Measured Energy Advantage:** Energy-efficiency claims (e.g. fJ-scale) are purely theoretical targets/simulations and have not been measured on real hardware.
