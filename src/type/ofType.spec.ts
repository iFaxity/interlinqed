import { describe, it, expect } from 'vitest';
import { ofType } from './ofType';

describe.concurrent('#ofType()', () => {
  class Foo {}
  class Bar {}

  it('test1', () => {
    const list = [ false, 'foo', 'bar', 10, null, true, 'baz' ];
    const res = [ ...ofType(String)(list) ];

    expect(res).toEqual([ 'foo', 'bar', 'baz' ]);
  });
  it('test2', () => {
    const list = [ false, 'foo', 'bar', 10, null, 'baz' ];
    const res = [ ...ofType(Number)(list) ];

    expect(res).toEqual([ 10 ]);
  });
  it('test3', () => {
    const list = [ false, 'foo', 'bar', 10, null, true, 'baz', false ];
    const res = [ ...ofType(Boolean)(list) ];

    expect(res).toEqual([ false, true, false ]);
  });
  it('test4', () => {
    const foo1 = new Foo();
    const foo2 = new Foo();
    const bar1 = new Bar();
    const obj1 = {};
    const obj2 = Object.create(null);
    const list = [ false, foo1, bar1, 10, null, foo2, obj1, foo1, true, obj2, 'baz' ];

    const res = [ ...ofType(Foo)(list) ];

    expect(res).toEqual([ foo1, foo2, foo1 ]);
  });
  it('test5', () => {
    const res = [ ...ofType(String)([]) ];

    expect(res).toEqual([]);
  });
  it('test6', () => {
    const res = [ ...ofType<any, any>(BigInt)([100n, 100, 20, 'test', true, 200n, false, null, {}]) ];

    // BigInt not yet supported...
    expect(res).toEqual([]);
  });
});
