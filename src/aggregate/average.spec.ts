import { describe, it, expect } from 'vitest';
import { average } from './average';

describe.concurrent('#average()', () => {
  const list = ['8', 5, '8', '23'];

  it('test1', () => {
    const res = average()(list);

    expect(res).toEqual(11);
  });
  it('test2', () => {
    const res = average((_, idx) => idx)(list);

    expect(res).toEqual(1.5);
  });
  it('test3', () => {
    const res = average(x => x.toString().length)(list);

    expect(res).toEqual(1.25);
  });
});
