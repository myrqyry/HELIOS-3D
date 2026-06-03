import pytest
import numpy as np
from compiler.mapping import TopologicalCompiler, HopfionSpec

def test_coordinate_mapping_fidelity():
    """
    Test 1.1: Verify that semantic embeddings map to valid trapping centers.
    Success Metric: < 5% spatial overlap between neighboring hopfions.
    """
    compiler = TopologicalCompiler(moiré_period=300.0)
    # Embedding with high values in first two slots -> should create 2 hopfions
    embedding = np.array([0.9, 0.8, 0.1, 0.2])
    specs = compiler.compile_semantic_to_geom(embedding)

    assert len(specs) == 2
    assert specs[0].x == 0.0
    assert specs[0].y == 0.0
    assert specs[1].x == 300.0
    assert specs[1].y == 0.0

    # Overlap check
    dist = np.sqrt((specs[0].x - specs[1].x)**2 + (specs[0].y - specs[1].y)**2)
    radius_sum = specs[0].radius + specs[1].radius
    overlap = max(0, radius_sum - dist)
    
    assert overlap / dist < 0.05

def test_mock_hopf_index_placeholder():
    """
    PLACEHOLDER TEST (mock physics adapter):
    The current calculate_hopf_index returns a hardcoded 1.0.
    This test documents the mock behavior until a real discretized
    Hopf index implementation is added.
    """
    compiler = TopologicalCompiler()
    m_tensor = np.zeros((3, 64, 64, 64))
    
    qh = compiler.calculate_hopf_index(m_tensor)
    
    assert qh == 1.0  # Mock return value — replace when real implementation exists

def test_ife_transfer_function():
    """
    Test 2.1: Verify IFE write phase produces target magnetization peaks.
    Success Metric: 100% nucleation yield in mock tensor.
    """
    compiler = TopologicalCompiler(moiré_period=300.0)
    embedding = np.array([1.0, 0.0, 0.0, 0.0])
    specs = compiler.compile_semantic_to_geom(embedding)
    
    m_tensor = compiler.simulate_ife_write(specs)
    
    # Check for core orientation at (0, 0, 32)
    # Scaled coordinate: x/10 = 0
    assert m_tensor[2, 0, 0, 32] == 1.0
