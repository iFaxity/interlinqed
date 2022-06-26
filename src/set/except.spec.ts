import { describe, it, expect } from 'vitest';
import { except } from './except';

describe.concurrent('#except()', () => {
  const numbers1 = [ 2.0, 2, 2.1, 2.2, 2.3, 2.3, 2.4, 2.5 ];
  const numbers2 = [ 2.2 ];

  it('test1', () => {
    const res = [ ...except(numbers2)(numbers1) ];

    expect(res).toEqual([ 2.0, 2, 2.1, 2.3, 2.3, 2.4, 2.5 ]);
  });
  it('test2', () => {
    const res = [ ...except([])(numbers1) ];

    expect(res).toEqual([ 2.0, 2, 2.1, 2.2, 2.3, 2.3, 2.4, 2.5 ]);
  });
  it('test3', () => {
    const res = [ ...except(numbers1)(numbers2) ];

    expect(res).toEqual([]);
  });
  it('test4', () => {
    const res = [ ...except(numbers1)([]) ];

    expect(res).toEqual([]);
  });
});
