import { describe, it, expect } from 'vitest';
import { takeWhile } from './takeWhile';

describe.concurrent('#takeWhile()', () => {
  const grades = [ 59, 82, 70, 56, 92, 98, 85 ];

  it('test1', () => {
    const res = [ ...takeWhile(grade => grade < 60)(grades) ];

    expect(res).toEqual([ 59 ]);
  });
  it('test2', () => {
    const res = [ ...takeWhile(grade => grade > 80)(grades) ];

    expect(res).toEqual([]);
  });
  it('test3', () => {
    const res = [ ...takeWhile(grade => grade < 100)(grades) ];

    expect(res).toEqual([ 59, 82, 70, 56, 92, 98, 85 ]);
  });
  it('test4', () => {
    const res = [ ...takeWhile(x => false)(grades) ];

    expect(res).toEqual([]);
  });
});
