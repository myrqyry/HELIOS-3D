export default function CoreArchitectureSummary() {
  return (
    <div className="bg-obsidian-2/30 border border-obsidian-3/40 rounded-xl p-6">
      <div className="flex flex-col md:flex-row items-stretch justify-between gap-6">
        {/* Core A: MCA */}
        <div className="flex-1 bg-obsidian-2/50 border border-cyan-2/20 rounded-xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs text-cyan-2 font-bold uppercase tracking-wider">Core A</span>
              <span className="px-2 py-0.5 bg-cyan-2/10 text-cyan-2 text-[10px] uppercase font-semibold font-mono rounded">Deterministic</span>
            </div>
            <h4 className="text-lg font-bold text-parchment mb-2">Magnetic Cellular Automata (MCA)</h4>
            <p className="text-xs text-parchment-2 leading-relaxed">
              Executes synchronous, rule-based cell operations at structural interfaces. Operates as the deterministic logic layer handling routing, gates, and fixed registers using stable, guided spin textures.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-obsidian-3/30 font-mono text-[10px] text-parchment-2">
            Features: Discrete state transitions, clock gating, low leakage.
          </div>
        </div>

        {/* Data flow connector */}
        <div className="flex flex-row md:flex-col items-center justify-center gap-2 py-2 md:py-0">
          <div className="h-0.5 w-8 md:h-12 md:w-0.5 bg-gradient-to-r md:bg-gradient-to-b from-cyan-2 to-ember" />
          <span className="font-mono text-[10px] text-amber uppercase font-semibold">Bus</span>
          <div className="h-0.5 w-8 md:h-12 md:w-0.5 bg-gradient-to-r md:bg-gradient-to-b from-ember to-amber" />
        </div>

        {/* Core B: BRC */}
        <div className="flex-1 bg-obsidian-2/50 border border-ember/20 rounded-xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs text-ember font-bold uppercase tracking-wider">Core B</span>
              <span className="px-2 py-0.5 bg-ember/10 text-ember text-[10px] uppercase font-semibold font-mono rounded">Stochastic</span>
            </div>
            <h4 className="text-lg font-bold text-parchment mb-2">Brownian Reservoir Computing (BRC)</h4>
            <p className="text-xs text-parchment-2 leading-relaxed">
              Leverages thermal fluctuations and spin dynamics to project input vectors into high-dimensional phase space. Solves complex time-series, pattern recognition, and classification tasks near the thermodynamic limit.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-obsidian-3/30 font-mono text-[10px] text-parchment-2">
            Features: Fluctuational memory, high dimensionality, non-linear mapping.
          </div>
        </div>
      </div>

      <div className="mt-6 bg-obsidian-3/20 border border-outline-variant/30 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
        <div>
          <span className="font-semibold text-amber">Inter-Core Readout Channel:</span>
          <span className="text-parchment-2 ml-2">Transverse Responses & Topological Orbital Hall Effect (TOHE)</span>
        </div>
        <span className="font-mono text-[10px] text-parchment-2 bg-obsidian-2 border border-obsidian-3/50 px-2 py-0.5 rounded">
          Status: Inferred in simulation
        </span>
      </div>
    </div>
  );
}
