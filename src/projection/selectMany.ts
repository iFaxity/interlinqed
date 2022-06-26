import { Operation, Selector, Enumerable } from '../core';

/**
 * Projects each element of a array to an array, flattens the resulting arrays into one array,
 * and invokes a result selector function on each element therein.
 * @param collectionSelector - A transform function to apply to each element;
 * the second parameter of the function represents the index of the element.
 * @param resultSelector - A transform function to apply to each element of the intermediate array.
 * @returns An array whose elements are the result of invoking the one-to-many transform function collectionSelector
 * on each element of and then mapping each of those array elements and their corresponding element to a result element.
 */
export function selectMany<TSource extends Enumerable, TResult>(collectionSelector: Selector<TSource, TResult>): Operation<TSource, TResult>;
export function selectMany<TSource extends Enumerable, TCollection extends Enumerable, TResult>(
  collectionSelector: Selector<TSource, TCollection>,
  resultSelector: (a: TSource, b: TCollection) => TResult
): Operation<TSource, TResult>;
export function selectMany<TSource extends Enumerable, TCollection extends Enumerable, TResult>(
  collectionSelector: Selector<TSource, Enumerable<TCollection>>,
  resultSelector?: (a: TSource, b: TCollection) => TResult
): Operation<TSource, TResult> {
  if (typeof resultSelector != 'function') {
    // @ts-ignore
    resultSelector = (_, x) => x as TResult;
  }

  return function*(source) {
    let idx = 0;

    for (let item of source) {
      const collection = collectionSelector(item, idx++);

      for (let subItem of collection) {
        yield resultSelector(item, subItem);
      }
    }
  };
}
