import { Selector, Collector } from '../core';
import { select, pipe } from '../projection';

/**
 * Computes the sum of the array of number values that are obtained by invoking
 * a transform function on each element of the input array.
 * @param transform - A transform function to apply to each element.
 * @returns The sum of the projected values.
 */
export function sum<T>(transform?: Selector<T, number>): Collector<T, number> {
  if (typeof transform == 'function') {
    return pipe(select(transform), sum());
  }

  return function(source) {
    let acc = 0;

    for (let item of source) {
      acc += Number(item);
    }

    return acc;
  };
}
