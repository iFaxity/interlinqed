import { Key, Comparison, ORDERED_KEY, OrderedList, isOrderedList } from './shared';

/**
 * Generates a Comparison function from a Key, with ascending order
 */
function keyComparisonAsc<T, TReturn>(key: Key<T, TReturn>): Comparison<T> {
  return (a, b) => {
    const x = key(a);
    const y = key(b);
    return x > y ? 1 : (x < y ? -1 : 0);
  };
}

/**
 * Generates a Comparison function from a Key, with descending order
 */
function keyComparisonDesc<T, TReturn>(key: Key<T, TReturn>): Comparison<T> {
  return (a, b) => {
    const x = key(a);
    const y = key(b);
    return x > y ? -1 : (x < y ? 1 : 0);
  };
}

/**
 * Performs a subsequent ordering of the elements in a sequence in ascending order according to a key.
 */
export function ThenBy<T, TReturn = any>(list: T[], key: Key<T, TReturn>): T[] {
  if (isOrderedList(list)) {
    list[ORDERED_KEY].push(keyComparisonAsc(key));
  }
  return list;
}

/**
 * Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.
 */
export function ThenByDescending<T, TReturn = any>(list: T[], key: Key<T, TReturn>): T[] {
  if (isOrderedList(list)) {
    list[ORDERED_KEY].push(keyComparisonDesc(key));
  }
  return list;
}

/**
 * Sorts the elements of a sequence in ascending order according to a key.
 * The sorting is non-deferred but and is executed at once, however only once as every comparer is chained
 */
export function OrderBy<T, TReturn = any>(list: T[], key: Key<T, TReturn>): T[] {
  const res = list as OrderedList<T>;
  res[ORDERED_KEY] = [ keyComparisonAsc(key) ];

  return res;
}

/**
 * Sorts the elements of a sequence in descending order according to a key.
 * The sorting is non-deferred but and is executed at once, however only once as every comparer is chained
 */
export function OrderByDescending<T, TReturn = any>(list: T[], key: Key<T, TReturn>): T[] {
  const res = list as OrderedList<T>;
  res[ORDERED_KEY] = [ keyComparisonDesc(key) ];

  return res;
}
