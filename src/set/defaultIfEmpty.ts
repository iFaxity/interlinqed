import { Operation } from '../core';
import { enumerate } from '../core/enumerator';

/**
 * Returns the elements of the specified array or the type parameter's default value
 * in a singleton collection if the array is empty.
 * @param defaultValue - The value to return if the array is empty.
 * @returns An array that contains defaultValue if source is empty; otherwise, source.
 */
export function defaultIfEmpty<T>(defaultValue?: T): Operation<T> {
  return function*(source) {
    const e = enumerate(source);

    if (e.moveNext()) {
      do {
        yield e.current;
      } while(e.moveNext());
    } else {
      yield defaultValue;
    }
  };
}
