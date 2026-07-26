"""Fractal Area-Perimeter Analysis Tool for Spin Textures and Reservoir States.

This module implements the Area-Perimeter fractal dimension method (Lovejoy 1982, Basak et al. 2026)
to compute scale-invariant topological features of spin textures, demagnetization field contours,
and Brownian Reservoir Computing (BRC) core states.

Mathematical Basis:
1. Area-Perimeter Fractal Dimension: D = 2 * log(P) / log(A)
2. Ramanujan Semi-Ellipse Perimeter: P ≈ (pi/2) * [3(a+b) - sqrt((3a+b)*(a+3b))] + 2b
3. Semi-Ellipse Area: A = (pi/2) * a * b
4. Grid-Independent Cascade Dimension: D(n) = 2 * [log(P_1) - (n-1)*log(2)] / [log(A_1) - 2*(n-1)*log(2)]
"""

import math
from typing import Dict, List, Tuple


class FractalTextureAnalyzer:
    """Calculates Area-Perimeter fractal dimensions for topological textures and cascades."""

    @staticmethod
    def compute_semi_ellipse_area(semi_major_a: float, semi_minor_b: float) -> float:
        """Compute area of a semi-elliptical texture contour."""
        if semi_major_a <= 0 or semi_minor_b <= 0:
            raise ValueError("Semi-axes a and b must be positive.")
        return float(0.5 * math.pi * semi_major_a * semi_minor_b)

    @staticmethod
    def compute_semi_ellipse_perimeter(semi_major_a: float, semi_minor_b: float) -> float:
        """Compute perimeter of a semi-elliptical contour using Ramanujan's approximation."""
        if semi_major_a <= 0 or semi_minor_b <= 0:
            raise ValueError("Semi-axes a and b must be positive.")
        a, b = semi_major_a, semi_minor_b
        h_term = math.sqrt((3 * a + b) * (a + 3 * b))
        arc_length = 0.5 * math.pi * (3 * (a + b) - h_term)
        base_length = 2.0 * b
        return float(arc_length + base_length)

    @staticmethod
    def compute_fractal_dimension(perimeter: float, area: float) -> float:
        """Compute Area-Perimeter Fractal Perimeter Dimension D = 2 * log(P) / log(A)."""
        if perimeter <= 1.0:
            raise ValueError("Perimeter must be strictly greater than 1.0 for logarithmic scaling.")
        if area <= 1.0:
            raise ValueError("Area must be strictly greater than 1.0 for logarithmic scaling.")

        return float(2.0 * (math.log(perimeter) / math.log(area)))

    @classmethod
    def compute_ellipse_fractal_dimension(
        cls, semi_major_a: float, semi_minor_b: float
    ) -> float:
        """Compute fractal dimension directly from semi-ellipse axes."""
        area = cls.compute_semi_ellipse_area(semi_major_a, semi_minor_b)
        perimeter = cls.compute_semi_ellipse_perimeter(semi_major_a, semi_minor_b)
        return cls.compute_fractal_dimension(perimeter, area)

    @staticmethod
    def predict_cascade_fractal_dimension(
        primary_perimeter: float, primary_area: float, vortex_index_n: int
    ) -> float:
        """Predict fractal dimension D(n) of the n-th nested eddy in a self-similar cascade."""
        if vortex_index_n <= 0:
            raise ValueError("Vortex index n must be a positive integer (1-indexed).")
        if primary_perimeter <= 1.0 or primary_area <= 1.0:
            raise ValueError("Primary perimeter and area must be greater than 1.0.")

        num = math.log(primary_perimeter) - (vortex_index_n - 1) * math.log(2.0)
        den = math.log(primary_area) - 2.0 * (vortex_index_n - 1) * math.log(2.0)

        if den <= 0:
            raise ValueError("Area scale factor depleted below logarithmic boundary limit.")

        return float(2.0 * (num / den))

    @classmethod
    def generate_cascade_scaling_profile(
        cls,
        primary_semi_major_a: float = 412.0,
        primary_semi_minor_b: float = 206.0,
        num_levels: int = 7,
    ) -> List[Dict[str, float]]:
        """Generate perimeter, area, and fractal dimension D(n) profile across nested levels."""
        if num_levels <= 0:
            raise ValueError("num_levels must be positive.")

        p1 = cls.compute_semi_ellipse_perimeter(primary_semi_major_a, primary_semi_minor_b)
        a1 = cls.compute_semi_ellipse_area(primary_semi_major_a, primary_semi_minor_b)

        profile = []
        for n in range(1, num_levels + 1):
            pn = p1 * math.pow(0.5, n - 1)
            an = a1 * math.pow(0.25, n - 1)
            dn = cls.predict_cascade_fractal_dimension(p1, a1, n)
            profile.append(
                {
                    "level": float(n),
                    "perimeter": pn,
                    "area": an,
                    "fractal_dimension": dn,
                }
            )

        return profile
