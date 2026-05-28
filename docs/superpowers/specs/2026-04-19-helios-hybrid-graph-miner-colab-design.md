# HELIOS Hybrid Graph Miner Colab Notebook Design

## Purpose

Design a single Google Colab notebook that mines HELIOS documents and selected external literature to surface novel research connections, contradictions, and candidate branch paths.

The notebook is intended to support abstract research discovery without weakening the repo's evidence discipline. It should help answer questions like:

* Which material, transport, readout, and fabrication combinations recur across HELIOS and the literature?
* Which promising connections are implied but not yet stated directly in the proposal?
* Which claims are weakly supported, contradicted by conditions in the papers, or ripe for promotion into the proposal?

## Recommended Scope

Build a **hybrid graph miner** as a self-contained Colab notebook.

Why this approach:

* It stays grounded in HELIOS instead of drifting into generic paper search.
* It can combine repo claims with external paper metadata in one run.
* It can produce both human-readable summaries and machine-readable artifacts.
* It creates a clear upgrade path to heavier methods later without overbuilding the first version.

## Non-Goals

The first notebook will not:

* train a large custom model
* persist large embedding caches by default
* perform simulator-in-the-loop optimization
* rewrite repo documents automatically
* act as a full autonomous literature agent

## Notebook Location

The implementation target is:

`notebooks/helios_hybrid_graph_miner.ipynb`

The notebook should be runnable in a fresh Google Colab session with notebook-local installs.

## Google Drive Integration

Google Drive is the default persistence layer.

The notebook should mount Drive near the top of the run and create a stable output root such as:

`MyDrive/helios-research/`

Under that root, the notebook should create:

* `raw/` for fetched HELIOS docs and external paper metadata
* `reports/` for Markdown, CSV, and JSON outputs
* a timestamped run folder for each notebook execution

Default save policy:

* save final reports
* save raw fetched docs and paper metadata
* do not save large embedding or intermediate caches by default

## Inputs

The notebook should support two input families.

### HELIOS inputs

Primary source material comes from HELIOS Markdown files, loaded from either:

* GitHub raw URLs
* uploaded local files
* a configurable file list inside the notebook

The default HELIOS file set should include:

* `README.md`
* `docs/CLAIMS_MATRIX.md`
* `docs/ALTERNATIVE_MATERIALS_AND_METHODS.md`
* `docs/LITERATURE_REVIEW.md`
* `docs/OPEN_QUESTIONS.md`
* `docs/CANDIDATE_MATERIALS_AND_MECHANISMS.md`
* `docs/CORE_ARCHITECTURE.md`

### External literature inputs

External sources should be optional and fetched by query.

The initial notebook should support lightweight metadata retrieval from:

* arXiv
* OpenAlex
* Crossref

The notebook should not depend on API keys for the first version.

## Run Configuration

The notebook should expose one compact configuration cell with:

* repo source mode: `github_raw` or `upload`
* base repo URL or uploaded files
* external search queries
* max number of external papers
* enable or disable live search
* enable or disable contradiction mining
* output root in Google Drive

The goal is to keep the user-facing surface area small.

## Core Pipeline

### 1. Setup

Install notebook-local dependencies and print versions.

Target dependency class:

* `pandas`
* `requests`
* `networkx`
* `scikit-learn`
* `numpy`
* `tqdm`
* a lightweight embedding backend if needed

The embedding layer should be pluggable. If a sentence-transformer is used, it should be optional and chosen for Colab compatibility.

### 2. Load and normalize HELIOS docs

Fetch the configured HELIOS files, normalize line endings and whitespace, preserve file provenance, and save raw copies to Drive.

### 3. Fetch external paper metadata

Run configured queries against arXiv, OpenAlex, and Crossref. For each result, retain:

* title
* abstract or summary
* authors if available
* year
* source URL
* identifier

Save this raw metadata to Drive before analysis.

### 4. Extract claim units and entities

Split HELIOS text into claim-like segments and extract typed entities such as:

* materials
* carriers
* stabilizers
* transport mechanisms
* readout methods
* fabrication methods
* evidence tags
* operating conditions such as temperature, geometry, and field regime

This extraction can be heuristic in the first version. Precision matters more than full recall.

### 5. Build a typed research graph

Construct a graph where nodes represent claims, papers, and technical entities, and edges represent typed relations such as:

* `supports`
* `challenges`
* `mentions`
* `requires`
* `measures`
* `fabricates`
* `stabilizes`
* `reads`
* `writes`

This graph is the central working structure for discovery.

### 6. Similarity and analogy scoring

Compute text similarity between HELIOS claim units and paper summaries.

The purpose is not just keyword overlap. The notebook should highlight structural analogies such as:

* one field using a trapping potential analogous to a HELIOS stabilizer concept
* a readout method in one material family that could transfer to another
* a fabrication constraint in one branch that explains why another branch is safer

### 7. Contradiction and support checks

The notebook should flag at least three classes of evidence interaction:

* direct support
* partial support with mismatched conditions
* likely contradiction or missing condition

For the first version, these checks may be rule-based and condition-aware rather than fully model-driven.

### 8. Candidate ranking

Rank outputs into a few practical buckets:

* strongest candidate connections
* promising but weakly supported branches
* contradictions or pressure points
* proposal-worthy candidates

The ranking should be transparent and based on visible factors such as:

* number of supporting papers
* closeness to HELIOS baseline path
* claim-stage compatibility
* fabrication realism
* readout realism

## Outputs

The notebook should generate:

### Human-readable outputs

* a Markdown report with a top-level summary
* a ranked “Top 10 candidate connections” section
* a short “promote / hold / demote” section for proposal relevance

### Machine-readable outputs

* CSV of ranked candidate connections
* JSON of claim units
* JSON or CSV of graph edges and nodes
* CSV of fetched paper metadata

All outputs should be saved into the Drive run folder.

## Notebook UX

The notebook should be linear and understandable to a non-specialist user.

Recommended structure:

1. Setup
2. Mount Google Drive
3. Configure run
4. Load HELIOS docs
5. Fetch external literature
6. Extract claims and entities
7. Build graph
8. Score analogies and contradictions
9. Generate ranked report
10. Save artifacts to Drive

Each section should end with a compact preview so the user can inspect what happened before moving on.

## First-Version Quality Bar

The notebook is successful if it can do all of the following in a fresh Colab session:

* mount Google Drive
* ingest HELIOS docs reliably
* fetch a small external paper set without credentials
* produce a typed graph and ranked candidate list
* write a clean report and raw data to Drive

It does not need to discover perfect science. It needs to produce reproducible, inspectable, evidence-aware candidate connections.

## Future Extensions

If the first version proves useful, later versions can add:

* better embedding backends
* cached graph snapshots
* OpenAlex citation graph enrichment
* simulator result ingestion from HELIOS benchmark tasks
* novelty search across architecture combinations
* claim-conditioned proposal patch suggestions

## Recommendation

Implement a single self-contained Colab notebook with Google Drive-backed persistence for reports and raw fetched data. Keep the first version simple, inspectable, and biased toward evidence governance rather than over-automation.
