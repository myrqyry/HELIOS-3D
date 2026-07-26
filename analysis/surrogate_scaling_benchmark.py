"""Surrogate Scaling Law Benchmark for Physics-Informed Neural Operators.

This module models and evaluates scaling laws for Tensor Basis Neural Network (TBNN)
surrogates and dynamic ODE-embedded closures in 3D magnetization / spintronic field simulations.

Scaling Relations:
1. Loss Scaling: L(D, K) = A * D^(-alpha) + B * K^(-beta) + sigma_0
   - D: Dataset trajectory count
   - K: Invariant tensor basis count
2. Computation Speedup: Speedup(N_mesh) = T_PDE(N_mesh) / T_ODE_TBNN
   - T_PDE: Full spatial grid numerical integration (O(N_mesh^3 / dt))
   - T_ODE_TBNN: Physics-assisted ODE trajectory solver (O(1) w.r.t grid mesh)
"""

import math
from typing import Dict, List, Tuple


class SurrogateScalingBenchmark:
    """Evaluates ML surrogate loss scaling and computational speedup metrics."""

    def __init__(
        self,
        alpha: float = 0.5,
        beta: float = 0.75,
        a_coeff: float = 1.0,
        b_coeff: float = 0.5,
        noise_floor: float = 1e-4,
        pde_time_constant: float = 1e-6,
        ode_tbnn_time_constant: float = 1e-3,
    ) -> None:
        if alpha <= 0 or beta <= 0:
            raise ValueError("Scaling exponents alpha and beta must be positive.")
        if a_coeff <= 0 or b_coeff <= 0:
            raise ValueError("Scaling coefficients a_coeff and b_coeff must be positive.")
        if noise_floor < 0:
            raise ValueError("Noise floor cannot be negative.")
        if pde_time_constant <= 0 or ode_tbnn_time_constant <= 0:
            raise ValueError("Time constants must be positive.")

        self.alpha = alpha
        self.beta = beta
        self.a_coeff = a_coeff
        self.b_coeff = b_coeff
        self.noise_floor = noise_floor
        self.pde_time_constant = pde_time_constant
        self.ode_tbnn_time_constant = ode_tbnn_time_constant

    def compute_loss(self, dataset_size: int, invariant_count: int) -> float:
        """Compute theoretical surrogate loss L(D, K)."""
        if dataset_size <= 0:
            raise ValueError("dataset_size must be a positive integer.")
        if invariant_count <= 0:
            raise ValueError("invariant_count must be a positive integer.")

        d_term = self.a_coeff * math.pow(dataset_size, -self.alpha)
        k_term = self.b_coeff * math.pow(invariant_count, -self.beta)
        return float(d_term + k_term + self.noise_floor)

    def compute_pde_runtime(self, grid_mesh_size: int, time_steps: int = 1000) -> float:
        """Compute estimated runtime for direct grid PDE solver (e.g. MuMax3)."""
        if grid_mesh_size <= 0:
            raise ValueError("grid_mesh_size must be positive.")
        if time_steps <= 0:
            raise ValueError("time_steps must be positive.")

        # Spatial grid scaling O(N_mesh^3) * time_steps
        spatial_vol = math.pow(grid_mesh_size, 3)
        return float(self.pde_time_constant * spatial_vol * time_steps)

    def compute_tbnn_ode_runtime(self, time_steps: int = 1000) -> float:
        """Compute estimated runtime for dynamic ODE integration using TBNN closures."""
        if time_steps <= 0:
            raise ValueError("time_steps must be positive.")

        # Dynamic ODE integration cost is independent of spatial grid mesh resolution
        return float(self.ode_tbnn_time_constant * time_steps)

    def compute_speedup_ratio(self, grid_mesh_size: int, time_steps: int = 1000) -> float:
        """Compute computational speedup ratio T_PDE / T_ODE_TBNN."""
        t_pde = self.compute_pde_runtime(grid_mesh_size, time_steps)
        t_tbnn = self.compute_tbnn_ode_runtime(time_steps)
        return float(t_pde / t_tbnn)

    def generate_scaling_curve(
        self, dataset_sizes: List[int], invariant_count: int = 6
    ) -> List[Tuple[int, float]]:
        """Generate loss values across a sweep of dataset sizes."""
        return [(d, self.compute_loss(d, invariant_count)) for d in dataset_sizes]

    def generate_speedup_profile(
        self, mesh_sizes: List[int], time_steps: int = 1000
    ) -> List[Tuple[int, float]]:
        """Generate speedup ratios across spatial mesh sizes."""
        return [(m, self.compute_speedup_ratio(m, time_steps)) for m in mesh_sizes]

    def export_summary(self, grid_mesh_size: int = 128, dataset_size: int = 100000) -> Dict[str, float]:
        """Export benchmark summary metrics dictionary."""
        loss_val = self.compute_loss(dataset_size, invariant_count=6)
        speedup_val = self.compute_speedup_ratio(grid_mesh_size)
        return {
            "dataset_size": float(dataset_size),
            "invariant_count": 6.0,
            "predicted_loss": loss_val,
            "grid_mesh_size": float(grid_mesh_size),
            "speedup_ratio": speedup_val,
        }
