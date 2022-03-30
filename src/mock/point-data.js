import {CITIES, TEXT} from '../const.js';
import { getRandomInt, getTrueOrFalse} from '../util/common.js';

const createDestination = () => {
  const result = {};
  const createPhotosForCity = () => {
    const numOfPhotos = getRandomInt(1, 8);
    const photos = new Array(numOfPhotos)
      .fill()
      .map((value, index) => ({
        src:`http://picsum.photos/248/152?r=${Math.random()}`,
        alt: index,
      }));
    return photos ;
  };
  const sentences = TEXT.split('. ');
  const createDescriptionForCity = () => sentences.reduce((acc, currVal) => {
    if (getTrueOrFalse()) {
      acc = `${acc}. ${currVal}`;
    }
    return acc;
  });

  CITIES.forEach((value) => {
    result[value] = {
      description: createDescriptionForCity(),
      photos: createPhotosForCity(),
    };
  });
};

const destination = createDestination();

export { destination };
