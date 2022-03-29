import {EVENTS, CITIES, PRICE_RANGE, TEXT, DATE_RANGE, DURATION_RANGE} from '../const.js';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { getRandomInt, getTrueOrFalse, getRandomValueFromArr } from '../util/common.js';

const AMOUNT_OF_POINTS = 10;
const AMOUNT_OF_OFFERS = 6;

// переработать функцию по созданию оферов для поинта
//  она должна добавлять только активные оферы в зависимости от ивента
// следовательно в обьекте поинта будут лежать только активные оферы
// а при отрисовки вьюхи она должна брать общий набор оферов и сравнивать
// есть ли такой офер там и если есть, то делать его checked
const createOffersForEvent = () => {
  const result = {};
  const createOffer = (eventName) => ({
    name: eventName,
    price: getRandomInt(PRICE_RANGE.MIN, PRICE_RANGE.MAX),
  });
  EVENTS.forEach((value) => {
    const arrOfOffers = new Array(AMOUNT_OF_OFFERS)
      .fill()
      .map((element, index) => (createOffer(value + index)));
    result[value] = arrOfOffers;
  });
  return result;
};

const createPhotosForCities = () => {
  const result = {};
  const createPhotosForCity = () => {
    const numOfPhotos = getRandomInt(1, 8);
    const photos = new Array(numOfPhotos)
      .fill()
      .map(() => `http://picsum.photos/248/152?r=${Math.random()}`);
    return photos ;
  };

  CITIES.forEach((value) => {
    result[value] = createPhotosForCity();
  });

  return result;
};

const createDescriptionForCities = () => {
  const result = {};
  const sentences = TEXT.split('. ');
  const createDescriptionForCity = () => sentences.reduce((acc, currVal) => {
    if (getTrueOrFalse()) {
      acc = `${acc}. ${currVal}`;
    }
    return acc;
  });
  CITIES.forEach((value) => {
    result[value] = createDescriptionForCity();
  });
  return result;
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

const generateOffer = (event) => [getRandomValueFromArr(offersForEvent[event])];

const createPoints = () => {
  const createPointTemplate = () => {
    const event = getRandomValueFromArr(EVENTS);
    const city = getRandomValueFromArr(CITIES);
    const timePeriod = generateTimePeriod();

    const templatePoint = {
      id: nanoid(),
      event,
      city,
      fromTime: timePeriod.fromTime,
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
  console.log(data);
  return AMOUNT_OF_POINTS ? data : []; // if no data return empty list
};

const pointsData = createPoints();

export {pointsData, offersForEvent, photosForCities, descriptionsForCities};
