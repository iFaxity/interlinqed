import { Operation, enumerate } from '../core';

/**
 * Returns a specified number of contiguous elements from the start of a array.
 * @param count - The number of elements to return.
 * @returns An array that contains the specified number of elements from the start of the input array.
 */
export function take<T>(count: number): Operation<T> {
  if (count < 0) {
    throw new RangeError('count is out of range!');
  }

  return function*(source) {
    const e = enumerate(source);

    while (count-- && e.moveNext()) {
      yield e.current;
    }
  };
}
