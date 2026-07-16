import { useId, type ReactNode } from 'react';

export interface ExhibitSectionProps {
  eyebrow: string;
  title: string;
  description: string;
  id?: string;
  evidenceLabel?: string;
  evidenceHref?: string;
  children: ReactNode;
}

function sanitizeSectionId(id: string): string {
  return id.trim().replace(/[^a-zA-Z0-9_-]/g, '');
}

export function ExhibitSection({
  eyebrow,
  title,
  description,
  id,
  evidenceLabel,
  evidenceHref,
  children,
}: ExhibitSectionProps) {
  const generatedId = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const sanitizedId = id === undefined ? '' : sanitizeSectionId(id);
  const sectionId = sanitizedId || `exhibit-section-${generatedId}`;
  const headingId = `${sectionId}-heading`;
  const hasEvidenceLink = Boolean(evidenceLabel && evidenceHref);

  return (
    <section id={sectionId} className="exhibit-section" aria-labelledby={headingId}>
      <div className="exhibit-section__grid">
        <header className="exhibit-section__intro">
          <p className="exhibit-section__eyebrow">{eyebrow}</p>
          <h2 id={headingId} className="exhibit-section__title">
            {title}
          </h2>
          <p className="exhibit-section__description">{description}</p>
          {hasEvidenceLink && (
            <a className="exhibit-section__evidence" href={evidenceHref}>
              {evidenceLabel} <span aria-hidden="true">→</span>
            </a>
          )}
        </header>
        <div className="exhibit-section__visual">{children}</div>
      </div>
    </section>
  );
}
