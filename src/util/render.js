import AbstractElement from '../view/abstract-element';

const RenderPosition = {
  START: 'afterbegin',
  END: 'beforeend',
};

const render = (container, element, place = RenderPosition.END) => {
  if (container instanceof AbstractElement) {
    container = container.getElement();
  }

  if (element instanceof AbstractElement) {
    element = element.getElement();
  }
  switch (place) {
    case RenderPosition.START:
      container.prepend(element);
      break;
    case RenderPosition.END:
      container.append(element);
      break;
    default:
      throw Error(`unknown render position ${place}`);
  }
};

const createElement = (template) => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = template;
  return wrapper.firstElementChild;
};

const replace = (newChild, oldChild) => {
  if (oldChild instanceof AbstractElement) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof AbstractElement) {
    newChild = newChild.getElement();
  }
  const parent = oldChild.parentElement;
  parent.replaceChild(newChild, oldChild);
};

const remove = (component) => {
  if (!(component instanceof AbstractElement)) {
    throw new Error('Can remove components only');
  }

  component.getElement().remove();
  component.removeElement();
};

export {render, RenderPosition, replace, remove, createElement};
