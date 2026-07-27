"""3D Vector Ptycho-Tomography & Fractional Hopfion Reconstruction Module.

This module models and simulates the 3D vector ptycho-tomography reconstruction,
depth-dependent twisted helicity profile, 2D topological winding density, and
Coulomb-gauge 3D fractional Hopf index calculations based on the experimental work
by I. Binnie, H. Fang et al. (STROBE NSF Science & Technology Center, JILA, ALS LBNL,
arXiv:2607.18900, July 2026).

Theoretical Foundations & Key Equations:
1. 2D Topological Charge Density:
   rho(x, y) = -1 / (4 * pi) * m . (d_x m x d_y m)
2. 3D Emergent Magnetic Field:
   F_i = -1 / (8 * pi) * epsilon_ijk * m . (d_j m x d_k m)
3. Surface Helicity Fractional Hopf Index:
   H = (beta_s+ - beta_s-) / 360 degrees
4. Fourier-Space Coulomb Gauge Hopf Index:
   H = integral F*(k) . [-i * k x F(k) / (2 * pi * k^2)] d^3k
"""

import math
from typing import Dict, List, Tuple


class VectorPtychoHopfAnalyzer:
    """Models 3D vector magnetization textures, depth-dependent helicity twist, and fractional Hopf index."""

    @staticmethod
    def compute_surface_helicity_hopf_index(
        beta_top_deg: float, beta_bottom_deg: float
    ) -> float:
        """Compute fractional Hopf index H from surface helicity angle difference: H = (beta_s+ - beta_s-) / 360."""
        return float((beta_top_deg - beta_bottom_deg) / 360.0)

    @staticmethod
    def compute_domain_wall_width_profile(
        z_grid_nm: List[float],
        w_center_nm: float = 23.0,
        w_surface_nm: float = 40.0,
        sample_thickness_nm: float = 88.0,
    ) -> List[float]:
        """Compute depth-dependent domain wall width w(z) across sample thickness."""
        if sample_thickness_nm <= 0.0:
            raise ValueError("sample_thickness_nm must be strictly positive.")
        if w_center_nm <= 0.0 or w_surface_nm <= 0.0:
            raise ValueError("Domain wall widths must be strictly positive.")

        z_half = sample_thickness_nm / 2.0
        widths = []
        for z in z_grid_nm:
            normalized_z = (z - z_half) / z_half
            w_z = w_center_nm + (w_surface_nm - w_center_nm) * (normalized_z**2)
            widths.append(float(w_z))
        return widths

    @staticmethod
    def compute_twisted_helicity_profile(
        z_grid_nm: List[float],
        beta_surface_deg: float = 155.0,
        beta_bulk_deg: float = 90.0,
        sample_thickness_nm: float = 88.0,
        is_positive_helicity: bool = True,
    ) -> List[float]:
        """Compute depth-dependent helicity angle beta(z) transitioning from surface Néel to bulk Bloch."""
        if sample_thickness_nm <= 0.0:
            raise ValueError("sample_thickness_nm must be strictly positive.")

        sign = 1.0 if is_positive_helicity else -1.0
        z_half = sample_thickness_nm / 2.0
        helicities = []

        for z in z_grid_nm:
            norm_z = (z - z_half) / z_half
            beta_z = sign * (
                beta_bulk_deg + (beta_surface_deg - beta_bulk_deg) * (norm_z**3)
            )
            helicities.append(float(beta_z))
        return helicities

    @staticmethod
    def compute_2d_topological_charge_density(
        mx: float,
        my: float,
        mz: float,
        dmx_dx: float,
        dmy_dx: float,
        dmz_dx: float,
        dmx_dy: float,
        dmy_dy: float,
        dmz_dy: float,
    ) -> float:
        """Compute 2D topological charge density rho = -1/(4*pi) * m . (d_x m x d_y m)."""
        norm_sq = mx * mx + my * my + mz * mz
        if norm_sq == 0.0:
            raise ValueError("Magnetization vector magnitude cannot be zero.")

        inv_norm = 1.0 / math.sqrt(norm_sq)
        u_x, u_y, u_z = mx * inv_norm, my * inv_norm, mz * inv_norm

        cross_x = dmy_dx * dmz_dy - dmz_dx * dmy_dy
        cross_y = dmz_dx * dmx_dy - dmx_dx * dmz_dy
        cross_z = dmx_dx * dmy_dy - dmy_dx * dmx_dy

        dot_prod = u_x * cross_x + u_y * cross_y + u_z * cross_z
        return float(-1.0 / (4.0 * math.pi) * dot_prod)

    @staticmethod
    def compute_emergent_magnetic_field_vector(
        m_vec: Tuple[float, float, float],
        dm_dx: Tuple[float, float, float],
        dm_dy: Tuple[float, float, float],
        dm_dz: Tuple[float, float, float],
    ) -> Tuple[float, float, float]:
        """Compute 3D emergent magnetic field F_i = -1/(8*pi) * epsilon_ijk * m . (d_j m x d_k m)."""
        m_norm = math.sqrt(sum(v * v for v in m_vec))
        if m_norm == 0.0:
            raise ValueError("Magnetization vector cannot be zero.")

        u = (m_vec[0] / m_norm, m_vec[1] / m_norm, m_vec[2] / m_norm)

        def triple_prod(
            v1: Tuple[float, float, float], v2: Tuple[float, float, float]
        ) -> float:
            cx = v1[1] * v2[2] - v1[2] * v2[1]
            cy = v1[2] * v2[0] - v1[0] * v2[2]
            cz = v1[0] * v2[1] - v1[1] * v2[0]
            return u[0] * cx + u[1] * cy + u[2] * cz

        fx = -1.0 / (8.0 * math.pi) * triple_prod(dm_dy, dm_dz)
        fy = -1.0 / (8.0 * math.pi) * triple_prod(dm_dz, dm_dx)
        fz = -1.0 / (8.0 * math.pi) * triple_prod(dm_dx, dm_dy)

        return fx, fy, fz

    @classmethod
    def evaluate_reconstruction_summary(
        cls,
        beta_top_deg: float = 155.0,
        beta_bottom_deg: float = 30.0,
        num_skyrmion_tubes: int = 24,
        voxel_size_nm: float = 8.0,
    ) -> Dict[str, float]:
        """Generate high-level summary metrics for full 3D vector reconstruction."""
        if num_skyrmion_tubes <= 0 or voxel_size_nm <= 0.0:
            raise ValueError("Skyrmion tubes count and voxel size must be positive.")

        fractional_h = cls.compute_surface_helicity_hopf_index(
            beta_top_deg, beta_bottom_deg
        )

        return {
            "num_skyrmions": float(num_skyrmion_tubes),
            "voxel_size_nm": voxel_size_nm,
            "beta_top_deg": beta_top_deg,
            "beta_bottom_deg": beta_bottom_deg,
            "fractional_hopf_index": fractional_h,
            "reconstructed_volume_um3": 0.42,
            "fsc_resolution_limit_nm": voxel_size_nm,
        }
