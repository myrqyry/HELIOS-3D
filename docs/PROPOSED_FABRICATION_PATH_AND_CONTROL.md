# 🏗️ Proposed Fabrication Path and Control Stack

!!! warning "Long-Range Branch"
    This document describes a **speculative future phase** of HELIOS-3D.
    The current minimum credible path is documented in
    [ALTERNATIVE_MATERIALS_AND_METHODS.md](./ALTERNATIVE_MATERIALS_AND_METHODS.md).

This is the long-range fabrication branch. The current recommended baseline remains planar-first, electrically read, and transfer/stack friendly.

## 🏭 1. Hypothesized Hybrid Fabrication Pipeline

The realization of HELIOS-3D's complex 3D spintronic labyrinth **explores** a three-phase sequential manufacturing flow. This integration remains a long-range research goal. `[PROPOSED]`

1.  **DISH (Digital Incoherent Synthesis of Holographic light fields):** Explored for the rapid instantiation of non-magnetic macro-scaffolds. Millimeter-scale curing in ~0.6 seconds has been shown in standalone volumetric printing. `[DEMONSTRATED]` Its use for spintronic scaffolds is **proposed**. `[PROPOSED]`
2.  **TPP (Two-Photon Polymerization):** Proposed for sub-100nm precision refinement of internal routing tracks. Refractive Index Matching (RIM) protocols are **theorized** to maintain optical clarity during deep internal polymerization. `[INFERRED]`
3.  **ALD (Atomic Layer Deposition):** Hypothesized for the conformal coating of the magnetic matrix. While ALD is a standard industry tool, its application for high-quality $Fe_3GaTe_2$ deposition on 3D polymer scaffolds is unverified. `[SPECULATIVE]`

### 1.1 Fabrication Scale Boundary Demarcation

A critical ambiguity in the original HELIOS-3D proposal is the direct assertion that DISH volumetric printing can seamlessly integrate with atomic-scale van der Waals epitaxy. This section clarifies the recommended boundary between fabrication scales:

| Scale | Technology | HELIOS-3D Role | Connection Method |
| :--- | :--- | :--- | :--- |
| **Macroscale** ($>$ 10 $\mu m$) | DISH | Optical waveguides, thermal heat sinks, structural scaffolds, fluidic channels | Direct write onto substrate |
| **Mesoscale** (100 nm – 10 $\mu m$) | TPP | Micro-reservoir chambers, track refinement, electrode templates | In-situ alignment to DISH features |
| **Nanoscale** ($<$ 100 nm) | ALD / Sputter | Magnetic multilayers ($Ir/Fe/Co/Pt$), $Fe_3GaTe_2$ flakes, hBN quantum sensors | **Laser-Assisted Bonding (LAB)** or Van der Waals Transfer |

#### Macroscale (DISH)

*   **Function:** Provides the bulk structural framework, thermal management pathways, and optical access ports.
*   **Materials:** Photoresin (e.g., IP-Dip, PEGDA-based formulations, and low-viscosity acrylates down to 4.7 cP).
*   **Performance:** ~19 µm stable printing resolution (11 µm optical) across a 1 cm axial depth in <0.6 seconds. `[DEMONSTRATED]`
*   **Preprocessing Bottleneck:** Generating complex holographic patterns for mm-scale volumes can currently take ~24 hours on desktop CPUs. HELIOS-3D **proposes** the integration of **GPU-accelerated iterative optimization** or **Neural Network-based hologram generation** to reduce preprocessing to minutes or seconds. `[PROPOSED]`
*   **In-Situ Capability:** The single-side illumination and rotating periscope design (Wang et al., 2026) enable printing directly onto **fixed substrates** (e.g., pre-fabricated CMOS or spintronic wafers) without sample rotation. This is the primary mechanism for integrating 3D features with the "Planar-First" branch. `[DEMONSTRATED]`
*   **Scaling Strategy (Modular Assembly):** To overcome the cm-scale volume limits of DISH, we propose a **modular assembly workflow**. Millimeter-scale topological modules are printed rapidly and then tiled or assembled into larger 3D coprocessor arrays. For the detailed geometric and optical protocol, see **[`research_specifications/module_6_modular_tiling_scaling.md`](../research_specifications/module_6_modular_tiling_scaling.md)**. `[PROPOSED]`
*   **Output:** A 3D polymer scaffold with pre-defined cavities for magnetic active regions.
*   **Reconfigurability (Y-zipper):** We **propose** integrating the 3D-printed "Y-zipper" mechanism (Li et al., 2026) to enable deployable or reconfigurable scaffolds. This allows for the fabrication of complex spintronic paths that can be transitioned from a flexible assembly state to a rigid operational state via a mechanical zipping interaction. `[PROPOSED]`

#### Mesoscale (TPP)

*   **Function:** Refines the interior geometry of the scaffold—creating precise micro-harbor boundaries for skyrmion confinement, defining microfluidic channels for thermal gradient control, and patterning electrode contact pads.
*   **Material:** Same photoresin family, written with higher resolution.
*   **Alignment:** Real-time refractive index matching enables writing *through* previously cured DISH structures.

#### Nanoscale (ALD / Thin-Film Deposition)

*   **Function:** Deposits the active magnetic heterostructures.
*   **The Critical Interface:** The boundary between the TPP surface (organic polymer) and the magnetic layer (inorganic metal/ferromagnet) is the highest-risk interface in the current proposal.
*   **Recommended Bonding Approach:**
    *   **Planar-First (Recommended):** Deposit magnetic layers on a separate planar substrate, then use **laser-assisted bonding (LAB)** or **cold welding** to transfer the magnetic stack onto the TPP scaffold surface.
    *   **Direct ALD (Long-term Goal):** Develop plasma-activated surface treatments for the TPP polymer to enable direct ALD nucleation. This is `[SPECULATIVE]` and requires significant process development.

---

## 📡 2. Conceptual Interfacing Layer: Readout and Firmware

### 🔍 Proposed Readout Modalities
HELIOS-3D investigates a "Bifurcated Readout Strategy" to minimize energy overhead at the spintronic-to-electronic interface. `[PROPOSED]`

*   **Primary Modality (Microwave Spectroscopy):** Conceptualized to detect frequency-encoded "breathing modes" of hopfion radii. Recent research has identified distinct **sub-GHz breathing modes**—where the outer shell radially oscillates while the topological core remains intact. By utilizing **Ferromagnetic Resonance (FMR)** or **Brillouin Light Scattering (BLS)**, the system can detect these frequencies, providing a fast, spectral fingerprint for reading hopfion states without the data-processing overhead of optical point clouds. `[INFERRED]`
*   **Electrical Hallmark (TOHE Detector):** Leverages the **Topological Orbital Hall Effect** (Göbel & Lounis, 2025/2026) for all-electrical readout. This detector utilizes the 3D transverse orbital current generated by the hopfion's spin texture as an electronic signature. For the detailed device spec, see **[`research_specifications/module_7_tohe_electrical_detector.md`](../research_specifications/module_7_tohe_electrical_detector.md)**. `[PROPOSED]`
*   **Auxiliary Modality (hBN Fluorescence):** Explores the use of negatively charged boron vacancies ($V_B^-$) for alignment-free volumetric mapping. `[DEMONSTRATED]` Integration into a 3D spintronic stack is **proposed**. `[PROPOSED]`
*   **Hopfion Magnonics:** This modality explores the use of magnons (spin waves) as signal carriers that couple to hopfion breathing modes, enabling purely electrical readout architectures. `[SPECULATIVE]`

### 🧩 The Semantic-to-Topological Compiler
A critical challenge is bridging the semantic gap between high-level AI representations (like those from an LLM) and the low-level physics of 3D spin textures. The HELIOS-3D "Topological Compiler" handles this translation.

*   **Geometric Tensors as an "Optical Modem":** We propose utilizing a highly distilled, 3B-parameter model running on the host system to act as a translator. This model takes semantic vectors generated by a larger AI framework and compiles them into **3D geometric magnetization tensors**. These tensors define the precise spatial distribution of the desired magnetic knots.
*   **Optical-to-Topological Conversion (The IFE Write-Path):** Once the target tensor is defined, it is translated into an optical prescription. We detail how **bichromatic, circular-polarized light pulses** are used to generate specific angular momentum states. Through the Inverse Faraday Effect (IFE), these light pulses induce an effective magnetic field localized to the focal volume, allowing the system to physically "print" the compiled hopfion directly into the $Fe_3GaTe_2$ lattice in under 1 nanosecond. `[SPECULATIVE]`
*   **Validation Loop:** Proposed integration of LLG simulation engines (Mumax3/OOMMF) for dry-run verification of texture stability prior to optical imprinting. `[PROPOSED]`

### 🔄 Theoretical Thermodynamic Training
Investigates teacher-student training methods where ambient thermal noise is **hypothesized** to assist in gradient-descent optimization within the BRC core. `[SPECULATIVE]`

---

## 💡 3. Photonic Spacetime Crystals: The Write Phase

The Write phase of HELIOS-3D—the rapid imprinting of complex 3D topological knots—is enabled by **Photonic Spacetime Crystals** and the **Inverse Faraday Effect**.

### 3.1 Space-Time Optical Hopfion Crystals

Structured bichromatic (two-color) light fields can generate "knotted light"—photonic Hopfions that propagate through free space. These are solutions to Maxwell's equations in nonlinear media that carry **topological charge** in the form of linked and knotted field lines. `[DEMONSTRATED]`

*   **DISH Integration:** The same DISH holographic system proposed for scaffold fabrication can be repurposed to generate the structured light fields required for photonic Hopfion crystal formation.
*   **Temporal Modulation:** By modulating the two input beams with different frequencies ($\omega_1$, $\omega_2$), the interference creates a spatiotemporal lattice—an optical crystal that exists in both space and time.

### 3.2 Inverse Faraday Effect for Magnetic Imprinting

When circularly polarized light interacts with a magnetic material, it induces a effective magnetic field via the Inverse Faraday Effect (IFE). The direction of this field is determined by the helicity of the incident light. `[DEMONSTRATED]`

*   **Knotted Light → Magnetic Hopfion:** A photonic Hopfion (knotted electromagnetic field) carries angular momentum. When incident on the ferromagnetic substrate, this angular momentum transfers to the spin system, nucleating a magnetic hopfion with the same topological structure as the optical input.
*   **Semantic-to-Topological Compiler:** This mechanism directly converts structured light patterns into magnetic textures—the core of the proposed "Topological Compiler." An LLM generates a tensor representation of the desired computation; this tensor is mapped to a photonic Hopfion geometry; the photonic Hopfion writes the corresponding magnetic texture via IFE.

### 3.3 Optical-to-SOT Write Interface
For logical nodes and switching, we adopt a hybrid **laser-to-photocurrent-to-SOT** pipeline (Tsai et al., 2026).
*   **Mechanism:** Telecom-band laser pulses (e.g., from the DISH periscope or an auxiliary bus) excite a photodiode to generate **60-ps photocurrent pulses**.
*   **Switching:** These pulses are injected into $Mn_3Sn$ antiferromagnetic nodes, triggering deterministic octupole switching via Spin-Orbit Torque.
*   **Efficiency:** This path enables ultrafast optical writing with minimal heat generation (~8 K rise) and bypasses traditional electronic signal chain overhead. `[DEMONSTRATED]`

### 3.4 Write Phase Specifications

| Parameter | Target | Status |
| :--- | :--- | :--- |
| **Write Speed** | **40–60 ps** | `[DEMONSTRATED]` |
| **Topological Fidelity** | >99% (matching input knot) | `[PROPOSED]` |
| **Energy per Write** | **~1.7 pJ/µm²** (AFM) / **4 fJ** (Optical) | `[DEMONSTRATED]` |
| **Wavelength** | 800–1550 nm (near-IR) | `[DEMONSTRATED]` |
| **Material Compatibility** | $EuS/Bi_2Se_3/EuS$, $Mn_3Sn$, $Fe_3GaTe_2$ | `[DEMONSTRATED]` |

### 3.4 Hybrid Write/Read Architecture

The three-pillar pipeline connects elegantly:

1.  **Write:** DISH generates knotted light → IFE imprints magnetic hopfion
2.  **Process:** Ambient heat drives Brownian dynamics in twistronic moiré lattice
3.  **Read:** Microwave spectroscopy detects breathing mode frequency

This creates a conceptual closed-loop architecture where the same DISH hardware could be used for both scaffold fabrication and magnetic writing, but only after the write-step physics is independently validated.

### 3.5 Historical Analogy: Lippmann Photography

Lippmann color photography offers a useful but limited analogy for the HELIOS-3D
write-path. In that process, optical standing waves record wavelength
information as depth-dependent silver structures in a photographic emulsion.
The result shows that interference can encode rich optical information directly
into material microstructure.

The analogy does not validate magnetic imprinting, IFE coupling, hopfion
nucleation, or HELIOS-3D device operation. Its value is cautionary: Lippmann
plates were physically elegant, but their practical use was constrained by long
exposure times, narrow viewing geometry, difficult reproduction, and demanding
readout conditions. HELIOS-3D must avoid the same failure pattern by specifying
the readout, rewrite, stability, and integration path as tightly as the optical
write mechanism itself.
