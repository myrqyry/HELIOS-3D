# HELIOS-3D Project Issues

This file documents the current milestone issues for **Phase 1: Simulation**. These issues can be imported into your local `gh` issue tracker or created manually on GitHub.

To automatically create these issues on your GitHub repository using the GitHub CLI (`gh`), run:
```bash
bash scripts/create_issues.sh
```

---

## Issue #1: Phase 1.1 - Micromagnetic SAF Model
- **Title:** `Phase 1.1: MuMax3 SAF model`
- **Milestone:** `Phase 1 - Simulation`
- **Labels:** `simulation`, `physics-validation`
- **Description:**
  ```markdown
  Develop MuMax3 micromagnetic simulation scripts to model magnetization dynamics in the Synthetic Antiferromagnet (SAF) stack.
  
  ### Objectives:
  - Validate the Dzyaloshinskii-Moriya Interaction (DMI) strength parameter ($D > 1.5$ mJ/m²).
  - Confirm stabilization of zero-field or low-bias topological spin configurations in simulation.
  
  ### Expected Deliverable:
  - An executable `.mx3` file in the `simulations/` directory with standardized parameters matching the Katmis et al. (2025) trilayer.
  ```

---

## Issue #2: Phase 1.1 - OOMMF Nucleation Threshold
- **Title:** `Phase 1.1: OOMMF nucleation threshold`
- **Milestone:** `Phase 1 - Simulation`
- **Labels:** `simulation`, `physics-validation`
- **Description:**
  ```markdown
  Develop OOMMF configuration files to determine the energy barrier and field threshold for skyrmion/hopfion nucleation.
  
  ### Objectives:
  - Identify the minimum external magnetic field ($B_{nuc} < 50$ mT) required for localized nucleation.
  - Model local Spin-Orbit Torque (SOT) injection lines to map current-induced switching thresholds.
  
  ### Expected Deliverable:
  - An executable `.mif` configuration template under `simulations/` with validation criteria.
  ```

---

## Issue #3: Phase 1.2 - Brownian Reservoir MNIST Baseline
- **Title:** `Phase 1.2: Brownian reservoir MNIST baseline`
- **Milestone:** `Phase 1 - Simulation`
- **Labels:** `compiler`, `software-validation`
- **Description:**
  ```markdown
  Integrate a stochastic skyrmion/hopfion dynamics simulator into the reservoir computing compilation pipeline.
  
  ### Objectives:
  - Implement a Python-based Brownian motion model matching experimental diffusion rates from literature.
  - Run the handwritten digit classification benchmark (MNIST) on the simulated reservoir.
  - Target an initial baseline classification accuracy of $>85\%$ on the test set.
  
  ### Expected Deliverable:
  - A Jupyter Notebook or Python module in the `compiler/` or `analysis/` directory that outputs classification metrics.
  ```

---

## Issue #4: Phase 1.3 - Ensemble Noise Averaging
- **Title:** `Phase 1.3: ensemble noise averaging`
- **Milestone:** `Phase 1 - Simulation`
- **Labels:** `compiler`, `simulation`
- **Description:**
  ```markdown
  Model spatial multiplexing and ensemble averaging across multiple independent reservoirs to mitigate thermal noise sensitivity.
  
  ### Objectives:
  - Simulate parallel BRC cores under variable thermal gradients.
  - Demonstrate a simulated temperature tolerance of $\pm 0.3$ K without accuracy degradation.
  
  ### Expected Deliverable:
  - Python scripts validating noise averaging algorithms under statistical temperature distributions.
  ```
