export type DocStage = 'established' | 'current' | 'speculative' | 'project-ops';

const config: Record<DocStage, { label: string; bg: string; text: string }> = {
  established: { label: 'Established', bg: 'bg-cyan-2/15', text: 'text-cyan-2' },
  current: { label: 'Current', bg: 'bg-ember/15', text: 'text-ember' },
  speculative: { label: 'Speculative', bg: 'bg-violet/15', text: 'text-violet' },
  'project-ops': { label: 'Project Ops', bg: 'bg-parchment-2/15', text: 'text-parchment-2' },
};

export function StageBadge({ stage, size = 'md' }: { stage: DocStage; size?: 'sm' | 'md' }) {
  const c = config[stage];
  const padding = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-xs';

  return (
    <span className={`inline-block rounded-full font-mono uppercase tracking-wider font-semibold ${padding} ${c.bg} ${c.text}`}>
      {c.label}
    </span>
  );
}
