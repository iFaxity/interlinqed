import { Collector, Predicate, enumerate } from '../core';
import { where } from '../projection';

/**
 * Returns the first element in an array that satisfies a specified condition, or null if the array contains no elements.
 * @param predicate - A function to test each element for a condition.
 * @returns The first element in the array that passes the test in the specified predicate function, or null if no element was matched.
 */
export function first<T>(predicate?: Predicate<T>): Collector<T, T|null> {
  return function(source) {
    if (typeof predicate == 'function') {
      source = where<T>(predicate)(source);
    }

    const e = enumerate(source);

    return e.moveNext() ? e.current : null;
  };
}
