import { Operation, Selector } from '../core';

/**
 * Projects each element of a array into a new form.
 * @param selector - A transform function to apply to each element.
 * @returns An array whose elements are the result of invoking the transform function on each element of source.
 */
export function select<T, TResult>(selector: Selector<T, TResult>): Operation<T, TResult> {
  return function*(source) {
    let idx = 0;

    for (let item of source) {
      yield selector(item, idx++);
    }
  };
}
