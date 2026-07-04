# Research Module 7: TOHE-Based Electrical Detector Spec

## 🎯 Objective
To develop a high-sensitivity **Topological Orbital Hall Effect (TOHE)** detector for the unambiguous all-electrical readout of 3D magnetic hopfions. This module leverages the 3D orbital Hall hallmark (Göbel & Lounis, 2025/2026) to bypass the data-processing overhead of optical imaging and the signal chain complexity of microwave spectroscopy.

---

## 🏗️ Physics: The Orbital Hallmark

### 1. Emergent 3D Electromagnetic Field
*   **Mechanism:** When an electric current passes through a hopfion-hosting substrate, the hopfion's complex 3D spin texture acts as an **emergent electromagnetic field** in both real and momentum space.
*   **Deflection:** Unlike 2D skyrmions, which primarily exhibit in-plane deflection (Topological Hall Effect), hopfions generate a **3D orbital angular momentum (OAM) current**.

### 2. Topological Sensitivity (3D Tensor Mapping)
*   **The Signal:** The TOHE tensor response is uniquely tied to the **Hopf Index ($Q_H$)**.
*   **Discrimination:** Unlike 2D THE, the 3D hopfion generates vertical orbital current components:
    *   **$\sigma_{xz}^{L_y}$:** $x$-field $\rightarrow$ $z$-current of $L_y$ (Vertical Hallmark).
    *   **$\sigma_{yz}^{L_x}$:** $y$-field $\rightarrow$ $z$-current of $L_x$ (Vertical Hallmark).
*   **Significance:** These vertical hallmarks are the definitive **3D electronic signature** of a knotted magnetic soliton.

---

## 🏗️ Hardware Architecture: The TOHE Bridge

### 1. The Detector Geometry
*   **Structure:** A **4-terminal Hall Bridge** patterned directly into the Phase 1 $EuS/Bi_2Se_3/EuS$ trilayer.
*   **Contacts:** Crystalline light metal (e.g., epitaxial Mn) or low-resistance heavy metal (Pt or Ta) electrodes to maximize orbital-to-charge conversion via the Inverse Spin Hall Effect (ISHE) or Inverse Orbital Hall Effect (IOHE). 
*   **Disorder Control:** Based on ETH Zurich findings (Kang et al., 2026), the Mn contact layers must be deposited as highly crystalline, epitaxial films (grown via MBE or cyclic thinned) rather than amorphous sputtered phases. This prevents grain-boundary-induced orbital relaxation and preserves the OHC. `[PROPOSED]`


### 2. Multi-Axis Measurement
*   **Transverse Voltage ($V_{yx}$):** Detects the in-plane topological signature.
*   **Vertical Gradient ($\partial V / \partial z$):** In the 3D stack, we measure the potential difference between capping and seed layers to isolate the 3D orbital component.

---

## 🧪 Validation & Success Metrics

### Metric 7.1: Signal-to-Noise Ratio (SNR)
*   **Simulation Script:** `simulations/tohe_trilayer_readout.mx3`
*   **Test:** Measure the Hall voltage step during a single hopfion nucleation event in the $EuS/Bi_2Se_3/EuS$ stack.
*   **Parameters:** Induce $M_{sat} \approx 37.6 \text{ kA/m}$ and $\theta_{SH} \approx 0.43$ (Katmis et al., 2026 baseline).
*   **Goal:** SNR $> 10$ at room temperature (300 K).

### Metric 7.2: Topological Discrimination Fidelity
*   **Test:** Sweep the DISH write fluence to create different Hopf numbers ($Q_H=1$ vs $Q_H=2$).
*   **Goal:** Unambiguous separation of voltage peaks associated with each integer state.

---

## 📅 Roadmap to Readout
1.  **Q1 2027:** Execute MuMax3-based transport simulations to map the TOHE tensor for the $EuS/Bi_2Se_3/EuS$ trilayer.
2.  **Q2 2027:** Design the lithography mask for the first **4-terminal TOHE Hall Bridge**.
3.  **Q4 2027:** Demonstrate single-hopfion electrical detection in a Planar-First demonstrator.
