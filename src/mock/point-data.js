import {EVENTS, CITIES, PRICE_RANGE, TEXT, OFFER_LENGTH_RANGE, DATE_RANGE, DURATION_RANGE} from '../const.js';
import dayjs from 'dayjs';
// imports plugin duration from dayjs
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);
import { nanoid } from 'nanoid';
import { getRandomInt, capitalize, getTrueOrFalse, getRandomValueFromArr } from '../util/common.js';

const AMOUNT_OF_POINTS = 20;

const createPoints = () => {
  const createPointTemplate = () => {

    const templatePoint = {
      date: null,
      id: nanoid(),
      event: null,
      city: null,
      toTime: null,
      pointDuration: null,
      price: null,
      offers: [],
      favorite: getTrueOrFalse(),
      description: null,
      photos: [],

      init() {
        this.generateCity();
        this.generatePhotos();
        this.generateDescription();
        // --- order matters ---
        this.generateDate();
        this.generateDuration();
        // --- End ---
        // --- order matters ---
        this.generateToTime();
        this.generateEvent();
        this.generateOffers();
        this.generatePrice();
        // --- End ---

      },

      generateCity() {
        this.city = getRandomValueFromArr(CITIES);
      },

      generateDescription() {
        const sentences = TEXT.split('. ');
        const description = sentences.reduce((acc, currVal) => {
          if (getTrueOrFalse()) {
            acc = `${acc}. ${currVal}`;
          }
          return acc;
        });
        this.description = description;
      },

      generateEvent() {
        this.event = capitalize(getRandomValueFromArr(EVENTS));
      },

      generateOffers() {
        const createOffer = () => {
          const offer =  {
            id: getRandomInt(1, 10000),
            name: this.event,
            price: getRandomInt(PRICE_RANGE.MIN, PRICE_RANGE.MAX),
            checked: getTrueOrFalse(),
          };
          return offer;
        };
        const numOfOffers = getRandomInt(OFFER_LENGTH_RANGE.MIN, OFFER_LENGTH_RANGE.MAX);
        const offers = new Array(numOfOffers).fill().map(createOffer);
        this.offers = offers;
      },

      generatePrice() {
        const initialPrice = getRandomInt(PRICE_RANGE.MIN, PRICE_RANGE.MAX);
        const priceFromOffres = this.offers.reduce((acc, currVal) => {
          if (currVal.checked) {
            acc += currVal.price;
          }
          return acc;
        }, 0);
        this.price = initialPrice + priceFromOffres;
      },

      generatePhotos() {
        const numOfPhotos = getRandomInt(1, 8);
        this.photos = new Array(numOfPhotos)
          .fill()
          .map((value, index) => `http://picsum.photos/248/152?r=${index}`);
      },

      generateDate() {
        const daysToAdd = getRandomInt(DATE_RANGE.DAY.MIN, DATE_RANGE.DAY.MAX);
        const hoursToAdd = getRandomInt(DATE_RANGE.HOUR.MIN, DATE_RANGE.HOUR.MAX);
        const minsToAdd = getRandomInt(DATE_RANGE.MINUTE.MIN, DATE_RANGE.MINUTE.MAX);
        const date = dayjs()
          .add(daysToAdd, 'day')
          .add(hoursToAdd, 'hour')
          .add(minsToAdd, 'minute');
        this.date = date;
      },

      generateDuration() {
        this.pointDuration = dayjs
          .duration({
            minutes: getRandomInt(DURATION_RANGE.MINUTE.MIN, DURATION_RANGE.MINUTE.MAX),
            hours: getRandomInt(DURATION_RANGE.HOUR.MIN, DURATION_RANGE.HOUR.MAX),
            days:getRandomInt(DURATION_RANGE.DAY.MIN, DURATION_RANGE.DAY.MAX),
          });
      },

      generateToTime() {
        this.toTime = this.date.add(this.pointDuration);
      }
    };

    templatePoint.init();
    return templatePoint;
  };
  const data = new Array(AMOUNT_OF_POINTS)
    .fill()
    .map(createPointTemplate);
  return AMOUNT_OF_POINTS ? data : []; // if no data return empty list
};

const pointsData = createPoints();

export {pointsData};
