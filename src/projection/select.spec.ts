import { describe, it, expect } from 'vitest';
import { select } from './select';

describe.concurrent('#select()', () => {
  it('test1', () => {
    const res = [ ...select(x => x)([]) ];

    expect(res).toEqual([]);
  });
  it('test2', () => {
    const list = [true, null, 'foobar', 100, {}];
    const res = [ ...select(String)(list) ];

    expect(res).toEqual([ 'true', 'null', 'foobar', '100', '[object Object]' ]);
  });
});
