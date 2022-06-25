import { describe, it, expect } from 'vitest';
import { groupJoin } from './groupJoin';

describe.concurrent('#groupJoin()', () => {
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

    const res = [ ...groupJoin(pets,
      person => person,
      pet => pet.owner,
      (person, pets) => {
        return { ownerName: person.name, pets: Array.from(pets).map(p => p.name) };
      }
    )(persons) ];

    expect(res).toEqual([
      { ownerName: 'Hedlund, Magnus', pets: [ 'Daisy' ] },
      { ownerName: 'Adams, Terry', pets: [ 'Barley', 'Boots' ] },
      { ownerName: 'Weiss, Charlotte', pets: [ 'Whiskers' ] },
    ]);
  });
});
