import { describe, expect, it } from 'vitest';
import { getReservoirPhase } from '../BrownianReservoirScene';
import { getStabilizerPhase } from '../DmiStabilizerScene';

describe('getReservoirPhase', () => {
  it.each([
    [0, 'input'],
    [0.19, 'input'],
    [0.2, 'reservoir'],
    [0.79, 'reservoir'],
    [0.8, 'readout'],
    [1, 'readout'],
  ])('maps progress %s to %s', (progress, phase) => {
    expect(getReservoirPhase(progress)).toBe(phase);
  });
});

describe('getStabilizerPhase', () => {
  it.each([
    [0, 'competing'],
    [0.29, 'competing'],
    [0.3, 'stabilizing'],
    [0.74, 'stabilizing'],
    [0.75, 'coherent'],
    [1, 'coherent'],
  ])('maps progress %s to %s', (progress, phase) => {
    expect(getStabilizerPhase(progress)).toBe(phase);
  });
});
