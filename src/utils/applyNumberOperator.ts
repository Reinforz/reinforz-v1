import { TNumberOperator } from '../types';

export function applyNumberOperator(
  param: [TNumberOperator, [number, number?]],
  data: number
) {
  const [operator, range] = param;
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
