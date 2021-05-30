export function divideTimeAllocated(timeAllocated: number) {
  if (timeAllocated <= 15) return '15';
  else if (timeAllocated <= 30) return '30';
  else if (timeAllocated <= 45) return '45';
  else if (timeAllocated <= 60) return '60';
  else if (timeAllocated <= 90) return '90';
  else if (timeAllocated <= 120) return '120';
  else throw new Error(`timeAllocated cannot be greater than 120`);
}
