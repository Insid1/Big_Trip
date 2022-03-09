function getRandomInt(min, max) {
  // if (min < 0 || max < 0) {
  //   return -1;
  // }
  if (min > max) {
    [min, max] = [max, min];
  }
  // to round number up to the next largest integer
  min = Math.ceil(min);
  // to round number to less then or equal number
  max = ~~max;
  const randomFloat = Math.random();
  const randomNumber = ~~(randomFloat * (max - min + 1)) + min;
  return randomNumber;
}

function getRandomFloat(min, max, numOfdecimalPlace) {
  if (min >= max) {
    return;
  }

  const randomFloat = Math.random();

  const randomNumber = (randomFloat * (max - min)) + min;
  return +randomNumber.toFixed(numOfdecimalPlace);
}

// Returns you random value true or false
function trueOrFalse() {
  const checker = getRandomInt(0, 1);
  if (checker) {
    return true;
  }
  return false;
}

function capitalize(str) {
  return `${str[0].toUpperCase()}${str.slice(1)}`;
}


export {getRandomInt, trueOrFalse, getRandomFloat, capitalize};
