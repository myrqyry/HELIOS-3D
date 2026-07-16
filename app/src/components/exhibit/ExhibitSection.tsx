import type { ReactNode } from 'react';

export interface ExhibitSectionProps {
  eyebrow: string;
  title: string;
  description: string;
  evidenceLabel?: string;
  evidenceHref?: string;
  children: ReactNode;
}

export function ExhibitSection({
  eyebrow,
  title,
  description,
  evidenceLabel,
  evidenceHref,
  children,
}: ExhibitSectionProps) {
  const hasEvidenceLink = Boolean(evidenceLabel && evidenceHref);

  return (
    <section className="exhibit-section" aria-labelledby={`${title}-heading`}>
      <div className="exhibit-section__grid">
        <header className="exhibit-section__intro">
          <p className="exhibit-section__eyebrow">{eyebrow}</p>
          <h2 id={`${title}-heading`} className="exhibit-section__title">
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
