/**
 * Get the copy of object with only specified attributes.
 *
 * @param  {Object} obj
 * @param  {Array} attrs
 */
export function withOnlyAttrs(obj, attrs) {
  const result = {};

  attrs.forEach((attr) => {
    result[attr] = obj[attr];
  });

  return result;
}
