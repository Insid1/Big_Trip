const SortType = {
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

export {SortType, UpdateType, UserAction, FilterType, ChartType};
