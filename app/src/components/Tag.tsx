const styles: Record<string, string> = {
  DEMONSTRATED: 'bg-gold/15 text-gold',
  INFERRED: 'bg-cyan-2/15 text-cyan-2',
  PROPOSED: 'bg-amber/15 text-amber',
  SPECULATIVE: 'bg-rose/15 text-rose',
};

export function Tag({ stage }: { stage: 'DEMONSTRATED' | 'INFERRED' | 'PROPOSED' | 'SPECULATIVE' }) {
  return (
    <span className={`inline-block rounded-full px-2 py-0.5 font-mono text-xs font-semibold ${styles[stage]}`}>
      {stage}
    </span>
  );
}
