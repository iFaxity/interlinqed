import { Selector, Collector } from '../core';

/**
 * Computes the average of an array of numbers that are obtained by invoking
 * a transform function on each element of the input array.
 * @param selector - A transform function to apply to each element.
 * @returns The average of the array.
 */
export function average<T>(selector?: Selector<T, number>): Collector<T, number> {
  if (typeof selector != 'function') {
    selector = Number;
  }

  return function(source) {
    let len = 0;
    let acc = 0;

    for (let item of source) {
      acc += selector(item, len++);
    }

    return acc / len;
  };
}
