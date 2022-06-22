import { Pipe, Enumerable } from '../core';

/**
 * Creates a Linq chain which feeds the return value from the previous function into the next function.
 * @param ...args - Functions to run with the return value fo the last function in the chain as the parameter.
 * @returns The result of the last function within the chain.
 */
export function pipe<T, R1>(f1: Pipe<Enumerable<T>, R1>): Pipe<Enumerable<T>, R1>;
export function pipe<T, R1, R2>(f1: Pipe<Enumerable<T>, R1>, f2: Pipe<R1, R2>): Pipe<Enumerable<T>, R2>;
export function pipe<T, R1, R2, R3>(f1: Pipe<Enumerable<T>, R1>, f2: Pipe<R1, R2>, f3: Pipe<R2, R3>): Pipe<Enumerable<T>, R3>;
export function pipe<T, R1, R2, R3, R4>(f1: Pipe<Enumerable<T>, R1>, f2: Pipe<R1, R2>, f3: Pipe<R2, R3>, f4: Pipe<R3, R4>): Pipe<Enumerable<T>, R4>;
export function pipe<T, R1, R2, R3, R4, R5>(f1: Pipe<Enumerable<T>, R1>, f2: Pipe<R1, R2>, f3: Pipe<R2, R3>, f4: Pipe<R3, R4>, f5: Pipe<R4, R5>): Pipe<Enumerable<T>, R5>;
export function pipe<T, R1, R2, R3, R4, R5, R6>(f1: Pipe<Enumerable<T>, R1>, f2: Pipe<R1, R2>, f3: Pipe<R2, R3>, f4: Pipe<R3, R4>, f5: Pipe<R4, R5>, f6: Pipe<R5, R6>): Pipe<Enumerable<T>, R6>;
export function pipe<T, R1, R2, R3, R4, R5, R6, R7>(f1: Pipe<Enumerable<T>, R1>, f2: Pipe<R1, R2>, f3: Pipe<R2, R3>, f4: Pipe<R3, R4>, f5: Pipe<R4, R5>, f6: Pipe<R5, R6>, f7: Pipe<R6, R7>): Pipe<Enumerable<T>, R7>;
export function pipe<T, R1, R2, R3, R4, R5, R6, R7, R8>(f1: Pipe<Enumerable<T>, R1>, f2: Pipe<R1, R2>, f3: Pipe<R2, R3>, f4: Pipe<R3, R4>, f5: Pipe<R4, R5>, f6: Pipe<R5, R6>, f7: Pipe<R6, R7>, f8: Pipe<R7, R8>): Pipe<Enumerable<T>, R8>;
export function pipe<T, R1, R2, R3, R4, R5, R6, R7, R8, R9>(f1: Pipe<Enumerable<T>, R1>, f2: Pipe<R1, R2>, f3: Pipe<R2, R3>, f4: Pipe<R3, R4>, f5: Pipe<R4, R5>, f6: Pipe<R5, R6>, f7: Pipe<R6, R7>, f8: Pipe<R7, R8>, f9: Pipe<R7, R9>): Pipe<Enumerable<T>, R9>;
export function pipe<T>(...args: Pipe<Enumerable<T>, any>[]): Pipe<Enumerable<T>, any> {
  return (source) => args.reduce((acc, fn) => fn(acc), source);
}
