import { Operation, Enumerable } from '../core';

/**
 * 
 * @param other 
 * @returns 
 */
export function concat<T, TOther>(other: Enumerable<TOther>): Operation<T, T|TOther> {
  return function*(source) {
    yield* source;
    yield* other;
  };
}
