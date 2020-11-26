export type Flow<T, R> = (a: T) => R;
export type Key<T = any, TReturn = string | number> = (key: T) => TReturn;
export type Comparison<T = any> = (x: T, y: T) => number;

export interface Predicate<T = any> {
  (value?: T, index?: number): boolean
}

/**
 * Converts input into a number, returns NaN conversion failed
 * @param input - Input data to convert
 * @returns The input as a number
 * @private
 */
export function toNumber(input: any): number {
  return +input;
}

/**
 * Checks if the argument passed is an object
 * @param input - Input data to verify if it is an object
 * @returns A boolean with the result
 * @private
 */
export function isObject<T extends object>(input: any): input is T {
  return input != null && typeof input == 'object';
}

/**
 * Determines if two objects are considered equal, only checks own properties
 * @param a - Object a to compare
 * @param b - Object to compare a against
 * @returns A boolean with the result
 * @private
 */
export function deepEqual<
  T extends Record<string, any>,
  U extends Record<string, any>
>(a: T, b: U): boolean {
  if (!isObject(a) || !isObject(b)) {
    return a === b;
  }

  // Ensure key amount is the same
  const keys = Object.keys(a);
  return (Object.keys(b).length == keys.length) && keys.every(key => deepEqual(a[key], b[key]));
}

/**
 * Shim to ensure stable sorting in pre ES2019 browser engines, as sorting is unstable
 * @param list - Input array to sort
 * @param comparisons - Array of comparison functions to use in the sorting, at least one is required
 * @returns A copy of the array, but sorted
 * @private
 */
export function stableSort<T>(list: T[], ...comparisons: Comparison<T>[]): T[] {
  // Sort with comparer functions chained into each other if the previous one returns 0
  return [...list].sort((x, y) => {
    let res: number;

    for (let idx = 0; idx < comparisons.length; idx++) {
      res = comparisons[idx](x, y);
      if (res !== 0) {
        return res;
      }
    }

    return list.indexOf(x) - list.indexOf(y);
  });
}
