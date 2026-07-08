from typing import List

import numpy as np

from compiler.protocols import HopfionSpec


def _next_power_of_two(n: int) -> int:
    """Round up to the nearest power of two."""
    if n <= 0:
        return 1
    p = 1
    while p < n:
        p <<= 1
    return p


class MockCompilerAdapter:
    """Mock implementation of the CompilerAdapter protocol.

    Hardcoded behavior for testing and validation scaffolding.
    Grid dimensions are inferred from hopfion spatial extent.
    """

    def __init__(self, moiré_period: float = 300.0, lattice_twist: float = 1.1):
        self.L = moiré_period
        self.theta = lattice_twist
        self.centers = [
            (0, 0), (self.L, 0),
            (0, self.L), (self.L, self.L)
        ]

    def compile_semantic_to_geom(self, embedding: np.ndarray) -> List[HopfionSpec]:
        """Map a semantic embedding to hopfion specs via threshold filter."""
        specs = []
        for i, center in enumerate(self.centers):
            if i < len(embedding) and embedding[i] > 0.5:
                specs.append(HopfionSpec(
                    x=center[0],
                    y=center[1],
                    z=0.0,
                    radius=self.L / 4,
                    hopf_index=1
                ))
        return specs

    def simulate_ife_write(self, specs: List[HopfionSpec]) -> np.ndarray:
        """Mock IFE write: infer grid size from spec coordinates."""
        if not specs:
            return np.zeros((3, 1, 1, 1))

        max_extent = max(
            max(s.x + s.radius for s in specs),
            max(s.y + s.radius for s in specs),
            max(s.z + s.radius for s in specs),
        )
        grid_size = _next_power_of_two(int(max_extent / 10) + 1)

        tensor = np.zeros((3, grid_size, grid_size, grid_size))
        for spec in specs:
            ix, iy = int(spec.x / 10), int(spec.y / 10)
            if 0 <= ix < grid_size and 0 <= iy < grid_size:
                tensor[:, ix, iy, grid_size // 2] = [0, 0, 1.0]
        return tensor
