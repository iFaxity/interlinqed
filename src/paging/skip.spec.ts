import { describe, it, expect } from 'vitest';
import { skip } from './skip';

describe.concurrent('#skip()', () => {
  const grades = [59, 82, 70, 56, 92, 98, 85];

  it('test1', () => {
    const res = [ ...skip(2)(grades) ];

    expect(res).toEqual([70, 56, 92, 98, 85]);
  });
  it('test2', () => {
    const res = [ ...skip(50)(grades) ];

    expect(res).toEqual([]);
  });
  it('test3', () => {
    const res = [ ...skip(2)([]) ];

    expect(res).toEqual([]);
  });
  it('test4', () => {
    const res = [ ...skip(0)(grades) ];

    expect(res).toEqual([59, 82, 70, 56, 92, 98, 85]);
  });
  it('test5', () => {
    expect(() => skip(-1)(grades)).toThrow();
  });
});
