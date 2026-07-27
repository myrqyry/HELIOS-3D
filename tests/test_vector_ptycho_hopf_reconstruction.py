"""Unit tests for Vector Ptycho-Tomography & Fractional Hopfion Reconstruction module."""

import math
import pytest
from analysis.vector_ptycho_hopf_reconstruction import VectorPtychoHopfAnalyzer


def test_compute_surface_helicity_hopf_index() -> None:
    # Test experimental value: 155 deg - 30 deg = 125 deg -> H = 125/360 ≈ 0.347
    h_idx = VectorPtychoHopfAnalyzer.compute_surface_helicity_hopf_index(155.0, 30.0)
    assert h_idx == pytest.approx(0.34722, abs=1e-3)

    # Test full 360 deg twist -> integer H = 1.0
    h_full = VectorPtychoHopfAnalyzer.compute_surface_helicity_hopf_index(360.0, 0.0)
    assert h_full == 1.0


def test_domain_wall_width_profile_symmetry() -> None:
    z_grid = [0.0, 44.0, 88.0]
    widths = VectorPtychoHopfAnalyzer.compute_domain_wall_width_profile(
        z_grid_nm=z_grid, w_center_nm=23.0, w_surface_nm=40.0, sample_thickness_nm=88.0
    )
    assert len(widths) == 3
    assert widths[0] == 40.0
    assert widths[1] == 23.0
    assert widths[2] == 40.0


def test_twisted_helicity_profile_bounds() -> None:
    z_grid = [0.0, 44.0, 88.0]
    beta_pos = VectorPtychoHopfAnalyzer.compute_twisted_helicity_profile(
        z_grid, beta_surface_deg=155.0, beta_bulk_deg=90.0, is_positive_helicity=True
    )
    assert beta_pos[0] == 25.0  # 90 + (155 - 90) * (-1)^3 = 25.0
    assert beta_pos[1] == 90.0
    assert beta_pos[2] == 155.0


def test_2d_topological_charge_density() -> None:
    # Uniform magnetization -> 0 topological charge density
    rho_zero = VectorPtychoHopfAnalyzer.compute_2d_topological_charge_density(
        mx=0.0, my=0.0, mz=1.0,
        dmx_dx=0.0, dmy_dx=0.0, dmz_dx=0.0,
        dmx_dy=0.0, dmy_dy=0.0, dmz_dy=0.0,
    )
    assert rho_zero == 0.0


def test_emergent_magnetic_field_vector() -> None:
    m_vec = (0.0, 0.0, 1.0)
    dm_dx = (1.0, 0.0, 0.0)
    dm_dy = (0.0, 1.0, 0.0)
    dm_dz = (0.0, 0.0, 0.0)

    fx, fy, fz = VectorPtychoHopfAnalyzer.compute_emergent_magnetic_field_vector(
        m_vec, dm_dx, dm_dy, dm_dz
    )
    assert fx == 0.0
    assert fy == 0.0
    # fz = -1 / (8 * pi) * (0 * 0 + 0 * 0 + 1 * (1*1 - 0*0)) = -1 / (8 * pi)
    assert fz == pytest.approx(-1.0 / (8.0 * math.pi), abs=1e-5)


def test_evaluate_reconstruction_summary() -> None:
    summary = VectorPtychoHopfAnalyzer.evaluate_reconstruction_summary(
        beta_top_deg=155.0, beta_bottom_deg=30.0, num_skyrmion_tubes=24, voxel_size_nm=8.0
    )
    assert summary["num_skyrmions"] == 24.0
    assert summary["voxel_size_nm"] == 8.0
    assert summary["fractional_hopf_index"] == pytest.approx(0.34722, abs=1e-3)


def test_invalid_parameters_raise_value_errors() -> None:
    with pytest.raises(ValueError, match="sample_thickness_nm must be strictly positive"):
        VectorPtychoHopfAnalyzer.compute_domain_wall_width_profile(
            [0.0], sample_thickness_nm=0.0
        )

    with pytest.raises(ValueError, match="Magnetization vector magnitude cannot be zero"):
        VectorPtychoHopfAnalyzer.compute_2d_topological_charge_density(
            0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0
        )
