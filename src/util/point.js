import dayjs from 'dayjs';

const isChecked = (bool) => bool ? 'checked' : '';
const isActive = (bool) => bool ? '' : 'disabled';

const isDayExpired = (date) => date < dayjs();
const isDayInFuture = (date) => date >= dayjs();

const sortByDate = (a, b) => a.date - b.date;
const sortByTime = (a, b) => a.pointDuration.as('milliseconds') - b.pointDuration.as('milliseconds');
const sortByPrice = (a, b) => a.price - b.price;

export {isActive, isChecked, isDayExpired, isDayInFuture, sortByDate, sortByTime, sortByPrice};
