InterLINQed
=============

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/ifaxity/interlinqed/Test%20and%20Deploy?style=for-the-badge&logo=github)](https://github.com/iFaxity/interlinqed/actions)
[![Codecov](https://img.shields.io/codecov/c/github/ifaxity/interlinqed?style=for-the-badge&logo=codecov)](https://codecov.io/gh/iFaxity/interlinqed)
[![Codacy grade](https://img.shields.io/codacy/grade/e723a0514a1843e584c7f44fb29d3c63?style=for-the-badge&logo=codacy)](https://app.codacy.com/gh/iFaxity/interlinqed/dashboard)
[![npm](https://img.shields.io/npm/v/interlinqed?style=for-the-badge&logo=npm)](https://npmjs.org/package/interlinqed)

A functional implementation of LINQ in TypeScript using iterators, inspired by [linq-ts](https://www.npmjs.com/package/linqts).

So why use this package over linq-ts?
Well if you use linq-ts there is no tree shake support at all since it uses classes.
Which amounts up to 7.4kb minified code (according to bundlephobia).
7.4kb of code just for transforming lists is a bit much in the modern web, if you do not use everything from the library.

This package is based on pure functions and therefore supports tree-shaking, which decreases the bundle size to mere bytes if you only use a handful of functions.

However to fully support TypeScript this is a pure-function library that uses a chaining method to chain together the different functions, hence the name **interlinqed**, check the [examples](#examples) section for more specific details.

The functions can be used on their own but it is easier to use the linq helper to automatically resolve types and chain the methods correctly.

The target browsers are any ES6 compatible browser version as the package uses Generators.
Use 1.x.x if support for an older browser is required (IE9+).

Installation
--------------------------
`$ npm i interlinqed`

or if you use yarn

`$ yarn add interlinqed`

API
--------------------------

```js
import { linq } from 'interlinqed';
```

Examples
--------------------------

```js
import { linq, where, select, orderBy, thenByDescending, toArray } from 'interlinqed';

const pets = [
  { name: 'Barley', age: 8 },
  { name: 'Boots', age: 4 },
  { name: 'Whiskers', age: 1 },
  { name: 'Daisy', age: 4 },
  { name: 'Lyric', age: 7 },
  { name: 'Troy', age: 3 },
  { name: 'Teddy', age: 1 },
  { name: 'Hogan', age: 12 },
];

const result = linq(pets,
  where(pet => pet.age > 3),
  orderBy(pet => pet.age),
  thenByDescending(pet => pet.name),
  select(pet => ([ pet.name, pet.age ])),
  toArray(),
);

/*
result = [
  [ 'Daisy', 4 ],
  [ 'Boots', 4 ],
  [ 'Lyric', 7 ],
  [ 'Barley', 8 ],
  [ 'Hogan', 12 ],
];
*/

```

Docs
--------------------------

The typedoc is available [here](https://ifaxity.github.io/interlinqed).
Only available for the latest version.

Testing
--------------------------

```sh
$ npm run test
```

License
--------------------------

[MIT](./LICENSE)



