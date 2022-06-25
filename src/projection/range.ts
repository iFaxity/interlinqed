import { Enumerable } from '../core';

/**
 * Generates an array of integral numbers within a specified range.
 * @param start - The value of the first integer in the array.
 * @param count - The number of sequential integers to generate.
 * @returns An array that contains a range of sequential integral numbers.
 */
export function* range(start: number, count?: number): Enumerable<number> {
  if (count == null) {
    count = start;
    start = 0;
  }

  for (let idx = 0; idx < count; idx++) {
    const item = start + idx;

    yield item;
  }
}
