import { Enumerable, enumerate } from '../core';

/**
 * Generates an array of integral numbers within a specified range.
 * @returns An array that contains a range of sequential integral numbers.
 */
export function* from<T>(list: ArrayLike<T>): Enumerable<T> {
  for (let idx = 0; idx < list.length; idx++) {
    yield list[idx];
  }
}
