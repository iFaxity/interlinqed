import { describe, it, expect } from 'vitest';
import { take } from './take';

describe.concurrent('#take()', () => {
  const grades = [59, 82, 70, 56, 92, 98, 85];

  it('test1', () => {
    const res = [ ...take(4)(grades) ];

    expect(res).toEqual([59, 82, 70, 56]);
  });
  it('test2', () => {
    const res = [ ...take(500)(grades) ];

    expect(res).toEqual([59, 82, 70, 56, 92, 98, 85]);
  });
  it('test3', () => {
    const res = [ ...take(2)([]) ];

    expect(res).toEqual([]);
  });
  it('test4', () => {
    const res = [ ...take(0)(grades) ];

    expect(res).toEqual([]);
  });
  it('test5', () => {
    expect(() => take(-2)(grades)).toThrow();
  });
});
