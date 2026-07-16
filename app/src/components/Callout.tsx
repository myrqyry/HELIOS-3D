const palette = {
  info: 'border-primary bg-primary/5',
  warning: 'border-error bg-error/5',
  note: 'border-cyan-2 bg-cyan-2/5',
};

export function Callout({
  type = 'info',
  title,
  children,
}: {
  type?: 'info' | 'warning' | 'note';
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <aside className={`my-4 rounded-xl border-l-4 p-4 ${palette[type]}`}>
      {title && <p className="mb-1 font-bold text-on-surface">{title}</p>}
      <div className="text-on-surface-variant text-sm">{children}</div>
    </aside>
  );
}
