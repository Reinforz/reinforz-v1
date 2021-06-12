export function isPrimitive(data: any) {
  return (
    typeof data === 'string' ||
    typeof data === 'number' ||
    typeof data === 'boolean'
  );
}
