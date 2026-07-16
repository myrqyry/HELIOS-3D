import { Tag } from './Tag';

export function StatCard({
  stat,
  unit,
  label,
  source,
  tag,
}: {
  stat: string;
  unit?: string;
  label: string;
  source: string;
  tag: 'DEMONSTRATED' | 'INFERRED' | 'PROPOSED' | 'SPECULATIVE';
}) {
  return (
    <article className="glass-card rounded-xl p-8 flex flex-col gap-4 relative overflow-hidden group">
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-amber/5 rounded-full blur-2xl group-hover:bg-amber/10 transition-colors duration-500"></div>
      <div className="flex items-baseline gap-2">
        <span className="text-6xl font-extrabold tracking-tight text-amber drop-shadow-[0_0_15px_rgba(255,182,39,0.3)]">{stat}</span>
        {unit && <span className="text-lg text-parchment-2 font-mono font-medium">{unit}</span>}
      </div>
      <p className="text-parchment/90 text-base leading-relaxed">{label}</p>
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-obsidian-3/30">
        <Tag stage={tag} />
        <span className="font-mono text-xs text-parchment-2/80">{source}</span>
      </div>
    </article>
  );
}
