import { Operation } from '../core';

/**
 * Casts the elements of an array to the specified type.
 * Note: only casts through typescript, does not actually cast each individual element.
 * @param source - The array that contains the elements to be cast to type T.
 * @returns An array that contains each element of the source array cast to the specified type.
 */
export function cast<T>(): Operation<any, T> {
  return (source) => source;
}
