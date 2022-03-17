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

const getRandomValueFromArr = (arr) => arr[getRandomInt(0, arr.length -1)];

const getTrueOrFalse = () => Boolean(getRandomInt(0, 1));
const capitalize = (str) => `${str[0].toUpperCase()}${str.slice(1)}`;

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }
  return [...items.slice(0, index), update, ...items.slice(index + 1)];
};

export {getRandomInt, getRandomFloat, getRandomValueFromArr, getTrueOrFalse, capitalize, updateItem };
