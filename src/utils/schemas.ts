import { z } from 'zod';

export const claimStage = z.enum(['DEMONSTRATED', 'INFERRED', 'PROPOSED', 'SPECULATIVE']);

export const docStage = z.enum(['established', 'current', 'speculative', 'project-ops']);

export const docsSchema = z.object({
  title: z.string(),
  summary: z.string(),
  stage: docStage,
  tags: z.array(claimStage),
  figures: z.array(z.string()).default([]),
  updated: z.date(),
});

export const figureKind = z.enum(['r3f', 'svg', 'chart', 'image']);
export const figureSource = z.enum(['stylized', 'data-driven']);

export const figuresSchema = z.object({
  title: z.string(),
  kind: figureKind,
  source: figureSource,
  component: z.string(),
  description: z.string(),
});

export const performanceFloorSchema = z.object({
  writeSpeedPs: z.array(z.object({ system: z.string(), value: z.number(), label: z.string() })),
  energyDensityPjPerUm2: z.array(z.object({ system: z.string(), value: z.number() })),
});
