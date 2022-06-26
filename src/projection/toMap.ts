import { Collector } from '../core';
import { toEntries } from './toEntries';

export function toMap<T, TKey extends (string|number|symbol)>(
  keySelector: (key: T) => TKey
): Collector<T, Map<TKey, T>>;
export function toMap<T, TKey extends (string|number|symbol), TValue>(
  keySelector: (key: T) => TKey,
  valueSelector: (value: T) => TValue
): Collector<T, Map<TKey, TValue>>;
export function toMap<T, TKey extends (string|number|symbol), TValue>(
  keySelector: (key: T) => TKey,
  valueSelector?: (value: T) => TValue
): Collector<T, Map<TKey, TValue>> {
  return function(source) {
    const entries = toEntries(keySelector, valueSelector)(source);

    return new Map(entries);
  };
}
