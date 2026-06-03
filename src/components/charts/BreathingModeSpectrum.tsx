import data from '../../data/breathing-spectrum.json';

export default function BreathingModeSpectrum({ height = 'h-64' }: { height?: string }) {
  const maxAmp = Math.max(...data.frequencies.map((d) => d.amplitude));
  const maxFreq = Math.max(...data.frequencies.map((d) => d.freqGhz));
  return (
    <div className={`w-full ${height} rounded-lg border border-obsidian-3 bg-obsidian-2 p-4`}>
      <h4 className="font-mono text-xs uppercase tracking-wider text-amber mb-3">Sub-GHz breathing-mode spectrum</h4>
      {data.frequencies.map((row) => (
        <div key={row.system} className="flex items-center gap-2 text-xs mb-2">
          <span className="w-64 text-parchment-2 truncate">{row.system}</span>
          <div className="flex-1 bg-obsidian-3 rounded h-4 overflow-hidden relative">
            <div className="h-full bg-ember" style={{ width: `${(row.amplitude / maxAmp) * 100}%` }} />
            <div className="absolute inset-y-0 border-l border-cyan-2" style={{ left: `${(row.freqGhz / maxFreq) * 100}%` }} />
          </div>
          <span className="font-mono text-amber w-20 text-right">{row.freqGhz} GHz</span>
        </div>
      ))}
    </div>
  );
}
