import dayjs from 'dayjs';

const isChecked = (bool) => bool ? 'checked' : '';
const isActive = (bool) => bool ? '' : 'disabled';

const createElement = (template) => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = template;
  return wrapper.firstElementChild;
};

const isDayExpired = (date) => date < dayjs();
const isDayInFuture = (date) => date >= dayjs();

const replaceComponentWith = (container, newElement, oldElement) => {
  container.replaceChild(newElement.getElement(), oldElement.getElement());
};

export {isActive, isChecked, createElement, isDayExpired, isDayInFuture, replaceComponentWith};
