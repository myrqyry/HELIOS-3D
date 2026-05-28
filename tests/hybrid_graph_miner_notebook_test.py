import json
from pathlib import Path

NOTEBOOK_PATH = Path("notebooks/helios_hybrid_graph_miner.ipynb")

def load_notebook() -> dict:
    if not NOTEBOOK_PATH.exists():
        raise FileNotFoundError(f"Missing notebook at {NOTEBOOK_PATH}")
    return json.loads(NOTEBOOK_PATH.read_text(encoding="utf-8"))

def joined_sources(notebook: dict) -> list[str]:
    return ["".join(cell.get("source", [])) for cell in notebook.get("cells", [])]

def require_fragment(sources: list[str], fragment: str, message: str) -> None:
    if not any(fragment in source for source in sources):
        raise AssertionError(f"FAIL: {message}")

def test_notebook_scaffold() -> None:
    notebook = load_notebook()
    sources = joined_sources(notebook)

    require_fragment(sources, "# HELIOS Hybrid Graph Miner", "missing notebook title")
    require_fragment(sources, "## Setup", "missing setup section")
    require_fragment(sources, "## Mount Google Drive", "missing Google Drive section")
    require_fragment(sources, "## Configure Run", "missing configuration section")
    require_fragment(sources, "from google.colab import drive", "missing Google Drive import")
    require_fragment(sources, 'drive.mount("/content/drive")', "missing Google Drive mount call")
    require_fragment(sources, "MyDrive/helios-research", "missing Drive output root")
    require_fragment(sources, "RAW_ROOT", "missing RAW_ROOT directory helper")
    require_fragment(sources, "REPORT_ROOT", "missing REPORT_ROOT directory helper")
    require_fragment(sources, "def save_text_artifact", "missing text artifact helper")
    require_fragment(sources, "def save_json_artifact", "missing JSON artifact helper")
    require_fragment(sources, "DEFAULT_HELIOS_FILES", "missing HELIOS file list")
    require_fragment(sources, "def normalize_markdown", "missing markdown normalization helper")
    require_fragment(sources, "def fetch_github_text", "missing GitHub fetch helper")
    require_fragment(sources, "def load_uploaded_documents", "missing uploaded file helper")
    require_fragment(sources, "def load_helios_documents", "missing HELIOS loader")
    require_fragment(sources, "helios_docs = load_helios_documents(CONFIG)", "missing HELIOS load execution cell")
    require_fragment(sources, "def fetch_arxiv_papers", "missing arXiv fetch helper")
    require_fragment(sources, "def fetch_openalex_works", "missing OpenAlex fetch helper")
    require_fragment(sources, "def fetch_crossref_works", "missing Crossref fetch helper")
    require_fragment(sources, "def fetch_external_papers", "missing combined external fetch helper")
    require_fragment(sources, "external_papers = fetch_external_papers(CONFIG)", "missing external fetch execution cell")
    require_fragment(sources, "def extract_claim_units", "missing claim extraction helper")
    require_fragment(sources, "def extract_entities", "missing entity extraction helper")
    require_fragment(sources, "nx.MultiDiGraph()", "missing research graph construction")
    require_fragment(sources, "def build_research_graph", "missing graph builder")
    require_fragment(sources, "graph = build_research_graph(claim_units, external_papers)", "missing graph execution cell")
    require_fragment(sources, "def rank_candidate_connections", "missing ranking helper")
    require_fragment(sources, "def classify_evidence_relationship", "missing evidence classification helper")
    require_fragment(sources, "def write_markdown_report", "missing report writer")
    require_fragment(sources, "Top 10 Candidate Connections", "missing final ranked report section")
    # New: Evidence tag awareness
    require_fragment(sources, "evidence_tag", "missing evidence tag field in claim extraction")
    require_fragment(sources, "[DEMONSTRATED]", "missing [DEMONSTRATED] evidence tag reference")
    # New: Contradiction mining
    require_fragment(sources, "NEGATION_KEYWORDS", "missing contradiction keyword list")
    require_fragment(sources, "def detect_contradictions", "missing contradiction detection function")
    require_fragment(sources, "contradiction_flags", "missing contradiction flags variable")
    # New: Claims Matrix suggestions
    require_fragment(sources, "def generate_claims_matrix_suggestions", "missing claims matrix suggestion function")
    require_fragment(sources, "claims_suggestions", "missing claims suggestions variable")
    # New: GitHub writeback
    require_fragment(sources, "enable_github_writeback", "missing github writeback config")
    require_fragment(sources, "def github_create_issue", "missing github issue creation function")
    # New: Planar-first queries
    require_fragment(sources, "synthetic antiferromagnet skyrmion readout", "missing planar-first external query")
    require_fragment(sources, "SOT domain wall logic planar", "missing SOT domain wall planar query")

if __name__ == "__main__":
    test_notebook_scaffold()
    print("PASS: Notebook scaffold sections present.")
