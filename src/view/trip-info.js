import AbstractElement from './abstract-element';

const createSiteTripInfo = (data) => {
  if (data.length === 0) {return;}
  const createRoute = () => {
    const routeFrom = data[0].city;
    const routeTo = data[data.length-1].city;
    const generateMidRoutePoint = () => {
      if (data.length === 2) {
        return '';
      } else if (data.length === 3) {
        return `${data[1].city} &mdash;`;
      } else {
        return '... &mdash;';
      }
    };
    return `${routeFrom} &mdash; ${generateMidRoutePoint()} ${routeTo}`;

  };
  const fromDate = data[0].date.format('MMM DD');
  const toDate = data[data.length-1].date.format('MMM DD');
  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${createRoute()}</h1>
  
      <p class="trip-info__dates">${fromDate}&nbsp;&mdash;&nbsp;${toDate}</p>
    </div>
  </section>`;
};

export default class TripInfo extends AbstractElement {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return createSiteTripInfo(this._data);
  }
}
