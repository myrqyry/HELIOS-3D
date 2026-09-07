import { DOMAINS, type DomainKnowledge } from '../../data/layeredKnowledge';
import { soundManager } from '../../services/audioSynthesizer';

interface DomainNavigatorBarProps {
  activeDomainId: string | null;
  onSelectDomain: (id: string | null) => void;
}

const SHORT_NAMES: Record<string, string> = {
  hopfion: 'Hopfion',
  material_stack: 'Hetero',
  reservoir: 'Reservoir',
  tohe_readout: 'TOHE',
  moire_scaling: 'Moiré',
  milnor_optical: 'Milnor',
};

export function DomainNavigatorBar({
  activeDomainId,
  onSelectDomain,
}: DomainNavigatorBarProps) {
  const handleSelect = (domain: DomainKnowledge) => {
    if (activeDomainId === domain.id) {
      // Clicking active domain returns to overview
      onSelectDomain(null);
      soundManager.playNodeBlip(380);
    } else {
      onSelectDomain(domain.id);
      soundManager.playNodeBlip(560);
    }
  };

  return (
    <nav aria-label="Spintronic Flight Deck" className="pointer-events-none absolute inset-x-0 bottom-3 z-20 flex justify-center px-3">
      <div className="pointer-events-auto flex h-11 items-center gap-1 overflow-x-auto rounded-full border border-obsidian-3/90 bg-obsidian/92 px-2 py-1 backdrop-blur-md shadow-2xl scrollbar-none">
        {/* All / Macro Overview Channel */}
        <button
          type="button"
          onClick={() => {
            onSelectDomain(null);
            soundManager.playNodeBlip(400);
          }}
          className={`flex h-8 items-center gap-1.5 whitespace-nowrap rounded-full px-3 text-xs font-mono font-medium transition-all ${
            activeDomainId === null
              ? 'bg-amber text-obsidian font-bold shadow-md'
              : 'text-parchment-2 hover:bg-obsidian-2 hover:text-parchment'
          }`}
          title="Macro System Overview (all 6 subsystems)"
        >
          <span className="text-[10px] tracking-wider">ALL</span>
          <span className="hidden sm:inline">Macro</span>
        </button>

        <div className="h-4 w-px bg-obsidian-3 mx-0.5" />

        {/* 6 Subsystem Domain Channels */}
        {DOMAINS.map((d) => {
          const isActive = activeDomainId === d.id;
          const shortName = SHORT_NAMES[d.id] || d.title;
          return (
            <div key={d.id} className="relative group flex items-center">
              <button
                type="button"
                onClick={() => handleSelect(d)}
                className={`flex h-8 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 text-xs font-mono transition-all ${
                  isActive
                    ? 'bg-obsidian-3 text-parchment border border-amber/60 shadow-md ring-1 ring-amber/40 font-semibold'
                    : 'text-parchment-2 hover:bg-obsidian-2 hover:text-parchment border border-transparent'
                }`}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full transition-transform group-hover:scale-125"
                  style={{ backgroundColor: d.color }}
                />
                <span className="text-[10px] opacity-70">{d.number}</span>
                <span className="text-[11px] tracking-tight">{shortName}</span>
              </button>

              {/* Hover Tooltip showing full title, badge, and shortcut */}
              <div className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-30 whitespace-nowrap rounded-lg border border-obsidian-3/90 bg-obsidian/95 px-2.5 py-1 text-[11px] font-sans text-parchment shadow-xl backdrop-blur-md">
                <span className="font-mono text-amber mr-1.5">{d.number}</span>
                <span className="font-semibold text-parchment">{d.title}</span>
                <span className="text-parchment-2 text-[10px] ml-1.5 tracking-wide uppercase">
                  · {d.badge}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
