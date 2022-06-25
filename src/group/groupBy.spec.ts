import { describe, it, expect } from 'vitest';
import { Grouping } from '../core';
import { groupBy } from './groupBy';

function verifyGroup<TKey, TItem>(key: TKey, items: TItem[], group: Grouping<TKey, TItem>) {
  const elements = [ ...group ];

  expect(group.key).toEqual(key);
  expect(elements).toEqual(items);
}

describe.concurrent('#groupBy()', () => {
  it('test1', () => {
    const pets = [
      { name: 'Barley', age: 8 },
      { name: 'Boots', age: 4 },
      { name: 'Whiskers', age: 1 },
      { name: 'Daisy', age: 4 }
    ];

    const res = [ ...groupBy<any, any, any>(pet => pet.age, pet => pet.name)(pets) ];

    verifyGroup(8, ['Barley'] , res[0]);
    verifyGroup(4, ['Boots', 'Daisy'] , res[1]);
    verifyGroup(1, ['Whiskers'] , res[2]);
  });

  it('test2', () => {
    const pets = [
      { name: 'Barley', age: 8.3 },
      { name: 'Boots', age: 4.9 },
      { name: 'Whiskers', age: 1.5 },
      { name: 'Daisy', age: 4.3 }
    ];

    const res = groupBy<any, any>(pet => Math.floor(pet.age))(pets);

    verifyGroup(8, [ { name: 'Barley', age: 8.3 } ], res[0]);
    verifyGroup(4, [ { name: 'Barley', age: 8.3 } ], res[1]);
    verifyGroup(1, [ { name: 'Barley', age: 8.3 }, { name: 'Daisy', age: 4.3 } ], res[2]);
  });
});
