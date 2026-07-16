export function Hero({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="relative isolate overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-12">
        <h1 className="text-5xl md:text-6xl font-bold text-amber tracking-tight">{title}</h1>
        <p className="mt-4 text-lg text-parchment-2 max-w-2xl">{subtitle}</p>
      </div>
    </header>
  );
}
