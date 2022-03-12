import {EVENTS, CITIES, PRICE_RANGE, TEXT, OFFER_LENGTH_RANGE, DATE_RANGE, DURATION_RANGE} from '../const.js';
import dayjs from 'dayjs';
// imports plugin duration from dayjs
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);
import { getRandomInt, capitalize, getTrueOrFalse, getRandomValueFromArr } from '../util.js';

const AMOUNT_OF_POINTS = 0;

const generateDate = () => {
  const daysToAdd = getRandomInt(DATE_RANGE.DAY.MIN, DATE_RANGE.DAY.MAX);
  const hoursToAdd = getRandomInt(DATE_RANGE.HOUR.MIN, DATE_RANGE.HOUR.MAX);
  const minsToAdd = getRandomInt(DATE_RANGE.MINUTE.MIN, DATE_RANGE.MINUTE.MAX);
  const date = dayjs()
    .add(daysToAdd, 'day')
    .add(hoursToAdd, 'hour')
    .add(minsToAdd, 'minute');
  return date;
};
const generateEvent = () => {
  const randNumFromRange = getRandomInt(0, EVENTS.length -1);

  return capitalize(EVENTS[randNumFromRange]);
};
const generateCity = () => getRandomValueFromArr(CITIES);
const generateDescription = () => {
  const sentences = TEXT.split('. ');
  const description = sentences.reduce((acc, currVal) => {
    if (getTrueOrFalse()) {
      acc = `${acc}. ${currVal}`;
    }
    return acc;
  });
  return description;
};
const generatePhotos = () => {
  const numOfPhotos = getRandomInt(1, 8);
  return new Array(numOfPhotos)
    .fill()
    .map((value, index) => `http://picsum.photos/248/152?r=${index}`);
};
const createPoints = () => {
  const createPointTemplate = () => {
    const day = generateDate();
    const event = generateEvent();
    const pointDuration = dayjs
      .duration({
        minutes: getRandomInt(DURATION_RANGE.MINUTE.MIN, DURATION_RANGE.MINUTE.MAX),
        hours: getRandomInt(DURATION_RANGE.HOUR.MIN, DURATION_RANGE.HOUR.MAX),
        days:getRandomInt(DURATION_RANGE.DAY.MIN, DURATION_RANGE.DAY.MAX),
      });
    const generateToTime = () => day.add(pointDuration);
    const createOffers = () => {
      const createOffer = () => {
        const offer =  {
          id: getRandomInt(1, 10000),
          name: event,
          price: getRandomInt(PRICE_RANGE.MIN, PRICE_RANGE.MAX),
          checked: getTrueOrFalse(),
        };
        return offer;
      };
      const numOfOffers = getRandomInt(OFFER_LENGTH_RANGE.MIN, OFFER_LENGTH_RANGE.MAX);
      const offers = new Array(numOfOffers).fill().map(createOffer);
      return offers;
    };

    const templatePoint = {
      date: day,
      event,
      city: generateCity(),
      toTime: generateToTime(),
      pointDuration,
      price: getRandomInt(PRICE_RANGE.MIN, PRICE_RANGE.MAX),
      offers: createOffers(), // got to create data structure
      favorite: getTrueOrFalse(),
      description: generateDescription(),
      photos: generatePhotos(),
    };
    return templatePoint;
  };
  const sortedData = new Array(AMOUNT_OF_POINTS)
    .fill()
    .map(createPointTemplate)
    .sort((a, b) => a.date > b.date ? 1 : -1);
  return sortedData;
};

const pointsData = createPoints();

export {pointsData};
