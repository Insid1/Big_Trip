import AbstractElement from './abstract-element';

export default class Smart extends AbstractElement {

  restoreHandlers() {
    throw Error('Abstract method not implemented : restoreHandlers');
  }

  updateElement() {
    const oldElement = this.getElement();
    const parentElement = oldElement.parentElement;
    // Удаляет старый дом элемент компонента
    this.removeElement();
    // Создает новый элемент дом компонента
    const newElement = this.getElement();
    // заменит старый элемент новым
    parentElement.replaceChild(newElement, oldElement);
    // восстановит обработчики событий
    this.restoreHandlers();
  }

  updateData(update, isSmallUpdate) {
    // Обновляет данные и если нужно обновляет элемент
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
