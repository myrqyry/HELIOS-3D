"""Unit tests for optical knot mode sorter module."""

import math
import pytest
from analysis.optical_knot_mode_sorter import OpticalKnotModeSorter


def test_milnor_polynomial_coefficients_hopf_link() -> None:
    coeffs = OpticalKnotModeSorter.compute_milnor_polynomial_coefficients(
        knot_type="hopf_link", rho=1.0, a=0.6, b=0.6
    )
    assert 0 in coeffs
    assert 2 in coeffs
    assert -2 in coeffs
    assert coeffs[0] == pytest.approx(0.0, abs=1e-5)
    assert coeffs[2] == pytest.approx(-1.44, abs=1e-5)


def test_milnor_polynomial_coefficients_trefoil_and_cinquefoil() -> None:
    coeffs_t = OpticalKnotModeSorter.compute_milnor_polynomial_coefficients(
        knot_type="trefoil", rho=1.0, a=0.9, b=0.9
    )
    assert 0 in coeffs_t and 3 in coeffs_t and -3 in coeffs_t

    coeffs_c = OpticalKnotModeSorter.compute_milnor_polynomial_coefficients(
        knot_type="cinquefoil", rho=1.0, a=2.0, b=2.0
    )
    assert 0 in coeffs_c and 5 in coeffs_c and -5 in coeffs_c


def test_conditional_assignment_matrix_normalization() -> None:
    intensity_matrix = [[80.0, 20.0], [10.0, 90.0]]
    p_mat = OpticalKnotModeSorter.compute_conditional_assignment_matrix(intensity_matrix)
    assert p_mat[0] == [0.8, 0.2]
    assert p_mat[1] == [0.1, 0.9]


def test_sorting_contrast_ideal_vs_uniform() -> None:
    ideal_p = [[1.0, 0.0], [0.0, 1.0]]
    contrast_ideal = OpticalKnotModeSorter.compute_sorting_contrast(ideal_p, alpha=0.5)
    assert contrast_ideal["min_contrast"] == 1.0
    assert contrast_ideal["balanced_contrast"] == 1.0

    uniform_p = [[0.5, 0.5], [0.5, 0.5]]
    contrast_uniform = OpticalKnotModeSorter.compute_sorting_contrast(uniform_p, alpha=0.5)
    assert contrast_uniform["min_contrast"] == 0.0
    assert contrast_uniform["balanced_contrast"] == 0.0


def test_communication_penalty_and_determinant() -> None:
    r2_zero_error = OpticalKnotModeSorter.compute_communication_penalty(
        error_rate_eb=0.0, dimension_d=2
    )
    assert math.isclose(r2_zero_error, 1.0, rel_tol=1e-5)

    ideal_p_3d = [[1.0, 0.0, 0.0], [0.0, 1.0, 0.0], [0.0, 0.0, 1.0]]
    det3 = OpticalKnotModeSorter.compute_matrix_determinant_2x2_or_3x3(ideal_p_3d)
    assert math.isclose(det3, 1.0, rel_tol=1e-5)


def test_evaluate_fitness_metric_d3_paper_benchmark() -> None:
    simulated_intensity = [
        [0.93, 0.03, 0.04],
        [0.04, 0.92, 0.04],
        [0.03, 0.04, 0.93],
    ]
    fit_data = OpticalKnotModeSorter.evaluate_fitness_metric(simulated_intensity, alpha=0.5, gamma=1.0)

    assert fit_data["dimension"] == 3.0
    assert fit_data["average_sorting_probability"] > 0.90
    assert fit_data["fitness_score_F"] > 0.0
    assert fit_data["determinant_distinguishability_vp"] > 0.70


def test_invalid_parameters_raise_value_errors() -> None:
    with pytest.raises(ValueError, match="rho, a, and b must be non-negative"):
        OpticalKnotModeSorter.compute_milnor_polynomial_coefficients("hopf_link", rho=-1.0)

    with pytest.raises(ValueError, match="Unsupported knot_type"):
        OpticalKnotModeSorter.compute_milnor_polynomial_coefficients("torus_knot", rho=1.0)

    with pytest.raises(ValueError, match="Total output channel power"):
        OpticalKnotModeSorter.compute_conditional_assignment_matrix([[0.0, 0.0], [1.0, 1.0]])
