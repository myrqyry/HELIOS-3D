import ClaimsTable from '../ClaimsTable';
import { groups } from '../../pages/EvidencePage';

export default function ClaimsMatrixSummary() {
  const allClaims = groups.flatMap((g) => g.rows);

  return (
    <div className="bg-obsidian-2/30 border border-obsidian-3/40 rounded-xl p-5">
      <p className="text-sm text-parchment-2 mb-6">
        The claims matrix is the primary ledger of the HELIOS-3D project. It distinguishes what has been physically demonstrated, inferred, proposed, or is speculative.
      </p>
      <ClaimsTable rows={allClaims} />
    </div>
  );
}
