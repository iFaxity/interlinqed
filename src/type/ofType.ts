import { Operation, Constructor, ConstructorType } from '../core';
import { where } from '../projection';

const PRIMITIVE_TYPES = [
  [String, 'string'],
  [Number, 'number'],
  [Boolean, 'boolean'],
  [Function, 'function'],
  //[BigInt, 'bigint'], not available for IE
  [Symbol, 'symbol'],
  [Object, 'object'],
] as [Constructor, string][];

/**
 * Filters the elements of an array based on a specified type.
 * @param type - The type to filter the elements of the array on.
 * @returns An array that contains elements from the input array of type.
 */
export function ofType<T, TType extends Constructor<T>>(type: TType): Operation<T, ConstructorType<TType>> {
  const t = PRIMITIVE_TYPES.find(x => type == x[0]);

  const predicate = t
    ? (item: T) => typeof item == t[1]
    : (item: T) => item instanceof type;

  return where(predicate) as Operation<T, ConstructorType<TType>>;
}
