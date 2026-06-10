import re
import sys
from dataclasses import dataclass
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
LINK_PATTERN = re.compile(r"\[([^\]]+)\]\(([^)]+)\)")
ANCHOR_PATTERN = re.compile(r"^#+")
EXCLUDED_DIRS: set[str] = set()
CONTENT_DIRS = ("src/content/docs", "research_specifications", "simulations", "notebooks")
CONTENT_GLOBS = ("*.md", "*.mdx")


@dataclass
class LinkViolation:
    source: str
    lineno: int
    link_text: str
    target: str
    message: str


def iter_markdown_files(repo_root: Path) -> list[Path]:
    files = [repo_root / name for name in ("README.md", "CONTRIBUTING.md", "ROADMAP.md")
             if (repo_root / name).exists()]
    # Scan Astro content docs/, research_specifications/, simulations/, notebooks/
    for subdir in CONTENT_DIRS:
        if (repo_root / subdir).exists():
            for ext in CONTENT_GLOBS:
                for path in sorted((repo_root / subdir).rglob(ext)):
                    rel = path.relative_to(repo_root).as_posix()
                    if any(rel.startswith(ex) for ex in EXCLUDED_DIRS):
                        continue
                    files.append(path)
    return files


def resolve_link(source: Path, target: str) -> tuple[Path | None, str | None]:
    """Resolve a markdown link target relative to the source file."""
    if target.startswith("http://") or target.startswith("https://"):
        return None, None  # Skip external links
    if target.startswith("mailto:"):
        return None, None

    # Split anchor from path
    if "#" in target:
        path_part, anchor = target.split("#", 1)
    else:
        path_part, anchor = target, None

    if not path_part:
        # Pure anchor link within same file
        return source, anchor

    # Resolve relative to source file's directory
    target_path = (source.parent / path_part).resolve()
    return target_path, anchor


def check_links_in_file(source: Path, all_files: set[str]) -> list[LinkViolation]:
    violations: list[LinkViolation] = []
    headers: set[str] = set()

    # Collect headers for anchor validation
    with open(source, "r", encoding="utf-8") as f:
        for line in f:
            m = ANCHOR_PATTERN.match(line.strip())
            if m:
                header_text = line.strip().lstrip("#").strip()
                # MkDocs slugifies headers: lowercase, spaces to hyphens, remove special chars
                slug = re.sub(r"[^\w\s-]", "", header_text).lower().strip().replace(" ", "-")
                headers.add(slug)

    with open(source, "r", encoding="utf-8") as f:
        for lineno, line in enumerate(f, 1):
            for match in LINK_PATTERN.finditer(line):
                link_text = match.group(1)
                target = match.group(2)
                target_path, anchor = resolve_link(source, target)
                if target_path is None:
                    continue  # External link

                # Check file exists
                repo_rel = target_path.relative_to(REPO_ROOT).as_posix()
                if repo_rel not in all_files:
                    violations.append(
                        LinkViolation(
                            source=str(source),
                            lineno=lineno,
                            link_text=link_text,
                            target=target,
                            message=f"broken link to missing file {repo_rel}",
                        )
                    )
                    continue

                # Check anchor exists
                if anchor:
                    # For anchor links to other files, we need to read that file's headers
                    if target_path != source:
                        target_headers: set[str] = set()
                        try:
                            with open(target_path, "r", encoding="utf-8") as tf:
                                for tline in tf:
                                    m = ANCHOR_PATTERN.match(tline.strip())
                                    if m:
                                        htext = tline.strip().lstrip("#").strip()
                                        tslug = re.sub(r"[^\w\s-]", "", htext).lower().strip().replace(" ", "-")
                                        target_headers.add(tslug)
                        except FileNotFoundError:
                            pass
                    else:
                        target_headers = headers

                    if anchor.lower() not in target_headers:
                        violations.append(
                            LinkViolation(
                                source=str(source),
                                lineno=lineno,
                                link_text=link_text,
                                target=target,
                                message=f"broken anchor #{anchor}",
                            )
                        )

    return violations


def run_link_checks(repo_root: Path) -> list[LinkViolation]:
    all_files = {
        p.relative_to(repo_root).as_posix()
        for p in iter_markdown_files(repo_root)
    }
    violations: list[LinkViolation] = []
    for source in iter_markdown_files(repo_root):
        violations.extend(check_links_in_file(source, all_files))
    return violations


def check_links(warn_only: bool = False) -> None:
    violations = run_link_checks(REPO_ROOT)
    if violations:
        for v in violations:
            print(f"Warning: {v.source}:{v.lineno} — [{v.link_text}]({v.target}) — {v.message}")
        if not warn_only:
            sys.exit(1)
    else:
        print("Link check passed!")


if __name__ == "__main__":
    warn_only = "--warn" in sys.argv
    check_links(warn_only=warn_only)
