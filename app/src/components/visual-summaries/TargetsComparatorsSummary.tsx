export default function TargetsComparatorsSummary() {
  const comparisons = [
    {
      metric: 'Write Speed',
      sram: '~0.1 - 1 ns',
      mram: '~1 - 10 ns',
      helios: '< 1 ns (Target)',
      rating: 'Equivalent to high-speed cache'
    },
    {
      metric: 'Write Energy',
      sram: '~1 - 10 pJ/bit',
      mram: '~100 - 500 fJ/bit',
      helios: '< 10 fJ/bit (Target)',
      rating: 'Up to 50x lower energy than MRAM'
    },
    {
      metric: 'Dimensionality',
      sram: 'Planar (2D)',
      mram: 'Planar / Stacked',
      helios: 'Monolithic 3D Array',
      rating: 'High-density 3D integration'
    },
  ];

  return (
    <div className="bg-obsidian-2/30 border border-obsidian-3/40 rounded-xl p-6">
      <div className="overflow-x-auto rounded-lg border border-obsidian-3/30 bg-obsidian-2/50 mb-6">
        <table className="w-full text-sm border-collapse min-w-[500px]">
          <thead>
            <tr className="border-b border-obsidian-3/40 bg-obsidian-2/65 text-left text-amber font-mono text-xs uppercase tracking-wider">
              <th className="py-3 px-4 font-bold">Metric</th>
              <th className="py-3 px-4 font-bold text-parchment-2">SRAM</th>
              <th className="py-3 px-4 font-bold text-parchment-2">MRAM</th>
              <th className="py-3 px-4 font-bold text-amber">HELIOS-3D Target</th>
              <th className="py-3 px-4 font-bold text-parchment-2">Design Rationale</th>
            </tr>
          </thead>
          <tbody>
            {comparisons.map((row, idx) => (
              <tr key={idx} className="border-b border-obsidian-3/30 hover:bg-obsidian-3/15 transition-colors">
                <td className="py-3 px-4 font-bold text-parchment">{row.metric}</td>
                <td className="py-3 px-4 font-mono text-xs text-parchment-2">{row.sram}</td>
                <td className="py-3 px-4 font-mono text-xs text-parchment-2">{row.mram}</td>
                <td className="py-3 px-4 font-mono text-xs text-amber font-bold">{row.helios}</td>
                <td className="py-3 px-4 text-xs text-parchment-2">{row.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-parchment-2 leading-relaxed font-mono">
        * Note: SRAM/MRAM figures represent current state-of-the-art industry benchmarks. HELIOS-3D figures are project targets under evaluation.
      </p>
    </div>
  );
}
