# Notebooks

## `helios_hybrid_graph_miner.ipynb`

Open this notebook in [Google Colab](https://colab.research.google.com/).

### What It Does

* loads key HELIOS Markdown docs from GitHub or local upload
* optionally fetches external paper metadata from arXiv, OpenAlex, and Crossref
* extracts claim units with typed entities (materials, carriers, readouts, fabrication, stabilizers, transports)
* **Parses the Claims & Evidence Protocol tags** (`[DEMONSTRATED]`, `[INFERRED]`, `[PROPOSED]`, `[SPECULATIVE]`) from each claim for automated Repository Validation
* builds a typed research graph with evidence-tag-aware edges
* ranks candidate connections using TF-IDF cosine similarity, classifying each as `promote_to_demonstrated`, `promote_to_inferred`, `hold_needs_evidence`, `demote_weak_support`, or `CONTRADICTION`
* **Automated contradiction mining**: scans external paper abstracts for negative keywords (unstable, high bias required, fails at room temperature, etc.) and flags conflicting claims as HIGH_RISK
* **Claims Matrix suggestions**: generates automatic promote/hold/demote recommendations for `docs/CLAIMS_MATRIX.md`
* optionally creates a GitHub issue with review results (set `enable_github_writeback: True` and `GITHUB_TOKEN` env var)
* writes reports and raw data to Google Drive

### How It Supports the Defensive Framework

The notebook serves as an automated **Repository Validator** that bridges the execution gap between documentation and external research:

| Feature | Defensive Framework Role |
|---|---|
| Evidence tag parsing | Cross-references `[SPECULATIVE]` claims against external literature; demotes unsupported claims |
| Contradiction mining | Detects papers that weaken HELIOS claims (e.g., "unstable at room temperature") |
| Claims Matrix suggestions | Flags claims for promotion from `[SPECULATIVE]` to `[INFERRED]` when external experimental evidence is found |
| GitHub issue writeback | Closes the loop by surfacing findings directly into the project's issue tracker |

### Local Dependencies

```bash
uv sync --extra research
```

Or with pip:

```bash
pip install pandas requests networkx scikit-learn numpy tqdm
```

### Default Drive Output Root

`MyDrive/helios-research/`

### Per-Run Outputs

| Path | Contents |
|---|---|
| `raw/` | fetched HELIOS docs, external paper metadata JSON/CSV |
| `reports/report.md` | human-readable Markdown report |
| `reports/ranked_connections.json` | top 10 candidate connections with evidence classification |
| `reports/claims_suggestions.json` | automatic Claims Matrix update suggestions |
| `reports/contradiction_flags.json` | contradiction mining results |
