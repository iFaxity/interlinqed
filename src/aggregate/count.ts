import { Collector, Predicate, enumerate } from '../core';
import { where } from '../projection';

/**
 * Returns a number that represents how many elements in the specified array satisfy a condition.
 * @param predicate - A function to test each element for a condition.
 * @returns A number that represents how many elements in the array satisfy the condition in the predicate function.
 */
export function count<T>(predicate?: Predicate<T>): Collector<T, number> {
  return function(source) {
    if (typeof predicate == 'function') {
      source = where(predicate)(source);
    }

    const e = enumerate(source);
    let acc = 0;

    while (e.moveNext()) {
      acc += 1;
    }

    return acc;
  };
}
