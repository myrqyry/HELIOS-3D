# 📊 HELIOS-3D Simulation Benchmarks

> ⚠️ **Staging Note:** Tasks 1 and 3 reference Fe3GaTe2 and FMR-based readout, which are **long-range branch targets**.
> The current baseline demonstrator uses Ir/Fe/Co/Pt or GdFeCo multilayers with electrical (Hall/TMR) readout.
> See `ALTERNATIVE_MATERIALS_AND_METHODS.md` for the minimum credible path.
> Contributors targeting the near-term baseline should adapt these tasks to the planar multilayer stack.

To systematically advance the state of the art and invite global scientific collaboration, the HELIOS-3D project defines a core set of "Challenge Tasks." These benchmarks represent critical operational milestones that must be verified through rigorous micromagnetic simulations (using tools like MuMax3, OOMMF, or MagneX) before physical fabrication can begin.

Contributors are encouraged to submit configuration files and simulation results that successfully achieve these benchmarks.

---

## 🎯 Task 0: Planar Skyrmion Nucleation and Hall Transport

**Objective:** Demonstrate stable skyrmion nucleation and transport in a baseline planar stack, which is the immediate pre-requisite for Phase I demonstrators.

*   **Initial State:** A uniform ferromagnetic state in an $Ir/Fe/Co/Pt$ multilayer system with Dzyaloshinskii-Moriya Interaction (DMI).
*   **Stimulus:** Localized current pulse or magnetic field variation to nucleate the skyrmion, followed by an in-plane driving current.
*   **Success Criteria:**
    1.  Successful nucleation of a skyrmion with $Q=1$ at fields $B_{\text{nuc}} < 50$ mT.
    2.  Stable transport under current without annihilation at track boundaries.
    3.  Clear signature in simulated Hall resistance for electrical readout.

---

## 🎯 Task 1: The $H=2$ Splitting Event (Logic Gate Equivalent)

> [!WARNING]
> STATUS: PLACEHOLDER — NOT RUNNABLE. Implementation pending.

**Objective:** Demonstrate the controlled division of a higher-order hopfion into two stable fundamental hopfions. This represents a foundational logical operation, akin to a binary division or a controlled "NOT" gate depending on the routing.

*   **Initial State:** A single hopfion with a Hopf index of $H=2$ stabilized in the $Fe_3GaTe_2$ active layer.
*   **Stimulus:** Application of a specific Spin-Orbit Torque (SOT) pulse or a localized thermal gradient designed to destabilize the $H=2$ state.
*   **Success Criteria:**
    1.  The $H=2$ hopfion cleanly splits into two distinct, stable hopfions, each with $H=1$.
    2.  The topological charge must be conserved throughout the event.
    3.  The process must occur without the intermediate formation of a Bloch point singularity that annihilates the topological structure entirely.

---

## 🎯 Task 2: Rectilinear Transport in a SAF Stack (Immunity to SkHE)

**Objective:** Verify that 3D hopfions can move at high velocities parallel to an applied current without transverse drift, proving immunity to the Skyrmion Hall Effect (SkHE).

*   **Initial State:** An $H=1$ hopfion initialized in a Synthetic Antiferromagnetic (SAF) multilayer structure (e.g., $Co/Ru/Co$), designed to have a net topological charge of zero ($Q_{\text{net}} = 0$).
*   **Stimulus:** Application of an in-plane driving spin current.
*   **Success Criteria:**
    1.  The hopfion must move precisely parallel to the direction of the applied current.
    2.  The measured Skyrmion Hall angle ($\theta_{\text{SkHE}}$) must be strictly $0^\circ$.
    3.  The hopfion must maintain structural integrity at velocities exceeding 100 m/s.

---

## 🎯 Task 3: Sub-GHz Sensing via FMR (The "Read" Pillar)

**Objective:** Simulate the reliable detection of a hopfion's presence and topological state using Ferromagnetic Resonance (FMR), representing a low-latency, non-optical readout mechanism.

*   **Initial State:** An $H=1$ hopfion stabilized in the substrate.
*   **Stimulus:** Application of a weak, uniform RF magnetic field pulse to excite the system's dynamic modes.
*   **Success Criteria:**
    1.  The simulation must isolate and identify the characteristic "breathing mode" frequency of the hopfion (typically in the sub-GHz regime).
    2.  The resonant frequency must be clearly distinguishable from the uniform FMR mode of the background ferromagnetic state.
    3.  *(Bonus)* Demonstrate that an $H=2$ hopfion exhibits a distinct breathing mode frequency compared to an $H=1$ hopfion, proving multi-state readout capability.
