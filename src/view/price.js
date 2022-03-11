import { createElement } from '../util';

const createSitePrice = (data) => {
  const totalPrice = data.reduce((acc, curVal) => {
    acc += curVal.price;
    return acc;
  }, 0);
  return`<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
</p>
`;};

export default class TotalPrice {
  constructor(pointData) {
    this._pointData = pointData;
    this._element = null;
  }

  getTemplate() {
    return createSitePrice(this._pointData);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

