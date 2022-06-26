import { describe, it, expect } from 'vitest';
import { single } from './single';

describe.concurrent('#single()', () => {
  it('test1', () => {
    const res = single()([ 'orange' ]);
    
    expect(res).toEqual('orange');
  });
  it('test2', () => {
    const fruits = [ 'orange', 'apple' ];

    expect(() => single()(fruits)).toThrow();
  });
  it('test3', () => {
    const res = single()([]);

    expect(res).toBeNull();
  });
  it('test4', () => {
    const fruits = [ 'apple', 'banana', 'mango', 'orange', 'passionfruit', 'grape' ];
    const res = single<string>(fruit => fruit.length > 10)(fruits);
    
    expect(res).toEqual('passionfruit');
  });
  it('test5', () => {
    const fruits = [ 'apple', 'banana', 'mango', 'orange', 'passionfruit', 'grape' ];

    expect(() => single<string>(fruit => fruit.length > 5)(fruits)).toThrow();
  });
});
