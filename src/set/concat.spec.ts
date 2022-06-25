import { describe, it, expect } from 'vitest';
import { concat } from './concat'

describe.concurrent('#concat()', () => {
  it('test1', () => {
    const res = [ ...concat([ false, 100, 'hello', null ])([ 'hello', true ]) ];

    expect(res).toEqual([ 'hello', true, false, 100, 'hello', null ]);
  });
  it('test2', () => {
    const res = [ ...concat([])([ 'hello', true ]) ];

    expect(res).toEqual([ 'hello', true ]);
  });
  it('test3', () => {
    const res = [ ...concat([ false, 100, 'hello', null ])([]) ];

    expect(res).toEqual([ false, 100, 'hello', null ]);
  });
});
