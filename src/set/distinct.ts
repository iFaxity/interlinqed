import { Operation, isObject, deepEqual } from '../core';
import { where } from '../projection';
import { any } from './any';

/**
 * Returns distinct elements from a array by using the default equality comparer to compare values.
 * @returns An array that contains distinct elements from the source array.
 */
export function distinct<T>(): Operation<T> {
  const seen = new Set<T>();

  return where(item => {
    let found = false;

    if (isObject(item)) {
      found = any(x => deepEqual(item, x))(seen.values());
    } else {
      found = seen.has(item);
    }

    if (!found) {
      seen.add(item);
    }

    return !found;
  });
}
