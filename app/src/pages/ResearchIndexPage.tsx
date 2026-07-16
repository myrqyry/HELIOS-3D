import { Helmet } from 'react-helmet-async';
import { ResearchBrowser } from '../components/ResearchBrowser';
import { researchBrowserIndex } from '../data/research-browser';

export function ResearchIndexPage() {
  return (
    <>
      <Helmet>
        <title>Research browser — HELIOS-3D</title>
        <meta name="description" content="Search the normalized HELIOS-3D research records." />
      </Helmet>
      <header className="mb-10 border-b border-obsidian-3 pb-6">
        <p className="mb-3 text-xs font-mono uppercase tracking-[0.2em] text-amber">Public research</p>
        <h1 className="mb-4 text-5xl font-bold text-amber">Research browser</h1>
        <p className="max-w-3xl text-lg leading-relaxed text-parchment-2">
          Search the same normalized research records that feed the public overview and the literature timeline.
        </p>
      </header>
      <ResearchBrowser records={researchBrowserIndex.records} />
    </>
  );
}
