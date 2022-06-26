import { Collector, KeyTypes } from '../core';
import { toEntries } from './toEntries';

/**
 * Creates an object as a map with TKey as key and TValue as value from a T[] according to a specified key selector function.
 * @param keySelector - A function to extract a key from each element.
 * @param valueSelector - A transform function to produce a result element value from each element.
 * @returns An object that contains values of type TValue selected from the input array.
 */
export function toObject<T, TKey extends KeyTypes>(
  keySelector: (key: T) => TKey
): Collector<T, Record<TKey, T>>;
export function toObject<T, TKey extends KeyTypes, TValue>(
  keySelector: (key: T) => TKey,
  valueSelector: (value: T) => TValue
): Collector<T, Record<TKey, TValue>>;
export function toObject<T, TKey extends KeyTypes, TValue>(
  keySelector: (key: T) => TKey,
  valueSelector?: (value: T) => TValue
): Collector<T, Record<TKey, TValue>> {
  return function(source) {
    const entries = toEntries(keySelector, valueSelector)(source);

    return Object.fromEntries(entries) as Record<TKey, TValue>;
  };
}
