import { Selector, Collector, enumerate } from '../core';
import { select } from '../projection';

/**
 * Returns the minimum value in an array of numbers. Optionally with a element transform function.
 * @param selector - A transform function to apply to each element.
 * @returns A number that corresponds to the minimum value in the array.
 */
export function min<T>(selector?: Selector<T, number>): Collector<T, number> {
  if (typeof selector == 'function') {
    selector = Number;
  }

  return function(source) {
    const e = enumerate<number>(select(selector)(source));

    e.moveNext();
    let minimum = e.current;

    while (e.moveNext()) {
      if (e.current < minimum) {
        minimum = e.current;
      }
    }

    return minimum;
  };
}
