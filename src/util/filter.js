import dayjs from 'dayjs';
import {FilterType} from '../const.js';

const today = dayjs();
export const filter = {
  [FilterType.EVERYTHING]: (data) => data,
  [FilterType.FUTURE]: (data) => data.filter((pointData) => (pointData.fromTime >= today || pointData.toTime >= today)),
  [FilterType.PAST]: (data) => data.filter((pointData) => pointData.fromTime < today && pointData.toTime < today),
};
