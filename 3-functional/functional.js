'use strict';

///// Array methods /////

const map = function (predicateFn, array) {

};

const filter = function (predicateFn, array) {

};

const reduce = function (predicateFn, accumulator, array) {

};

///// Curry /////

const curry = function (fn) {

};

///// Compose /////

const compose = function (...fns) {

};

///// Using Compose /////

// These two functions are here for you to use with `compose`!
// You will also use the `map` function that you wrote

///////////////////////////////////////
const upperCase = function (string) {
  return string.toUpperCase();
};

const exclaim = function (string) {
  return string + '!';
};

const shift = function (array) {
  return array.slice(1);
};
///////////////////////////////////////

const shout = null;
const shoutAtShifted = null;

///// Maybe /////

const Maybe = function (value) {

};

module.exports = {
  map,
  filter,
  reduce,
  curry,
  compose,
  shout,
  shoutAtShifted,
  Maybe
};
