import { assert } from 'chai';
import { Linq, OrderBy, OrderByDescending, ThenBy, ThenByDescending } from '../../src';

describe('Sorting functions', () => {
  const list = [
    { name: 'Frozen yogurt', fat: 6, carbs: 24, prot: 4 },
    { name: 'Ice cream sandwich', fat: 9, carbs: 37, prot: 4.3 },
    { name: 'Eclair', fat: 16, carbs: 24, prot: 6 },
    { name: 'Gingerbread', fat: 16, carbs: 49, prot: 0 },
    { name: 'Jelly bean', fat: 0, carbs: 94, prot: 0 },
  ];

  it('#OrderBy()', () => {
    const res = Linq(list,
      chain => OrderBy(chain, x => x.fat)
    );
    assert.deepEqual(res.map(x => x.name), ['Jelly bean', 'Frozen yogurt', 'Ice cream sandwich', 'Eclair', 'Gingerbread']);
  });

  it('#OrderByDescending()', () => {
    const res = Linq(list,
      chain => OrderByDescending(chain, x => x.prot)
    );

    assert.deepEqual(res.map(x => x.name), ['Eclair', 'Ice cream sandwich', 'Frozen yogurt', 'Gingerbread', 'Jelly bean']);
  });

  it('#ThenBy()', () => {
    const res = Linq(list,
      chain => OrderBy(chain, x => x.carbs),
      chain => ThenBy(chain, x => x.fat)
    );

    assert.deepEqual(res.map(x => x.name), ['Frozen yogurt', 'Eclair', 'Ice cream sandwich', 'Gingerbread', 'Jelly bean']);
  });

  it('#ThenByDescending()', () => {
    const res = Linq(list,
      chain => OrderBy(chain, x => Math.floor(x.prot)),
      chain => ThenByDescending(chain, x => x.carbs)
    );

    assert.deepEqual(res.map(x => x.name), ['Jelly bean', 'Gingerbread', 'Ice cream sandwich', 'Frozen yogurt', 'Eclair']);
  });
});
