import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Suspense, useRef } from 'react';
import { DocHero } from '../components/DocHero';
import { TOC } from '../components/TOC';
import { DocVisualSummary } from '../components/DocVisualSummary';
import { getDoc } from '../lib/docs';
import { useMathJax } from '../lib/mathjax';
import {
  FootnoteHoverTrigger,
  FootnoteBackref,
  CitationHoverPreview,
} from '../components/ui/CitationHoverPreview';

const mdxComponents = {
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement> & Record<string, unknown>) => {
    const isFootnoteRef =
      props['data-footnote-ref'] !== undefined ||
      Boolean(props.id?.startsWith('user-content-fnref-')) ||
      Boolean(props.id?.startsWith('fnref-')) ||
      Boolean(props.href && (props.href.startsWith('#user-content-fn-') || props.href.startsWith('#fn-')));

    if (isFootnoteRef) {
      return <FootnoteHoverTrigger {...props} />;
    }

    const isFootnoteBackref =
      props['data-footnote-backref'] !== undefined ||
      Boolean(props.className?.includes('data-footnote-backref')) ||
      Boolean(props.href && (props.href.startsWith('#user-content-fnref-') || props.href.startsWith('#fnref-')));

    if (isFootnoteBackref) {
      return <FootnoteBackref {...props} />;
    }

    return <a {...props} />;
  },
  section: (props: React.HTMLAttributes<HTMLElement> & Record<string, unknown>) => {
    if (props['data-footnotes'] !== undefined || props.className?.includes('footnotes')) {
      return (
        <section
          {...props}
          className="footnotes mt-16 pt-8 border-t border-obsidian-3/80 font-sans text-sm text-parchment-2"
        />
      );
    }
    return <section {...props} />;
  },
  FootnoteRef: FootnoteHoverTrigger,
  Citation: CitationHoverPreview,
  CitationHoverPreview,
};

function DocContent({ stage, slug }: { stage: string; slug: string }) {
  const doc = getDoc(stage, slug);
  const containerRef = useRef<HTMLDivElement>(null);

  useMathJax(containerRef, [stage, slug, doc]);

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
    <div ref={containerRef} className="doc-content-container">
      <DocHero
        title={doc.title}
        summary={doc.summary}
        stage={doc.stage}
        tags={doc.tags as Array<'DEMONSTRATED' | 'INFERRED' | 'PROPOSED' | 'SPECULATIVE'>}
        updated={new Date(doc.updated)}
      />
      <DocVisualSummary slug={slug} stage={stage} />
      <TOC headings={[]} />
      <MDXContent components={mdxComponents} />
      <footer className="mt-12 pt-4 border-t border-obsidian-3 text-xs text-parchment-2 font-sans font-medium">
        Last updated: {doc.updated}
      </footer>
    </div>
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
