"""Mock-specific tests for MockCompilerAdapter.

These tests validate the mock adapter's concrete behavior.
For protocol contract tests, see test_compiler_protocol.py.
"""

import numpy as np
import pytest

from compiler.mock_adapter import MockCompilerAdapter
from compiler.mapping import calculate_hopf_index


class TestMockCoordinateMapping:
    """Mock behavior: embeddings map to specific grid centers."""

    def test_high_values_create_hopfions(self):
        adapter = MockCompilerAdapter(moiré_period=300.0)
        embedding = np.array([0.9, 0.8, 0.1, 0.2])
        specs = adapter.compile_semantic_to_geom(embedding)

        assert len(specs) == 2
        assert specs[0].x == 0.0
        assert specs[0].y == 0.0
        assert specs[1].x == 300.0
        assert specs[1].y == 0.0

    def test_spatial_overlap_below_threshold(self):
        adapter = MockCompilerAdapter(moiré_period=300.0)
        embedding = np.array([0.9, 0.8, 0.1, 0.2])
        specs = adapter.compile_semantic_to_geom(embedding)

        dist = np.sqrt((specs[0].x - specs[1].x)**2 + (specs[0].y - specs[1].y)**2)
        radius_sum = specs[0].radius + specs[1].radius
        overlap = max(0, radius_sum - dist)

        assert overlap / dist < 0.05


class TestMockHopfIndex:
    """Mock behavior: calculate_hopf_index returns hardcoded 1.0."""

    def test_returns_mock_value(self):
        m_tensor = np.zeros((3, 64, 64, 64))
        qh = calculate_hopf_index(m_tensor)
        assert qh == 1.0


class TestMockIfeWrite:
    """Mock behavior: IFE write produces expected tensor structure."""

    def test_nucleation_at_expected_position(self):
        adapter = MockCompilerAdapter(moiré_period=300.0)
        embedding = np.array([1.0, 0.0, 0.0, 0.0])
        specs = adapter.compile_semantic_to_geom(embedding)

        m_tensor = adapter.simulate_ife_write(specs)

        # Mock adapter places nucleation at (0, 0, grid_size//2)
        grid_size = m_tensor.shape[1]
        assert m_tensor[2, 0, 0, grid_size // 2] == 1.0

    def test_grid_infers_from_specs(self):
        adapter = MockCompilerAdapter(moiré_period=300.0)
        specs = [__import__("compiler.protocols", fromlist=["HopfionSpec"]).HopfionSpec(
            x=0, y=0, z=0, radius=75, hopf_index=1
        )]
        tensor = adapter.simulate_ife_write(specs)

        # Grid should be a power of two, large enough for the specs
        assert tensor.shape[1] == tensor.shape[2] == tensor.shape[3]
        assert tensor.shape[1] >= 1

    def test_empty_specs_yields_minimal_tensor(self):
        adapter = MockCompilerAdapter()
        tensor = adapter.simulate_ife_write([])

        assert tensor.shape == (3, 1, 1, 1)
