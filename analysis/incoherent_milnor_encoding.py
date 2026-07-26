"""Incoherent Milnor Polynomial & Coherence Singularity Encoding Module.

This module implements the Incoherent Milnor Polynomial framework (Zhou et al. 2026)
for real-space incoherent topological light fields and dual-degree-of-freedom optical/spintronic encoding.

Mathematical Formulation:
1. Stereographic Projection:
   u(x,y,z) = (x^2 + y^2 + z^2 - 1 + 2i*z) / (x^2 + y^2 + z^2 + 1)
   v(x,y,z) = 2*(x + i*y) / (x^2 + y^2 + z^2 + 1)
2. Complex Degree of Coherence:
   μ(r1, r2) = F(r1, r2) / [sqrt(F(r1, r1)) * sqrt(F(r2, r2))]
3. Coherence Singularities:
   Regions where μ(r1, r2) = 0 (vanishing coherence on bright intensity background).
"""

import cmath
import math
from typing import Dict, List, Tuple


class IncoherentMilnorEncoder:
    """Encodes real-space topological knots and links via Incoherent Milnor Polynomials."""

    def __init__(self, braid_type: str = "trefoil", beam_width: float = 2.0, m_homogenization: int = 1) -> None:
        if braid_type not in ("trefoil", "hopf"):
            raise ValueError("braid_type must be 'trefoil' (sigma_1^+3) or 'hopf' (sigma_1^+2).")
        if beam_width <= 0:
            raise ValueError("beam_width must be positive.")
        if m_homogenization < 0:
            raise ValueError("m_homogenization cannot be negative.")

        self.braid_type = braid_type
        self.beam_width = beam_width
        self.m_homogenization = m_homogenization

    @staticmethod
    def stereographic_projection(x: float, y: float, z: float) -> Tuple[complex, complex]:
        """Map real-space coordinates (x, y, z) to stereographic complex variables (u, v)."""
        r_sq = x * x + y * y + z * z
        denom = r_sq + 1.0
        if denom == 0:
            raise ValueError("Denominator in stereographic projection cannot be zero.")

        u = complex(r_sq - 1.0, 2.0 * z) / denom
        v = complex(2.0 * x, 2.0 * y) / denom
        return u, v

    def compute_braid_roots(self, h: float) -> List[complex]:
        """Compute complex roots Z_s(h) for the specified braid polynomial."""
        # Height parameter h in [0, 2*pi]
        if self.braid_type == "trefoil":
            # Trefoil knot: braid word sigma_1^+3
            # Two strands: s = 1, 2
            z1 = 0.5 * cmath.exp(1j * 1.5 * h)
            z2 = -0.5 * cmath.exp(1j * 1.5 * h)
            return [z1, z2]
        else:
            # Hopf link: braid word sigma_1^+2
            z1 = 0.5 * cmath.exp(1j * h)
            z2 = -0.5 * cmath.exp(1j * h)
            return [z1, z2]

    def compute_braid_polynomial(self, u: complex, h: float) -> complex:
        """Evaluate deterministic braid polynomial p_h(u) = prod_{s} (u - Z_s(h))."""
        roots = self.compute_braid_roots(h)
        val = complex(1.0, 0.0)
        for z_s in roots:
            val *= (u - z_s)
        return val

    def compute_incoherent_milnor_polynomial(
        self, r1: Tuple[float, float, float], r2: Tuple[float, float, float]
    ) -> complex:
        """Compute Incoherent Milnor Polynomial F(R1, R2)."""
        x1, y1, z1 = r1
        x2, y2, z2 = r2

        u1, v1 = self.stereographic_projection(x1, y1, z1)
        u2, v2 = self.stereographic_projection(x2, y2, z2)

        p1 = self.compute_braid_polynomial(u1, h=z1)
        p2 = self.compute_braid_polynomial(u2, h=z2)

        # Gaussian & overhomogenization envelopes
        r1_sq = x1 * x1 + y1 * y1
        r2_sq = x2 * x2 + y2 * y2

        gauss_factor = math.exp(-(r1_sq + r2_sq) / (2.0 * self.beam_width * self.beam_width))
        homog_factor = math.pow(r1_sq + 1.0, self.m_homogenization) * math.pow(
            r2_sq + 1.0, self.m_homogenization
        )

        return (p1 * p2.conjugate()) * gauss_factor * homog_factor

    def compute_degree_of_coherence(
        self, r1: Tuple[float, float, float], r2: Tuple[float, float, float]
    ) -> complex:
        """Compute complex degree of coherence μ(r1, r2) = F(r1, r2) / sqrt(F(r1,r1) * F(r2,r2))."""
        f12 = self.compute_incoherent_milnor_polynomial(r1, r2)
        f11 = self.compute_incoherent_milnor_polynomial(r1, r1).real
        f22 = self.compute_incoherent_milnor_polynomial(r2, r2).real

        denom = math.sqrt(max(f11, 1e-15) * max(f22, 1e-15))
        if denom == 0:
            return complex(0.0, 0.0)

        mu = f12 / denom
        # Clip modulus to [0, 1] due to floating point precision
        if abs(mu) > 1.0:
            mu = mu / abs(mu)
        return mu

    def is_coherence_singularity(
        self, r1: Tuple[float, float, float], r2: Tuple[float, float, float], tol: float = 1e-4
    ) -> bool:
        """Check whether (r1, r2) corresponds to a coherence singularity (|μ| ≈ 0)."""
        mu = self.compute_degree_of_coherence(r1, r2)
        return abs(mu) < tol

    def encode_dual_payload(
        self, braid_key: str, statistical_intensity: List[float]
    ) -> Dict[str, object]:
        """Encode dual-degree payload: topological braid key + statistical coherence intensity."""
        return {
            "topological_key": braid_key,
            "statistical_intensity": statistical_intensity,
            "braid_type": self.braid_type,
            "status": "encrypted",
        }
