import { computeMedian } from '../../src/utils';

it(`Should work when dataset is empty`, () => {
  expect(computeMedian([])).toStrictEqual(0);
});

it(`Should work when dataset is of even cardinality`, () => {
  expect(computeMedian([3, 1, 4, 2])).toStrictEqual(2.5);
});

it(`Should work when dataset is of odd cardinality`, () => {
  expect(computeMedian([3, 5, 1, 4, 2])).toStrictEqual(3);
});
