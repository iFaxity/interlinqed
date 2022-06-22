import { Collector } from '../core';
import { any } from './any';

/**
 * Determines whether an array contains a specified element by using the default equality comparer.
 * @param value - The value to locate in the array.
 * @returns true if the source array contains an element that has the specified value; otherwise, false.
 */
export function contains<T>(value: T): Collector<T, boolean> {
  return any(x => x === value);
}
