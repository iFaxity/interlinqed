import { describe, it, expect } from 'vitest';
import { sequenceEqual } from './sequenceEqual';

describe.concurrent('#sequenceEqual()', () => {
  it('test1', () => {
    const pet1 = { name: 'Turbo', age: 2 };
    const pet2 = { name: 'Peanut', age: 8 };

    // Create two lists of pets.
    const pets1 = [ pet1, pet2 ];
    const pets2 = [ pet1, pet2 ];

    const res = sequenceEqual(pets2)(pets1);
    expect(res).toBeTruthy();
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

    const res = sequenceEqual(pets2)(pets1);
    expect(res).toBeFalsy();
  });
  it('test3', () => {
    const list1 = [ 42, 'bar', false, null ];
    const list2 = [ 42, 'bar', false, null ];

    const res = sequenceEqual(list2)(list1);
    expect(res).toBeTruthy();
  });
  it('test4', () => {
    const list1 = [ 42, 'bar', false, null ];
    const list2 = [ false, null, 42, 'bar' ];

    const res = sequenceEqual(list2)(list1);
    expect(res).toBeFalsy();
  });
  it('test5', () => {
    const list = [59, 82, 70, 56, 92, 98, 85];

    const res = sequenceEqual(list)([]);
    expect(res).toBeFalsy();
  });
});
