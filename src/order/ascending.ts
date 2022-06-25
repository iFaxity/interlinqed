import { Key, OrderedEnumerable, Pipe, Comparison, createOrderedEnumerable } from '../core';

type OrderedOperation<T = unknown, TRes = T> = Pipe<OrderedEnumerable<T>, OrderedEnumerable<TRes>>

function sorter<T, TKey>(key: Key<T, TKey>): Comparison<T> {
  return (a, b) => {
    const x = key(a);
    const y = key(b);

    return x > y ? 1 : (x < y ? -1 : 0)
  };
}

/**
 * Performs a subsequent ordering of the elements in a sequence in ascending order, according to a key.
 * @param key - A function to extract a key from each element.
 * @returns A Comparison function to use with OrderBy or OrderByDescending.
 */
export function ThenBy<T, TReturn = any>(key: Key<T, TReturn>): OrderedOperation<T> {
  return function(source) {
    if ('comparers' in source) {
      source.comparers.push(sorter(key));

      return source;
    }

    throw new TypeError('thenBy has to directly follow a orderBy method');
  };
}

/**
 * Sorts the elements of a sequence in ascending order according to key/keys.
 * @param key - A function to extract a key from an element.
 * @returns An array whose elements are sorted according the key/keys.
 */
export function OrderBy<T, TKey = any>(key: Key<T, TKey>): OrderedEnumerable<T> {
  return createOrderedEnumerable<T>(sorter(key));
}
