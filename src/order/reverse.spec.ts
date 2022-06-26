import { describe, it, expect } from 'vitest';
import { reverse } from './reverse';

describe.concurrent('#reverse()', () => {
  it('test1', () => {
    const list = ['foo', 'bar', 1, 'foo', 'qux', false];
    const res = [ ...reverse()(list) ];

    expect(res).toEqual([false, 'qux', 'foo', 1, 'bar', 'foo']);
  });
  it('test2', () => {
    const list = [];
    const res = [ ...reverse()(list) ];

    expect(res).toEqual([]);
  });
});
