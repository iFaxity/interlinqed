import { Action, Collector, enumerate } from '../core';

/**
 * 
 * @param selector 
 * @returns 
 */
export function forEach<T>(action: Action<T> ): Collector<T, void> {
  return function(source) {
    const e = enumerate(source);
    let idx = 0;

    while (e.moveNext()) {
      action(e.current, idx++);
    }
  };
}
