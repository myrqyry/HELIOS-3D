"""Unit tests for surrogate scaling benchmark module."""

import pytest
from analysis.surrogate_scaling_benchmark import SurrogateScalingBenchmark


def test_compute_loss_scaling_monotonicity() -> None:
    bench = SurrogateScalingBenchmark(alpha=0.5, beta=0.75)
    loss_small = bench.compute_loss(dataset_size=100, invariant_count=6)
    loss_large = bench.compute_loss(dataset_size=10000, invariant_count=6)
    assert loss_large < loss_small
    assert loss_large > bench.noise_floor


def test_compute_loss_invariant_scaling() -> None:
    bench = SurrogateScalingBenchmark(alpha=0.5, beta=0.75)
    loss_few_inv = bench.compute_loss(dataset_size=1000, invariant_count=2)
    loss_many_inv = bench.compute_loss(dataset_size=1000, invariant_count=8)
    assert loss_many_inv < loss_few_inv


def test_compute_speedup_ratio_mesh_scaling() -> None:
    bench = SurrogateScalingBenchmark(pde_time_constant=1e-6, ode_tbnn_time_constant=1e-3)
    speedup_64 = bench.compute_speedup_ratio(grid_mesh_size=64)
    speedup_128 = bench.compute_speedup_ratio(grid_mesh_size=128)
    # Speedup should scale as (128/64)^3 = 8
    assert pytest.approx(speedup_128 / speedup_64, rel=1e-3) == 8.0


def test_invalid_input_bounds_raise_errors() -> None:
    with pytest.raises(ValueError, match="Scaling exponents"):
        SurrogateScalingBenchmark(alpha=-0.1)

    bench = SurrogateScalingBenchmark()
    with pytest.raises(ValueError, match="dataset_size must be a positive integer"):
        bench.compute_loss(dataset_size=0, invariant_count=6)

    with pytest.raises(ValueError, match="invariant_count must be a positive integer"):
        bench.compute_loss(dataset_size=1000, invariant_count=0)

    with pytest.raises(ValueError, match="grid_mesh_size must be positive"):
        bench.compute_pde_runtime(grid_mesh_size=0)


def test_export_summary() -> None:
    bench = SurrogateScalingBenchmark()
    summary = bench.export_summary(grid_mesh_size=128, dataset_size=50000)
    assert summary["dataset_size"] == 50000.0
    assert summary["grid_mesh_size"] == 128.0
    assert summary["predicted_loss"] > 0
    assert summary["speedup_ratio"] > 1.0
