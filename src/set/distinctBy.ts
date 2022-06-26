import { Operation, Key } from '../core';
import { where } from '../projection';

/**
 * Returns distinct elements from an array according to a specified key selector.
 * @param keySelector - A function to extract the key for each element.
 * @returns An array that contains distinct elements from the source array, according to the specified key selector.
 */
export function distinctBy<T, TKey>(keySelector: Key<T, TKey>): Operation<T> {
  const seen = new Set<TKey>();

  return where(item => {
    const key = keySelector(item);
    const res = seen.has(key);

    if (!res) {
      seen.add(key);
    }

    return !res;
  });
}
