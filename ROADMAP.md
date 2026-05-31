# HELIOS-3D Roadmap

## Phase 0 – Documentation (Current ✅)
- [x] Core architecture specification
- [x] Physics & materials literature review
- [x] Fabrication pipeline design
- [x] Benchmark projections

## Phase 1 – Simulation (Next 🔜)

### 1.1 Micromagnetic Simulation
- [ ] **MuMax3** scripts for SAF stack gradient modeling (KPI: Validate DMI strength $D > 1.5$ mJ/m²)
- [ ] OOMMF configuration for skyrmion nucleation energy (KPI: Identify minimum field $B_{nuc} < 50$ mT)
- [ ] Hopfion stability analysis in cylindrical confinement (KPI: Demonstrate isolated hopfion stability at 300K in simulation by Q3 2026)

### 1.2 BRC Reservoir Modeling
- [ ] Python/NumPy stochastic skyrmion dynamics simulator (KPI: Match experimental Brownian motion data from literature)
- [ ] Reservoir computing benchmark (KPI: Achieve >85% handwritten digit classification on MNIST)

### 1.3 ERC Ensemble Averaging
- [ ] Multi-reservoir noise averaging model (KPI: Demonstrate $\pm 0.3$ K temperature tolerance via simulation)

**Phase 1 Completion Target:** Q3 2026

## Phase 2 – Firmware Prototype

### 2.1 Topological Compiler
- [ ] Gemma 3 4B semantic-to-topological compiler in Python (KPI: Map 512-dim embedding to <10 hopfion coordinates)
- [ ] PDEBench-based Fourier Neural Operator (FNO) for 3D magnetization synthesis (KPI: <1% Relative $L_2$ error)
- [ ] Gradient-based Inverse Design loop for DISH optical prescription (KPI: <0.21 nJ energy-per-write)
- [ ] LLG simulation verification loop (KPI: <5% topological error rate)

### 2.2 Bifurcated Readout Driver
- [ ] FPGA-based Hall sensor readout (KPI: <100 ns latency)
- [ ] hBN ODMR control firmware (KPI: Single-shot readout fidelity >90%)
- [ ] Topological Orbital Hall Effect (TOHE) detector spec (KPI: SNR > 10 in 4-terminal bridge simulation)

**Phase 2 Completion Target:** Q1 2027

## Phase 3 – Physical Fabrication

### 3.1 Planar-First Demonstrator
- [ ] EuS/Bi2Se3/EuS trilayer deposition on Si substrate (KPI: Room-temperature zero-field hopfions confirmed via LTEM)
- [ ] Mn3Sn octupole switching on Si/SiO2 (KPI: Deterministic 40-ps switching at < 2 pJ/µm²)
- [ ] SOT domain wall transport in 5 $\mu m$ tracks (KPI: Velocity >100 m/s at $J = 10^{12}$ A/m²)

### 3.2 Integration Path
- [x] DISH scaffold fabrication (KPI: 19 $\mu m$ resolution demonstrated in 0.6s, Nature 2026)
- [ ] TPP refinement (KPI: Sub-100 nm features inside DISH scaffold)
- [ ] Laser-assisted magnetic stack transfer (KPI: >80% yield on 1 cm² area)

**Phase 3 Completion Target:** Q4 2027

---

## Quantitative KPI Summary

| Phase | Milestone | KPI | Target Date |
| :--- | :--- | :--- | :--- |
| 1.1 | MuMax3 SAF model | $D$ validation | Q2 2026 |
| 1.1 | OOMMF nucleation | $B_{nuc}$ threshold | Q2 2026 |
| 1.1 | Hopfion stability | $Q_H$ stability | Q3 2026 |
| 1.2 | BRC MNIST benchmark | Accuracy | Q3 2026 |
| 1.3 | ERC temperature tolerance | $\Delta T$ | Q3 2026 |
| 2.1 | Topological compiler | Embedding mapping | Q4 2026 |
| 2.2 | Readout driver | Latency | Q1 2027 |
| 3.1 | Planar skyrmions | MFM confirmation | Q2 2027 |
| 3.1 | SOT transport | Velocity | Q3 2027 |
| 3.2 | Full integration | Yield | Q4 2027 |
