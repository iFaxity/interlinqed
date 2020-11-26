import { assert } from 'chai';
import * as Core from '../../src/core';

// Asserts that 2 objects are deeply equal, but not strictly equal
function strictDeepEqual(actual: any, expected: any): void {
  assert.deepEqual(actual, expected);
  assert.notStrictEqual(actual, expected);
}

//TODO instanceOf check for every method with retval List<?>
describe('Core', () => {
  describe('#Range()', () => {
    it('test1', () => {
      assert.deepEqual(Core.Range(0, 5), [0, 1, 2, 3, 4]);
    });
    it('test2', () => {
      assert.deepEqual(Core.Range(4, 4), [4, 5, 6, 7]);
    });
  });
  describe('#Repeat()', () => {
    const ref = {};

    it('test1', () => {
      assert.deepEqual(Core.Repeat(null, 5), [null, null, null, null, null]);
    });
    it('test2', () => {
      assert.deepEqual(Core.Repeat('na', 10), ['na', 'na', 'na', 'na', 'na', 'na', 'na', 'na', 'na', 'na']);
    });
    it('test3', () => {
      assert.deepEqual(Core.Repeat(ref, 3), [ref, ref, ref]);
    });
  });

  it('#Linq()', () => {
     // function chain required
    const res = Core.Linq(['a', 'b', 'c'], x => x);
    assert.deepEqual(res, ['a', 'b', 'c']);
  });

  describe('#Contains()', () => {
    const list = [3, false, 'a'];

    it('test1', () => assert.isTrue(Core.Contains(list, 3)));
    it('test2', () => assert.isTrue(Core.Contains(list, 'a')));
    it('test3', () => assert.isFalse(Core.Contains(list, 'b')));
  });

  describe('#Insert()', () => {
    const list = ['a', 'b', 'd'];

    it('test1', () => {
      Core.Insert(list, 2, 'c');
      assert.deepEqual(list, [ 'a', 'b', 'c', 'd' ]);
    });
    it('test2', () => {
      Core.Insert(list, 4, 'e');
      assert.deepEqual(list, [ 'a', 'b', 'c', 'd', 'e' ]);
    });
    it('test3', () => {
      Core.Insert(list, 6, 'g');
      assert.deepEqual(list, [ 'a', 'b', 'c', 'd', 'e', 'g' ]);
    });
  });

  describe('#Remove()', () => {
    const list = ['a', 'b', 'c'];

    it('test1', () => {
      assert.isTrue(Core.Remove(list, 'b'));
      assert.deepEqual(list, [ 'a', 'c' ]);
    });
    it('test2', () => {
      assert.isFalse(Core.Remove(list, 'f'));
      assert.deepEqual(list, [ 'a', 'c' ]);
    });
  });
  describe('#RemoveAt()', () => {
    const list = [true, null, '10', -4];

    it('test', () => {
      Core.RemoveAt(list, 2);
      assert.deepEqual(list, [ true, null, -4 ]);
    });
    it('test2', () => {
      Core.RemoveAt(list, 0);
      assert.deepEqual(list, [ null, -4 ]);
    });
    it('test3', () => {
      assert.throws(() => Core.RemoveAt(list, -1));
      assert.deepEqual(list, [ null, -4 ]);
    });
    it('test4', () => {
      assert.throws(() => Core.RemoveAt(list, 10));
      assert.deepEqual(list, [ null, -4 ]);
    });
  });

  describe('#Reverse', () => {
    it('test1', () => {
      const list = ['foo', 'bar', 1, 'foo', 'qux', false];
      Core.Reverse(list);

      assert.deepEqual(list, [false, 'qux', 'foo', 1, 'bar', 'foo']);
    });
    it('test2', () => {
      const list = [];
      Core.Reverse(list);

      assert.isEmpty(list);
    });
    it('test3', () => {
      const list = ['foo', 'bar', 1, 'foo', 'qux', false];
      Core.Reverse(list, 2, 3);

      assert.deepEqual(list, ['foo', 'bar', 'qux', 'foo', 1, false]);
    });
    it('test4', () => {
      const list = ['foo', 'bar', 1, 'foo', 'qux', false];

      Core.Reverse(list, 4, 100);
      assert.deepEqual(list, ['foo', 'bar', 1, 'foo', false, 'qux']);
    });
    it('test5', () => {
      const list = ['foo', 'bar', 1, 'foo', 'qux', false];

      Core.Reverse(list, 50, 2);
      assert.deepEqual(list, ['foo', 'bar', 1, 'foo', 'qux', false]);
    });
    it('test7', () => {
      const list = ['foo', 'bar', 1, 'foo', 'qux', false];

      assert.throws(() => Core.Reverse(list, -5, 5));
      assert.throws(() => Core.Reverse(list, 1, -5));
    });
  });

  describe('#Aggregate()', () => {
    it('test1', () => {
      const list = [true, null, '10', -4];
      assert.equal(Core.Aggregate(list, (acc, x) => `${acc}, ${x}`), 'true, null, 10, -4');
    });
    it('test2', () => {
      const list = [[ 'foo', 1 ], [ 'bar', 2 ], [ 'baz', 3 ]];
      assert.deepEqual(Core.Aggregate(list, {}, (acc, x) => (acc[x[0]] = x[1], acc)), { foo: 1, bar: 2, baz: 3 });
    });
  });

  describe('#All()', () => {
    const list = [true, '10', -4];

    it('test1', () => {
      assert.isTrue(Core.All(list, x => x != null));
    });
    it('test2', () => {
      assert.isTrue(Core.All(list, Boolean));
    });
    it('test3', () => {
      assert.isFalse(Core.All(list, x => typeof x == 'string'));
    });
    it('test4', () => {
      assert.isFalse(Core.All(list, x => Array.isArray(x)));
    });
  });
  describe('#Any()', () => {
    const list = [true, '10', -4];

    it('test1', () => {
      assert.isTrue(Core.Any(list));
    });
    it('test2', () => {
      assert.isTrue(Core.Any(list, x => typeof x == 'boolean'));
    });
    it('test3', () => {
      assert.isTrue(Core.Any(list, x => x === true));
    });
    it('test4', () => {
      assert.isFalse(Core.Any(list, x => typeof x == 'object'));
    });
    it('test5', () => {
      assert.isFalse(Core.Any(list, x => x == null));
    });
    it('test6', () => {
      assert.isFalse(Core.Any([]));
    });
  });
  describe('#Average()', () => {
    const list = ['8', '5', '8', '23'];

    it('test1', () => {
      assert.equal(Core.Average(list), 11);
    });
    it('test2', () => {
      assert.equal(Core.Average(list, (_, idx) => idx), 1.5);
    });
    it('test3', () => {
      assert.equal(Core.Average(list, x => (x.toString()).length), 1.25);
    });
  });

  describe('#Count()', () => {
    const list = ['foo', 'bar', 'baz', 'qux'];

    it('test1', () => {
      assert.equal(Core.Count(list), 4);
    });
    it('test1', () => {
      assert.equal(Core.Count(list, x => x.indexOf('a') != -1), 2);
    });
    it('test3', () => {
      assert.equal(Core.Count([]), 0);
    });
  });

  describe('#DefaultIfEmpty()', () => {
    const ref = {};
    const list = [];

    it('test1', () => {
      assert.deepEqual(Core.DefaultIfEmpty(list), [ undefined ]);
    });
    it('test2', () => {
      assert.deepEqual(Core.DefaultIfEmpty(list, null), [ null ]);
    });
    it('test3', () => {
      assert.deepEqual(Core.DefaultIfEmpty(list, ref), [ ref ]);
    });
    it('test4', () => {
      const list2 = ['hello', true, 11, ref];
      assert.deepEqual(Core.DefaultIfEmpty(list2), ['hello', true, 11, ref]);
    });
  });
  describe('#Distinct()', () => {
    it('test1', () => {
      const list = [2, 5, 6, 2, null, '2', 'null', 'hi', 'hi' ];
      assert.deepEqual(Core.Distinct(list), [ 2, 5, 6, null, '2', 'null', 'hi' ]);
    });
    it('test2', () => {
      const list = [{}, { id: 2 }, { id: 4, count: 0 }, {}, { id: 2 }, { id: 2, count: 6 }];
      assert.deepEqual(Core.Distinct(list), [ {}, { id: 2 }, { id: 4, count: 0 }, { id: 2, count: 6 } ]);
    });
  });
  describe('#DistinctBy()', () => {
    it('test1', () => {
      const list = [2, 5, 6, 2, null, '2', 'null', 'hi', 'hi'];
      assert.deepEqual(Core.DistinctBy(list, x => String(x).length), [ 2, null, 'hi' ]);
    });
    it('test2', () => {
      const list = [{}, { id: 2 }, { id: 4, count: 0 }, {}, { id: 2 }, { id: 2, count: 6 }];
      assert.deepEqual(Core.DistinctBy(list, x => x.id), [ {}, { id: 2 }, { id: 4, count: 0 } ]);
    });
  });

  describe('#ElementAt()', () => {
    const list = [5, 6, null];

    it('test1', () => {
      assert.equal(Core.ElementAt(list, 0), 5);
    });
    it('test2', () => {
      assert.isNull(Core.ElementAt(list, 2));
    });
    it('test3', () => {
      assert.isNull(Core.ElementAt(list, 100));
    });
    it('test4', () => {
      assert.isNull(Core.ElementAt(list, -2));
    });
    it('test5', () => {
      assert.isNull(Core.ElementAt([], 0));
    });
    it('test6', () => {
      assert.isNull(Core.ElementAt([], -10));
    });
    it('test7', () => {
      assert.isNull(Core.ElementAt([], 4));
    });
  });

  describe('#First()', () => {
    const list = ['a', 'b', 'ce'];

    it('test1', () => {
      assert.equal(Core.First(list), 'a');
    });
    it('test2', () => {
      assert.equal(Core.First(list, x => x.length > 1), 'ce');
    });
    it('test3', () => {
      assert.isNull(Core.First(list, () => false));
    });
    it('test4', () => {
      assert.isNull(Core.First([]));
    });
    it('test5', () => {
      assert.isNull(Core.First([], () => false));
    });
  });

  describe('#GroupBy()', () => {
    it('test1', () => {
      const pets = [
        { name: 'Barley', age: 8 },
        { name: 'Boots', age: 4 },
        { name: 'Whiskers', age: 1 },
        { name: 'Daisy', age: 4 }
      ];

      const res = Core.GroupBy(pets, pet => pet.age, pet => pet.name);
      assert.deepEqual(res, {
        '8': [ 'Barley' ],
        '4': [ 'Boots', 'Daisy' ],
        '1': [ 'Whiskers' ],
      });
    });

    it('test2', () => {
      const pets = [
        { name: 'Barley', age: 8.3 },
        { name: 'Boots', age: 4.9 },
        { name: 'Whiskers', age: 1.5 },
        { name: 'Daisy', age: 4.3 }
      ];

      const res = Core.GroupBy(pets, pet => Math.floor(pet.age));
      assert.deepEqual(res, {
        '8': [ pets[0] ],
        '4': [ pets[1], pets[3] ],
        '1': [ pets[2] ],
      });
    });
  })
  it('#GroupJoin()', () => {
    const persons = [
      { name: 'Hedlund, Magnus' },
      { name: 'Adams, Terry' },
      { name: 'Weiss, Charlotte' },
    ];
    const pets = [
      { name: 'Barley', owner: persons[1] },
      { name: 'Boots', owner: persons[1] },
      { name: 'Whiskers', owner: persons[2] },
      { name: 'Daisy', owner: persons[0] },
    ];

    const res = Core.GroupJoin(persons, pets,
      person => person,
      pet => pet.owner,
      (person, pets) => {
        return { ownerName: person.name, pets: pets.map(p => p.name) };
      }
    );
    assert.deepEqual(res, [
      { ownerName: 'Hedlund, Magnus', pets: [ 'Daisy' ] },
      { ownerName: 'Adams, Terry', pets: [ 'Barley', 'Boots' ] },
      { ownerName: 'Weiss, Charlotte', pets: [ 'Whiskers' ] },
    ]);
  });
  it('#Join()', () => {
    const persons = [
      { name: 'Hedlund, Magnus' },
      { name: 'Adams, Terry' },
      { name: 'Weiss, Charlotte' },
    ];
    const pets = [
      { name: 'Barley', owner: persons[1] },
      { name: 'Boots', owner: persons[1] },
      { name: 'Whiskers', owner: persons[2] },
      { name: 'Daisy', owner: persons[0] },
    ];

    const res = Core.Join(persons, pets, person => person, pet => pet.owner, (person, pet) => {
      return { ownerName: person.name, pet: pet.name };
    });

    assert.deepEqual(res, [
      { ownerName: 'Hedlund, Magnus', pet: 'Daisy' },
      { ownerName: 'Adams, Terry', pet: 'Barley' },
      { ownerName: 'Adams, Terry', pet: 'Boots' },
      { ownerName: 'Weiss, Charlotte', pet: 'Whiskers' },
    ]);
  });

  describe('#Last()', () => {
    const list = ['ab', 'a', 'b', 'c'];
    const list2 = [];

    it('test1', () => assert.equal(Core.Last(list), 'c'));
    it('test2', () => assert.equal(Core.Last(list, x => x.length > 1), 'ab'));
    it('test3', () => assert.isNull(Core.Last(list, () => false)));
    it('test4', () => assert.isNull(Core.Last(list2)));
    it('test5', () => assert.isNull(Core.Last(list2, () => false)));
  });

  describe('#Max()', () => {
    it('test1', () => {
      assert.equal(Core.Max([]), Number.NEGATIVE_INFINITY);
    });
    it('test2', () => {
      assert.equal(Core.Max([9, 9.2, '3', 8.5]), 9.2);
    });
    it('test3', () => {
      assert.equal(Core.Max([true, [ 6.7 ], 5]), 6.7);
    });
    it('test4', () => {
      assert.isNaN(Core.Max([1, 5, 8, {}]));
    });
  });
  describe('#Min()', () => {
    it('test1', () => {
      assert.equal(Core.Min([]), Number.POSITIVE_INFINITY);
    });
    it('test2', () => {
      assert.equal(Core.Min([9, 9.2, '3', 8.5]), 3);
    });
    it('test3', () => {
      assert.equal(Core.Min([true, [ 6.7 ], 5]), 1);
    });
    it('test4', () => {
      assert.isNaN(Core.Min([1, 5, 8, {}]));
    });
  });

  describe('#Select()', () => {
    it('test1', () => {
      assert.isEmpty(Core.Select([], x => x));
    });
    it('test2', () => {
      const list = [true, null, 'foobar', 100, {}];
      assert.deepEqual(Core.Select(list, String), [ 'true', 'null', 'foobar', '100', '[object Object]' ]);
    });
  });
  describe('#SelectMany()', () => {
    it('test1', () => {
      const list = [];
      assert.isEmpty(Core.SelectMany(list, x => x));
    });
    it('test2', () => {
      const list = [[ 1, 2, 3 ], [ 4, [ 5, 6 ] ], [ 7, 8, 9 ]];
      assert.deepEqual(Core.SelectMany(list, x => x), [ 1, 2, 3, 4, [ 5, 6 ], 7, 8, 9 ]);
    });
  });
  describe('#Single()', () => {
    it('test1', () => {
      const fruits = [ 'orange' ];
      assert.deepEqual(Core.Single(fruits), 'orange');
    });
    it('test2', () => {
      const fruits = ['orange', 'apple'];
      assert.throws(() => Core.Single(fruits));
    });
    it('test3', () => {
      const fruits = [];
      assert.isNull(Core.Single(fruits));
    });
    it('test4', () => {
      const fruits = [ 'apple', 'banana', 'mango', 'orange', 'passionfruit', 'grape' ];
      assert.equal(Core.Single(fruits, fruit => fruit.length > 10), 'passionfruit');
    });
    it('test5', () => {
      const fruits = [ 'apple', 'banana', 'mango', 'orange', 'passionfruit', 'grape' ];
      assert.throws(() => Core.Single(fruits, fruit => fruit.length > 5));
    });
  });
  describe('#Skip()', () => {
    const grades = [59, 82, 70, 56, 92, 98, 85];

    it('test1', () => {
      assert.deepEqual(Core.Skip(grades, 2), [70, 56, 92, 98, 85]);
    });
    it('test2', () => {
      assert.isEmpty(Core.Skip(grades, 50));
    });
    it('test3', () => {
      assert.isEmpty(Core.Skip([], 2));
    });
    it('test4', () => {
      strictDeepEqual(Core.Skip(grades, 0), grades);
    });
    it('test5', () => {
      strictDeepEqual(Core.Skip(grades, -1), grades);
    });
  });
  describe('#SkipLast()', () => {
    const grades = [59, 82, 70, 56, 92, 98, 85];

    it('test1', () => {
      assert.deepEqual(Core.SkipLast(grades, 5), [59, 82]);
    });
    it('test2', () => {
      assert.isEmpty(Core.SkipLast(grades, 34));
    });
    it('test3', () => {
      assert.isEmpty(Core.SkipLast([], 7));
    });
    it('test4', () => {
      strictDeepEqual(Core.SkipLast(grades, 0), grades);
    });
    it('test5', () => {
      strictDeepEqual(Core.SkipLast(grades, -1), grades);
    });
  });
  describe('#Sum()', () => {
    const list = [1, '7', true, [ -3 ], { valueOf: () => 10 }];

    it('test1', () => assert.equal(Core.Sum([]), 0));
    it('test2', () => assert.equal(Core.Sum(list), 16));
    it('test3', () => assert.equal(Core.Sum(list, x => String(x).length), 23));
  });

  describe('#Take()', () => {
    const grades = [59, 82, 70, 56, 92, 98, 85];

    it('test1', () => {
      assert.deepEqual(Core.Take(grades, 4), [59, 82, 70, 56]);
    });
    it('test2', () => {
      strictDeepEqual(Core.Take(grades, 500), grades);
    });
    it('test3', () => {
      assert.isEmpty(Core.Take([], 2));
    });
    it('test4', () => {
      assert.isEmpty(Core.Take(grades, 0));
    });
    it('test5', () => {
      assert.isEmpty(Core.Take(grades, -1));
    });
  });
  describe('#TakeLast()', () => {
    const grades = [59, 82, 70, 56, 92, 98, 85];

    it('test1', () => {
      assert.deepEqual(Core.TakeLast(grades, 5), [70, 56, 92, 98, 85]);
    });
    it('test2', () => {
      strictDeepEqual(Core.TakeLast(grades, 123), grades);
    });
    it('test3', () => {
      assert.isEmpty(Core.TakeLast([], 4));
    });
    it('test4', () => {
      assert.isEmpty(Core.TakeLast(grades, 0));
    });
    it('test5', () => {
      assert.isEmpty(Core.TakeLast(grades, -1));
    });
  });
  describe('#ToObject()', () => {
    it('test1', () => {
      const list = [
        { company: 'Coho Vineyard', weight: 25.2, trackingNumber: 89453312 },
        { company: 'Lucerne Publishing', weight: 18.7, trackingNumber: 89112755 },
        { company: 'Wingtip Toys', weight: 6.0, trackingNumber: 299456122 },
        { company: 'Adventure Works', weight: 33.8, trackingNumber: 4665518773 },
      ];

      const res = Core.ToObject(list, item => item.trackingNumber);
      assert.deepEqual(res, {
        '89453312': list[0],
        '89112755': list[1],
        '299456122': list[2],
        '4665518773': list[3],
      });
    });
    it('test2', () => {
      const list = [
        { company: 'Coho Vineyard', weight: 25.2, trackingNumber: 89453312 },
        { company: 'Lucerne Publishing', weight: 18.7, trackingNumber: 89112755 },
        { company: 'Wingtip Toys', weight: 6.0, trackingNumber: 299456122 },
        { company: 'Adventure Works', weight: 33.8, trackingNumber: 4665518773 },
      ];

      const res = Core.ToObject(list, item => item.trackingNumber, item => item.company);
      assert.deepEqual(res, {
        '89453312': 'Coho Vineyard',
        '89112755': 'Lucerne Publishing',
        '299456122': 'Wingtip Toys',
        '4665518773': 'Adventure Works',
      });
    });
    it('test3', () => {
      // TODO
    });
  });

  describe('#Where()', () => {
    it('test1', () => {
      const list = [];
      assert.isEmpty(Core.Where(list, x => x));
    });
    it('test2', () => {
      const list2 = ['a', 10, 'c', false, {}, 'f', []];
      assert.deepEqual(Core.Where(list2, x => typeof x == 'string'), [ 'a', 'c', 'f' ]);
    });
  });

  describe('#Cast()', () => {
    it('test1', () => {
      strictDeepEqual(Core.Cast([]), []);
    });
    it('test2', () => {
      strictDeepEqual(Core.Cast<number>([ '5', '1' ,'9' ]), [ '5', '1' ,'9' ]);
    });
  });

  describe('#Except()', () => {
    const numbers1 = [ 2.0, 2.0, 2.1, 2.2, 2.3, 2.3, 2.4, 2.5 ];
    const numbers2 = [ 2.2 ];

    it('test1', () => {
      assert.deepEqual(Core.Except(numbers1, numbers2), [ 2, 2.1, 2.3, 2.4, 2.5 ]);
    });
    it('test2', () => {
      assert.deepEqual(Core.Except(numbers1, []), [ 2, 2.1, 2.2, 2.3, 2.4, 2.5] );
    });
    it('test3', () => {
      assert.isEmpty(Core.Except([], numbers1));
    });
  });

  describe('#Intersect()', () => {
    it('test1', () => {
      assert.deepEqual(Core.Intersect([44, 26, 92, 30, 71, 38], [39, 59, 83, 47, 26, 4, 30]), [26,30]);
    });
    it('test1', () => {
      assert.deepEqual(Core.Intersect([true, 'foo', 6, {}, null], [{}, false, 'foo', null, 10]), ['foo', null]);
    });
    it('test3', () => {
      assert.isEmpty(Core.Intersect([], [65, 81, 28]));
    });
    it('test4', () => {
      assert.isEmpty(Core.Intersect([55, 26, 37, 89], []));
    });
    it('test4', () => {
      const ref = [];
      const ref2 = {};
      const ref3 = Object.create(null);
      assert.deepEqual(Core.Intersect([ref, ref2], [ref3, ref2, ref]), [ref, ref2]);
    });
  });

  describe('#OfType()', () => {
    class Foo {}
    class Bar {}

    it('test1', () => {
      const list = [ false, 'foo', 'bar', 10, null, true, 'baz' ];

      assert.deepEqual(Core.OfType(list, String), [ 'foo', 'bar', 'baz' ]);
    });
    it('test2', () => {
      const list = [ false, 'foo', 'bar', 10, null, 'baz' ];

      assert.deepEqual(Core.OfType(list, Number), [ 10 ]);
    });
    it('test3', () => {
      const list = [ false, 'foo', 'bar', 10, null, true, 'baz', false ];

      assert.deepEqual(Core.OfType(list, Boolean), [ false, true, false ]);
    });
    it('test4', () => {
      const foo1 = new Foo();
      const foo2 = new Foo();
      const bar1 = new Bar();
      const obj1 = {};
      const obj2 = Object.create(null);
      const list = [ false, foo1, bar1, 10, null, foo2, obj1, foo1, true, obj2, 'baz' ];

      assert.deepEqual(Core.OfType(list, Foo), [ foo1, foo2, foo1 ]);
    });
    it('test5', () => {
      assert.isEmpty(Core.OfType([], String));
    });
    it('test6', () => {
      // BigInt not supported :(, due to IE support
      assert.isEmpty(Core.OfType([100n, 100, 20, 200n], BigInt));
    });
  });

  describe('#SequenceEqual()', () => {
    it('test1', () => {
      const pet1 = { name: 'Turbo', age: 2 };
      const pet2 = { name: 'Peanut', age: 8 };

      // Create two lists of pets.
      const pets1 = [ pet1, pet2 ];
      const pets2 = [ pet1, pet2 ];

      assert.isTrue(Core.SequenceEqual(pets1, pets2));
    });
    it('test2', () => {
      // Create two lists of pets.
      const pets1 = [
        { name: 'Turbo', age: 2 },
        { name: 'Peanut', age: 8 },
      ];
      const pets2 = [
        { name: 'Turbo', age: 2 },
        { name: 'Peanut', age: 8 },
      ];

      assert.isFalse(Core.SequenceEqual(pets1, pets2));
    });
    it('test3', () => {
      const list1 = [ 42, 'bar', false, null ];
      const list2 = [ 42, 'bar', false, null ];

      assert.isTrue(Core.SequenceEqual(list1, list2));
    });
    it('test4', () => {
      const list1 = [ 42, 'bar', false, null ];
      const list2 = [ false, null, 42, 'bar' ];

      assert.isFalse(Core.SequenceEqual(list1, list2));
    });
    it('test5', () => {
      const list = [59, 82, 70, 56, 92, 98, 85];

      assert.isFalse(Core.SequenceEqual([], list));
    });
  });

  describe('#SkipWhile()', () => {
    const grades = [59, 82, 70, 56, 92, 98, 85];

    it('test1', () => {
      assert.deepEqual(Core.SkipWhile(grades, grade => grade < 85), [92, 98, 85]);
    });
    it('test2', () => {
      strictDeepEqual(Core.SkipWhile(grades, () => false), grades);
    });
    it('test3', () => {
      assert.isEmpty(Core.SkipWhile(grades, grade => grade > 10));
    });
    it('test4', () => {
      assert.isEmpty(Core.SkipWhile([], () => true));
    });
  });

  describe('#TakeWhile()', () => {
    const grades = [59, 82, 70, 56, 92, 98, 85];

    it('test1', () => {
      assert.deepEqual(Core.TakeWhile(grades, grade => grade < 60), [59]);
    });
    it('test2', () => {
      assert.isEmpty(Core.TakeWhile(grades, grade => grade > 80));
    });
    it('test3', () => {
      strictDeepEqual(Core.TakeWhile(grades, grade => grade < 100), grades);
    });
    it('test4', () => {
      assert.isEmpty(Core.TakeWhile([], x => !!x));
    });
  });

  describe('#Union()', () => {
    const ints1 = [5, 3, 9, 7, 5, 9, 3, 7];
    const ints2 = [8, 3, 6, 4, 4, 9, 1, 0];
    const ints3 = [8, 3, 6, 4, 9, 1, 0];
    const ints4 = [5, 3, 9, 7];

    it('test1', () => assert.deepEqual(Core.Union(ints1, ints2), [5, 3, 9, 7, 8, 6, 4, 1, 0]));
    it('test2', () => strictDeepEqual(Core.Union(ints3, []), ints3));
    it('test3', () => assert.deepEqual(Core.Union([], ints1), [5, 3, 9, 7]));
    it('test4', () => strictDeepEqual(Core.Union([], ints4), ints4));
    it('test5', () => assert.isEmpty(Core.Union([], [])));
  });

  describe('#Zip()', () => {
    it('test1', () => {
      const numbers = [ 1, 2, 3, 4 ];
      const words = [ 'one', 'two', 'three' ];

      const res = Core.Zip(numbers, words, (first, second) => first + ' ' + second);
      assert.deepEqual(res, [ '1 one', '2 two', '3 three' ]);
    });
    it('test2', () => {
      const numbers = [ 1, 2, 3, 4, 4, 5 ];
      const words = [ 'one', 'two', 'three', 'four' ];

      const res = Core.Zip(words, numbers, (first, second) => first + ' ' + second);
      assert.deepEqual(res, [ 'one 1', 'two 2', 'three 3', 'four 4' ]);
    });
    it('test3', () => {
      const numbers = [ 1, 2, 3 ];
      const words = [];

      const res = Core.Zip(numbers, words, (first, second) => first + ' ' + second);
      assert.isEmpty(res);
    });
    it('test4', () => {
      const numbers = [];
      const words = [];

      const res = Core.Zip(numbers, words, (first, second) => first + ' ' + second);
      assert.isEmpty(res);
    });
  });
});
