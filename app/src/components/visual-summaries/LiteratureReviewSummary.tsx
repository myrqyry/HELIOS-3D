import LiteratureTimeline from '../charts/LiteratureTimeline';

export default function LiteratureReviewSummary() {
  return (
    <div className="bg-obsidian-2/30 border border-obsidian-3/40 rounded-xl p-5">
      <p className="text-sm text-parchment-2 mb-6">
        Below is the chronological timeline mapping major scientific publications and experimental results supporting the HELIOS-3D spintronic coprocessor architecture.
      </p>
      <LiteratureTimeline />
    </div>
  );
}
