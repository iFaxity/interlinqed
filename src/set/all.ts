import { Collector, Predicate, enumerate } from '../core';
import { any } from './any';

/**
 * Determines whether all elements of an array satisfy a condition.
 * @param predicate - A function to test each element for a condition.
 * @returns true if every element of the source array passes the test in the specified predicate, or if the array is empty; otherwise, false.
 */
export function all<T>(predicate: Predicate<T>): Collector<T, boolean> {
  return (source) => {
    // Check for the first item in the Iterator
    const e = enumerate(source);
    let idx = 0;

    while (e.moveNext()) {
      if (!predicate(e.current, idx++)) {
        return false;
      }
    }

    return true;
  };
}
