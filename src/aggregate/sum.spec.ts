import { describe, it, expect } from 'vitest';
import { sum } from './sum';

describe.concurrent('#sum()', () => {
  const list = [1, '7', true, [ -3 ], { valueOf: () => 10 }];

  it('test1', () => {
    const res = sum()([]);

    expect(res).toEqual(0);
  });
  it('test2', () => {
    const res = sum()(list);

    expect(res).toEqual(16);
  });
  it('test3', () => {
    const res = sum(x => String(x).length)(list);

    expect(res).toEqual(23);
  });
});
