import { Enumerable } from '../core';

/**
 * Generates an array of integral numbers within a specified range.
 * @returns An array that contains a range of sequential integral numbers.
 */
export function* from<T>(iter: Iterable<T>): Enumerable<T> {
  yield* iter;
}
