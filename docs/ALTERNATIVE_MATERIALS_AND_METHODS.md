# HELIOS-3D: Alternative Materials and Methods Decision Memo

This memo evaluates lower-risk alternatives that preserve the HELIOS-3D architectural thesis while reducing exposure to the two weakest assumptions in the current plan:

1. Conformal deposition of a vdW ferromagnet such as $Fe_3GaTe_2$ onto a complex 3D polymer scaffold.
2. Microwave-first readout as the primary sensing path for early prototypes.

The conclusion is not that the current hypothesis is invalid. The conclusion is narrower and more precise: the current hypothesis is stronger as a phased program than as a single integrated fabrication jump.

## 1. Decision Criteria

Alternatives are evaluated against the following criteria:

| Criterion | Question |
| :--- | :--- |
| **Carrier Validity** | Does the platform support room-temperature skyrmions or closely related robust magnetic carriers? |
| **Manufacturability** | Can the platform be fabricated with standard sputter, lithography, etch, transfer, or wafer-integration methods? |
| **Transport Quality** | Does the platform reduce transverse drift, pinning, or other routing instabilities? |
| **Readout Compatibility** | Can the platform be sensed electrically without requiring a high-overhead RF chain? |
| **Architectural Continuity** | Can the platform preserve the MCA/BRC split without redesigning the whole project? |

## 2. Bottom-Line Recommendation

For the first demonstrator, HELIOS-3D should pivot to a **planar-first, electrically read, multilayer spintronic stack**. The most defensible path is:

1. **Material system:** `Ir/Fe/Co/Pt` or `Ir/Co/Pt` for initial MCA experiments.
2. **Transport-optimized branch:** `GdFeCo` or related ferrimagnetic multilayers if skyrmion Hall suppression becomes dominant.
3. **Fabrication path:** planar lithography plus sputter/etch, then stacked or transferred integration for 3D density.
4. **Readout/control:** Hall, TMR, AHE/THE, SOT, or VCMA before any microwave-first architecture is attempted.

This preserves the logic of HELIOS-3D while replacing the least-supported fabrication step with an experimentally credible progression.

Among later-stage branch candidates, the strongest family is now the compensated ferrimagnet/altermagnet route: the compensated-ferrimagnet paper gives a natural spin-pumping readout mechanism, while the altermagnet paper shows current-driven nonlinear skyrmion dynamics and THz-scale helicity motion. That makes this path a stronger long-range candidate than freeform 3D magnetic coating, but still a branch beyond the planar demonstrator.

## 3. Candidate Materials

### 3.1 `Ir/Fe/Co/Pt` Multilayers

**Supporting studies:**

* Moreau-Luchaire et al., *Nature Nanotechnology* (2016), DOI: `10.1038/nnano.2015.313`
* Soumyanarayanan et al., *Nature Materials* (2017), DOI: `10.1038/nmat4934`

**Advantages:**

* Strongest empirical support for tunable, room-temperature skyrmions in a device-relevant multilayer stack.
* Entire stack can be deposited by established thin-film methods.
* Parameter tuning is well-documented through layer-thickness control.

**Disadvantages:**

* Still fundamentally a planar platform.
* Heavy-metal interfaces may impose power and damping penalties.

**Compatibility with HELIOS-3D:**

* **MCA:** Excellent alignment with deterministic track-based transport and switching experiments.
* **BRC:** Usable for confined stochastic reservoirs, though not yet a proven reservoir substrate.

**Assessment:**

* Best near-term replacement for $Fe_3GaTe_2$ in a first hardware demonstrator.

### 3.2 `Ir/Co/Pt` or `Pt/Co/Ir` Multilayers

**Supporting studies:**

* Woo et al., *Nature Materials* (2016), DOI: `10.1038/nmat4593`
* Boulle et al., *Nature Nanotechnology* (2016), DOI: `10.1038/nnano.2015.315`

**Advantages:**

* Simpler than `Ir/Fe/Co/Pt`.
* Extensively studied on standard substrates.
* Compatible with Hall-style electrical characterization.

**Disadvantages:**

* Smaller optimization space than the full `Ir/Fe/Co/Pt` family.
* Some operating regimes remain field-history sensitive.

**Compatibility with HELIOS-3D:**

* Excellent for a minimum viable MCA demonstrator.

**Assessment:**

* Best low-complexity first-build option.

### 3.3 `GdFeCo` Ferrimagnetic Films

**Supporting study:**

* Woo et al., *Nature Communications* (2018), DOI: `10.1038/s41467-018-03378-7`

**Advantages:**

* Strong empirical evidence for suppressing the skyrmion Hall effect.
* Better candidate if rectilinear transport is more important than ultimate material novelty.
* Entirely compatible with sputtered-film processing.

**Disadvantages:**

* Compensation-point engineering adds process complexity.
* Rare-earth composition control is not trivial.

**Compatibility with HELIOS-3D:**

* Especially attractive for MCA routing and drift control.

**Assessment:**

* Best transport-focused pivot.

### 3.4 `Pt/Co/Gd` and Related Ferrimagnetic Multilayers

**Supporting basis:**

* Recent ferrimagnetic skyrmion reports in Pt/Co/Gd-like stacks.

**Advantages:**

* Retains ferrimagnetic transport benefits with conventional fabrication flows.
* PMA and effective DMI remain tunable through interface engineering.

**Disadvantages:**

* Less mature than `Ir/Fe/Co/Pt` as a benchmark system.

**Compatibility with HELIOS-3D:**

* Strong option if the project wants ferrimagnetic transport but a different engineering tradeoff from `GdFeCo`.

**Assessment:**

* Strong secondary option.

### 3.5 Co-Doped `Fe5GeTe2`

**Supporting study:**

* Room-temperature skyrmion lattice in Co-doped `Fe5GeTe2`, *Science Advances* (2022), DOI: `10.1126/sciadv.abm7103`

**Advantages:**

* Preserves the layered-metal spirit of the current repository.
* Stronger direct skyrmion evidence than the present `Fe3GaTe2` record.

**Disadvantages:**

* Does not eliminate the fabrication blocker that affects vdW materials on 3D polymer hosts.

**Compatibility with HELIOS-3D:**

* Scientifically closer to the current hypothesis than metallic multilayers.

**Assessment:**

* Better science-risk profile than `Fe3GaTe2`, but only modestly better manufacturing risk.

### 3.6 Mn-Based Heuslers such as `Mn3Ga`

**Supporting review:**

* Hirohata et al., *Materials* (2018), DOI: `10.3390/ma11010105`

**Advantages:**

* High PMA, strong spintronic device ecosystem, MTJ compatibility.
* More fab-compatible than vdW magnets.

**Disadvantages:**

* The skyrmion evidence base is weaker than for multilayer DMI systems.
* May force the project toward domain-wall or bubble carriers rather than strict skyrmion logic.

**Compatibility with HELIOS-3D:**

* Preserves the broad architecture but may alter the exact carrier model.

**Assessment:**

* Robust fallback if manufacturability becomes dominant over carrier novelty.

### 3.7 Compensated Ferrimagnets and Altermagnets

**Supporting studies:**

* Lee et al., *Spin Current Generation Controlled by the N\'{e}el State in a Compensated Ferrimagnet* (arXiv:2507.05618, 2025/2026)
* Liu et al., *Current-driven nonlinear skyrmion dynamics in altermagnets* (arXiv:2601.13499, 2026)

**Advantages:**

* Compensated ferrimagnets provide a magnetization-free readout route via Néel-state-controlled spin pumping.
* Altermagnets preserve strong spin dynamics without the stray-field burden of conventional ferromagnets.
* Together they form the strongest late-stage candidate family for transport and readout once planar demonstrators are validated.

**Disadvantages:**

* Compensation-point tuning and current-density windows still need process validation.
* These materials do not remove the need for planar fabrication discipline in early prototypes.

**Compatibility with HELIOS-3D:**

* Strong late-stage candidate for the MCA transport layer and any spin-pumping-based sensing path.

**Assessment:**

* Best long-range material family currently visible for a magnetization-free transport/readout branch.

## 4. Candidate Fabrication Methods

### 4.1 Planar-First Deposition, Then Transfer or Stacking

**Concept:**

Deposit magnetic stacks on flat substrates or membranes where the literature support is strongest, then transfer them onto intermediate structures or vertically stack them to recover density.

**Advantages:**

* Removes the unsupported assumption that vdW or multilayer magnetism must be established directly on a freeform polymer host.
* Allows magnetic, transport, and readout physics to be validated independently before volumetric integration.

**Disadvantages:**

* Introduces transfer alignment and yield as new engineering risks.

**Assessment:**

* Best fabrication pivot because it directly attacks the largest current uncertainty.

### 4.2 Nanoimprint Lithography Plus Blanket Sputter/Etch

**Supporting studies:**

* Chou et al., *Applied Physics Letters* (1995), DOI: `10.1063/1.114851`
* Chou et al., *Science* (1996), DOI: `10.1126/science.272.5258.85`

**Concept:**

Use planar nanopatterning to define tracks, reservoirs, Hall crosses, and sensor regions, then deposit and pattern the magnetic stack conventionally.

**Advantages:**

* Much more realistic than the current `DISH -> TPP -> ALD` pipeline for a first prototype.
* High throughput and wafer-scale patterning are plausible.

**Disadvantages:**

* Gives up arbitrary freeform 3D geometries in early phases.

**Assessment:**

* Best route to a credible first demonstrator.

### 4.3 Direct Laser Writing Only for Passive Structures

**Concept:**

Retain TPP or related writing methods only for passive microfluidic, confinement, packaging, or photonic structures while keeping the magnetic layers planar.

**Advantages:**

* Preserves part of the current HELIOS fabrication identity without forcing magnetic deposition onto a poorly supported substrate.

**Disadvantages:**

* Reduces the rhetorical simplicity of a single monolithic 3D fabrication story.

**Assessment:**

* Strong compromise path.

## 5. Candidate Readout and Control Methods

### 5.1 Hall-Based Electrical Readout

**Methods:** anomalous Hall effect (AHE), topological Hall effect (THE), standard Hall crosses.

**Advantages:**

* Low-overhead compared with microwave spectroscopy.
* Already common in skyrmion and multilayer characterization.
* Readily multiplexed and integrated with electronics.

**Disadvantages:**

* Signal amplitude can be small and geometry-dependent.

**Assessment:**

* Best early sensing path for MCA experiments.

### 5.2 TMR / MTJ Sensors

**Advantages:**

* Stronger electrical contrast than Hall-only sensing in many device settings.
* Compatible with memory-style readout infrastructure.

**Disadvantages:**

* Requires careful sensor placement and multilayer integration.

**Assessment:**

* Best route if the project needs more robust binary or multistate readout.

### 5.3 SOT and VCMA Control

**Advantages:**

* Both are already embedded in modern spintronic device literature.
* Strong alignment with low-latency electrical control.

**Disadvantages:**

* Stack engineering and gate integration can become nontrivial.

**Assessment:**

* Strong control-layer candidates for both MCA and later BRC experiments.

### 5.4 Microwave Spectroscopy

**Advantages:**

* Strong physics basis for probing skyrmion resonance modes.

**Disadvantages:**

* RF shielding, conversion overhead, and signal-chain complexity may negate the very energy benefits the architecture seeks to claim.

**Assessment:**

* Valid as a characterization tool. Weak as a first system architecture assumption.

## 6. Comparative Decision Matrix

| Option | Carrier Validity | Manufacturability | Transport Quality | Readout Compatibility | Architectural Continuity | Rank |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `Ir/Fe/Co/Pt` + planar-first + electrical readout | High | High | Medium | High | High | **1** |
| `Ir/Co/Pt` + planar-first + electrical readout | High | High | Medium | High | High | **2** |
| `GdFeCo` + planar-first + electrical readout | High | High | High | High | High | **3** |
| `Pt/Co/Gd` ferrimagnet branch | Medium | High | High | High | High | **4** |
| Co-doped `Fe5GeTe2` with layered integration | Medium | Medium | Medium | Medium | High | **5** |
| `Fe3GaTe2` on freeform 3D scaffold with microwave-first readout | Low | Low | Unknown | Low | High | **6** |

## 6.1 Readout Integration: hBN $V_B^-$ and Microwave Spectroscopy vs. Diamond NV Centers

HELIOS-3D formally shifts the primary readout strategy from Diamond NV centers to negatively charged boron vacancies ($V_B^-$) in hBN or direct Microwave Spectroscopy. This solves the $1/r^3$ distance-decay problem associated with NV centers and ensures compatibility with silicon bus architectures.

A critical architectural decision for the HELIOS-3D readout chain involves the choice of quantum sensor for detecting magnetic hopfion and skyrmion textures. The original hypothesis proposed diamond NV centers; the following analysis recommends a pivot to monolayer hexagonal boron nitride (hBN) with negatively charged boron vacancies ($V_B^-$).

### 6.1.1 Distance-Decay Problem with NV Centers

Diamond NV centers offer excellent spin coherence at room temperature, but suffer from a fundamental sensing geometry constraint:

*   **$1/r^3$ Falloff:** The magnetic dipole-dipole interaction between the NV center and a magnetic texture scales as $1/r^3$, where $r$ is the separation distance.
*   **Optimal Distance:** For reliable detection of skyrmion core fields ($B_z \sim 10-100$ mT), the NV center must be within $\sim 10-20$ nm of the magnetic texture surface.
*   **Integration Challenge:** Achieving this proximity in a 3D stacked geometry while maintaining fabrication yield is non-trivial.

### 6.1.2 hBN $V_B^-$ as Alternative

Monolayer hBN with boron vacancies ($V_B^-$) offers a van der Waals-compatible alternative:

| Criterion | Diamond NV Centers | hBN $V_B^-$ |
| :--- | :--- | :--- |
| **vdW Compatibility** | Requires diamond membrane fabrication; incompatible with standard 2D transfer | Native 2D material; seamless vdW stacking |
| **Integration with $Fe_3GaTe_2$** | Requires epitaxial diamond growth on magnetic layers | Direct dry-transfer onto $Fe_3GaTe_2$ surface |
| **Sensing Geometry** | Fixed NV orientation in diamond lattice | Arbitrary in-plane orientation via transfer |
| **Spectral Range** | Zero-field splitting $D \approx 2.87$ GHz | $D \approx 1.4$ GHz (lower frequency, easier detection) |
| **Demonstrated RT Operation** | Yes (extensive literature) | Emerging but validated (e.g., Gottscholf et al., *Science* 2023) |

### 6.1.3 Recommended Integration Path

1.  **Primary:** Monolayer hBN transferred onto the surface of the magnetic layer stack (either $Ir/Fe/Co/Pt$ for planar-first or $Fe_3GaTe_2$ for advanced nodes).
2.  **Sensing:** Optically detected magnetic resonance (ODMR) via confocal microscopy or wide-field imaging.
3.  **Alternative:** If optical access is limited, consider electrical readout via tunneling magnetoresistance (TMR) as a fallback per Section 5.2.

### 6.1.4 hBN-$Fe_3GaTe_2$ Interface Considerations

*   **Fermi Level Alignment:** The $V_B^-$ charge state is stabilized by nearby charge traps; care must be taken during hBN transfer to avoid contamination that shifts the defect levels.
*   **Magnetic Proximity Effect:** $Fe_3GaTe_2$ has high spin polarization; the hBN layer may experience magnetic proximity-induced splitting. This can be either a feature (enhancing sensitivity) or a noise source (introducing field variability).
*   **Temperature Operating Range:** $V_B^-$ in hBN retains spin coherence up to $\sim 400$ K, comfortably covering data center operating temperatures ($T < 85^\circ C$).

## 7. Recommended Minimum Viable Demonstrator Revision

The current MVD sequence in `OPEN_QUESTIONS.md` should be interpreted more conservatively.

### Revised Phase I

* Fabricate planar skyrmion or ferrimagnetic tracks on a conventional substrate.
* Validate carrier stability and electrical readout.

### Revised Phase II

* Demonstrate deterministic MCA-style transport and state switching under current control.
* Use Hall or MTJ readout rather than a microwave-first chain.

### Revised Phase III

* Implement confined stochastic dynamics in a planar or membrane-based reservoir.
* Establish whether the ensemble actually performs useful nonlinear transformations rather than merely exhibiting noise.

### Revised Phase IV

* Add vertical integration via transfer, membrane stacking, or wafer-bonded assembly.
* Delay any freeform 3D magnetic coating claim until the flat-stack physics is secure.

## 8. Final Position

The strongest defensible version of HELIOS-3D is not a direct 3D-vdW fabrication jump. It is a staged program:

1. Prove the spin-texture logic on planar or membrane-compatible multilayers.
2. Replace microwave-first assumptions with electrical sensing and control.
3. Earn 3D density through stacking, transfer, or bonded integration.
4. Keep $Fe_3GaTe_2$ as a long-range candidate, not as the immediate fabrication anchor.

That revision preserves the project's scientific ambition while removing the least-supported integration claims from the critical path.
