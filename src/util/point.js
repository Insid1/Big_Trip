import dayjs from 'dayjs';

const isChecked = (bool) => bool ? 'checked' : '';
const isActive = (bool) => bool ? '' : 'disabled';

const isDayExpired = (date) => date < dayjs();
const isDayInFuture = (date) => date >= dayjs();

export {isActive, isChecked, isDayExpired, isDayInFuture};
