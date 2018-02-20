/**
 * Convert x to an array, unless it's already an array.
 *
 * @param x to convert.
 * @return Array, which is empty if x is not truthy.
 */
export function toArray (x: any) {
  if (!x) {
    return [];
  } else if (!Array.isArray(x)) {
    return [x];
  }
  return x;
}
