import { createPointTemplate } from '../mock/point-data';


const createTripPoint = () => {
  const point = createPointTemplate();
  const generateIconLink = () => `img/icons/${point.event.toLowerCase()}.png`;
  const generateDuration = () => {
    const duration =  point.pointDuration;
    const formatedDuration = duration.format('HH') !== '00' ?
      `${duration.get('hours')} H ${duration.get('m')} M` :
      `${duration.get('m')} M`;
    return formatedDuration;
  };
  const isFavorite = () => {
    let activeClass = '';
    if (point.favorite) {
      activeClass = 'event__favorite-btn--active';
    }
    return `<button class="event__favorite-btn ${activeClass}" type="button">
    <span class="visually-hidden">Add to favorite</span>
    <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
      <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
    </svg>
  </button>`;
  };

  return `
  <li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${point.date.format('YYYY-MM-DD')}">${point.date.format('MMM D')}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="${generateIconLink()}" alt="Event type icon">
      </div>
      <h3 class="event__title">${point.event} ${point.city}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${point.date.format('YYYY-MM-DDTHH:MM')}">${point.date.format('HH:mm')}</time>
          &mdash;
          <time class="event__end-time" datetime="${point.toTime.format('YYYY-MM-DDTHH:MM')}">${point.toTime.format('HH:mm')}</time>
        </p>
        <p class="event__duration">${generateDuration()}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${point.price}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        <li class="event__offer">
          <span class="event__offer-title">Order Uber</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">20</span>
        </li>
      </ul>
      ${isFavorite()}
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};

const createTripList = () => `
<ul class="trip-events__list"></ul>`;

export {createTripList, createTripPoint};
