#!/usr/bin/env bash
set -euo pipefail

ORIG="docs/.snapshot-originals"
MIG="src/content/docs"

# Map: original filename -> migrated filename
declare -A MAP=(
  ["ABSTRACT.md"]="established/abstract.mdx"
  ["CANDIDATE_MATERIALS_AND_MECHANISMS.md"]="established/candidate-materials-and-mechanisms.mdx"
  ["LITERATURE_REVIEW.md"]="established/literature-review.mdx"
  ["MATHEMATICS.md"]="established/mathematics.mdx"
  ["GLOSSARY.md"]="established/glossary.mdx"
  ["ALTERNATIVE_MATERIALS_AND_METHODS.md"]="current/alternative-materials-and-methods.mdx"
  ["OPEN_QUESTIONS.md"]="current/open-questions.mdx"
  ["TARGETS_COMPARATORS_AND_PROJECTIONS.md"]="current/targets-comparators-and-projections.mdx"
  ["CLAIMS_MATRIX.md"]="current/claims-matrix.mdx"
  ["CORE_ARCHITECTURE.md"]="speculative/core-architecture.mdx"
  ["PROPOSED_FABRICATION_PATH_AND_CONTROL.md"]="speculative/proposed-fabrication-path-and-control.mdx"
  ["DEFENSIVE_FRAMEWORK.md"]="speculative/defensive-framework.mdx"
  ["PITCH_DECK_OUTLINE.md"]="speculative/pitch-deck-outline.mdx"
  ["DEPLOYMENT.md"]="project-ops/deployment.mdx"
)

fail=0
for orig in "${!MAP[@]}"; do
  new="${MAP[$orig]}"
  # Skip first two --- fences (frontmatter open + close); then print everything (including body ---)
  body=$(awk 'BEGIN{a=0; b=0} /^---$/{ if(a==0){a=1; next} else if(b==0){b=1; next} } b==1{print}' "$MIG/$new")
  if diff -q <(cat "$ORIG/$orig") <(printf '%s\n' "$body") > /dev/null; then
    echo "OK   $orig -> $new"
  else
    echo "DIFF $orig -> $new"
    diff <(cat "$ORIG/$orig") <(printf '%s\n' "$body") | head -20
    fail=1
  fi
done

exit $fail
