import { describe, it, expect } from 'vitest';
import { takeLast } from './takeLast';

describe.concurrent('#takeLast()', () => {
  const grades = [59, 82, 70, 56, 92, 98, 85];

  it('test1', () => {
    const res = [ ...takeLast(5)(grades) ];

    expect(res).toEqual([70, 56, 92, 98, 85]);
  });
  it('test2', () => {
    const res = [ ...takeLast(123)(grades) ];

    expect(res).toEqual([59, 82, 70, 56, 92, 98, 85]);
  });
  it('test3', () => {
    const res = [ ...takeLast(4)([]) ];

    expect(res).toEqual([]);
  });
  it('test4', () => {
    const res = [ ...takeLast(0)([]) ];

    expect(res).toEqual([]);
  });
  it('test5', () => {
    expect(() => takeLast(-1)(grades)).toThrow();
  });
});
