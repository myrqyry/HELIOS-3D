import { StageBadge } from '../StageBadge';

export default function CandidateMaterialsSummary() {
  const materials = [
    {
      name: 'EuS/Bi₂Se₃/EuS Trilayer',
      role: 'Topological insulator + magnetic insulator heterostructure.',
      benefit: 'Stabilizes chiral textures (hopfions/skyrmions) at topological interfaces without external field bias.',
      evidence: 'Demonstrated room-temperature stability (Katmis et al.).',
      stage: 'established' as const,
    },
    {
      name: 'Fe₃GaTe₂ (FGT)',
      role: '2D van der Waals ferromagnet.',
      benefit: 'Maintains long-range magnetic ordering above room temperature (Curie temp ~360 K) with strong perpendicular magnetic anisotropy (PMA).',
      evidence: 'Proven out in thin-flake exfoliation trials.',
      stage: 'established' as const,
    },
    {
      name: 'Mn₃Sn',
      role: 'Noncollinear antiferromagnet.',
      benefit: 'Exhibits large anomalous Hall and Nernst effects driven by Weyl nodes, offering highly responsive readout channels.',
      evidence: 'Simulation benchmarked for transverse response.',
      stage: 'current' as const,
    },
    {
      name: 'NaNbO₃ Membranes',
      role: 'Twist-engineered oxide membranes.',
      benefit: 'Thermal annealing establishes strong interlayer bonding, altering localized phase structures for moiré potential containment.',
      evidence: 'Deterministic twist control verified (Ghanbari et al.).',
      stage: 'established' as const,
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {materials.map((m, idx) => (
        <div key={idx} className="glass-card rounded-xl border border-obsidian-3 bg-obsidian-2/30 p-5 flex flex-col justify-between hover:border-amber/20 transition-all duration-200">
          <div>
            <div className="flex items-center justify-between mb-3.5">
              <h4 className="font-bold text-amber text-base leading-snug">{m.name}</h4>
              <StageBadge stage={m.stage} size="sm" />
            </div>
            <p className="text-xs text-parchment font-medium mb-2">{m.role}</p>
            <p className="text-xs text-parchment-2 leading-relaxed mb-4">{m.benefit}</p>
          </div>
          <div className="pt-3 border-t border-obsidian-3/30 text-[10px] font-mono text-parchment-2/80">
            Grounding: {m.evidence}
          </div>
        </div>
      ))}
    </div>
  );
}
