import { StageBadge, type DocStage } from './StageBadge';
import { Tag } from './Tag';

export function DocHero({
  title,
  summary,
  stage,
  tags,
  updated,
}: {
  title: string;
  summary: string;
  stage: DocStage;
  tags: Array<'DEMONSTRATED' | 'INFERRED' | 'PROPOSED' | 'SPECULATIVE'>;
  updated: Date;
}) {
  const updatedStr = updated.toISOString().slice(0, 10);

  return (
    <header className="mb-8 pb-6 border-b border-obsidian-3">
      <div className="flex items-center gap-3 mb-3">
        <StageBadge stage={stage} />
        <span className="font-mono text-xs text-parchment-2">Updated {updatedStr}</span>
      </div>
      <h1 className="text-5xl font-bold text-amber mb-3 leading-tight">{title}</h1>
      <p className="text-lg text-parchment-2 max-w-2xl">{summary}</p>
      {tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {tags.map((t) => <Tag key={t} stage={t} />)}
        </div>
      )}
    </header>
  );
}
