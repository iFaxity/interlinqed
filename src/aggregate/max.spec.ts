import { describe, it, expect } from 'vitest';
import { max } from './max';

describe.concurrent('#max()', () => {
  it('test1', () => {
    expect(() => max()([])).toThrow();
  });
  it('test2', () => {
    const res = max()([9, 9.2, '3', 8.5]);

    expect(res).toEqual(9.2);
  });
  it('test3', () => {
    const res = max(x => String(x).length)([9, 9.2, '3', 8.5]);

    expect(res).toEqual(3);
  });
  it('test4', () => {
    const res = max()([true, [ 6.7 ], 5]);

    expect(res).toEqual(6.7);
  });
  it('test5', () => {
    const res = max()([1, 5, 8, {}]);

    expect(res).toEqual(8);
  });
});
