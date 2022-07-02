import { createOrderedEnumerable, createDescendingComparer, OrderedEnumerable, Enumerable, Pipe, ComparisonKey, ComparisonKeyTypes } from '../core';

/**
 * Sorts the elements of a sequence in ascending order according to key/keys.
 * @param key - A function to extract a key from an element.
 * @returns An array whose elements are sorted according the key/keys.
 */
export function orderByDescending<T, TKey extends ComparisonKeyTypes>(key: ComparisonKey<T, TKey>): Pipe<Enumerable<T>, OrderedEnumerable<T>> {
  return createOrderedEnumerable(createDescendingComparer(key));
}
