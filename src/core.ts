import type { Predicate, Key, Flow, Operation, Enumerable, Collector, Pipe } from './shared';
import { isObject, deepEqual } from './shared';
import { enumerate } from './enumerator';

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
export function linq<A extends Iterator<any, void, any>, R1>(source: A, f1: Flow<A, R1>): R1;
export function linq<A extends Iterator<any, void, any>, R1, R2>(source: A, f1: Flow<A, R1>, f2: Flow<R1, R2>): R2;
export function linq<A extends Iterator<any, void, any>, R1, R2, R3>(source: A, f1: Flow<A, R1>, f2: Flow<R1, R2>, f3: Flow<R2, R3>): R3;
export function linq<A extends Iterator<any, void, any>, R1, R2, R3, R4>(source: A, f1: Flow<A, R1>, f2: Flow<R1, R2>, f3: Flow<R2, R3>, f4: Flow<R3, R4>): R4;
export function linq<A extends Iterator<any, void, any>, R1, R2, R3, R4, R5>(source: A, f1: Flow<A, R1>, f2: Flow<R1, R2>, f3: Flow<R2, R3>, f4: Flow<R3, R4>, f5: Flow<R4, R5>): R5;
export function linq<A extends Iterator<any, void, any>, R1, R2, R3, R4, R5, R6>(source: A, f1: Flow<A, R1>, f2: Flow<R1, R2>, f3: Flow<R2, R3>, f4: Flow<R3, R4>, f5: Flow<R4, R5>, f6: Flow<R5, R6>): R6;
export function linq<A extends Iterator<any, void, any>, R1, R2, R3, R4, R5, R6, R7, R8>(source: A, f1: Flow<A, R1>, f2: Flow<R1, R2>, f3: Flow<R2, R3>, f4: Flow<R3, R4>, f5: Flow<R4, R5>, f6: Flow<R5, R6>, f7: Flow<R6, R7>, f8: Flow<R7, R8>): R8;
export function linq<A extends Iterator<any, void, any>, R1, R2, R3, R4, R5, R6, R7, R8, R9>(source: A, f1: Flow<A, R1>, f2: Flow<R1, R2>, f3: Flow<R2, R3>, f4: Flow<R3, R4>, f5: Flow<R4, R5>, f6: Flow<R5, R6>, f7: Flow<R6, R7>, f8: Flow<R7, R8>, f9: Flow<R7, R9>): R9;
export function linq<A extends Iterator<any, void, any>>(source: A, ...func: Flow<any, any>[]): any {
  if (!func.length) {
    return source;
  }

  let result = source;
  for (let idx = 0; idx < func.length; idx++) {
    result = func[idx](result);
  }

  return result;
}

/**
 * Generates an array of integral numbers within a specified range.
 * @param start - The value of the first integer in the array.
 * @param count - The number of sequential integers to generate.
 * @returns An array that contains a range of sequential integral numbers.
 */
export function* range(start: number, count: number): Enumerable<number> {
  for (let idx = 0; idx < count; idx++) {
    yield (start + idx);
  }
}

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

/**
 * Determines whether an array contains a specified element by using the default equality comparer.
 * @param value - The value to locate in the array.
 * @returns true if the source array contains an element that has the specified value; otherwise, false.
 */
export function contains<T>(value: T): Collector<T, boolean> {
  return function(source) {
    for (let item of source) {
      if (item === value) {
        return true;
      }
    }

    return false;
  };
}

/**
 * Reverses the order of the elements in the array or a portion of it.
 */
export function reverse<T>(): Operation<T> {
  return function*(source) {
    yield* Array.from(source).reverse();
  };
}

/**
 * Applies an accumulator function over an array.
 * @param source - An array to aggregate over.
 * @param accumulator - An accumulator function to be invoked on each element.
 * @param seed - The initial accumulator value.
 * @returns The transformed final accumulator value.
 */
export function Aggregate<T, TAcc, TRes = any>(accumulator: Accumulator<T, TAcc, TRes>): Collector<T, TRes>;
export function Aggregate<T, TAcc, TRes>(seed: TAcc, accumulator: Accumulator<T, TAcc, TRes>): Collector<T, TRes>;
export function Aggregate<T, TAcc, TRes>(...args: any[]): Collector<T, TRes> {
  // TODO: FIX THIS
  return function(source) {
    let seed: TAcc|TRes;
    let idx = 0;

    if (args.length >= 2) {
      const accumulator: Accumulator<T, TAcc, TRes> = args[1];
      seed = args[0];

      for (let item of source) {
        seed = accumulator(seed as TAcc, item, idx++);
      }
    } else {
      const accumulator = args[0];
      for (let item of source) {
        if (idx === 0) {
          seed = item as any;
        }

        seed = accumulator(seed as TAcc, item, idx++);
      }
    }

    return seed as TRes;
  };
}

/**
 * Determines whether all elements of an array satisfy a condition.
 * @param predicate - A function to test each element for a condition.
 * @returns true if every element of the source array passes the test in the specified predicate, or if the array is empty; otherwise, false.
 */
export function all<T>(predicate: Predicate<T>): Collector<T, boolean> {
  return (source) => !any(predicate)(source);
}

/**
 * Determines whether an array contains any elements.
 * @param predicate - A function to test each element for a condition.
 * @returns true if the source array is not empty and at least one of its elements passes the test in the specified predicate; otherwise, false.
 */
export function any<T>(predicate?: Predicate<T>): Collector<T, boolean> {
  if (typeof predicate != 'function') {
    predicate = () => true;
  }

  return function(source) {
    let idx = 0;

    for (let item of source) {
      if (predicate(item, idx++)) {
        return true;
      }
    }

    return false;
  };
}

/**
 * Computes the average of an array of numbers that are obtained by invoking
 * a transform function on each element of the input array.
 * @param selector - A transform function to apply to each element.
 * @returns The average of the array.
 */
export function average<T>(selector?: Selector<T, number>): Collector<T, number> {
  if (typeof selector != 'function') {
    selector = Number;
  }

  return function(source) {
    let len = 0;
    let acc = 0;

    for (let item of source) {
      acc += selector(item, len++);
    }

    return acc / len;
  };
}

/**
 * Returns a number that represents how many elements in the specified array satisfy a condition.
 * @param predicate - A function to test each element for a condition.
 * @returns A number that represents how many elements in the array satisfy the condition in the predicate function.
 */
export function count<T>(predicate?: Predicate<T>): Collector<T, number> {
  if (typeof predicate != 'function') {
    predicate = () => true;
  }

  return function(source) {
    let idx = 0;
    let acc = 0;

    for (let item of source) {
      if (predicate(item, idx++)) {
        acc += 1;
      }
    }

    return acc;
  };
}

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

/**
 * Returns distinct elements from a array by using the default equality comparer to compare values.
 * @returns An array that contains distinct elements from the source array.
 */
export function distinct<T>(): Operation<T> {
  const seen = new Set<T>();

  return where(item => {
    if (isObject(item)) {
      const res = any(x => deepEqual(item, x))(seen.values());

      if (!res) {
        seen.add(item);
        return true;
      }
    } else if (!seen.has(item)) {
      seen.add(item);
      return true;
    }

    return false;
  });
}

/**
 * Returns distinct elements from an array according to a specified key selector.
 * @param keySelector - A function to extract the key for each element.
 * @returns An array that contains distinct elements from the source array, according to the specified key selector.
 */
export function distinctBy<T>(keySelector: Key<T>): Operation<T> {
  const keys = new Set<string|number>();

  return where(item => {
    const key = keySelector(item);
    const res = keys.has(key);

    if (!res) {
      keys.add(key);
    }

    return res;
  });
}

/**
 * Returns the element at a specified index in a array or null if the index is out of range.
 * @param index - The zero-based index of the element to retrieve.
 * @returns null if the index is outside the bounds of the source array; otherwise, the element at the specified position in the source array.
 */
export function elementAt<T>(index: number): Collector<T, T|null> {
  if (index < 0) {
    throw new RangeError('index is out of range!');
  }

  return function(source) {
    const e = enumerate(source);

    while (e.moveNext()) {
      if (index--) {
        return e.current;
      }
    }

    return null;
  };
}

/**
 * Returns the first element in an array that satisfies a specified condition, or null if the array contains no elements.
 * @param predicate - A function to test each element for a condition.
 * @returns The first element in the array that passes the test in the specified predicate function, or null if no element was matched.
 */
export function first<T>(predicate?: Predicate<T>): Collector<T, T|null> {
  if (typeof predicate != 'function') {
    predicate = () => true;
  }

  return function(source) {
    let idx = 0;

    for (let item of source) {
      if (predicate(item, idx++)) {
        return item;
      }
    }

    return null;
  };
}

interface Grouping<TKey, TElement> extends Enumerable<TElement> {
  key: TKey;
}

/**
 * Groups the elements of an array according to a specified key selector function.
 * @param keySelector - A function to extract the key for each element.
 * @param resultSelector - A function to create a result value from each group.
 * @returns An object of elements of type TResult where each element represents a projection over a group and its key.
 */
export function GroupBy<T, TKey>(keySelector: Key<T>): Operation<T, Grouping<TKey, T[]>>
export function GroupBy<T, TResult, TKey>(keySelector: Key<T, TKey>, resultSelector: (element: T) => TResult): Operation<T, Grouping<TKey, TResult[]>>
export function GroupBy<T, TResult, TKey>(keySelector: Key<T, TKey>, resultSelector?: (element: T) => TResult): Operation<T, Grouping<TKey, TResult[]>> {
  if (typeof resultSelector != 'function') {
    resultSelector = (x) => x as any;
  }

  return function(source) {
    const seen = new Set<TKey>();

    for (let item of source) {
      const key = keySelector(item);

      if (!seen.has(key)) {
        const iter = pipe(where(x => true), select(x => resultSelector(x))) as Grouping<TKey, T>;

        iter.

        yield ({
          key
        });

        yield* where(x => true);

        seen.add(key);
      }

      const group = record[key];

      if (group) {
        group.push(value);
      } else {
        record[key] = [ value ];
      }
    }

    return record;
  };

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
  outer: Enumerable<TOuter>,
  innerKeySelector: Key<TInner, TKey>,
  outerKeySelector: Key<TOuter, TKey>,
  resultSelector: Result<TInner, Enumerable<TOuter>, TResult>
): Operation<TInner, TResult> {
  return select(x => {
    const outerEnumerable = where<TOuter>(y => innerKeySelector(x) === outerKeySelector(y))(outer);

    return resultSelector(x, outerEnumerable);
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
 * @param predicate - A function to test each element for a condition.
 * @returns The last element in the array that passes the test in the specified predicate function.
 * Or null if no element was matched.
 */
export function last<T>(predicate?: Predicate<T>): Collector<T, T|null> {
  return pipe(reverse(), first(predicate));
}

/**
 * Returns the maximum value in an array of numbers. Optionally with a element transform function.
 * @param selector - A transform function to apply to each element.
 * @returns A number that corresponds to the maximum value in the array.
 */
export function max<T>(selector?: Selector<T, number>): Collector<T, number> {
  if (typeof selector == 'function') {
    selector = Number;
  }

  return function(source) {
    const items = select(selector)(source);
    let maximum = 0;

    for (let item of items) {
      if (item > maximum) {
        maximum = item;
      }
    }

    return maximum;
  };
}

/**
 * Returns the minimum value in an array of numbers. Optionally with a element transform function.
 * @param selector - A transform function to apply to each element.
 * @returns A number that corresponds to the minimum value in the array.
 */
export function min<T>(selector?: Selector<T, number>): Collector<T, number> {
  if (typeof selector == 'function') {
    selector = Number;
  }

  return function(source) {
    const items = select(selector)(source);
    let minimum = 0;

    for (let item of items) {
      if (item < minimum) {
        minimum = item;
      }
    }

    return minimum;
  };
}

/**
 * Projects each element of a array into a new form.
 * @param selector - A transform function to apply to each element.
 * @returns An array whose elements are the result of invoking the transform function on each element of source.
 */
export function select<T, TResult>(selector: Selector<T, TResult>): Operation<T, TResult> {
  return function*(source) {
    let idx = 0;

    for (let item of source) {
      yield selector(item, idx++);
    }
  };
}

/**
 * Projects each element of a array to an array, flattens the resulting arrays into one array,
 * and invokes a result selector function on each element therein.
 * @param collectionSelector - A transform function to apply to each element;
 * the second parameter of the function represents the index of the element.
 * @param resultSelector - A transform function to apply to each element of the intermediate array.
 * @returns An array whose elements are the result of invoking the one-to-many transform function collectionSelector
 * on each element of and then mapping each of those array elements and their corresponding element to a result element.
 */
export function selectMany<TSource, TResult extends any[]>(collectionSelector: Selector<TSource, TResult>): Operation<TSource, TResult>;
export function selectMany<TSource, TCollection extends Enumerable<any>, TResult extends any>(
  collectionSelector: Selector<TSource, TCollection>,
  resultSelector: (a: TSource, b: TCollection) => TResult
): Operation<TSource, TResult>;
export function selectMany<TSource, TCollection extends Enumerable<any>, TResult extends any>(
  collectionSelector: Selector<TSource, Enumerable<TCollection>>,
  resultSelector?: (a: TSource, b: TCollection) => TResult
): Operation<TSource, TResult> {
  if (typeof resultSelector != 'function') {
    resultSelector = (x) => x as TResult;
  }

  return function*(source) {
    let idx = 0;

    for (let item of source) {
      for (let subItem of collectionSelector(item, idx++)) {
        yield resultSelector(item, subItem);
      }
    }
  };
}

/**
 * Returns the only element of an array, or a default value if the array is empty;
 * this method throws an exception if there is more than one element in the array.
 * @param predicate - A function to test an element for a condition.
 * @returns The single element of the input array that satisfies a condition. Returns null if sourceis empty
 * @throws {TypeError} If source array has more than 1 element
 */
export function single<T>(predicate?: Predicate<T>): Collector<T, T|null> {
  if (typeof predicate != 'function') {
    predicate = () => true;
  }

  return function(source) {
    const items = where(predicate)(source);
    let first: T|null = null;

    for (let item of items) {
      if (first != null) {
        throw new TypeError('Source has more than one element');
      }

      first = item;
    }

    return first;
  };
}

/**
 * Bypasses a specified number of elements in an array and then returns the remaining elements.
 * @param count - The number of elements to skip before returning the remaining elements.
 * @returns An array that contains the elements that occur after the specified index in the input array.
 */
export function skip<T>(count: number): Operation<T> {
  if (count < 0) {
    throw new RangeError('count is out of range!');
  }

  return function*(source) {
    for (let item of source) {
      if (count--) {
        break;
      }

      yield item;
    }
  }
}

/**
 * Returns a new array that contains the elements from source with the last count elements of the source array omitted.
 * @param count - The number of elements to omit from the end of the array.
 * @returns A new array that contains the elements from source minus count elements from the end of the array.
 */
export function skipLast<T>(count: number): Operation<T> {
  if (count < 0) {
    throw new RangeError('count is out of range!');
  }

  return function*(source) {
    const items = Array.from(source);

    yield* items.slice(0, -count);
  };
}

/**
 * Computes the sum of the array of number values that are obtained by invoking
 * a transform function on each element of the input array.
 * @param transform - A transform function to apply to each element.
 * @returns The sum of the projected values.
 */
export function sum<T>(transform?: Selector<T, number>): Collector<T, number> {
  if (typeof transform == 'function') {
    return pipe(select(transform), sum());
  }

  return function(source) {
    let acc = 0;

    for (let item of source) {
      acc += Number(item);
    }

    return acc;
  };
}

/**
 * Returns a specified number of contiguous elements from the start of a array.
 * @param count - The number of elements to return.
 * @returns An array that contains the specified number of elements from the start of the input array.
 */
export function take<T>(count: number): Operation<T> {
  if (count < 0) {
    throw new RangeError('count is out of range!');
  }

  return function*(source) {
    let idx = 0;

    for (let item of source) {
      if (count <= idx++) {
        break;
      }

      yield item;
    }
  };
}

/**
 * Returns a specified number of contiguous elements from the end of a array.
 * @param count - A new array that contains the elements from source minus count elements from the end of the array.
 * @returns A new array that contains the last count elements from source.
 */
export function takeLast<T>(count: number): Operation<T> {
  if (count < 0) {
    throw new RangeError('count is out of range!');
  }

  return function*(source) {
    const items = Array.from(source);

    yield* items.slice(-count);
  };
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
 * @param predicate - A function to test each element for a condition.
 * @returns An array that contains elements from the input array that satisfy the condition.
 */
export function where<T>(predicate: Predicate<T>): Operation<T> {
  return function*(source) {
    let idx = 0;

    for (let item of source) {
      if (predicate(item, idx++)) {
        yield item;
      }
    }
  };
}

/**
 * Casts the elements of an array to the specified type.
 * Note: only casts through typescript, does not actually cast each individual element.
 * @param source - The array that contains the elements to be cast to type T.
 * @returns An array that contains each element of the source array cast to the specified type.
 */
export function cast<T>(): Operation<any, T> {
  return (source) => source;
}

/**
 * Produces the set difference of two arrays by using the default equality comparer to compare values.
 * @param other - An array whose elements that also occur in the source will cause those elements to be removed.
 * @returns A array that contains the set difference of the elements of two arrays.
 */
export function except<T>(other: Enumerable<T>): Operation<T> {
  return where((item) => !any(x => x === item)(other));
}

/**
 * Produces the set intersection of two arrays by using the default equality comparer to compare values.
 * @param other - An array whose distinct elements that also appear in the first array will be returned.
 * @returns An array that contains the elements that form the set intersection of two arrays.
 */
export function intersect<T>(other: Enumerable<T>): Operation<T> {
  return where((item) => any(x => x === item)(other));
}

/**
 * Filters the elements of an array based on a specified type.
 * @param type - The type to filter the elements of the array on.
 * @returns An array that contains elements from the input array of type.
 */
export function ofType<T, U extends Constructor<T>>(type: U): Operation<T, ConstructorType<U>> {
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

  return where(predicate) as Operation<T, ConstructorType<U>>;
}

/**
 * Determines whether two arrays are equal by comparing the elements
 * by using the default equality comparer for their type.
 * @param other - An array to compare to the first array.
 * @returns true if the two source arrays are of equal length and their corresponding elements are
 * equal according to the default equality comparer for their type; otherwise, false.
 */
export function sequenceEqual<T>(other: Enumerable<T>): Collector<T, boolean> {
  return function(source) {
    const e1 = enumerate(source);
    const e2 = enumerate(other);

    while (e1.moveNext()) {
      if (!(e2.moveNext() && e1.current === e2.current)) {
        return false;
      }
    }

    return !e2.moveNext();
  };
}

/**
 * Bypasses elements in an array as long as a specified condition is true and then returns the remaining elements.
 * @param predicate - A function to test each element for a condition.
 * @returns An array that contains the elements from the input array starting at the first element in the linear series that does not pass the test specified by predicate.
 */
export function skipWhile<T>(predicate: Predicate<T>): Operation<T> {
  return function*(source) {
    let found = false;
    let idx = 0;

    for (let item of source) {
      if (found) {
        yield item;
      } else if (predicate(item, idx++)) {
        found = true;
      }
    }
  };
}

/**
 * Returns elements from an array as long as a specified condition is true.
 * @param predicate - A function to test each element for a condition.
 * @returns An array that contains the elements from the input array that occur before the element at which the test no longer passes.
 */
export function takeWhile<T>(predicate: Predicate<T>): Operation<T> {
  return function*(source) {
    let idx = 0;

    for (let item of source) {
      if (!predicate(item, idx++)) {
        break;
      }

      yield item;
    }
  };
}

/**
 * Produces the set union of two arrays by using the default equality comparer.
 * @param other - An array whose distinct elements form the second set for the union.
 * @returns An array that contains the elements from both input arrays, excluding duplicates.
 */
export function union<T, TOther>(other: Enumerable<TOther>): Operation<T, T|TOther> {
  return pipe(concat(other), distinct());
}

/**
 * 
 * @param other 
 * @returns 
 */
export function concat<T, TOther>(other: Enumerable<TOther>): Operation<T, T|TOther> {
  return function*(source) {
    yield* source;
    yield* other;
  };
}

/**
 * Applies a specified function to the corresponding elements of two arrays, producing a array of the results.
 * @param other - The second sequence to merge.
 * @param resultSelector - A function that specifies how to merge the elements from the two arrays.
 * @returns An array that contains merged elements of two input arrays.
 */
export function zip<T, TOther, TResult>(other: Enumerable<TOther>, resultSelector: Result<T, TOther, TResult>): Operation<T, TResult> {
  return function*(source) {
    const e1 = enumerate(source);
    const e2 = enumerate(other);

    while (e1.moveNext() && e2.moveNext()) {
      yield resultSelector(e1.current, e2.current);
    }
  };
}

/**
 * 
 * @param selector 
 * @returns 
 */
export function forEach<T, TResult>(selector: Selector<T, TResult>): Operation<T, TResult> {
  return function*(source) {
    let idx = 0;

    for (let item of source) {
      yield selector(item, idx++);
    }
  };
}

/**
 * Creates a Linq chain which feeds the return value from the previous function into the next function.
 * @param source - Initial array as the beginning of the entire Linq chain.
 * @param func - Functions to run with the return value fo the last function in the chain as the parameter.
 * @returns The result of the last function within the chain.
 */
export function pipe<T, R1>(f1: Pipe<T, R1>): Pipe<Enumerable<T>, R1>;
export function pipe<T, R1, R2>(f1: Pipe<T, R1>, f2: Pipe<R1, R2>): Pipe<T, R2>;
export function pipe<T, R1, R2, R3>(f1: Pipe<T, R1>, f2: Pipe<R1, R2>, f3: Pipe<R2, R3>): Pipe<T, R3>;
export function pipe<T, R1, R2, R3, R4>(f1: Pipe<T, R1>, f2: Pipe<R1, R2>, f3: Pipe<R2, R3>, f4: Pipe<R3, R4>): Pipe<T, R4>;
export function pipe<T, R1, R2, R3, R4, R5>(f1: Pipe<T, R1>, f2: Pipe<R1, R2>, f3: Pipe<R2, R3>, f4: Pipe<R3, R4>, f5: Pipe<R4, R5>): Pipe<T, R5>;
export function pipe<T, R1, R2, R3, R4, R5, R6>(f1: Pipe<T, R1>, f2: Pipe<R1, R2>, f3: Pipe<R2, R3>, f4: Pipe<R3, R4>, f5: Pipe<R4, R5>, f6: Pipe<R5, R6>): Pipe<T, R6>;
export function pipe<T, R1, R2, R3, R4, R5, R6, R7, R8>(f1: Pipe<T, R1>, f2: Pipe<R1, R2>, f3: Pipe<R2, R3>, f4: Pipe<R3, R4>, f5: Pipe<R4, R5>, f6: Pipe<R5, R6>, f7: Pipe<R6, R7>, f8: Pipe<R7, R8>): Pipe<T, R8>;
export function pipe<T, R1, R2, R3, R4, R5, R6, R7, R8, R9>(f1: Pipe<T, R1>, f2: Pipe<R1, R2>, f3: Pipe<R2, R3>, f4: Pipe<R3, R4>, f5: Pipe<R4, R5>, f6: Pipe<R5, R6>, f7: Pipe<R6, R7>, f8: Pipe<R7, R8>, f9: Pipe<R7, R9>): Pipe<T, R9>;
export function pipe<T>(...func: Pipe<T, any>[]): Pipe<T, any> {
  return function*(source) {
    for (let fn of func) {
      yield* fn(source);
    }
  };
}
