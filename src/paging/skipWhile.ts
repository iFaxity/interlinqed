import { Operation, Predicate, enumerate } from '../core';

/**
 * Bypasses elements in an array as long as a specified condition is true and then returns the remaining elements.
 * @param predicate - A function to test each element for a condition.
 * @returns An array that contains the elements from the input array starting at the first element in the linear series that does not pass the test specified by predicate.
 */
export function skipWhile<T>(predicate: Predicate<T>): Operation<T> {
  return function*(source) {
    const e = enumerate(source);
    let idx = 0;

    while (e.moveNext()) {
      if (!predicate(e.current, idx++)) {
        // Drain enumerator
        yield e.current;
        yield* e;
        break;
      }
    }
  };
}
