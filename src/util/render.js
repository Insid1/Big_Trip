const RenderPosition = {
  START: 'afterbegin',
  END: 'beforeend',
};

const render = (container, element, place = RenderPosition.END) => {
  switch (place) {
    case RenderPosition.START:
      container.prepend(element);
      break;
    case RenderPosition.END:
      container.append(element);
      break;
  }
};

export {render, RenderPosition};
