export function computeMedian(values: number[]){
  if(values.length === 0) return 0;
  const copiedValues = [...values];

  copiedValues.sort(function(a,b){
    return a-b;
  });

  const half = Math.floor(copiedValues.length / 2);

  if (copiedValues.length % 2)
    return copiedValues[half];

  return (copiedValues[half - 1] + copiedValues[half]) / 2.0;
}