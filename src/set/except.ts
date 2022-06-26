import { Operation, Enumerable } from '../core';
import { where } from '../projection';
import { any } from './any';

/**
 * Produces the set difference of two arrays by using the default equality comparer to compare values.
 * @param other - An array whose elements that also occur in the source will cause those elements to be removed.
 * @returns A array that contains the set difference of the elements of two arrays.
 */
export function except<T>(other: Enumerable<T>): Operation<T> {
  return where((item) => !any(x => x === item)(other));
}
