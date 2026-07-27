"""Full-Field Optical Knot Mode Sorter & Determinant Distinguishability Module.

This module implements the full-field optical knot mode sorting framework developed by
Tareq Jaouni, Roohollah Ghobadi, and Ebrahim Karimi (University of Ottawa & Chapman University,
arXiv:2606.23438, June 2026).

Mathematical Foundations:
1. Gaussian-Weighted Milnor Polynomials:
   u(rho, phi) = N * exp(-rho^2 / (2 * s^2)) * sum_l c_l(rho, a, b) * exp(i * l * phi)
   - Hopf Link (d=2,3): l = 0, +/-2
   - Trefoil Knot: l = 0, +/-3
   - Cinquefoil / Quinquefoil Knot: l = 0, +/-5
2. Conditional Assignment Matrix:
   p_{m|n} = I_{mn} / sum_k I_{kn}
3. Balanced Sorting Contrast:
   C_n = p_{n|n} - (1 / (d - 1)) * sum_{m != n} p_{m|n}
   C_b(alpha) = alpha * min_n(C_n) + (1 - alpha) * mean(C_n)
4. Secret-Key Rate Communication Penalty:
   h_d(e_b) = -e_b * log2(e_b / (d - 1)) - (1 - e_b) * log2(1 - e_b)
   R_d(e_b) = max(0, log2(d) - 2 * h_d(e_b))
5. Determinant Distinguishability Factor:
   V_p = |det(p)|
6. Optimization Objective:
   F = C_b(alpha) * R_d(e_b) * (V_p)^gamma
"""

import math
from typing import Dict, List, Sequence


class OpticalKnotModeSorter:
    """Models and evaluates full-field mode sorting performance for 3D optical knot alphabets."""

    @staticmethod
    def compute_milnor_polynomial_coefficients(
        knot_type: str, rho: float, a: float = 1.0, b: float = 1.0
    ) -> Dict[int, float]:
        """Compute Milnor polynomial weighting factors c_l(rho, a, b) for a given optical knot type.

        Supported knot types: 'hopf_link', 'trefoil', 'cinquefoil'.
        """
        if rho < 0.0 or a <= 0.0 or b <= 0.0:
            raise ValueError("rho, a, and b must be non-negative real numbers.")

        rho_sq = rho * rho

        if knot_type == "hopf_link":
            # l = 0, +2, -2
            c0 = 1.0 - 2.0 * (1.0 + a * a - b * b) * rho_sq + rho_sq * rho_sq
            c_plus2 = -rho_sq * (a + b) ** 2
            c_minus2 = -rho_sq * (a - b) ** 2
            return {0: float(c0), 2: float(c_plus2), -2: float(c_minus2)}

        elif knot_type == "trefoil":
            # l = 0, +3, -3
            c0 = (
                rho_sq**3
                - rho_sq**2
                - rho_sq
                + 1.0
                - 4.0 * (rho**3) * (a * a - b * b)
            )
            c_plus3 = -2.0 * (rho**3) * (a + b) ** 2
            c_minus3 = -2.0 * (rho**3) * (a - b) ** 2
            return {0: float(c0), 3: float(c_plus3), -3: float(c_minus3)}

        elif knot_type in ("cinquefoil", "quinquefoil"):
            # l = 0, +5, -5
            c0 = (
                1.0
                + rho_sq
                - 2.0 * (rho_sq**2)
                - 2.0 * (rho_sq**3)
                + (rho_sq**4)
                + (rho_sq**5)
                - 16.0 * (rho**5) * (a * a - b * b)
            )
            c_plus5 = -8.0 * (rho**5) * (a + b) ** 2
            c_minus5 = -8.0 * (rho**5) * (a - b) ** 2
            return {0: float(c0), 5: float(c_plus5), -5: float(c_minus5)}

        else:
            raise ValueError(
                f"Unsupported knot_type '{knot_type}'. Must be 'hopf_link', 'trefoil', or 'cinquefoil'."
            )

    @staticmethod
    def compute_conditional_assignment_matrix(
        intensity_matrix: Sequence[Sequence[float]],
    ) -> List[List[float]]:
        """Convert raw channel intensity matrix I_mn into conditional assignment matrix p_{m|n}."""
        d = len(intensity_matrix)
        if d == 0:
            raise ValueError("Intensity matrix cannot be empty.")

        assignment_matrix: List[List[float]] = []

        for n, row in enumerate(intensity_matrix):
            if len(row) != d:
                raise ValueError(
                    f"Square intensity matrix expected. Row {n} has length {len(row)}, expected {d}."
                )
            row_sum = sum(row)
            if row_sum <= 0.0:
                raise ValueError(
                    f"Total output channel power for input knot {n} must be strictly positive."
                )

            p_col = [float(val / row_sum) for val in row]
            assignment_matrix.append(p_col)

        return assignment_matrix

    @staticmethod
    def compute_sorting_contrast(
        assignment_matrix: Sequence[Sequence[float]], alpha: float = 0.5
    ) -> Dict[str, float]:
        """Compute individual knot contrast C_n and balanced contrast C_b(alpha)."""
        if not (0.0 <= alpha <= 1.0):
            raise ValueError("alpha weight must lie in range [0.0, 1.0].")

        d = len(assignment_matrix)
        if d < 2:
            raise ValueError("Alphabet dimension d must be at least 2.")

        c_n: List[float] = []
        for n in range(d):
            p_correct = assignment_matrix[n][n]
            leakage = sum(assignment_matrix[n][m] for m in range(d) if m != n)
            cn_val = p_correct - (leakage / (d - 1.0))
            c_n.append(cn_val)

        min_cn = min(c_n)
        mean_cn = sum(c_n) / float(d)
        cb_alpha = alpha * min_cn + (1.0 - alpha) * mean_cn

        return {
            "individual_contrasts": c_n,
            "min_contrast": min_cn,
            "mean_contrast": mean_cn,
            "balanced_contrast": cb_alpha,
        }

    @staticmethod
    def compute_communication_penalty(
        error_rate_eb: float, dimension_d: int
    ) -> float:
        """Compute d-dimensional secret-key-rate communication penalty R_d(e_b)."""
        if not (0.0 <= error_rate_eb <= 1.0):
            raise ValueError("Symbol error rate e_b must lie in range [0.0, 1.0].")
        if dimension_d < 2:
            raise ValueError("Dimension d must be at least 2.")

        eb = error_rate_eb
        d = float(dimension_d)

        if eb == 0.0:
            h_d = 0.0
        elif eb == 1.0:
            h_d = math.log2(d - 1.0)
        else:
            term1 = -eb * math.log2(eb / (d - 1.0))
            term2 = -(1.0 - eb) * math.log2(1.0 - eb)
            h_d = term1 + term2

        r_d = max(0.0, math.log2(d) - 2.0 * h_d)
        return float(r_d)

    @classmethod
    def compute_matrix_determinant_2x2_or_3x3(
        cls, matrix: Sequence[Sequence[float]]
    ) -> float:
        """Compute determinant for 2x2 or 3x3 assignment matrices."""
        d = len(matrix)
        if d == 2:
            det = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]
            return float(abs(det))
        elif d == 3:
            det = (
                matrix[0][0] * (matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1])
                - matrix[0][1] * (matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0])
                + matrix[0][2] * (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0])
            )
            return float(abs(det))
        else:
            raise ValueError("Determinant calculation helper supports d=2 and d=3 matrices.")

    @classmethod
    def evaluate_fitness_metric(
        cls,
        intensity_matrix: Sequence[Sequence[float]],
        alpha: float = 0.5,
        gamma: float = 1.0,
    ) -> Dict[str, float]:
        """Evaluate full Jaouni et al. (2026) fitness metric F = C_b(alpha) * R_d(e_b) * (V_p)^gamma."""
        p_matrix = cls.compute_conditional_assignment_matrix(intensity_matrix)
        d = len(p_matrix)

        contrast_data = cls.compute_sorting_contrast(p_matrix, alpha=alpha)
        cb_alpha = contrast_data["balanced_contrast"]

        mean_correct = sum(p_matrix[n][n] for n in range(d)) / float(d)
        error_rate_eb = 1.0 - mean_correct

        r_d = cls.compute_communication_penalty(error_rate_eb, dimension_d=d)
        v_p = cls.compute_matrix_determinant_2x2_or_3x3(p_matrix)

        fitness = cb_alpha * r_d * (v_p**gamma)

        return {
            "dimension": float(d),
            "average_sorting_probability": mean_correct,
            "error_rate_eb": error_rate_eb,
            "balanced_contrast_cb": cb_alpha,
            "communication_penalty_rd": r_d,
            "determinant_distinguishability_vp": v_p,
            "fitness_score_F": fitness,
        }
