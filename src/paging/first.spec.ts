import { describe, it, expect } from 'vitest';
import { first } from './first';

describe.concurrent('#first()', () => {
  const list = ['a', 'b', 'ce'];

  it('test1', () => {
    const res = first()(list);

    expect(res).toEqual('a');
  });
  it('test2', () => {
    const res = first<any>(x => x.length > 1)(list);

    expect(res).toEqual('ce');
  });
  it('test3', () => {
    const res = first(() => false)(list);

    expect(res).toBeNull();
  });
  it('test4', () => {
    const res = first()([]);

    expect(res).toBeNull();
  });
  it('test5', () => {
    const res = first(() => true)([]);

    expect(res).toBeNull();
  });
});
