import { describe, it, expect } from 'vitest';
import { cast } from './cast';

describe.concurrent('#cast()', () => {
  it('test1', () => {
    const res = [ ...cast()([]) ];

    expect(res).toEqual([]);
  });
  it('test2', () => {
    const res = [ ...cast()([ '5', '1' ,'9' ]) ];

    expect(res).toEqual([ '5', '1' ,'9' ]);
  });
});
