import { Operation, enumerate } from '../core';

/**
 * Bypasses a specified number of elements in an array and then returns the remaining elements.
 * @param count - The number of elements to skip before returning the remaining elements.
 * @returns An array that contains the elements that occur after the specified index in the input array.
 */
export function skip<T>(count: number): Operation<T> {
  if (count < 0) {
    throw new RangeError('count is out of range!');
  }

  return function*(source) {
    const e = enumerate(source);

    while (count-- && e.moveNext());

    yield* e;
  }
}
