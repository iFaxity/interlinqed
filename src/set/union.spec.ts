import { describe, it, expect } from 'vitest';
import { union } from './union';

describe.concurrent('#union()', () => {
  const ints1 = [ 5, 3, 9, 7, 5, 9, 3, 7 ];
  const ints2 = [ 8, 3, 6, 4, 4, 9, 1, 0 ];
  const ints3 = [ 8, 3, 6, 4, 9, 1, 0 ];
  const ints4 = [ 5, 3, 9, 7 ];

  it('test1', () => {
    const res = [ ...union(ints2)(ints1) ];

    expect(res).toEqual([ 5, 3, 9, 7, 8, 6, 4, 1, 0 ]);
  });
  it('test2', () => {
    const res = [ ...union([])(ints3) ];

    expect(res).toEqual([ 8, 3, 6, 4, 9, 1, 0 ]);
  });
  it('test3', () => {
    const res = [ ...union(ints1)([]) ];

    expect(res).toEqual([ 5, 3, 9, 7 ]);
  });
  it('test4', () => {
    const res = [ ...union(ints4)([]) ];

    expect(res).toEqual([ 5, 3, 9, 7 ]);
  });
  it('test5', () => {
    const res = [ ...union([])([]) ];

    expect(res).toEqual([]);
  });
});
