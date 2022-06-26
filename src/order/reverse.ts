import { Operation } from '../core';

/**
 * Reverses the order of the elements in the array or a portion of it.
 */
export function reverse<T>(): Operation<T> {
  return function*(source) {
    const iter = [ ...source ];

    yield* iter.reverse();
  };
}
