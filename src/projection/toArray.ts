import { Collector, Selector } from '../core';
import { select } from './select';

export function toArray<T>(): Collector<T, T[]>
export function toArray<T, TResult>(selector: Selector<T, TResult>): Collector<T, TResult[]>
export function toArray<T, TResult>(selector?: Selector<T, TResult>): Collector<T, TResult[]> {
  return function(source) {
    if (typeof selector == 'function') {
      const iter = select(selector)(source);

      return [ ...iter ];
    }

    // @ts-ignore
    return [ ...source ] as TResult[];
  };
}
