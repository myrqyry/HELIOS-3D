"""Protocol contract tests for CompilerAdapter.

These tests define the adapter interface contract. Any adapter — mock or real —
must pass these tests to be a valid CompilerAdapter.
"""

import numpy as np
import pytest

from compiler import CompilerAdapter, HopfionSpec
from compiler.mock_adapter import MockCompilerAdapter


class TestProtocolCompliance:
    """Verify the mock adapter satisfies CompilerAdapter."""

    def test_mock_satisfies_protocol(self):
        adapter = MockCompilerAdapter()
        assert isinstance(adapter, CompilerAdapter)

    def test_custom_object_satisfies_protocol(self):
        """Any object with matching methods satisfies Protocol."""
        class StubAdapter:
            def compile_semantic_to_geom(self, embedding):
                return []
            def simulate_ife_write(self, specs):
                return np.zeros((3, 1, 1, 1))

        assert isinstance(StubAdapter(), CompilerAdapter)


class TestCompileContract:
    """Contract: compile_semantic_to_geom maps embeddings to HopfionSpec lists."""

    def test_returns_list_of_hopfion_spec(self):
        adapter = MockCompilerAdapter()
        embedding = np.array([0.9, 0.8, 0.1, 0.2])
        specs = adapter.compile_semantic_to_geom(embedding)

        assert isinstance(specs, list)
        assert all(isinstance(s, HopfionSpec) for s in specs)

    def test_empty_embedding_yields_no_specs(self):
        adapter = MockCompilerAdapter()
        specs = adapter.compile_semantic_to_geom(np.array([]))
        assert specs == []

    def test_specs_have_required_fields(self):
        adapter = MockCompilerAdapter()
        specs = adapter.compile_semantic_to_geom(np.array([1.0]))

        assert len(specs) == 1
        spec = specs[0]
        assert hasattr(spec, "x")
        assert hasattr(spec, "y")
        assert hasattr(spec, "z")
        assert hasattr(spec, "radius")
        assert hasattr(spec, "hopf_index")


class TestIfeWriteContract:
    """Contract: simulate_ife_write produces a 3D magnetization tensor."""

    def test_returns_ndarray(self):
        adapter = MockCompilerAdapter()
        specs = [HopfionSpec(x=0, y=0, z=0, radius=10, hopf_index=1)]
        tensor = adapter.simulate_ife_write(specs)

        assert isinstance(tensor, np.ndarray)

    def test_tensor_has_spatial_dimensions(self):
        adapter = MockCompilerAdapter()
        specs = [HopfionSpec(x=0, y=0, z=0, radius=10, hopf_index=1)]
        tensor = adapter.simulate_ife_write(specs)

        assert tensor.ndim == 4
        assert tensor.shape[0] == 3  # 3 magnetization components

    def test_empty_specs_produces_valid_tensor(self):
        adapter = MockCompilerAdapter()
        tensor = adapter.simulate_ife_write([])

        assert isinstance(tensor, np.ndarray)
        assert tensor.ndim == 4
