import { TQuestionFull } from '../types';

export function divideTimeAllocated(item: TQuestionFull) {
  if (item.time_allocated <= 15) return '15';
  else if (item.time_allocated <= 30) return '30';
  else if (item.time_allocated <= 45) return '45';
  else if (item.time_allocated <= 60) return '60';
  else if (item.time_allocated <= 90) return '90';
  else if (item.time_allocated <= 120) return '120';
}
