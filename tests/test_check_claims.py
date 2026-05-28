from pathlib import Path
import textwrap
import pytest

from scripts import check_claims as claims


def write(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(textwrap.dedent(text).lstrip(), encoding="utf-8")


def test_extract_registered_paths_uses_tag_column() -> None:
    matrix = """
    | Claim | Tag | Source anchor | Source conditions | Failure mode | Promotion or demotion test |
    | --- | --- | --- | --- | --- | --- |
    | Example claim | `README.md`, `docs/OPEN_QUESTIONS.md` | x | y | z | w |
    """
    paths = claims.extract_registered_paths(matrix)
    assert "README.md" in paths
    assert "docs/OPEN_QUESTIONS.md" in paths


def test_extract_registered_paths_normalizes_docs_prefix() -> None:
    matrix = """
    | Claim | Tag | Source anchor | Source conditions | Failure mode | Promotion or demotion test |
    | --- | --- | --- | --- | --- | --- |
    | Example claim | `OPEN_QUESTIONS.md` | x | y | z | w |
    """
    paths = claims.extract_registered_paths(matrix)
    assert "OPEN_QUESTIONS.md" in paths
    assert "docs/OPEN_QUESTIONS.md" in paths


def test_root_markdown_is_scanned(tmp_path: Path, monkeypatch) -> None:
    write(tmp_path / "README.md", "Tagged claim [SPECULATIVE] [Smith 2024]\n")
    write(
        tmp_path / "docs" / "CLAIMS_MATRIX.md",
        """
        | Claim | Tag | Source anchor | Source conditions | Failure mode | Promotion or demotion test |
        | --- | --- | --- | --- | --- | --- |
        | Example claim | `README.md` | x | y | z | w |
        """,
    )
    monkeypatch.setattr(claims, "REPO_ROOT", tmp_path)
    monkeypatch.setattr(claims, "docs_path", tmp_path / "docs")
    monkeypatch.setattr(claims, "matrix_file", tmp_path / "docs" / "CLAIMS_MATRIX.md")
    claims.check_claims()  # should not raise


def test_missing_inline_source_fails(tmp_path: Path, monkeypatch) -> None:
    write(tmp_path / "docs" / "OPEN_QUESTIONS.md", "Tagged claim [SPECULATIVE]\n")
    write(
        tmp_path / "docs" / "CLAIMS_MATRIX.md",
        """
        | Claim | Tag | Source anchor | Source conditions | Failure mode | Promotion or demotion test |
        | --- | --- | --- | --- | --- | --- |
        | Example claim | `docs/OPEN_QUESTIONS.md` | x | y | z | w |
        """,
    )
    monkeypatch.setattr(claims, "REPO_ROOT", tmp_path)
    monkeypatch.setattr(claims, "docs_path", tmp_path / "docs")
    monkeypatch.setattr(claims, "matrix_file", tmp_path / "docs" / "CLAIMS_MATRIX.md")
    with pytest.raises(SystemExit):
        claims.check_claims()


def test_unregistered_tagged_file_fails(tmp_path: Path, monkeypatch) -> None:
    write(tmp_path / "docs" / "UNREGISTERED.md", "Tagged claim [SPECULATIVE] [Smith 2024]\n")
    write(
        tmp_path / "docs" / "CLAIMS_MATRIX.md",
        """
        | Claim | Tag | Source anchor | Source conditions | Failure mode | Promotion or demotion test |
        | --- | --- | --- | --- | --- | --- |
        """,
    )
    monkeypatch.setattr(claims, "REPO_ROOT", tmp_path)
    monkeypatch.setattr(claims, "docs_path", tmp_path / "docs")
    monkeypatch.setattr(claims, "matrix_file", tmp_path / "docs" / "CLAIMS_MATRIX.md")
    with pytest.raises(SystemExit):
        claims.check_claims()


def test_check_file_for_tags_detects_missing_citation(tmp_path: Path) -> None:
    path = tmp_path / "test.md"
    path.write_text("Some claim [SPECULATIVE] without citation\n", encoding="utf-8")
    violations = claims.check_file_for_tags(path)
    assert len(violations) == 1
    assert "no inline source citation" in violations[0].message


def test_check_file_for_tags_allows_cited_line(tmp_path: Path) -> None:
    path = tmp_path / "test.md"
    path.write_text("Some claim [SPECULATIVE] [Smith 2024]\n", encoding="utf-8")
    violations = claims.check_file_for_tags(path)
    assert len(violations) == 0
