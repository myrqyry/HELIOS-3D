import { describe, it, expect } from 'vitest';
import { docsSchema, figuresSchema } from '../schemas';

describe('docsSchema', () => {
  it('accepts a fully populated doc', () => {
    const result = docsSchema.safeParse({
      title: 'Candidate Materials',
      summary: 'Spin textures and metallic van der Waals ferromagnets.',
      stage: 'established',
      tags: ['DEMONSTRATED', 'PROPOSED'],
      figures: ['hopfion'],
      updated: new Date('2026-06-03'),
    });
    expect(result.success).toBe(true);
  });

  it('rejects an unknown stage value', () => {
    const result = docsSchema.safeParse({
      title: 'X',
      summary: 'X',
      stage: 'unknown',
      tags: [],
      figures: [],
      updated: new Date(),
    });
    expect(result.success).toBe(false);
  });
});

describe('figuresSchema', () => {
  it('accepts an R3F figure', () => {
    const result = figuresSchema.safeParse({
      title: 'Hopfion',
      kind: 'r3f',
      source: 'stylized',
      component: 'HopfionScene',
      description: 'A rotating stylized hopfion.',
    });
    expect(result.success).toBe(true);
  });
});
