export function Diagram({
  caption,
  height = 'h-64',
  children,
}: {
  caption?: string;
  height?: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="my-6">
      <div className={`w-full ${height} rounded-lg border border-obsidian-3 bg-obsidian-2 p-4`}>
        {children}
      </div>
      {caption && <figcaption className="mt-2 text-sm text-parchment-2 text-center">{caption}</figcaption>}
    </figure>
  );
}
