<div align="center">

```
██╗  ██╗███████╗██╗     ██╗ ██████╗ ███████╗     ██████╗ ██████╗ 
██║  ██║██╔════╝██║     ██║██╔═══██╗██╔════╝     ╚════██╗██╔══██╗
███████║█████╗  ██║     ██║██║   ██║███████╗█████╗█████╔╝██║  ██║
██╔══██║██╔══╝  ██║     ██║██║   ██║╚════██║╚════╝╚═══██╗██║  ██║
██║  ██║███████╗███████╗██║╚██████╔╝███████║     ██████╔╝██████╔╝
╚═╝  ╚═╝╚══════╝╚══════╝╚═╝ ╚═════╝ ╚══════╝     ╚═════╝ ╚═════╝ 
```

# Hybrid-manufactured Energy-Landscape Inference and Operation System

**Speculative spintronic research exploring topological magnetism for ultra-low energy computation**

[![Docs](https://img.shields.io/badge/docs-helios--3d.vercel.app-blue?style=flat-square)](https://helios-3d.vercel.app/)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-live-green?style=flat-square)](https://myrqyry.github.io/HELIOS-3D/)
[![Python](https://img.shields.io/badge/Python-3.12+-yellow?style=flat-square&logo=python)](https://www.python.org/)
[![Astro](https://img.shields.io/badge/Astro-MDX-orange?style=flat-square&logo=astro)](https://astro.build/)
[![License](https://img.shields.io/badge/License-MIT-gray?style=flat-square)](./LICENSE)

</div>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HELIOS-3D is a staged research hypothesis investigating whether spintronic, topological, and thermodynamic-computing mechanisms could support future low-energy inference architectures near fundamental energy-efficiency limits.

**It is not** a fabricated chip, validated hardware design, or claim of demonstrated sub-Landauer computation.
**It is** a public research notebook for tracking claims, blockers, and evidence across plausible and speculative material/fabrication paths.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Current Reproducible Demo

To verify the compiler pipeline, tests, and documentation build system locally, run the following commands:

```bash
# Set up Python virtual environment and dependencies
uv sync

# Run the test suite (verifying compiler logic, claims taxonomy, and simulations)
uv run pytest

# Install Node.js dependencies
pnpm install

# Compile the documentation and interactive site
pnpm build
```

### What these commands prove:
- **Compiler logic consistency:** The compiler's coordinate translation and mock Inverse Faraday Effect (IFE) function compile correctly and pass topological charge checks ($Q_H = 1$).
- **Taxonomy integrity:** The claims validation engine runs successfully, verifying that all claims have matching promotion/demotion criteria and references.
- **Documentation pipeline correctness:** The MDX-based static site builder compiles all pages, charts, and interactive Three.js components without errors.

### What they DO NOT prove:
- **No physical validation:** These commands run mock physics adapters and compile documentation. They do not run real physical systems or validate micromagnetic dynamics on actual hardware.
- **No hardware execution:** The MuMax3/OOMMF simulation scripts are templates and have not been executed on a physical device.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Executive Summary

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  Current Baseline     Planar-first, electrically read using established     │
│                       multilayer spintronic stacks                          │
│                                                                             │
│  Hopfion Advantage    Theoretically bypass Skyrmion Hall Effect via         │
│                       zero net topological charge [INFERRED]                │
│                                                                             │
│  Long-Range Target    operation-accounted fJ-scale physical inference       │
│                       approaching thermodynamic efficiency limits           │
│                       [SPECULATIVE]                                         │
│                                                                             │
│  Strongest Candidate  Compensated ferrimagnet/altermagnet transport with    │
│                       spin-pumping readout                                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

Sub-Landauer behavior is treated as a long-range research question, not a demonstrated capability.

### Thermodynamic & Operational Validation Guardrails

To maintain physical rigor, HELIOS-3D adopts three validation guardrails based on recent literature in information thermodynamics and classical reversible computing:

1. **CRUD Accounting Framework:** Recent work in information thermodynamics (Iizumi 2026, DOI: `10.1016/j.physa.2026.131801`) frames Landauer's erasure bound as the Delete-specific limit of a broader Create/Read/Update/Delete accounting framework. HELIOS-3D uses this as a validation guardrail: any claimed energy advantage must account for the full physical information lifecycle, including reservoir state preparation, update/perturbation, readout/measurement, overwrite/reset behavior, and protocol-dependent dissipation.
2. **Reversible Operation Accounting:** Proposed classical reversible computation using quantum-coherent spin dynamics in Ge/Si quantum-dot arrays (Loss 2026, arXiv:2607.06219v1) serves as adjacent evidence for post-Landauer physical-computing architectures where storage, transport, and computation may share the same physical state variable. It strengthens the case for explicit operation-level accounting across reversible logic, readout, reset, transport, and error correction.
3. **Reservoir Thermodynamics:** Recent theory on the thermodynamics of quantum reservoir computing (Ding & Qiu 2026, arXiv:2607.02157v1) links predictive performance to microscopic energetic cost using Holevo-based memory and predictive capacities. HELIOS-3D treats this as a validation framework: physical reservoirs should be evaluated by how much useful predictive information they retain relative to non-predictive historical information, and by the irreversible work required to maintain continuous temporal processing.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Dual-Core Architecture

Modern silicon scaling faces severe constraints from inelastic scattering and energy-intensive data shuttling. HELIOS-3D explores migrating information carriers away from electrical charge toward topologically protected spin textures.

```
  Fabrication Pipeline:  DISH → TPP → ALD
  ─────────────────────────────────────────────────────────────────────────────
  DISH  Digital Incoherent Synthesis of Holographic light fields
  TPP   Two-Photon Polymerization
  ALD   Atomic Layer Deposition
```

| Core | Role | Status |
|---|---|---|
| **Magnetic Convolutional Accelerator (MCA)** | Deterministic sensory preprocessor via Compute-in-Memory spintronics | `[PROPOSED]` |
| **Brownian Reservoir Computing (BRC) Core** | Probabilistic decision-maker using noise-driven thermodynamic processing | `[PROPOSED]` |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Implementation Status

**Phase 0.5: Documentation + Validation Scaffolding** (Current)

| Component | Description | Status |
|---|---|---|
| **Topological Compiler** | Python mapping layer translating semantic embeddings → 3D magnetization tensors | Scaffold |
| **Compiler Tests** | Coordinate mapping fidelity + Hopf Index synthesis ($Q_H=1$) via mock IFE transfer function | Passing |
| **PINN Environment** | Physics-Informed Neural Network training infrastructure | Configured |
| **Micromagnetic Sim** | MuMax3/OOMMF configuration files | Templates |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Getting Started

```bash
# Clone the repository
git clone https://github.com/myrqyry/HELIOS-3D.git
cd HELIOS-3D

# Install dependencies
uv sync

# Run topological compiler tests
uv run pytest tests/test_topological_compiler.py
```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Repository Structure

| Path | Description |
|---|---|
| [`src/content/docs/`](./src/content/docs/) | Astro + MDX documentation source |
| [`research_specifications/`](./research_specifications/) | Formal physics and architecture modules |
| [`simulations/`](./simulations/) | MuMax3 and OOMMF configuration files |
| [`compiler/`](./compiler/) | Topological Compiler implementation |
| [`analysis/`](./analysis/) | Data validation and spintronic analysis scripts |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Claims Protocol

Every claim in HELIOS-3D is tagged to distinguish established physics from architectural aspirations:

```
  ┌──────────────┬────────────────────────────────────────────────────────────┐
  │ [DEMONSTRATED] │ Verifiable in peer-reviewed literature                    │
  │ [INFERRED]     │ Plausible extrapolation from established physics          │
  │ [PROPOSED]     │ Architectural integration suggested by HELIOS-3D          │
  │ [SPECULATIVE]  │ Theoretical target or unverified projection               │
  └──────────────┴────────────────────────────────────────────────────────────┘
```

See the [Claims Matrix](./src/content/docs/current/claims-matrix.mdx) for claim-by-claim traceability.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## The AI Energy Crisis

The AI energy crisis is real and accelerating:

- **Electricity:** Data center + AI + crypto demand projected at **~600 TWh in 2026**, potentially surpassing **1,000 TWh by 2030** — equivalent to Japan's annual consumption `[DEMONSTRATED]`
- **Water:** Global AI demand will account for **4.2–6.6 billion m³** of water withdrawal by 2027 `[DEMONSTRATED]`
- **Embodied Carbon:** Semiconductor fabrication accounts for up to **50% of total lifecycle footprint** for AI hardware `[DEMONSTRATED]`

HELIOS-3D investigates whether topological magnetism can let thermal noise *assist* computation while 3D scaling reduces physical and embodied footprint.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<div align="center">

**[Documentation](https://helios-3d.vercel.app/)** · **[Roadmap](./ROADMAP.md)** · **[Contributing](./CONTRIBUTING.md)** · **[Claims Matrix](./src/content/docs/current/claims-matrix.mdx)**

</div>
