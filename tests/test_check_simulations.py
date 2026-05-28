from pathlib import Path

import pytest

from scripts import check_simulations as sims


def test_mumax3_missing_gridsize(tmp_path: Path) -> None:
    path = tmp_path / "test.mx3"
    path.write_text("Msat = 800e3\nMinimize()\n", encoding="utf-8")
    violations = sims.check_mumax3_syntax(path)
    assert any("SetGridsize" in v.message for v in violations)


def test_mumax3_missing_cellsize(tmp_path: Path) -> None:
    path = tmp_path / "test.mx3"
    path.write_text("SetGridsize(128, 128, 32)\nMinimize()\n", encoding="utf-8")
    violations = sims.check_mumax3_syntax(path)
    assert any("SetCellsize" in v.message for v in violations)


def test_mumax3_undefined_function(tmp_path: Path) -> None:
    path = tmp_path / "test.mx3"
    path.write_text(
        "SetGridsize(128, 128, 32)\nSetCellsize(1e-9, 1e-9, 1e-9)\n"
        "m = h_texture(2, 1, 0)\nMinimize()\n",
        encoding="utf-8",
    )
    violations = sims.check_mumax3_syntax(path)
    assert any("h_texture" in v.message for v in violations)


def test_mumax3_valid_syntax(tmp_path: Path) -> None:
    path = tmp_path / "test.mx3"
    path.write_text(
        "SetGridsize(128, 128, 32)\nSetCellsize(1e-9, 1e-9, 1e-9)\n"
        "Msat = 800e3\nMinimize()\nSaveAs(m, \"out\")\n",
        encoding="utf-8",
    )
    violations = sims.check_mumax3_syntax(path)
    assert len(violations) == 0


def test_oommf_unbalanced_braces(tmp_path: Path) -> None:
    path = tmp_path / "test.mif"
    path.write_text(
        'Specify Oxs_BoxAtlas:atlas {\n  xrange {0 100e-9}\n}\n',
        encoding="utf-8",
    )
    violations = sims.check_oommf_syntax(path)
    assert len(violations) == 0


def test_oommf_missing_specify(tmp_path: Path) -> None:
    path = tmp_path / "test.mif"
    path.write_text("# comment\nA = 1\n", encoding="utf-8")
    violations = sims.check_oommf_syntax(path)
    assert any("Specify" in v.message for v in violations)
