import { describe, it, expect } from 'vitest';
import { forEach } from './forEach';

describe.concurrent('#forEach()', () => {
  it('test1', () => {
    let idx = 0;
    const items = [ 'abc', true, '123', {} ];

    forEach((x, i) => {
      expect(i).toEqual(idx++);
      expect(x).toEqual(items[i]);
    })(items);
  });
});
