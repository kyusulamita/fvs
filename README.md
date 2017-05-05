# Welcome to FVS (Fullstack Version System)
#### (...suggestions for better names are always welcome)

## Part 0 - Set up

* `npm install` (or [`yarn install`](https://yarnpkg.com/en/))
* Open the `.spec` of your choice and remove the `x` from `xdescribe`, so that it just says `describe`
* `npm test` to run all test specs once.
  * You can run the tests in watch-mode with `npm run test-watch`
  * You can run only a specific test suite by saying:
    * `npm run test-1` to only run `1-functional-linked-list`
    * `npm run test-2` to only run `2-fullstack-version-system`
    * (Note: both will run in watch mode)

## Part 1 - Functional Linked List

For this exercise, you will be implementing an immutable linked list!

The specs are located in `1-functional-linked-list/list.spec.js`.
You will work out of `1-functional-linked-list/list.js`

The `1-functional-linked-list/helpers` directory contains a few utility functions used by the test specs - do not edit these.

## Part 2 - Fullstack Version System

For this exercise, you will implement several of the basic commands in Git.
You'll create Git-like "objects" that can actually be used for version control.

The specs are located in `2-fullstack-version-system/fvs.spec.js`
You'll work out of `2-fullstack-version-system/fvs.js`

The `2-fullstack-version-system/helpers` directory contains utilities to make the command line operations work,
as well as a utility function that you'll use when you implement commit

## Review material

### Immutable DS
* https://facebook.github.io/immutable-js/#the-case-for-immutability
* https://medium.com/@dtinth/immutable-js-persistent-data-structures-and-structural-sharing-6d163fbd73d2

### Git
* https://www.youtube.com/watch?v=fCtZWGhQBvo
* http://gitlet.maryrosecook.com/
* https://www.jayway.com/2013/03/03/git-is-a-purely-functional-data-structure/

### Slides

- http://slides.com/tomkelly-1/git-internals
- http://slides.com/tomkelly-1/immutable-ds

### Review Videos

More Recent
- [Immutable Lecture](https://youtu.be/Bo5PWFzD5SI)
- [Immutable Data Structures Review](https://youtu.be/zBnGh8oGlow)
- [Git Internals Lecture](https://youtu.be/RX8FBn36-JU)
- [Git Internals Review](https://youtu.be/azuCqmK1ES0)

Older
- [Immutable Lecture](https://www.youtube.com/watch?v=djndeiamU4Q)
- [Immutable Data Structures Review](https://www.youtube.com/watch?v=XREbkRSlZ9M)
- [Git Internals Lecture](https://www.youtube.com/watch?v=2P2sVH3LY0c)
- [Git Internals Review](https://www.youtube.com/watch?v=pC9vPJxs1kQ)
