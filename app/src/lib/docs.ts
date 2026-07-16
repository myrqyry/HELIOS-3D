import { lazy, type ComponentType } from 'react';

export interface DocMeta {
  title: string;
  summary: string;
  stage: 'established' | 'current' | 'speculative' | 'project-ops';
  tags: string[];
  figures: string[];
  updated: string;
  stageSlug: string;
  slug: string;
}

const mdxModules = import.meta.glob<{ frontmatter: Record<string, unknown>; default: ComponentType }>(
  '../content/docs/**/*.mdx',
  { eager: true }
);

function parseDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === 'string') return value.slice(0, 10);
  return '2026-01-01';
}

export const docsManifest: Map<string, DocMeta & { component: ComponentType }> = new Map();

for (const [path, mod] of Object.entries(mdxModules)) {
  const fm = (mod.frontmatter || {}) as Record<string, unknown>;
  const match = path.match(/\/content\/docs\/(.+?)\/([^/]+)\.mdx$/);
  if (!match) continue;

  const stageSlug = match[1];
  const slug = match[2];

  const meta: DocMeta & { component: ComponentType } = {
    title: String(fm.title || ''),
    summary: String(fm.summary || ''),
    stage: stageSlug as DocMeta['stage'],
    tags: Array.isArray(fm.tags) ? fm.tags.map(String) : [],
    figures: Array.isArray(fm.figures) ? fm.figures.map(String) : [],
    updated: parseDate(fm.updated),
    stageSlug,
    slug,
    component: mod.default,
  };

  docsManifest.set(`${stageSlug}/${slug}`, meta);
}

export function getDoc(stage: string, slug: string) {
  return docsManifest.get(`${stage}/${slug}`);
}

export function getAllDocs(): DocMeta[] {
  return Array.from(docsManifest.values()).map(({ component: _, ...meta }) => meta);
}
