import { Key, Result, Operation, Enumerable } from '../core';

/**
 * Correlates the elements of two arrays based on matching keys.
 * The default equality comparer is used to compare keys.
 * @param outer - The array to join to the first array.
 * @param innerKeySelector - A function to extract the join key from each element of the first array.
 * @param outerKeySelector - A function to extract the join key from each element of the second array.
 * @param resultSelector - A function to create a result element from two matching elements.
 * @returns An array that has elements of type TResult that are obtained by performing an inner join on two arrays.
 */
export function join<TInner, TOuter, TKey, TResult>(
  outer: Enumerable<TOuter>,
  innerKeySelector: Key<TInner, TKey>,
  outerKeySelector: Key<TOuter, TKey>,
  resultSelector: Result<TInner, TOuter, TResult>
): Operation<TInner, TResult> {
  return function*(inner) {
    for (let x of inner) {
      for (let y of outer) {
        if (innerKeySelector(x) === outerKeySelector(y)) {
          yield resultSelector(x, y);
        }
      }
    }
  }
}
