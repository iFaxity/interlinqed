import { Operation } from '../core';

/**
 * Returns a new array that contains the elements from source with the last count elements of the source array omitted.
 * @param count - The number of elements to omit from the end of the array.
 * @returns A new array that contains the elements from source minus count elements from the end of the array.
 */
export function skipLast<T>(count: number): Operation<T> {
  if (count < 0) {
    throw new RangeError('count is out of range!');
  }

  return function*(source) {
    if (count === 0) {
      yield* source;
    } else {
      const items = [ ...source ];

      yield* items.slice(0, -count);
    }
  };
}
