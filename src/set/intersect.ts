import { Operation, Enumerable } from '../core';
import { where } from '../projection';
import { any } from './any';

/**
 * Produces the set intersection of two arrays by using the default equality comparer to compare values.
 * @param other - An array whose distinct elements that also appear in the first array will be returned.
 * @returns An array that contains the elements that form the set intersection of two arrays.
 */
export function intersect<T>(other: Enumerable<T>): Operation<T> {
  return where((item) => any(x => x === item)(other));
}

