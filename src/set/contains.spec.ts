import { describe, it, expect } from 'vitest';
import { contains } from './contains';

describe.concurrent('#contains()', () => {
  const list = [3, false, 'a'];

  it('test1', () => {
    const res = contains<unknown>(3)(list);
    expect(res).toBeTruthy();
  });
  it('test2', () => {
    const res = contains<unknown>('a')(list);
    expect(res).toBeTruthy();
  });
  it('test3', () => {
    const res = contains<unknown>('b')(list);
    expect(res).toBeFalsy();
  });
  it('test4', () => {
    const res = contains<unknown>('3')(list);
    expect(res).toBeFalsy();
  });
  it('test5', () => {
    const res = contains<unknown>('false')(list);
    expect(res).toBeFalsy();
  });
});
