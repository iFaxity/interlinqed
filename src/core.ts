import { Predicate, Key, isObject, deepEqual, toNumber, isOrderedList, stableSort, Flow } from "./shared";

/**
 * Creates a Linq chain which feeds the return value from the previous function into the next function
 */
export function Linq<A extends any[], R1>(initial: A, f1: Flow<A, R1>): R1;
export function Linq<A extends any[], R1, R2>(initial: A, f1: Flow<A, R1>, f2: Flow<R1, R2>): R2;
export function Linq<A extends any[], R1, R2, R3>(initial: A, f1: Flow<A, R1>, f2: Flow<R1, R2>, f3: Flow<R2, R3>): R3;
export function Linq<A extends any[], R1, R2, R3, R4>(initial: A, f1: Flow<A, R1>, f2: Flow<R1, R2>, f3: Flow<R2, R3>, f4: Flow<R3, R4>): R4;
export function Linq<A extends any[], R1, R2, R3, R4, R5>(initial: A, f1: Flow<A, R1>, f2: Flow<R1, R2>, f3: Flow<R2, R3>, f4: Flow<R3, R4>, f5: Flow<R4, R5>): R5;
export function Linq<A extends any[], R1, R2, R3, R4, R5, R6>(initial: A, f1: Flow<A, R1>, f2: Flow<R1, R2>, f3: Flow<R2, R3>, f4: Flow<R3, R4>, f5: Flow<R4, R5>, f6: Flow<R5, R6>): R6;
export function Linq<A extends any[], R1, R2, R3, R4, R5, R6, R7, R8>(initial: A, f1: Flow<A, R1>, f2: Flow<R1, R2>, f3: Flow<R2, R3>, f4: Flow<R3, R4>, f5: Flow<R4, R5>, f6: Flow<R5, R6>, f7: Flow<R6, R7>, f8: Flow<R7, R8>): R8;
export function Linq<A extends any[], R1, R2, R3, R4, R5, R6, R7, R8, R9>(initial: A, f1: Flow<A, R1>, f2: Flow<R1, R2>, f3: Flow<R2, R3>, f4: Flow<R3, R4>, f5: Flow<R4, R5>, f6: Flow<R5, R6>, f7: Flow<R6, R7>, f8: Flow<R7, R8>, f9: Flow<R7, R9>): R9;
export function Linq<A extends any[]>(initial: A, ...func: Flow<any, any>[]): any {
  // reduce is 4-8x slower than for loop, might use it instead here
  return func.reduce((acc, fn, idx) => {
    const res = fn(acc);
    return isOrderedList(acc) && (!isOrderedList(res) || idx == func.length - 1)
      ? stableSort(res)
      : res;
  }, initial);
}

/**
 * Generates a sequence of integral numbers within a specified range.
 */
export function Range(start: number, count: number): number[] {
  const res = [];
  for (let idx = 0; idx < count; idx++) {
    res.push(start + idx);
  }
  return res;
}

/**
 * Generates a sequence that contains one repeated value.
 */
export function Repeat<T>(item: T, count: number): T[] {
  const res = [];
  while (count--) {
    res.push(item);
  }
  return res;
}

/**
 * Determines whether a sequence contains a specified element by using the default equality comparer.
 */
export function Contains<T>(list: T[], item: T): boolean {
  return list.indexOf(item) >= 0;
}

/**
 * Inserts an element into the T[] at the specified index.
 */
export function Insert<T>(list: T[], idx: number, ...items: T[]): T[] {
  list.splice(idx, 0, ...items);
  return list;
}

/**
 * Removes the first occurrence of a specific object from the T[].
 */
export function Remove<T>(list: T[], item: T): boolean {
  const idx = list.indexOf(item)
  return idx >= 0 && !!list.splice(idx, 1);
}

/**
 * Removes the element at the specified index of the T[].
 */
export function RemoveAt<T>(list: T[], idx: number): void {
  if (idx < 0 || idx >= list.length) {
    throw new TypeError('ArgumentOutOfRangeException');
  }
  
  list.splice(idx, 1);
}

/**
 * Reverses the order of this list in a seperate list
 */
export function Reverse<T>(list: T[]): T[] {
  return [...list].reverse();
}

/**
 * Applies an accumulator function over a sequence.
 */
export function Aggregate<T, U>(list: T[], accumulator: (acc: U, value: T, idx: number) => any): any;
export function Aggregate<T, U>(list: T[], accumulator: (acc: U, value: T, idx: number) => any, initialValue?: U): U;
export function Aggregate<T>(list: T[], ...args: any[]): any {
  return list.reduce.apply(list, args);
}

/**
 * Determines whether all elements of a sequence satisfy a condition.
 */
export function All<T>(list: T[], predicate: Predicate<T>): boolean {
  return list.every(predicate);
}

/**
 * Determines whether a sequence contains any elements.
 */
export function Any<T>(list: T[], predicate?: Predicate<T>): boolean {
  return predicate ? list.some(predicate) : !!list.length;
}

/**
 * Computes the average of a sequence of number values that are obtained by invoking
 * a transform function on each element of the input sequence.
 */
export function Average<T>(list: T[], transform?: (value?: T, idx?: number) => number): number {
  return Sum(list, transform) / list.length;
}

/**
 * Returns the number of elements in a sequence.
 */
export function Count<T>(list: T[], predicate?: Predicate<T>): number {
  return (predicate ? list.filter(predicate) : list).length;
}

/**
 * Returns the elements of the specified sequence or the type parameter's default value
 * in a singleton collection if the sequence is empty.
 */
export function DefaultIfEmpty<T>(list: T[], defaultValue?: T): T[] {
  return list.length ? list : [ defaultValue ];
}

/**
 * Returns distinct elements from a sequence by using the default equality comparer to compare values.
 */
export function Distinct<T>(list: T[]): T[] {
  return list.filter((item, idx) => {
    return idx == (isObject(item) ? list.findIndex(o => deepEqual(item, o)) : list.indexOf(item));
  });
}

/**
 * Returns distinct elements from a sequence according to specified key selector.
 */
export function DistinctBy<T>(list: T[], selector: Key<T>): T[] {
  const keys: (string|number)[] = [];
  return list.filter(item => {
    const key = selector(item);
    return (keys.indexOf(key) == -1) && !!keys.push(key);
  });
}

/**
 * Returns the element at a specified index in a sequence or a default value if the index is out of range.
 */
export function ElementAt<T>(list: T[], idx: number): T {
  return (idx >= 0 && idx < list.length) ? list[idx] : null;
}

/**
 * Returns the first element of a sequence, or a default value if the sequence contains no elements.
 */
export function First<T>(list: T[], predicate?: Predicate<T>): T {
  if (!predicate) {
    return ElementAt(list, 0);
  }

  for (let idx = 0; idx < list.length; idx++) {
    const x = list[idx];
    if (predicate(x, idx)) {
      return x;
    }
  }
  return null;
}

/**
 * Groups the elements of a sequence according to a specified key selector function.
 */
export function GroupBy<T, TResult = T>(list: T[], selector: Key<T>, mapper?: (element: T) => TResult): Record<string, TResult[]> {
  return list.reduce((acc, item) => {
    const key = selector(item);
    const value = mapper ? mapper(item) : item;
    const group = acc[key];

    group ? (acc[key] = [ value as TResult ]) : group.push(value as TResult);
    return acc;
  }, {} as Record<string, TResult[]>);
}

/**
 * Correlates the elements of two sequences based on equality of keys and groups the results.
 * The default equality comparer is used to compare keys.
 */
export function GroupJoin<T, U, R>(list: T[], other: U[], key1: Key<T>, key2: Key<U>, result: (a: T, b: U[]) => R): R[] {
  return list.map(x => result(x, other.filter(y => key1(x) === key2(y))));
}

/**
 * Correlates the elements of two sequences based on matching keys. The default equality comparer is used to compare keys.
 */
export function Join<T, U, R>(list: T[], other: U[], key1: Key<T>, key2: Key<U>, result: (a: T, b: U) => R): R[] {
  return SelectMany(list, x => other.filter(y => key1(x) === key2(y)).map(z => result(x, z)));
}

/**
 * Returns the last element of a sequence.
 */
export function Last<T>(list: T[], predicate?: Predicate<T>): T {
  let idx = list.length;
  if (!predicate) {
    return ElementAt(list, idx - 1);
  }

  while (idx--) {
    const x = list[idx];
    if (predicate(x, idx)) {
      return x;
    }
  }
  return null;
}

/**
 * Returns the maximum value in a generic sequence.
 */
export function Max<T>(list: T[], selector?: (value: T, index: number) => number): number {
  return Math.max(...list.map(selector ?? toNumber));
}


/**
 * Returns the minimum value in a generic sequence.
 */
export function Min<T>(list: T[], selector?: (value: T, index: number) => number): number {
  return Math.min(...list.map(selector ?? toNumber));
}

/**
 * Projects each element of a sequence into a new form.
 */
export function Select<T, TResult>(list: T[], selector: (element: T, index: number) => TResult): TResult[] {
  return list.map(selector);
}

/**
 * Projects each element of a sequence to a any[] and flattens the resulting sequences into one sequence.
 */
export function SelectMany<T, TResult extends U[], U = any>(list: T[], selector: (element: T, index: number) => TResult|U[]): TResult {
  return list.reduce((acc, item, idx) => {
    return (acc.push(...selector(item, idx)), acc);
  }, []) as TResult;
}


/**
 * Returns the only element of a sequence, or a default value if the sequence is empty;
 * this method throws an exception if there is more than one element in the sequence.
 */
export function Single<T>(list: T[], predicate?: Predicate<T>): T {
  return ElementAt(predicate ? list.filter(predicate) : list, 0);
}

/**
 * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
 */
export function Skip<T>(list: T[], amount: number): T[] {
  return list.slice(Math.max(0, amount));
}

/**
 * Omit the last specified number of elements in a sequence and then returns the remaining elements.
 */
export function SkipLast<T>(list: T[], amount: number): T[] {
  return list.slice(0, -Math.max(0, amount));
}

/**
 * Computes the sum of the sequence of number values that are obtained by invoking
 * a transform function on each element of the input sequence.
 */
export function Sum<T>(list: T[], transform?: (value?: T, index?: number) => number): number|null {
  const res: any[] = transform ? list.map(transform) : list;
  return res.reduce((acc, v) => acc + (+v), 0);
}

/**
 * Returns a specified number of contiguous elements from the start of a sequence.
 */
export function Take<T>(list: T[], amount: number): T[] {
  return list.slice(0, Math.max(0, amount));
}

/**
 * Returns a specified number of contiguous elements from the end of a sequence.
 */
export function TakeLast<T>(list: T[], amount: number): T[] {
  return list.slice(-Math.max(0, amount));
}

/**
 * Creates a Dictionary<TKey, TValue> from a T[] according to a specified key selector function.
 */
export function ToObject<T, TKey extends (string|number), TValue>(
  list: T[],
  key: (key: T) => TKey,
  value?: (value: T) => TValue
): Record<TKey, TValue> {
  return list.reduce((acc, item) => {
    acc[key(item)] = value ? value(item) : item as any;
    return acc;
  }, {} as Record<TKey, TValue>);
}

/**
 * Filters a sequence of values based on a predicate.
 */
export function Where<T>(items: T[], predicate: Predicate<T>): T[] {
  return items.filter(predicate);
}

//
// Extra functions
//

type Constructor<T = any> = { new (...args: any[]): T & object } | { (): T };
type ConstructorType<T = any> = T extends Constructor<infer V> ? V : unknown;

/**
 * Casts the elements of a sequence to the specified type.
 */
export function Cast<T, U>(list: T[]): U[] {
  return list as unknown as U[];
}

/**
 * Produces the set difference of two sequences by using the default equality comparer to compare values.
 */
export function Except<T>(list: T[], other: T[]): T[] {
  return list.filter(x => other.indexOf(x) < 0);
}

/**
 * Produces the set intersection of two sequences by using the default equality comparer to compare values.
 */
export function Intersect<T>(list: T[], other: T[]): T[] {
  return list.filter(x => other.indexOf(x) >= 0);
}

/**
 * Filters the elements of a sequence based on a specified type.
 */
export function OfType<T, U extends Constructor<T>>(list: T[], type: U): ConstructorType<U>[] {
  const types = [
    [String, 'string'],
    [Number, 'number'],
    [Boolean, 'boolean'],
    [Function, 'function'],
    [Symbol, 'symbol'],
  ] as [Constructor, string][];
  const t = types.find(x => type == x[0]);
  const predicate = t ? (x: T) => typeof x == t[1] : (x: T) => x instanceof type;

  return list.filter(predicate) as ConstructorType<U>[];
}

/**
 * Determines whether two sequences are equal by comparing the elements by using the default equality comparer for their type.
 */
export function SequenceEqual<T>(list: T[], other: T[]): boolean {
  return list.length == other.length && list.every((x, idx) => x === other[idx]);
}

/**
 * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
 */
export function SkipWhile<T>(list: T[], predicate: Predicate<T>): T[] {
  const idx = list.findIndex(predicate);
  return (idx >= 0 && idx < list.length) ? Skip(list, idx) : [];
}

/**
 * Returns elements from a sequence as long as a specified condition is true.
 */
export function TakeWhile<T>(list: T[], predicate: Predicate<T>): T[] {
  const idx = list.findIndex(predicate);
  return (idx >= 0 && idx < list.length) ? Take(list, idx) : list;
}

/**
 * Produces the set union of two sequences by using the default equality comparer.
 */
export function Union<T>(list: T[], other: T[]): T[] {
  return Distinct(list.concat(other));
}

/**
 * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
 */
export function Zip<T, U, TOut>(list: T[], other: U[], result: (a: T, b: U) => TOut): TOut[] {
  return (other.length < list.length
    ? other.map((x, idx) => result(ElementAt(list, idx), x))
    : list.map((x, idx) => result(x, ElementAt(other, idx)))
  );
}
