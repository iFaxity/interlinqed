import { Enumerable, Key, Collector, createGroup, Grouping } from '../core';

export type Lookup<TKey, TValue> = Enumerable<Grouping<TKey, TValue>>;

/**
 * Groups the elements of an array according to a specified key selector function.
 * @param keySelector - A function to extract the key for each element.
 * @param resultSelector - A function to create a result value from each group.
 * @returns An object of elements of type TResult where each element represents a projection over a group and its key.
 */
export function toLookup<T, TKey>(keySelector: Key<T>): Collector<T, Lookup<TKey, T>>
export function toLookup<T, TKey, TResult>(keySelector: Key<T, TKey>, resultSelector: (element: T) => TResult): Collector<T, Lookup<TKey, TResult>>
export function toLookup<T, TKey, TResult>(keySelector: Key<T, TKey>, resultSelector?: (element: T) => TResult): Collector<T, Lookup<TKey, TResult>> {
  if (typeof resultSelector != 'function') {
    // @ts-ignore
    resultSelector = (x) => x as TResult;
  }

  return function*(source) {
    const cache = new Map<TKey, TResult[]>();

    // Get all keys of the source
    for (let item of source) {
      const key = keySelector(item);
      const collection = cache.get(key);
      const projected = resultSelector(item);

      if (collection != null) {
        collection.push(projected);
      } else {
        cache.set(key, [ projected ]);
      }
    }

    // Create lazy group of entries
    for (let [ key, values ] of cache) {
      yield createGroup(key, values);
    }
  };
}
