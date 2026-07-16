import data from '../../data/performance-floor.json';

const speedMax = Math.max(...data.writeSpeedPs.map((d) => d.value));
const energyMax = Math.max(...data.energyDensityPjPerUm2.map((d) => d.value));

export interface PerformanceFloorProps {
  height?: string;
}

export default function PerformanceFloor({ height = 'h-64' }: PerformanceFloorProps) {
  return (
    <div className={`w-full ${height} rounded-lg border border-obsidian-3 bg-obsidian-2 p-4 grid md:grid-cols-2 gap-6`}>
      <div>
        <h4 className="font-mono text-xs uppercase tracking-wider text-amber mb-3">Write speed (log scale, ps)</h4>
        {data.writeSpeedPs.map((row) => (
          <div key={row.system} className="flex items-center gap-2 text-xs mb-1.5">
            <span className="w-48 text-parchment-2 truncate">{row.system}</span>
            <div className="flex-1 bg-obsidian-3 rounded h-3 overflow-hidden">
              <div className="h-full bg-ember" style={{ width: `${(Math.log10(row.value) / Math.log10(speedMax)) * 100}%` }} />
            </div>
            <span className="font-mono text-amber w-16 text-right">{row.label}</span>
          </div>
        ))}
      </div>
      <div>
        <h4 className="font-mono text-xs uppercase tracking-wider text-amber mb-3">Energy density (pJ/µm²)</h4>
        {data.energyDensityPjPerUm2.map((row) => (
          <div key={row.system} className="flex items-center gap-2 text-xs mb-1.5">
            <span className="w-48 text-parchment-2 truncate">{row.system}</span>
            <div className="flex-1 bg-obsidian-3 rounded h-3 overflow-hidden">
              <div className="h-full bg-amber" style={{ width: `${(row.value / energyMax) * 100}%` }} />
            </div>
            <span className="font-mono text-amber w-16 text-right">{row.value.toFixed(3)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
