export type DocStage = 'established' | 'current' | 'speculative' | 'project-ops';

const config: Record<DocStage, { label: string; color: string; text: string; border: string }> = {
  established: { label: 'Established', color: 'cyan-2', text: 'text-cyan-2', border: 'border-cyan-2' },
  current: { label: 'Current', color: 'ember', text: 'text-ember', border: 'border-ember' },
  speculative: { label: 'Speculative', color: 'violet', text: 'text-violet', border: 'border-violet' },
  'project-ops': { label: 'Project Ops', color: 'parchment-2', text: 'text-parchment-2', border: 'border-parchment-2' },
};

export function StageBadge({ stage, size = 'md' }: { stage: DocStage; size?: 'sm' | 'md' }) {
  const c = config[stage];
  const padding = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-xs';

  return (
    <span className={`inline-block rounded font-mono uppercase tracking-wider ${padding} ${c.text} ${c.border} border`}>
      {c.label}
    </span>
  );
}
