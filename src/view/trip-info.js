import AbstractElement from './abstract-element';

const createTripInfo = (poinsData) => {
  const createRoute = () => {
    const generateRoute = () => {
      switch (poinsData.length) {
        case 0:
          return '';
        case 1:
          return `${poinsData[0].city}`;
        case 2:
          return `${poinsData[0].city} — ${poinsData[poinsData.length - 1].city}`;
        case 3:
          return `${poinsData[0].city} —  ${poinsData[1].city} —  ${poinsData[2].city}`;
        default:
          return `${poinsData[0].city} — ... — ${poinsData[poinsData.length - 1].city}`;
      }
    };
    return `<h1 class="trip-info__title">${generateRoute()}</h1>`;
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
