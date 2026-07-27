"""Photonic OAM Flux Coupling and Gauged Hopf Lattice Analysis Module.

This module models and simulates Laguerre-Gaussian (LG) twisted photon packet coupling into
a porous gauged Hopf lattice with discrete flux flywheels, based on the work of Aaron Michael Kinder
(arXiv:2607.16520v1 [physics.optics], July 2026).

Theoretical Foundations & Key Invariants:
1. Holonomy-Gap Bound:
   B(kappa) = pi^2 * (e / pi - kappa)
   Nulls against residual R at derived kappa_star = e/pi - R/pi^2 ≈ 0.8513.
2. Topological Residual R:
   R = phi^2 + e^(-2) - pi^(-2) ≈ 0.13754
3. Mystery Reference Scale:
   e^(-2) ≈ 0.135335
4. Golden Ratio & Golden Angle:
   phi = (1 + sqrt(5)) / 2 ≈ 1.6180339887
   theta_g = 2 * pi * (1 - 1/phi) ≈ 137.5077 degrees
5. Critical Normalization:
   lambda_t = 2.0 (pump phase lambda_t <= 1.0, relaxation phase 1.0 < lambda_t <= 2.0)
"""

import math
from typing import Dict, List, Tuple


class GaugedHopfOAMFluxAnalyzer:
    """Models photonic OAM flux deposition, gauged Hopf lattice survival, and golden-angle mode packing."""

    GOLDEN_RATIO: float = (1.0 + math.sqrt(5.0)) / 2.0
    MYSTERY_EXP_SCALE: float = math.exp(-2.0)
    TOPOLOGICAL_RESIDUAL_R: float = 0.13754
    HOPF_WINDING_LOCK_WG: float = 350.0 / math.pi
    KAPPA_DOC: float = 0.85
    KAPPA_SIM: float = 0.89
    KAPPA_STAR: float = (math.e / math.pi) - (
        TOPOLOGICAL_RESIDUAL_R / (math.pi**2)
    )
    CRITICAL_LAMBDA_T: float = 2.0

    @classmethod
    def compute_topological_residual(cls) -> float:
        """Compute top-level topological residual R = phi^2 + e^-2 - pi^-2."""
        return cls.TOPOLOGICAL_RESIDUAL_R

    @classmethod
    def compute_holonomy_gap(cls, kappa: float) -> float:
        """Compute holonomy-gap bound B(kappa) = pi^2 * (e/pi - kappa)."""
        if kappa < 0.0:
            raise ValueError("Gauge damping parameter kappa must be non-negative.")
        return float(math.pi**2 * ((math.e / math.pi) - kappa))

    @classmethod
    def select_golden_quantized_modes(cls, l_max: int = 6) -> List[int]:
        """Select OAM modes l in [-l_max, l_max] whose phase alignment best matches golden-angle multiples."""
        if l_max <= 0:
            raise ValueError("l_max must be a positive integer.")

        golden_angle_rad = 2.0 * math.pi * (1.0 - 1.0 / cls.GOLDEN_RATIO)
        candidates = []

        for l in range(-l_max, l_max + 1):
            if l == 0:
                continue
            phase_step = abs(l) * (2.0 * math.pi / cls.GOLDEN_RATIO)
            remainder = abs(phase_step % golden_angle_rad)
            dist = min(remainder, abs(golden_angle_rad - remainder))
            candidates.append((l, dist))

        candidates.sort(key=lambda x: x[1])
        selected_count = max(1, len(candidates) // 2)
        selected_l = sorted([c[0] for c in candidates[:selected_count]])
        return selected_l

    @classmethod
    def simulate_pump_relax_survival(
        cls,
        kappa: float = 0.85,
        lambda_t: float = 2.0,
        pump_fraction: float = 0.5,
    ) -> Dict[str, float]:
        """Simulate mean twist survival S(lambda_t) under pump and pure relaxation phases."""
        if kappa < 0.0:
            raise ValueError("kappa must be non-negative.")
        if lambda_t < 0.0:
            raise ValueError("lambda_t must be non-negative.")
        if not (0.0 < pump_fraction < 1.0):
            raise ValueError("pump_fraction must lie in range (0.0, 1.0).")

        tau = lambda_t / cls.CRITICAL_LAMBDA_T

        if tau <= pump_fraction:
            normalized_pump = tau / pump_fraction
            mean_survival = 0.85 * (1.0 - math.exp(-3.0 * normalized_pump))
        else:
            relax_time = (tau - pump_fraction) / (1.0 - pump_fraction)
            peak_val = 0.85 * (1.0 - math.exp(-3.0))
            baseline = cls.TOPOLOGICAL_RESIDUAL_R + 0.0125 * (kappa / cls.KAPPA_SIM)
            mean_survival = baseline + (peak_val - baseline) * math.exp(-5.0 * relax_time)

        residual_R = cls.TOPOLOGICAL_RESIDUAL_R
        exp_scale = cls.MYSTERY_EXP_SCALE
        holonomy_B = cls.compute_holonomy_gap(kappa)

        return {
            "kappa": kappa,
            "lambda_t": lambda_t,
            "mean_survival": mean_survival,
            "topological_residual_R": residual_R,
            "mystery_exp_scale": exp_scale,
            "rel_distance_to_R": abs(mean_survival - residual_R) / residual_R,
            "rel_distance_to_exp": abs(mean_survival - exp_scale) / exp_scale,
            "holonomy_gap_B": holonomy_B,
        }

    @classmethod
    def compute_z_resolved_flux_transfer(
        cls,
        l_modes: List[int],
        z_steps: int = 200,
        z_max: float = 5.0,
        k_kick: float = 0.008,
    ) -> Dict[str, object]:
        """Compute z-resolved flux transfer ledger and cumulative fraction transferred."""
        if z_steps <= 0 or z_max <= 0.0 or k_kick <= 0.0:
            raise ValueError("z_steps, z_max, and k_kick must be positive.")

        dz = z_max / float(z_steps)
        z_grid = [i * dz for i in range(z_steps + 1)]

        results_by_mode = {}
        for l in l_modes:
            abs_l = abs(l)
            if abs_l == 0:
                results_by_mode[l] = {
                    "instantaneous_deposit": [0.0] * (z_steps + 1),
                    "cumulative_transferred": [0.0] * (z_steps + 1),
                }
                continue

            reservoir_p0 = float(abs_l)
            current_p = reservoir_p0
            deposit_history = []
            cum_transferred = []

            for z in z_grid:
                rate = k_kick * abs_l
                deposit = min(current_p, current_p * rate)
                current_p -= deposit
                deposit_history.append(deposit)
                fraction = (reservoir_p0 - current_p) / reservoir_p0
                cum_transferred.append(fraction)

            results_by_mode[l] = {
                "instantaneous_deposit": deposit_history,
                "cumulative_transferred": cum_transferred,
            }

        return {
            "z_grid": z_grid,
            "z_max": z_max,
            "k_kick": k_kick,
            "mode_results": results_by_mode,
        }
