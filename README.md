# ☀️ HELIOS-3D: Hybrid-manufactured Energy-Landscape Inference and Operation System

## Status

HELIOS-3D is a speculative research documentation project.

It is **not**:
- a fabricated chip
- a validated hardware design
- a claim of demonstrated sub-Landauer computation
- a claim that hopfions have been integrated into a working inference coprocessor

It **is**:
- a staged research hypothesis
- a map of plausible and implausible material/fabrication paths
- a public notebook for tracking claims, blockers, and evidence
- an attempt to separate near-term demonstrator paths from long-range speculation

Sub-Landauer behavior is treated as a long-range research question, not a demonstrated capability.

---

## Executive Summary

**What is HELIOS-3D?**
HELIOS-3D is a speculative research documentation project exploring whether spintronic, topological, and thermodynamic-computing mechanisms could support future low-energy inference architectures near fundamental energy-efficiency limits.

**Current Baseline Path**
The current defensible path is **planar-first and electrically read**, using established multilayer spintronic stacks. Freeform 3D hopfion fabrication is treated as a later-stage research branch, not the first demonstrator.

**Why Hopfions over Skyrmions?**
Hopfions theoretically bypass the Skyrmion Hall Effect due to zero net topological charge in 2D projection. `[INFERRED]`

**Long-Range Target**
The project investigates whether waste-heat-assisted operation could enable **ultra-low energy computation** (fJ-scale) approaching theoretical efficiency limits. While the Landauer limit ($k_B T \ln 2$) remains the ultimate target, current research acknowledges that random fluctuations and the need for directional ratchets impose additional energetic costs. `[SPECULATIVE]`

## 🔬 Project Overview

The Hybrid-manufactured Energy-Landscape Inference and Operation System (HELIOS-3D) is a staged spintronic research hypothesis. The current minimum credible path is planar-first and electrically read; the freeform 3D hopfion and IFE branch is explicitly a later-stage research target, not a dependency of the first demonstrator.

The strongest late-stage candidate family currently appears to be compensated ferrimagnet/altermagnet transport and readout, because it offers magnetization-free dynamics with a plausible spin-pumping or current-driven readout path.

---

## 📋 Claims & Evidence Protocol

To maintain scientific discipline and distinguish between established physics and architectural aspirations, HELIOS-3D uses the following tagging system:

*   **`[DEMONSTRATED]`**: Verifiable in peer-reviewed literature for specific materials and conditions.
*   **`[INFERRED]`**: A plausible extrapolation from established physical principles or adjacent material systems.
*   **`[PROPOSED]`**: A specific architectural integration or implementation path suggested by the HELIOS-3D model.
*   **`[SPECULATIVE]`**: A theoretical target, high-risk hypothesis, or unverified performance projection.

See [`docs/CLAIMS_MATRIX.md`](./docs/CLAIMS_MATRIX.md) for claim-by-claim traceability.

---

## 📖 System Abstract

Modern silicon scaling faces severe constraints driven by inelastic scattering and energy-intensive data shuttling. HELIOS-3D **proposes** to resolve these structural crises by migrating primary information carriers away from electrical charge. Instead, it explores the use of topologically protected spin textures—specifically skyrmions and 3D hopfions.

The system is conceptualized as a dual-core architecture:
*   **Magnetic Convolutional Accelerator (MCA):** A deterministic sensory preprocessor hypothesized to utilize Compute-in-Memory spintronics. `[PROPOSED]`
*   **Brownian Reservoir Computing (BRC) Core:** A probabilistic decision-maker designed to investigate noise-driven, non-equilibrium thermodynamic processing. `[PROPOSED]`

Physical realization is **theorized** via a hybrid fabrication pipeline: Digital Incoherent Synthesis of Holographic light fields (DISH) for macro-scaffold creation, Two-Photon Polymerization (TPP) for refinement, and Atomic Layer Deposition (ALD) for magnetic coating. Performance targets aspire to fJ-scale energy efficiency, though these remain experimentally unverified projections. `[SPECULATIVE]`

The repo should be read with a strict staging rule: `ALTERNATIVE_MATERIALS_AND_METHODS.md` is the current baseline path, while `CORE_ARCHITECTURE.md` and `PROPOSED_FABRICATION_PATH_AND_CONTROL.md` are long-range branch documents.

---

## 🗺️ Repository Structure (Documentation)

| Document | Research Focus |
|---|---|
| **[`ABSTRACT.md`](./docs/ABSTRACT.md)** | Full system hypothesis and thermodynamic crisis framing |
| **[`CANDIDATE_MATERIALS_AND_MECHANISMS.md`](./docs/CANDIDATE_MATERIALS_AND_MECHANISMS.md)** | Spin textures and metallic van der Waals ferromagnets |
| **[`ALTERNATIVE_MATERIALS_AND_METHODS.md`](./docs/ALTERNATIVE_MATERIALS_AND_METHODS.md)** | Current baseline: planar-first, electrical readout |
| **[`OPEN_QUESTIONS.md`](./docs/OPEN_QUESTIONS.md)** | Critical uncertainties, technical blockers, and roadmap |
| **[`TARGETS_COMPARATORS_AND_PROJECTIONS.md`](./docs/TARGETS_COMPARATORS_AND_PROJECTIONS.md)** | Evidence-backed targets and benchmark context |
| **[`CLAIMS_MATRIX.md`](./docs/CLAIMS_MATRIX.md)** | Claim-to-source traceability and promotion criteria |
| **[`LITERATURE_REVIEW.md`](./docs/LITERATURE_REVIEW.md)** | Analysis of supporting foundational papers |
| **[`MATHEMATICS.md`](./docs/MATHEMATICS.md)** | Hopf invariant, decay, and topological protection |
| **[`CORE_ARCHITECTURE.md`](./docs/CORE_ARCHITECTURE.md)** | Long-range MCA + BRC architecture branch |
| **[`PROPOSED_FABRICATION_PATH_AND_CONTROL.md`](./docs/PROPOSED_FABRICATION_PATH_AND_CONTROL.md)** | Long-range write/process/read branch |
| **[`DEFENSIVE_FRAMEWORK.md`](./docs/DEFENSIVE_FRAMEWORK.md)** | Addressing technical critiques and stability concerns |
| **[`PITCH_DECK_OUTLINE.md`](./docs/PITCH_DECK_OUTLINE.md)** | Research investigation pitch for stakeholders |

---

## ⚠️ The Thermodynamic Crisis and the Spintronic Mandate

The global trajectory of computational energy consumption poses a significant challenge to the continued scaling of AI. Traditional von Neumann architectures require the transport of electrical charge, where the energetic cost of data movement often exceeds logic operations. `[DEMONSTRATED]`

Biological benchmarks and AI infrastructure energy use motivate the project framing, but the repo should treat every downstream device claim as conditional on a specific material stack, readout path, and temperature regime. HELIOS-3D bridges this gap by testing whether transitioning computational principles to topological magnetism can allow thermal noise to assist, rather than degrade, computation.

## 🌐 Publish to GitHub Pages Without Actions

This repo is set up for local MkDocs deployment to a `gh-pages` branch.

1. Install dependencies with `uv sync` or `make sync`.
2. Build locally with `uv run mkdocs build` or `make build`.
3. Publish with `uv run mkdocs gh-deploy --clean` or `make deploy`.
4. In GitHub repo settings, open `Pages`.
5. Set `Source` to `Deploy from a branch`.
6. Select branch `gh-pages` and folder `/ (root)`.
