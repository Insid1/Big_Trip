import AbstractElement from './abstract-element';

const createTripInfo = (poinsData) => {
  const createRoute = () => {
    if (poinsData.length === 0) {return '<h1 class="trip-info__title">Enter The Point</h1>';}
    const routeFrom = poinsData[0].city;
    const routeTo = poinsData[poinsData.length-1].city;
    const generateMidRoutePoint = () => {
      if (poinsData.length === 2) {
        return '';
      } else if (poinsData.length === 3) {
        return `${poinsData[1].city} &mdash;`;
      } else {
        return '... &mdash;';
      }
    };
    return `<h1 class="trip-info__title">${routeFrom} &mdash; ${generateMidRoutePoint()} ${routeTo}</h1>`;
  };
  const createDates = () => {
    if (poinsData.length === 0) {return '';}
    const fromDate = poinsData[0].fromTime.format('MMM DD');
    const toDate = poinsData[poinsData.length-1].toTime.format('MMM DD');
    return `<p class="trip-info__dates">${fromDate}&nbsp;&mdash;&nbsp;${toDate}</p>`;
  };
  const createPrice = () => {
    if (poinsData.length === 0) {return '';}
    const totalPrice = poinsData.reduce((acc, value) => {
      acc += value.price;
      return acc;
    }, 0);
    return `<p class="trip-info__cost">
    Total: €&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
  </p>`;
  };
  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    ${createRoute()}
    ${createDates()}
  </div>
  ${createPrice()}
</section>`;
};


export default class TripInfo extends AbstractElement {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return createTripInfo(this._data);
  }
}
