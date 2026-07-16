import { useMemo } from 'react';
import { getResearchTimelineRows, type ResearchTimelineRow } from '../../data/research-ingestion';

const tagColor: Record<ResearchTimelineRow['tag'], string> = {
  DEMONSTRATED: 'bg-gold',
  INFERRED: 'bg-cyan-2',
  FABRICATION: 'bg-cyan-2',
  PROPOSED: 'bg-amber',
  SPECULATIVE: 'bg-rose',
};

export default function LiteratureTimeline({ height = 'h-48' }: { height?: string }) {
  const rows = useMemo(() => getResearchTimelineRows(), []);

  return (
    <div className={`w-full ${height} rounded-lg border border-obsidian-3 bg-obsidian-2 p-4 overflow-x-auto`}>
      <h4 className="font-mono text-xs uppercase tracking-wider text-amber mb-3">Literature timeline 2024–2026</h4>
      <div className="flex items-end gap-1 min-w-[600px] h-32">
        {rows.map((row, i) => (
          <div key={row.id} className="flex-1 flex flex-col items-center gap-1">
            <div className={`w-full rounded-t ${tagColor[row.tag] ?? 'bg-ember'}`} style={{ height: `${20 + (i * 5) % 80}px` }} />
            <span className="font-mono text-xs text-parchment-2">{row.year}</span>
            <span className="text-xs text-parchment text-center leading-tight">{row.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
