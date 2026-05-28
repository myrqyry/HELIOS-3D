from pathlib import Path

import pytest

from scripts import check_links as links


def test_resolve_link_external() -> None:
    assert links.resolve_link(Path("/tmp/README.md"), "https://example.com") == (None, None)
    assert links.resolve_link(Path("/tmp/README.md"), "http://example.com") == (None, None)
    assert links.resolve_link(Path("/tmp/README.md"), "mailto:a@b.com") == (None, None)


def test_resolve_link_relative(tmp_path: Path) -> None:
    source = tmp_path / "docs" / "ABSTRACT.md"
    source.parent.mkdir(parents=True)
    target, anchor = links.resolve_link(source, "./CANDIDATE_MATERIALS.md")
    assert target == (tmp_path / "docs" / "CANDIDATE_MATERIALS.md").resolve()
    assert anchor is None


def test_resolve_link_with_anchor(tmp_path: Path) -> None:
    source = tmp_path / "docs" / "ABSTRACT.md"
    source.parent.mkdir(parents=True)
    target, anchor = links.resolve_link(source, "./CANDIDATE_MATERIALS.md#section")
    assert target == (tmp_path / "docs" / "CANDIDATE_MATERIALS.md").resolve()
    assert anchor == "section"


def test_resolve_link_pure_anchor(tmp_path: Path) -> None:
    source = tmp_path / "README.md"
    target, anchor = links.resolve_link(source, "#intro")
    assert target == source.resolve()
    assert anchor == "intro"


def test_check_links_detects_broken_file(tmp_path: Path, monkeypatch) -> None:
    write = lambda p, t: (p.parent.mkdir(parents=True, exist_ok=True), p.write_text(t, encoding="utf-8"))[1]
    write(tmp_path / "README.md", "[Broken](./NONEXISTENT.md)\n")
    monkeypatch.setattr(links, "REPO_ROOT", tmp_path)
    violations = links.run_link_checks(tmp_path)
    assert len(violations) == 1
    assert "NONEXISTENT.md" in violations[0].message


def test_check_links_detects_broken_anchor(tmp_path: Path, monkeypatch) -> None:
    write = lambda p, t: (p.parent.mkdir(parents=True, exist_ok=True), p.write_text(t, encoding="utf-8"))[1]
    write(tmp_path / "README.md", "[Bad anchor](./docs/OTHER.md#missing)\n")
    write(tmp_path / "docs" / "OTHER.md", "# Title\n")
    monkeypatch.setattr(links, "REPO_ROOT", tmp_path)
    violations = links.run_link_checks(tmp_path)
    assert len(violations) == 1
    assert "broken anchor" in violations[0].message


def test_check_links_allows_valid_anchor(tmp_path: Path, monkeypatch) -> None:
    write = lambda p, t: (p.parent.mkdir(parents=True, exist_ok=True), p.write_text(t, encoding="utf-8"))[1]
    write(tmp_path / "README.md", "[Good anchor](./docs/OTHER.md#existing-section)\n")
    write(tmp_path / "docs" / "OTHER.md", "# Existing Section\n")
    monkeypatch.setattr(links, "REPO_ROOT", tmp_path)
    violations = links.run_link_checks(tmp_path)
    assert len(violations) == 0


def test_check_links_allows_external(tmp_path: Path, monkeypatch) -> None:
    write = lambda p, t: (p.parent.mkdir(parents=True, exist_ok=True), p.write_text(t, encoding="utf-8"))[1]
    write(tmp_path / "README.md", "[External](https://example.com)\n")
    monkeypatch.setattr(links, "REPO_ROOT", tmp_path)
    violations = links.run_link_checks(tmp_path)
    assert len(violations) == 0
