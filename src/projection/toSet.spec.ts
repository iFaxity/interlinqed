import { describe, it, expect } from 'vitest';
import { toSet } from './toSet';

describe.concurrent('#toSet()', () => {
  it('test1', () =>{
    const res = [ ...toSet(x => x)([]) ];

    expect(res).toEqual([]);
  });
  it('test2', () => {
    function* iter() {
      yield 1;
      yield 10.6;
      yield 'true';
    }
    const res = [ ...toSet(x => x)(iter()) ];

    expect(res).toEqual([ 1, 10.6, 'true' ]);
  });
  it('test3', () => {
    const res = [ ...toSet<any, any>(x => x[2])([ 'abc', 'def', 'ghj', 'kl' ]) ];

    expect(res).toEqual([ 'c', 'f', 'j', undefined ]);
  });
});
