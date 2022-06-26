import { describe, it, expect } from 'vitest';
import { join } from './join';

describe.concurrent('#join()', () => {
  it('test1', () => {
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

    const res = [ ...join(pets, person => person, pet => pet.owner, (person, pet) => {
      return { ownerName: person.name, pet: pet.name };
    })(persons) ];

    expect(res).toEqual([
      { ownerName: 'Hedlund, Magnus', pet: 'Daisy' },
      { ownerName: 'Adams, Terry', pet: 'Barley' },
      { ownerName: 'Adams, Terry', pet: 'Boots' },
      { ownerName: 'Weiss, Charlotte', pet: 'Whiskers' },
    ]);
  });
});
