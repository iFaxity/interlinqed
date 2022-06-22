import { Collector, Predicate } from '../core';
import { pipe } from '../projection';
import { reverse } from '../order';
import { first } from './first';

/**
 * Returns the last element of an array that satisfies a specified condition.
 * @param predicate - A function to test each element for a condition.
 * @returns The last element in the array that passes the test in the specified predicate function.
 * Or null if no element was matched.
 */
export function last<T>(predicate?: Predicate<T>): Collector<T, T|null> {
  return pipe(reverse(), first(predicate));
}
