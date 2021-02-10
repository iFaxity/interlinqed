import type { Predicate, Key, Flow } from './shared';
import { isObject, deepEqual, toNumber } from './shared';

type Accumulator<T, U, R = any> = (acc: U, value: T, index: number) => R;
type Result<T, U, TResult> = (a: T, b: U) => TResult;
type Selector<T, TResult> = (element: T, index: number) => TResult;
type Constructor<T = any> = { new (...args: any[]): T & object } | { (): T };
type ConstructorType<T = any> = T extends Constructor<infer V> ? V : never;

/**
 * Creates a Linq chain which feeds the return value from the previous function into the next function.
 * @param source - Initial array as the beginning of the entire Linq chain.
 * @param func - Functions to run with the return value fo the last function in the chain as the parameter.
 * @returns The result of the last function within the chain.
 */
export function Linq<A extends any[], R1>(source: A, f1: Flow<A, R1>): R1;
export function Linq<A extends any[], R1, R2>(source: A, f1: Flow<A, R1>, f2: Flow<R1, R2>): R2;
export function Linq<A extends any[], R1, R2, R3>(source: A, f1: Flow<A, R1>, f2: Flow<R1, R2>, f3: Flow<R2, R3>): R3;
export function Linq<A extends any[], R1, R2, R3, R4>(source: A, f1: Flow<A, R1>, f2: Flow<R1, R2>, f3: Flow<R2, R3>, f4: Flow<R3, R4>): R4;
export function Linq<A extends any[], R1, R2, R3, R4, R5>(source: A, f1: Flow<A, R1>, f2: Flow<R1, R2>, f3: Flow<R2, R3>, f4: Flow<R3, R4>, f5: Flow<R4, R5>): R5;
export function Linq<A extends any[], R1, R2, R3, R4, R5, R6>(source: A, f1: Flow<A, R1>, f2: Flow<R1, R2>, f3: Flow<R2, R3>, f4: Flow<R3, R4>, f5: Flow<R4, R5>, f6: Flow<R5, R6>): R6;
export function Linq<A extends any[], R1, R2, R3, R4, R5, R6, R7, R8>(source: A, f1: Flow<A, R1>, f2: Flow<R1, R2>, f3: Flow<R2, R3>, f4: Flow<R3, R4>, f5: Flow<R4, R5>, f6: Flow<R5, R6>, f7: Flow<R6, R7>, f8: Flow<R7, R8>): R8;
export function Linq<A extends any[], R1, R2, R3, R4, R5, R6, R7, R8, R9>(source: A, f1: Flow<A, R1>, f2: Flow<R1, R2>, f3: Flow<R2, R3>, f4: Flow<R3, R4>, f5: Flow<R4, R5>, f6: Flow<R5, R6>, f7: Flow<R6, R7>, f8: Flow<R7, R8>, f9: Flow<R7, R9>): R9;
export function Linq<A extends any[]>(source: A, ...func: Flow<any, any>[]): any {
  return func.reduce((acc, fn) => fn(acc), source);
}

/**
 * Generates an array of integral numbers within a specified range.
 * @param start - The value of the first integer in the array.
 * @param count - The number of sequential integers to generate.
 * @returns An array that contains a range of sequential integral numbers.
 */
export function Range(start: number, count: number): number[] {
  const res = [];
  for (let idx = 0; idx < count; idx++) {
    res.push(start + idx);
  }
  return res;
}

/**
 * Generates an array that contains one repeated value.
 * @param element - The value to be repeated.
 * @param count - The number of times to repeat the value in the generated array.
 * @returns An array that contains a repeated value.
 */
export function Repeat<T>(element: T, count: number): T[] {
  const res = [];
  while (count--) {
    res.push(element);
  }
  return res;
}

/**
 * Determines whether an array contains a specified element by using the default equality comparer.
 * @param source - An array in which to locate a value.
 * @param value - The value to locate in the array.
 * @returns true if the source array contains an element that has the specified value; otherwise, false.
 */
export function Contains<T>(source: T[], value: T): boolean {
  return source.indexOf(value) >= 0;
}

/**
 * Inserts an element into the T[] at the specified index.
 * @param source - An array in which to insert items into.
 * @param index - The zero-based index at which item should be inserted.
 * @param items - The objects to insert into the array.
 */
export function Insert<T>(source: T[], index: number, ...items: T[]): void {
  source.splice(index, 0, ...items);
}

/**
 * Removes the first occurrence of a specific object from the array.
 * @param source - An array in which to remove item from.
 * @param item - The object to remove from the array.
 * @returns true if item is successfully removed; otherwise, false. This method also returns false if item was not found in the array.
 */
export function Remove<T>(source: T[], item: T): boolean {
  const idx = source.indexOf(item)
  return idx >= 0 && !!source.splice(idx, 1);
}

/**
 * Removes the array item at the specified index.
 * @param source - An array in which to remove item from.
 * @param index - The zero-based index of the item to remove.
 */
export function RemoveAt<T>(source: T[], index: number): void {
  if (index < 0 || index >= source.length) {
    throw new TypeError('ArgumentOutOfRangeException');
  }

  source.splice(index, 1);
}

/**
 * Reverses the order of the elements in the array or a portion of it.
 * @param source - An array in which to reverse.
 * @param index - The zero-based starting index of the range to reverse.
 * @param count - The number of elements in the range to reverse.
 */
export function Reverse<T>(source: T[]): void;
export function Reverse<T>(source: T[], index: number, count: number): void;
export function Reverse<T>(source: T[], index?: number, count?: number): void {
  if (typeof index != 'number' || typeof count != 'number') {
    source.reverse();
  } else if (index < 0) {
    throw new TypeError('Index less than 0');
  } else if (count < 0) {
    throw new TypeError('Count less than 0');
  } else if (index < source.length) {
    const res = source.splice(index, count);
    source.splice(index, 0, ...res.reverse());
  }
}

/**
 * Applies an accumulator function over an array.
 * @param source - An array to aggregate over.
 * @param accumulator - An accumulator function to be invoked on each element.
 * @param seed - The initial accumulator value.
 * @returns The transformed final accumulator value.
 */
export function Aggregate<T, U, R = any>(source: T[], accumulator: Accumulator<T, U, R>): R;
export function Aggregate<T, U>(source: T[], seed: U, accumulator: Accumulator<T, U>): U;
export function Aggregate<T>(source: T[], ...args: any[]): any {
  return args.length >= 2
    ? source.reduce(args[1], args[0])
    : source.reduce(args[0]);
}

/**
 * Determines whether all elements of an array satisfy a condition.
 * @param source - An array that contains the elements to apply the predicate to.
 * @param predicate - A function to test each element for a condition.
 * @returns true if every element of the source array passes the test in the specified predicate, or if the array is empty; otherwise, false.
 */
export function All<T>(source: T[], predicate: Predicate<T>): boolean {
  return source.every(predicate);
}

/**
 * Determines whether an array contains any elements.
 * @param source - An array whose elements to apply the predicate to. Or to check for emptiness.
 * @param predicate - A function to test each element for a condition.
 * @returns true if the source array is not empty and at least one of its elements passes the test in the specified predicate; otherwise, false.
 */
export function Any<T>(source: T[], predicate?: Predicate<T>): boolean {
  return predicate ? source.some(predicate) : !!source.length;
}

/**
 * Computes the average of an array of numbers that are obtained by invoking
 * a transform function on each element of the input array.
 * @param source - An array that are used to calculate an average.
 * @param selector - A transform function to apply to each element.
 * @returns The average of the array.
 */
export function Average<T>(source: T[], selector?: Selector<T, number>): number {
  return Sum(source, selector) / source.length;
}

/**
 * Returns a number that represents how many elements in the specified array satisfy a condition.
 * @param source - An array that contains elements to be counted.
 * @param predicate - A function to test each element for a condition.
 * @returns A number that represents how many elements in the array satisfy the condition in the predicate function.
 */
export function Count<T>(source: T[], predicate?: Predicate<T>): number {
  return (predicate ? source.filter(predicate) : source).length;
}

/**
 * Returns the elements of the specified array or the type parameter's default value
 * in a singleton collection if the array is empty.
 * @param source - The array to return the specified value for if it is empty.
 * @param defaultValue - The value to return if the array is empty.
 * @returns An array that contains defaultValue if source is empty; otherwise, source.
 */
export function DefaultIfEmpty<T>(source: T[], defaultValue?: T): T[] {
  return source.length ? source : [ defaultValue ];
}

/**
 * Returns distinct elements from a array by using the default equality comparer to compare values.
 * @param source The array to remove duplicate elements from.
 * @returns An array that contains distinct elements from the source array.
 */
export function Distinct<T>(source: T[]): T[] {
  return source.filter((item, idx) => {
    return idx == (isObject(item) ? source.findIndex(o => deepEqual(item, o)) : source.indexOf(item));
  });
}

/**
 * Returns distinct elements from an array according to a specified key selector.
 * @param source - The array to remove duplicate elements from.
 * @param keySelector - A function to extract the key for each element.
 * @returns An array that contains distinct elements from the source array, according to the specified key selector.
 */
export function DistinctBy<T>(source: T[], keySelector: Key<T>): T[] {
  const keys: (string|number)[] = [];
  return source.filter(item => {
    const key = keySelector(item);
    return (keys.indexOf(key) == -1) && !!keys.push(key);
  });
}

/**
 * Returns the element at a specified index in a array or null if the index is out of range.
 * @param source - An array to return an element from.
 * @param index - The zero-based index of the element to retrieve.
 * @returns null if the index is outside the bounds of the source array; otherwise, the element at the specified position in the source array.
 */
export function ElementAt<T>(source: T[], index: number): T|null {
  return (index >= 0 && index < source.length) ? source[index] : null;
}

/**
 * Returns the first element in an array that satisfies a specified condition, or null if the array contains no elements.
 * @param source - An array to return an element from.
 * @param predicate - A function to test each element for a condition.
 * @returns The first element in the array that passes the test in the specified predicate function, or null if no element was matched.
 */
export function First<T>(source: T[], predicate?: Predicate<T>): T|null {
  if (!predicate) {
    return ElementAt(source, 0);
  }

  for (let idx = 0; idx < source.length; idx++) {
    const x = source[idx];
    if (predicate(x, idx)) {
      return x;
    }
  }
  return null;
}

/**
 * Groups the elements of an array according to a specified key selector function.
 * @param source - An array whose elements to group.
 * @param keySelector - A function to extract the key for each element.
 * @param resultSelector - A function to create a result value from each group.
 * @returns An object of elements of type TResult where each element represents a projection over a group and its key.
 */
export function GroupBy<T, TResult = T>(
  source: T[],
  keySelector: Key<T>,
  resultSelector?: (element: T) => TResult
): Record<string, TResult[]> {
  return source.reduce((acc, item) => {
    const key = keySelector(item);
    const value = (resultSelector ? resultSelector(item) : item) as TResult;
    const group = acc[key];

    if (group) {
      group.push(value);
    } else {
      acc[key] = [value];
    }

    return acc;
  }, {} as Record<string, TResult[]>);
}

/**
 * Correlates the elements of two arrays based on equality of keys and groups the results.
 * The default equality comparer is used to compare keys.
 * @param inner - The first array to join.
 * @param outer - The array to join to the first array.
 * @param innerKeySelector - A function to extract the join key from each element of the first array.
 * @param outerKeySelector - A function to extract the join key from each element of the second array.
 * @param resultSelector - A function to create a result element from an element from the first array.
 * and a collection of matching elements from the second array.
 * @returns An array that contains elements of type TResult that are obtained by performing a grouped join on two arrays.
 */
export function GroupJoin<TInner, TOuter, TKey, TResult>(
  inner: TInner[],
  outer: TOuter[],
  innerKeySelector: Key<TInner, TKey>,
  outerKeySelector: Key<TOuter, TKey>,
  resultSelector: Result<TInner, TOuter[], TResult>
): TResult[] {
  return inner.map(x => {
    return resultSelector(x, outer.filter(y => innerKeySelector(x) === outerKeySelector(y)));
  });
}

/**
 * Correlates the elements of two arrays based on matching keys.
 * The default equality comparer is used to compare keys.
 * @param inner - The first array to join.
 * @param outer - The array to join to the first array.
 * @param innerKeySelector - A function to extract the join key from each element of the first array.
 * @param outerKeySelector - A function to extract the join key from each element of the second array.
 * @param resultSelector - A function to create a result element from two matching elements.
 * @returns An array that has elements of type TResult that are obtained by performing an inner join on two arrays.
 */
export function Join<TInner, TOuter, TKey, TResult>(
  inner: TInner[],
  outer: TOuter[],
  innerKeySelector: Key<TInner, TKey>,
  outerKeySelector: Key<TOuter, TKey>,
  resultSelector: Result<TInner, TOuter, TResult>
): TResult[] {
  return SelectMany(inner, x => outer
      .filter(y => innerKeySelector(x) === outerKeySelector(y))
      .map(z => resultSelector(x, z))
  );
}

/**
 * Returns the last element of an array that satisfies a specified condition.
 * @param source - An array to return an element from.
 * @param predicate - A function to test each element for a condition.
 * @returns The last element in the array that passes the test in the specified predicate function.
 * Or null if no element was matched.
 */
export function Last<T>(source: T[], predicate?: Predicate<T>): T {
  let idx = source.length;
  if (!predicate) {
    return ElementAt(source, idx - 1);
  }

  while (idx--) {
    const x = source[idx];
    if (predicate(x, idx)) {
      return x;
    }
  }
  return null;
}

/**
 * Returns the maximum value in an array of numbers. Optionally with a element transform function.
 * @param source - An array of values to determine the maximum value of.
 * @param selector - A transform function to apply to each element.
 * @returns A number that corresponds to the maximum value in the array.
 */
export function Max<T>(source: T[], selector?: Selector<T, number>): number {
  return Math.max(...source.map(selector ?? toNumber));
}


/**
 * Returns the minimum value in an array of numbers. Optionally with a element transform function.
 * @param source - An array of values to determine the minimum value of.
 * @param selector - A transform function to apply to each element.
 * @returns A number that corresponds to the minimum value in the array.
 */
export function Min<T>(source: T[], selector?: Selector<T, number>): number {
  return Math.min(...source.map(selector ?? toNumber));
}


/**
 * Projects each element of a array into a new form.
 * @param source - An array of values to invoke a transform function on.
 * @param selector - A transform function to apply to each element.
 * @returns An array whose elements are the result of invoking the transform function on each element of source.
 */
export function Select<T, TResult>(source: T[], selector: Selector<T, TResult>): TResult[] {
  return source.map(selector);
}


/**
 * Projects each element of a array to an array, flattens the resulting arrays into one array,
 * and invokes a result selector function on each element therein.
 * @param source - An array of values to project.
 * @param collectionSelector - A transform function to apply to each element;
 * the second parameter of the function represents the index of the element.
 * @param resultSelector - A transform function to apply to each element of the intermediate array.
 * @returns An array whose elements are the result of invoking the one-to-many transform function collectionSelector
 * on each element of and then mapping each of those array elements and their corresponding element to a result element.
 */
export function SelectMany<TSource, TResult extends any[]>(
  source: TSource[],
  collectionSelector: Selector<TSource, TResult>
): TResult;
export function SelectMany<TSource, TCollection extends any, TResult extends any>(
  source: TSource[],
  collectionSelector: Selector<TSource, TCollection[]>,
  resultSelector: Selector<TCollection, TResult>
): TResult[];
export function SelectMany<TSource, TCollection extends any, TResult extends any>(
  source: TSource[],
  collectionSelector: Selector<TSource, TCollection[]>,
  resultSelector?: Selector<TCollection, TResult>
): TResult[] {
  const res = source.reduce((acc, item, idx) => {
    return (acc.push(...collectionSelector(item, idx)), acc);
  }, [] as TCollection[]);

  return resultSelector ? res.map(resultSelector) : res as TResult[];
}

/**
 * Returns the only element of an array, or a default value if the array is empty;
 * this method throws an exception if there is more than one element in the array.
 * @param source - An array to return a single element from.
 * @param predicate - A function to test an element for a condition.
 * @returns The single element of the input array that satisfies a condition. Returns null if sourceis empty
 * @throws {TypeError} If source array has more than 1 element
 */
export function Single<T>(source: T[], predicate?: Predicate<T>): T {
  const res = predicate ? source.filter(predicate) : source;
  if (res.length > 1) {
    throw new TypeError('Source array has more than one element');
  }

  return res.length ? res[0] : null;
}

/**
 * Bypasses a specified number of elements in an array and then returns the remaining elements.
 * @param source - An array to return elements from.
 * @param count - The number of elements to skip before returning the remaining elements.
 * @returns An array that contains the elements that occur after the specified index in the input array.
 */
export function Skip<T>(source: T[], count: number): T[] {
  return source.slice(Math.max(0, count));
}

/**
 * Returns a new array that contains the elements from source with the last count elements of the source array omitted.
 * @param source - An array instance.
 * @param count - The number of elements to omit from the end of the array.
 * @returns A new array that contains the elements from source minus count elements from the end of the array.
 */
export function SkipLast<T>(source: T[], count: number): T[] {
  const len = count > 0 ? (-count) : source.length;
  return source.slice(0, len);
}

/**
 * Computes the sum of the array of number values that are obtained by invoking
 * a transform function on each element of the input array.
 * @param source - An array of values that are used to calculate a sum.
 * @param transform - A transform function to apply to each element.
 * @returns The sum of the projected values.
 */
export function Sum<T>(source: T[], transform?: Selector<T, number>): number|null {
  const res: any[] = transform ? source.map(transform) : source;
  return res.reduce((acc, v) => acc + (+v), 0);
}

/**
 * Returns a specified number of contiguous elements from the start of a array.
 * @param source - An array to return elements from.
 * @param count - The number of elements to return.
 * @returns An array that contains the specified number of elements from the start of the input array.
 */
export function Take<T>(source: T[], count: number): T[] {
  return source.slice(0, Math.max(0, count));
}

/**
 * Returns a specified number of contiguous elements from the end of a array.
 * @param source - An array instance.
 * @param count - A new array that contains the elements from source minus count elements from the end of the array.
 * @returns A new array that contains the last count elements from source.
 */
export function TakeLast<T>(source: T[], count: number): T[] {
  return count > 0 ? source.slice(-count) : [];
}

/**
 * Creates an object as a map with TKey as key and TValue as value from a T[] according to a specified key selector function.
 * @param source - An array to create an object from
 * @param keySelector - A function to extract a key from each element.
 * @param valueSelector - A transform function to produce a result element value from each element.
 * @returns An object that contains values of type TValue selected from the input array.
 */
export function ToObject<T, TKey extends (string|number)>(
  source: T[],
  keySelector: (key: T) => TKey
): Record<TKey, T>;
export function ToObject<T, TKey extends (string|number), TValue>(
  source: T[],
  keySelector: (key: T) => TKey,
  valueSelector: (value: T) => TValue
): Record<TKey, TValue>;
export function ToObject<T, TKey extends (string|number), TValue>(
  source: T[],
  keySelector: (key: T) => TKey,
  valueSelector?: (value: T) => TValue
): Record<TKey, TValue> {
  return source.reduce((acc, item) => {
    acc[keySelector(item)] = valueSelector ? valueSelector(item) : item as any;
    return acc;
  }, {} as Record<TKey, TValue>);
}

/**
 * Filters a array of values based on a predicate.
 * @param source - An array to filter.
 * @param predicate - A function to test each element for a condition.
 * @returns An array that contains elements from the input array that satisfy the condition.
 */
export function Where<T>(source: T[], predicate: Predicate<T>): T[] {
  return source.filter(predicate);
}

/**
 * Casts the elements of an array to the specified type.
 * Note: only casts through typescript, does not actually cast each individual element.
 * @param source - The array that contains the elements to be cast to type T.
 * @returns An array that contains each element of the source array cast to the specified type.
 */
export function Cast<T>(source: any[]): T[] {
  return [...source];
}

/**
 * Produces the set difference of two arrays by using the default equality comparer to compare values.
 * @param first - An array whose elements that are not also in second will be returned.
 * @param second - An array whose elements that also occur in the first array will cause those elements to be removed from the returned array.
 * @returns A array that contains the set difference of the elements of two arrays.
 */
export function Except<T>(first: T[], second: T[]): T[] {
  return first.filter((x, idx) => second.indexOf(x) < 0 && first.indexOf(x) == idx);
}

/**
 * Produces the set intersection of two arrays by using the default equality comparer to compare values.
 * @param first - An array whose distinct elements that also appear in second will be returned.
 * @param second - An array whose distinct elements that also appear in the first array will be returned.
 * @returns An array that contains the elements that form the set intersection of two arrays.
 */
export function Intersect<T>(first: T[], second: T[]): T[] {
  return first.filter(x => second.indexOf(x) >= 0);
}

/**
 * Filters the elements of an array based on a specified type.
 * @param source - The array whose elements to filter.
 * @param type - The type to filter the elements of the array on.
 * @returns An array that contains elements from the input array of type.
 */
export function OfType<T, U extends Constructor<T>>(source: T[], type: U): ConstructorType<U>[] {
  const types = [
    [String, 'string'],
    [Number, 'number'],
    [Boolean, 'boolean'],
    [Function, 'function'],
    //[BigInt, 'bigint'], not available for IE
    [Symbol, 'symbol'],
    [Object, 'object'],
  ] as [Constructor, string][];
  const t = types.find(x => type == x[0]);
  const predicate = t
    ? (item: T) => typeof item == t[1]
    : (item: T) => item instanceof type;

  return source.filter(predicate) as ConstructorType<U>[];
}

/**
 * Determines whether two arrays are equal by comparing the elements
 * by using the default equality comparer for their type.
 * @param first - An array to compare to second.
 * @param second - An array to compare to the first array.
 * @returns true if the two source arrays are of equal length and their corresponding elements are
 * equal according to the default equality comparer for their type; otherwise, false.
 */
export function SequenceEqual<T>(first: T[], second: T[]): boolean {
  return first.length == second.length && first.every((x, idx) => x === second[idx]);
}

/**
 * Bypasses elements in an array as long as a specified condition is true and then returns the remaining elements.
 * @param source - An array to return elements from.
 * @param predicate - A function to test each element for a condition.
 * @returns An array that contains the elements from the input array starting at the first element in the linear series that does not pass the test specified by predicate.
 */
export function SkipWhile<T>(source: T[], predicate: Predicate<T>): T[] {
  const idx = source.findIndex((item, idx) => !predicate(item, idx));
  return idx >= 0 ? Skip(source, idx) : [];
}

/**
 * Returns elements from an array as long as a specified condition is true.
 * @param source - An array to return elements from.
 * @param predicate - A function to test each element for a condition.
 * @returns An array that contains the elements from the input array that occur before the element at which the test no longer passes.
 */
export function TakeWhile<T>(source: T[], predicate: Predicate<T>): T[] {
  const idx = source.findIndex((item, idx) => !predicate(item, idx));
  return idx >= 0 ? Take(source, idx) : [ ...source ];
}

/**
 * Produces the set union of two arrays by using the default equality comparer.
 * @param first - An array whose distinct elements form the first set for the union.
 * @param second - An array whose distinct elements form the second set for the union.
 * @returns An array that contains the elements from both input arrays, excluding duplicates.
 */
export function Union<T>(first: T[], second: T[]): T[] {
  return Distinct(first.concat(second));
}

/**
 * Applies a specified function to the corresponding elements of two arrays, producing a array of the results.
 * @param first - The first array to merge.
 * @param second - The second sequence to merge.
 * @param resultSelector - A function that specifies how to merge the elements from the two arrays.
 * @returns An array that contains merged elements of two input arrays.
 */
export function Zip<T, U, TResult>(
  first: T[],
  second: U[],
  resultSelector: Result<T, U, TResult>
): TResult[] {
  return (second.length < first.length
    ? second.map((x, idx) => resultSelector(ElementAt(first, idx), x))
    : first.map((x, idx) => resultSelector(x, ElementAt(second, idx)))
  );
}
