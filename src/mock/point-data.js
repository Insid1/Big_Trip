import {EVENTS, CITIES, PRICE_RANGE, TEXT, DATE_RANGE, DURATION_RANGE} from '../const.js';
import dayjs from 'dayjs';
// imports plugin duration from dayjs
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);
import { nanoid } from 'nanoid';
import { getRandomInt, capitalize, getTrueOrFalse, getRandomValueFromArr } from '../util/common.js';

const AMOUNT_OF_POINTS = 5;
const AMOUNT_OF_OFFERS = 6;


const createOffersForEvent = () => {
  const offersForEvent = {};
  const createOffer = (eventName) => ({
    id: getRandomInt(1, 10000),
    name: eventName,
    price: getRandomInt(PRICE_RANGE.MIN, PRICE_RANGE.MAX),
    checked: false,
  });
  EVENTS.forEach((value) => {
    const arrOfOffers = new Array(AMOUNT_OF_OFFERS)
      .fill()
      .map(() => (createOffer(value)));
    offersForEvent[value] = arrOfOffers;
  });
  return offersForEvent;
};

const createPhotosForCities = () => {
  const photosForCities = {};
  const createPhotosForCity = () => {
    const numOfPhotos = getRandomInt(1, 8);
    const photos = new Array(numOfPhotos)
      .fill()
      .map(() => `http://picsum.photos/248/152?r=${Math.random()}`);
    return photos ;
  };

  CITIES.forEach((value) => {
    photosForCities[value] = createPhotosForCity();
  });

  return photosForCities;
};

const createDescriptionForCities = () => {
  const descriptionsForCities = {};
  const sentences = TEXT.split('. ');
  const createDescriptionForCity = () => sentences.reduce((acc, currVal) => {
    if (getTrueOrFalse()) {
      acc = `${acc}. ${currVal}`;
    }
    return acc;
  });
  CITIES.forEach((value) => {
    descriptionsForCities[value] = createDescriptionForCity();
  });
  return descriptionsForCities;
};

const generateTimePeriod = () => {
  const fromTime = dayjs()
    .add(getRandomInt(DATE_RANGE.DAY.MIN, DATE_RANGE.DAY.MAX), 'day')
    .add(getRandomInt(DATE_RANGE.HOUR.MIN, DATE_RANGE.HOUR.MAX), 'hour')
    .add(getRandomInt(DATE_RANGE.MINUTE.MIN, DATE_RANGE.MINUTE.MAX), 'minute');
  const toTime = fromTime.clone()
    .add(getRandomInt(DURATION_RANGE.DAY.MIN, DURATION_RANGE.DAY.MAX), 'day')
    .add(getRandomInt(DURATION_RANGE.HOUR.MIN, DURATION_RANGE.HOUR.MAX), 'hour')
    .add(getRandomInt(DURATION_RANGE.MINUTE.MIN, DURATION_RANGE.MINUTE.MAX), 'minute');

  return {toTime, fromTime};
};


const offersForEvent = createOffersForEvent();
const photosForCities = createPhotosForCities();
const descriptionsForCities = createDescriptionForCities();

const generateOffer = (event) => {
  const specificOffer = offersForEvent[event]
    .slice()
    .map((value) => Object.assign({}, value, {checked: getTrueOrFalse()}));
  return specificOffer;
};

const createPoints = () => {
  const event = getRandomValueFromArr(EVENTS);
  const city = getRandomValueFromArr(CITIES);
  const timePeriod = generateTimePeriod();
  const duration = timePeriod.toTime.subtract(timePeriod.fromTime);
  const createPointTemplate = () => {

    const templatePoint = {
      id: nanoid(),
      event,
      city,
      fromTime: timePeriod.fromTime,
      duration,
      toTime: timePeriod.toTime,
      price: getRandomInt(PRICE_RANGE.MIN, PRICE_RANGE.MAX),
      offers: generateOffer(event),
      favorite: getTrueOrFalse(),
      description: descriptionsForCities[city],
      photos: photosForCities[city],

    };

    return templatePoint;
  };
  const data = new Array(AMOUNT_OF_POINTS)
    .fill()
    .map(createPointTemplate);
  return AMOUNT_OF_POINTS ? data : []; // if no data return empty list
};

const pointsData = createPoints();

export {pointsData};
