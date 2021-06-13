export const computeMode = (numbers: number[]) => {
  const numberOccurrenceMap: Record<string, [number, number]> = {};
  numbers.forEach((number) => {
    if (!(number in numberOccurrenceMap)) {
      numberOccurrenceMap[number] = [0, number];
    }
    numberOccurrenceMap[number][0]++;
    return numberOccurrenceMap;
  });

  return Object.values(numberOccurrenceMap).reduce(
    (a, v) => (v[0] < a[0] ? a : v),
    [0, 0]
  )[1];
};
