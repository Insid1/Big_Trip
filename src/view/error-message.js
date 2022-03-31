import AbstractElement from './abstract-element';

const createErrorMessage = (err) => `<div class="error-message">Unable to load data. ${err}</div>`;

export default class ErrorMessage extends AbstractElement {
  constructor(error) {
    super();
    this._error = error;
  }

  getTemplate() {
    return createErrorMessage(this._error);
  }
}
