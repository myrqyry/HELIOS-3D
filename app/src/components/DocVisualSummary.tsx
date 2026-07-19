import { lazy, Suspense } from 'react';

const AbstractSummary = lazy(() => import('./visual-summaries/AbstractSummary'));
const CoreArchitectureSummary = lazy(() => import('./visual-summaries/CoreArchitectureSummary'));
const CandidateMaterialsSummary = lazy(() => import('./visual-summaries/CandidateMaterialsSummary'));
const LiteratureReviewSummary = lazy(() => import('./visual-summaries/LiteratureReviewSummary'));
const MathematicsSummary = lazy(() => import('./visual-summaries/MathematicsSummary'));
const ClaimsMatrixSummary = lazy(() => import('./visual-summaries/ClaimsMatrixSummary'));
const TargetsComparatorsSummary = lazy(() => import('./visual-summaries/TargetsComparatorsSummary'));
const OpenQuestionsSummary = lazy(() => import('./visual-summaries/OpenQuestionsSummary'));
const AlternativeMaterialsSummary = lazy(() => import('./visual-summaries/AlternativeMaterialsSummary'));
const DefensiveFrameworkSummary = lazy(() => import('./visual-summaries/DefensiveFrameworkSummary'));
const PitchDeckOutlineSummary = lazy(() => import('./visual-summaries/PitchDeckOutlineSummary'));
const ProposedFabricationSummary = lazy(() => import('./visual-summaries/ProposedFabricationSummary'));
const DeploymentSummary = lazy(() => import('./visual-summaries/DeploymentSummary'));

interface DocVisualSummaryProps {
  slug: string;
  stage: string;
}

export function DocVisualSummary({ slug }: DocVisualSummaryProps) {
  let summaryComponent = null;

  switch (slug) {
    case 'abstract':
      summaryComponent = <AbstractSummary />;
      break;
    case 'core-architecture':
      summaryComponent = <CoreArchitectureSummary />;
      break;
    case 'candidate-materials-and-mechanisms':
      summaryComponent = <CandidateMaterialsSummary />;
      break;
    case 'literature-review':
      summaryComponent = <LiteratureReviewSummary />;
      break;
    case 'mathematics':
      summaryComponent = <MathematicsSummary />;
      break;
    case 'claims-matrix':
      summaryComponent = <ClaimsMatrixSummary />;
      break;
    case 'targets-comparators-and-projections':
      summaryComponent = <TargetsComparatorsSummary />;
      break;
    case 'open-questions':
      summaryComponent = <OpenQuestionsSummary />;
      break;
    case 'alternative-materials-and-methods':
      summaryComponent = <AlternativeMaterialsSummary />;
      break;
    case 'defensive-framework':
      summaryComponent = <DefensiveFrameworkSummary />;
      break;
    case 'pitch-deck-outline':
      summaryComponent = <PitchDeckOutlineSummary />;
      break;
    case 'proposed-fabrication-path-and-control':
      summaryComponent = <ProposedFabricationSummary />;
      break;
    case 'deployment':
      summaryComponent = <DeploymentSummary />;
      break;
    default:
      return null;
  }

  return (
    <div className="mb-10 p-1 border-b border-obsidian-3/30 pb-10">
      <div className="font-mono text-[10px] uppercase tracking-wider text-amber mb-4">
        Visual Summary
      </div>
      <Suspense fallback={<div className="h-24 flex items-center justify-center text-sm text-parchment-2 font-mono">Loading visual summary...</div>}>
        {summaryComponent}
      </Suspense>
    </div>
  );
}
