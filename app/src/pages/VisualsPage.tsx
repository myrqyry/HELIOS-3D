import { Helmet } from 'react-helmet-async';
import HopfionScene from '../components/r3f/HopfionScene';
import BrownianReservoirScene from '../components/r3f/BrownianReservoirScene';
import DmiStabilizerScene from '../components/r3f/DmiStabilizerScene';
import ReadoutScene from '../components/r3f/ReadoutScene';
import ScaleTransitionScene from '../components/r3f/ScaleTransitionScene';

const visuals = [
  { title: 'The magnetic knot', text: 'A rotatable 3D texture makes the stored state tangible.', Scene: HopfionScene },
  { title: 'Reservoir response', text: 'Inputs perturb a field; relaxation produces patterns a readout can learn.', Scene: BrownianReservoirScene },
  { title: 'Stabilization', text: 'Competing directions resolve into a coherent twist.', Scene: DmiStabilizerScene },
  { title: 'Readout', text: 'One magnetic state becomes one simple candidate signal.', Scene: ReadoutScene },
  { title: 'Scaling', text: 'The same knot repeats from a cell to a three-dimensional array.', Scene: ScaleTransitionScene },
];

export function VisualsPage() {
  return (
    <>
      <Helmet>
        <title>Visuals — HELIOS-3D</title>
        <meta name="description" content="Five curated visual explanations of magnetic knots, computation, readout, and scale." />
      </Helmet>
      <header className="mb-10 border-b border-obsidian-3 pb-6">
        <p className="mb-3 text-xs font-mono uppercase tracking-[0.2em] text-amber">Curated exhibit</p>
        <h1 className="mb-4 text-5xl font-bold text-amber">Visuals</h1>
        <p className="max-w-3xl text-lg leading-relaxed text-parchment-2">Five focused models answer the visitor’s next question. The complete technical gallery remains available in <a className="text-amber hover:underline" href="/figures">Figures</a>.</p>
      </header>
      <div className="grid gap-8 md:grid-cols-2">
        {visuals.map(({ title, text, Scene }) => (
          <article key={title} className="glass-card rounded-xl border border-obsidian-3/40 p-4">
            <Scene height="h-64" interactive={true} />
            <h2 className="mt-4 text-xl font-bold text-amber">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-parchment-2">{text}</p>
            <p className="sr-only">Static fallback: {text}</p>
          </article>
        ))}
      </div>
    </>
  );
}
