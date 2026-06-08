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

## 💻 Implementation Status (Phase 0.5)

The project is currently in **Phase 0.5: Documentation + validation scaffolding**. A mock topological compiler scaffold exists in `compiler/` for structural testing; full firmware and physics-validated compiler work remains Phase 2. 

*   **Topological Compiler:** A Python-based mapping layer (in `compiler/`) that translates semantic embeddings into 3D magnetization tensors.
*   **Prototype compiler scaffolding:** Initial unit tests validate coordinate mapping fidelity and integer Hopf Index synthesis ($Q_H=1$) using a mock Inverse Faraday Effect transfer function.
*   **PINN Readiness:** The environment is configured for Physics-Informed Neural Network (PINN) training to automate magnetization synthesis.

---

## 🧪 Getting Started

To run the current topological compiler tests and verify the physics mapping:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/myrqyry/HELIOS-3D.git
    cd HELIOS-3D
    ```
2.  **Install dependencies:**
    ```bash
    uv sync
    ```
3.  **Run tests:**
    ```bash
    uv run pytest tests/test_topological_compiler.py
    ```

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

## 🗺️ Repository Structure

| Path | Focus |
|---|---|
| **[`src/content/docs/`](./src/content/docs/)** | Starlight-based documentation source (Primary) |
| **[`research_specifications/`](./research_specifications/)** | Formal physics and architecture modules |
| **[`simulations/`](./simulations/)** | MuMax3 and OOMMF configuration files |
| **[`compiler/`](./compiler/)** | Topological Compiler implementation |
| **[`analysis/`](./analysis/)** | Data validation and spintronic analysis scripts |

---

## 🌐 Deployed Site

The technical documentation is live at **[myrqyry.github.io/HELIOS-3D/](https://myrqyry.github.io/HELIOS-3D/)**.

The site is built with **Astro (Starlight)** and automatically deployed via GitHub Actions on every push to `main`.

### Local Development

1.  **Frontend:**
    ```bash
    pnpm install
    pnpm dev
    ```
2.  **Research Environment:**
    ```bash
    uv sync
    ```

---

## ⚠️ The Thermodynamic Crisis and the Spintronic Mandate

The global trajectory of computational energy consumption poses an existential challenge to AI scaling. According to the **International Energy Agency (IEA)**, combined electricity demand from data centers, AI, and crypto is projected to reach **~600 TWh in 2026**, with high-growth scenarios surpassing **1,000 TWh by 2030**—equivalent to the annual consumption of Japan. `[DEMONSTRATED]`

Beyond electricity, the "thirst" of AI infrastructure is a secondary crisis. Research indicates that global AI demand will account for **4.2 to 6.6 billion cubic meters** of water withdrawal by 2027 (roughly half of the UK's annual withdrawal). `[DEMONSTRATED]`

Furthermore, as grids decarbonize, **embodied carbon** from semiconductor fabrication is becoming the dominant environmental challenge, accounting for up to **50% of the total lifecycle footprint** for state-of-the-art AI hardware. `[DEMONSTRATED]`

HELIOS-3D bridges this gap by testing whether transitioning computational principles to topological magnetism can allow thermal noise to assist, rather than degrade, computation, while utilizing high-density 3D scaling to reduce the physical and embodied footprint of compute infrastructure.

## 🌐 Publish to GitHub Pages

This site is deployed automatically by the GitHub Actions workflow at `.github/workflows/deploy.yml`. On every push to `main`, the workflow runs `pnpm check && pnpm test && pnpm build` and publishes `dist/` to GitHub Pages.

To enable:

1. In GitHub repo settings, open **Pages**.
2. Set **Source** to **GitHub Actions**.
3. Push to `main`; the workflow will deploy the first build.

For a one-off local preview:

```bash
pnpm build
pnpm preview
```
