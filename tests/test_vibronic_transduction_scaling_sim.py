"""Unit tests for Vibronic Transduction simulator module."""

import math
import pytest
from analysis.vibronic_transduction_scaling_sim import VibronicTransductionSimulator


def test_collective_rabi_splitting_scaling() -> None:
    sim = VibronicTransductionSimulator(single_molecule_coupling_cm1=1.5)
    rabi_100 = sim.compute_collective_rabi_splitting(100)
    rabi_10000 = sim.compute_collective_rabi_splitting(10000)

    # Omega(100) = 2 * 1.5 * 10 = 30.0 cm-1
    assert math.isclose(rabi_100, 30.0, rel_tol=1e-5)
    # Omega(10000) = 2 * 1.5 * 100 = 300.0 cm-1
    assert math.isclose(rabi_10000, 300.0, rel_tol=1e-5)


def test_feshbach_effective_coupling_scaling() -> None:
    sim = VibronicTransductionSimulator(single_molecule_coupling_cm1=2.0)
    h_eff_100 = sim.compute_feshbach_effective_coupling(100, laser_field_amplitude=1.0)
    h_eff_400 = sim.compute_feshbach_effective_coupling(400, laser_field_amplitude=1.0)

    # Coupling magnitude grows as sqrt(N) to cancel 1/sqrt(N) state projection
    ratio = abs(h_eff_400) / abs(h_eff_100)
    assert math.isclose(ratio, 2.0, rel_tol=1e-5)


def test_evaluate_scaling_behavior() -> None:
    sim = VibronicTransductionSimulator()
    ensemble_sizes = [10, 100, 1000, 1000000]
    results = sim.evaluate_scaling_behavior(ensemble_sizes)

    assert len(results) == 4
    for res in results:
        # Vibronic transduction remains strictly 1.0 (O(1))
        assert res["vibronic_transduction_scaling"] == 1.0
        # Boost factor matches N
        assert math.isclose(res["scaling_boost_factor"], res["ensemble_size_N"], rel_tol=1e-5)


def test_invalid_parameters_raise_errors() -> None:
    with pytest.raises(ValueError, match="Frequencies and coupling constants must be positive"):
        VibronicTransductionSimulator(single_molecule_coupling_cm1=0.0)

    sim = VibronicTransductionSimulator()
    with pytest.raises(ValueError, match="num_nodes must be positive"):
        sim.compute_collective_rabi_splitting(0)

    with pytest.raises(ValueError, match="All ensemble sizes must be positive integers"):
        sim.evaluate_scaling_behavior([10, -5])
