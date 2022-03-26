import {nanoid} from 'nanoid';
import dayjs from 'dayjs';
import { getRandomValueFromArr} from '../util/common';
import { EVENTS, CITIES } from '../const.js';
import { offersForEvent ,photosForCities, descriptionsForCities } from '../mock/point-data.js';


const createPointTemplate = () => {
  const event = getRandomValueFromArr(EVENTS);
  const city = getRandomValueFromArr(CITIES);

  return {
    id: nanoid(),
    event,
    city,
    fromTime: dayjs(),
    toTime: dayjs(),
    price: 0,
    offers: offersForEvent[event],
    favorite: false,
    description: descriptionsForCities[city],
    photos: photosForCities[city],
  };

};

export const templatePoint = createPointTemplate();
