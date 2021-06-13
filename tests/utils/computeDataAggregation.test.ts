import {
  computeBooleanDataAggregation,
  computeNumberDataAggregation
} from '../../src/utils';

describe('computeNumberDataAggregation', () => {
  it(`Should work for MAX aggregation`, () => {
    expect(
      computeNumberDataAggregation([1, 3, 2, 5, 4], { aggregation: 'MAX' })
    ).toStrictEqual(5);
  });

  it(`Should work for MIN aggregation`, () => {
    expect(
      computeNumberDataAggregation([3, 2, 5, 4, 1], { aggregation: 'MIN' })
    ).toStrictEqual(1);
  });

  it(`Should work for MEDIAN aggregation`, () => {
    expect(
      computeNumberDataAggregation([], { aggregation: 'MEDIAN' })
    ).toStrictEqual(0);
  });

  it(`Should work for MODE aggregation`, () => {
    expect(
      computeNumberDataAggregation([], { aggregation: 'MODE' })
    ).toStrictEqual(0);
  });

  it(`Should work for STDDEV aggregation`, () => {
    expect(
      computeNumberDataAggregation([], { aggregation: 'STDDEV' })
    ).toStrictEqual(0);
  });

  it(`Should work for VARIANCE aggregation`, () => {
    expect(
      computeNumberDataAggregation([], { aggregation: 'VARIANCE' })
    ).toStrictEqual(0);
  });

  it(`Should work for AVG aggregation`, () => {
    expect(
      computeNumberDataAggregation([1, 2, 3, 4, 5], { aggregation: 'AVG' })
    ).toStrictEqual(3);
  });

  it(`Should work for AVG aggregation custom divider`, () => {
    expect(
      computeNumberDataAggregation([1, 2, 3, 4, 5], {
        aggregation: 'AVG',
        divider: 15
      })
    ).toStrictEqual(1);
  });

  it(`Should work for AVG aggregation with zero items`, () => {
    expect(
      computeNumberDataAggregation([], { aggregation: 'AVG' })
    ).toStrictEqual(0);
  });
});

describe('computeBooleanDataAggregation', () => {
  it(`Should work for TRUE aggregation`, () => {
    expect(
      computeBooleanDataAggregation([true, false, true, true, false], 'TRUE')
    ).toStrictEqual(3);
  });

  it(`Should work for FALSE aggregation`, () => {
    expect(
      computeBooleanDataAggregation([true, false, true, true, false], 'FALSE')
    ).toStrictEqual(2);
  });
});
