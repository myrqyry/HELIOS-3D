export function Figure({
  src,
  alt,
  caption,
  width = 1200,
  height = 800,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}) {
  return (
    <figure className="my-6">
      <img src={src} alt={alt} width={width} height={height} className="w-full rounded-lg border border-obsidian-3" loading="lazy" decoding="async" />
      {caption && <figcaption className="mt-2 text-sm text-parchment-2 text-center">{caption}</figcaption>}
    </figure>
  );
}
