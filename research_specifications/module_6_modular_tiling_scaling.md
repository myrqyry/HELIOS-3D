# Research Module 6: Modular Tiling & Volumetric Scaling

## 🎯 Objective
To overcome the centimeter-scale build volume limits of DISH (Digital Incoherent Synthesis of Holographic light fields) by implementing a **Modular Tiling** workflow. This module defines the geometric interfaces, alignment protocols, and "welding" mechanisms required to assemble millimeter-scale topological tiles into large-scale 3D spintronic coprocessor arrays.

---

## 🏗️ The Modular Tiling Workflow

### 1. High-Throughput Tile Fabrication (Micro-fluidic DISH)
*   **Mechanism:** Direct integration of the DISH optical system with a micro-fluidic channel.
*   **Process:** A programmable pump cycles low-viscosity resin (4.7 cP) through the build volume. Millimeter-scale functional tiles (e.g., 7.3 x 7.3 x 10 mm) are printed in sub-second bursts (0.6s) and shifted downstream.
*   **Output:** A batch of identical or diverse "Topological Tiles" ready for assembly.

### 2. Geometric Interlocking (Y-zipper Interfaces)
*   **Design:** Each tile features 3D-printed interlocking features on its lateral and vertical faces.
*   **Mechanism:** Inspired by the **Y-zipper** (Li et al., 2026), these three-sided strips provide mechanical alignment and temporary structural stability during the assembly phase.
*   **Precision:** Geometric mechanical interlocking features provide coarse alignment (tens of microns).

### 3. Interface "Welding" (Overprinting & Cross-linking)
*   **Mechanism:** The assembly is performed within a secondary resin vat. 
*   **Process:** Once coarse alignment is achieved, a final "welding" holographic dose is projected onto the tile interfaces.
*   **Bonding:** This triggers **chemical cross-linking** across the boundary, creating a monolithic polymer scaffold with structural integrity exceeding mechanical assembly.

---

## 🔬 Sub-Micron Alignment Protocols

### 1. Optical Index Matching
*   **Problem:** Mismatched refractive indices between cured tiles and raw resin can cause beam deviation and blurring at the interface.
*   **Solution:** Use **Real-time Refractive Index Matching** resins. Adjust the resin formulation or temperature to match the $n_d$ of the cured scaffold, allowing the "welding" light field to pass through previous structures without distortion.

### 2. Digital Alignment Markers
*   **Mechanism:** Integrated diffraction gratings or fluorescent markers printed into the corners of each tile.
*   **Feedback:** The DISH periscope system performs a low-power "alignment scan" before the welding dose, using the markers to compute the precise $(x,y,z, \theta)$ offset.

---

## 🧪 Validation & Success Metrics

### Metric 6.1: Interfacial Shear Strength
*   **Test:** Tensile/Shear testing of "welded" tile pairs.
*   **Goal:** Interface strength $> 90\%$ of bulk material strength.

### Metric 6.2: Spintronic Continuity (Simulated)
*   **Simulation Script:** `simulations/modular_interface_sweep.mx3`
*   **Test:** Model the magnetic exchange coupling across a "welded" interface ($A_{inter} = 0.5 A_{ex}$) with a 100nm lateral offset.
*   **Goal:** Maintain $> 80\%$ topological charge transfer efficiency across the boundary.
*   **Safe-Zipping Window (Identified):**
    *   **Threshold Current ($J_{min}$):** $\sim 1 \times 10^{11} A/m^2$. Below this, the hopfion ring is statically pinned by the 100nm potential step.
    *   **Fragmentation Limit ($J_{max}$):** $\sim 5 \times 10^{11} A/m^2$. Above this, the SOT driving force exceeds the reduced interfacial exchange "glue," causing the 3D knot to shear into disjointed skyrmion strings.
*   **Interfacial Loss Tolerance:** Transfer remains robust as long as $A_{inter} > 0.3 A_{ex}$. Below this threshold, the hopfion unknots into a trivial state upon contact with the seam.

---

## 📅 Roadmap to Scaling
1.  **Q1 2027:** Demonstrate sub-second printing of a 2x2 grid of "alignment-test" tiles.
2.  **Q2 2027:** Execute first "holographic weld" using index-matched resins.
3.  **Q4 2027:** Assemble a 100-tile "Macro-Scaffold" for a Phase 3 demonstrator.
