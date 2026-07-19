export default function ProposedFabricationSummary() {
  const steps = [
    {
      num: '01',
      title: 'DISH Transfer',
      desc: 'Topological insulator (Bi₂Se₃) layer transfer onto the EuS magnetic substrate.',
    },
    {
      num: '02',
      title: 'TPP Direct Writing',
      desc: 'Two-Photon Polymerization lithography prints the sub-micron 3D polymer scaffold.',
    },
    {
      num: '03',
      title: 'ALD Infiltration',
      desc: 'Atomic Layer Deposition infuses functional oxide films conformal to the printed scaffold.',
    },
    {
      num: '04',
      title: 'Thermal Annealing',
      desc: 'Thermal treatment establishes strong interlayer chemical bonding (e.g. NaNbO₃ twist-boundaries).',
    },
    {
      num: '05',
      title: 'PEEM Integration',
      desc: 'Flower-like flux concentrators (MFCs) are micro-fabricated for high-field in-situ imaging.',
    },
  ];

  return (
    <div className="bg-obsidian-2/30 border border-obsidian-3/40 rounded-xl p-6">
      <div className="flex flex-col lg:flex-row items-stretch gap-4">
        {steps.map((s, idx) => (
          <div key={idx} className="flex-1 bg-obsidian-2/50 border border-obsidian-3/60 rounded-lg p-4 flex flex-col justify-between hover:border-amber/25 transition">
            <div>
              <span className="block font-mono text-xs text-ember font-bold mb-2">{s.num} / STEP</span>
              <h4 className="font-bold text-sm text-parchment mb-2">{s.title}</h4>
              <p className="text-xs text-parchment-2 leading-relaxed">{s.desc}</p>
            </div>
            {idx < steps.length - 1 && (
              <div className="hidden lg:block self-end mt-4 text-xs font-semibold text-amber font-mono">
                →
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
