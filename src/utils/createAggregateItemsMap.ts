export function createAggregateItemsMap(
  itemsMap: Record<string, any>[],
  keys: string[]
) {
  const aggregateItemsMap: Record<string, number> = {
    total: itemsMap.length
  };

  keys.forEach((key) => {
    aggregateItemsMap[key] = 0;
  });

  itemsMap.forEach((itemMap) => {
    Object.entries(itemMap).forEach(([key, value]) => {
      aggregateItemsMap[key] += value;
    });
  });

  return aggregateItemsMap;
}
