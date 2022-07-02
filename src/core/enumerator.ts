export interface Enumerator<T> {
  current?: T;
  moveNext(): boolean;
}

export function enumerate<T>(iter: Iterable<T>): Enumerator<T> {
  const iterator = iter[Symbol.iterator]();

  const self: Enumerator<T> = {
    moveNext() {
      const res = iterator.next();

      self.current = res.value;
      return !res.done;
    },
  };

  return self;
}
