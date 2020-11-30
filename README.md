InterLINQed
=============

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/ifaxity/interlinqed/Test%20and%20Deploy?style=for-the-badge&logo=github)](https://github.com/iFaxity/interlinqed/actions)
[![Codecov](https://img.shields.io/codecov/c/github/ifaxity/interlinqed?style=for-the-badge&logo=codecov)](https://codecov.io/gh/iFaxity/interlinqed)
[![Codacy grade](https://img.shields.io/codacy/grade/e723a0514a1843e584c7f44fb29d3c63?style=for-the-badge&logo=codacy)](https://app.codacy.com/manual/iFaxity/interlinqed/dashboard)
[![npm](https://img.shields.io/npm/v/interlinqed?style=for-the-badge&logo=npm)](https://npmjs.org/package/interlinqed)

A functional implementation of LINQ in TypeScript, inspired by [linq-ts](https://www.npmjs.com/package/linqts).

So why use this package over linq-ts?
Well if you use linq-ts there is no tree shake support at all since it uses classes.
Which amounts up to 7.4kb minified code (according to bundlephobia).
7.4kb of code just for transforming lists is a bit much in the modern web, if you do not use everything from the library.

Well this package is funtional and therefore fully tree shaken, which decreases the bundle size to mere bytes if you only use a handful of functions.

However to fully support TypeScript this is a functional library that uses a chaining method to chain together the different functions, hence the name **interlinqed**, check the [examples](#examples) section for more specific details.

The target browsers are IE9+ or any ES5 compatible browser version.

Installation
--------------------------
`$ npm i interlinqed`

or if you use yarn

`$ yarn add interlinqed`

API
--------------------------

```js
import { Linq } from 'interlinqed';
```

Examples
--------------------------

```js
import { Linq, Where, Select, OrderBy, ThenByDescending } from 'interlinqed';

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

const result = Linq(pets,
  list => Where(list, pet => pet.age > 3),
  list => OrderBy(list, pet => pet.age,
    ThenByDescending(pet => pet.name)
  ),
  list => Select(list, pet => ([ pet.name, pet.age ]))
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

The typedoc are available [here](https://ifaxity.github.io/interlinqed).

Testing
--------------------------

```sh
$ npm run test
```

License
--------------------------

[MIT](./LICENSE)



