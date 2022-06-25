import { describe, it, expect } from 'vitest';
import { skipLast } from './skipLast';

describe.concurrent('#skipLast()', () => {
  const grades = [59, 82, 70, 56, 92, 98, 85];

  it('test1', () => {
    const res = [ ...skipLast(5)(grades) ];

    expect(res).toEqual([59, 82]);
  });
  it('test2', () => {
    const res = [ ...skipLast(34)(grades) ];

    expect(res).toEqual([]);
  });
  it('test3', () => {
    const res = [ ...skipLast(7)(grades) ];

    expect(res).toEqual([]);
  });
  it('test4', () => {
    const res = [ ...skipLast(0)(grades) ];

    expect(res).toEqual([59, 82, 70, 56, 92, 98, 85]);
  });
  it('test5', () => {
    expect(() => skipLast(-1)(grades)).toThrow();
  });
});
