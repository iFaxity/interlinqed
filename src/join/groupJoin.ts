import { Operation, Enumerable, Key, Result } from '../core';
import { select, where } from '../projection';

/**
 * Correlates the elements of two arrays based on equality of keys and groups the results.
 * The default equality comparer is used to compare keys.
 * @param outer - The array to join to the first array.
 * @param innerKeySelector - A function to extract the join key from each element of the first array.
 * @param outerKeySelector - A function to extract the join key from each element of the second array.
 * @param resultSelector - A function to create a result element from an element from the first array.
 * and a collection of matching elements from the second array.
 * @returns An array that contains elements of type TResult that are obtained by performing a grouped join on two arrays.
 */
export function groupJoin<TInner, TOuter, TKey, TResult>(
  outer: Enumerable<TOuter>,
  innerKeySelector: Key<TInner, TKey>,
  outerKeySelector: Key<TOuter, TKey>,
  resultSelector: Result<TInner, Enumerable<TOuter>, TResult>
): Operation<TInner, TResult> {
  return select(x => {
    const outerEnumerable = where<TOuter>(y => innerKeySelector(x) === outerKeySelector(y))(outer);

    return resultSelector(x, outerEnumerable);
  });
}
