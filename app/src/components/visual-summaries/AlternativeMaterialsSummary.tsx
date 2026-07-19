export default function AlternativeMaterialsSummary() {
  const tradeOffs = [
    {
      axis: 'Primary Path',
      approach: 'Monolithic TPP Direct Writing + ALD Infiltration',
      trade: 'High precision and topological control; complex oxide infiltration step.',
    },
    {
      axis: 'Alternative Path A',
      approach: 'NaNbO₃ Oxide Membrane Twist-Engineering',
      trade: 'Strong interlayer bonds and moiré containment; limited to planar layers.',
    },
    {
      axis: 'Alternative Path B',
      approach: 'Wet Chemical Hydrothermal Scaffolding',
      trade: 'High-throughput scaling; lower spatial resolution and domain alignment issues.',
    },
  ];

  return (
    <div className="bg-obsidian-2/30 border border-obsidian-3/40 rounded-xl p-6">
      <div className="space-y-4">
        {tradeOffs.map((t, idx) => (
          <div key={idx} className="bg-obsidian-2/50 border border-obsidian-3/60 rounded-lg p-4">
            <h4 className="font-mono text-xs text-amber font-bold uppercase tracking-wider mb-2">{t.axis}</h4>
            <p className="font-bold text-sm text-parchment mb-1">{t.approach}</p>
            <p className="text-xs text-parchment-2 leading-relaxed">{t.trade}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
