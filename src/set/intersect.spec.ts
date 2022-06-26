import { describe, it, expect } from 'vitest';
import { intersect } from './intersect';

describe.concurrent('#intersect()', () => {
  it('test1', () => {
    const res = [ ...intersect([39, 59, 83, 47, 26, 4, 30])([44, 26, 92, 30, 71, 38]) ];

    expect(res).toEqual([26, 30]);
  });
  it('test1', () => {
    const res = [ ...intersect([{}, false, 'foo', null, 10])([true, 'foo', 6, {}, null]) ];

    expect(res).toEqual(['foo', null]);
  });
  it('test3', () => {
    const res = [ ...intersect([65, 81, 28])([]) ];

    expect(res).toEqual([]);
  });
  it('test4', () => {
    const res = [ ...intersect([55, 26, 37, 89])([]) ];

    expect(res).toEqual([]);
  });
  it('test4', () => {
    const ref = [];
    const ref2 = {};
    const ref3 = Object.create(null);

    const res = [ ...intersect([ref, ref2])([ref3, ref2, ref]) ];

    expect(res).toEqual([ref2, ref]);
  });
});
