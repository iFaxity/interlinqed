import { Operation, Enumerable } from '../core';
import { pipe } from '../projection';
import { distinct } from './distinct';
import { concat } from './concat';

/**
 * Produces the set union of two arrays by using the default equality comparer.
 * @param other - An array whose distinct elements form the second set for the union.
 * @returns An array that contains the elements from both input arrays, excluding duplicates.
 */
export function union<T, TOther>(other: Enumerable<TOther>): Operation<T, T|TOther> {
  return pipe(concat(other), distinct());
}
