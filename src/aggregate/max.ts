import { Selector, Collector, enumerate } from '../core';
import { select } from '../projection';

/**
 * Returns the maximum value in an array of numbers. Optionally with a element transform function.
 * @param selector - A transform function to apply to each element.
 * @returns A number that corresponds to the maximum value in the array.
 */
export function max<T>(selector?: Selector<T, number>): Collector<T, number> {
  if (typeof selector != 'function') {
    selector = Number;
  }

  return function(source) {
    const e = enumerate<number>(select(selector)(source));

    if (!e.moveNext()) {
      throw new Error('Sequence contains no elements!');
    }

    let maximum = e.current;

    while (e.moveNext()) {
      if (e.current > maximum) {
        maximum = e.current;
      }
    }

    return maximum;
  };
}
