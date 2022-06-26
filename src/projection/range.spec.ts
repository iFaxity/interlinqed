import { describe, it, expect } from 'vitest';
import { range } from './range';

describe.concurrent('#range()', () => {
  it('test1', () => {
    const res = [ ...range(0, 5) ];

    expect(res).toEqual([0, 1, 2, 3, 4]);
  });

  it('test2', () => {
    const res = [ ...range(4, 4) ];
    expect(res).toEqual([4, 5, 6, 7]);
  });

  it('test3', () => {
    const res = [ ...range(3) ];
    expect(res).toEqual([0, 1, 2]);
  });

  it('test4', () => {
    const res = [ ...range(5, -2) ];
    expect(res).toEqual([]);
  });
});
