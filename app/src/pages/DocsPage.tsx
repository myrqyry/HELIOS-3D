import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Suspense } from 'react';
import { DocHero } from '../components/DocHero';
import { TOC } from '../components/TOC';
import { DocVisualSummary } from '../components/DocVisualSummary';
import { getDoc } from '../lib/docs';

function DocContent({ stage, slug }: { stage: string; slug: string }) {
  const doc = getDoc(stage, slug);

  if (!doc) {
    return (
      <section className="mx-auto max-w-2xl rounded-xl border border-obsidian-3 bg-obsidian-2 p-6 text-center">
        <h1 className="mb-3 text-3xl font-bold text-amber">Page not found</h1>
        <p className="text-parchment-2">The document &quot;{stage}/{slug}&quot; does not exist.</p>
      </section>
    );
  }

  const MDXContent = doc.component;

  return (
    <>
      <DocHero
        title={doc.title}
        summary={doc.summary}
        stage={doc.stage}
        tags={doc.tags as Array<'DEMONSTRATED' | 'INFERRED' | 'PROPOSED' | 'SPECULATIVE'>}
        updated={new Date(doc.updated)}
      />
      <DocVisualSummary slug={slug} stage={stage} />
      <TOC headings={[]} />
      <MDXContent />
      <footer className="mt-12 pt-4 border-t border-obsidian-3 text-xs text-parchment-2 font-mono">
        Last updated: {doc.updated}
      </footer>
    </>
  );
}

export function DocsPage() {
  const { stage, slug } = useParams<{ stage: string; slug: string }>();

  return (
    <>
      <Helmet>
        <title>Loading… — HELIOS-3D</title>
      </Helmet>
      <Suspense fallback={<p className="text-parchment-2">Loading document…</p>}>
        {stage && slug && <DocContent stage={stage} slug={slug} />}
      </Suspense>
    </>
  );
}
