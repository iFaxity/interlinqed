import { Operation, Enumerable, Key } from '../core';
import { select, pipe, where } from '../projection';

export interface Group<TKey, TElement> extends Enumerable<TElement> {
  key: TKey;
}

function createGroup<TKey, TElement>(iter: Enumerable<TElement>, key: TKey): Group<TKey, TElement> {
  const group = iter as Group<TKey, TElement>;

  return Object.defineProperty(group, 'key', {
    value: key,
    writable: false,
  });
}

/**
 * Groups the elements of an array according to a specified key selector function.
 * @param keySelector - A function to extract the key for each element.
 * @param resultSelector - A function to create a result value from each group.
 * @returns An object of elements of type TResult where each element represents a projection over a group and its key.
 */
export function groupBy<T, TKey>(keySelector: Key<T>): Operation<T, Group<TKey, T>>
export function groupBy<T, TKey, TResult>(keySelector: Key<T, TKey>, resultSelector: (element: T) => TResult): Operation<T, Group<TKey, TResult>>
export function groupBy<T, TKey, TResult>(keySelector: Key<T, TKey>, resultSelector?: (element: T) => TResult): Operation<T, Group<TKey, TResult>> {
  if (typeof resultSelector != 'function') {
    resultSelector = (x) => x as any;
  }

  return function*(source) {
    const seen = new Set<TKey>();

    for (let item of source) {
      const key = keySelector(item);

      if (!seen.has(key)) {
        const iter = pipe(
          where<T>(x => key === keySelector(x)),
          select(x => resultSelector(x))
        )(source);
        const group = createGroup(iter, key);

        seen.add(key);

        yield group;
      }
    }
  };
}
