#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const map = JSON.parse(readFileSync(join(__dirname, 'migrate-docs-map.json'), 'utf8'));

const stageFor = (newPath) => newPath.split('/')[0];

const tagsFor = (body) => {
  const tags = new Set();
  for (const tag of ['DEMONSTRATED', 'INFERRED', 'PROPOSED', 'SPECULATIVE']) {
    if (body.includes(`\`[${tag}]\``) || body.includes(`[${tag}]`)) tags.add(tag);
  }
  return Array.from(tags);
};

const summaryFor = (body) => {
  const lines = body.split('\n');
  let pastFirstHeading = false;
  for (const line of lines) {
    if (line.startsWith('# ')) { pastFirstHeading = true; continue; }
    if (!pastFirstHeading) continue;
    const stripped = line.replace(/[*_`]/g, '').trim();
    if (stripped && !stripped.startsWith('#')) return stripped.slice(0, 200);
  }
  return '';
};

const titleFor = (orig) => orig
  .replace(/\.md$/, '')
  .replace(/_/g, ' ')
  .toLowerCase()
  .replace(/\b\w/g, (c) => c.toUpperCase());

for (const [orig, dest] of Object.entries(map)) {
  const src = join(__dirname, '..', 'docs', orig);
  if (!existsSync(src)) { console.warn(`Skip missing: ${orig}`); continue; }
  const body = readFileSync(src, 'utf8');
  const stage = stageFor(dest);
  const tags = tagsFor(body);
  const summary = summaryFor(body);
  const updated = new Date().toISOString().slice(0, 10);
  const frontmatter = [
    '---',
    `title: ${JSON.stringify(titleFor(orig))}`,
    `summary: ${JSON.stringify(summary)}`,
    `stage: ${stage}`,
    `tags: [${tags.map((t) => JSON.stringify(t)).join(', ')}]`,
    'figures: []',
    `updated: ${updated}`,
    '---',
    '',
  ].join('\n');
  const out = join(__dirname, '..', 'src', 'content', 'docs', dest);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, frontmatter + body);
  console.log(`Migrated ${orig} -> src/content/docs/${dest}`);
}
