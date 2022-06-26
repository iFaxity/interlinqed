import { Comparison, Enumerable } from './types';

/**
 * Swap the indexes in the array
 * @param list 
 * @param left 
 * @param right 
 */
function swap<T>(list: T[], left: number, right: number): void {
  if (left !== right) {
    [list[left], list[right]] = [list[right], list[left]];
  }
}

/**
 * Sort partition
 * @param list 
 * @param start 
 * @param end 
 * @param comparers 
 * @returns 
 */
function partition<T>(list: T[], comparers: Comparison<T>[], start: number, end: number): number {
  // Last element will be the pivot and the first element the pointer
  const pivot = list[end];
  let ptr = start;

  for (let idx = start; idx < end; idx++) {
    for (let comparer of comparers) {
      const res = comparer(list[idx], pivot);

      if (res < 0 || res > 0) {
        if (res < 0) {
          // Swapping values smaller than the pivot to the front
          swap(list, idx, ptr++);
        }

        break;
      }
    }
  }

  // Finally swapping the last element with the pointer indexed number
  swap(list, ptr, end);
  return ptr;
}


// With this function we will be utilizing the above code to obtain the pointer
// at which the left values are all smaller than the number at pointer index and vice versa
// for the right values.
function quicksortRecursive<T>(list: T[], comparers: Comparison<T>[], start: number, end: number): T[] {
  // Terminating Condition for recursion. VERY IMPORTANT!
  if (list.length <= 1) {
    return list;
  }

  if (start < end) {
    // First find pivot
    const pivot = partition(list, comparers, start, end);

    // Recursively sorting the left items
    quicksortRecursive(list, comparers, start, pivot - 1);

    // Recursively sorting the right items
    quicksortRecursive(list, comparers, pivot + 1, end);
  }

  return list;
}

export function quicksort<T>(iter: Enumerable<T>, ...comparers: Comparison<T>[]): T[] {
  const list = Array.from(iter);

  return quicksortRecursive(list, comparers, 0, list.length - 1);
}
