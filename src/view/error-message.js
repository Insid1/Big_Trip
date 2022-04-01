import AbstractComponent from './abstract-component';

const createErrorMessage = (err) => `<div class="error-message">Unable to load data. ${err}</div>`;

export default class ErrorMessage extends AbstractComponent {
  constructor(error) {
    super();
    this._error = error;
  }

  getTemplate() {
    return createErrorMessage(this._error);
  }
}
