export default function MathematicsSummary() {
  const equations = [
    {
      title: 'Topological Hopf Index (3D Knotting)',
      math: 'Q_H = \\int \\mathbf{A} \\cdot \\mathbf{B} \\, d^3r = 1',
      desc: 'Measures the linking number of preimages in a 3D magnetic soliton. A Hopf index of 1 ensures the texture forms a closed, stable knot.',
    },
    {
      title: '2D Topological Charge (Skyrmion Number)',
      math: 'Q = \\frac{1}{4\\pi} \\iint \\mathbf{m} \\cdot \\left(\\partial_x \\mathbf{m} \\times \\partial_y \\mathbf{m}\\right) \\, dx\\,dy',
      desc: 'Calculates the integer winding number of the spin texture in a 2D plane. Determines topological protection against local perturbations.',
    },
    {
      title: 'Dzyaloshinskii-Moriya Interaction (DMI)',
      math: 'H_{\\text{DMI}} = \\sum_{i,j} \\mathbf{D}_{ij} \\cdot (\\mathbf{S}_i \\times \\mathbf{S}_j)',
      desc: 'Interface-induced antisymmetric spin exchange that breaks inversion symmetry, forcing local spins to rotate into stable, chiral spin configurations.',
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {equations.map((eq, idx) => (
        <div key={idx} className="bg-obsidian-2/40 border border-obsidian-3/45 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-sm text-amber mb-3 font-mono">{eq.title}</h4>
            <div className="bg-obsidian/40 border border-obsidian-3/30 rounded-lg py-5 px-3 mb-4 text-center font-mono text-xs text-parchment overflow-x-auto">
              <code>{eq.math}</code>
            </div>
          </div>
          <p className="text-xs text-parchment-2 leading-relaxed">{eq.desc}</p>
        </div>
      ))}
    </div>
  );
}
