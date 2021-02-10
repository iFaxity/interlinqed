import { assert } from 'chai';
import { PredicateBuilder } from '../../src';

describe('PredicateBuilder', () => {
  it('chaining #And() with #Or()', () => {
      const expr = PredicateBuilder.New()
        .And(x => x != null)
        .And(x => x == 'foo')
        .Or(x => x == 'bar')
        .And(x => typeof x == 'string');

      assert.isTrue(expr('foo'));
      assert.isTrue(expr('bar'));
      assert.isFalse(expr('baz'));
      assert.isFalse(expr(null));
      assert.isFalse(expr(500));
  });

  describe('#New()', () => {
    it('test1', () => {
      const expr = PredicateBuilder.New(null);
      assert.isFalse(expr());
    });
    it('test2', () => {
      const expr1 = PredicateBuilder.New(true);
      assert.isTrue(expr1());

      const expr2 = PredicateBuilder.New(false);
      assert.isFalse(expr2());
    });
    it('test3', () => {
      const expr1 = PredicateBuilder.New(() => true);
      const expr2 = PredicateBuilder.New(expr1);
      assert.isTrue(expr2());
    });
    it('test4', () => {
      const expr1 = PredicateBuilder.New(() => true);
      const expr2 = PredicateBuilder.New(expr1);
      assert.notStrictEqual(expr1, expr2);
    });
    it('test5', () => {
      // unlinked chain
      const expr1 = PredicateBuilder.New<string>(() => true);
      const expr2 = PredicateBuilder.New(expr1);

      expr1.And(() => false);

      // Unlinked but based on the same original expression
      assert.isFalse(expr1());
      assert.isTrue(expr2());
    });
  });
});

describe('PredicateExpression', () => {
  describe('#And()', () => {
    it('test1', () => {
      const expr = PredicateBuilder.New<string>();
      assert.isFalse(expr('hi'));

      expr.And(x => typeof x == 'string');
      assert.isTrue(expr('hi'));
    });
    it('test2', () => {
      const expr = PredicateBuilder.New<number>()
        .And(x => x > 0)
        .And(x => x % 2 == 0);

      assert.isFalse(expr(0));
      assert.isTrue(expr(2));
      assert.isFalse(expr(5));
    });
  });

  describe('#Or()', () => {
    it('test1', () => {
      const expr = PredicateBuilder.New<number>()
        .Or(x => x > 10);

      assert.isFalse(expr(5));
      assert.isTrue(expr(15));
    });
    it('test2', () => {
      const expr = PredicateBuilder.New()
        .And<string>(x => typeof x == 'string')
        .And(x => x.startsWith('foo'));

      assert.isFalse(expr(0 as any));
      assert.isFalse(expr(true as any));
      assert.isTrue(expr('foo'));
      assert.isTrue(expr('foobar'));
    });
  });

  describe('#_predicate', () => {
    it('test1', () => {
      const expr = PredicateBuilder.New();

      assert.isNull(expr._predicate);
    });
    it('test2', () => {
      const expr = PredicateBuilder.New(true);

      assert.isNull(expr._predicate);
    });
    it('test3', () => {
      const fn = () => true;
      const expr = PredicateBuilder.New(fn);

      assert.strictEqual(expr._predicate, fn);
    });
    it('test4', () => {
      const fn = () => true;
      const expr = PredicateBuilder.New();

      expr.And(fn);
      assert.strictEqual(expr._predicate, fn);
    });
  });

  describe('#Predicate', () => {
    it('test1', () => {
      const expr = PredicateBuilder.New();

      assert.isFunction(expr.Predicate);
    });
    it('test2', () => {
      const expr = PredicateBuilder.New(true);

      assert.isFunction(expr.Predicate);
    });
    it('test3', () => {
      const fn = () => false;
      const expr = PredicateBuilder.New(fn);

      assert.strictEqual(expr.Predicate, fn);
    });
    it('test4', () => {
      const fn = () => false;
      const expr = PredicateBuilder.New();

      assert.notStrictEqual(expr.Predicate, fn);

      expr.And(fn);
      assert.strictEqual(expr.Predicate, fn);
    });
  });

  describe('DefaultExpression', () => {

  });
});
