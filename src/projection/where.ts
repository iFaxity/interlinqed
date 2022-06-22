import { Operation, Predicate } from '../core';

/**
 * Filters a array of values based on a predicate.
 * @param predicate - A function to test each element for a condition.
 * @returns An array that contains elements from the input array that satisfy the condition.
 */
export function where<T>(predicate: Predicate<T>): Operation<T> {
  return function*(source) {
    let idx = 0;

    for (let item of source) {
      if (predicate(item, idx++)) {
        yield item;
      }
    }
  };
}
