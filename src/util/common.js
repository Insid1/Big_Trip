import ErrorMessageView from '../view/error-message';
import { render } from './render';
const getRandomInt = (min, max) => {
  if (min > max) {
    [min, max] = [max, min];
  }
  min = Math.ceil(min);
  max = Math.trunc(max);
  const randomFloat = Math.random();
  const randomNumber = Math.trunc(randomFloat * (max - min + 1)) + min;
  return randomNumber;
};

const isOnline = () => window.navigator.onLine;

const createErrorMessage = (err) => {
  const errMsg = new ErrorMessageView(err);
  render(document.body, errMsg);
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
  const randomValue = arr[getRandomInt(0, arr.length -1)];
  if (typeof randomValue === 'object') {
    return Object.assign({}, randomValue);
  }
  return randomValue;
};

const getTrueOrFalse = () => Boolean(getRandomInt(0, 1));
const capitalize = (str) => `${str[0].toUpperCase()}${str.slice(1)}`;

export {getRandomInt, getRandomFloat, getRandomValueFromArr, getTrueOrFalse, capitalize, isOnline, createErrorMessage };
