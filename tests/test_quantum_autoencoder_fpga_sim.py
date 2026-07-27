"""Unit tests for Quantum Autoencoder FPGA simulator module."""

import math
import pytest
from analysis.quantum_autoencoder_fpga_sim import QuantumAutoencoderFPGASimulator


def test_embed_particle_features_clipping() -> None:
    sim = QuantumAutoencoderFPGASimulator()
    # Test normal range
    theta_pt, theta_eta, theta_phi = sim.embed_particle_features(p_t=10.0, eta=1.5, phi=1.0)
    assert 0.0 <= theta_pt <= math.pi
    assert -math.pi <= theta_eta <= math.pi
    assert -math.pi <= theta_phi <= math.pi

    # Test extreme clipping bounds
    theta_pt_max, theta_eta_max, theta_phi_max = sim.embed_particle_features(p_t=1e6, eta=10.0, phi=5.0)
    assert math.isclose(theta_pt_max, math.pi, rel_tol=1e-5)
    assert math.isclose(theta_eta_max, math.pi, rel_tol=1e-5)
    assert math.isclose(theta_phi_max, math.pi, rel_tol=1e-5)


def test_bisect_register_by_qmi() -> None:
    sim = QuantumAutoencoderFPGASimulator()
    features = [float(i) for i in range(10)]
    sub0, sub1 = sim.bisect_register_by_qmi(features)
    assert len(sub0) == 5
    assert len(sub1) == 5
    assert sub0 == [0.0, 1.0, 2.0, 3.0, 4.0]
    assert sub1 == [5.0, 6.0, 7.0, 8.0, 9.0]


def test_trash_wire_zscores_anomaly_scoring() -> None:
    sim = QuantumAutoencoderFPGASimulator()
    z_exps = [0.8, -0.5, 0.2, -0.9]
    mus = [0.1, 0.1, 0.1, 0.1]
    sigmas = [0.2, 0.2, 0.2, 0.2]

    scores = sim.compute_trash_wire_zscores(z_exps, mus, sigmas)
    assert scores["num_trash_wires"] == 4.0
    assert scores["top2_anomaly_score"] > 0.0


def test_quantize_fixed_point() -> None:
    sim = QuantumAutoencoderFPGASimulator()
    val = 1.23456789
    q_val = sim.quantize_fixed_point(val, total_bits=14, int_bits=3)
    assert math.isclose(q_val, val, abs_tol=0.01)


def test_estimate_fpga_performance() -> None:
    sim = QuantumAutoencoderFPGASimulator()
    perf = sim.estimate_fpga_performance()
    assert perf["qae_latency_us"] == 0.47
    assert perf["sub_microsecond_capable"] == 1.0
    assert perf["trainable_parameters"] == 23.0


def test_invalid_parameters_raise_errors() -> None:
    with pytest.raises(ValueError, match="Qubits, trainable parameters, and clock period must be positive"):
        QuantumAutoencoderFPGASimulator(num_qubits=0)

    sim = QuantumAutoencoderFPGASimulator()
    with pytest.raises(ValueError, match="Input feature vector must contain exactly 10 features"):
        sim.bisect_register_by_qmi([1.0, 2.0])

    with pytest.raises(ValueError, match="Mismatched dimensions"):
        sim.compute_trash_wire_zscores([0.5], [0.1, 0.2], [0.1])
