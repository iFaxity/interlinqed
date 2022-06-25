import { describe, it, expect } from 'vitest';
import { skipWhile } from './skipWhile';

describe.concurrent('#skipWhile()', () => {
  const grades = [ 59, 82, 70, 56, 92, 98, 85 ];

  it('test1', () => {
    const res = [ ...skipWhile(grade => grade < 85)(grades) ];

    expect(res).toEqual([ 92, 98, 85 ]);
  });
  it('test2', () => {
    const res = [ ...skipWhile(() => false)(grades) ];

    expect(res).toEqual([ 59, 82, 70, 56, 92, 98, 85 ]);
  });
  it('test3', () => {
    const res = [ ...skipWhile(grade => grade > 10)(grades) ];

    expect(res).toEqual([]);
  });
  it('test4', () => {
    const res = [ ...skipWhile(() => true)([]) ];

    expect(res).toEqual([]);
  });
});
