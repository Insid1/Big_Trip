import AbstractElement from './abstract-element';

const createLoading = () => `
<div>
<p class="trip-events__msg">...Loading...</p>
<div class="lds-ring"><div></div><div></div><div></div><div></div></div>
</div>
`;

export default class Loading extends AbstractElement {
  getTemplate() {
    return createLoading();
  }
}
