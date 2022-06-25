import { describe, it, expect } from 'vitest';
import { any } from './any';

describe.concurrent('#any()', () => {
  const list = [true, '10', -4];

  it('test1', () => {
    const res = any()(list);

    expect(res).toBeTruthy();
  });
  it('test2', () => {
    const res = any(x => typeof x == 'boolean')(list);

    expect(res).toBeTruthy();
  });
  it('test3', () => {
    const res = any(x => x === true)(list);

    expect(res).toBeTruthy();
  });
  it('test4', () => {
    const res = any(x => typeof x == 'object')(list);

    expect(res).toBeFalsy();
  });
  it('test5', () => {
    const res = any(x => x == null)(list);

    expect(res).toBeFalsy();
  });
  it('test6', () => {
    const emptyList = [];
    const res = any()(emptyList);

    expect(res).toBeFalsy();
  });
});
