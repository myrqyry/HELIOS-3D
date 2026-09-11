import React, { useState, useRef, useEffect, useCallback } from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { ExternalLink, BookOpen, ArrowDown, ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { researchRecords, type ResearchRecord, type EvidenceLevel } from '../../data/research-ingestion';
import { typesetMathJax } from '../../lib/mathjax';

export interface ExtractedFootnote {
  id: string;
  label: string;
  text: string;
  html: string;
  links: Array<{ href: string; label: string }>;
  matchedRecord?: ResearchRecord;
}

const evidenceBadgeStyles: Record<EvidenceLevel, { label: string; badge: string }> = {
  DEMONSTRATED: {
    label: 'Demonstrated',
    badge: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
  },
  INFERRED: {
    label: 'Inferred',
    badge: 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30',
  },
  PROPOSED: {
    label: 'Proposed',
    badge: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
  },
  SPECULATIVE: {
    label: 'Speculative',
    badge: 'bg-purple-500/15 text-purple-400 border border-purple-500/30',
  },
};

/**
 * Matches extracted footnote text, id, or external links to the canonical HELIOS research records.
 */
export function findMatchingResearchRecord(
  footnoteId: string,
  text: string,
  links: Array<{ href: string; label: string }>
): ResearchRecord | undefined {
  const normText = text.toLowerCase();
  const cleanId = footnoteId.toLowerCase().replace(/^(user-content-)?fn-?/, '');

  // 1. Direct ID match
  const byId = researchRecords.find(
    (r) => r.id.toLowerCase() === cleanId || cleanId.includes(r.id.toLowerCase())
  );
  if (byId) return byId;

  // 2. DOI / URL match
  for (const link of links) {
    const linkHref = link.href.toLowerCase();
    const byUrl = researchRecords.find((r) => {
      if (!r.url) return false;
      const recUrl = r.url.toLowerCase();
      return linkHref.includes(recUrl) || recUrl.includes(linkHref);
    });
    if (byUrl) return byUrl;
  }

  // 3. Keyword / Author match
  for (const r of researchRecords) {
    const prefix = r.id.split('-')[0]?.toLowerCase();
    if (prefix && prefix.length >= 4 && normText.includes(prefix)) {
      return r;
    }
  }

  return undefined;
}

/**
 * Extracts footnote definition content from the DOM.
 */
export function extractFootnoteFromDOM(targetId: string): ExtractedFootnote | null {
  if (typeof document === 'undefined') return null;

  const el =
    document.getElementById(targetId) ||
    document.getElementById(`user-content-${targetId}`) ||
    document.getElementById(targetId.replace(/^user-content-/, ''));

  if (!el) return null;

  const clone = el.cloneNode(true) as HTMLElement;

  // Remove backreferences
  const backlinks = clone.querySelectorAll(
    '.data-footnote-backref, a[data-footnote-backref], a[href*="fnref-"], a[aria-label*="Back to reference"]'
  );
  backlinks.forEach((bl) => bl.remove());

  // Extract external links (DOI, arXiv, journals)
  const links: Array<{ href: string; label: string }> = [];
  clone.querySelectorAll('a[href]').forEach((a) => {
    const href = a.getAttribute('href');
    if (href && (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('doi:'))) {
      links.push({
        href,
        label: a.textContent?.trim() || href,
      });
    }
  });

  const text = clone.textContent?.trim() || '';
  const html = clone.innerHTML.trim();
  const matchedRecord = findMatchingResearchRecord(targetId, text, links);

  return {
    id: targetId,
    label: targetId.replace(/^(user-content-)?fn-?/, ''),
    text,
    html,
    links,
    matchedRecord,
  };
}

export interface FootnoteHoverTriggerProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  targetFootnoteId?: string;
  preloadedData?: ExtractedFootnote;
}

/**
 * Replaces standard markdown footnote anchor links (`<a data-footnote-ref>`)
 * with an interactive hover preview popover that preserves reader position.
 */
export function FootnoteHoverTrigger({
  href,
  id,
  children,
  className = '',
  targetFootnoteId,
  preloadedData,
  ...rest
}: FootnoteHoverTriggerProps) {
  const [open, setOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [data, setData] = useState<ExtractedFootnote | null>(preloadedData || null);

  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const targetId = targetFootnoteId || (href ? href.replace(/^#/, '') : '');

  const loadData = useCallback(() => {
    if (preloadedData) {
      setData(preloadedData);
      return;
    }
    if (!targetId) return;
    const extracted = extractFootnoteFromDOM(targetId);
    if (extracted) {
      setData(extracted);
    }
  }, [targetId, preloadedData]);

  const handleMouseEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    loadData();
    openTimerRef.current = setTimeout(() => {
      setOpen(true);
    }, 120);
  };

  const handleMouseLeave = () => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    if (!isPinned) {
      closeTimerRef.current = setTimeout(() => {
        setOpen(false);
      }, 200);
    }
  };

  const handleContentMouseEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const handleContentMouseLeave = () => {
    if (!isPinned) {
      closeTimerRef.current = setTimeout(() => {
        setOpen(false);
      }, 200);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    loadData();
    const nextState = !isPinned;
    setIsPinned(nextState);
    setOpen(nextState);
  };

  const handleScrollToFootnote = () => {
    setOpen(false);
    setIsPinned(false);
    const targetEl =
      document.getElementById(targetId) ||
      document.getElementById(`user-content-${targetId}`);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      targetEl.classList.add('highlight-footnote-pulse');
      setTimeout(() => {
        targetEl.classList.remove('highlight-footnote-pulse');
      }, 2500);
    }
  };

  useEffect(() => {
    if (open && contentRef.current) {
      typesetMathJax(contentRef.current);
    }
  }, [open]);

  useEffect(() => {
    return () => {
      if (openTimerRef.current) clearTimeout(openTimerRef.current);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  const displayLabel = children || targetId.replace(/^(user-content-)?fn-?/, '');
  const matched = data?.matchedRecord;

  return (
    <PopoverPrimitive.Root
      open={open || isPinned}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          setOpen(false);
          setIsPinned(false);
        }
      }}
    >
      <PopoverPrimitive.Trigger asChild>
        <a
          href={href || `#${targetId}`}
          id={id}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleMouseEnter}
          onBlur={handleMouseLeave}
          className={`inline-flex items-center align-baseline px-1.5 py-0.5 mx-0.5 rounded text-[11px] font-mono font-medium text-amber bg-amber/10 border border-amber/25 hover:bg-amber/20 hover:border-amber/50 hover:text-amber-200 transition-all duration-150 cursor-help select-none no-underline ${className}`}
          data-footnote-ref
          aria-haspopup="dialog"
          aria-expanded={open || isPinned}
          {...rest}
        >
          <span>[{displayLabel}]</span>
        </a>
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          ref={contentRef}
          side="top"
          sideOffset={8}
          align="center"
          avoidCollisions
          onMouseEnter={handleContentMouseEnter}
          onMouseLeave={handleContentMouseLeave}
          className="z-50 w-88 sm:w-96 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl bg-obsidian-2 p-4 text-xs text-parchment shadow-2xl border border-obsidian-3/90 animate-in fade-in-0 zoom-in-95"
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-obsidian-3/60">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 font-mono text-[11px] font-semibold text-amber">
                <BookOpen className="w-3.5 h-3.5 text-amber" />
                <span>Citation [{displayLabel}]</span>
              </span>
              {matched && (
                <span
                  className={`text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full ${
                    evidenceBadgeStyles[matched.evidenceLevel]?.badge || ''
                  }`}
                >
                  {matched.evidenceLevel}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              {isPinned && (
                <span className="text-[10px] uppercase font-mono tracking-wider text-parchment-2 bg-obsidian-3 px-1.5 py-0.5 rounded">
                  Pinned
                </span>
              )}
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setIsPinned(false);
                }}
                className="p-1 rounded text-parchment-2 hover:text-amber hover:bg-obsidian-3 transition-colors cursor-pointer"
                aria-label="Close citation preview"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="space-y-2">
            {matched && (
              <div className="mb-1">
                <h4 className="font-semibold text-parchment text-xs leading-snug">
                  {matched.title}
                </h4>
                <p className="text-[11px] text-parchment-2 italic mt-0.5">
                  {matched.source}
                </p>
              </div>
            )}

            {data?.html ? (
              <div
                className="text-xs text-parchment-2 leading-relaxed space-y-1 [&_p]:m-0 [&_a]:text-amber [&_a:hover]:underline"
                dangerouslySetInnerHTML={{ __html: data.html }}
              />
            ) : data?.text ? (
              <p className="text-xs text-parchment-2 leading-relaxed m-0">
                {data.text}
              </p>
            ) : (
              <p className="text-xs text-parchment-2 italic m-0">
                Citation details for reference [{displayLabel}]
              </p>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between gap-2 pt-3 mt-3 border-t border-obsidian-3/60">
            <div className="flex items-center gap-2 flex-wrap">
              {data?.links && data.links.length > 0 && (
                <a
                  href={data.links[0].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-amber/10 hover:bg-amber/20 text-amber border border-amber/25 hover:border-amber/40 text-[11px] font-medium transition-colors"
                >
                  <span>Open source</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}

              {matched && (
                <Link
                  to={`/research/${matched.id}`}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-obsidian-3 hover:bg-obsidian-4 text-parchment hover:text-amber text-[11px] font-medium transition-colors"
                >
                  <span>HELIOS Record</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              )}
            </div>

            <button
              type="button"
              onClick={handleScrollToFootnote}
              className="inline-flex items-center gap-1 text-[11px] font-sans text-parchment-2 hover:text-amber transition-colors cursor-pointer ml-auto"
              title="Scroll down to footnote in bibliography"
            >
              <span>Jump to note</span>
              <ArrowDown className="w-3 h-3" />
            </button>
          </div>

          <PopoverPrimitive.Arrow className="fill-obsidian-2 stroke-obsidian-3/90" />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}

/**
 * Enhances standard markdown footnote backlinks (`↩`) with smooth scrolling
 * back to the referencing text position and a visual pulse.
 */
export function FootnoteBackref({
  href,
  children,
  className = '',
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!href || !href.startsWith('#')) return;
    e.preventDefault();
    const targetId = href.replace(/^#/, '');
    const targetEl =
      document.getElementById(targetId) ||
      document.getElementById(`user-content-${targetId}`);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      targetEl.classList.add('highlight-footnote-pulse');
      setTimeout(() => {
        targetEl.classList.remove('highlight-footnote-pulse');
      }, 2500);
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`data-footnote-backref inline-block ml-2 text-amber hover:text-amber-200 transition-colors cursor-pointer text-xs font-mono select-none px-1 rounded hover:bg-amber/10 ${className}`}
      aria-label={rest['aria-label'] || 'Back to reference in text'}
      title="Return to reading position"
      {...rest}
    >
      {children || '↩'}
    </a>
  );
}

/**
 * Standalone Citation Hover Preview component for declarative use anywhere in research pages.
 */
export function CitationHoverPreview({
  targetId,
  recordId,
  children,
  label,
  source,
  evidenceLevel,
  url,
  summary,
}: {
  targetId?: string;
  recordId?: string;
  children?: React.ReactNode;
  label?: string;
  source?: string;
  evidenceLevel?: EvidenceLevel;
  url?: string;
  summary?: string;
}) {
  const record = recordId ? researchRecords.find((r) => r.id === recordId) : undefined;
  const effectiveLabel = label || record?.id || 'cite';
  const effectiveSource = source || record?.source || '';
  const effectiveEvidence = evidenceLevel || record?.evidenceLevel || 'DEMONSTRATED';
  const effectiveUrl = url || record?.url;
  const effectiveSummary = summary || record?.summary || '';

  const preloadedData: ExtractedFootnote | undefined =
    record || effectiveSource || effectiveSummary
      ? {
          id: targetId || recordId || 'custom-cite',
          label: effectiveLabel,
          text: effectiveSummary,
          html: `<p><strong>${record?.title || effectiveLabel}</strong>. ${effectiveSummary} <em>${effectiveSource}</em></p>`,
          links: effectiveUrl ? [{ href: effectiveUrl, label: effectiveSource || 'Source' }] : [],
          matchedRecord: record || (effectiveSource ? {
            id: recordId || 'custom-cite',
            title: effectiveLabel,
            source: effectiveSource,
            url: effectiveUrl,
            publishedAt: '2026-01-01',
            stage: 'established',
            tags: [],
            summary: effectiveSummary,
            evidenceLevel: effectiveEvidence,
            publicUse: 'evidence',
          } : undefined),
        }
      : undefined;

  return (
    <FootnoteHoverTrigger
      href={targetId ? `#${targetId}` : undefined}
      targetFootnoteId={targetId}
      preloadedData={preloadedData}
    >
      {children || effectiveLabel}
    </FootnoteHoverTrigger>
  );
}
