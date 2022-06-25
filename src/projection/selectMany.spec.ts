import { describe, it, expect } from 'vitest';
import { selectMany } from './selectMany';

describe.concurrent('#selectMany()', () => {
  it('test1', () => {
    const res = [ ...selectMany(x => x)([]) ];

    expect(res).toEqual([]);
  });
  it('test2', () => {
    const res = [ ...selectMany(x => x)([[ 1, 2, 3 ], [ 4, [ 5, 6 ] ], [ 7, 8, 9 ]]) ];

    expect(res).toEqual([ 1, 2, 3, 4, [ 5, 6 ], 7, 8, 9 ]);
  });
});
