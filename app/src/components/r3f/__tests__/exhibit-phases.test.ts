import { describe, expect, it } from 'vitest';
import { getReservoirPhase } from '../BrownianReservoirScene';
import { getStabilizerPhase } from '../DmiStabilizerScene';
import { getReadoutPhase } from '../ReadoutScene';
import { getScalePhase } from '../ScaleTransitionScene';

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

describe('getReadoutPhase', () => {
  it.each([
    [-1, 'state'],
    [0, 'state'],
    [0.44, 'state'],
    [0.45, 'coupling'],
    [0.69, 'coupling'],
    [0.7, 'signal'],
    [1, 'signal'],
    [2, 'signal'],
  ])('maps progress %s to %s', (progress, phase) => {
    expect(getReadoutPhase(progress)).toBe(phase);
  });
});

describe('getScalePhase', () => {
  it.each([
    [-1, 'Knot'],
    [0, 'Knot'],
    [0.24, 'Knot'],
    [0.25, 'Cell'],
    [0.49, 'Cell'],
    [0.5, 'Layer'],
    [0.74, 'Layer'],
    [0.75, '3D array'],
    [1, '3D array'],
    [2, '3D array'],
  ])('maps progress %s to %s', (progress, phase) => {
    expect(getScalePhase(progress)).toBe(phase);
  });
});
