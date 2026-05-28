# HELIOS-3D Glossary

This glossary bridges terminology across topological physics, spintronic device engineering, and machine learning (Reservoir Computing) to ensure cross-domain comprehension.

---

## A–F

### AHE (Anomalous Hall Effect)
A geometric contribution to the Hall effect arising from Berry curvature in ferromagnetic materials. Used in HELIOS-3D for electrical readout of skyrmion/hopfion positions. `[DEMONSTRATED]`

### Berry Curvature
A geometric property of a material's electronic band structure that acts as an effective magnetic field in momentum space. Responsible for the Anomalous Hall Effect and topological Hall Effect. Key to $Fe_3GaTe_2$'s magnetic properties.

### BRC (Brownian Reservoir Computing)
HELIOS-3D's proposed probabilistic computing core that utilizes ambient thermal noise (Brownian motion) to drive skyrmion dynamics in confined geometries, performing non-linear transformations on input signals. `[PROPOSED]`

### DMI (Dzyaloshinskii-Moriya Interaction)
An antisymmetric exchange interaction in non-centrosymmetric crystals that favors chiral spin twists. The foundational energy term enabling skyrmion and hopfion formation. For computer scientists: this is the fundamental physical mechanism that makes the stable creation of topological bits (skyrmions/hopfions) possible. `[DEMONSTRATED]`

### DISH (Digital Incoherent Synthesis of Holographic light fields)
A volumetric 3D printing technique using holographic projection to cure photoresin in milliseconds. Proposed in HELIOS-3D for creating macro-scale scaffolds. `[DEMONSTRATED]`

### ERC (Ensemble Reservoir Computing)
A spatial multiplexing strategy where thousands of independent reservoirs operate in parallel to average out systemic noise and improve classification accuracy. Target: $\sim 98\%$ accuracy. For physicists: this is a method of harnessing non-linear dynamical systems (in this case, Brownian motion of hopfions) as a substrate for computation, effectively turning thermal fluctuations into a computational resource. `[PROPOSED]`

---

## H–M

### hBN (Hexagonal Boron Nitride)
A 2D van der Waals material. In HELIOS-3D, monolayer hBN with negatively charged boron vacancies ($V_B^-$) is proposed as a quantum sensor for magnetic texture readout, replacing diamond NV centers. `[INFERRED]`

### IFE (Inverse Faraday Effect)
A non-linear magneto-optical effect where circularly polarized light induces a static magnetization. In HELIOS-3D, IFE is the primary mechanism for all-optical "writing" of topological textures. `[DEMONSTRATED]`

### Inverse Design
A design methodology that starts with a target performance (e.g., a specific hopfion configuration) and works backward to find the optimal parameters (e.g., DISH holographic prescription). `[PROPOSED]`

### Hopfion
A 3D topological magnetic soliton—a knot in the magnetization field characterized by the Hopf invariant $Q_H$. Unlike skyrmions, hopfions project to zero net topological charge in 2D, theoretically avoiding the Skyrmion Hall Effect. `[INFERRED]`

### LLG (Landau-Lifshitz-Gilbert)
The continuum equation describing magnetization dynamics. Used in micromagnetic simulations (MuMax3, OOMMF) to model skyrmion and hopfion motion.

### MCA (Magnetic Convolutional Accelerator)
HELIOS-3D's proposed deterministic, non-volatile Compute-in-Memory (CiM) architecture using spin-orbit torque (SOT) to drive domain walls for arithmetic operations. `[PROPOSED]`

### MTJ (Magnetic Tunnel Junction)
A device with two ferromagnetic layers separated by an insulating barrier. Exhibits Tunneling Magnetoresistance (TMR). Used for electrical readout in spintronic devices. `[DEMONSTRATED]`

---

## P–S

### PMA (Perpendicular Magnetic Anisotropy)
Magnetic anisotropy with the easy axis perpendicular to the film plane. Essential for stabilizing skyrmions and hopfions at room temperature. `$Fe_3GaTe_2$` exhibits strong PMA.

### PINN (Physics-Informed Neural Network)
A class of deep learning models that encode physical laws (PDEs) into their loss functions. Used in HELIOS-3D for high-speed micromagnetic synthesis and inverse design. `[INFERRED]`

### SAF (Synthetic Antiferromagnet)
A multilayer structure where two ferromagnetic layers are coupled antiferromagnetically via a non-magnetic spacer (e.g., Ru). Used to reduce stray fields and enhance stability.

### SkHE (Skyrmion Hall Effect)
The transverse deflection of skyrmions relative to the driving current direction, caused by the Magnus force from the topology. Hopfions, with zero 2D projection charge, are hypothesized to bypass this effect. `[DEMONSTRATED for skyrmions]`

### Skyrmion
A 2D topologically protected spin texture. The foundational magnetic carrier in HELIOS-3D's early-stage architectures. Characterized by topological charge $Q = \pm 1$. `[DEMONSTRATED]`

### SOT (Spin-Orbit Torque)
A spin-current-induced torque that can drive domain wall or skyrmion motion. More energy-efficient than conventional charge-current driving. `[DEMONSTRATED]`

---

## T–Z

### THE (Topological Hall Effect)
An additional Hall contribution from real-space Berry curvature induced by non-collinear spin textures (e.g., skyrmions). Used experimentally to detect skyrmion presence. `[DEMONSTRATED]`

### Topological Compiler
A software layer that translates high-level semantic embeddings (e.g., from an LLM) into target 3D magnetic textures and DISH optical prescriptions. `[PROPOSED]`

### TPP (Two-Photon Polymerization)
A laser-based 3D microfabrication technique enabling sub-100 nm resolution. Proposed in HELIOS-3D for refining scaffold features after DISH.

### vdW (van der Waals)
Weak interlayer forces in 2D materials. `$Fe_3GaTe_2$` is a layered ferromagnet with vdW interlayer bonding, enabling mechanical exfoliation and potential heterostack integration.

### Y-zipper
A 3D-printed flexible-rigid transition mechanism using interlocking three-sided strips. Proposed in HELIOS-3D as a method for deployable or reconfigurable spintronic scaffolds. `[DEMONSTRATED]`

### $V_B^-$ (Negatively Charged Boron Vacancy)
A point defect in hBN that acts as a room-temperature quantum sensor with spin-dependent fluorescence. Alternative to diamond NV centers for magnetic sensing. `[DEMONSTRATED]`