import { describe, it, expect } from 'vitest';
import { where } from './where';

describe.concurrent('#where()', () => {
  it('test1', () => {
    const res = [ ...where<any>(x => x)([]) ];

    expect(res).toEqual([]);
  });
  it('test2', () => {
    const list = ['a', 10, 'c', false, {}, 'f', []];
    const res = [ ...where<any>(x => typeof x == 'string')(list) ];

    expect(res).toEqual([ 'a', 'c', 'f' ]);
  });
});
