import { Collector, KeyTypes } from '../core';
import { select } from './select';

export function toSet<T, TKey extends KeyTypes>(
  keySelector: (key: T) => TKey
): Collector<T, Set<TKey>> {
  return function(source) {
    const iter = select(keySelector)(source)

    return new Set<TKey>(iter);
  };
}
