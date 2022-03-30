// import {nanoid} from 'nanoid';
import dayjs from 'dayjs';
import { getRandomValueFromArr} from '../util/common';
import { EVENTS, CITIES } from '../const.js';
import { destination } from '../mock/point-data.js';


export const createPointTemplate = () => {
  const event = getRandomValueFromArr(EVENTS);
  const city = getRandomValueFromArr(CITIES);
  return {
    event,
    city,
    fromTime: dayjs(),
    toTime: dayjs(),
    price: 0,
    offers: [],
    favorite: false,
    description: destination[city].description,
    photos: destination[city].photos,
  };

};

