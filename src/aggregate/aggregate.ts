import { Accumulator, Collector, enumerate } from '../core';

/**
 * Applies an accumulator function over an array.
 * @param accumulator - An accumulator function to be invoked on each element.
 * @param seed - The initial accumulator value.
 * @returns The transformed final accumulator value.
 */
export function aggregate<T, TAcc, TRes = any>(accumulator: Accumulator<T, TAcc, TRes>): Collector<T, TRes>;
export function aggregate<T, TAcc, TRes>(seed: TAcc, accumulator: Accumulator<T, TAcc, TRes>): Collector<T, TRes>;
export function aggregate<T, TAcc, TRes>(...args: any[]): Collector<T, TRes> {
  return function(source) {
    let seed: T|TAcc|TRes;
    let accumulator: Accumulator<T, TAcc, TRes>;
    let idx = 0;

    const e = enumerate(source);

    if (args.length >= 2) {
      [ seed, accumulator ] = args;
    } else {
      accumulator = args[0];

      if (e.moveNext()) {
        seed = e.current;

        // TODO: This is right?
        idx += 1;
      }
    }

    while (e.moveNext()) {
      seed = accumulator(seed as TAcc, e.current, idx++);
    }

    return seed as TRes;
  };
}
 
