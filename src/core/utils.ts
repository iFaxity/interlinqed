import { quicksort } from './quicksort';
import { Comparison, Enumerable, Grouping, OrderedEnumerable, Pipe, Key } from './types';

/**
 * Checks if the argument passed is an object
 * @param input - Input data to verify if it is an object
 * @returns A boolean with the result
 * @internal
 */
export function isObject<T extends object>(input: any): input is T {
  return input != null && typeof input == 'object';
}

/**
 * Determines if two objects are considered equal, only checks own properties
 * @param a - Object a to compare
 * @param b - Object to compare a against
 * @returns A boolean with the result
 * @internal
 */
export function deepEqual<
  T extends Record<string, any>,
  TOther extends Record<string, any>
>(a: T, b: TOther): boolean {
  if (!isObject(a) || !isObject(b)) {
    return a === b;
  }

  // Ensure key amount is the same
  const keys = Object.keys(a);
  return (Object.keys(b).length == keys.length) && keys.every(key => deepEqual(a[key], b[key]));
}

/**
 * 
 * @param source 
 * @param comparer 
 * @returns 
 * @internal
 */
export function createOrderedEnumerable<T>(comparer: Comparison<T>): Pipe<Enumerable<T>, OrderedEnumerable<T>> {
  return (source) => {
    const comparers = [ comparer ];

    return Object.create({
      comparers,
      [Symbol.iterator]() {
        const sorter = quicksort(source, ...comparers);
  
        return sorter[Symbol.iterator]();
      },
    });
  };
}

/**
 * 
 * @param comparer 
 * @returns 
 * @internal
 */
export function createOrderedExtension<T>(comparer: Comparison<T>): Pipe<OrderedEnumerable<T>, OrderedEnumerable<T>> {
  return function(source) {
    if ('comparers' in source) {
      source.comparers.push(comparer);
      return source;
    }

    throw new TypeError('thenBy has to directly follow a orderBy method or another');
  };
}

/**
 * 
 * @param key 
 * @returns 
 * @internal
 */
export function createAscendingComparer<T, TKey>(key: Key<T, TKey>): Comparison<T> {
  return (first, second) => {
    const firstKey = key(first);
    const secondKey = key(second);

    if (firstKey > secondKey) {
      return 1;
    } else if (firstKey < secondKey) {
      return -1;
    }

    return 0;
  };
}

/**
 * 
 * @param key 
 * @returns 
 * @internal
 */
export function createDescendingComparer<T, TKey>(key: Key<T, TKey>): Comparison<T> {
  return (first, second) => {
    const firstKey = key(first);
    const secondKey = key(second);

    if (firstKey > secondKey) {
      return -1;
    } else if (firstKey < secondKey) {
      return 1;
    }

    return 0;
  };
}

/**
 * 
 * @param key 
 * @param iter 
 * @returns 
 * @internal
 */
export function createGroup<TKey, TElement>(key: TKey, iter: Enumerable<TElement>): Grouping<TKey, TElement> {
  const group = iter as Grouping<TKey, TElement>;

  return Object.defineProperty(group, 'key', {
    value: key,
    writable: false,
  });
}
