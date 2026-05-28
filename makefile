.PHONY: sync build serve deploy check-stubs test check-claims validate-erc check-links

sync:
	uv sync

build:
	uv run mkdocs build

serve:
	uv run mkdocs serve

deploy:
	uv run mkdocs gh-deploy --clean

test:
	uv run pytest

check-claims:
	uv run python scripts/check_claims.py

validate-erc:
	uv run python analysis/validate_erc_data.py

check-links:
	uv run python scripts/check_links.py

check-sims:
	uv run python scripts/check_simulations.py

check-stubs:
	@grep -rl "NOT RUNNABLE" simulations/ && echo "WARNING: Placeholder sims present" || echo "No placeholder simulations found"
