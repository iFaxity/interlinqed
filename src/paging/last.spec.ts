import { describe, it, expect } from 'vitest';
import { last } from './last';

describe.concurrent('#last()', () => {
  const list = ['ab', 'a', 'b', 'c'];
  const list2 = [];

  it('test1', () => {
    const res = last()(list);

    expect(res).toEqual('c');
  });
  it('test2', () => {
    const res = last<string>(x => x.length > 1)(list);

    expect(res).toEqual('ab');
  });
  it('test3', () => {
    const res = last<string>(() => false)(list);

    expect(res).toBeNull();
  });
  it('test4', () => {
    const res = last<string>()(list2);

    expect(res).toBeNull();
  });
  it('test5', () => {
    const res = last<string>(() => true)(list2);

    expect(res).toBeNull();
  });
});
