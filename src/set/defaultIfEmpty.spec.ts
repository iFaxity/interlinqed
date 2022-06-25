import { describe, it, expect } from 'vitest';
import { defaultIfEmpty } from './defaultIfEmpty';

describe.concurrent('#defaultIfEmpty()', () => {
  const ref = {};
  const list = [];

  it('test1', () => {
    const res = [ ...defaultIfEmpty()(list) ];

    expect(res).toEqual([ undefined ]);
  });
  it('test2', () => {
    const res = [ ...defaultIfEmpty(null)(list) ];

    expect(res).toEqual([ null ]);
  });
  it('test3', () => {
    const res = [ ...defaultIfEmpty(ref)(list) ];

    expect(res).toEqual([ ref ]);
  });
  it('test4', () => {
    const list2 = ['hello', true, 11, ref];
    const res = [ ...defaultIfEmpty()(list2) ];

    expect(res).toEqual(['hello', true, 11, ref]);
  });
});
