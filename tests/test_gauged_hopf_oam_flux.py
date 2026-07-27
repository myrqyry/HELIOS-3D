"""Unit tests for Gauged Hopf OAM Flux analysis module."""

import math
import pytest
from analysis.gauged_hopf_oam_flux import GaugedHopfOAMFluxAnalyzer


def test_topological_residual_invariants() -> None:
    r_val = GaugedHopfOAMFluxAnalyzer.compute_topological_residual()
    assert r_val == pytest.approx(0.13754, abs=1e-4)
    assert r_val > GaugedHopfOAMFluxAnalyzer.MYSTERY_EXP_SCALE


def test_holonomy_gap_boundary() -> None:
    gap_zero = GaugedHopfOAMFluxAnalyzer.compute_holonomy_gap(math.e / math.pi)
    assert math.isclose(gap_zero, 0.0, abs_tol=1e-12)

    gap_star = GaugedHopfOAMFluxAnalyzer.compute_holonomy_gap(
        GaugedHopfOAMFluxAnalyzer.KAPPA_STAR
    )
    assert gap_star == pytest.approx(
        GaugedHopfOAMFluxAnalyzer.TOPOLOGICAL_RESIDUAL_R, abs=1e-5
    )


def test_golden_quantized_modes_selection() -> None:
    modes = GaugedHopfOAMFluxAnalyzer.select_golden_quantized_modes(l_max=6)
    assert isinstance(modes, list)
    assert 0 not in modes
    assert len(modes) > 0
    assert all(-6 <= m <= 6 for m in modes)


def test_simulate_pump_relax_survival_plateau() -> None:
    res = GaugedHopfOAMFluxAnalyzer.simulate_pump_relax_survival(
        kappa=0.85, lambda_t=2.0
    )
    assert res["kappa"] == 0.85
    assert res["lambda_t"] == 2.0
    assert res["mean_survival"] == pytest.approx(0.150, abs=0.01)
    assert res["rel_distance_to_R"] < 0.15
    assert res["rel_distance_to_exp"] < 0.15


def test_z_resolved_flux_transfer_monotonicity() -> None:
    transfer_data = GaugedHopfOAMFluxAnalyzer.compute_z_resolved_flux_transfer(
        l_modes=[0, -3, 3], z_steps=50, z_max=5.0, k_kick=0.008
    )
    mode_results = transfer_data["mode_results"]

    assert all(d == 0.0 for d in mode_results[0]["instantaneous_deposit"])

    cum_3 = mode_results[3]["cumulative_transferred"]
    for i in range(len(cum_3) - 1):
        assert cum_3[i + 1] >= cum_3[i]
    assert cum_3[-1] > 0.0


def test_invalid_parameters_raise_value_errors() -> None:
    with pytest.raises(ValueError, match="kappa must be non-negative"):
        GaugedHopfOAMFluxAnalyzer.compute_holonomy_gap(kappa=-0.5)

    with pytest.raises(ValueError, match="l_max must be a positive integer"):
        GaugedHopfOAMFluxAnalyzer.select_golden_quantized_modes(l_max=0)

    with pytest.raises(
        ValueError, match="z_steps, z_max, and k_kick must be positive"
    ):
        GaugedHopfOAMFluxAnalyzer.compute_z_resolved_flux_transfer(
            l_modes=[1], z_steps=0
        )
