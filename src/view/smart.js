import AbstractElement from './abstract-element';

export default class Smart extends AbstractElement {

  restoreHandlers() {
    // Восстанавливает обработчики событий на элементах после перересовки
    this.setClickHandler(this._callback.clickPointer);
    this.setSubmitHandler(this._callback.submit);
    this._setInnerHandlers();
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
    this._pointData = Object.assign({}, this._pointData, update);
    if (isSmallUpdate) {
      return;
    }
    this.updateElement();
  }
}
