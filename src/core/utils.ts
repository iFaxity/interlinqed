import { quicksort } from './quicksort';
import { Comparison, Enumerable, Grouping, OrderedEnumerable } from './types';

/**
 * Checks if the argument passed is an object
 * @param input - Input data to verify if it is an object
 * @returns A boolean with the result
 * @private
 */
export function isObject<T extends object>(input: any): input is T {
  return input != null && typeof input == 'object';
}

/**
 * Determines if two objects are considered equal, only checks own properties
 * @param a - Object a to compare
 * @param b - Object to compare a against
 * @returns A boolean with the result
 * @private
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

const COMPARERS = new WeakMap<Enumerable, Comparison[]>();

export function addComparer<T>(source: Enumerable<T>, comparer: Comparison<T>):void {
  COMPARERS.get(source).push(comparer);
}

export function createSorter<T>(source: Enumerable<T>, comparer: Comparison<T>):void {
  COMPARERS.set(source, [ comparer ]);
}

export function getComparers<T>(source: Enumerable<T>): Comparison<T>[] {
  return COMPARERS.get(source);
}

/**
 * 
 * @param iter 
 * @param comparer 
 * @returns 
 * @private
 */
export function createOrderedEnumerable<T>(comparer: Comparison<T>): OrderedEnumerable<T> {
  const comparers: Comparison<T>[] = [ comparer ];

  function orderedEnumerable(source: Enumerable<T>): Enumerable<T> {
    return quicksort(Array.from(source), ...comparers);
  }

  return Object.defineProperty(orderedEnumerable, 'comparers', {
    value: comparers,
    writable: false,
  }) as OrderedEnumerable<T>;
}

/**
 * 
 * @param iter 
 * @param comparer 
 * @returns 
 * @private
 */
export function createOrderedComparer<T>(source: OrderedEnumerable<T>, comparer: Comparison<T>): OrderedEnumerable<T> {
  const comparers: Comparison<T>[] = [ comparer ];

  function orderedEnumerable(source: Enumerable<T>): Enumerable<T> {
    return quicksort(Array.from(source), ...comparers);
  }

  return Object.defineProperty(orderedEnumerable, 'comparers', {
    value: comparers,
    writable: false,
  }) as OrderedEnumerable<T>;
}

/**
 * 
 * @param key 
 * @param iter 
 * @returns 
 * @private
 */
export function createGroup<TKey, TElement>(key: TKey, iter: Enumerable<TElement>): Grouping<TKey, TElement> {
  const group = iter as Grouping<TKey, TElement>;

  return Object.defineProperty(group, 'key', {
    value: key,
    writable: false,
  });
}
