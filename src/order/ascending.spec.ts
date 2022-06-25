import { describe, it, assert } from 'vitest';
import { orderBy, thenBy } from './ascending';
import { linq, toArray } from '../index';

const list = [
  { name: 'Frozen yogurt', fat: 6, carbs: 24, prot: 4 },
  { name: 'Ice cream sandwich', fat: 9, carbs: 37, prot: 4.3 },
  { name: 'Eclair', fat: 16, carbs: 24, prot: 6 },
  { name: 'Gingerbread', fat: 16, carbs: 49, prot: 0 },
  { name: 'Jelly bean', fat: 0, carbs: 94, prot: 0 },
];

describe.concurrent('#orderBy()', () => {
  it('test1', () => {
    const res = [ ...orderBy<any>(x => x.fat)(list) ];

    assert.deepEqual(res, [list[4], list[0], list[1], list[2], list[3]]);
  });
});

describe.concurrent('#thenBy()', () => {
  it.todo('todo');
  /*it('test1', () => {
    const res = [ ...thenBy(x => x.fat)(orderBy(x => x.carbs))(list) ];

    assert.deepEqual(res, [list[0], list[2], list[1], list[3], list[4]]);
  });*/
});
