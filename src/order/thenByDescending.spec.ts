import { describe, it, expect } from 'vitest';
import { orderByDescending } from './orderByDescending';
import { thenByDescending } from './thenByDescending';

const list = [
  { name: 'Frozen yogurt', fat: 6, carbs: 24, prot: 4 },
  { name: 'Ice cream sandwich', fat: 9, carbs: 37, prot: 4.3 },
  { name: 'Eclair', fat: 16, carbs: 24, prot: 6 },
  { name: 'Gingerbread', fat: 16, carbs: 49, prot: 0 },
  { name: 'Jelly bean', fat: 0, carbs: 94, prot: 0 },
];

describe('#thenByDescending()', () => {
  it('test1', () => {
    const res = [ ...thenByDescending<any>(x => x.fat)(orderByDescending<any>(x => x.carbs)(list)) ];

    expect(res).toMatchSnapshot();
  });

  it('test2', () => {
    expect(() => thenByDescending<any>(x => x.fat)(list as any)).toThrow();
  });
});
