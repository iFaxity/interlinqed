import { Key, OrderedEnumerable, Pipe, createOrderedExtension, createDescendingComparer } from '../core';

/**
 * Performs a subsequent ordering of the elements in a sequence in ascending order, according to a key.
 * @param key - A function to extract a key from each element.
 * @returns A Comparison function to use with OrderBy or OrderByDescending.
 */
export function thenByDescending<T, TKey = any>(key: Key<T, TKey>): Pipe<OrderedEnumerable<T>, OrderedEnumerable<T>> {
  return createOrderedExtension(createDescendingComparer(key));
}
