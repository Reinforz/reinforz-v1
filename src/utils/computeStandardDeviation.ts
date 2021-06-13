export function computeVariance(data: number[]) {
  if (data.length === 0) return 0;
  const mean = data.reduce((acc, cur) => acc + cur, 0) / data.length;

  const squaredDifferenceSum = data.reduce(
    (acc, cur) => acc + Math.pow(cur - mean, 2),
    0
  );
  return Number(Math.sqrt(squaredDifferenceSum / data.length).toFixed(2));
}

export function computeStandardDeviation(data: number[]) {
  return Number((computeVariance(data) / data.length).toFixed(2));
}
