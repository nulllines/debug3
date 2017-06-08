# debug3

[![npm version](https://badge.fury.io/js/debug3.svg)](https://badge.fury.io/js/debug3) [![Build Status](https://travis-ci.org/nulllines/debug3.svg?branch=master)](https://travis-ci.org/nulllines/debug3) [![Coverage Status](https://coveralls.io/repos/github/nulllines/debug3/badge.svg?branch=master)](https://coveralls.io/github/nulllines/debug3?branch=master) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bhttps%3A%2F%2Fgithub.com%2Fnulllines%2Fdebug3.svg?type=shield)](https://app.fossa.io/projects/git%2Bhttps%3A%2F%2Fgithub.com%2Fnulllines%2Fdebug3?ref=badge_shield) [![Greenkeeper badge](https://badges.greenkeeper.io/nulllines/debug3.svg)](https://greenkeeper.io/)


A tiny debugging wrapper on top of [debug](https://www.npmjs.com/package/debug)

The main difference is that `debug3` accepts functions as arguments and does not execute them unless it will output something (ie `process.env.DEBUG` is set to the relevant value). 
 
This saves valuable processing resources that may have been used to create  debug output that might not even be displayed.
 
Bonus: Package name of the calling module is prefixed to the debug message (can be turned off) 

## Installation

```bash
$ npm install debug3
```

## Usage

`debug3` exposes a function; simply pass this function a namespace, and it will return a decorated version of `console.error` for you to pass debug statements to.

Pass this resulting function any type of object, including functions.

## Example

(In these examples package.json has a name of `super-server` which you can see in the output)

Basic Example

```js
const debug = require('debug3')('http');

debug('This is a debug test!', [1, 2, 3]);
// Output: **super-server:http** This is a debug test! [1, 2, 3]

```

Passing a function

```js
const debug = require('debug3')('http');

// ES6
debug('This is a debug test!', () => [1, 2, 3]);
// Output: **super-server:http** This is a debug test! [1, 2, 3]

// ES5
debug('This is a debug test!', function() { return [1, 2, 3] });
// Output: **super-server:http** This is a debug test! [1, 2, 3]

```

Turning off the package name prefix

```js
const debug = require('debug3')('http', {prefix: false});

debug('This is a debug test!', [1, 2, 3]);
// Output: **http** This is a debug test! [1, 2, 3]

```

## Comparison 

Original [debug](https://www.npmjs.com/package/debug)

```js
const debug = require('debug')('http');

debug('This is a debug test!', [1, 2, 3], JSON.stringify(largefile));
// With process.env.DEBUG === 'super-server:*'
// Output: **super-server:http** [1, 2, 3], {"large-json-file": [1111212,2232323,4435353....
// Time taken: 500ms

debug('This is a debug test!', [1, 2, 3], JSON.stringify(largefile));
// With process.env.DEBUG === undefined
// Output: <empty>
// Time taken: 500ms
               ^^^^^!!!!

```

With [debug3](https://www.npmjs.com/package/debug3)
 
```js
const debug = require('debug3')('http');

debug([1, 2, 3], () => JSON.stringify(largefile));
// With process.env.DEBUG === 'super-server:*'
// Output: **super-server:http** [1, 2, 3], {"large-json-file": [1111212,2232323,4435353....
// Time taken: 500ms

debug([1, 2, 3], () => JSON.stringify(largefile));
// With process.env.DEBUG === undefined
// Output: <empty>
// Time taken: 0ms
               ^^^ thats more like it!

```





## Why debug3?
 
Because [debug2](https://www.npmjs.com/package/debug2) was taken :)

## License

MIT. See LICENSE file
