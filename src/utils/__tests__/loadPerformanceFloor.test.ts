import { describe, it, expect } from 'vitest';
import data from '../../data/performance-floor.json';
import { performanceFloorSchema } from '../schemas';

describe('performanceFloorSchema', () => {
  it('accepts the bundled data file', () => {
    const result = performanceFloorSchema.safeParse(data);
    expect(result.success).toBe(true);
  });
});
