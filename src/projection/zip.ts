import { Operation, Enumerable, Result, enumerate } from '../core';

/**
 * Applies a specified function to the corresponding elements of two arrays, producing a array of the results.
 * @param other - The second sequence to merge.
 * @param resultSelector - A function that specifies how to merge the elements from the two arrays.
 * @returns An array that contains merged elements of two input arrays.
 */
export function zip<T, TOther, TResult>(
  other: Enumerable<TOther>,
  resultSelector: Result<T, TOther, TResult>
): Operation<T, TResult> {
  return function*(source) {
    const e1 = enumerate(source);
    const e2 = enumerate(other);

    while (e1.moveNext() && e2.moveNext()) {
      yield resultSelector(e1.current, e2.current);
    }
  };
}
