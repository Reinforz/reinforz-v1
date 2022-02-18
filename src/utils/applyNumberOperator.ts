import { TNumberFilter } from '../types';

/**
 * Applies number operator to a number data 
 * @param filter Number filter to apply
 * @param data number data to filter on
 * @returns If the number is filtered or not
 */
export function applyNumberOperator(
  filter: TNumberFilter,
  data: number
) {
  const [operator, range] = filter;
  switch (operator) {
    case '!': {
      return range[0] !== data;
    }
    case '<': {
      return data < range[0];
    }
    case '>': {
      return data > range[0];
    }
    case '<=': {
      return data <= range[0];
    }
    case '>=': {
      return data >= range[0];
    }
    case '<>': {
      return range[0] <= data && data <= range[1]!;
    }
    case '><': {
      return range[0] >= data || data >= range[1]!;
    }
    case '=': {
      return range[0] === data;
    }
  }
}
