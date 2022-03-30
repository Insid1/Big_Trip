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
const PRICE_RANGE = {
  MIN: 10,
  MAX: 250,
};
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
  },
  DAY: {
    MIN: 0,
    MAX: 3,
  }
};
const TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Cras aliquet varius magna, non porta ligula feugiat eget.
Fusce tristique felis at fermentum pharetra.
Aliquam id orci ut lectus varius viverra.
Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.
Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.
Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const SORT_TYPE = {
  DATE: 'date',
  TIME: 'time',
  PRICE: 'price',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
  SELECT_FILTER: 'SELECT_FILTER',
};

const UpdateType = {
  PATCH: 'PATCH', // to rerender onlty one point
  MINOR: 'MINOR', // to rerender all points
  MAJOR: 'MAJOR', // to rerender all elements on page
  INIT: 'INIT',
  INIT_OFFERS: 'INIT_OFFERS',
  INIT_DESTINATIONS: 'INIT_DESTINATIONS',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const ChartType = {
  PRICE: 'PRICE',
  PERIOD: 'PERIOD',
  AMOUNT: 'AMOUNT',
};

export {EVENTS, CITIES, PRICE_RANGE, TEXT, DATE_RANGE, DURATION_RANGE, SORT_TYPE, UpdateType, UserAction, FilterType, ChartType};
