const square = require('./square');

function hypotenuse(side1, side2) {
  return Math.sqrt(square(side1) + square(side2));
}

module.exports = hypotenuse;
