"""Unit tests for STORM RDMA transport simulator module."""

import pytest
from analysis.storm_rdma_transport_sim import (
    BinaryTreeTerminationDetector,
    SPSCBufferHandler,
    STORMTransportSimulator,
)


def test_spsc_ring_buffer_push_pop() -> None:
    handler = SPSCBufferHandler(sender_rank=0, receiver_rank=1, buffsize=16)
    assert handler.occupied == 0
    assert handler.free_space == 16

    particles = [{"id": float(i), "energy": 1.0} for i in range(5)]
    written = handler.write_particles(particles)
    assert written == 5
    assert handler.occupied == 5
    assert handler.free_space == 11
    assert handler.tail == 5

    read_p = handler.read_particles()
    assert len(read_p) == 5
    assert handler.occupied == 0
    assert handler.head == 5


def test_spsc_ring_buffer_overflow_raises_error() -> None:
    handler = SPSCBufferHandler(sender_rank=0, receiver_rank=1, buffsize=4)
    particles = [{"id": float(i)} for i in range(5)]
    with pytest.raises(BufferError, match="Handler buffer overflow"):
        handler.write_particles(particles)


def test_spsc_ring_buffer_reallocation() -> None:
    handler = SPSCBufferHandler(sender_rank=0, receiver_rank=1, buffsize=4)
    handler.write_particles([{"id": 1.0}, {"id": 2.0}])
    handler.resize_buffer(new_buffsize=16)
    assert handler.buffsize == 16
    assert handler.occupied == 2
    read_p = handler.read_particles()
    assert len(read_p) == 2


def test_binary_tree_termination_detector() -> None:
    detector = BinaryTreeTerminationDetector(num_ranks=4)
    detector.record_particle_creation(rank=0, count=10)
    detector.record_particle_creation(rank=1, count=5)
    assert not detector.verify_termination()

    detector.record_particle_completion(rank=0, count=10)
    detector.record_particle_completion(rank=1, count=5)
    assert detector.verify_termination()


def test_storm_transport_simulator_speedup() -> None:
    sim = STORMTransportSimulator(num_ranks=40, batch_threshold=64)
    results = sim.simulate_transport_speedup(total_particles=500000, inter_rank_ratio=0.4)
    assert results["num_ranks"] == 40.0
    assert results["speedup_ratio"] > 1.0
    assert results["progress_overhead_reduction_factor"] == 6.1


def test_invalid_parameters_raise_errors() -> None:
    with pytest.raises(ValueError, match="buffsize must be a positive integer"):
        SPSCBufferHandler(sender_rank=0, receiver_rank=1, buffsize=0)

    with pytest.raises(ValueError, match="num_ranks must be positive"):
        BinaryTreeTerminationDetector(num_ranks=0)

    with pytest.raises(ValueError, match="num_ranks and batch_threshold must be positive"):
        STORMTransportSimulator(num_ranks=0)
