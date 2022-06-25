import { describe, it, expect } from 'vitest';
import { toObject } from './toObject';

describe.concurrent('#toObject()', () => {
  it('test1', () => {
    const list = [
      { company: 'Coho Vineyard', weight: 25.2, trackingNumber: 89453312 },
      { company: 'Lucerne Publishing', weight: 18.7, trackingNumber: 89112755 },
      { company: 'Wingtip Toys', weight: 6.0, trackingNumber: 299456122 },
      { company: 'Adventure Works', weight: 33.8, trackingNumber: 4665518773 },
    ];

    const res = toObject(item => item.trackingNumber)(list);
    expect(res).toEqual({
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

    const res = toObject(item => item.trackingNumber, item => item.company)(list);
    expect(res).toEqual({
      '89453312': 'Coho Vineyard',
      '89112755': 'Lucerne Publishing',
      '299456122': 'Wingtip Toys',
      '4665518773': 'Adventure Works',
    });
  });
});
