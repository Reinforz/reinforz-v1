import { TBooleanAggregation, TNumberAggregation } from '../types';

export function computeNumberDataAggregation(
  data: number[],
  options: {
    aggregation: TNumberAggregation;
    divider?: number;
  }
) {
  switch (options.aggregation) {
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
      return Number(
        (
          data.reduce((acc, cur) => acc + cur, 0) /
          (options.divider ?? (data.length === 0 ? 1 : data.length))
        ).toFixed(2)
      );
    }
  }
}

export function computeBooleanDataAggregation(
  data: boolean[],
  aggregation: TBooleanAggregation
) {
  switch (aggregation) {
    case 'TRUE': {
      return data.filter((data) => data).length;
    }
    case 'FALSE': {
      return data.filter((data) => !data).length;
    }
  }
}
