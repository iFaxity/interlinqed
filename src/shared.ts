

export type Flow<T, R> = (a: T) => R;
export type Key<T = any, TReturn = string | number> = (key: T) => TReturn;
export interface Predicate<T = any> {
  (value?: T, index?: number): boolean
}
export type Comparison<T = any> = (x: T, y: T) => number;
export const ORDERED_KEY = Symbol();
export interface OrderedList<T> extends Array<T> {
  [ORDERED_KEY]: Comparison<T>[];
}

// Converts any into a number
export function toNumber(x: any): number {
  return +x;
}

// Checks if the argument passed is an object
export function isObject<T extends object>(obj: any): obj is T {
  return obj != null && typeof obj == 'object';
}

// Determines if two objects are equal
type LinqObject = Record<string, any>;
export function deepEqual<T extends LinqObject, U extends LinqObject>(a: T, b: U): boolean {
  return Object.keys(a).every(key => {
    return isObject(a[key]) ? deepEqual(a[key], b[key]) : b[key] === a[key];
  });
}

export function isOrderedList<T>(list: any|T[]): list is OrderedList<T> {
  return list != null && typeof list == 'object' && ORDERED_KEY in list;
}

// Shim to ensure stable sorting in pre ES2019 browser engines
// Also deferrs sorting if the list has comparers attached to it
export function stableSort<T>(list: OrderedList<T>): T[] {
  const comparers: Comparison<T>[] = list[ORDERED_KEY];

  // Sort with comparer functions chained into each other if hte previous one returns 0
  return [...list].sort((x, y) => {
    let res: number;
    for (let idx = 0; idx < comparers.length; idx++) {
      res = comparers[idx](x, y);
      if (res !== 0) {
        return res;
      }
    }

    return list.indexOf(x) - list.indexOf(y);
  });
}
