
<img src="https://pp.userapi.com/c852036/v852036486/bbce5/DCotw_jzAKo.jpg" width="100" alt="Logo" align="right" />

<a href="https://www.npmjs.com/package/type-comparator">
    <img src="https://img.shields.io/npm/v/type-comparator.svg?style=flat" alt="NPM Version" />
</a>
<a href="https://www.npmjs.com/package/type-comparator">
    <img src="https://img.shields.io/npm/l/type-comparator.svg?style=flat" alt="Package License" />
</a>
<a href="https://www.npmjs.com/package/type-comparator">
    <img src="https://img.shields.io/npm/dm/type-comparator.svg?style=flat" alt="NPM Downloads" />
</a>
<a href="https://travis-ci.org/lightness/type-comparator">
    <img src="https://img.shields.io/travis/lightness/type-comparator.svg?style=flat" alt="Travis" />
</a>
<a href="https://codecov.io/gh/lightness/type-comparator">
    <img src="https://img.shields.io/codecov/c/github/lightness/type-comparator.svg?style=flat" alt="Travis" />
</a>

# Type Comparator

Useful comparator functions written on Typescript (But you can use it on your JS project)

<img src="https://pp.userapi.com/c847124/v847124060/1bc6cf/t_jixj5HLK4.jpg" width="730" alt="Image" align="center" />

## Table of Contents

- [Type Comparator](#type-comparator)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Base comparators: `asc` and `desc`](#base-comparators-asc-and-desc)
    - [Functional way](#functional-way)
      - [Function `reverse(comparator)`](#function-reversecomparator)
      - [Function `map(mapper, comparator)`](#function-mapmapper-comparator)
      - [Function `condition(conditionFn, comparatorA, comparatorB)`](#function-conditionconditionfn-comparatora-comparatorb)
      - [Function `queue(comparators)`](#function-queuecomparators)
    - [Chaining way](#chaining-way)
      - [Basic usage](#basic-usage)
      - [Chain `.reverse()`](#chain-reverse)
      - [Chain `.map(mapper)`](#chain-mapmapper)
      - [Chain `.if(conditionFn)`](#chain-ifconditionfn)
      - [Chain `.then(comparator)`](#chain-thencomparator)
      - [Chain `.elif(conditionFn)`](#chain-elifconditionfn)
      - [Chain `.else(comparator)`](#chain-elsecomparator)
      - [Chain `.use(comparators)`](#chain-usecomparators)
    - [Something more complex?... Ok!](#something-more-complex-ok)
    - [Q&A](#qa)
  - [Support](#support)
  - [Contributing](#contributing)

## Installation

```sh
npm i type-comparator
```

## Usage

### Base comparators: `asc` and `desc` 

`asc` is simple comparator contains just base comparison logic. 

It works well with numbers...

```ts
const array = [17, 4, -17, 42, -3, 0];

// [-17, -3, 0, 4, 17, 42]
array.slice().sort(asc); 
// [42, 17, 4, 0, -3, -17]
array.slice().sort(desc); 
```

And with strings...

```ts
const array = ['aaa', 'bax', 'a', 'x', 'ax', 'ab', 'ba', 'bx'];

// ["a", "aaa", "ab", "ax", "ba", "bax", "bx", "x"]
array.slice().sort(asc); 
// ["x", "bx", "bax", "ba", "ax", "ab", "aaa", "a"]
array.slice().sort(desc);
```

Even with dates...

```ts
const array = [new Date(2018, 0, 1), new Date(2017, 0, 1), new Date(2019, 0, 1)];

// [Date(2017, 0, 1), Date(2018, 0, 1), Date(2019, 0, 1)]
array.slice().sort(asc); 
// [Date(2019, 0, 1), Date(2018, 0, 1), Date(2017, 0, 1)]
array.slice().sort(desc);
```

Actually it works well with everything comparable by `>` and `<`. 

**NOTE** Every values which are neither `>` nor `<` are equal.

As you can see below, the initial order remains. If you want to sort by value of some item property, take a look on `map` function.

```ts
var array1 = [{a: 1}, {a: 5}];
var array2 = [{a: 5}, {a: 1}];

array1.slice().sort(asc);  // [{a: 1}, {a: 5}]
array2.slice().sort(asc);  // [{a: 5}, {a: 1}]
array1.slice().sort(desc); // [{a: 1}, {a: 5}]
array2.slice().sort(desc); // [{a: 5}, {a: 1}]
```

*****

### Functional way

#### Function `reverse(comparator)`
Just swap comparator args.
```ts
import { asc, cmp, reverse } from 'type-comparator';

const functionalCmp = reverse(asc);
const array = [17, 4, -17, 42, -3, 0];

// [ 42, 17, 4, 0, -3, -17 ]
array.slice().sort(functionalCmp);  
```

#### Function `map(mapper, comparator)`
Maps each args with `mapper` and apply `comparator`.

```ts
import { asc, cmp, map } from 'type-comparator';

const mapper = x => x.a;
const comparator = map(mapper, asc);
const array = [{ a: 15 }, { a: 5 }];

// [ { a: 5 }, { a: 15 } ]
array.slice().sort(comparator);
```

#### Function `condition(conditionFn, comparatorA, comparatorB)`
Has following logic:
 - Applies `comparatorA`, if both args satisfy `conditionFn`.
 - Applies `comparatorB`, if both args do not satisfy `conditionFn`.
 - Returns positive value, if only first arg satisfies `conditionFn`.
 - Returns negative value, if only second arg satisfies `conditionFn`.

```ts
import { asc, cmp, condition } from 'type-comparator';

const conditionFn = x => x % 2 === 0;
const comparator = condition(conditionFn, asc, desc);
const array = [17, 4, -17, 42, -3, 0];

// [ 17, -3, -17, 0, 4, 42 ]
array.slice().sort(comparator);
```

#### Function `queue(comparators)`
Applies first comparator from `comparators`. 
 - If comparator returns non-zero value, returns it as result.
 - If comparator returns `0`, apply next comparator from `comparators`. 
 - If there is no more comparator in `comparators` list, returns `0`.

```ts
import { asc, cmp, desc, map, queue } from 'type-comparator';

const comparator = queue([
    map(x => x.name, asc),
    map(x => x.age, desc),
]);
const array = [
    { name: 'Alex', age: 21 },
    { name: 'Jane', age: 19 },
    { name: 'Alex', age: 26 },
];

// [ 
//    { name: 'Alex', age: 26 },
//    { name: 'Alex', age: 21 },
//    { name: 'Jane', age: 19 } 
// ]
array.slice().sort(comparator);
```

******

### Chaining way

#### Basic usage
`cmp()` - just starts chaining.
`.use(comparator)` - applies comparator and terminates chaining.

**Note:** `use()` chain can work with any comparator function (not only produced by `type-comparator`)

```ts
import { asc, cmp } from 'type-comparator';

// same as just `asc` function
const comparator1 = cmp().use(asc);

// works like `asc` but just for numbers
const comparator2 = cmp().use((a, b) => a - b); 

// not a lot of sense, but it's possible
const comparator3 = cmp().use(comparator1); 
```

#### Chain `.reverse()`

```ts
import { asc, cmp, reverse } from 'type-comparator';

const comparator = cmp().reverse().use(asc);
const array = [17, 4, -17, 42, -3, 0];

// [ 42, 17, 4, 0, -3, -17 ]
array.slice().sort(comparator);
```
#### Chain `.map(mapper)`

```ts
import { asc, cmp, map } from 'type-comparator';

const mapper = x => x.a;
const comparator = cmp().map(mapper).use(asc);
const array = [{ a: 15 }, { a: 5 }];

// [ { a: 5 }, { a: 15 } ]
array.slice().sort(comparator);
```

#### Chain `.if(conditionFn)`
Checks `conditionFn` for each arg. 
 - Applies next `.then` chain, if both args satisfy `conditionFn`.
 - Applies next `.else`/`.elif` chain, if both args do not satisfy `conditionFn`.
 - Returns positive value, if only first arg satisfies `conditionFn`.
 - Returns negative value, if only second arg satisfies `conditionFn`.

**Note:** After `.if()` chain, only `.then` chain is available.
```ts
import { asc, cmp } from 'type-comparator';

const conditionFn = x => x % 4 === 0;
const conditionFn2 = x => x % 2 === 0;
const chainingCmp = cmp()
    .if(conditionFn).then(asc)
    .elif(conditionFn2).then(asc)
    .else(asc);
const array = [17, 4, -17, 42, -3, 0];

// [ -17, -3, 17, 42, 0, 4 ]
array.slice().sort(chainingCmp);
```

#### Chain `.then(comparator)`
Applies `comparator`, if condition from previous `.if()`chain satisfies for both args.

**Note:** After `.then()` chain, only `.elif()` or `.else()` chains are available.
**Note:** `.then()` chain is available only after `.if()` or `.elif()` chains.

#### Chain `.elif(conditionFn)`
Works same `.if()` chain.

**Note:** After `.elif()` chain, only `.then()` chain is available.
**Note:** `.elif()` chain is available only after `.then()` chain.

#### Chain `.else(comparator)`
Applies `comparator`, if both args do not satisfy comparators from previous `.if()`/`.elif` chains.

**Note:** `.else()` chain is available only after `.then()` chain.
**Note:** `.else()` chain finishes chaining and returns result comparator function.

#### Chain `.use(comparators)` 
Works same as `queue(comparators)` and terminates chaining.

```ts
import { asc, cmp, desc } from 'type-comparator';

const comparator = cmp().use([
    cmp().map(x => x.name).use(asc),
    cmp().map(x => x.age).use(desc),
]);
const array = [
    { name: 'Alex', age: 21 },
    { name: 'Jane', age: 19 },
    { name: 'Alex', age: 26 },
];

// [ 
//    { name: 'Alex', age: 26 },
//    { name: 'Alex', age: 21 },
//    { name: 'Jane', age: 19 } 
// ]
array.slice().sort(comparator);    
```

*********************************

### Something more complex?... Ok!
```ts
import { asc, cmp, desc } from 'type-comparator';

const comparator = cmp()
    .map(x => x.a)
    .use([
        cmp()
            .map(x => x.b)
            .use(desc),
        cmp()
            .if(x => (x.b + x.c) % 2 === 0)
            .map(x => x.c)
            .use(asc),
    ]);

const array = [
    { a: { b: 1, c: 7 } },
    { a: { b: 1, c: 6 } },
    { a: { b: 1, c: 5 } },
    { a: { b: 1, c: 4 } },
    { a: { b: 1, c: 3 } },
    { a: { b: 3, c: 2 } },
];

// [
//     { a: { b: 3, c: 2 } },
//     { a: { b: 1, c: 4 } },
//     { a: { b: 1, c: 6 } },
//     { a: { b: 1, c: 3 } },
//     { a: { b: 1, c: 5 } },
//     { a: { b: 1, c: 7 } },
// ]
array.slice().sort(comparator);
```

****
### Q&A

**Q:** Should `reverse(cmp)` be equals to reversed array with `cmp` ?

**A:** In general, it should not. 
`Array.prototype.reverse` just reverse all elements order, regardless its values.
When comparator suppose both values are equal, it returns `0`. And these elements save original order.

```ts
const array = [1, 2, 4];
const comparator = cmp().map(x => x % 2 === 0).use(asc);

// [2, 4, 1]
array.slice().sort(reverse(comparator));

// [4, 2, 1]
array.slice().sort(comparator).reverse();
```


## Support

Please [open an issue](https://github.com/lightness/type-comparator/issues/new) for support.

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, and [open a pull request](https://github.com/lightness/type-comparator/compare/).
