export default function DefensiveFrameworkSummary() {
  const QA = [
    {
      q: 'Critique: Stabilizing 3D magnetic knots at room temperature is physically unfeasible.',
      a: 'Response: EuS/Bi₂Se₃/EuS interfaces demonstrate room-temperature chiral spin locking without field bias. Further stability is verified in NaNaNbO₃ membranes.'
    },
    {
      q: 'Critique: Brownian reservoir computing is too slow or too noisy for practical spintronics.',
      a: 'Response: Noise is an active resource rather than a hazard. Brownian fluctuations are sampled to project inputs into high-dimensional states, scaling near Landauer limits.'
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {QA.map((item, idx) => (
        <div key={idx} className="bg-obsidian-2/40 border border-obsidian-3/45 rounded-xl p-5 flex flex-col justify-between hover:border-amber/25 transition">
          <div className="mb-4">
            <span className="inline-block px-2.5 py-0.5 rounded bg-rose/10 border border-rose/20 text-rose text-[9px] font-mono font-bold uppercase tracking-wider mb-3">CRITIQUE</span>
            <p className="font-bold text-sm text-parchment leading-snug">{item.q}</p>
          </div>
          <div className="pt-4 border-t border-obsidian-3/30 bg-obsidian-2/10">
            <span className="inline-block px-2.5 py-0.5 rounded bg-cyan-2/10 border border-cyan-2/20 text-cyan-2 text-[9px] font-mono font-bold uppercase tracking-wider mb-2">RESPONSE</span>
            <p className="text-xs text-parchment-2 leading-relaxed">{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
