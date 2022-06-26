import { describe, it, expect } from 'vitest';
import { distinct } from './distinct';

describe.concurrent('#distinct()', () => {
  it('test1', () => {
    const list = [2, 5, 6, 2, null, '2', 'null', 'hi', 'hi' ];
    const res = [ ...distinct()(list) ];

    expect(res).toEqual([ 2, 5, 6, null, '2', 'null', 'hi' ]);
  });
  it('test2', () => {
    const list = [{}, { id: 2 }, { id: 4, count: 0 }, {}, { id: 2 }, { id: 2, count: 6 }];
    const res = [ ...distinct()(list) ];

    expect(res).toEqual([ {}, { id: 2 }, { id: 4, count: 0 }, { id: 2, count: 6 } ]);
  });
});
