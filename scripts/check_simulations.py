import re
import sys
from dataclasses import dataclass
from pathlib import Path

SIMULATIONS_DIR = Path(__file__).resolve().parent.parent / "simulations"


@dataclass
class SimViolation:
    path: str
    lineno: int
    message: str


def check_mumax3_syntax(path: Path) -> list[SimViolation]:
    violations: list[SimViolation] = []
    content = path.read_text(encoding="utf-8")
    lines = content.splitlines()

    has_gridsize = False
    has_cellsize = False
    has_minimize_or_run = False
    defined_funcs: set[str] = set()
    called_funcs: list[tuple[int, str]] = []

    for lineno, line in enumerate(lines, 1):
        stripped = line.strip()
        if stripped.startswith("//"):
            continue

        # Track defined functions
        if "def " in stripped.lower():
            m = re.search(r"def\s+(\w+)", stripped, re.IGNORECASE)
            if m:
                defined_funcs.add(m.group(1))

        # Track function calls
        for match in re.finditer(r"(\w+)\s*\(", stripped):
            func_name = match.group(1)
            if func_name in (
                "SetGridsize", "SetCellsize", "Minimize", "Run",
                "SaveAs", "tableadd", "autosave", "Set",
                "if", "for", "while", "switch", "return",
            ):
                continue
            called_funcs.append((lineno, func_name))

        if "SetGridsize" in stripped:
            has_gridsize = True
        if "SetCellsize" in stripped:
            has_cellsize = True
        if "Minimize" in stripped or "Run(" in stripped:
            has_minimize_or_run = True

    if not has_gridsize:
        violations.append(SimViolation(str(path), 0, "missing SetGridsize call"))
    if not has_cellsize:
        violations.append(SimViolation(str(path), 0, "missing SetCellsize call"))
    if not has_minimize_or_run:
        violations.append(SimViolation(str(path), 0, "missing Minimize() or Run() call"))

    for lineno, func in called_funcs:
        if func not in defined_funcs:
            violations.append(
                SimViolation(str(path), lineno, f"call to undefined function '{func}'")
            )

    return violations


def check_oommf_syntax(path: Path) -> list[SimViolation]:
    violations: list[SimViolation] = []
    content = path.read_text(encoding="utf-8")
    lines = content.splitlines()

    has_specify = False
    brace_depth = 0
    max_depth = 0

    for lineno, line in enumerate(lines, 1):
        stripped = line.strip()
        if stripped.startswith("#"):
            continue

        if "Specify" in stripped:
            has_specify = True

        for ch in stripped:
            if ch == "{":
                brace_depth += 1
                max_depth = max(max_depth, brace_depth)
            elif ch == "}":
                brace_depth -= 1
                if brace_depth < 0:
                    violations.append(
                        SimViolation(str(path), lineno, "unbalanced closing brace")
                    )
                    brace_depth = 0

    if brace_depth != 0:
        violations.append(SimViolation(str(path), 0, "unbalanced braces in file"))

    if not has_specify:
        violations.append(SimViolation(str(path), 0, "no Specify blocks found"))

    return violations


def check_simulations() -> None:
    violations: list[SimViolation] = []

    for path in SIMULATIONS_DIR.rglob("*.mx3"):
        if "NOT RUNNABLE" in path.read_text(encoding="utf-8"):
            continue
        violations.extend(check_mumax3_syntax(path))

    for path in SIMULATIONS_DIR.rglob("*.mif"):
        violations.extend(check_oommf_syntax(path))

    if violations:
        for v in violations:
            if v.lineno:
                print(f"Warning: {v.path}:{v.lineno} — {v.message}")
            else:
                print(f"Warning: {v.path} — {v.message}")
        sys.exit(1)
    else:
        print("Simulation syntax check passed!")


if __name__ == "__main__":
    check_simulations()
