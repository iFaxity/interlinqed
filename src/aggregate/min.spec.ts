import { describe, it, expect } from 'vitest';
import { min } from './min';

describe.concurrent('#min()', () => {
  it('test1', () => {
    expect(() => min()([])).toThrow();
  });
  it('test2', () => {
    const res = min()([9, 9.2, '3', 8.5]);

    expect(res).toEqual(3);
  });
  it('test3', () => {
    const res = min(x => String(x).length)([9, 9.2, '3', 8.5]);

    expect(res).toEqual(1);
  });
  it('test4', () => {
    const res = min()([true, [ 6.7 ], 5]);

    expect(res).toEqual(1);
  });
  it('test5', () => {
    const res = min()([1, 5, 8, {}]);

    expect(res).toEqual(1);
  });
});
