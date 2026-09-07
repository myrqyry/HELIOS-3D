import { DOMAINS, type DomainKnowledge } from '../../data/layeredKnowledge';
import { soundManager } from '../../services/audioSynthesizer';

interface DomainNavigatorBarProps {
  activeDomainId: string | null;
  onSelectDomain: (id: string | null) => void;
}

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
    <nav aria-label="Subsystem Navigator" className="pointer-events-none absolute inset-x-0 bottom-3 z-20 flex justify-center px-3">
      <div className="pointer-events-auto flex max-w-full items-center gap-1.5 overflow-x-auto rounded-2xl border border-obsidian-3 bg-obsidian/90 p-1.5 backdrop-blur-md shadow-2xl scrollbar-none">
        {/* All / Macro Overview Button */}
        <button
          type="button"
          onClick={() => {
            onSelectDomain(null);
            soundManager.playNodeBlip(400);
          }}
          className={`flex items-center gap-1.5 whitespace-nowrap rounded-xl px-3 py-2 text-xs font-medium transition-all ${
            activeDomainId === null
              ? 'bg-amber text-obsidian font-bold shadow-md'
              : 'text-parchment-2 hover:bg-obsidian-2 hover:text-parchment'
          }`}
        >
          <span className="font-mono text-[10px]">ALL</span>
          <span>Macro System</span>
        </button>

        <div className="h-4 w-px bg-obsidian-3 mx-0.5" />

        {/* 6 Subsystem Domain Buttons */}
        {DOMAINS.map((d) => {
          const isActive = activeDomainId === d.id;
          return (
            <button
              key={d.id}
              type="button"
              onClick={() => handleSelect(d)}
              className={`group flex items-center gap-2 whitespace-nowrap rounded-xl px-3 py-2 text-xs transition-all ${
                isActive
                  ? 'bg-obsidian-3 text-parchment border border-amber/50 shadow-md ring-1 ring-amber/30'
                  : 'text-parchment-2 hover:bg-obsidian-2 hover:text-parchment border border-transparent'
              }`}
            >
              <span
                className="h-2 w-2 rounded-full transition-transform group-hover:scale-125"
                style={{ backgroundColor: d.color }}
              />
              <div className="flex flex-col items-start leading-none">
                <div className="flex items-center gap-1">
                  <span className="font-mono text-[10px] text-parchment-2">{d.number}</span>
                  <span className="font-medium">{d.title}</span>
                </div>
                <span className="text-[9px] text-parchment-2/70 tracking-wide uppercase mt-0.5">
                  {d.badge}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
