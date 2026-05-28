import csv
import sys
from pathlib import Path

# Path to data file
DATA_FILE = Path(__file__).resolve().parent.parent / "data" / "erc_core_temp_tolerance.synthetic.csv"

EXPECTED_COLUMNS = {
    0: ("time", float),
    1: ("temperature_variance", float),
    2: ("accuracy", float),
}

# Bounds for data validation
BOUNDS = {
    "time": (0.0, None),
    "temperature_variance": (-1.0, 1.0),
    "accuracy": (0.0, 1.0),
}


def validate() -> None:
    if not DATA_FILE.exists():
        print(f"Error: Data file {DATA_FILE} not found.", file=sys.stderr)
        sys.exit(1)

    found_issues = False
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        reader = csv.reader(f)

        header_skipped = False
        data_row_count = 0
        for row in reader:
            # Skip empty lines and comment lines
            if not row or row[0].startswith("#"):
                continue

            # Skip the header row (first non-comment row)
            if not header_skipped:
                header_skipped = True
                # Validate header matches expected schema
                expected_headers = [EXPECTED_COLUMNS[i][0] for i in range(len(EXPECTED_COLUMNS))]
                actual_headers = [c.strip() for c in row[: len(expected_headers)]]
                if actual_headers != expected_headers:
                    print(
                        f"Error: CSV header mismatch. Expected {expected_headers}, got {actual_headers}",
                        file=sys.stderr,
                    )
                    found_issues = True
                continue

            data_row_count += 1
            logical_row_idx = data_row_count

            for col_idx, (col_name, col_type) in EXPECTED_COLUMNS.items():
                try:
                    raw_value = row[col_idx]
                except IndexError:
                    print(
                        f"Error on data row {logical_row_idx}, col '{col_name}' (idx {col_idx}): "
                        f"missing value",
                        file=sys.stderr,
                    )
                    found_issues = True
                    continue

                try:
                    value = col_type(raw_value)
                except ValueError:
                    print(
                        f"Error on data row {logical_row_idx}, col '{col_name}' (idx {col_idx}): "
                        f"expected {col_type.__name__}, got {raw_value}",
                        file=sys.stderr,
                    )
                    found_issues = True
                    continue

                # Bounds check
                lower, upper = BOUNDS.get(col_name, (None, None))
                if lower is not None and value < lower:
                    print(
                        f"Error on data row {logical_row_idx}, col '{col_name}': "
                        f"value {value} below lower bound {lower}",
                        file=sys.stderr,
                    )
                    found_issues = True
                if upper is not None and value > upper:
                    print(
                        f"Error on data row {logical_row_idx}, col '{col_name}': "
                        f"value {value} above upper bound {upper}",
                        file=sys.stderr,
                    )
                    found_issues = True

    if found_issues:
        sys.exit(1)
    else:
        print("Data validation passed!")


if __name__ == "__main__":
    validate()
