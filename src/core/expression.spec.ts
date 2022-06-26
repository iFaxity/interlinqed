import { describe, it, expect } from 'vitest';
import { createPredicate } from './expression';

describe.concurrent('#createPredicate()', () => {
  it('test1', () => {
    const expr = createPredicate<string>(null);
    expect(expr('a')).toBeFalsy();
  });
  it('test2', () => {
    const expr1 = createPredicate<string>(true);
    expect(expr1('a')).toBeTruthy();

    const expr2 = createPredicate<string>(false);
    expect(expr2('a')).toBeFalsy();
  });
  it('test3', () => {
    const expr1 = createPredicate<string>(() => true);
    const expr2 = createPredicate(expr1);
    expect(expr2('a')).toBeTruthy();
  });
});

describe.concurrent('PredicateExpression', () => {
  it('chaining #and() with #or()', () => {
    const expr = createPredicate()
      .and(x => x != null)
      .and(x => x == 'foo')
      .or(x => x == 'bar')
      .and(x => typeof x == 'string');

    expect(expr('foo')).toBeTruthy();
    expect(expr('bar')).toBeTruthy();
    expect(expr('baz')).toBeFalsy();
    expect(expr(null)).toBeFalsy();
    expect(expr(500)).toBeFalsy();
  });

  describe.concurrent('#and', () => {
    it('test1', () => {
      const expr = createPredicate<string>();
      expect(expr('hi')).toBeFalsy();

      expr.and(x => typeof x == 'string');
      expect(expr('hi')).toBeTruthy();
    });
    it('test2', () => {
      const expr = createPredicate<number>()
        .and(x => x > 0)
        .and(x => x % 2 == 0);

      expect(expr(0)).toBeFalsy();
      expect(expr(2)).toBeTruthy();
      expect(expr(5)).toBeFalsy();
    });
  });

  describe.concurrent('#or', () => {
    it('test1', () => {
      const expr = createPredicate<number>()
        .or(x => x > 10);

      expect(expr(5)).toBeFalsy();
      expect(expr(15)).toBeTruthy();
    });
    it('test2', () => {
      const expr = createPredicate()
        .and(x => typeof x == 'string')
        .and(x => x.startsWith('foo'));

      expect(expr(0)).toBeFalsy();
      expect(expr(true)).toBeFalsy();
      expect(expr('foo')).toBeTruthy();
      expect(expr('foobar')).toBeTruthy();
    });
  });
});
