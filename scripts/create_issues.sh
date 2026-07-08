#!/bin/bash
# Script to create Phase 1 milestone issues on GitHub via gh CLI

if ! command -v gh &> /dev/null; then
    echo "Error: GitHub CLI (gh) is not installed."
    exit 1
fi

echo "Checking authentication status..."
if ! gh auth status &> /dev/null; then
    echo "Error: You are not authenticated with GitHub CLI. Please run 'gh auth login' first."
    exit 1
fi

echo "Creating issues for Phase 1 - Simulation..."

gh issue create \
  --title "Phase 1.1: MuMax3 SAF model" \
  --label "simulation,physics-validation" \
  --body "Develop MuMax3 micromagnetic simulation scripts to model magnetization dynamics in the Synthetic Antiferromagnet (SAF) stack.

### Objectives:
- Validate the Dzyaloshinskii-Moriya Interaction (DMI) strength parameter (\$D > 1.5\$ mJ/m²).
- Confirm stabilization of zero-field or low-bias topological spin configurations in simulation.

### Expected Deliverable:
- An executable \`.mx3\` file in the \`simulations/\` directory with standardized parameters matching the Katmis et al. (2025) trilayer."

gh issue create \
  --title "Phase 1.1: OOMMF nucleation threshold" \
  --label "simulation,physics-validation" \
  --body "Develop OOMMF configuration files to determine the energy barrier and field threshold for skyrmion/hopfion nucleation.

### Objectives:
- Identify the minimum external magnetic field (\$B_{nuc} < 50\$ mT) required for localized nucleation.
- Model local Spin-Orbit Torque (SOT) injection lines to map current-induced switching thresholds.

### Expected Deliverable:
- An executable \`.mif\` configuration template under \`simulations/\` with validation criteria."

gh issue create \
  --title "Phase 1.2: Brownian reservoir MNIST baseline" \
  --label "compiler,software-validation" \
  --body "Integrate a stochastic skyrmion/hopfion dynamics simulator into the reservoir computing compilation pipeline.

### Objectives:
- Implement a Python-based Brownian motion model matching experimental diffusion rates from literature.
- Run the handwritten digit classification benchmark (MNIST) on the simulated reservoir.
- Target an initial baseline classification accuracy of \$>85\%\$ on the test set.

### Expected Deliverable:
- A Jupyter Notebook or Python module in the \`compiler/\` or \`analysis/\` directory that outputs classification metrics."

gh issue create \
  --title "Phase 1.3: ensemble noise averaging" \
  --label "compiler,simulation" \
  --body "Model spatial multiplexing and ensemble averaging across multiple independent reservoirs to mitigate thermal noise sensitivity.

### Objectives:
- Simulate parallel BRC cores under variable thermal gradients.
- Demonstrate a simulated temperature tolerance of \$\pm 0.3\$ K without accuracy degradation.

### Expected Deliverable:
- Python scripts validating noise averaging algorithms under statistical temperature distributions."

echo "Issues successfully proposed! Check your GitHub repository."
