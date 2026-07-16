# Ubiquitous Language

## Physics & Topological Magnetism

| Term | Definition | Aliases to avoid |
| ---- | ---------- | --------------- |
| **Skyrmion** | A 2D topologically protected spin texture carrying non-zero net topological charge | magnetic bubble, spin vortex |
| **Hopfion** | A 3D topologically protected spin texture with zero net topological charge | 3D skyrmion, toron |
| **Skyrmion Hall Effect** | The transverse deflection of skyrmions under current due to their non-zero topological charge | skyrmion skating, topological Hall drift |
| **Topological Charge** | The integer winding number quantifying a spin texture's topological protection | winding number (too generic) |
| **Hopf Index (Q_H)** | The topological invariant of a hopfion; Q_H=1 denotes a single hopfion | Hopf invariant, Hopf charge |

## Energy & Thermodynamics

| Term | Definition | Aliases to avoid |
| ---- | ---------- | --------------- |
| **Landauer Limit** | The minimum energy to erase one bit of information: k_B T ln 2 | thermodynamic floor, von Neumann limit |
| **Sub-Landauer** | Computation below the Landauer Limit; treated as a long-range research question, not a demonstrated capability | below-Landauer, super-Landauer |
| **Brownian Processing** | Using thermal noise as a computational resource rather than treating it as error | noise computing, stochastic assist |

## Compute Architecture

| Term | Definition | Aliases to avoid |
| ---- | ---------- | --------------- |
| **Magnetic Convolutional Accelerator (MCA)** | The deterministic, Compute-in-Memory spintronic preprocessor core | magnetic CNN, spin accelerator |
| **Brownian Reservoir Computing (BRC) Core** | The probabilistic, noise-driven decision-making core | thermal core, stochastic core |
| **Compute-in-Memory** | Performing computation within the memory medium to avoid data shuttling | in-memory compute, processing-in-memory (PIM) |
| **Reservoir Computing** | A fixed random dynamical system whose readout is trained for inference | echo-state network (too specific) |

## Fabrication Pipeline

| Term | Definition | Aliases to avoid |
| ---- | ---------- | --------------- |
| **DISH** | Digital Incoherent Synthesis of Holographic light fields — the optical exposure step | holographic lithography |
| **TPP** | Two-Photon Polymerization — 3D additive printing of the scaffold | 2PP, two-photon lithography |
| **ALD** | Atomic Layer Deposition — conformal coating of functional thin films | atomic deposition |

## Compiler & Simulation

| Term | Definition | Aliases to avoid |
| ---- | ---------- | --------------- |
| **Topological Compiler** | The Python layer mapping semantic embeddings to 3D magnetization tensors | compiler (too generic), mapper |
| **Magnetization Tensor** | The 3D spin-field representation that the Topological Compiler emits | spin map, field tensor |
| **IFE Transfer Function** | The interface-mixing model linking optical drive to spin torque; mocked in tests | spin-orbit torque model (narrower) |
| **Micromagnetic Simulation** | Numerical solving of magnetization dynamics (MuMax3 / OOMMF) | micromagnetic sim, spin simulation |

## Claims Protocol

| Term | Definition | Aliases to avoid |
| ---- | ----------- | --------------- |
| **[DEMONSTRATED]** | Claim verifiable in peer-reviewed literature | proven, established |
| **[INFERRED]** | Claim plausible from established physics | predicted, extrapolated |
| **[PROPOSED]** | Claim of architectural integration suggested by HELIOS-3D | suggested, designed |
| **[SPECULATIVE]** | Claim that is a theoretical target or unverified projection | hypothetical, aspirational |
| **Claims Matrix** | The traceability document mapping every claim to its evidence and tag | claims log, evidence table |

## Project Status

| Term | Definition | Aliases to avoid |
| ---- | ----------- | --------------- |
| **Baseline Path** | The planar-first, electrically read approach using established stacks | baseline, default track |
| **Phase 0.5** | The current stage: documentation and validation scaffolding | phase zero, pre-research |
| **Implementation Status** | Per-component maturity label (Scaffold / Passing / Configured / Templates) | status, readiness |

## Infrastructure & Docs

| Term | Definition | Aliases to avoid |
| ---- | ----------- | --------------- |
| **Docs Site** | The Astro + MDX documentation published on Vercel and GitHub Pages | website, wiki |
| **Vercel** | The primary auto-deploy host for the Docs Site on push to main | deploy target |
| **GitHub Pages** | The secondary auto-deploy host via workflow | GH Pages, pages |

## Relationships

- A **Hopfion** has **Topological Charge** of zero, which lets it bypass the **Skyrmion Hall Effect**.
- The **Baseline Path** uses **Skyrmions**; **Hopfions** are a later-stage research target.
- The **MCA** and **BRC Core** are the two cores of the **Compute Architecture**.
- The **Fabrication Pipeline** proceeds DISH → TPP → ALD to realize a device.
- The **Topological Compiler** emits a **Magnetization Tensor** consumed by **Micromagnetic Simulation**.
- Every external statement in HELIOS-3D carries exactly one **Claims Protocol** tag recorded in the **Claims Matrix**.

## Example dialogue

> **Dev:** "Is the **BRC Core** using a **Hopfion** or a **Skyrmion** as its reservoir?"
> **Domain expert:** "The **Baseline Path** is **Skyrmion**-based and electrically read. The **Hopfion** is a later target because its zero **Topological Charge** avoids the **Skyrmion Hall Effect**."
> **Dev:** "And the energy claim — can we tag the **BRC Core** as **[DEMONSTRATED]** for **Sub-Landauer** operation?"
> **Domain expert:** "No. **Sub-Landauer** is explicitly **[SPECULATIVE]**. We record it in the **Claims Matrix** as a long-range research question, not a demonstrated capability."
> **Dev:** "So the **Topological Compiler** test that synthesizes Q_H=1 — that's a **[PROPOSED]** integration?"
> **Domain expert:** "Correct. The Hopf Index synthesis runs against a mocked **IFE Transfer Function**; the physical mechanism is **[PROPOSED]** until a **Micromagnetic Simulation** confirms it."

## Flagged ambiguities

- **"3D"** appears in both HELIOS-3D (the project name, meaning 3D magnetization / 3D scaling) and in **TPP** (3D printing). These are related but distinct: HELIOS-3D's "3D" refers to the information carrier's geometry, not the fabrication method. Recommend: never use bare "3D" without context; say "3D magnetization tensor" or "3D printing (TPP)".
- **"Reservoir"** could mean the BRC's physical dynamical system or the abstract reservoir-computing paradigm. Within HELIOS-3D, **Reservoir Computing** is the paradigm and the **BRC Core** is its physical instantiation. Avoid using "reservoir" alone.
- **"Compiler"** in **Topological Compiler** is not a code compiler — it maps embeddings to spin fields. Avoid calling it "the compiler" without the "Topological" qualifier, since generic "compiler" has no domain meaning here.
- **"Status"** is overloaded: **Implementation Status** (Scaffold/Passing/Configured/Templates) describes component maturity, while **Claims Protocol** tags describe evidence strength. Keep the two distinct; do not say "this claim's status is Passing".
- **"Baseline"** vs **"Baseline Path"** — use the full term; "baseline" alone collides with generic project-language usage.
