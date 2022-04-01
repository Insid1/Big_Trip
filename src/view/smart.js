import AbstractElement from './abstract-element';

export default class Smart extends AbstractElement {

  restoreHandlers() {
    throw Error('Abstract method not implemented : restoreHandlers');
  }

  updateElement() {
    const oldElement = this.getElement();
    const parentElement = oldElement.parentElement;
    this.removeElement();
    const newElement = this.getElement();
    parentElement.replaceChild(newElement, oldElement);
    this.restoreHandlers();
  }

  updateData(update, isSmallUpdate) {
    if (!update) {
      return;
    }
    this._pointState = Object.assign({}, this._pointState, update);
    if (isSmallUpdate) {
      return;
    }
    this.updateElement();
  }
}
