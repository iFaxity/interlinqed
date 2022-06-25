import { describe, it, expect } from 'vitest';
import { isObject, deepEqual } from './utils';

describe.concurrent('#isObject()', () => {
  it('with empty object', () => {
    const res = isObject({});
    expect(res).toBeTruthy();
  });
  it('with null', () => {
    const res = isObject(null);
    expect(res).toBeFalsy();
  });
  it('with array', () => {
    const res = isObject([]);
    expect(res).toBeTruthy();
  });
  it('with string', () => {
    const res = isObject('hi');
    expect(res).toBeFalsy();
  });
  it('with number', () => {
    const res = isObject(87);
    expect(res).toBeFalsy();
  });
  it('with Map', () => {
    const res = isObject(new Map());
    expect(res).toBeTruthy();
  });
});

describe.concurrent('#deepEqual()', () => {
  it('test1', () => {
    const res = deepEqual({ foo: 'fooz', bar: true, qux: 100 }, { bar: true, qux: 100, foo: 'fooz' });
    expect(res).toBeTruthy();
  });
  it('test2', () => {
    const res = deepEqual([100, false, null, 'hey'], [100, false, null, 'hey']);
    expect(res).toBeTruthy();
  });
  it('test3', () => {
    const res = deepEqual({ foo: { bar: { hello: 'hey' } } }, { foo: { bar: { hello: 'hey' } } });
    expect(res).toBeTruthy();
  });
  it('test4', () => {
    const res = deepEqual({ foo: { bar: { hello: 'hey' } } }, { foo: { bar: { hello: 'hey' }, count: 1 } });
    expect(res).toBeFalsy();
  });
  it('test5', () => {
    const res = deepEqual({}, null);
    expect(res).toBeFalsy();
  });
  it('test6', () => {
    const res = deepEqual(null, {});
    expect(res).toBeFalsy();
  });
});
