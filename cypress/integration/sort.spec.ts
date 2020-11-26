import { assert } from 'chai';
import { OrderBy, OrderByDescending, ThenBy, ThenByDescending } from '../../src';

describe('Sorting functions', () => {
  const list = [
    { name: 'Frozen yogurt', fat: 6, carbs: 24, prot: 4 },
    { name: 'Ice cream sandwich', fat: 9, carbs: 37, prot: 4.3 },
    { name: 'Eclair', fat: 16, carbs: 24, prot: 6 },
    { name: 'Gingerbread', fat: 16, carbs: 49, prot: 0 },
    { name: 'Jelly bean', fat: 0, carbs: 94, prot: 0 },
  ];

  it('#OrderBy()', () => {
    const res = OrderBy(list, x => x.fat);
    assert.deepEqual(res, [list[4], list[0], list[1], list[2], list[3]]);
  });

  it('#OrderByDescending()', () => {
    const res = OrderByDescending(list, x => x.prot);

    assert.deepEqual(res, [list[2], list[1], list[0], list[3], list[4]]);
  });

  it('#ThenBy()', () => {
    const res = OrderBy(list, x => x.carbs,
      ThenBy(x => x.fat)
    );

    assert.deepEqual(res, [list[0], list[2], list[1], list[3], list[4]]);
  });

  it('#ThenByDescending()', () => {
    const res = OrderBy(list, x => Math.floor(x.prot),
      ThenByDescending(x => x.carbs)
    );

    assert.deepEqual(res, [list[4], list[3], list[1], list[0], list[2]]);
  });
});
