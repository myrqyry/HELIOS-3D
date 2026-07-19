export default function OpenQuestionsSummary() {
  const blockers = [
    {
      title: '1. Nanoparticle Size Control (LSTN Gating)',
      priority: 'CRITICAL',
      color: 'border-rose/30 text-rose bg-rose/5',
      description: 'Controlling the size, spacing, and density of exsolved metallic Ni nanoparticles on the LSTN substrate during vacuum annealing to ensure uniform magnetic gating.',
      unblock: 'Applying local laser-assisted heating profiles to guide exsolution patterns.'
    },
    {
      title: '2. 3D Spin Knot Verification (XMCD-PEEM)',
      priority: 'HIGH',
      color: 'border-ember/30 text-ember bg-ember/5',
      description: 'Resolving the internal 3D magnetic vector field of a hopfion ring under dynamic bias fields without photo-electron Lorentz deflection.',
      unblock: 'Integrating micro-scale soft ferromagnetic flux concentrators (MFCs) to enable high-field PEEM.'
    },
    {
      title: '3. Stochastic Thermal Noise Isolation',
      priority: 'MEDIUM',
      color: 'border-amber/30 text-amber bg-amber/5',
      description: 'Isolating BRC stochastic cells from environmental noise while preserving the controlled Brownian fluctuations that drive the reservoir computer.',
      unblock: 'Refining the topological barrier heights and implementing noise filter gates.'
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {blockers.map((b, idx) => (
        <div key={idx} className="bg-obsidian-2/40 border border-obsidian-3/45 rounded-xl p-5 flex flex-col justify-between hover:border-amber/25 transition">
          <div>
            <div className="flex items-center justify-between mb-3.5">
              <h4 className="font-bold text-parchment text-sm leading-snug">{b.title}</h4>
              <span className={`font-mono text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${b.color}`}>
                {b.priority}
              </span>
            </div>
            <p className="text-xs text-parchment-2 leading-relaxed mb-4">{b.description}</p>
          </div>
          <div className="pt-3 border-t border-obsidian-3/30">
            <span className="block text-[10px] font-mono text-amber font-semibold mb-0.5">Path to Unblock:</span>
            <p className="text-xs text-parchment-2 leading-relaxed">{b.unblock}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
