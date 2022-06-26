import { describe, it, expect } from 'vitest';
import { aggregate } from './aggregate';

describe.concurrent('#aggregate()', () => {
  it('test1', () => {
    const list = [true, null, '10', -4];
    const res = aggregate((acc, x) => `${acc}, ${x}`)(list);

    expect(res, 'true, null, 10, -4');
  });
  it('test2', () => {
    const list = [[ 'foo', 1 ], [ 'bar', 2 ], [ 'baz', 3 ]];
    const res = aggregate({}, (acc, x) => (acc[x[0]] = x[1], acc))(list);

    expect(res).toEqual({ foo: 1, bar: 2, baz: 3 });
  });
});
