import { Selector, Collector } from '../core';

/**
 * 
 * @param selector 
 * @returns 
 */
export function forEach<T>(selector: Selector<T, any>): Collector<T, void> {
  return function*(source) {
    let idx = 0;

    for (let item of source) {
      yield void selector(item, idx++);
    }
  };
}
