import { linq, select, where, distinct, toArray } from './index';

const input = [ 'test', 'lel', 'keksz', 'kaga', 'tåerta', 'hahalel', 'halalas' ];

const res = linq(
  input,
  select(x => x.length),
  where(x => x > 3),
  //distinct(),
  toArray(),
);

console.log(res);
