import { Operation, Predicate } from '../core';

/**
 * Returns elements from an array as long as a specified condition is true.
 * @param predicate - A function to test each element for a condition.
 * @returns An array that contains the elements from the input array that occur before the element at which the test no longer passes.
 */
export function takeWhile<T>(predicate: Predicate<T>): Operation<T> {
  return function*(source) {
    let idx = 0;

    for (let item of source) {
      if (!predicate(item, idx++)) {
        break;
      }

      yield item;
    }
  };
}
