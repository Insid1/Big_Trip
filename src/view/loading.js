import AbstractComponent from './abstract-component';

const createLoading = () => `
<div>
<p class="trip-events__msg">Loading...</p>
<div class="lds-ring"><div></div><div></div><div></div><div></div></div>
</div>
`;

export default class Loading extends AbstractComponent {
  getTemplate() {
    return createLoading();
  }
}
