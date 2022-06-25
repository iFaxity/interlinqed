import { Operation } from '../core';

/**
 * Returns a specified number of contiguous elements from the end of a array.
 * @param count - A new array that contains the elements from source minus count elements from the end of the array.
 * @returns A new array that contains the last count elements from source.
 */
export function takeLast<T>(count: number): Operation<T> {
  if (count < 0) {
    throw new RangeError('count is out of range!');
  }

  return function*(source) {
    if (count === 0) {
      yield* source;
    } else {
      const items = [ ...source ];

      yield* items.slice(-count);
    }
  };
}
