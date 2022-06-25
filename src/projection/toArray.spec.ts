import { describe, it, expect } from 'vitest';
import { toArray } from './toArray';

describe.concurrent('#toArray()', () => {
  it('test1', () =>{
    const res = toArray()([  ]);

    expect(res).toEqual([  ]);
  });
  it('test2', () => {
    function* iter() {
      yield 1;
      yield 10.6;
      yield 'true';
    }
    const res = toArray()(iter());

    expect(res).toEqual([ 1, 10.6, 'true' ]);
  });
  it('test3', () => {
    const res = toArray(x => x[2])([ 'abc', 'def', 'ghj', 'kl' ]);

    expect(res).toEqual([ 'c', 'f', 'j', undefined ]);
  });
  it('test4', () =>{
    const res = toArray()([]);

    expect(res).toEqual([]);
  });
});
