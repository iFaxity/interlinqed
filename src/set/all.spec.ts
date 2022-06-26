import { describe, it, expect } from 'vitest';
import { all } from './all';

describe.concurrent('#all()', () => {
  const list = [ true, '10', -4 ];

  it('test1', () => {
    const res = all(x => x != null)(list);

    expect(res).toBeTruthy();
  });
  it('test2', () => {
    const res = all(Boolean)(list);

    expect(res).toBeTruthy();
  });
  it('test3', () => {
    const res = all(x => typeof x == 'string')(list);

    expect(res).toBeFalsy();
  });
  it('test4', () => {
    const res = all(Array.isArray)(list);

    expect(res).toBeFalsy();
  });
});
