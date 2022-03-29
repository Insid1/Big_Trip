const getRandomInt = (min, max) => {
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
};

const getRandomFloat = (min, max, numOfdecimalPlace) => {
  if (min >= max) {
    return;
  }
  const randomFloat = Math.random();
  const randomNumber = (randomFloat * (max - min)) + min;
  return +randomNumber.toFixed(numOfdecimalPlace);
};

const getRandomValueFromArr = (arr) => {
  // сделать проверку на обьект
  const randomValue = arr[getRandomInt(0, arr.length -1)];
  if (typeof randomValue === 'object') {
    return Object.assign({}, randomValue);
  }
  return randomValue;
};

const getTrueOrFalse = () => Boolean(getRandomInt(0, 1));
const capitalize = (str) => `${str[0].toUpperCase()}${str.slice(1)}`;

export {getRandomInt, getRandomFloat, getRandomValueFromArr, getTrueOrFalse, capitalize };
