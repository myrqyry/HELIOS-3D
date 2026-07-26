"""Unit tests for Incoherent Milnor Polynomial encoding module."""

import pytest
from analysis.incoherent_milnor_encoding import IncoherentMilnorEncoder


def test_stereographic_projection_unit_circle() -> None:
    u, v = IncoherentMilnorEncoder.stereographic_projection(0.0, 0.0, 0.0)
    assert u == complex(-1.0, 0.0)
    assert v == complex(0.0, 0.0)


def test_degree_of_coherence_self_correlation() -> None:
    encoder = IncoherentMilnorEncoder(braid_type="trefoil")
    r1 = (0.5, 0.5, 0.0)
    mu_self = encoder.compute_degree_of_coherence(r1, r1)
    # Self degree of coherence μ(r1, r1) must be 1.0
    assert pytest.approx(abs(mu_self), rel=1e-3) == 1.0


def test_degree_of_coherence_modulus_bound() -> None:
    encoder = IncoherentMilnorEncoder(braid_type="hopf")
    r1 = (0.2, 0.3, 0.1)
    r2 = (0.7, -0.4, 0.5)
    mu = encoder.compute_degree_of_coherence(r1, r2)
    assert abs(mu) <= 1.0 + 1e-6


def test_braid_roots_trefoil_vs_hopf() -> None:
    enc_trefoil = IncoherentMilnorEncoder(braid_type="trefoil")
    enc_hopf = IncoherentMilnorEncoder(braid_type="hopf")

    roots_trefoil = enc_trefoil.compute_braid_roots(h=1.0)
    roots_hopf = enc_hopf.compute_braid_roots(h=1.0)

    assert len(roots_trefoil) == 2
    assert len(roots_hopf) == 2
    assert roots_trefoil != roots_hopf


def test_encode_dual_payload() -> None:
    encoder = IncoherentMilnorEncoder(braid_type="trefoil")
    payload = encoder.encode_dual_payload(braid_key="sigma_1^+3", statistical_intensity=[0.1, 0.8, 0.3])
    assert payload["topological_key"] == "sigma_1^+3"
    assert payload["braid_type"] == "trefoil"
    assert payload["status"] == "encrypted"


def test_invalid_parameters_raise_errors() -> None:
    with pytest.raises(ValueError, match="braid_type must be"):
        IncoherentMilnorEncoder(braid_type="invalid_braid")

    with pytest.raises(ValueError, match="beam_width must be positive"):
        IncoherentMilnorEncoder(beam_width=-1.0)
