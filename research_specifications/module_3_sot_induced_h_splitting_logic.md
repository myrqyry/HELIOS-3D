# Research Module 3: SOT-Induced "H-Splitting" Logic

## Objective and Contextual Framework

To transition HELIOS-3D from a passive "Inference-only" analog reservoir into a complete Universal Topological Processor, the architecture must demonstrate the capability to execute discrete, deterministic logic operations. Storing non-volatile states or allowing magnonic waves to propagate through a static lattice is insufficient for Turing-complete computation. This research module defines the "Topological Logic Gate" by leveraging newly published findings from the University of Tokyo regarding the Spin-Orbit Torque (SOT) manipulation of high-order magnetic hopfions.

The specific, executable objective of this module is to mathematically and physically simulate an $H=2$ (linked ring) magnetic hopfion and apply a precisely calibrated SOT pulse to trigger a dynamic "splitting event," resulting in two distinct $H=1$ hopfions. This topologically protected bifurcation serves as the direct physical equivalent of a fan-out or signal branching mechanism, establishing a novel computing paradigm.

## Spin-Orbit Torque Dynamics and Topological Tension

Magnetic hopfions are characterized by their Hopf index $H$, which represents the linking number of the preimages of the continuous magnetization field. An $H=1$ hopfion consists of a simple unknot configuration, while an $H=2$ hopfion represents a more complex topological structure, typically manifesting as a linked ring or a tightly wound twisted torus. Recent theoretical and simulation work led by Yukitoshi Motome's research group at the University of Tokyo has demonstrated that Spin-Orbit Torque (SOT) serves as a powerful tool for the dynamic manipulation of these topological states.

When an electrical current is injected into an adjacent heavy-metal or transition-metal dichalcogenide layer beneath the magnetic substrate, the spin Hall effect generates a pure spin current flowing perpendicular to the charge current. This spin current exerts a strong SOT on the localized magnetic moments composing the hopfion. The non-equilibrium dynamics of the magnetization $\mathbf{m}$ under SOT are governed by the augmented Landau-Lifshitz-Gilbert (LLG) equation:

$$\frac{\partial \mathbf{m}}{\partial t} = -\gamma \mathbf{m} \times \mathbf{H}_{eff} + \alpha \mathbf{m} \times \frac{\partial \mathbf{m}}{\partial t} + \tau_{SOT}$$

where the specific damping-like SOT term is defined as $\tau_{SOT} = \theta_{SH} \frac{\gamma \hbar}{2 e M_s d} \mathbf{m} \times (\mathbf{m} \times \mathbf{\sigma})$.

The application of this SOT introduces a non-equilibrium "effective tension" directly into the three-dimensional hopfion structure. For a high-order $H=2$ hopfion, this effective tension alters the topological stability of the configuration. Comparative analysis across different topological Hopf numbers reveals a hierarchy of instabilities that dictates these dynamical transitions. Under a precisely calibrated, sub-nanosecond SOT pulse, the effective tension forces the $H=2$ linked rings to stretch beyond their stability limit. Unlike standard scalar magnetic domains that dissolve under stress, the topology dictates a specific decay path. The single high-$H$ entity undergoes a dynamic topological transition, physically splitting and branching into two distinct, highly stable $H=1$ hopfions.

## Defining the Topological Logic Gate for Universal Computation

The physical, predictable splitting of a hopfion forms the basis of a non-volatile topological logic gate. Using the 300 nm domains established in Module 2, researchers can spatially confine the input $H=2$ hopfion at a specifically engineered junction (such as a structural y-branch geometry) within the super-moiré lattice. The deliberate application of the targeted SOT pulse drives the splitting event, forcing the two newly generated $H=1$ hopfions to propagate down separate geometric pathways through the crystal due to the defined skyrmion Hall angle derived from the effective SOT force.

Furthermore, research indicates that by appropriately scheduling the specific time dependence and intensity profile of the applied SOT, it is possible to repeatedly induce both the splitting and the subsequent recombination of these hopfions. This reversibility is critical for continuous operation.

If the architecture defines an $H=2$ state as a primary binary operand (e.g., holding a value of 'True' or '1' that carries a payload), the controlled splitting mimics a fan-out protocol, where a single robust input signal is reliably divided into two verifiable logic high ($H=1$) outputs. Conversely, routing two propagating $H=1$ inputs via SOT into a collision within a single super-moiré cell forces their recombination into an $H=2$ output, acting as a topological accumulator or an integration gate.

| Initial Soliton State | Applied SOT Pulse Schedule | Final Soliton State | Boolean Logic / Computational Equivalent |
| :--- | :--- | :--- | :--- |
| $H=1$ | None (Ambient Relaxation) | $H=1$ | Buffer / Standard Memory Retention |
| $H=2$ | Single Sub-nanosecond Pulse | Two $H=1$ hopfions | Branching / Fan-out / Binary Division |
| Two $H=1$ (Colliding) | Modulated Convergence Pulse | $H=2$ hopfion | AND Gate / Topological Accumulator |
| $H>2$ (e.g., $H=4$) | Staggered High-Intensity Pulse Train | Multiple $H=1$ hopfions | Demultiplexer / Multi-state output |

The overarching insight of this research module is that within HELIOS-3D, topology is no longer just a static memory mechanism. The topology becomes the physical logic itself. Because the Hopf number is protected by the topological invariants of the field, the computations are inherently resilient to local thermal noise, stray electromagnetic fields, or minor material defects that would typically induce bit-flip errors in standard CMOS logic. Implementing this precise SOT-induced $H$-splitting logic secures HELIOS-3D's position as a new class of processor—a Universal Topological Processor—that merges non-volatile high-density memory with stateful, deterministic logic in the exact same volumetric space.
