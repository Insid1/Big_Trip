import dayjs from 'dayjs';

const RenderPosition = {
  START: 'afterbegin',
  END: 'beforeend',
};
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
const isChecked = (bool) => bool ? 'checked' : '';
const isActive = (bool) => bool ? '' : 'disabled';

const createElement = (template) => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = template;
  return wrapper.firstElementChild;
};

const isDayExpired = (date) => date < dayjs();
const isDayInFuture = (date) => date >= dayjs();

const render = (container, element, place = RenderPosition.END) => {
  switch (place) {
    case RenderPosition.START:
      container.prepend(element);
      break;
    case RenderPosition.END:
      container.append(element);
      break;
  }
};

export {getRandomInt, getTrueOrFalse, getRandomFloat, getRandomValueFromArr, capitalize, createElement, render, RenderPosition, isDayExpired, isDayInFuture, isChecked, isActive};
