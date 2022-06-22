import { Collector, Predicate, enumerate } from '../core';
import { where } from '../projection';

/**
 * Determines whether an array contains any elements.
 * @param predicate - A function to test each element for a condition.
 * @returns true if the source array is not empty and at least one of its elements passes the test in the specified predicate; otherwise, false.
 */
export function any<T>(predicate?: Predicate<T>): Collector<T, boolean> {
  return function(source) {
    if (typeof predicate == 'function') {
      source = where(predicate)(source);
    }

    // Check for the first item in the Iterator
    const e = enumerate(source);

    return e.moveNext();
  };
}
