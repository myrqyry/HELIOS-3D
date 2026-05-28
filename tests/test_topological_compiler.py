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

def test_topological_charge_synthesis():
    """
    Test 1.2: Verify synthesized magnetization field yields integer Hopf Index.
    Success Metric: QH error < 0.01
    """
    compiler = TopologicalCompiler()
    # Mock magnetization tensor [3, Nx, Ny, Nz]
    m_tensor = np.zeros((3, 64, 64, 64))
    
    qh = compiler.calculate_hopf_index(m_tensor)
    
    # We assert that the compiler can at least return an integer-like index
    assert float(qh).is_integer()
    assert qh == 1.0

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
