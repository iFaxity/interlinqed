import { Enumerable, Pipe } from '../core';

/**
 * Creates a Linq chain which feeds the return value from the previous function into the next function.
 * @param ...args - Functions to run with the return value fo the last function in the chain as the parameter.
 * @returns The result of the last function within the chain.
 */
export function linq<T, R1>(source: Enumerable<T>, f1: Pipe<Enumerable<T>, R1>): R1;
export function linq<T, R1, R2>(source: Enumerable<T>, f1: Pipe<Enumerable<T>, R1>, f2: Pipe<R1, R2>): R2;
export function linq<T, R1, R2, R3>(source: Enumerable<T>, f1: Pipe<Enumerable<T>, R1>, f2: Pipe<R1, R2>, f3: Pipe<R2, R3>): R3;
export function linq<T, R1, R2, R3, R4>(source: Enumerable<T>, f1: Pipe<Enumerable<T>, R1>, f2: Pipe<R1, R2>, f3: Pipe<R2, R3>, f4: Pipe<R3, R4>): R4;
export function linq<T, R1, R2, R3, R4, R5>(source: Enumerable<T>, f1: Pipe<Enumerable<T>, R1>, f2: Pipe<R1, R2>, f3: Pipe<R2, R3>, f4: Pipe<R3, R4>, f5: Pipe<R4, R5>): R5;
export function linq<T, R1, R2, R3, R4, R5, R6>(source: Enumerable<T>, f1: Pipe<Enumerable<T>, R1>, f2: Pipe<R1, R2>, f3: Pipe<R2, R3>, f4: Pipe<R3, R4>, f5: Pipe<R4, R5>, f6: Pipe<R5, R6>): R6;
export function linq<T, R1, R2, R3, R4, R5, R6, R7>(source: Enumerable<T>, f1: Pipe<Enumerable<T>, R1>, f2: Pipe<R1, R2>, f3: Pipe<R2, R3>, f4: Pipe<R3, R4>, f5: Pipe<R4, R5>, f6: Pipe<R5, R6>, f7: Pipe<R6, R7>): R7;
export function linq<T, R1, R2, R3, R4, R5, R6, R7, R8>(source: Enumerable<T>, f1: Pipe<Enumerable<T>, R1>, f2: Pipe<R1, R2>, f3: Pipe<R2, R3>, f4: Pipe<R3, R4>, f5: Pipe<R4, R5>, f6: Pipe<R5, R6>, f7: Pipe<R6, R7>, f8: Pipe<R7, R8>): R8;
export function linq<T, R1, R2, R3, R4, R5, R6, R7, R8, R9>(source: Enumerable<T>, f1: Pipe<Enumerable<T>, R1>, f2: Pipe<R1, R2>, f3: Pipe<R2, R3>, f4: Pipe<R3, R4>, f5: Pipe<R4, R5>, f6: Pipe<R5, R6>, f7: Pipe<R6, R7>, f8: Pipe<R7, R8>, f9: Pipe<R7, R9>): R9;
export function linq<T>(source: Enumerable<T>, ...args: Pipe<Enumerable<T>, any>[]): Enumerable<any> {
  return args.reduce((acc, fn) => fn(acc), source);
}
