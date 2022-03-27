import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const isChecked = (bool) => bool ? 'checked' : '';
const isActive = (bool) => bool ? '' : 'disabled';

const isDayExpired = (date) => date < dayjs();
const isDayInFuture = (date) => date >= dayjs();

const getDuration = (startTime, endTime) => dayjs.duration(endTime - startTime);

const formatDuration = (value) => {
  const durDay = value.get('days');
  const durHour = value.get('hours');
  const durMin = value.get('minutes');
  if (durDay) {
    return `${durDay} D ${durHour} H ${durMin} M`;
  } else if (durHour) {
    return `${durHour} H ${durMin} M`;
  } else {
    return `${durMin} M`;
  }
};

const sortByDate = (a, b) => a.fromTime - b.fromTime;
const sortByTime = (a, b) => {
  const aDuration = a.toTime - a.fromTime;
  const bDuration = b.toTime - b.fromTime;
  return aDuration - bDuration;
};
const sortByPrice = (a, b) => a.price - b.price;

export {isActive, isChecked, isDayExpired, isDayInFuture, sortByDate, sortByTime, sortByPrice, getDuration, formatDuration};
