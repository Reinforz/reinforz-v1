import { computeStandardDeviation, computeVariance } from '../../src/utils';

describe('computeStandardDeviation', () => {
  it(`Should work`, () => {
    expect(computeStandardDeviation([2, 4, 6, 1, 3])).toStrictEqual(0.34);
  });
});

describe('computeVariance', () => {
  it(`Should work for non empty dataset`, () => {
    expect(computeVariance([2, 4, 6, 1, 3])).toStrictEqual(1.72);
  });

  it(`Should work for empty dataset`, () => {
    expect(computeVariance([])).toStrictEqual(0);
  });
});
