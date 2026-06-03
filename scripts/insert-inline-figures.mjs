#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..', 'src', 'content', 'docs');

const inserts = [
  {
    file: join(root, 'established', 'literature-review.mdx'),
    import: "import LiteratureTimeline from '../../components/charts/LiteratureTimeline.tsx';\n",
    jsx: '\n<LiteratureTimeline client:visible height="h-48" />\n',
  },
  {
    file: join(root, 'current', 'targets-comparators-and-projections.mdx'),
    import: "import PerformanceFloor from '../../components/charts/PerformanceFloor.tsx';\n",
    jsx: '\n<PerformanceFloor client:visible height="h-64" />\n',
  },
  {
    file: join(root, 'current', 'claims-matrix.mdx'),
    import: "import ClaimsTable from '../../components/ClaimsTable.astro';\n",
    jsx: '\n<ClaimsTable rows={[]} />\n',
  },
  {
    file: join(root, 'speculative', 'proposed-fabrication-path-and-control.mdx'),
    import: "import MaterialStack from '../../components/r3f/MaterialStack.tsx';\n",
    jsx: '\n<MaterialStack client:visible height="h-72" />\n',
  },
];

for (const { file, import: imp, jsx } of inserts) {
  const body = readFileSync(file, 'utf8');
  // Find the closing --- of the frontmatter
  const m = body.match(/^---\n[\s\S]*?\n---\n/);
  if (!m) { console.warn(`Skip (no frontmatter): ${file}`); continue; }
  const frontmatter = m[0];
  const rest = body.slice(frontmatter.length);
  // Skip if import already present
  if (rest.includes(imp.split(' ')[1])) {
    console.log(`Already inserted: ${file}`);
    continue;
  }
  const out = frontmatter + imp + jsx + '\n' + rest;
  writeFileSync(file, out);
  console.log(`Inserted into: ${file}`);
}
