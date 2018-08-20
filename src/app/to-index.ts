/**
 * Build an index for an array of objects, based on an object property.
 *
 * If a key is not unique across all objects,
 * the last object with that key will be in index.
 *
 * @param values array of objects.
 * @param key object property to use as key.
 */
export function toIndex(values: Array<any>, key: string) {
  const index = {};
  values.forEach(value => {
    index[value[key]] = value;
  });
  return index;
}
