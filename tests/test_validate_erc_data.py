import textwrap
from pathlib import Path

import pytest

from analysis import validate_erc_data as validator


def write(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(textwrap.dedent(text).lstrip(), encoding="utf-8")


def test_valid_csv_passes(tmp_path: Path, monkeypatch) -> None:
    data_file = tmp_path / "erc_core_temp_tolerance.csv"
    write(
        data_file,
        """
        # comment
        time,temperature_variance,accuracy
        0.0,-0.3,0.98
        1.0,0.0,0.98
        2.0,0.3,0.97
        """,
    )
    monkeypatch.setattr(validator, "DATA_FILE", data_file)
    validator.validate()  # should not raise


def test_missing_file_fails(tmp_path: Path, monkeypatch) -> None:
    data_file = tmp_path / "nonexistent.csv"
    monkeypatch.setattr(validator, "DATA_FILE", data_file)
    with pytest.raises(SystemExit):
        validator.validate()


def test_header_mismatch_fails(tmp_path: Path, monkeypatch) -> None:
    data_file = tmp_path / "erc_core_temp_tolerance.csv"
    write(
        data_file,
        """
        material_id,temperature_variance,erc_core_temp
        Fe3GaTe2,0.1,300
        """,
    )
    monkeypatch.setattr(validator, "DATA_FILE", data_file)
    with pytest.raises(SystemExit):
        validator.validate()


def test_invalid_type_fails(tmp_path: Path, monkeypatch) -> None:
    data_file = tmp_path / "erc_core_temp_tolerance.csv"
    write(
        data_file,
        """
        time,temperature_variance,accuracy
        0.0,foo,0.98
        """,
    )
    monkeypatch.setattr(validator, "DATA_FILE", data_file)
    with pytest.raises(SystemExit):
        validator.validate()


def test_out_of_bounds_accuracy_fails(tmp_path: Path, monkeypatch) -> None:
    data_file = tmp_path / "erc_core_temp_tolerance.csv"
    write(
        data_file,
        """
        time,temperature_variance,accuracy
        0.0,-0.3,1.05
        """,
    )
    monkeypatch.setattr(validator, "DATA_FILE", data_file)
    with pytest.raises(SystemExit):
        validator.validate()


def test_out_of_bounds_variance_fails(tmp_path: Path, monkeypatch) -> None:
    data_file = tmp_path / "erc_core_temp_tolerance.csv"
    write(
        data_file,
        """
        time,temperature_variance,accuracy
        0.0,-1.5,0.98
        """,
    )
    monkeypatch.setattr(validator, "DATA_FILE", data_file)
    with pytest.raises(SystemExit):
        validator.validate()
