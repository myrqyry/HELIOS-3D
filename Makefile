.PHONY: sync test check-claims validate-erc check-links check-sims check-stubs build

sync:
	uv sync

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

build:
	pnpm install --frozen-lockfile && pnpm build
