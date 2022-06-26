import { describe, it, expect } from 'vitest';
import { repeat } from './repeat';

describe.concurrent('#repeat()', () => {
  it('test1', () => {
    const res = [ ...repeat(null, 5) ];
    expect(res).toEqual([null, null, null, null, null]);
  });
  it('test2', () => {
    const res = [ ...repeat('na', 10) ];
    expect(res).toEqual(['na', 'na', 'na', 'na', 'na', 'na', 'na', 'na', 'na', 'na']);
  });
  it('test3', () => {
    const ref = {};

    const res = [ ...repeat(ref, 3) ];
    expect(res).toEqual([ref, ref, ref]);
  });
});
