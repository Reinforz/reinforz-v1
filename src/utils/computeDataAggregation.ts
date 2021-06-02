import { TNumberAggregation } from '../types';

export function computeNumberDataAggregation(
  data: number[],
  aggregation: TNumberAggregation
) {
  switch (aggregation) {
    case 'MIN': {
      let min = data[0];
      for (let index = 1; index < data.length; index++) {
        const datum = data[index];
        if (datum < min) min = datum;
      }
      return min;
    }
    case 'MAX': {
      let max = data[0];
      for (let index = 1; index < data.length; index++) {
        const datum = data[index];
        if (datum > max) max = datum;
      }
      return max;
    }
    case 'AVG': {
      return data.reduce((acc, cur) => acc + cur, 0) / data.length;
    }
  }
}
