import AbstractElement from './abstract-element';

const createSitePrice = (data) => {
  const totalPrice = data.reduce((acc, curVal) => {
    acc += curVal.price;
    return acc;
  }, 0);
  return`<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
</p>
`;};

export default class TotalPrice extends AbstractElement {
  constructor(pointData) {
    super();
    this._pointData = pointData;
  }

  getTemplate() {
    return createSitePrice(this._pointData);
  }
}

