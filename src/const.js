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

const OfflineMessage = {
  DELETE: 'You can\'t delete task offline',
  SAVE: 'You can\'t save task offline',
  EDIT: 'You can\'t edit task offline',
  ADD: 'You can\'t add task offline',
};

export {SortType, UpdateType, UserAction, FilterType, ChartType, OfflineMessage};
