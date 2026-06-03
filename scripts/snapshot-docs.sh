#!/usr/bin/env bash
set -euo pipefail

OUT="docs/.snapshot-originals"
mkdir -p "$OUT"
for f in docs/*.md; do
  cp "$f" "$OUT/$(basename "$f")"
done
echo "Snapshotted $(ls "$OUT" | wc -l) files to $OUT"
