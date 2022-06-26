import { describe, it, expect } from 'vitest';
import { of } from './of';

describe.concurrent('#of()', () => {
  it('test1', () => {
    const res = [ ...of(-11.5, 10, 80) ];

    expect(res).toEqual([ -11.5, 10, 80 ]);
  });
  it('test2', () => {
    const res = [ ...of([ '1', '2', '3' ], [ 'hi' ], [ 'js', 'ts' ]) ];

    expect(res).toEqual([ [ '1', '2', '3' ], [ 'hi' ], [ 'js', 'ts' ] ]);
  });
  it('test3', () => {
    const res = [ ...of() ];

    expect(res).toEqual([]);
  });
});
