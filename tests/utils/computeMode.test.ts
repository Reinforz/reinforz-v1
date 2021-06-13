import { computeMode } from '../../src/utils';

it(`Should work`, () => {
  expect(computeMode([1, 2, 1, 1, 3, 4])).toStrictEqual(1);
});
