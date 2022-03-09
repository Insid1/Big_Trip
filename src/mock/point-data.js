import dayjs from 'dayjs';
// imports plugin duration from dayjs
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);
import { getRandomInt, capitalize, trueOrFalse } from './util.js';

const DATE_RANGE = {
  DAY:{
    MIN: -10,
    MAX: 10,
  },
  HOUR:{
    MIN: -5,
    MAX: 10,
  },
  MINUTE:{
    MIN: -40,
    MAX: 50,
  },
};
const DURATION_RANGE = {
  MINUTE: {
    MIN: 20,
    MAX: 60,
  },
  HOUR: {
    MIN: 0,
    MAX: 4,
  }
};
const PRICE_RANGE = {
  MIN: 10,
  MAX: 250,
};
const EVENTS = [
  'bus', 'check-in',
  'drive', 'flight',
  'restaurant', 'ship',
  'sightseeing', 'taxi',
  'train', 'transport'];
const CITIES = [
  'Amsterdam', 'Chamonix',
  'Berlin', 'Moscow',
  'Novosibirsk', 'Tokiyo',
  'Rotterdam', 'Brucelle',
  'Geneva', 'Oslo',
  'Helsinki', 'Copenhagen',
];
const TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

const generateDate = () => {
  const daysToAdd = getRandomInt(DATE_RANGE.DAY.MIN, DATE_RANGE.DAY.MAX);
  const hoursToAdd = getRandomInt(DATE_RANGE.HOUR.MIN, DATE_RANGE.HOUR.MAX);
  const minsToAdd = getRandomInt(DATE_RANGE.MINUTE.MIN, DATE_RANGE.MINUTE.MAX);
  const date = dayjs()
    .add(daysToAdd, 'day')
    .add(hoursToAdd, 'hour')
    .add(minsToAdd, 'minute');
  // console.log(date.format());
  return date;
};
const generateEvent = () => {
  const randNumFromRange = getRandomInt(0, EVENTS.length -1);

  return capitalize(EVENTS[randNumFromRange]);
};
const generateCity = () => {
  const randNumFromRange = getRandomInt(0, EVENTS.length -1);
  return CITIES[randNumFromRange];
};
const generateDescription = () => {
  const sentences = TEXT.split('. ');
  const description = sentences.reduce((acc, currVal) => {
    if (trueOrFalse()) {
      acc = `${acc}. ${currVal}`;
    }
    return acc;
  });
  return description;
};

const createPointTemplate = () => {
  const day = generateDate();
  const pointDuration = dayjs
    .duration({
      minutes: getRandomInt(DURATION_RANGE.MINUTE.MIN, DURATION_RANGE.MINUTE.MAX),
      hours: getRandomInt(DURATION_RANGE.HOUR.MIN, DURATION_RANGE.HOUR.MAX),
    });
  const generateToTime = () => day.add(pointDuration);
  const templatePoint = {
    date: day,
    event: generateEvent(),
    city: generateCity(),
    toTime: generateToTime(),
    pointDuration,
    price: getRandomInt(PRICE_RANGE.MIN, PRICE_RANGE.MAX),
    offers: 'offers', // got to create data structure
    favorite: trueOrFalse(),
    description: generateDescription(),
  };
  return templatePoint;
};

export {createPointTemplate};
