import { describe, it, expect } from 'vitest';
import { count } from './count';

describe.concurrent('#count()', () => {
  const list = ['foo', 'bar', 'baz', 'qux'];

  it('test1', () => {
    const res = count()(list);

    expect(res).toEqual(4);
  });
  it('test2', () => {
    const res = count<string>(x => x.includes('a'))(list);

    expect(res).toEqual(2);
  });
  it('test3', () => {
    const emptyList = [];
    const res = count()(emptyList);

    expect(res).toEqual(0);
  });
});
