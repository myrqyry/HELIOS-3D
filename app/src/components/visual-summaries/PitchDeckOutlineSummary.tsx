export default function PitchDeckOutlineSummary() {
  const slides = [
    { num: '01', title: 'The Thermodynamic Crisis', desc: 'Framing the AI energy crunch (600 TWh annual demand).' },
    { num: '02', title: 'Topological Solution', desc: 'Introducing 3D hopfions to run computing inside magnetic knots.' },
    { num: '03', title: 'The Dual-Core Architecture', desc: 'MCA (deterministic logic) + BRC (stochastic reservoir).' },
    { num: '04', title: 'Room-Temp Material Stability', desc: 'EuS/Bi₂Se₃/EuS interfaces and NaNbO₃ membranes.' },
    { num: '05', title: 'Fabrication & Measurement', desc: 'DISH, TPP, and ALD sequence alongside PEEM magnetic imaging.' },
  ];

  return (
    <div className="bg-obsidian-2/30 border border-obsidian-3/40 rounded-xl p-6">
      <div className="space-y-4">
        {slides.map((s, idx) => (
          <div key={idx} className="flex items-center gap-4 bg-obsidian-2/50 border border-obsidian-3/60 rounded-lg p-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-obsidian border border-ember font-mono text-xs font-bold text-amber">
              {s.num}
            </div>
            <div>
              <h5 className="font-bold text-sm text-parchment leading-snug">{s.title}</h5>
              <p className="text-xs text-parchment-2">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
