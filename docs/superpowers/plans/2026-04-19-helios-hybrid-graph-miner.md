# HELIOS Hybrid Graph Miner Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a self-contained Google Colab notebook that mines HELIOS docs plus optional live paper metadata, ranks novel connections, and saves reports and raw data to Google Drive.

**Architecture:** The implementation is a single Colab notebook backed by lightweight, pure-Python helper functions defined inside notebook cells. A small structural test validates that the notebook contains the expected sections, Google Drive integration, data-ingestion helpers, graph-building logic, and report-generation cells without requiring Colab execution in CI.

**Tech Stack:** Google Colab, Python 3, pandas, requests, networkx, scikit-learn, numpy, tqdm, JSON notebook format

---

## File Map

- Create: `notebooks/helios_hybrid_graph_miner.ipynb`
  - Single Colab notebook with setup, Drive mount, HELIOS ingestion, external fetchers, graph building, scoring, and report export.
- Create: `notebooks/README.md`
  - Short usage guide for opening the notebook in Colab and understanding the Drive output layout.
- Create: `tests/hybrid_graph_miner_notebook_test.py`
  - JSON-based structural validation for required notebook sections and code-cell content.

---

### Task 1: Create Notebook Skeleton

**Files:**
- Create: `notebooks/helios_hybrid_graph_miner.ipynb`
- Create: `tests/hybrid_graph_miner_notebook_test.py`
- Test: `tests/hybrid_graph_miner_notebook_test.py`

- [ ] **Step 1: Write the failing test**

Create `tests/hybrid_graph_miner_notebook_test.py` with this content:

```python
import json
import sys
from pathlib import Path

NOTEBOOK_PATH = Path("notebooks/helios_hybrid_graph_miner.ipynb")


def load_notebook() -> dict:
    if not NOTEBOOK_PATH.exists():
        print(f"FAIL: Missing notebook at {NOTEBOOK_PATH}")
        sys.exit(1)
    return json.loads(NOTEBOOK_PATH.read_text())


def joined_sources(notebook: dict) -> list[str]:
    return ["".join(cell.get("source", [])) for cell in notebook.get("cells", [])]


def require_fragment(sources: list[str], fragment: str, message: str) -> None:
    if not any(fragment in source for source in sources):
        print(f"FAIL: {message}")
        sys.exit(1)


def test_notebook_scaffold() -> None:
    notebook = load_notebook()
    sources = joined_sources(notebook)

    require_fragment(sources, "# HELIOS Hybrid Graph Miner", "missing notebook title")
    require_fragment(sources, "## Setup", "missing setup section")
    require_fragment(sources, "## Mount Google Drive", "missing Google Drive section")
    require_fragment(sources, "## Configure Run", "missing configuration section")

    print("PASS: Notebook scaffold sections present.")
    sys.exit(0)


if __name__ == "__main__":
    test_notebook_scaffold()
```

- [ ] **Step 2: Run test to verify it fails**

Run: `python tests/hybrid_graph_miner_notebook_test.py`

Expected: FAIL with `Missing notebook at notebooks/helios_hybrid_graph_miner.ipynb`

- [ ] **Step 3: Write minimal implementation**

Create `notebooks/helios_hybrid_graph_miner.ipynb` with notebook metadata and these initial cells.

Cell 1, markdown:

```markdown
# HELIOS Hybrid Graph Miner

This Colab notebook mines HELIOS documents and optional external literature to surface novel research connections, contradictions, and candidate branch paths.
```

Cell 2, markdown:

```markdown
## Setup
```

Cell 3, code:

```python
!pip -q install pandas requests networkx scikit-learn numpy tqdm
```

Cell 4, markdown:

```markdown
## Mount Google Drive
```

Cell 5, markdown:

```markdown
## Configure Run
```

Cell 6, code:

```python
CONFIG = {
    "repo_source_mode": "github_raw",
    "repo_base_url": "https://raw.githubusercontent.com/myrqyry/HELIOS-3D/research-updates",
    "external_queries": [
        "hopfion spintronics",
        "compensated ferrimagnet spin pumping",
        "altermagnet skyrmion dynamics",
    ],
    "max_external_papers": 15,
    "enable_live_search": True,
    "enable_contradiction_mining": True,
    "drive_output_root": "/content/drive/MyDrive/helios-research",
}

CONFIG
```

Make sure the notebook JSON is valid and includes a Python 3 kernelspec.

- [ ] **Step 4: Run test to verify it passes**

Run: `python tests/hybrid_graph_miner_notebook_test.py`

Expected: `PASS: Notebook scaffold sections present.`

- [ ] **Step 5: Commit**

```bash
git add notebooks/helios_hybrid_graph_miner.ipynb tests/hybrid_graph_miner_notebook_test.py
git commit -m "feat: add Colab notebook scaffold"
```

---

### Task 2: Add Google Drive Persistence and Output Helpers

**Files:**
- Modify: `notebooks/helios_hybrid_graph_miner.ipynb`
- Modify: `tests/hybrid_graph_miner_notebook_test.py`
- Test: `tests/hybrid_graph_miner_notebook_test.py`

- [ ] **Step 1: Write the failing test**

Update `test_notebook_scaffold()` in `tests/hybrid_graph_miner_notebook_test.py` by adding these assertions after the section checks:

```python
    require_fragment(sources, "from google.colab import drive", "missing Google Drive import")
    require_fragment(sources, 'drive.mount("/content/drive")', "missing Google Drive mount call")
    require_fragment(sources, "MyDrive/helios-research", "missing Drive output root")
    require_fragment(sources, "RAW_ROOT", "missing RAW_ROOT directory helper")
    require_fragment(sources, "REPORT_ROOT", "missing REPORT_ROOT directory helper")
    require_fragment(sources, "def save_text_artifact", "missing text artifact helper")
    require_fragment(sources, "def save_json_artifact", "missing JSON artifact helper")
```

- [ ] **Step 2: Run test to verify it fails**

Run: `python tests/hybrid_graph_miner_notebook_test.py`

Expected: FAIL with `missing Google Drive import`

- [ ] **Step 3: Write minimal implementation**

Insert these notebook cells after the `CONFIG` cell from Task 1.

Code cell:

```python
from google.colab import drive
from pathlib import Path
from datetime import datetime
import json

drive.mount("/content/drive")

OUTPUT_ROOT = Path("/content/drive/MyDrive/helios-research")
RUN_ID = datetime.utcnow().strftime("%Y%m%d-%H%M%S")
RUN_ROOT = OUTPUT_ROOT / RUN_ID
RAW_ROOT = RUN_ROOT / "raw"
REPORT_ROOT = RUN_ROOT / "reports"

for directory in (RAW_ROOT, REPORT_ROOT):
    directory.mkdir(parents=True, exist_ok=True)

print({
    "run_root": str(RUN_ROOT),
    "raw_root": str(RAW_ROOT),
    "report_root": str(REPORT_ROOT),
})
```

Code cell:

```python
def save_text_artifact(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")


def save_json_artifact(path: Path, payload: object) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8")
```

- [ ] **Step 4: Run test to verify it passes**

Run: `python tests/hybrid_graph_miner_notebook_test.py`

Expected: `PASS: Notebook scaffold sections present.`

- [ ] **Step 5: Commit**

```bash
git add notebooks/helios_hybrid_graph_miner.ipynb tests/hybrid_graph_miner_notebook_test.py
git commit -m "feat: add Google Drive output helpers"
```

---

### Task 3: Load and Save HELIOS Documents

**Files:**
- Modify: `notebooks/helios_hybrid_graph_miner.ipynb`
- Modify: `tests/hybrid_graph_miner_notebook_test.py`
- Test: `tests/hybrid_graph_miner_notebook_test.py`

- [ ] **Step 1: Write the failing test**

Add these assertions to `test_notebook_scaffold()`:

```python
    require_fragment(sources, "DEFAULT_HELIOS_FILES", "missing HELIOS file list")
    require_fragment(sources, "def normalize_markdown", "missing markdown normalization helper")
    require_fragment(sources, "def fetch_github_text", "missing GitHub fetch helper")
    require_fragment(sources, "def load_uploaded_documents", "missing uploaded file helper")
    require_fragment(sources, "def load_helios_documents", "missing HELIOS loader")
    require_fragment(sources, "helios_docs = load_helios_documents(CONFIG)", "missing HELIOS load execution cell")
```

- [ ] **Step 2: Run test to verify it fails**

Run: `python tests/hybrid_graph_miner_notebook_test.py`

Expected: FAIL with `missing HELIOS file list`

- [ ] **Step 3: Write minimal implementation**

Add a markdown cell:

```markdown
## Load HELIOS Docs
```

Add this code cell:

```python
import requests
import pandas as pd
from google.colab import files

DEFAULT_HELIOS_FILES = [
    "README.md",
    "docs/CLAIMS_MATRIX.md",
    "docs/ALTERNATIVE_MATERIALS_AND_METHODS.md",
    "docs/LITERATURE_REVIEW.md",
    "docs/OPEN_QUESTIONS.md",
    "docs/CANDIDATE_MATERIALS_AND_MECHANISMS.md",
    "docs/CORE_ARCHITECTURE.md",
]


def normalize_markdown(text: str) -> str:
    return "\n".join(line.rstrip() for line in text.replace("\r\n", "\n").split("\n")).strip()


def fetch_github_text(base_url: str, relative_path: str) -> str:
    url = f"{base_url.rstrip('/')}/{relative_path.lstrip('/')}"
    response = requests.get(url, timeout=30)
    response.raise_for_status()
    return normalize_markdown(response.text)


def load_uploaded_documents() -> list[dict]:
    uploaded = files.upload()
    return [
        {
            "path": name,
            "text": normalize_markdown(content.decode("utf-8")),
            "source": "helios",
        }
        for name, content in uploaded.items()
    ]


def load_helios_documents(config: dict) -> list[dict]:
    documents = []

    if config["repo_source_mode"] == "upload":
        documents = load_uploaded_documents()
        for document in documents:
            save_text_artifact(RAW_ROOT / document["path"].replace("/", "__"), document["text"])
        return documents

    if config["repo_source_mode"] != "github_raw":
        raise ValueError("repo_source_mode must be github_raw or upload")

    for relative_path in DEFAULT_HELIOS_FILES:
        text = fetch_github_text(config["repo_base_url"], relative_path)
        record = {
            "path": relative_path,
            "text": text,
            "source": "helios",
        }
        documents.append(record)
        save_text_artifact(RAW_ROOT / relative_path.replace("/", "__"), text)

    return documents
```

Add this execution cell:

```python
helios_docs = load_helios_documents(CONFIG)
helios_docs_df = pd.DataFrame(
    [{"path": doc["path"], "characters": len(doc["text"])} for doc in helios_docs]
)
helios_docs_df
```

- [ ] **Step 4: Run test to verify it passes**

Run: `python tests/hybrid_graph_miner_notebook_test.py`

Expected: `PASS: Notebook scaffold sections present.`

- [ ] **Step 5: Commit**

```bash
git add notebooks/helios_hybrid_graph_miner.ipynb tests/hybrid_graph_miner_notebook_test.py
git commit -m "feat: add HELIOS document ingestion"
```

---

### Task 4: Add External Literature Fetchers

**Files:**
- Modify: `notebooks/helios_hybrid_graph_miner.ipynb`
- Modify: `tests/hybrid_graph_miner_notebook_test.py`
- Test: `tests/hybrid_graph_miner_notebook_test.py`

- [ ] **Step 1: Write the failing test**

Add these assertions to `test_notebook_scaffold()`:

```python
    require_fragment(sources, "def fetch_arxiv_papers", "missing arXiv fetch helper")
    require_fragment(sources, "def fetch_openalex_works", "missing OpenAlex fetch helper")
    require_fragment(sources, "def fetch_crossref_works", "missing Crossref fetch helper")
    require_fragment(sources, "def fetch_external_papers", "missing combined external fetch helper")
    require_fragment(sources, "external_papers = fetch_external_papers(CONFIG)", "missing external fetch execution cell")
```

- [ ] **Step 2: Run test to verify it fails**

Run: `python tests/hybrid_graph_miner_notebook_test.py`

Expected: FAIL with `missing arXiv fetch helper`

- [ ] **Step 3: Write minimal implementation**

Add a markdown cell:

```markdown
## Fetch External Literature
```

Add this code cell:

```python
from urllib.parse import quote_plus
import xml.etree.ElementTree as ET


def fetch_arxiv_papers(query: str, max_results: int) -> list[dict]:
    url = (
        "http://export.arxiv.org/api/query?"
        f"search_query=all:{quote_plus(query)}&start=0&max_results={max_results}"
    )
    response = requests.get(url, timeout=30)
    response.raise_for_status()

    namespace = {"atom": "http://www.w3.org/2005/Atom"}
    root = ET.fromstring(response.text)
    papers = []
    for entry in root.findall("atom:entry", namespace):
        papers.append(
            {
                "source": "arxiv",
                "title": entry.findtext("atom:title", default="", namespaces=namespace).strip(),
                "abstract": entry.findtext("atom:summary", default="", namespaces=namespace).strip(),
                "url": entry.findtext("atom:id", default="", namespaces=namespace).strip(),
                "year": entry.findtext("atom:published", default="", namespaces=namespace)[:4],
                "identifier": entry.findtext("atom:id", default="", namespaces=namespace).strip(),
            }
        )
    return papers


def fetch_openalex_works(query: str, max_results: int) -> list[dict]:
    url = f"https://api.openalex.org/works?search={quote_plus(query)}&per-page={max_results}"
    response = requests.get(url, timeout=30)
    response.raise_for_status()
    results = response.json().get("results", [])
    return [
        {
            "source": "openalex",
            "title": item.get("display_name", ""),
            "abstract": item.get("abstract", ""),
            "url": item.get("id", ""),
            "year": item.get("publication_year", ""),
            "identifier": item.get("id", ""),
        }
        for item in results
    ]


def fetch_crossref_works(query: str, max_results: int) -> list[dict]:
    url = f"https://api.crossref.org/works?query={quote_plus(query)}&rows={max_results}"
    response = requests.get(url, timeout=30)
    response.raise_for_status()
    items = response.json().get("message", {}).get("items", [])
    return [
        {
            "source": "crossref",
            "title": (item.get("title") or [""])[0],
            "abstract": item.get("abstract", "") or "",
            "url": item.get("URL", ""),
            "year": (item.get("published-print", {}).get("date-parts", [[""]])[0][0]),
            "identifier": item.get("DOI", ""),
        }
        for item in items
    ]


def fetch_external_papers(config: dict) -> list[dict]:
    if not config["enable_live_search"]:
        return []

    papers = []
    per_source = max(1, config["max_external_papers"] // 3)
    for query in config["external_queries"]:
        papers.extend(fetch_arxiv_papers(query, per_source))
        papers.extend(fetch_openalex_works(query, per_source))
        papers.extend(fetch_crossref_works(query, per_source))

    deduped = {}
    for paper in papers:
        key = paper["identifier"] or paper["url"] or paper["title"]
        deduped[key] = paper

    records = list(deduped.values())[: config["max_external_papers"]]
    save_json_artifact(RAW_ROOT / "external_papers.json", records)
    return records
```

Add this execution cell:

```python
external_papers = fetch_external_papers(CONFIG)
external_papers_df = pd.DataFrame(external_papers)
external_papers_df.head(10)
```

- [ ] **Step 4: Run test to verify it passes**

Run: `python tests/hybrid_graph_miner_notebook_test.py`

Expected: `PASS: Notebook scaffold sections present.`

- [ ] **Step 5: Commit**

```bash
git add notebooks/helios_hybrid_graph_miner.ipynb tests/hybrid_graph_miner_notebook_test.py
git commit -m "feat: add external literature fetchers"
```

---

### Task 5: Extract Claims and Build the Research Graph

**Files:**
- Modify: `notebooks/helios_hybrid_graph_miner.ipynb`
- Modify: `tests/hybrid_graph_miner_notebook_test.py`
- Test: `tests/hybrid_graph_miner_notebook_test.py`

- [ ] **Step 1: Write the failing test**

Add these assertions to `test_notebook_scaffold()`:

```python
    require_fragment(sources, "def extract_claim_units", "missing claim extraction helper")
    require_fragment(sources, "def extract_entities", "missing entity extraction helper")
    require_fragment(sources, "nx.MultiDiGraph()", "missing research graph construction")
    require_fragment(sources, "def build_research_graph", "missing graph builder")
    require_fragment(sources, "graph = build_research_graph(claim_units, external_papers)", "missing graph execution cell")
```

- [ ] **Step 2: Run test to verify it fails**

Run: `python tests/hybrid_graph_miner_notebook_test.py`

Expected: FAIL with `missing claim extraction helper`

- [ ] **Step 3: Write minimal implementation**

Add a markdown cell:

```markdown
## Extract Claims and Build Graph
```

Add this code cell:

```python
import re
import networkx as nx

MATERIALS = ["Fe3GaTe2", "Fe_3GaTe_2", "GdFeCo", "Ir/Fe/Co/Pt", "Ir/Co/Pt", "altermagnet"]
CARRIERS = ["skyrmion", "hopfion", "domain wall"]
READOUTS = ["Hall", "TMR", "AHE", "THE", "microwave", "spin pumping", "ODMR"]
FABRICATION = ["ALD", "DISH", "TPP", "sputter", "etch", "transfer", "stacking"]
EVIDENCE_TAGS = ["[DEMONSTRATED]", "[INFERRED]", "[PROPOSED]", "[SPECULATIVE]"]


def extract_claim_units(documents: list[dict]) -> list[dict]:
    claims = []
    for doc in documents:
        for line in doc["text"].split("\n"):
            line = line.strip()
            if len(line) < 20:
                continue
            if line.startswith("#"):
                continue
            claims.append({"path": doc["path"], "text": line, "source": "helios"})
    return claims


def extract_entities(text: str) -> dict:
    return {
        "materials": [item for item in MATERIALS if item.lower() in text.lower()],
        "carriers": [item for item in CARRIERS if item.lower() in text.lower()],
        "readouts": [item for item in READOUTS if item.lower() in text.lower()],
        "fabrication": [item for item in FABRICATION if item.lower() in text.lower()],
        "evidence_tags": [tag for tag in EVIDENCE_TAGS if tag in text],
    }


def build_research_graph(claim_units: list[dict], papers: list[dict]) -> nx.MultiDiGraph:
    graph = nx.MultiDiGraph()

    for index, claim in enumerate(claim_units):
        claim_id = f"claim:{index}"
        graph.add_node(claim_id, kind="claim", path=claim["path"], text=claim["text"])
        entities = extract_entities(claim["text"])
        for label, values in entities.items():
            for value in values:
                entity_id = f"entity:{value}"
                graph.add_node(entity_id, kind=label[:-1], label=value)
                graph.add_edge(claim_id, entity_id, relation="mentions")

    for index, paper in enumerate(papers):
        paper_id = f"paper:{index}"
        graph.add_node(paper_id, kind="paper", title=paper.get("title", ""), abstract=paper.get("abstract", ""))

    return graph
```

Add this execution cell:

```python
claim_units = extract_claim_units(helios_docs)
graph = build_research_graph(claim_units, external_papers)

print({
    "claims": len(claim_units),
    "graph_nodes": graph.number_of_nodes(),
    "graph_edges": graph.number_of_edges(),
})
```

- [ ] **Step 4: Run test to verify it passes**

Run: `python tests/hybrid_graph_miner_notebook_test.py`

Expected: `PASS: Notebook scaffold sections present.`

- [ ] **Step 5: Commit**

```bash
git add notebooks/helios_hybrid_graph_miner.ipynb tests/hybrid_graph_miner_notebook_test.py
git commit -m "feat: add claim extraction and graph builder"
```

---

### Task 6: Rank Candidate Connections and Document Usage

**Files:**
- Modify: `notebooks/helios_hybrid_graph_miner.ipynb`
- Create: `notebooks/README.md`
- Modify: `tests/hybrid_graph_miner_notebook_test.py`
- Test: `tests/hybrid_graph_miner_notebook_test.py`

- [ ] **Step 1: Write the failing test**

Add these assertions to `test_notebook_scaffold()`:

```python
    require_fragment(sources, "def rank_candidate_connections", "missing ranking helper")
    require_fragment(sources, "def classify_evidence_relationship", "missing evidence classification helper")
    require_fragment(sources, "def write_markdown_report", "missing report writer")
    require_fragment(sources, "Top 10 candidate connections", "missing final ranked report section")
```

- [ ] **Step 2: Run test to verify it fails**

Run: `python tests/hybrid_graph_miner_notebook_test.py`

Expected: FAIL with `missing ranking helper`

- [ ] **Step 3: Write minimal implementation**

Add a markdown cell:

```markdown
## Rank Candidate Connections and Write Reports
```

Add this code cell:

```python
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def classify_evidence_relationship(claim_text: str, paper_text: str) -> str:
    claim_lower = claim_text.lower()
    paper_lower = paper_text.lower()

    if "zero-field" in claim_lower and "zero-field" not in paper_lower and "reduced bias" in paper_lower:
        return "partial_support"
    if any(tag in claim_text for tag in ["[SPECULATIVE]", "[PROPOSED]"]):
        return "candidate_branch"
    return "direct_support"


def rank_candidate_connections(claim_units: list[dict], papers: list[dict]) -> list[dict]:
    if not claim_units or not papers:
        return []

    claim_texts = [claim["text"] for claim in claim_units]
    paper_texts = [f"{paper.get('title', '')} {paper.get('abstract', '')}" for paper in papers]
    matrix = TfidfVectorizer(stop_words="english").fit_transform(claim_texts + paper_texts)
    claim_matrix = matrix[: len(claim_texts)]
    paper_matrix = matrix[len(claim_texts) :]
    scores = cosine_similarity(claim_matrix, paper_matrix)

    ranked = []
    for claim_index, claim in enumerate(claim_units):
        best_paper_index = scores[claim_index].argmax()
        paper = papers[int(best_paper_index)]
        relation = classify_evidence_relationship(claim["text"], paper_texts[int(best_paper_index)])
        ranked.append(
            {
                "claim_path": claim["path"],
                "claim_text": claim["text"],
                "paper_title": paper.get("title", ""),
                "paper_url": paper.get("url", ""),
                "score": float(scores[claim_index][best_paper_index]),
                "relationship": relation,
            }
        )

    return sorted(ranked, key=lambda item: item["score"], reverse=True)[:10]


def write_markdown_report(ranked_connections: list[dict]) -> str:
    lines = [
        "# HELIOS Hybrid Graph Miner Report",
        "",
        "## Top 10 candidate connections",
        "",
    ]
    for item in ranked_connections:
        lines.append(
            f"- `{item['relationship']}` | `{item['claim_path']}` | {item['paper_title']} | score={item['score']:.3f}"
        )
    lines.extend(
        [
            "",
            "## Promote / Hold / Demote",
            "",
            "- Promote: high-score connections tied to the planar-first baseline.",
            "- Hold: partial-support branches that need matching conditions.",
            "- Demote: attractive connections with no fabrication or readout path.",
        ]
    )
    return "\n".join(lines)
```

Add this execution cell:

```python
ranked_connections = rank_candidate_connections(claim_units, external_papers)
report_markdown = write_markdown_report(ranked_connections)

ranked_df = pd.DataFrame(ranked_connections)
save_json_artifact(REPORT_ROOT / "ranked_connections.json", ranked_connections)
ranked_df.to_csv(REPORT_ROOT / "ranked_connections.csv", index=False)
save_text_artifact(REPORT_ROOT / "report.md", report_markdown)

print(report_markdown)
ranked_df.head(10)
```

Create `notebooks/README.md` with this content:

```markdown
# Notebooks

## `helios_hybrid_graph_miner.ipynb`

Open this notebook in Google Colab.

What it does:

* loads key HELIOS Markdown docs
* optionally fetches external paper metadata from arXiv, OpenAlex, and Crossref
* extracts claim units and typed entities
* builds a lightweight research graph
* ranks candidate connections and writes reports to Google Drive

Default Drive output root:

`MyDrive/helios-research/`

Per-run outputs:

* `raw/` fetched HELIOS docs and paper metadata
* `reports/` ranked connections, JSON artifacts, and Markdown report
```

- [ ] **Step 4: Run test to verify it passes**

Run: `python tests/hybrid_graph_miner_notebook_test.py`

Expected: `PASS: Notebook scaffold sections present.`

- [ ] **Step 5: Run final verification**

Run: `python -c "import json; json.load(open('notebooks/helios_hybrid_graph_miner.ipynb')) ; print('notebook json ok')" && python tests/hybrid_graph_miner_notebook_test.py`

Expected:

```text
notebook json ok
PASS: Notebook scaffold sections present.
```

- [ ] **Step 6: Commit**

```bash
git add notebooks/helios_hybrid_graph_miner.ipynb notebooks/README.md tests/hybrid_graph_miner_notebook_test.py
git commit -m "feat: add HELIOS hybrid graph miner notebook"
```

---

## Self-Review Notes

- Spec coverage: the plan covers Colab execution, Drive persistence, HELIOS input loading, external literature metadata, typed graph construction, ranking, report export, and a minimal usage README.
- Placeholder scan: no deferred implementation markers remain.
- Type consistency: the notebook uses `CONFIG`, `RAW_ROOT`, `REPORT_ROOT`, `helios_docs`, `external_papers`, `claim_units`, `graph`, `ranked_connections`, and `report_markdown` consistently across tasks.
