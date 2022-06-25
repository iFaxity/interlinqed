import { describe, it, expect } from 'vitest';
import { elementAt } from './elementAt';

describe.concurrent('#elementAt()', () => {
  const list = [5, 6, null];

  it('test1', () => {
    const res = elementAt(0)(list);

    expect(res).toEqual(5);
  });
  it('test2', () => {
    const res = elementAt(2)(list);

    expect(res).toBeNull();
  });
  it('test3', () => {
    const res = elementAt(100)(list);

    expect(res).toBeNull();
  });
  it('test4', () => {
    expect(() => elementAt(-2)(list)).toThrow();
  });
  it('test5', () => {
    const res = elementAt(0)([]);

    expect(res).toBeNull();
  });
  it('test6', () => {
    expect(() => elementAt(-10)([])).toThrow();
  });
  it('test7', () => {
    const res = elementAt(4)([]);

    expect(res).toBeNull();
  });
});
