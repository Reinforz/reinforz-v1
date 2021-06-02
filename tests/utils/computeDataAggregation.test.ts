import { computeNumberDataAggregation } from '../../src/utils';

describe('computeNumberDataAggregation', () => {
  it(`Should work for MAX aggregation`, () => {
    expect(computeNumberDataAggregation([1, 3, 2, 5, 4], 'MAX')).toStrictEqual(
      5
    );
  });

  it(`Should work for MIN aggregation`, () => {
    expect(computeNumberDataAggregation([3, 2, 5, 4, 1], 'MIN')).toStrictEqual(
      1
    );
  });

  it(`Should work for AVG aggregation`, () => {
    expect(computeNumberDataAggregation([1, 2, 3, 4, 5], 'AVG')).toStrictEqual(
      3
    );
  });
});
