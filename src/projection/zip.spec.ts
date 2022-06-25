import { describe, it, expect } from 'vitest';
import { zip } from './zip';

describe.concurrent('#zip()', () => {
  it('test1', () => {
    const numbers = [ 1, 2, 3, 4 ];
    const words = [ 'one', 'two', 'three' ];

    const res = [ ...zip(words, (first, second) => `${first} ${second}`)(numbers) ];
    expect(res).toEqual([ '1 one', '2 two', '3 three' ]);
  });
  it('test2', () => {
    const numbers = [ 1, 2, 3, 4, 4, 5 ];
    const words = [ 'one', 'two', 'three', 'four' ];

    const res = [ ...zip(numbers, (first, second) => `${first} ${second}`)(words) ];
    expect(res).toEqual([ 'one 1', 'two 2', 'three 3', 'four 4' ]);
  });
  it('test3', () => {
    const numbers = [ 1, 2, 3 ];
    const words = [];

    const res = [ ...zip(words, (first, second) => `${first} ${second}`)(numbers) ];
    expect(res).toEqual([]);
  });
  it('test4', () => {
    const numbers = [];
    const words = [];

    const res = [ ...zip(words, (first, second) => `${first} ${second}`)(numbers) ];
    expect(res).toEqual([]);
  });
});
