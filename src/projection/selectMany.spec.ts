import { describe, it, expect } from 'vitest';
import { selectMany } from './selectMany';

describe.concurrent('#selectMany()', () => {
  it('test1', () => {
    const res = [ ...selectMany(x => x)([]) ];

    expect(res).toEqual([]);
  });
  it('test2', () => {
    const res = [ ...selectMany(x => x)([[ 1, 2, 3 ], [ 4, [ 5, 6 ] ], [ 7, 8, 9 ]]) ];

    expect(res).toEqual([ 1, 2, 3, 4, [ 5, 6 ], 7, 8, 9 ]);
  });
  it('test3', () => {
    const petOwners = [
      {
        name: 'Higa',
        pets: ['Scruffy', 'Sam' ],
      },
      {
        name: 'Ashkenazi',
        pets: [ 'Ashkenazi', 'Sugar' ],
      },
      {
        name: 'Price',
        pets: [ 'Scratches', 'Diesel' ],
      },
      {
        name: 'Hines',
        pets: [ 'Dusty' ],
      },
    ];

    const res = [ ...selectMany<any, any, any>(x => x.pets, (x, y) => ({ owner: x.name, pet: y }))(petOwners) ];

    expect(res).toEqual([
      { owner: 'Higa', pet: 'Scruffy' },
      { owner: 'Higa', pet: 'Sam' },
      { owner: 'Ashkenazi', pet: 'Ashkenazi' },
      { owner: 'Ashkenazi', pet: 'Sugar' },
      { owner: 'Price', pet: 'Scratches' },
      { owner: 'Price', pet: 'Diesel' },
      { owner: 'Hines', pet: 'Dusty' },
    ]);
  });
});
