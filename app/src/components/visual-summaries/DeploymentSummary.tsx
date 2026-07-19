export default function DeploymentSummary() {
  const deployments = [
    { name: 'Vercel Deployment', url: 'https://helios-3d.vercel.app', status: 'Active', color: 'text-cyan-2 bg-cyan-2/10 border-cyan-2/20' },
    { name: 'GitHub Pages Mirror', url: 'https://myrqyry.github.io/HELIOS-3D', status: 'Synced', color: 'text-amber bg-amber/10 border-amber/20' },
  ];

  return (
    <div className="bg-obsidian-2/30 border border-obsidian-3/40 rounded-xl p-6 flex flex-col md:flex-row gap-6 justify-between items-stretch">
      <div className="flex-1 grid gap-4">
        {deployments.map((d, idx) => (
          <div key={idx} className="bg-obsidian-2/50 border border-obsidian-3/60 rounded-lg p-4 flex justify-between items-center">
            <div>
              <h5 className="font-bold text-sm text-parchment mb-1">{d.name}</h5>
              <a href={d.url} target="_blank" rel="noreferrer" className="text-xs text-amber hover:underline font-mono">
                {d.url}
              </a>
            </div>
            <span className={`font-mono text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${d.color}`}>
              {d.status}
            </span>
          </div>
        ))}
      </div>
      <div className="md:w-64 bg-obsidian-2/50 border border-obsidian-3/60 rounded-lg p-4 flex flex-col justify-between">
        <div>
          <h5 className="font-bold text-sm text-parchment mb-2 font-mono">Source Repository</h5>
          <p className="text-xs text-parchment-2 leading-relaxed">
            Main branch tracks current specifications, seeds, and unit test suites.
          </p>
        </div>
        <a
          href="https://github.com/myrqyry/HELIOS-3D"
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center justify-center rounded bg-amber py-2 text-xs font-bold text-obsidian hover:bg-gold transition"
        >
          View GitHub Repository
        </a>
      </div>
    </div>
  );
}
