"""Unit tests for fractal texture analysis tool."""

import pytest
from analysis.fractal_texture_analysis import FractalTextureAnalyzer


def test_compute_semi_ellipse_geometry() -> None:
    area = FractalTextureAnalyzer.compute_semi_ellipse_area(semi_major_a=412.0, semi_minor_b=206.0)
    perimeter = FractalTextureAnalyzer.compute_semi_ellipse_perimeter(semi_major_a=412.0, semi_minor_b=206.0)
    assert area == pytest.approx(133316.6258, rel=1e-3)
    assert perimeter == pytest.approx(1409.9074, rel=1e-3)


def test_compute_fractal_dimension_bounds() -> None:
    # Test primary vortex V1 dimension (should match Basak et al. ~1.2290)
    d1 = FractalTextureAnalyzer.compute_ellipse_fractal_dimension(semi_major_a=412.0, semi_minor_b=206.0)
    assert 1.0 < d1 < 2.0
    assert d1 == pytest.approx(1.2290, abs=0.01)


def test_cascade_fractal_dimension_monotonicity() -> None:
    profile = FractalTextureAnalyzer.generate_cascade_scaling_profile(
        primary_semi_major_a=412.0, primary_semi_minor_b=206.0, num_levels=7
    )
    assert len(profile) == 7
    # Fractal dimension should increase monotonically as nested scale contracts
    for i in range(len(profile) - 1):
        assert profile[i + 1]["fractal_dimension"] > profile[i]["fractal_dimension"]
        assert profile[i]["fractal_dimension"] > 1.0
        assert profile[i]["fractal_dimension"] < 2.0

    # Level 7 dimension should approach ~1.78
    assert profile[6]["fractal_dimension"] == pytest.approx(1.7758, abs=0.05)


def test_invalid_inputs_raise_errors() -> None:
    with pytest.raises(ValueError, match="Semi-axes a and b must be positive"):
        FractalTextureAnalyzer.compute_semi_ellipse_area(semi_major_a=-1.0, semi_minor_b=10.0)

    with pytest.raises(ValueError, match="Perimeter must be strictly greater"):
        FractalTextureAnalyzer.compute_fractal_dimension(perimeter=0.5, area=100.0)

    with pytest.raises(ValueError, match="Vortex index n must be a positive integer"):
        FractalTextureAnalyzer.predict_cascade_fractal_dimension(primary_perimeter=100.0, primary_area=500.0, vortex_index_n=0)
