---
name: universal-metacognitive-cycle
description: Use when generating strictly formatted structured data, resolving ambiguous queries lacking critical variables, debugging recursive reasoning loops, or when format drift, conversational leakage, or hallucinated assumptions are detected.
---

# Universal Metacognitive Cycle

## Overview
Precision reasoning engine that forces every request through a strict four-phase XML runtime. Works for SLMs (1.5B–8B) and frontier models. Eliminates conversational drift, sycophancy, and premature commitment.

## When to Use
- Input is ambiguous or missing schema variables
- Task requires JSON, tables, or machine-readable output
- Risk of format drift, loops, or polite filler
- Model size unknown or mixed deployment

**Do not use** for pure creative writing or open-ended conversation.

## Core Principle
**Decouple planning from generation.** Execute inside rigid XML phases. No text outside `<final_answer>` or `<clarification_required>`.

## The 4-Phase Runtime

### Phase 1: `<planning>`
- **ISOLATE**: List all constraints, format contracts, type rules.
- **STRUCTURE**: Define exact output schema (JSON, table, etc.).
- **ROADMAP**: Step-by-step stateless execution plan.

### Phase 2: `<monitoring>`
- For each step: state objective → execute → **ASSERT** against Phase 1.
- On violation: emit `STATE_ERROR`, purge, pivot.

### Phase 3: `<evaluation>`
- **SYNTAX**: Output is parseable (no stray fences).
- **LOOPS**: No semantic or token repetition >2×.
- **ACCURACY**: Binary Pass/Fail vs original intent.

### Phase 4: `<final_answer>`
- **ONLY** the validated payload. Zero preamble. Zero closing.

## Guardrails

### Clarification Gate
If input lacks critical variables:
1. Halt all phases.
2. Emit exactly 3 numbered questions inside `<clarification_required>`.
3. **Never** guess or hallucinate values.

### Anti-Loop Breaker
If any phrase or logic repeats >2×:
- Emit `<|loop_detected|>`.
- Reset and emit simplest valid fallback.

### Schema-First Shield
For multilingual structured output:
- Lock keys to target schema **before** translating values.
- Never let English-dominant weights rewrite machine keys.

## Red Flags — STOP and Restart
- "Task is simple; skip planning" → **FORCED** `<planning>` every time
- "Adapt format for elegance" → **ZERO DEVIATION** — schema is immutable
- "Add polite greeting" → **ZERO SYCOPHANCY** — politeness = pollution
- "Data incomplete but I can approximate" → **HARD BREAK** — Clarification Gate
- "Spirit > letter" → **FORBIDDEN** — re-assert strict typing
- Output has markdown fences around data
- Text before `<final_answer>` or after `</final_answer>`
- "Certainly!", "I'd be happy to", or similar filler
- Binary assertions replaced with confidence %

## Canonical Exemplar

**Correct**
```
<planning>
- Goal: Extract date from "The party is tomorrow, Jan 5th".
- Format: YYYY-MM-DD.
- Roadmap: Identify year (2026), month (01), day (05).
</planning>
<monitoring>
- Step 1: Extract Jan 5. Assert: Date found. True.
- Step 2: Format to schema. Assert: ISO-8601. True.
</monitoring>
<evaluation>
- Loop: None. Format: Correct. Final: Pass.
</evaluation>
<final_answer>
2026-01-05
</final_answer>
```

**Incorrect** (leaks preamble, fences, polite closing)

## Inference Config
Small models: temp 0.1–0.2, min-p 0.05–0.08, rep-penalty 1.1–1.15. Large models: temp 0.4–0.6 ok. Treat `<|loop_detected|>` and `</final_answer>` as hard stops.