# Type Comparator

Useful comparator functions written on Typescript

## Table of Contents

  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Support](#support)
  - [Contributing](#contributing)

## Installation

```sh
npm i type-comparator
```

## Usage

### asc, desc

`asc` is simple comparator contains just base comparison logic. 

It works well with numbers...

```typescript
const array = [17, 4, -17, 42, -3, 0];

array.sort(asc); // [-17, -3, 0, 4, 17, 42]
```

And with strings...

```typescript
const array = ['aaa', 'bax', 'a', 'x', 'ax', 'ab', 'ba', 'bx'];

array.sort(asc); // ["a", "aaa", "ab", "ax", "ba", "bax", "bx", "x"]
```

Even with dates...

```typescript
const array = [new Date(2018, 0, 1), new Date(2017, 0, 1), new Date(2019, 0, 1)];

array.sort(asc); // [Date(2017, 0, 1), Date(2018, 0, 1), Date(2019, 0, 1)]
```

Actually it works well with everything comparable by `>` and `<`. 

**NOTE** Every values which are neither `>` nor `<` are equal.

As you can see below, the initial order remains. If you want to sort by value of some item property, take a look on `map` function.

```typescript
var array1 = [{a: 1}, {a: 5}];
var array2 = [{a: 5}, {a: 1}];

array1.sort(asc); // [{a: 1}, {a: 5}]
array2.sort(asc); // [{a: 5}, {a: 1}]
```

*To Be Continued*

## Support

Please [open an issue](https://github.com/lightness/type-comparator/issues/new) for support.

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, and [open a pull request](https://github.com/fraction/readme-boilerplate/compare/).