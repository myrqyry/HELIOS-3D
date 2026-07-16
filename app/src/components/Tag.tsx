const styles: Record<string, string> = {
  DEMONSTRATED: 'border-gold text-gold',
  INFERRED: 'border-cyan-2 text-cyan-2',
  PROPOSED: 'border-amber text-amber',
  SPECULATIVE: 'border-rose text-rose',
};

export function Tag({ stage }: { stage: 'DEMONSTRATED' | 'INFERRED' | 'PROPOSED' | 'SPECULATIVE' }) {
  return (
    <span className={`inline-block rounded border px-2 py-0.5 font-mono text-xs ${styles[stage]}`}>
      {stage}
    </span>
  );
}
