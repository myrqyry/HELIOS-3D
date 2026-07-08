from dataclasses import dataclass
from typing import List, Protocol, runtime_checkable
import numpy as np


@dataclass
class HopfionSpec:
    x: float
    y: float
    z: float
    radius: float
    hopf_index: int


@runtime_checkable
class CompilerAdapter(Protocol):
    """Adapter protocol for semantic → topological compilation.

    The adapter maps high-dimensional semantic embeddings to hopfion
    specifications, and simulates the Inverse Faraday Effect write phase.
    """

    def compile_semantic_to_geom(self, embedding: np.ndarray) -> List[HopfionSpec]:
        """Map a semantic embedding to a list of hopfion specifications."""
        ...

    def simulate_ife_write(self, specs: List[HopfionSpec]) -> np.ndarray:
        """Translate hopfion specs into a 3D magnetization tensor."""
        ...
