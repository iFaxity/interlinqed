import { describe, it, expect } from 'vitest';
import { orderBy } from './orderBy';
import { thenBy } from './thenBy';

const list = [
  { name: 'Frozen yogurt', fat: 6, carbs: 24, prot: 4 },
  { name: 'Ice cream sandwich', fat: 9, carbs: 37, prot: 4.3 },
  { name: 'Eclair', fat: 16, carbs: 24, prot: 6 },
  { name: 'Gingerbread', fat: 16, carbs: 49, prot: 0 },
  { name: 'Jelly bean', fat: 0, carbs: 94, prot: 0 },
];

describe('#thenBy()', () => {
  it('test1', () => {
    const res = [ ...thenBy<any>(x => x.fat)(orderBy<any>(x => x.carbs)(list)) ];

    expect(res).toMatchSnapshot();
  });
  it('test2', () => {
    expect(() => thenBy<any>(x => x.fat)(list as any)).toThrow();
  });
});
