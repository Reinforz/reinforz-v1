function padZero(num: number) {
  return num < 10 ? `0${num}` : num;
}

export function displayTime(timeout: number) {
  const isNegative = timeout < 0;
  timeout = Math.abs(timeout);
  const min = Math.floor(timeout / 60);
  const sec = timeout % 60;
  return `${isNegative ? '-' : ''}${padZero(min)}:${padZero(sec)}`;
}
