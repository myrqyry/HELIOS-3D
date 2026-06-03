import data from '../../data/energy-barrier.json';

export default function EnergyBarrier({ height = 'h-64' }: { height?: string }) {
  const max = Math.max(...data.configurations.map((d) => d.kbT));
  return (
    <div className={`w-full ${height} rounded-lg border border-obsidian-3 bg-obsidian-2 p-4`}>
      <h4 className="font-mono text-xs uppercase tracking-wider text-amber mb-3">Energy barrier (k_B T)</h4>
      {data.configurations.map((row) => (
        <div key={row.name} className="flex items-center gap-2 text-xs mb-2">
          <span className="w-56 text-parchment-2 truncate">{row.name}</span>
          <div className="flex-1 bg-obsidian-3 rounded h-4 overflow-hidden">
            <div className="h-full bg-amber" style={{ width: `${(row.kbT / max) * 100}%` }} />
          </div>
          <span className="font-mono text-amber w-16 text-right">{row.kbT}</span>
        </div>
      ))}
    </div>
  );
}
