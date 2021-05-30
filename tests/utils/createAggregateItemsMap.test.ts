import { createAggregateItemsMap } from '../../src/utils';

it(`Should work`, () => {
  const createdAggregateItemsMap = createAggregateItemsMap(
    [
      {
        '1': 0,
        '2': 2,
        '3': 1
      },
      {
        '1': 2,
        '2': 3,
        '3': 5
      }
    ],
    ['1', '2', '3']
  );
  expect(createdAggregateItemsMap).toStrictEqual({
    1: 2,
    2: 5,
    3: 6,
    total: 2
  });
});
