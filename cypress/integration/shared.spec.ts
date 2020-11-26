import { assert } from 'chai';
import { toNumber, isObject, deepEqual, stableSort } from '../../src/shared';

describe('Shared functions', () => {
  describe('#toNumber()', () => {
    it('with number', () => assert.equal(toNumber(100), 100));
    it('with string', () => {
      assert.equal(toNumber('100'), 100);
      assert.equal(toNumber('-20.5'), -20.5);
      assert.isNaN(toNumber('es2015'));
    });
    it('with boolean', () => {
      assert.equal(toNumber(true), 1);
      assert.equal(toNumber(false), 0);
    });
    it('with object', () => {
      assert.isNaN(toNumber({}));
      assert.equal(toNumber({ valueOf: () => -500 }), -500);
    });
    it('with array', () => {
      assert.equal(toNumber([]), 0);
      assert.equal(toNumber([9]), 9);
      assert.equal(toNumber(['100']), 100);
      assert.isNaN(toNumber(['100', 10]));
    });
  });

  describe('#isObject()', () => {
    it('with object', () => assert.isTrue(isObject({})));
    it('with null', () => assert.isFalse(isObject(null)));
    it('with array', () => assert.isTrue(isObject([])));
    it('with string', () => assert.isFalse(isObject('')));
    it('with number', () => assert.isFalse(isObject(100)));
  });

  describe('#deepEqual()', () => {
    it('test1', () => {
      assert.isTrue(deepEqual({ foo: 'fooz', bar: true, qux: 100 }, { bar: true, qux: 100, foo: 'fooz' }));
    });
    it('test2', () => {
      assert.isTrue(deepEqual([100, false, null, 'hey'], [100, false, null, 'hey']));
    });
    it('test3', () => {
      assert.isTrue(deepEqual({ foo: { bar: { hello: 'hey' } } }, { foo: { bar: { hello: 'hey' } } }));
    });
    it('test4', () => {
      assert.isFalse(deepEqual({ foo: { bar: { hello: 'hey' } } }, { foo: { bar: { hello: 'hey' }, count: 1 } }));
    });
    it('test5', () => {
      assert.isFalse(deepEqual({}, null));
    });
    it('test6', () => {
      assert.isFalse(deepEqual(null, {}));
    });
  });

  describe('#stableSort()', () => {
    it('test1', () => {});
    it('test2', () => {});
    it('test3', () => {});
  });
});
