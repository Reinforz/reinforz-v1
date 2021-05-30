import { createItemMap } from '../../src/utils';

it(`Should work without custom itemMapKey`, () => {
  const createdItemMap = createItemMap({
    generateTitle: () => `Title`,
    headers: ['1', '2', '3'],
    itemKey: 'key',
    itemKeyKey: 'key.key',
    items: [
      {
        _id: '1',
        key: [
          {
            'key.key': '1'
          },
          {
            'key.key': '2'
          },
          {
            'key.key': '3'
          }
        ]
      }
    ]
  });
  expect(createdItemMap).toStrictEqual([
    {
      _id: '1',
      title: 'Title',
      1: 1,
      2: 1,
      3: 1
    }
  ]);
});

it(`Should work with custom itemMapKey`, () => {
  const createdItemMap = createItemMap({
    generateTitle: () => `Title`,
    headers: ['1', '2', '3'],
    itemKey: 'key',
    itemMapKey: (item: any) => item['key.key'],
    itemKeyKey: 'key.key',
    items: [
      {
        _id: '1',
        key: [
          {
            'key.key': '1'
          },
          {
            'key.key': '2'
          },
          {
            'key.key': '3'
          }
        ]
      }
    ]
  });
  expect(createdItemMap).toStrictEqual([
    {
      _id: '1',
      title: 'Title',
      1: 1,
      2: 1,
      3: 1
    }
  ]);
});
