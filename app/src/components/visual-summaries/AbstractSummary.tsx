import HopfionScene from '../r3f/HopfionScene';

export default function AbstractSummary() {
  const stats = [
    { label: 'Target Write Speed', value: '< 1 ns', desc: 'Sub-nanosecond switching thresholds' },
    { label: 'Target Energy Density', value: '< 10 fJ/bit', desc: 'Ultra-low dissipation near Landauer limit' },
    { label: 'Materials in Scope', value: '3 Systems', desc: 'EuS/Bi₂Se₃/EuS, FGT, and NaNbO₃ membranes' },
    { label: 'Current Phase', value: 'Phase-1', desc: 'Demonstrator validation pipeline' },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-12 bg-obsidian-2/30 border border-obsidian-3/40 rounded-xl p-6">
      <div className="md:col-span-8 grid gap-4 grid-cols-2">
        {stats.map((s, idx) => (
          <div key={idx} className="bg-obsidian/30 border border-obsidian-3/30 rounded-lg p-4">
            <span className="block text-xs font-mono text-parchment-2 uppercase tracking-wider mb-1">{s.label}</span>
            <span className="block text-2xl font-extrabold text-amber mb-1">{s.value}</span>
            <span className="block text-xs text-parchment-2">{s.desc}</span>
          </div>
        ))}
      </div>
      <div className="md:col-span-4 flex flex-col justify-center items-center border-t md:border-t-0 md:border-l border-obsidian-3/40 pt-4 md:pt-0 md:pl-6">
        <div className="w-full max-w-[180px] rounded-lg overflow-hidden border border-amber/10 bg-obsidian-2/50 p-2 shadow-lg">
          <HopfionScene height="h-32" interactive={false} />
        </div>
        <span className="mt-2 text-[10px] font-mono text-parchment-2">3D Topological Knot</span>
      </div>
    </div>
  );
}
