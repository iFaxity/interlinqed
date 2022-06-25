import { Key, Comparison } from '../core';

/**
 * Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.
 * @param key - A function to extract a key from each element.
 * @returns A Comparison function to use with OrderBy or OrderByDescending.
 *
export function ThenByDescending<T, TReturn = any>(key: Key<T, TReturn>): Comparison<T> {
  return (a, b) => {
    const x = key(a);
    const y = key(b);
    return x > y ? -1 : (x < y ? 1 : 0);
  };
}

/**
 * Sorts the elements of a sequence in descending order according to key/keys.
 * @param list - A sequence of values to order.
 * @param key - A function to extract a key from an element.
 * @param comparisons - A set of functions to use if the last comparison was equal.
 * @returns An array whose elements are sorted according the key/keys.
 *
export function OrderByDescending<T, TReturn = any>(
  list: T[],
  key: Key<T, TReturn>,
  ...comparisons: Comparison<T>[]
): T[] {
  return stableSort(list, ThenByDescending(key), ...comparisons);
}*/
