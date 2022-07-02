import { Collector, Selector } from '../core';
import { select } from './select';

export function toSet<T, TResult>(selector: Selector<T, TResult>): Collector<T, Set<TResult>> {
  return function(source) {
    const iter = select(selector)(source);

    return new Set(iter);
  };
}
