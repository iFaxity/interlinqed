import { Enumerable, Collector, enumerate } from '../core';

/**
 * Determines whether two arrays are equal by comparing the elements
 * by using the default equality comparer for their type.
 * @param other - An array to compare to the first array.
 * @returns true if the two source arrays are of equal length and their corresponding elements are
 * equal according to the default equality comparer for their type; otherwise, false.
 */
export function sequenceEqual<T>(other: Enumerable<T>): Collector<T, boolean> {
  return function(source) {
    const e1 = enumerate(source);
    const e2 = enumerate(other);

    while (e1.moveNext()) {
      if (!(e2.moveNext() && e1.current === e2.current)) {
        return false;
      }
    }

    return !e2.moveNext();
  };
}
