export function SectionHeading({
  number,
  title,
  color = 'ember',
}: {
  number: string;
  title: string;
  color?: 'ember' | 'cyan-2' | 'violet' | 'parchment-2';
}) {
  const colorClass = `text-${color}`;

  return (
    <div className="flex items-baseline gap-4 mb-6">
      <span className={`font-sans font-bold text-sm ${colorClass}`}>{number}</span>
      <span className="h-px flex-1 bg-current opacity-30"></span>
      <h2 className={`font-sans text-sm font-bold uppercase tracking-wider ${colorClass}`}>{title}</h2>
    </div>
  );
}
