import { assert } from 'chai';
import { PredicateBuilder } from '../../src';

describe('PredicateBuilder', () => {
  describe('#New()', () => {
    it('with null', () => {
      const expr = PredicateBuilder.New<string>(null);
      assert.isFalse(expr());
    });
    it('with predicate', () => {
      const expr1 = PredicateBuilder.New<string>(() => true);
      assert.isTrue(expr1());

      const expr2 = PredicateBuilder.New<string>(() => false);
      assert.isFalse(expr2());
    });
    it('with chained expression', () => {
      const expr1 = PredicateBuilder.New<string>(() => true);
      const expr2 = PredicateBuilder.New<string>(expr1);
      assert.isTrue(expr2());
    });
  });
});

describe('PredicateExpression', () => {
  describe('#And', () => {
    it('basic usage', () => {
      const expr = PredicateBuilder.New<string>();
      assert.isFalse(expr('hi'));

      expr.And(x => typeof x == 'string');
      assert.isTrue(expr('hi'));
    });
    it('chaining', () => {
      const expr = PredicateBuilder.New<number>()
        .And(x => x > 0)
        .And(x => x % 2 == 0);

      assert.isFalse(expr(0));
      assert.isTrue(expr(2));
      assert.isFalse(expr(5));
    });
  });

  describe('#Or', () => {
    it('basic usage', () => {
      const expr = PredicateBuilder.New<number>()
        .Or(x => x > 10);

      assert.isFalse(expr(5));
      assert.isTrue(expr(15));
    });
    it('chaining', () => {
      const expr = PredicateBuilder.New()
        .And(x => typeof x == 'string')
        .And(x => x.startsWith('foo'));

      assert.isFalse(expr(0));
      assert.isFalse(expr(true));
      assert.isTrue(expr('foo'));
      assert.isTrue(expr('foobar'));
    });
  });

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
});
