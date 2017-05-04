'use strict';

const { expect } = require('chai');
const { spy } = require('sinon');

// your code is in here
const Functional = require('./functional');

xdescribe('Functional programming', () => {

  const numbers = [1, 2, 3, 4, 5];
  const words = ['Cody', 'is', 'a', 'pug'];
  const emptiness = [];

  describe('Array methods', () => {

    const doNothing = function (item) {
      return item;
    };

    const addOne = function (number) {
      return number + 1;
    };

    const onlyEvens = function (number) {
      return number % 2 === 0;
    };

    describe('map', () => {

      const { map } = Functional;

      it('returns a NEW array', () => {
        const resultArray = map(doNothing, numbers);

        expect(resultArray).to.be.an('array');
        expect(resultArray === numbers).to.be.equal(false);
      });

      it('returns a new array with the result of invoking the predicate function on each element of the original array', () => {
        const resultArray = map(addOne, numbers);

        expect(resultArray).to.be.an('array');

        numbers.forEach((number, idx) => {
          expect(resultArray[idx]).to.be.equal(number + 1);
        });
      });

      it('works with empty arrays', () => {
        const resultArray = map(addOne, emptiness);

        expect(resultArray).to.be.an('array');
        expect(resultArray === emptiness).to.be.equal(false);
      });

    }); // end describe('map')

    describe('filter', () => {

      const { filter } = Functional;

      it('returns a NEW array', () => {
        const resultArray = filter(doNothing, numbers);

        expect(resultArray).to.be.an('array');
        expect(resultArray === numbers).to.be.equal(false);
        expect(resultArray.length === numbers.length).to.be.equal(true);
      });

      it('returns a new array that only contains elements that evaluated as true for the predicate function', () => {
        const resultArray = filter(onlyEvens, numbers);

        expect(resultArray).to.be.an('array');
        expect(resultArray.length).to.be.equal(2);
        expect(resultArray[0]).to.be.equal(2);
        expect(resultArray[1]).to.be.equal(4);
      });

      it('works with empty arrays', () => {
        const resultArray = filter(onlyEvens, emptiness);

        expect(resultArray).to.be.an('array');
        expect(resultArray === emptiness).to.be.equal(false);
        expect(resultArray.length === emptiness.length).to.be.equal(true);
      });

    }); // end describe('filter')

    describe('reduce', () => {

      const { reduce } = Functional;

      const accumulateSum = function (accumulator, nextItem) {
        return accumulator + nextItem;
      };

      const accumulateSentence = function (accumulator, nextItem) {
        // note: the ternary is to ensure that we don't add a space before the first word in the sentence
        return accumulator.length === 0 ? nextItem : accumulator + ' ' + nextItem;
      };

      it('returns the same data type as the accumulator', () => {
        // in this case, the accumulator is 0 (a number)
        const numberResult = reduce(accumulateSum, 0, numbers);
        expect(numberResult).to.be.a('number');

        // in this case, the accumulator is '' (a string)
        const stringResult = reduce(accumulateSentence, '', words);
        expect(stringResult).to.be.a('string');
      });

      it('returns the accumulated result of invoking the predicate on each element and the accumulator', () => {
        const numberResult = reduce(accumulateSum, 0, numbers);
        expect(numberResult).to.be.equal(15);

        const stringResult = reduce(accumulateSentence, '', words);
        expect(stringResult).to.be.equal('Cody is a pug');
      });


      it('works with empty arrays', () => {
        const numberResult = reduce(accumulateSum, 0, []);
        expect(numberResult).to.be.equal(0);

        const stringResult = reduce(accumulateSentence, '', []);
        expect(stringResult).to.be.equal('');
      });

    }); // end describe('reduce')

  }); // end describe('Array methods')

  describe('Function composition', () => {

    const oneArg = function (x) {
      return x * 10;
    };

    const twoArg = function (x, y) {
      return x * y * 10;
    };

    const threeArg = function (x, y, z) {
      return x + y + z;
    };

    describe('curry', () => {

      const { curry } = Functional;

      it('returns a NEW function', () => {
        const newFunc = curry(twoArg);

        expect(newFunc).to.be.a('function');
        expect(newFunc === twoArg).to.be.equal(false);
      });

      describe('the returned function', () => {

        it('when only one argument is left, invokes with the orginal behavior', () => {
          const curriedFunc = curry(oneArg);

          expect(curriedFunc(10)).to.be.equal(100);
        });

        it('when there are still arguments remaining, partially applies that argument and returns a new function', () => {
          const curriedFunc = curry(twoArg);
          const partialFunc = curriedFunc(2);

          expect(partialFunc).to.be.a('function');

          const finalResult = partialFunc(4);

          // 2 * 4 * 10 = 80
          expect(finalResult).to.be.equal(80);
        });

        it('works when there are many original arguments', () => {
          const curriedFunc = curry(threeArg);
          const finalResult = curriedFunc(10)(20)(30);

          expect(finalResult).to.be.equal(60);
        });

        it('can be invoked with multiple arguments at once', () => {
          const curriedFunc = curry(threeArg);
          const finalResult = curriedFunc(10, 20, 30);

          expect(finalResult).to.be.equal(60);
        });

      }); // end describe('the returned function')

    }); // end describe('curry')

    describe('compose', () => {

      const { compose } = Functional;

      const addTen = function (x) {
        return x + 10;
      };

      const multiplyFive = function (x) {
        return x * 5;
      };

      const addMany = function (x, y) {
        return x + y;
      };

      const subtractTwo = function (x) {
        return x - 2;
      };

      it('returns a NEW function', () => {
        const composedFunc = compose(addTen, multiplyFive);

        expect(composedFunc).to.be.a('function');
      });

      it('returns a "composed" function (composed from right to left)', () => {
        // Remember the way that a composed function works?
        // If we have a composed function such that: composedFn = compose(f, g),
        // then composedFn(x) === f(g(x))

        // WARNING: compose works from right to left.
        // It may occur to you that Array.prototype.reverse could be a helpful method...
        // However, there's something sinister about .reverse -- it MUTATES the array it operates on!
        // This is bad news - if you use .reverse, you'll should be careful to avoid that mutation!

        const multiplyThenAdd = compose(addTen, multiplyFive);
        expect(multiplyThenAdd(10)).to.be.equal(60);

        const addThenMultiply = compose(multiplyFive, addTen);
        expect(addThenMultiply(10)).to.be.equal(100);
      });

      it('works when the rightmost function accepts multiple arguments', () => {
        const composedFunc = compose(multiplyFive, addMany);

        expect(composedFunc(3, 4)).to.be.equal(35);
        expect(composedFunc(2, 2)).to.be.equal(20);
      });

      it('works for any number of functions', () => {
        const multiplyThenAddThenSubtract = compose(subtractTwo, addTen, multiplyFive);

        expect(multiplyThenAddThenSubtract(10)).to.be.equal(58);
        expect(multiplyThenAddThenSubtract(5)).to.be.equal(33);
      });


    }); // end describe('compose')

    describe('using compose and curry', () => {

      const { shout, shoutAtShifted } = Functional;

      // Let's practice using compose!
      // Create the following functions (`shout` and `shoutAtShifted`) by composing other functions
      // No method has been implement to make sure that you use compose with the correct functions, so I'll just have to trust you
      // Which is fine - you seem like the trustworthy type :)

      // composing `upperCase` and `exclaim`
      describe('shout', () => {

        it('accepts a string as an argument, and returns a string', () => {
          expect(shout('hello')).to.be.a('string');
        });

        it('retuns a string with all caps and a ! appended', () => {
          expect(shout('hello')).to.be.equal('HELLO!');
        });

      });

      // composing `map` and `shift`
      describe('shoutAtShifted', () => {

        // shoutAtShifted is a bit of a silly function
        // Given an array of strings:                                  ['Cody', 'is', 'a', 'pug']
        // it should shift off the first item of the array:            ['is', 'a', 'pug']
        // and then map through that array with our `shout` function:  ['IS!', 'A!', 'PUG!']
        // To pull off this last step, you'll want to curry your `map` function with `shout`!

        it('accepts an array as an argument, and returns an array', () => {
          expect(shoutAtShifted(words)).to.be.an('array');
        });

        it('returns an array of strings that are uppercase', () => {
          const result = shoutAtShifted(words); // ['IS!', 'A!', 'PUG!']

          // testing the result of joining the return array - it's easier to test this way
          const serializedResult = result.join(' ');
          expect(serializedResult).to.be.equal('IS! A! PUG!');
        });

      });

    }); // end describe('using compose')

  }); // end describe('Function composition')

  describe('Maybe', () => {

    const { Maybe } = Functional;

    const addTen = function (x) {
      return x + 10;
    };

    const makeRandomNumber = function () {
      return Math.floor(Math.random() * 10);
    };

    it('instantiates an object with a __value property', () => {
      const maybe1 = new Maybe(5);
      const maybe2 = new Maybe('pugs');

      expect(maybe1.__value).to.be.equal(5);
      expect(maybe2.__value).to.be.equal('pugs');
    });

    describe('Maybe.of', () => {

      it('exists', () => {
        expect(Maybe.of).to.be.a('function');
      });

      it('returns a new Maybe', () => {
        const maybe = Maybe.of(5);

        expect(maybe instanceof Maybe).to.be.equal(true);
        expect(maybe.__value).to.be.equal(5);
      });

    }); // end describe('Maybe.of')

    describe('Maybe.prototype.isNothing', () => {

      it('exists', () => {
        expect(Maybe.prototype.isNothing).to.be.a('function');
      });

      it('returns true if __value is null or undefined', () => {
        const nothing1 = Maybe.of(null);
        const nothing2 = Maybe.of(undefined);

        expect(nothing1.isNothing()).to.be.equal(true);
        expect(nothing2.isNothing()).to.be.equal(true);
      });

      it('returns false if __value is NOT null or undefined', () => {
        const something1 = Maybe.of('hello');
        const something2 = Maybe.of(100);

        expect(something1.isNothing()).to.be.equal(false);
        expect(something2.isNothing()).to.be.equal(false);
      });

    }); // end describe('Maybe.prototype.isNothing')

    describe('Maybe.prototype.map', () => {

      it('exists', () => {
        expect(Maybe.prototype.map).to.be.a('function');
      });

      it('returns a new Maybe', () => {
        const m1 = Maybe.of(1);
        expect(m1.map(addTen) instanceof Maybe).to.be.equal(true);
      });

      it('invokes the passed in callback with this.__value', () => {
        const spiedAddTen = spy(addTen);
        const randomNumber = makeRandomNumber();
        const m1 = Maybe.of(randomNumber);

        m1.map(spiedAddTen);

        expect(spiedAddTen.called).to.be.equal(true);
        expect(spiedAddTen.calledWith(randomNumber)).to.be.equal(true);
      });

      it('if the Maybe isNothing, returns a new Maybe that is also nothing', () => {
        const m1 = Maybe.of(null);
        const nothing = m1.map(n => n * n);

        expect(nothing.isNothing()).to.be.equal(true);
      });

      it('if the Maybe is not nothing, returns a new Maybe that contains the mapped value', () => {
        const m1 = Maybe.of(5);
        const m2 = m1.map(n => n * n);

        expect(m2.isNothing()).to.be.equal(false);
        expect(m2.__value).to.be.equal(25);
      });

    }); // end describe('Maybe.prototype.map')

    // `chain` is very similar to map - it's use case is to handle callback functions that return Maybes
    // So: if a callback function returns a regular value, you should use .map,
    // and if a callback function returns a Maybe, you should use .chain
    // (this makes it so that you don't end up with nested Maybes - that is, a Maybe with a __value that's also a Maybe)
    describe('Maybe.prototype.chain', () => {

      const randomNumber = makeRandomNumber();

      it('exists', () => {
        expect(Maybe.prototype.chain).to.be.a('function');
      });

      it('invokes .map with the passed in function', () => {
        const maybe = Maybe.of(randomNumber);
        const mapSpy = spy(maybe, 'map');

        const square = function (x) {
          return Maybe.of(x * x);
        };
        const squareSpy = spy(square);

        maybe.chain(squareSpy);

        expect(mapSpy.called).to.be.equal(true);
        expect(squareSpy.called).to.be.equal(true);

        expect(mapSpy.calledWith(squareSpy)).to.be.equal(true);
        expect(squareSpy.calledWith(randomNumber)).to.be.equal(true);
      });

      it('returns the unwrapped value from the Maybe after mapping it (which will be another maybe)', () => {
        const m1 = Maybe.of(randomNumber);
        const m2 = m1.chain(n => Maybe.of(n * n));

        expect(m2.__value).to.be.equal(randomNumber * randomNumber);
      });

    }); // end describe('Maybe.prototype.chain')

    // `ap` (short for `apply`) is similar to `map` and `chain`
    // In this case, you have a Maybe whose __value is a function!
    // `ap` allows you to "apply" that function to another Maybe
    describe('Maybe.prototype.ap', () => {

      const addTen = function (x) {
        return x + 10;
      };

      it('exists', () => {
        expect(Maybe.prototype.ap).to.be.a('function');
      });

      it('returns a new Maybe', () => {
        const m1 = Maybe.of(addTen);
        const m2 = Maybe.of(2);
        expect(m1.ap(m2) instanceof Maybe).to.be.equal(true);
      });

      it('accepts a Maybe as an argument, and invokes .map on the otherMaybe', () => {
        const maybe = Maybe.of(addTen);
        const otherMaybe = Maybe.of(5);
        const mapSpy = spy(otherMaybe, 'map');

        maybe.ap(otherMaybe);

        expect(mapSpy.called).to.be.equal(true);
        expect(mapSpy.calledWith(maybe.__value));
      });

      it('accepts a Maybe as an argument, and returns a new Maybe that has been mapped with this.__value', () => {
        const randomNumber = makeRandomNumber();
        const maybe = Maybe.of(addTen);
        const otherMaybe = Maybe.of(randomNumber);
        const resultMaybe = maybe.ap(otherMaybe);

        expect(resultMaybe.__value).to.be.equal(randomNumber + 10);
      });

    }); // end describe('Maybe.prototype.ap')

  }); // end describe('Maybe')

}); // end describe('Functional programming')
