import { describe, it, expect } from 'vitest';
import { from } from './from';

describe.concurrent('#from()', () => {
  it('test1', () => {
    const res = [ ...from('hello') ];

    expect(res).toEqual([ 'h', 'e', 'l', 'l', 'o' ]);
  });
  it('test2', () => {
    const res = [ ...from([ 1, true, 'test', {} ]) ];

    expect(res).toEqual([ 1, true, 'test', {} ]);
  });
  it('test2', () => {
    const listLike = {
      '0': true,
      '1': null,
      '2': [ 'hello' ],
      length: 3,
    }
    const res = [ ...from(listLike) ];

    expect(res).toEqual([ true, null, [ 'hello' ]]);
  });
});
