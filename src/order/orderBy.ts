import { Key, OrderedEnumerable, Enumerable, Pipe, createOrderedEnumerable, createAscendingComparer } from '../core';

/**
 * Sorts the elements of a sequence in ascending order according to key/keys.
 * @param key - A function to extract a key from an element.
 * @returns An array whose elements are sorted according the key/keys.
 */
export function orderBy<T, TKey = any>(key: Key<T, TKey>): Pipe<Enumerable<T>, OrderedEnumerable<T>> {
  return createOrderedEnumerable(createAscendingComparer(key));
}
