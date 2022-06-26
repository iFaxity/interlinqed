import { Key, Operation, Grouping } from '../core';
import { toLookup } from './toLookup';

/**
 * Groups the elements of an array according to a specified key selector function.
 * @param keySelector - A function to extract the key for each element.
 * @param resultSelector - A function to create a result value from each group.
 * @returns An object of elements of type TResult where each element represents a projection over a group and its key.
 */
export function groupBy<T, TKey>(keySelector: Key<T>): Operation<T, Grouping<TKey, T>>
export function groupBy<T, TKey, TResult>(
  keySelector: Key<T, TKey>,
  resultSelector: (element: T) => TResult
): Operation<T, Grouping<TKey, TResult>>
export function groupBy<T, TKey, TResult>(
  keySelector: Key<T, TKey>,
  resultSelector?: (element: T) => TResult
): Operation<T, Grouping<TKey, TResult>> {
  return toLookup(keySelector, resultSelector);
}
