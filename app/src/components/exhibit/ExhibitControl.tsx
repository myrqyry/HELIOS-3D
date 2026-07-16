export interface ExhibitControlProps {
  label: string;
  paused: boolean;
  onToggle: () => void;
}

export function ExhibitControl({ label, paused, onToggle }: ExhibitControlProps) {
  return (
    <button
      type="button"
      className="exhibit-control"
      aria-pressed={paused}
      onClick={onToggle}
    >
      <span aria-hidden="true">{paused ? '▶' : 'Ⅱ'}</span>
      {label}
    </button>
  );
}
