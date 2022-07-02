import { describe, it, expect } from 'vitest';
import { toMap } from './toMap';

describe.concurrent('#toMap()', () => {
  it('test1', () => {
    const items = [ 'c', 'a', 'B' ];
    const res = toMap(x => x)(items);
    const entries = [ ...res ];

    expect(res).toBeInstanceOf(Map);

    expect(entries).toEqual([
      [ 'c', 'c' ],
      [ 'a', 'a' ],
      [ 'B', 'B' ],
    ]);
  });
  it('test2', () => {
    const items = [ 'foo', 'bar', 'baz', 'foz' ];
    const res = toMap<any, any>(x => x[2])(items);
    const entries = [ ...res ];

    expect(entries).toEqual([
      [ 'o', 'foo' ],
      [ 'r', 'bar' ],
      [ 'z', 'foz' ],
    ]);
  });
  it('test3', () => {
    const items = [
      { key: 'test', value: 10 },
      { key: true, value: 'hi' },
      { key: 5, value: false },
      { key: 'key', value: null },
      { key: null, value: 'foo' },
    ];
    const res = toMap<any, any, any>(x => x.key, x => x.value)(items);
    const entries = [ ...res ];

    expect(entries).toEqual([
      [ 'test', 10 ],
      [ true, 'hi' ],
      [ 5, false ],
      [ 'key', null ],
      [ null, 'foo' ],
    ]);
  });
});
