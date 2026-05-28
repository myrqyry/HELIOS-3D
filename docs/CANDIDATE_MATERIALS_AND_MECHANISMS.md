# 🧲 Topological Information Carriers and Candidate Materials

This document is a candidate landscape, not a commitment to any single material system. The baseline demonstrator path remains planar-first and electrically read.

## 🌀 1. Skyrmions and 3D Hopfions

HELIOS-3D **proposes** to utilize nanoscale, topologically protected spin textures as primary information carriers.

*   **Super-Moiré Textures:** The architecture explores the use of "Super-Moiré" spin textures. Applying a 1.1° twist to ultra-thin 2D layers has been shown to yield Néel-type skyrmions. `[DEMONSTRATED]` HELIOS-3D hypothesizes that related twist-engineered textures could be stabilized at room temperature in a later-stage stack. `[SPECULATIVE]`
*   **Volumetric Scaling:** To achieve massive volumetric computational density, HELIOS-3D proposes a later transition to 3D hopfions—closed, twisted loops of spin lines. `[PROPOSED]`
*   **Topological Resilience:** These textures offer topological resilience and move parallel to spin currents, potentially reducing the Skyrmion Hall Effect (SkHE). `[INFERRED]`

---

## 🔬 2. Material Substrate ($Fe_3GaTe_2$)

One candidate substrate path for HELIOS-3D is $Fe_3GaTe_2$, a metallic van der Waals ferromagnet. `[CANDIDATE]`

*   **High-Temperature Ferromagnetism:** $Fe_3GaTe_2$ exhibits a Curie temperature ($T_C$) of 420K. `[DEMONSTRATED]` This suggests a possible thermal margin over standard data center operating environments, but only on flat substrates and under validated processing conditions. `[INFERRED]`
*   **Topological Features:** Computational performance is hypothesized to leverage strong Berry curvature near the $\Gamma$-point. `[INFERRED]`

### 🧪 Material Property Comparison (Flat Substrate Context)

| Material Property | $CrI_3$ | $Fe_3GaTe_2$ | $EuS/Bi_2Se_3/EuS$ | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Curie Temp ($T_c$)** | ~61 K | 350–380 K | > 300 K (Proximity-boosted) | `[DEMONSTRATED]` |
| **Hopfion Stability** | Cryogenic | Unvalidated | **Zero-Field, Room-Temp** | `[DEMONSTRATED]` |
| **Interfacial DMI** | Low | High (with $RuO_2$) | High (TI/FMI Interface) | `[DEMONSTRATED]` |
| **Carrier Type** | 2D Spirals | 2D Skyrmions | 3D Hopfion Rings | `[DEMONSTRATED]` |

### 💎 1.1 Baseline Choice: EuS/Bi₂Se₃/EuS Trilayers
Following the findings of **Katmis et al. (2025)**, the HELIOS-3D Phase 1 demonstrator adopts the **$EuS/Bi_2Se_3/EuS$** trilayer as its primary material anchor. This stack offers:
1.  **Verified 3D Hopfion Nucleation:** Direct LTEM imaging of 3D solitons at room temperature.
2.  **Topological Insulator (TI) Interface:** The $Bi_2Se_3$ layer provides the strong spin-orbit coupling and DMI necessary for knotted spin textures.
3.  **Proximity Magnetism:** Allows the use of high-quality magnetic insulators ($EuS$) while maintaining room-temperature ordering.

To enable active tuning of moiré potentials, HELIOS-3D investigates the integration of high-dielectric substrates.

*   **Strontium Titanate (SrTiO3 / STO):** STO exhibits a massive, temperature-dependent dielectric constant ($\epsilon \approx 300$ at room temperature, increasing to $>20,000$ at cryogenic temperatures).
*   **Mechanism:** Proximity to an STO layer (within 1–3 nm) provides in-situ screening of electronic and magnetic interactions. This allows for the dynamic modulation of the "trapping potential" depth in super-moiré lattices, enabling a switchable interface between high-mobility diffusion (for reservoir training) and pinned stability (for state storage). `[INFERRED from Gao et al., 2026]`

**Note:** While properties are well-documented on flat epitaxial substrates, maintaining these characteristics on complex 3D polymer scaffolds via conformal coating remains a major research hurdle. See **[`OPEN_QUESTIONS.md`](./OPEN_QUESTIONS.md)**.

---

## 🛡️ 3. Topological Defenses

To facilitate rectilinear transport at extreme velocities, the architecture investigates approaches that reduce transverse Magnus forces. `[PROPOSED]`

*   **Synthetic Antiferromagnetic (SAF) Multilayers:** Coupling ferromagnetic layers with opposing magnetizations can achieve a net topological charge of zero ($Q_{net} = 0$). `[DEMONSTRATED]` This is **proposed** for HELIOS-3D to minimize drift. `[PROPOSED]`
*   **Graded-Index Magnonics:** Deploying a linear gradient of saturation magnetization ($M_s$) is hypothesized to create an energetic slope that counteracts transverse drift. `[SPECULATIVE]`

---

## 🌿 4. Environmental Cost-Benefit Analysis

Critical-material use must be justified by compute-per-atom efficiency, not novelty alone.

*   **$Fe_3GaTe_2$:** Gallium/tellurium supply risk exists, but thin-film use keeps atomic-volume demand low.
*   **Pt/Co/Ir multilayers:** Platinum/cobalt scarcity and heavy-metal embodied burden are real, but manufacturability is strong and system risk is lower.
*   **GdFeCo:** Rare-earth exposure remains, yet transport reliability is better for device operation.
*   **General principle:** Planar-first demonstrators should minimize critical-material mass and reserve 3D integration for later stages.

---

## 🌀 5. Super-Moiré Twistronics for Reduced-Bias Stabilization

A critical bottleneck in topological magnetic computing is the requirement for external bias magnetic fields to stabilize skyrmions and hopfions. This adds power consumption and complicates device footprint. HELIOS-3D explores **twistronic stabilization** as one possible later-stage solution.

### 5.1 Mechanism

When two van der Waals ferromagnetic layers (e.g., $CrI_3$, $Fe_3GaTe_2$) are stacked with a slight rotational twist ($\theta \approx 1.1^\circ$), their moiré pattern generates spatially alternating exchange interactions. This creates a **super-moiré lattice** that can help stabilize giant topological magnetic textures at reduced bias. `[DEMONSTRATED for 2D spin spirals]`

*   **Environmental Constraints (CrI3):** While twisted double bilayer Chromium Triiodide ($CrI_3$) has demonstrated these magnetic textures, it is highly air-sensitive and currently requires cryogenic temperatures (~4 K) for stability.
*   **Proof-of-Concept Framing:** HELIOS-3D frames the use of $CrI_3$ purely as a **laboratory proof-of-concept**. The project roadmap explicitly targets the transfer of these twist-engineering mechanisms to higher-ordering (Curie) temperature magnets (e.g., $Fe_3GaTe_2$) and the use of specialized **capping layers** (such as Tantalum or Tungsten) to protect sensitive architectures from oxidation and humidity. `[PROPOSED]`

### 5.2 Integration for HELIOS-3D

*   **Low-Bias Memory:** By engineering the twist angle between ferromagnetic layers in the HELIOS-3D stack, hopfions may become more stable at reduced bias field. This would improve non-volatility and reduce standby power for field coils.
*   **Twist Angle Engineering:** The optimal twist angle for maximum topological texture density can be tuned by varying the interlayer coupling strength. A 1.1° twist in $CrI_3$ produces Néel-type skyrmions; similar principles may apply to $Fe_3GaTe_2$ `[INFERRED]`
*   **Hierarchical Topologies:** The moiré period defines a natural length scale for topological texture arrays, enabling self-organized high-density patterning.

### 5.3 Advantages for BRC

The stochastic dynamics of twist-stabilized textures are influenced by the moiré potential landscape. Ambient thermal fluctuations can cause skyrmions to diffuse between moiré cells, which makes the system a plausible **Brownian computation substrate** for later investigation.

---

## 🧲 6. Altermagnets and Compensated Ferrimagnets for Ultra-Dense Packing

As HELIOS-3D scales to sub-10 nm pitch, the stray magnetic fields of neighboring hopfions begin to interact, causing cross-talk and data corruption. Traditional ferromagnets generate significant stray fields that limit packing density.

### 6.1 Compensated Ferrimagnets

Ferrimagnets have two (or more) sublattices with opposing magnetic moments. In **compensated ferrimagnets** (e.g., GdFeCo near the compensation point), the net magnetization approaches zero while retaining strong spin polarization. `[DEMONSTRATED]`

*   **Zero Stray Field:** The opposing sublattice moments cancel, generating negligible external field.
*   **Hopfion Hosting:** Hopfions can be nucleated within the ferrimagnetic matrix without generating long-range dipole interactions with neighbors.
*   **Sub-10 nm Pitch:** Enables volumetric packing densities >10³ Tb/in³ without cross-talk. `[SPECULATIVE]`

### 6.2 Altermagnets

Altermagnets are a recently discovered class of collinear magnets with **alternating spin-up and spin-down band structures** at different crystalline momenta. They exhibit:
*   Zero net magnetization (like antiferromagnets)
*   Strong spin splitting (like ferromagnets)
*   No stray fields, high packing density potential

Recent preprints (arXiv:2507.05618v2, arXiv:2601.13499) demonstrate altermagnetic switching in $Mn_5Si_3$-type and related systems. `[DEMONSTRATED]`

### 6.3 Integration for HELIOS-3D

| Feature | Standard Ferromagnet | Compensated Ferrimagnet | Altermagnet |
| :--- | :--- | :--- | :--- |
| **Net Magnetization** | High | Near-zero | Zero |
| **Stray Field** | Significant | Negligible | Negligible |
| **Spin Polarization** | Moderate-High | High | High |
| **Pitch Limit** | ~50 nm | <10 nm | <10 nm |
| **HELIOS-3D Status** | Current baseline | `[INFERRED]` | `[PROPOSED]` |

HELIOS-3D may later migrate from standard ferromagnets (Phase 1) to compensated ferrimagnets (Phase 2) as a hosting material for ultra-dense hopfion arrays, if the intermediate demonstrators justify that step.
