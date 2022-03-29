// import {nanoid} from 'nanoid';
import dayjs from 'dayjs';
import { getRandomValueFromArr} from '../util/common';
import { EVENTS, CITIES } from '../const.js';
import { photosForCities, descriptionsForCities } from '../mock/point-data.js';


export const createPointTemplate = () => {
  const event = getRandomValueFromArr(EVENTS);
  const city = getRandomValueFromArr(CITIES);

  return {
    // id: nanoid(),
    event,
    city,
    fromTime: dayjs(),
    toTime: dayjs(),
    price: 0,
    offers: [],
    favorite: false,
    description: descriptionsForCities[city],
    photos: photosForCities[city],
  };

};

