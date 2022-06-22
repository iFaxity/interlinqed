import { Enumerable } from '../core';

/**
 * Generates an array that contains one repeated value.
 * @param element - The value to be repeated.
 * @param count - The number of times to repeat the value in the generated array.
 * @returns An array that contains a repeated value.
 */
export function* repeat<T>(element: T, count: number): Enumerable<T> {
  while (count--) {
    yield element;
  }
}
