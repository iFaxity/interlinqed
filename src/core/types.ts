export type KeyTypes = string|number|symbol;
export type Key<T = unknown, TReturn = KeyTypes> = (key: T) => TReturn;

export type ComparisonKey<T = unknown, TReturn = ComparisonKeyTypes> = (key: T) => TReturn;
export type ComparisonKeyTypes = number|string|boolean|BigInt|null|undefined|unknown;
export type Comparison<T = unknown> = (a: T, b: T) => number;

export type Enumerable<T = unknown> = Iterable<T>;

export interface Pipe<T = unknown, TRes = unknown> {
  (iter: T): TRes;
}
export type Operation<T = unknown, TRes = T> = Pipe<Enumerable<T>, Enumerable<TRes>>;
export type Collector<T = unknown, TRes = unknown> = Pipe<Enumerable<T>, TRes>;
type t = Generator

export interface Predicate<T = unknown> {
  (value: T, index?: number): boolean
}

export type Accumulator<T, TAcc, TResult = unknown> = (acc: TAcc, value: T, index: number) => TResult;
export type Result<T, TOther, TResult> = (a: T, b: TOther) => TResult;
export type Selector<T, TResult> = (element: T, index: number) => TResult;
export type Action<T> = (element: T, index: number) => void;
export type Constructor<T = unknown> = { new (...args: unknown[]): T & object } | { (): T };
export type ConstructorType<T = unknown> = T extends Constructor<infer TValue> ? TValue : never;

export interface OrderedEnumerable<T> extends Enumerable<T> {
  comparers: Comparison<T>[];
}

export interface Grouping<TKey, TElement> extends Array<TElement> {
  key: TKey;
}

