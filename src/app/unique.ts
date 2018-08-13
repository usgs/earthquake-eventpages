/**
 * Remove duplicates and empty items.
 *
 * @param items list of items.
 *        if items is an array of Objects,
 *        each objects `id` property is used to determine uniqueness,
 *        and the last object with a given `id` is returned.
 * @return unique list of non-empty items.
 */
export function getUnique(items: Array<any>): Array<any> {
  const unique = {};
  items.forEach(item => {
    let key = item;
    if (item.id) {
      key = item.id;
    }
    if (key) {
      unique[key] = item;
    }
  });
  return Object.values(unique);
}
