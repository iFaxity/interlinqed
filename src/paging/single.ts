import { Collector, Predicate, enumerate } from '../core';
import { where } from '../projection';

/**
 * Returns the only element of an array, or a default value if the array is empty;
 * this method throws an exception if there is more than one element in the array.
 * @param predicate - A function to test an element for a condition.
 * @returns The single element of the input array that satisfies a condition. Returns null if sourceis empty
 * @throws {TypeError} If source array has more than 1 element
 */
export function single<T>(predicate?: Predicate<T>): Collector<T, T|null> {
  return function(source) {
    if (typeof predicate == 'function') {
      source = where<T>(predicate)(source);
    }

    const e = enumerate(source);
    let first: T|null = null;

    while (e.moveNext()) {
      if (first != null) {
        throw new TypeError('Source has more than one element');
      }

      first = e.current;
    }

    return first;
  };
}
