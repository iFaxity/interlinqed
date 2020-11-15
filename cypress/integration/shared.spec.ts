import { assert } from 'chai';
import { toNumber, isObject, isOrderedList, deepEqual, stableSort, ORDERED_KEY } from '../../src/shared';

describe('Shared functions', () => {
  describe('#toNumber()', () => {
    it('with number', () => {
      assert.equal(toNumber(100), 100);
    });
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

  describe('#isOrderedList()', () => {
    it('', () => {});
    it('', () => {});
    it('', () => {});
  });

  describe('#deepEqual()', () => {
    it('', () => {});
    it('', () => {});
    it('', () => {});
  });

  describe('#stableSort()', () => {
    it('', () => {});
    it('', () => {});
    it('', () => {});
  });
});
