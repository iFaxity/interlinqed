import { describe, it, expect } from 'vitest';
import { enumerate } from './enumerator';

describe.concurrent('enumerate tests', () => {
  const list = [ 'foo', 'bar', 'baz' ];

  function* iterator() {
    yield* list;
  }

  it('enumerate array', (ctx) => {
    const e = enumerate(list);

    expect(e.current).toBeUndefined();

    const res = e.moveNext();

    expect(res).toBeTruthy();
    expect(e.current).toBe('foo');
  });

  it('enumerate iterable', (ctx) => {
    const e = enumerate(iterator());

    expect(e.current).toBeUndefined();

    const res = e.moveNext();

    expect(res).toBeTruthy();
    expect(e.current).toBe('foo');
  });
});
