import { Operation } from '../core';
import { select } from './select';

export function toEntries<T, TKey>(
  keySelector: (key: T) => TKey
): Operation<T, [key: TKey, value: T]>;
export function toEntries<T, TKey, TValue>(
  keySelector: (key: T) => TKey,
  valueSelector: (value: T) => TValue
): Operation<T, [key: TKey, value: TValue]>;
export function toEntries<T, TKey, TValue>(
  keySelector: (key: T) => TKey,
  valueSelector?: (value: T) => TValue
): Operation<T, [key: TKey, value: TValue]> {
  if (typeof valueSelector != 'function') {
    // @ts-ignore
    valueSelector = (x) => x as TValue;
  }

  return select(item => [ keySelector(item), valueSelector(item) ]);
}
