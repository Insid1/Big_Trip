import dayjs from 'dayjs';

const isChecked = (bool) => bool ? 'checked' : '';
const isActive = (bool) => bool ? '' : 'disabled';

const isDayExpired = (date) => date < dayjs();
const isDayInFuture = (date) => date >= dayjs();

const sortByDate = (a, b) => a.fromTime - b.fromTime;
const sortByTime = (a, b) => a.period - b.period;
const sortByPrice = (a, b) => a.price - b.price;

export {isActive, isChecked, isDayExpired, isDayInFuture, sortByDate, sortByTime, sortByPrice};
