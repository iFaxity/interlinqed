import { Collector, enumerate } from '../core';

/**
 * Returns the element at a specified index in a array or null if the index is out of range.
 * @param index - The zero-based index of the element to retrieve.
 * @returns null if the index is outside the bounds of the source array; otherwise, the element at the specified position in the source array.
 */
export function elementAt<T>(index: number): Collector<T, T|null> {
  if (index < 0) {
    throw new RangeError('index is out of range!');
  }

  return function(source) {
    const e = enumerate(source);

    while (e.moveNext()) {
      if (index--) {
        return e.current;
      }
    }

    return null;
  };
}
