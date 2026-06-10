import re
import sys
from dataclasses import dataclass
from pathlib import Path

# Patterns for claim tags and inline source citations
TAG_PATTERN = re.compile(r"\[(DEMONSTRATED|INFERRED|PROPOSED|SPECULATIVE)\]")
INLINE_SOURCE_PATTERN = re.compile(
    r"\[(?:DEMONSTRATED|INFERRED|PROPOSED|SPECULATIVE)\].*\[[^\]]+\d{4}[^\]]*\]"
)

REPO_ROOT = Path(__file__).resolve().parent.parent
docs_path = REPO_ROOT / "src" / "content" / "docs"
matrix_file = docs_path / "current" / "claims-matrix.mdx"
ROOT_MARKDOWN = ("README.md", "CONTRIBUTING.md", "ROADMAP.md")
EXCLUDED_DIRS: set[str] = set()
CONTENT_GLOBS = ("*.md", "*.mdx")


@dataclass
class Violation:
    path: str
    lineno: int
    message: str


def extract_registered_paths(matrix_text: str) -> set[str]:
    """Parse claims-matrix.mdx and extract repo-relative paths from the Tag column."""
    registered: set[str] = set()
    for line in matrix_text.splitlines():
        if "|" not in line or line.strip().startswith("| ---"):
            continue
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        if len(cells) < 2 or cells[0] == "Claim":
            continue
        tag_cell = cells[1]
        for match in re.finditer(r"`([^`]+\.(?:md|mdx))`", tag_cell):
            raw = match.group(1)
            registered.add(raw)
            normalized = raw
            if not normalized.startswith("docs/") and not normalized.startswith("src/content/docs/") and normalized not in ROOT_MARKDOWN:
                normalized = f"src/content/docs/{normalized}"
            registered.add(normalized)
            registered.add(Path(raw).name)
    return registered


def iter_candidate_markdown_files(repo_root: Path) -> list[Path]:
    """Yield root Markdown files and all Astro content docs/*.{md,mdx} files except CLAIMS_MATRIX.md and excluded dirs."""
    files = [repo_root / name for name in ROOT_MARKDOWN if (repo_root / name).exists()]
    if docs_path.exists():
        for ext in CONTENT_GLOBS:
            for path in sorted(docs_path.rglob(ext)):
                rel = path.relative_to(repo_root).as_posix()
                if any(rel.startswith(ex) for ex in EXCLUDED_DIRS):
                    continue
                files.append(path)
    return [p for p in files if p.name not in {"CLAIMS_MATRIX.md", "claims-matrix.mdx"}]


def _is_false_positive(line: str) -> bool:
    """Return True if a line containing a tag should NOT require a citation."""
    stripped = line.strip()

    # Skip markdown table rows (tags in cells are structural, not prose claims)
    if stripped.startswith("|"):
        return True

    # Skip tag definitions: tag is in backticks, e.g. `\`[DEMONSTRATED]\``: description
    if re.search(r"`\[(?:DEMONSTRATED|INFERRED|PROPOSED|SPECULATIVE)\]`", stripped):
        return True

    # Skip status labels, e.g. *   **Status:** `[SPECULATIVE]`
    if re.search(r"Status[:\s]+\[(?:DEMONSTRATED|INFERRED|PROPOSED|SPECULATIVE)\]", stripped):
        return True

    # Skip blockquotes (often pull quotes or asides)
    if stripped.startswith(">"):
        return True

    return False


def check_file_for_tags(path: Path) -> list[Violation]:
    """Scan a single markdown file for claim-tag discipline violations."""
    violations: list[Violation] = []
    with open(path, "r", encoding="utf-8") as f:
        in_code_block = False
        for lineno, line in enumerate(f, 1):
            if line.strip().startswith("```"):
                in_code_block = not in_code_block
                continue
            if in_code_block:
                continue
            if TAG_PATTERN.search(line) and not _is_false_positive(line):
                if not INLINE_SOURCE_PATTERN.search(line):
                    violations.append(
                        Violation(
                            path=str(path),
                            lineno=lineno,
                            message="tagged line has no inline source citation",
                        )
                    )
    return violations


def run_claim_checks(repo_root: Path) -> list[Violation]:
    """Run full claim validation across the repository."""
    violations: list[Violation] = []

    if not matrix_file.exists():
        violations.append(
            Violation(path=str(matrix_file), lineno=0, message="claims-matrix.mdx not found")
        )
        return violations

    matrix_content = matrix_file.read_text(encoding="utf-8")
    registered = extract_registered_paths(matrix_content)

    for filepath in iter_candidate_markdown_files(repo_root):
        repo_rel = filepath.relative_to(repo_root).as_posix()
        file_violations = check_file_for_tags(filepath)
        violations.extend(file_violations)

        lines = filepath.read_text(encoding="utf-8").splitlines()
        meaningful_tags = any(
            TAG_PATTERN.search(line) and not _is_false_positive(line)
            for line in lines
        )
        has_tags = bool(file_violations) or meaningful_tags

        if has_tags and repo_rel not in registered:
            # Check if only basename matches (path ambiguity warning)
            if filepath.name in registered:
                violations.append(
                    Violation(
                        path=repo_rel,
                        lineno=0,
                        message=(
                            "contains research tags but is only registered by basename; "
                            "use repo-relative path in CLAIMS_MATRIX.md"
                        ),
                    )
                )
            else:
                violations.append(
                    Violation(
                        path=repo_rel,
                        lineno=0,
                        message="contains research tags but is not registered in CLAIMS_MATRIX.md",
                    )
                )

    return violations


def check_claims(warn_only: bool = False) -> None:
    violations = run_claim_checks(REPO_ROOT)
    if violations:
        for v in violations:
            if v.lineno:
                print(f"Warning: {v.path}:{v.lineno} — {v.message}")
            else:
                print(f"Warning: {v.path} — {v.message}")
        if not warn_only:
            sys.exit(1)
    else:
        print("Claims check passed!")


if __name__ == "__main__":
    warn_only = "--warn" in sys.argv
    check_claims(warn_only=warn_only)
