import { assert } from 'chai';
import * as Core from '../../src/core';

//TODO instanceOf check for every method with retval List<?>
describe('Core', () => {
  it('#Range()', () => {
    assert.deepEqual(Core.Range(0, 5), [0, 1, 2, 3, 4]);
    assert.deepEqual(Core.Range(4, 4), [4, 5, 6, 7]);
  });
  it('#Repeat()', () => {
    assert.deepEqual(Core.Repeat(null, 5), [null, null, null, null, null]);
    assert.deepEqual(Core.Repeat('na', 10), ['na', 'na', 'na', 'na', 'na', 'na', 'na', 'na', 'na', 'na']);

    const ref = {};
    assert.deepEqual(Core.Repeat(ref, 3), [ref, ref, ref]);
  });

  it('#Linq()', () => {
     // function chain required
    const res = Core.Linq(['a', 'b', 'c'], x => x);
    assert.deepEqual(res, ['a', 'b', 'c']);
  });

  it('#Contains()', () => {
    const list = [3, false, 'a'];

    assert.isTrue(Core.Contains(list, 3));
    assert.isTrue(Core.Contains(list, 'a'));
    assert.isFalse(Core.Contains(list, 'b'));
  });

  it('#Insert()', () => {
    const list = ['a', 'b', 'd'];

    assert.strictEqual(Core.Insert(list, 2, 'c'), list);
    assert.deepEqual(list, [ 'a', 'b', 'c', 'd' ]);

    Core.Insert(list, 4, 'e');
    assert.deepEqual(list, [ 'a', 'b', 'c', 'd', 'e' ]);

    Core.Insert(list, 6, 'g');
    assert.deepEqual(list, [ 'a', 'b', 'c', 'd', 'e', 'g' ]);
  });

  it('#Remove()', () => {
    const list = ['a', 'b', 'c'];

    assert.isTrue(Core.Remove(list, 'b'));
    assert.deepEqual(list, [ 'a', 'c' ]);

    assert.isFalse(Core.Remove(list, 'f'));
    assert.deepEqual(list, [ 'a', 'c' ]);
  });
  it('#RemoveAt()', () => {
    const list = [true, null, '10', -4];

    Core.RemoveAt(list, 2);
    assert.deepEqual(list, [ true, null, -4 ]);
    Core.RemoveAt(list, 0);
    assert.deepEqual(list, [ null, -4 ]);

    assert.throws(() => Core.RemoveAt(list, -1));
    assert.deepEqual(list, [ null, -4 ]);
    assert.throws(() => Core.RemoveAt(list, 10));
    assert.deepEqual(list, [ null, -4 ]);
  });

  it('#Reverse', () => {
    const list = ['foo', 'bar', 1, 'foo', 'qux', false];
    assert.deepEqual(Core.Reverse(list,), [false, 'qux', 'foo', 1, 'bar', 'foo']);

    const list2 = [];
    assert.isEmpty(Core.Reverse(list2));
  });

  it('#Aggregate()', () => {
    const list = [true, null, '10', -4];
    assert.equal(Core.Aggregate(list, (acc, x) => `${acc}, ${x}`), 'true, null, 10, -4');

    const list2 = [[ 'foo', 1 ], [ 'bar', 2 ], [ 'baz', 3 ]];
    assert.deepEqual(Core.Aggregate(list2, (acc, x) => (acc[x[0]] = x[1], acc), {}), { foo: 1, bar: 2, baz: 3 });
  });

  it('#All()', () => {
    const list = [true, '10', -4];

    assert.isTrue(Core.All(list, x => x != null));
    assert.isTrue(Core.All(list, Boolean));
    assert.isFalse(Core.All(list, x => typeof x == 'string'));
    assert.isFalse(Core.All(list, x => Array.isArray(x)));
  });
  it('#Any()', () => {
    const list = [true, '10', -4];

    assert.isTrue(Core.Any(list));
    assert.isTrue(Core.Any(list, x => typeof x == 'boolean'));
    assert.isTrue(Core.Any(list, x => x === true));
    assert.isFalse(Core.Any(list, x => typeof x == 'object'));
    assert.isFalse(Core.Any(list, x => x == null));

    const list2 = [];
    assert.isFalse(Core.Any(list2));
  });
  it('#Average()', () => {
    const list = ['8', '5', '8', '23'];

    assert.equal(Core.Average(list), 11);
    assert.equal(Core.Average(list, (_, idx) => idx), 1.5);
    assert.equal(Core.Average(list, x => (x.toString()).length), 1.25)
  });

  it('#Count()', () => {
    const list = [];
    assert.equal(Core.Count(list), 0);

    const list2 = ['foo', 'bar', 'baz', 'qux'];
    assert.equal(Core.Count(list2), 4);
    assert.equal(Core.Count(list2, x => x.indexOf('a') != -1), 2);
  });

  it('#DefaultIfEmpty()', () => {
    const ref = {};
    const list = [];

    assert.deepEqual(Core.DefaultIfEmpty(list), [ undefined ]);
    assert.deepEqual(Core.DefaultIfEmpty(list, null), [ null ]);
    assert.deepEqual(Core.DefaultIfEmpty(list, ref), [ ref ]);

    const list2 = ['hello', true, 11, ref];
    assert.deepEqual(Core.DefaultIfEmpty(list2), ['hello', true, 11, ref]);
  });
  it('#Distinct()', () => {
    const list = [2, 5, 6, 2, null, '2', 'null', 'hi', 'hi' ];
    assert.deepEqual(Core.Distinct(list), [ 2, 5, 6, null, '2', 'null', 'hi' ]);

    const list2 = [{}, { id: 2 }, { id: 4, count: 0 }, {}, { id: 2 }, { id: 2, count: 6 }];
    assert.deepEqual(Core.Distinct(list2), [ {}, { id: 2 }, { id: 4, count: 0 }, { id: 2, count: 6 } ]);
  });
  it('#DistinctBy()', () => {
    const list = [2, 5, 6, 2, null, '2', 'null', 'hi', 'hi'];
    const res = Core.DistinctBy(list, x => String(x).length);

    assert.deepEqual(res, [ 2, null, 'hi' ]);

    const list2 = [{}, { id: 2 }, { id: 4, count: 0 }, {}, { id: 2 }, { id: 2, count: 6 }];
    assert.deepEqual(Core.DistinctBy(list2, x => x.id), [ {}, { id: 2 }, { id: 4, count: 0 } ]);
  });

  it('#ElementAt()', () => {
    const list = [5, 6, null];
    assert.equal(Core.ElementAt(list, 0), 5);
    assert.isNull(Core.ElementAt(list, 2));
    assert.isNull(Core.ElementAt(list, 100));
    assert.isNull(Core.ElementAt(list, -2));

    const list2 = [];
    assert.isNull(Core.ElementAt(list2, 0));
    assert.isNull(Core.ElementAt(list2, -10));
    assert.isNull(Core.ElementAt(list2, 4));
  });

  it('#First()', () => {
    const list = ['a', 'b', 'ce'];
    const list2 = [];

    assert.equal(Core.First(list), 'a');
    assert.equal(Core.First(list, x => x.length > 1), 'ce');
    assert.isNull(Core.First(list, () => false));

    assert.isNull(Core.First(list2));
    assert.isNull(Core.First(list2, () => false));
  });

  it('#GroupBy()', () => {});
  it('#GroupJoin()', () => {});

  it('#Join()', () => {});

  it('#Last()', () => {
    const list = ['ab', 'a', 'b', 'c'];
    const list2 = [];

    assert.equal(Core.Last(list), 'c');
    assert.equal(Core.Last(list, x => x.length > 1), 'ab');
    assert.isNull(Core.Last(list, () => false));

    assert.isNull(Core.Last(list2));
    assert.isNull(Core.Last(list2, () => false));
  });

  it('#Max()', () => {
    const list = [];
    assert.equal(Core.Max(list), Number.NEGATIVE_INFINITY);

    const list2 = [9, 9.2, '3', 8.5];
    assert.equal(Core.Max(list2), 9.2);

    const list3 = [true, [ 6.7 ], 5];
    assert.equal(Core.Max(list3), 6.7);

    const list4 = [1, 5, 8, {}];
    assert.isNaN(Core.Max(list4));
  });
  it('#Min()', () => {
    const list = [];
    assert.equal(Core.Min(list), Number.POSITIVE_INFINITY);

    const list2 = [9, 9.2, '3', 8.5];
    assert.equal(Core.Min(list2), 3);

    const list3 = [true, [ 6.7 ], 5];
    assert.equal(Core.Min(list3), 1);

    const list4 = [1, 5, 8, {}];
    assert.isNaN(Core.Min(list4));
  });

  it('#Select()', () => {
    const list = [];
    const res = Core.Select(list, x => x);

    assert.isEmpty(res);

    const list2 = [true, null, 'foobar', 100, {}];
    assert.deepEqual(Core.Select(list2, String), [ 'true', 'null', 'foobar', '100', '[object Object]' ]);
  });
  it('#SelectMany()', () => {
    const list = [];
    assert.isEmpty(Core.SelectMany(list, x => x));

    const list2 = [[ 1, 2, 3 ], [ 4, [ 5, 6 ] ], [ 7, 8, 9 ]];
    assert.deepEqual(Core.SelectMany(list2, x => x), [ 1, 2, 3, 4, [ 5, 6 ], 7, 8, 9 ]);
  });
  it('#Single()', () => {});
  it('#Skip()', () => {});
  it('#SkipLast()', () => {});
  it('#Sum()', () => {
    const list = [];
    const list2 = [1, '7', true, [ -3 ], { valueOf: () => 10 }];

    assert.equal(Core.Sum(list), 0);
    assert.equal(Core.Sum(list2), 16);
    assert.equal(Core.Sum(list2, x => String(x).length), 23);
  });

  it('#Take()', () => {});
  it('#TakeLast()', () => {});
  it('#ToObject()', () => {});

  it('#Where()', () => {
    const list = [];
    assert.isEmpty(Core.Where(list, x => x));

    const list2 = ['a', 10, 'c', false, {}, 'f', []];
    assert.deepEqual(Core.Where(list2, x => typeof x == 'string'), [ 'a', 'c', 'f' ]);
  });
});
