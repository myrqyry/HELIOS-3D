from pathlib import Path

import pytest

SIMULATIONS_DIR = Path(__file__).resolve().parent.parent / "simulations"
PLACEHOLDERS_DIR = SIMULATIONS_DIR / "placeholders"


def _iter_simulation_files() -> list[Path]:
    files: list[Path] = []
    for ext in ("*.mx3", "*.mif"):
        files.extend(SIMULATIONS_DIR.rglob(ext))
    return files


def test_no_undefined_functions_in_runnable_sims() -> None:
    """
    Scan all runnable simulation files for calls to known undefined functions.
    """
    undefined_functions = ("h_texture",)
    for filepath in _iter_simulation_files():
        # Skip explicitly marked placeholders
        content = filepath.read_text(encoding="utf-8")
        if "NOT RUNNABLE" in content or "PLACEHOLDER" in content:
            continue
        for func in undefined_functions:
            assert func not in content, (
                f"{filepath.name} calls undefined function {func}() "
                f"without being marked as a placeholder"
            )


def test_all_placeholders_are_marked() -> None:
    """
    Every file in simulations/placeholders/ must contain a NOT RUNNABLE marker.
    """
    if not PLACEHOLDERS_DIR.exists():
        pytest.skip("No placeholders directory")
    for filepath in PLACEHOLDERS_DIR.iterdir():
        if filepath.suffix in (".mx3", ".mif"):
            content = filepath.read_text(encoding="utf-8")
            assert "NOT RUNNABLE" in content or "PLACEHOLDER" in content, (
                f"Placeholder {filepath.name} missing status marker"
            )


def test_oommf_sim_has_dependency_comment() -> None:
    """
    OOMMF .mif files should document external dependencies.
    """
    for filepath in SIMULATIONS_DIR.rglob("*.mif"):
        content = filepath.read_text(encoding="utf-8")
        assert "DEPENDENCY" in content or "Requires" in content, (
            f"{filepath.name} should document its external dependencies"
        )
