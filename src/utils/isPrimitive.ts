/**
 * Checks whether the passed parameter is primitive
 * @param data Data to check for primitivity
 * @returns Boolean whether its primitive or not
 */
export function isPrimitive(data: any) {
  return (
    typeof data === 'string' ||
    typeof data === 'number' ||
    typeof data === 'boolean'
  );
}
